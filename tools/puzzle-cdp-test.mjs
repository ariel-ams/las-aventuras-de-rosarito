import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const EDGE_PATH = process.env.EDGE_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = Number(process.env.CDP_PORT || 9344);
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:5322/index.html";
const runName = process.env.RUN_NAME || `puzzle-cdp-${Date.now()}`;
const profileDir = path.resolve("test-artifacts", `${runName}-profile`);
const url = `${BASE_URL}?scene=puzzle&qa=${runName}&cache=${Date.now()}`;

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

const pending = new Map();

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
    const scene = window.game?.scene?.keys?.PuzzleGame;
    const canvas = document.querySelector("canvas");
    if (!scene || !canvas || !scene.puzzle) return null;
    const rect = canvas.getBoundingClientRect();
    const pieces = scene.children.list
      .filter((item) => item.getData && item.getData("piece"))
      .map((item) => ({
        x: item.x,
        y: item.y,
        locked: Boolean(item.getData("locked")),
        piece: item.getData("piece"),
      }));
    const puzzleData = scene.cache.json.get("puzzles")?.puzzles || [];
    const missingTextures = puzzleData.flatMap((puzzle) => [
      puzzle.previewKey,
      ...puzzle.pieces.map((piece) => piece.key),
    ]).filter((key) => !scene.textures.exists(key));
    return {
      done: scene.done,
      pieces,
      missingTextures,
      rect: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
    };
  })()`);
}

async function dispatchDomDrag(ws, start, end) {
  const expression = `(() => {
    const canvas = document.querySelector("canvas");
    const firePointer = (type, x, y, buttons) => {
      canvas.dispatchEvent(new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        button: 0,
        buttons,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
      }));
    };
    const fireMouse = (type, x, y, buttons) => {
      canvas.dispatchEvent(new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        button: 0,
        buttons,
      }));
    };
    const points = [];
    for (let i = 0; i <= 8; i += 1) {
      points.push({
        x: ${start.x} + ((${end.x} - ${start.x}) * i) / 8,
        y: ${start.y} + ((${end.y} - ${start.y}) * i) / 8,
      });
    }
    firePointer("pointermove", points[0].x, points[0].y, 0);
    fireMouse("mousemove", points[0].x, points[0].y, 0);
    firePointer("pointerdown", points[0].x, points[0].y, 1);
    fireMouse("mousedown", points[0].x, points[0].y, 1);
    points.slice(1).forEach((point) => {
      firePointer("pointermove", point.x, point.y, 1);
      fireMouse("mousemove", point.x, point.y, 1);
    });
    firePointer("pointerup", points.at(-1).x, points.at(-1).y, 0);
    fireMouse("mouseup", points.at(-1).x, points.at(-1).y, 0);
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
    if (!before) throw new Error("Puzzle scene did not initialize");
    if (before.missingTextures.length) {
      throw new Error(`Missing puzzle textures: ${before.missingTextures.join(", ")}`);
    }
    if (before.pieces.length !== 4) {
      throw new Error(`Expected 4 puzzle pieces, found ${before.pieces.length}`);
    }

    const first = before.pieces[0];
    const start = gameToClient(before, first.x, first.y);
    const end = gameToClient(before, first.piece.targetX, first.piece.targetY);

    await dispatchDomDrag(ws, start, end);
    await delay(700);

    const after = await snapshot(ws);
    const lockedCount = after.pieces.filter((piece) => piece.locked).length;
    if (after.done < 1 || lockedCount < 1) {
      throw new Error(`Drag did not lock a piece. done=${after.done}, locked=${lockedCount}, rect=${JSON.stringify(before.rect)}, before=${JSON.stringify(first)}, afterPieces=${JSON.stringify(after.pieces)}, start=${JSON.stringify(start)}, end=${JSON.stringify(end)}`);
    }

    console.log(JSON.stringify({
      ok: true,
      pieces: after.pieces.length,
      lockedCount,
      done: after.done,
      missingTextures: after.missingTextures,
    }, null, 2));
    ws.close();
  } finally {
    edge.kill();
    if (stderr.includes("Failed to launch") || stderr.includes("ERROR")) {
      process.stderr.write(stderr.slice(-1200));
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
