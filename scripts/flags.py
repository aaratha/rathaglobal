import requests
from PIL import Image
from io import BytesIO
from pathlib import Path

country_codes = [
    "in", "br", "mx", "tr", "za", "ng", "eg", "th", "bo", "vn",
    "ph", "ar", "ke", "gh", "et", "tz", "ug", "rw", "sn", "tn",
    "co", "pe", "cl", "my", "ec", "lk", "ao", "cm", "ci", "zm"
]

cols = 5
cell_w, cell_h = 240, 160
padding = 12

def cover_crop(img, cell_w, cell_h):
    """Scale to fill cell, then center-crop — like CSS object-fit: cover."""
    img_ratio = img.width / img.height
    cell_ratio = cell_w / cell_h

    if img_ratio > cell_ratio:
        new_h = cell_h
        new_w = int(img.width * cell_h / img.height)
    else:
        new_w = cell_w
        new_h = int(img.height * cell_w / img.width)

    img = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - cell_w) // 2
    top = (new_h - cell_h) // 2
    return img.crop((left, top, left + cell_w, top + cell_h))

flags = []
for code in country_codes:
    url = f"https://flagcdn.com/w320/{code}.png"
    resp = requests.get(url)
    if resp.status_code == 200 and resp.headers.get("Content-Type", "").startswith("image"):
        try:
            flag = Image.open(BytesIO(resp.content)).convert("RGB")
            flags.append(cover_crop(flag, cell_w, cell_h))
        except Exception as e:
            print(f"Skipping {code}: {e}")
    else:
        print(f"Bad response for {code}: {resp.status_code}")

rows = -(-len(flags) // cols)
canvas_w = padding + cols * (cell_w + padding)
canvas_h = padding + rows * (cell_h + padding)
canvas = Image.new("RGB", (canvas_w, canvas_h), "white")

for i, flag in enumerate(flags):
    x = padding + (i % cols) * (cell_w + padding)
    y = padding + (i // cols) * (cell_h + padding)
    canvas.paste(flag, (x, y))

repo_root = Path(__file__).resolve().parent.parent
canvas.save(repo_root / "public" / "flags_grid.png")
canvas.save(Path(__file__).resolve().parent / "flags_grid.png")
print(f"Saved {len(flags)} flags in a {cols}×{rows} grid.")
