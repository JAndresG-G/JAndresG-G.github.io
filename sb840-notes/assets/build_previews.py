"""Generate lightweight WebP previews for mockup pages."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent / "images"
OUT = ROOT / "previews"

PRESETS = {
    "card": {"max_width": 720, "quality": 72},
    "hero": {"max_width": 1280, "quality": 74},
    "inline": {"max_width": 1400, "quality": 78},
}


def resize_image(image: Image.Image, max_width: int) -> Image.Image:
    if image.width <= max_width:
        return image
    ratio = max_width / image.width
    size = (max_width, max(1, round(image.height * ratio)))
    return image.resize(size, Image.Resampling.LANCZOS)


def save_webp(src: Path, dest: Path, max_width: int, quality: int) -> tuple[int, int]:
    with Image.open(src) as image:
        image = image.convert("RGB") if image.mode in {"RGBA", "P", "LA"} else image
        preview = resize_image(image, max_width)
        dest.parent.mkdir(parents=True, exist_ok=True)
        preview.save(dest, format="WEBP", quality=quality, method=6)
        return src.stat().st_size, dest.stat().st_size


def main() -> None:
  sources = sorted(ROOT.glob("*.png"))
  if not sources:
    raise SystemExit(f"No PNG sources found in {ROOT}")

  print(f"Building previews for {len(sources)} images...")
  for src in sources:
    name = src.stem
    for preset_name, options in PRESETS.items():
      dest = OUT / preset_name / f"{name}.webp"
      before, after = save_webp(src, dest, options["max_width"], options["quality"])
      print(
        f"  {preset_name:6} {src.name:40} "
        f"{before / 1024:7.1f} KB -> {after / 1024:6.1f} KB"
      )


if __name__ == "__main__":
  main()
