"""Generate the three branded Vanorika resource PDFs into public/resources/.

Run:  python scripts/generate_resources.py
Uses the same ReportLab setup as the audit reports. Brand: gold on near-black.
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, ListFlowable, ListItem,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER

GOLD = colors.HexColor("#C9A84C")
GOLD_LIGHT = colors.HexColor("#E2C97A")
DARK = colors.HexColor("#07070D")
INK = colors.HexColor("#1A1A1A")
MUTED = colors.HexColor("#555555")

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "resources")
os.makedirs(OUT_DIR, exist_ok=True)


def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle("VTitle", fontName="Helvetica-Bold", fontSize=24, leading=28, textColor=INK, spaceAfter=6))
    s.add(ParagraphStyle("VSub", fontName="Helvetica", fontSize=11, leading=15, textColor=MUTED, spaceAfter=18))
    s.add(ParagraphStyle("VH2", fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=INK, spaceBefore=14, spaceAfter=6))
    s.add(ParagraphStyle("VBody", fontName="Helvetica", fontSize=10.5, leading=16, textColor=INK, spaceAfter=6))
    s.add(ParagraphStyle("VItem", fontName="Helvetica", fontSize=10.5, leading=15, textColor=INK))
    s.add(ParagraphStyle("VFoot", fontName="Helvetica", fontSize=8, leading=11, textColor=MUTED, alignment=TA_CENTER))
    return s


def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    # top band
    canvas.setFillColor(DARK)
    canvas.rect(0, h - 26 * mm, w, 26 * mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.rect(0, h - 27 * mm, w, 1 * mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD_LIGHT)
    canvas.setFont("Helvetica-Bold", 14)
    canvas.drawString(18 * mm, h - 17 * mm, "VANORIKA")
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(18 * mm, h - 21 * mm, "TECHNOLOGIES  ·  Enterprise Security. Zero Compromise.")
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(w - 18 * mm, h - 19 * mm, "vanorikatechnologies.co.zw")
    # footer
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(w / 2, 12 * mm, "Vanorika Technologies  ·  Harare, Zimbabwe  ·  +263 77 690 2542  ·  WhatsApp for a free assessment")
    canvas.setFont("Helvetica", 7)
    canvas.drawCentredString(w / 2, 8 * mm, "Free resource. Share freely. Not legal advice.")
    canvas.restoreState()


def build(filename, title, subtitle, blocks):
    path = os.path.join(OUT_DIR, filename)
    doc = SimpleDocTemplate(path, pagesize=A4, topMargin=34 * mm, bottomMargin=20 * mm,
                            leftMargin=18 * mm, rightMargin=18 * mm, title=title, author="Vanorika Technologies")
    s = styles()
    story = [Paragraph(title, s["VTitle"]), Paragraph(subtitle, s["VSub"])]
    for block in blocks:
        kind = block[0]
        if kind == "h2":
            story.append(Paragraph(block[1], s["VH2"]))
        elif kind == "p":
            story.append(Paragraph(block[1], s["VBody"]))
        elif kind == "checklist":
            items = [ListItem(Paragraph(x, s["VItem"]), value="☐", leftIndent=10) for x in block[1]]
            story.append(ListFlowable(items, bulletType="bullet", start="☐", bulletColor=GOLD, leftIndent=8, spaceAfter=8))
        elif kind == "bullets":
            items = [ListItem(Paragraph(x, s["VItem"]), leftIndent=10) for x in block[1]]
            story.append(ListFlowable(items, bulletType="bullet", start="•", bulletColor=GOLD, leftIndent=8, spaceAfter=8))
        elif kind == "space":
            story.append(Spacer(1, block[1] * mm))
        elif kind == "cta":
            t = Table([[Paragraph("<b>Want this done for you?</b>  A free passive assessment shows exactly where you stand. "
                                  "WhatsApp +263 77 690 2542 or visit vanorikatechnologies.co.zw.", s["VBody"])]],
                      colWidths=[174 * mm])
            t.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FBF6E9")),
                ("BOX", (0, 0), (-1, -1), 0.75, GOLD),
                ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]))
            story.append(Spacer(1, 6 * mm))
            story.append(t)
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print("wrote", path)


build(
    "vanorika-website-security-checklist.pdf",
    "Zimbabwe Website Security Checklist",
    "A practical, no-jargon checklist for any business website. Tick each item. Anything left unchecked is worth fixing.",
    [
        ("h2", "Transport &amp; certificates"),
        ("checklist", [
            "Site loads over HTTPS with a valid, in-date SSL certificate",
            "HTTP automatically redirects to HTTPS",
            "HSTS header is set so browsers always use HTTPS",
        ]),
        ("h2", "Security headers"),
        ("checklist", [
            "Content-Security-Policy is configured",
            "X-Frame-Options (or CSP frame-ancestors) prevents clickjacking",
            "X-Content-Type-Options is set to nosniff",
            "Referrer-Policy limits what is leaked to third parties",
        ]),
        ("h2", "Software &amp; access"),
        ("checklist", [
            "CMS, plugins, themes and server software are up to date",
            "Admin accounts use strong, unique passwords",
            "Two-factor authentication is enabled on the admin panel",
            "The password-reset flow uses expiring, single-use tokens",
        ]),
        ("h2", "Data &amp; compliance"),
        ("checklist", [
            "A privacy policy is published and linked from every page",
            "Contact / booking forms have spam protection",
            "Personal data is collected only where genuinely needed",
            "Backups are taken regularly and tested",
        ]),
        ("cta",),
    ],
)

build(
    "vanorika-dpa-2021-compliance-guide.pdf",
    "DPA 2021 Compliance Guide for SMEs",
    "A plain-English starting point for Zimbabwe's Cyber and Data Protection Act (2021). Not legal advice, just a practical orientation.",
    [
        ("h2", "What the Act expects of you"),
        ("bullets", [
            "<b>Collect only what you need</b>, and tell people why you are collecting it.",
            "<b>Keep it secure</b>, with appropriate technical safeguards against loss or theft.",
            "<b>Get consent</b> for how you use and share personal information.",
            "<b>Allow access &amp; correction</b>: individuals can ask what you hold about them.",
            "<b>Register where required</b>, and appoint someone responsible for data protection.",
        ]),
        ("h2", "Who it applies to"),
        ("p", "Almost every business that collects customer or staff data (names, phone numbers, ID numbers, payment "
              "details). It applies regardless of how small your business is. Oversight sits with POTRAZ acting as the "
              "Data Protection Authority."),
        ("h2", "What non-compliance can cost"),
        ("bullets", [
            "Significant fines, and for serious breaches the possibility of imprisonment for those responsible.",
            "Reputational damage: a public breach in Zimbabwe's business community travels fast.",
            "Lost customers and potential liability to affected individuals.",
        ]),
        ("h2", "A practical first-90-days checklist"),
        ("checklist", [
            "Map what personal data you hold and where it lives",
            "Publish a clear privacy policy on your website",
            "Secure your systems (see our Website Security Checklist)",
            "Appoint a person responsible for data protection",
            "Document your consent and data-handling practices",
        ]),
        ("cta",),
    ],
)

build(
    "vanorika-is-my-website-secure-self-assessment.pdf",
    "“Is My Website Secure?” Self-Assessment",
    "Answer honestly. Score 1 point per Yes. The result tells you how exposed you are right now.",
    [
        ("h2", "Score yourself (Yes = 1 point)"),
        ("checklist", [
            "My site uses HTTPS and the certificate is valid and current",
            "I know the last time my website software was updated (within 3 months)",
            "My admin login has a strong password and two-factor authentication",
            "I have a published privacy policy",
            "My contact / booking forms have spam protection",
            "I have working, recent backups of the site",
            "I have never had a security review done on this site (score 0 if you HAVE)",
            "I know which security headers my site sends (score this as Yes only if you genuinely do)",
        ]),
        ("h2", "What your score means"),
        ("bullets", [
            "<b>7-8</b>: Strong. Worth a professional review to confirm and close edge cases.",
            "<b>4-6</b>: Average. You have real, fixable gaps that an attacker could find.",
            "<b>0-3</b>: Exposed. Treat this as urgent; the basics are not in place.",
        ]),
        ("p", "Wherever you landed, the fastest way to know for certain is a free passive assessment: we check from the "
              "outside, without touching your live site, and tell you exactly what to fix first."),
        ("cta",),
    ],
)

print("done")
