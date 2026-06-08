import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const EDGE_PATH = process.env.EDGE_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = Number(process.env.CDP_PORT || 9345);
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:5322/index.html";
const runName = process.env.RUN_NAME || `objects-cdp-${Date.now()}`;
const profileDir = path.resolve("test-artifacts", `${runName}-profile`);
const url = `${BASE_URL}?scene=objects&qa=${runName}&cache=${Date.now()}`;

const pending = new Map();

function send(ws, method, params = {}) {
  const id = send.nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timeout waiting for ${method}`));
    }, 8000);
    pending.set(id, { resolve, reject, timeout });
  });
}
send.nextId = 1;

function gameToClient(snapshot, x, y) {
  return {
    x: snapshot.rect.left + x * (snapshot.rect.width / 1180),
    y: snapshot.rect.top + y * (snapshot.rect.height / 760),
  };
}

async function waitForDebuggerTarget() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((response) => response.json());
      const page = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Edge may still be starting.
    }
    await delay(250);
  }
  throw new Error("No CDP page target found");
}

async function evaluate(ws, expression) {
  const result = await send(ws, "Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.result?.exceptionDetails) {
    throw new Error(result.result.exceptionDetails.text || "Runtime.evaluate failed");
  }
  return result.result.result.value;
}

async function snapshot(ws) {
  return evaluate(ws, `(() => {
    const scene = window.game?.scene?.keys?.ObjectsGame;
    const canvas = document.querySelector("canvas");
    if (!scene || !canvas || !scene.sceneBounds) return null;
    const rect = canvas.getBoundingClientRect();
    const zones = scene.children.list
      .filter((item) => item.type === "Zone" && item.getData && item.getData("object"))
      .map((item) => {
        const object = item.getData("object");
        return {
          id: object.id,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
          found: Boolean(item.getData("found")),
          inputEnabled: Boolean(item.input?.enabled),
        };
      });
    const checks = scene.activeObjects.map((object) => {
      const item = scene.checkItems.get(object.id);
      return {
        id: object.id,
        text: item?.check?.text || "",
        rowAlpha: item?.row?.alpha ?? 1,
      };
    });
    return {
      found: scene.found,
      activeCount: scene.activeObjects.length,
      zones,
      checks,
      rect: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
    };
  })()`);
}

async function dispatchDomClick(ws, point) {
  const expression = `(() => {
    const canvas = document.querySelector("canvas");
    const events = [
      ["pointermove", 0],
      ["pointerdown", 1],
      ["mousedown", 1],
      ["pointerup", 0],
      ["mouseup", 0],
      ["click", 0],
    ];
    events.forEach(([type, buttons]) => {
      const EventCtor = type.startsWith("pointer") ? PointerEvent : MouseEvent;
      canvas.dispatchEvent(new EventCtor(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        clientX: ${point.x},
        clientY: ${point.y},
        screenX: ${point.x},
        screenY: ${point.y},
        button: 0,
        buttons,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
      }));
    });
    return true;
  })()`;
  await evaluate(ws, expression);
}

async function main() {
  await mkdir(profileDir, { recursive: true });
  const edge = spawn(EDGE_PATH, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profileDir}`,
    "--window-size=1280,720",
    url,
  ], { stdio: ["ignore", "ignore", "pipe"] });

  let stderr = "";
  edge.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  try {
    const wsUrl = await waitForDebuggerTarget();
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !pending.has(message.id)) return;
      const waiter = pending.get(message.id);
      clearTimeout(waiter.timeout);
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message);
    };
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    await send(ws, "Page.enable");
    await send(ws, "Page.bringToFront");
    await send(ws, "Network.enable");
    await send(ws, "Network.setCacheDisabled", { cacheDisabled: true });
    await send(ws, "Runtime.enable");
    await send(ws, "Input.setIgnoreInputEvents", { ignore: false });
    await delay(2200);

    const before = await snapshot(ws);
    if (!before) throw new Error("Objects scene did not initialize");
    if (before.zones.length !== before.activeCount) {
      throw new Error(`Expected ${before.activeCount} hit zones, found ${before.zones.length}`);
    }
    if (before.checks.some((check) => check.text)) {
      throw new Error(`Checklist should start without duplicate check text: ${JSON.stringify(before.checks)}`);
    }

    for (const zone of before.zones) {
      await dispatchDomClick(ws, gameToClient(before, zone.x, zone.y));
      await delay(180);
    }

    const after = await snapshot(ws);
    if (after.found !== after.activeCount) {
      throw new Error(`Expected all objects found. found=${after.found}, active=${after.activeCount}, zones=${JSON.stringify(after.zones)}`);
    }
    if (after.checks.some((check) => !check.text)) {
      throw new Error(`Expected every checklist row to be checked: ${JSON.stringify(after.checks)}`);
    }

    console.log(JSON.stringify({
      ok: true,
      activeCount: after.activeCount,
      found: after.found,
      checkedRows: after.checks.length,
      zones: after.zones.map(({ id, width, height, found }) => ({ id, width, height, found })),
    }, null, 2));

    await ws.close?.();
  } finally {
    edge.kill();
    if (stderr.trim() && process.env.DEBUG_CDP) {
      console.error(stderr);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
