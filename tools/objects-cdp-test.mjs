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
const TARGET_SCENE = "ObjectsGame";
const consoleLogs = [];

const pending = new Map();

function send(ws, method, params = {}) {
  const id = send.nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timeout waiting for ${method}`));
    }, 12000);
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

async function waitForSceneManager(ws, attempts = 140, waitMs = 200) {
  for (let i = 0; i < attempts; i += 1) {
    const state = await evaluate(ws, `(() => ({
      hasGame: Boolean(window.game),
      isBooted: Boolean(window.game?.isBooted),
      hasSceneManager: Boolean(window.game?.scene),
      hasScenes: Boolean(window.game?.scene?.scenes?.length),
      hasPhaser: Boolean(window.Phaser),
      sceneManagerKeys: window.game?.scene ? Object.keys(window.game.scene.keys || {}) : [],
      loadedScenes: window.game?.scene ? (window.game.scene.scenes || []).map((scene) => scene?.scene?.key).filter(Boolean) : [],
    }))()`);
    if (state.hasPhaser && state.hasGame && state.hasSceneManager && state.hasScenes) return state;
    await delay(waitMs);
  }
  return null;
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
    const manager = window.game?.scene;
    const candidates = ["${TARGET_SCENE}", "${TARGET_SCENE}Scene"];
    let scene = null;
    for (const candidate of candidates) {
      const byKey = manager?.getScene?.(candidate);
      if (byKey) {
        scene = byKey;
        break;
      }
    }
    if (!scene) {
      scene = (manager?.scenes || []).find((item) => item?.scene?.key === "${TARGET_SCENE}") || null;
    }
    const canvas = document.querySelector("canvas");
    if (!window.game || !window.game?.scene || !scene || !canvas) return null;
    if (!(manager?.isActive?.(scene.scene.key) || scene?.scene?.isActive?.())) return null;
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
        checked: Boolean(item?.check?.getData && item.check.getData("checked")),
        checkedAlpha: item?.check?.alpha ?? 0,
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

async function waitForObjectsScene(ws, attempts = 72, waitMs = 350) {
  for (let i = 0; i < attempts; i += 1) {
    const current = await snapshot(ws);
    if (current && current.rect?.width > 0) return current;
    await delay(waitMs);
  }
  return null;
}

async function startTargetScene(ws) {
  return evaluate(ws, `(() => {
    const target = "${TARGET_SCENE}";
    const manager = window.game?.scene;
    if (!manager) return false;
    const candidates = [target, target + "Scene"];
    let selected = null;
    for (const candidate of candidates) {
      const scene = manager.getScene?.(candidate);
      if (scene) {
        selected = scene;
        break;
      }
    }
    if (!selected) {
      selected = (manager.scenes || []).find((item) => item?.scene?.key === target);
    }
    if (!selected) return false;
    manager.start(selected.scene.key);
    return true;
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
    "--use-gl=swiftshader",
    "--no-sandbox",
    "--disable-software-rasterizer",
    "--disable-dev-shm-usage",
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
      if (message.method === "Runtime.consoleAPICalled") {
        const args = (message.params?.args || []).map((entry) => {
          if (typeof entry.value === "string") return entry.value;
          if (entry.description) return entry.description;
          return JSON.stringify(entry.value);
        }).filter(Boolean);
        consoleLogs.push({ type: message.params.type, args, timestamp: Date.now() });
        return;
      }
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

    await send(ws, "Network.enable");
    await send(ws, "Network.setCacheDisabled", { cacheDisabled: true });
    await send(ws, "Runtime.enable");
    await send(ws, "Input.setIgnoreInputEvents", { ignore: false });
    const managerState = await waitForSceneManager(ws);
    if (!managerState) {
      throw new Error("Scene manager not ready for objects test");
    }
    await startTargetScene(ws);

    const before = await waitForObjectsScene(ws);
    if (!before) {
      const debug = await evaluate(ws, `(() => ({
        hasGame: Boolean(window.game),
        isBooted: Boolean(window.game?.isBooted),
        hasPhaser: Boolean(window.Phaser),
        sceneManagerExists: Boolean(window.game?.scene),
        scriptsLoaded: document.scripts?.length || 0,
        activeScene: window.game?.scene?.isActive?.(window.game?.scene?.current) || null,
        currentScene: document.body.dataset.scene || null,
        sceneKeys: window.game?.scene ? (window.game.scene.scenes || []).map((scene) => scene?.scene?.key).filter(Boolean) : [],
        sceneManagerKeys: window.game?.scene ? Object.keys(window.game.scene.keys || {}) : [],
        url: window.location.href,
      }))()`);
      throw new Error(`Objects scene did not initialize. Debug: ${JSON.stringify({ ...debug, console: consoleLogs.slice(-8) })}`);
    }
    if (before.zones.length !== before.activeCount) {
      throw new Error(`Expected ${before.activeCount} hit zones, found ${before.zones.length}`);
    }
    if (before.checks.some((check) => check.checked || check.checkedAlpha > 0.05)) {
      throw new Error(`Checklist should start unchecked: ${JSON.stringify(before.checks)}`);
    }

    for (const zone of before.zones) {
      await dispatchDomClick(ws, gameToClient(before, zone.x, zone.y));
      await delay(180);
    }

    const after = await snapshot(ws);
    if (after.found !== after.activeCount) {
      throw new Error(`Expected all objects found. found=${after.found}, active=${after.activeCount}, zones=${JSON.stringify(after.zones)}`);
    }
    if (after.checks.some((check) => !check.checked)) {
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
