from pathlib import Path

import numpy as np
from PIL import Image


SOURCE_DIR = Path("assets/dones")
OUTPUT_DIR = Path("assets/dones/generated")


CROPS = {
    "don_1": {
        "main": (60, 65, 930, 585),
        "pelota_roja": (65, 625, 198, 760),
        "pelota_azul": (245, 625, 382, 760),
        "pelota_amarilla": (418, 625, 555, 760),
        "pelota_verde": (588, 625, 722, 760),
        "pelota_naranja": (756, 625, 890, 760),
        "pelota_violeta": (898, 625, 1035, 760),
        "cubo_de_madera": (50, 785, 230, 1005),
        "campana": (295, 792, 470, 1005),
        "pluma": (520, 770, 705, 1015),
        "libro": (710, 792, 920, 1005),
        "regla": (945, 800, 1125, 1000),
        "taza": (1168, 790, 1360, 995),
    },
    "don_3": {
        "main": (70, 18, 690, 665),
        "cubito_madera": (745, 190, 1395, 475),
        "caja_cubitos": (945, 510, 1168, 715),
        "esfera": (96, 838, 284, 1032),
        "cilindro": (320, 838, 500, 1034),
        "aro": (520, 835, 710, 1032),
        "pluma": (735, 828, 905, 1045),
        "pelota_lana": (925, 840, 1118, 1032),
        "campana": (1162, 820, 1334, 1048),
    },
    "don_7": {
        "main": (112, 42, 885, 600),
        "cuadrado_plano": (132, 635, 306, 805),
        "triangulo_plano": (360, 625, 530, 810),
        "circulo_plano": (590, 632, 760, 807),
        "rectangulo_plano": (814, 652, 1058, 795),
        "semicirculo_plano": (1100, 650, 1320, 798),
        "cubo": (125, 835, 320, 1038),
        "esfera": (364, 835, 554, 1032),
        "cilindro": (610, 835, 780, 1038),
        "campana": (860, 828, 1018, 1045),
        "pluma": (1058, 820, 1198, 1032),
        "tintero": (1212, 850, 1366, 1032),
    },
}


def remove_checkerboard(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    arr = np.array(image)
    rgb = arr[:, :, :3].astype(np.int16)
    alpha = arr[:, :, 3]
    max_rgb = rgb.max(axis=2)
    min_rgb = rgb.min(axis=2)
    diff_rgb = max_rgb - min_rgb

    # The sheets use a fake transparency checkerboard made of neutral whites.
    # Only near-neutral light pixels are removed, which preserves beige panels,
    # wood, yarn highlights, and anti-aliased colored edges.
    checker = (min_rgb >= 218) & (diff_rgb <= 16)
    near_checker = (min_rgb >= 204) & (diff_rgb <= 24)
    alpha[checker | near_checker] = 0
    arr[:, :, 3] = alpha
    return Image.fromarray(arr, "RGBA")


def trim(image: Image.Image, padding: int = 8) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        return image
    left = max(0, bbox[0] - padding)
    top = max(0, bbox[1] - padding)
    right = min(image.width, bbox[2] + padding)
    bottom = min(image.height, bbox[3] + padding)
    return image.crop((left, top, right, bottom))


def extract_sheet(sheet_id: str) -> None:
    source = SOURCE_DIR / f"{sheet_id}.png"
    image = remove_checkerboard(Image.open(source))
    for sprite_id, box in CROPS[sheet_id].items():
        sprite = trim(image.crop(box))
        sprite.save(OUTPUT_DIR / f"{sheet_id}_{sprite_id}.png")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for sheet_id in CROPS:
        extract_sheet(sheet_id)
        print(f"Extracted {sheet_id}")


if __name__ == "__main__":
    main()
