"""Generate the branded 'State of Zimbabwe Web Security 2026' report PDF.

Run: python scripts/generate_report.py
Keep the figures in sync with the page at
src/app/(pages)/research/zimbabwe-web-security-2026/page.tsx
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER

GOLD = colors.HexColor("#C9A84C")
GOLD_LIGHT = colors.HexColor("#E2C97A")
DARK = colors.HexColor("#07070D")
INK = colors.HexColor("#1A1A1A")
MUTED = colors.HexColor("#555555")
TRACK = colors.HexColor("#ECECEC")

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "research")
os.makedirs(OUT_DIR, exist_ok=True)

# EDIT to match real anonymised data (keep in sync with the page).
TOTAL = 17
HEADLINE = [("17", "Businesses assessed"), ("5", "Sectors covered"),
            ("16/17", "Had a fixable vuln"), ("57", "Findings logged")]
# (label, count of TOTAL); percentages are derived so the math reconciles.
_FINDINGS = [
    ("Missing critical security headers", 15),
    ("No privacy policy (DPA 2021 gap)", 12),
    ("Outdated software / CMS / plugins", 11),
    ("No HTTPS redirect / weak TLS", 8),
    ("No SPF/DMARC: email spoofable", 7),
    ("Exposed admin panel / endpoint", 4),
]
FINDINGS = [(label, round(c / TOTAL * 100), c) for label, c in _FINDINGS]
SECTORS = "Hospitality · Healthcare · Law firms · Schools · NGOs"


def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle("RTitle", fontName="Helvetica-Bold", fontSize=26, leading=30, textColor=INK, spaceAfter=4))
    s.add(ParagraphStyle("RSub", fontName="Helvetica", fontSize=11, leading=15, textColor=MUTED, spaceAfter=16))
    s.add(ParagraphStyle("RH2", fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=INK, spaceBefore=16, spaceAfter=6))
    s.add(ParagraphStyle("RBody", fontName="Helvetica", fontSize=10.5, leading=16, textColor=INK, spaceAfter=6))
    s.add(ParagraphStyle("RItem", fontName="Helvetica", fontSize=10.5, leading=15, textColor=INK))
    return s


def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(DARK); canvas.rect(0, h - 24 * mm, w, 24 * mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD); canvas.rect(0, h - 25 * mm, w, 1 * mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD_LIGHT); canvas.setFont("Helvetica-Bold", 13)
    canvas.drawString(18 * mm, h - 16 * mm, "VANORIKA")
    canvas.setFillColor(colors.white); canvas.setFont("Helvetica", 8)
    canvas.drawString(18 * mm, h - 20 * mm, "TECHNOLOGIES  ·  Security Research")
    canvas.drawRightString(w - 18 * mm, h - 18 * mm, "vanorikatechnologies.co.zw")
    canvas.setFillColor(MUTED); canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(w / 2, 12 * mm, "Free assessment: WhatsApp +263 77 690 2542  ·  vanorikatechnologies.co.zw")
    canvas.setFont("Helvetica", 7)
    canvas.drawCentredString(w / 2, 8 * mm, "Aggregated & anonymised. Passive assessment only. Not legal advice.")
    canvas.restoreState()


def bar(pct):
    t = Table([[""]], colWidths=[(pct / 100.0) * 120 * mm], rowHeights=[3.5 * mm])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD), ("LINEBELOW", (0, 0), (-1, -1), 0, colors.white)]))
    return t


def build():
    s = styles()
    path = os.path.join(OUT_DIR, "zimbabwe-web-security-2026.pdf")
    doc = SimpleDocTemplate(path, pagesize=A4, topMargin=32 * mm, bottomMargin=20 * mm,
                            leftMargin=18 * mm, rightMargin=18 * mm,
                            title="The State of Zimbabwe Web Security 2026", author="Vanorika Technologies")
    story = [
        Paragraph("The State of Zimbabwe Web Security 2026", s["RTitle"]),
        Paragraph("What we found assessing 17 Harare businesses across 5 sectors, and what every Zimbabwean business owner should take from it.", s["RSub"]),
    ]

    # headline stats row
    cells = [[Paragraph(f'<font size=20 color="#C9A84C"><b>{v}</b></font><br/><font size=8 color="#555555">{l}</font>', s["RBody"]) for v, l in HEADLINE]]
    t = Table(cells, colWidths=[43 * mm] * 4)
    t.setStyle(TableStyle([("ALIGN", (0, 0), (-1, -1), "CENTER"), ("BOX", (0, 0), (-1, -1), 0.5, TRACK),
                           ("INNERGRID", (0, 0), (-1, -1), 0.5, TRACK), ("TOPPADDING", (0, 0), (-1, -1), 10),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 10)]))
    story += [t, Spacer(1, 8 * mm)]

    story.append(Paragraph("We ran passive, no-touch assessments: no logins, no port scanning, nothing intrusive. "
                           "Everything below comes from publicly available information any attacker could see.", s["RBody"]))

    story.append(Paragraph("What we found", s["RH2"]))
    for label, pct, count in FINDINGS:
        story.append(Paragraph(f'<b>{count} of {TOTAL}</b> ({pct}%)  {label}', s["RBody"]))
        story.append(bar(pct))
        story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("Sectors assessed", s["RH2"]))
    story.append(Paragraph(SECTORS, s["RBody"]))

    story.append(Paragraph("What to do about it", s["RH2"]))
    items = [
        "Add the core security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options).",
        "Update your CMS, plugins and server software, then keep them updated.",
        "Publish a privacy policy and force HTTP to redirect to HTTPS.",
        "Set SPF and DMARC so no one can spoof email from your domain.",
        "Get a free passive assessment so you know exactly where you stand.",
    ]
    story.append(ListFlowable([ListItem(Paragraph(x, s["RItem"]), leftIndent=10) for x in items],
                              bulletType="bullet", start="•", bulletColor=GOLD, leftIndent=8))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print("wrote", path)


build()
