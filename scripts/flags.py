import requests
from PIL import Image
from io import BytesIO

country_codes = [
    "us", "gb", "fr", "de", "jp", "cn", "in", "br", "ca", "au",
    "ru", "kr", "mx", "it", "es", "id", "tr", "sa", "nl", "ch",
    "ar", "se", "no", "pl", "za", "ng", "eg", "th", "pk", "bd"
]

cols = 5
cell_w, cell_h = 240, 160
padding = 12

def cover_crop(img, cell_w, cell_h):
    """Scale to fill cell, then center-crop — like CSS object-fit: cover."""
    img_ratio = img.width / img.height
    cell_ratio = cell_w / cell_h

    if img_ratio > cell_ratio:
        # image is wider than cell — scale by height, crop sides
        new_h = cell_h
        new_w = int(img.width * cell_h / img.height)
    else:
        # image is taller than cell — scale by width, crop top/bottom
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

canvas.save("flags_grid.png")
print(f"Saved {len(flags)} flags in a {cols}×{rows} grid.")
