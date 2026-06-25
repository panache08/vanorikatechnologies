"""Generate portfolio card images.

- Crops the real Beauty by Nyasha live screenshot to its title band (elegant, real).
- Generates clean branded report-cover PNGs for the security engagements
  (GlowTrack, Pearlsard) — professional covers, not error-state SVG fallbacks.

Run: python scripts/generate_portfolio_images.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "portfolio")
os.makedirs(OUT, exist_ok=True)

W, H = 1200, 750
GOLD = (201, 168, 76)
GOLD_LIGHT = (226, 201, 122)
DARK = (7, 7, 13)
CARD = (13, 13, 26)
WHITE = (240, 237, 232)
MUTED = (120, 130, 150)
RED = (239, 68, 68)
ORANGE = (249, 115, 22)


def font(size, bold=False, mono=False):
    candidates = (
        ["arialbd.ttf", "ArialBd.ttf"] if bold else
        ["consola.ttf"] if mono else
        ["arial.ttf", "Arial.ttf"]
    )
    for name in candidates:
        for base in ("C:/Windows/Fonts/", ""):
            try:
                return ImageFont.truetype(base + name, size)
            except OSError:
                continue
    return ImageFont.load_default()


def centered(draw, cx, y, text, fnt, fill):
    w = draw.textbbox((0, 0), text, font=fnt)[2]
    draw.text((cx - w / 2, y), text, font=fnt, fill=fill)


def grid(draw, color=(201, 168, 76), alpha=10, step=48):
    for x in range(0, W, step):
        draw.line([(x, 0), (x, H)], fill=color + (alpha,), width=1)
    for y in range(0, H, step):
        draw.line([(0, y), (W, y)], fill=color + (alpha,), width=1)


def report_cover(filename, client, category, findings, accent=GOLD):
    img = Image.new("RGB", (W, H), DARK)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    grid(d, alpha=8)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    d = ImageDraw.Draw(img)

    # top accent bar
    d.rectangle([0, 0, W, 6], fill=accent)
    # card panel
    d.rounded_rectangle([90, 90, W - 90, H - 90], radius=18, outline=(40, 40, 64), width=1, fill=CARD)

    d.text((130, 140), "VANORIKA TECHNOLOGIES", font=font(18, mono=True), fill=accent)
    d.text((130, 168), "SECURITY ASSESSMENT REPORT", font=font(13, mono=True), fill=MUTED)

    d.text((130, 235), client, font=font(54, bold=True), fill=WHITE)
    d.text((132, 305), category, font=font(22), fill=GOLD_LIGHT)
    d.line([(130, 350), (W - 130, 350)], fill=(50, 50, 80), width=1)

    y = 390
    sev_color = {"CRITICAL": RED, "HIGH": ORANGE, "MED": (234, 179, 8), "LOW": (120, 130, 150)}
    for sev, text in findings:
        c = sev_color.get(sev, MUTED)
        d.rounded_rectangle([130, y, 130 + 96, y + 26], radius=5, fill=(c[0] // 6, c[1] // 6, c[2] // 6), outline=c, width=1)
        bbox = d.textbbox((0, 0), sev, font=font(12, mono=True))
        d.text((130 + 48 - bbox[2] / 2, y + 5), sev, font=font(12, mono=True), fill=c)
        d.text((245, y + 3), text, font=font(17), fill=WHITE)
        y += 44

    d.text((130, H - 150), "Findings delivered as a branded PDF report", font=font(16), fill=(160, 160, 180))
    d.text((130, H - 122), "with prioritised remediation guidance.", font=font(16), fill=(160, 160, 180))
    img.save(os.path.join(OUT, filename), "PNG")
    print("wrote", filename)


# --- GlowTrack ---
report_cover(
    "glowtrack-auctions.png", "GlowTrack Auctions", "Web Application Penetration Test",
    [("CRITICAL", "Unauthenticated API endpoint"), ("HIGH", "Broken access control"),
     ("MED", "Outdated server software"), ("LOW", "Missing security headers")],
    accent=RED,
)

# --- Pearlsard ---
report_cover(
    "pearlsard-travel.png", "Pearlsard Travel", "Passive Security Assessment · 2 Domains",
    [("HIGH", "Live server error leaking info"), ("MED", "Broken Instagram bio link"),
     ("MED", "Missing privacy policy"), ("LOW", "Missing security headers")],
    accent=GOLD,
)


# --- Enterpro (pending verification; generated so the card isn't an error-state SVG) ---
report_cover(
    "enterpro.png", "Enterpro Pvt Ltd", "Security Assessment · Zimbabwe SME",
    [("HIGH", "Subdomain takeover risk"), ("MED", "Outdated SSL configuration"),
     ("LOW", "Missing security headers")],
    accent=GOLD,
)

# --- Crop the real Beauty screenshot to its title band (idempotent) ---
beauty_src = os.path.join(OUT, "beauty-by-nyasha.png")
if os.path.exists(beauty_src):
    im = Image.open(beauty_src).convert("RGB")
    w, h = im.size
    if h > 500:  # only crop the original tall screenshot, not an already-cropped band
        band = im.crop((0, int(h * 0.52), w, int(h * 0.99)))
        band.save(beauty_src, "PNG")
        print("cropped beauty-by-nyasha.png ->", band.size)
    else:
        print("beauty already cropped:", im.size)
else:
    print("WARN: beauty screenshot not found")

print("done")
