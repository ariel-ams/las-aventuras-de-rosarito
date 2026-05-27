from __future__ import annotations

import json
from collections import deque
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "sprites"
OUT_DIR = ROOT / "assets" / "ui" / "minigame1_update"

SHEETS = [
    "minigame1_update.png",
    "minigame1_update2.png",
    "minigame1_update3.png",
    "minigame1_update4.png",
]


def remove_checkerboard(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
      for x in range(width):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        maxc = max(r, g, b)
        minc = min(r, g, b)
        if maxc - minc < 9 and (236 <= r <= 255) and (236 <= g <= 255) and (236 <= b <= 255):
            pixels[x, y] = (r, g, b, 0)
    return rgba


def alpha_components(image: Image.Image, min_area: int = 800) -> list[tuple[int, int, int, int, int]]:
    alpha = image.getchannel("A")
    width, height = image.size
    visited = bytearray(width * height)
    components = []

    def idx(x: int, y: int) -> int:
        return y * width + x

    for y in range(height):
        for x in range(width):
            index = idx(x, y)
            if visited[index] or alpha.getpixel((x, y)) == 0:
                visited[index] = 1
                continue
            queue = deque([(x, y)])
            visited[index] = 1
            area = 0
            left = right = x
            top = bottom = y
            while queue:
                cx, cy = queue.popleft()
                area += 1
                left = min(left, cx)
                right = max(right, cx)
                top = min(top, cy)
                bottom = max(bottom, cy)
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if nx < 0 or nx >= width or ny < 0 or ny >= height:
                        continue
                    nindex = idx(nx, ny)
                    if visited[nindex]:
                        continue
                    visited[nindex] = 1
                    if alpha.getpixel((nx, ny)) > 0:
                        queue.append((nx, ny))
            if area >= min_area:
                components.append((left, top, right + 1, bottom + 1, area))
    return sorted(components, key=lambda box: (box[1], box[0]))


def save_crop(image: Image.Image, box: tuple[int, int, int, int], name: str) -> dict:
    pad = 8
    left, top, right, bottom = box
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(image.width, right + pad)
    bottom = min(image.height, bottom + pad)
    crop = image.crop((left, top, right, bottom))
    path = OUT_DIR / f"{name}.png"
    crop.save(path)
    return {"name": name, "path": str(path.relative_to(ROOT)).replace("\\", "/"), "box": [left, top, right, bottom], "size": list(crop.size)}


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    for sheet_name in SHEETS:
        sheet = remove_checkerboard(Image.open(SOURCE_DIR / sheet_name))
        clean_path = OUT_DIR / f"{Path(sheet_name).stem}_clean.png"
        sheet.save(clean_path)
        for index, comp in enumerate(alpha_components(sheet), start=1):
            left, top, right, bottom, area = comp
            width = right - left
            height = bottom - top
            if width < 24 or height < 24:
                continue
            name = f"{Path(sheet_name).stem}_{index:02d}"
            entry = save_crop(sheet, (left, top, right, bottom), name)
            entry["area"] = area
            manifest.append(entry)
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Extracted {len(manifest)} sprites to {OUT_DIR}")


if __name__ == "__main__":
    main()
