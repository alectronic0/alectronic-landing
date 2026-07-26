#!/usr/bin/env python3
import subprocess
import os
from PIL import Image

def capture_and_optimize():
    os.makedirs("img", exist_ok=True)
    targets = [
        ("https://date.alec.today/", "date-preview"),
        ("https://hire.alec.today/", "hire-preview"),
        ("https://raminta.coach/", "raminta-preview")
    ]

    for url, name in targets:
        png_path = f"img/{name}.png"
        webp_path = f"img/{name}.webp"
        print(f"📸 Capturing screenshot for {url}...")
        subprocess.run([
            "npx", "-y", "playwright", "screenshot",
            "--viewport-size=1280,720",
            url, png_path
        ], check=True)

        print(f"⚡ Optimizing {png_path} -> {webp_path}...")
        im = Image.open(png_path)
        im.thumbnail((800, 450))
        im.save(webp_path, "WEBP", quality=82)
        os.remove(png_path)
        print(f"✅ Saved {webp_path}")

if __name__ == "__main__":
    capture_and_optimize()
