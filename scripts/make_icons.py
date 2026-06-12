"""アプリアイコン一式を元画像1枚から生成する。

使い方: python3 scripts/make_icons.py <元画像1024x1024>
出力: public/icon-512.png / icon-192.png / apple-touch-icon.png / favicon.svg
"""
import base64
import io
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

SIZES = {
    "icon-512.png": 512,
    "icon-192.png": 192,
    "apple-touch-icon.png": 180,
}
FAVICON_PX = 128


def main() -> None:
    src_path = Path(sys.argv[1])
    src = Image.open(src_path).convert("RGB")
    if src.size != (1024, 1024):
        raise SystemExit(f"元画像が1024x1024ではない: {src.size}")

    for name, px in SIZES.items():
        out = src.resize((px, px), Image.LANCZOS)
        out.save(PUBLIC / name, optimize=True)
        print(f"{name}: {px}x{px} {(PUBLIC / name).stat().st_size:,} bytes")

    fav = src.resize((FAVICON_PX, FAVICON_PX), Image.LANCZOS)
    buf = io.BytesIO()
    fav.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'width="{FAVICON_PX}" height="{FAVICON_PX}" '
        f'viewBox="0 0 {FAVICON_PX} {FAVICON_PX}">'
        f'<image width="{FAVICON_PX}" height="{FAVICON_PX}" '
        f'href="data:image/png;base64,{b64}"/></svg>'
    )
    (PUBLIC / "favicon.svg").write_text(svg, encoding="utf-8")
    print(f"favicon.svg: {FAVICON_PX}px埋め込み {(PUBLIC / 'favicon.svg').stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
