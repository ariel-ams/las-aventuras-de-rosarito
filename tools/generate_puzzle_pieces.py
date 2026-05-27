from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "puzzles" / "source"
GENERATED_DIR = ROOT / "assets" / "puzzles" / "generated"
PUZZLES_JSON = ROOT / "assets" / "puzzles" / "puzzles.json"

BOARD_SIZE = 512
CELL = BOARD_SIZE // 2
KNOB_RADIUS = 42

DEFAULT_TITLES = {
    "rosario_retrato_01": ("Retrato de Rosario", "Arma el retrato de Rosario Vera Penaloza."),
    "rosario_casa_01": ("Casa natal de Rosario", "Arma la imagen de la casa natal de Rosario."),
    "rosario_lectura_01": ("Rosario y la lectura", "Arma una escena de lectura y aprendizaje."),
    "rosario_infancia_01": ("Infancia de Rosario", "Arma una escena de la infancia de Rosario."),
}

PREFERRED_ORDER = [
    "rosario_retrato_01",
    "rosario_casa_01",
    "rosario_lectura_01",
    "rosario_infancia_01",
]


def load_existing_metadata() -> dict[str, dict]:
    if not PUZZLES_JSON.exists():
        return {}
    data = json.loads(PUZZLES_JSON.read_text(encoding="utf-8"))
    return {item["id"]: item for item in data.get("puzzles", []) if item.get("id")}


def fit_square(source: Image.Image) -> Image.Image:
    image = source.convert("RGBA")
    width, height = image.size
    side = min(width, height)
    left = (width - side) // 2
    top = (height - side) // 2
    image = image.crop((left, top, left + side, top + side))
    return image.resize((BOARD_SIZE, BOARD_SIZE), Image.Resampling.LANCZOS)


def circle_box(cx: int, cy: int, radius: int) -> tuple[int, int, int, int]:
    return (cx - radius, cy - radius, cx + radius, cy + radius)


def piece_mask(piece_id: int) -> Image.Image:
    mask = Image.new("L", (BOARD_SIZE, BOARD_SIZE), 0)
    draw = ImageDraw.Draw(mask)

    col = piece_id % 2
    row = piece_id // 2
    left = col * CELL
    top = row * CELL
    right = left + CELL
    bottom = top + CELL
    draw.rectangle((left, top, right, bottom), fill=255)

    if piece_id == 0:
        draw.ellipse(circle_box(CELL, 128, KNOB_RADIUS), fill=255)
        draw.ellipse(circle_box(168, CELL, KNOB_RADIUS), fill=0)
    elif piece_id == 1:
        draw.ellipse(circle_box(CELL, 128, KNOB_RADIUS), fill=0)
        draw.ellipse(circle_box(370, CELL, KNOB_RADIUS), fill=255)
    elif piece_id == 2:
        draw.ellipse(circle_box(168, CELL, KNOB_RADIUS), fill=255)
        draw.ellipse(circle_box(CELL, 372, KNOB_RADIUS), fill=0)
    elif piece_id == 3:
        draw.ellipse(circle_box(370, CELL, KNOB_RADIUS), fill=0)
        draw.ellipse(circle_box(CELL, 372, KNOB_RADIUS), fill=255)

    return mask


def render_piece(preview: Image.Image, mask: Image.Image) -> tuple[Image.Image, tuple[float, float]]:
    piece = Image.new("RGBA", preview.size, (0, 0, 0, 0))
    piece.paste(preview, (0, 0), mask)

    alpha = piece.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        raise RuntimeError("Empty puzzle mask")

    outline = ImageChops.subtract(alpha.filter(ImageFilter.MaxFilter(7)), alpha)
    outline_layer = Image.new("RGBA", preview.size, (222, 177, 105, 0))
    outline_layer.putalpha(outline.point(lambda value: min(value, 210)))

    inner = ImageChops.subtract(alpha, alpha.filter(ImageFilter.MinFilter(5)))
    inner_layer = Image.new("RGBA", preview.size, (255, 241, 203, 0))
    inner_layer.putalpha(inner.point(lambda value: min(value, 135)))

    shadow = Image.new("RGBA", preview.size, (75, 46, 24, 0))
    shadow.putalpha(alpha.filter(ImageFilter.GaussianBlur(5)).point(lambda value: int(value * 0.34)))

    full = Image.new("RGBA", preview.size, (0, 0, 0, 0))
    full.alpha_composite(shadow, (6, 7))
    full.alpha_composite(outline_layer)
    full.alpha_composite(piece)
    full.alpha_composite(inner_layer)

    expanded = (
        max(0, bbox[0] - 12),
        max(0, bbox[1] - 12),
        min(BOARD_SIZE, bbox[2] + 20),
        min(BOARD_SIZE, bbox[3] + 22),
    )
    center = ((expanded[0] + expanded[2]) / 2, (expanded[1] + expanded[3]) / 2)
    return full.crop(expanded), center


def build_puzzle_entry(source_path: Path, existing: dict[str, dict]) -> dict:
    puzzle_id = source_path.stem
    out_dir = GENERATED_DIR / puzzle_id
    out_dir.mkdir(parents=True, exist_ok=True)

    preview = fit_square(Image.open(source_path))
    preview.save(out_dir / "preview.png")

    pieces = []
    for piece_id in range(4):
        image, center = render_piece(preview, piece_mask(piece_id))
        image.save(out_dir / f"piece_{piece_id}.png")
        pieces.append({
            "id": piece_id,
            "key": f"puzzle-{puzzle_id}-piece-{piece_id}",
            "path": f"assets/puzzles/generated/{puzzle_id}/piece_{piece_id}.png",
            "centerX": round(center[0], 1),
            "centerY": round(center[1], 1),
        })

    prior = existing.get(puzzle_id, {})
    title, description = DEFAULT_TITLES.get(puzzle_id, (puzzle_id.replace("_", " ").title(), "Arma la imagen con sus piezas."))
    return {
        "id": puzzle_id,
        "title": prior.get("title", title),
        "description": prior.get("description", description),
        "sourceImage": f"assets/puzzles/source/{source_path.name}",
        "preview": f"assets/puzzles/generated/{puzzle_id}/preview.png",
        "previewKey": f"puzzle-{puzzle_id}-preview",
        "rows": 2,
        "cols": 2,
        "totalPieces": 4,
        "pieces": pieces,
    }


def main() -> None:
    existing = load_existing_metadata()
    sources = {path.stem: path for path in SOURCE_DIR.glob("*.png")}
    ordered_ids = [puzzle_id for puzzle_id in PREFERRED_ORDER if puzzle_id in sources]
    ordered_ids += sorted(puzzle_id for puzzle_id in sources if puzzle_id not in ordered_ids)
    entries = [build_puzzle_entry(sources[puzzle_id], existing) for puzzle_id in ordered_ids]
    PUZZLES_JSON.write_text(json.dumps({"puzzles": entries}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Generated {len(entries)} puzzles from {SOURCE_DIR}")


if __name__ == "__main__":
    main()
