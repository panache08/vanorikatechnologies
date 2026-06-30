"""Generate a redacted SAMPLE penetration-test report PDF so prospects can see
report quality before engaging. Output: public/sample-pentest-report.pdf

Run: python scripts/generate_sample_report.py
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, ListFlowable, ListItem, PageBreak,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

GOLD = colors.HexColor("#C9A84C")
GOLD_LIGHT = colors.HexColor("#E2C97A")
DARK = colors.HexColor("#07070D")
INK = colors.HexColor("#1A1A1A")
MUTED = colors.HexColor("#555555")
RED = colors.HexColor("#DC2626")
ORANGE = colors.HexColor("#EA580C")
YELLOW = colors.HexColor("#CA8A04")
GREY = colors.HexColor("#6B7280")

OUT = os.path.join(os.path.dirname(__file__), "..", "public")
os.makedirs(OUT, exist_ok=True)

SEV = {"CRITICAL": RED, "HIGH": ORANGE, "MEDIUM": YELLOW, "LOW": GREY}


def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle("T", fontName="Helvetica-Bold", fontSize=24, leading=28, textColor=INK, spaceAfter=4))
    s.add(ParagraphStyle("Sub", fontName="Helvetica", fontSize=11, leading=15, textColor=MUTED, spaceAfter=14))
    s.add(ParagraphStyle("H2", fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=INK, spaceBefore=14, spaceAfter=6))
    s.add(ParagraphStyle("H3", fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=INK, spaceBefore=10, spaceAfter=3))
    s.add(ParagraphStyle("B", fontName="Helvetica", fontSize=10, leading=15, textColor=INK, spaceAfter=5))
    s.add(ParagraphStyle("Small", fontName="Helvetica", fontSize=8.5, leading=12, textColor=MUTED))
    s.add(ParagraphStyle("Mono", fontName="Courier", fontSize=8.5, leading=12, textColor=INK))
    return s


def hf(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(DARK); canvas.rect(0, h - 22 * mm, w, 22 * mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD); canvas.rect(0, h - 23 * mm, w, 1 * mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD_LIGHT); canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(18 * mm, h - 15 * mm, "VANORIKA TECHNOLOGIES")
    canvas.setFillColor(colors.white); canvas.setFont("Helvetica", 8)
    canvas.drawRightString(w - 18 * mm, h - 15 * mm, "CONFIDENTIAL · SAMPLE REPORT")
    canvas.setFillColor(MUTED); canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(w / 2, 12 * mm, "Sample report — client name, hostnames and evidence redacted. Real reports include full proof-of-concept and remediation steps.")
    canvas.drawRightString(w - 18 * mm, 8 * mm, f"Page {doc.page}")
    canvas.setFont("Helvetica", 8); canvas.drawString(18 * mm, 8 * mm, "vanorikatechnologies.co.zw")
    canvas.restoreState()


def sev_table(rows, s):
    data = [["#", "Severity", "Finding"]]
    for i, (sev, name) in enumerate(rows, 1):
        data.append([str(i), sev, name])
    t = Table(data, colWidths=[10 * mm, 30 * mm, 122 * mm])
    style = [("FONT", (0, 0), (-1, 0), "Helvetica-Bold", 9), ("FONT", (0, 1), (-1, -1), "Helvetica", 9.5),
             ("TEXTCOLOR", (0, 0), (-1, 0), colors.white), ("BACKGROUND", (0, 0), (-1, 0), DARK),
             ("LINEBELOW", (0, 0), (-1, -1), 0.4, colors.HexColor("#DDDDDD")),
             ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]
    for i, (sev, _) in enumerate(rows, 1):
        style.append(("TEXTCOLOR", (1, i), (1, i), SEV[sev]))
        style.append(("FONT", (1, i), (1, i), "Helvetica-Bold", 9))
    t.setStyle(TableStyle(style))
    return t


def finding(s, sev, title, ref, desc, impact, remediation, evidence):
    color = SEV[sev]
    out = []
    chip = Table([[f"{sev}", title]], colWidths=[28 * mm, 134 * mm])
    chip.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), color), ("TEXTCOLOR", (0, 0), (0, 0), colors.white),
        ("FONT", (0, 0), (0, 0), "Helvetica-Bold", 9), ("FONT", (1, 0), (1, 0), "Helvetica-Bold", 12),
        ("TEXTCOLOR", (1, 0), (1, 0), INK), ("ALIGN", (0, 0), (0, 0), "CENTER"), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6), ("LEFTPADDING", (1, 0), (1, 0), 10),
    ]))
    out += [chip, Spacer(1, 4 * mm)]
    out += [Paragraph(f"<b>Reference:</b> {ref}", s["Small"]), Spacer(1, 2 * mm)]
    out += [Paragraph("Description", s["H3"]), Paragraph(desc, s["B"])]
    out += [Paragraph("Business impact", s["H3"]), Paragraph(impact, s["B"])]
    out += [Paragraph("Evidence (redacted)", s["H3"]), Paragraph(evidence, s["Mono"])]
    out += [Paragraph("Remediation", s["H3"]), Paragraph(remediation, s["B"]), Spacer(1, 6 * mm)]
    return out


def build():
    s = styles()
    path = os.path.join(OUT, "sample-pentest-report.pdf")
    doc = SimpleDocTemplate(path, pagesize=A4, topMargin=30 * mm, bottomMargin=18 * mm,
                            leftMargin=18 * mm, rightMargin=18 * mm,
                            title="Sample Penetration Test Report", author="Vanorika Technologies")
    story = [
        Paragraph("Penetration Test Report", s["T"]),
        Paragraph("Web Application &amp; External Infrastructure · Sample (redacted) · Prepared by Vanorika Technologies", s["Sub"]),
    ]

    meta = Table([
        ["Client", "[REDACTED] · Harare, Zimbabwe"],
        ["Engagement", "External web application penetration test"],
        ["Scope", "1 primary web app, 2 subdomains, public infrastructure"],
        ["Method", "OWASP-aligned, manual + automated, authenticated & unauthenticated"],
        ["Tester", "Donovan Mudarikwa · CompTIA PenTest+"],
    ], colWidths=[34 * mm, 128 * mm])
    meta.setStyle(TableStyle([("FONT", (0, 0), (0, -1), "Helvetica-Bold", 9), ("FONT", (1, 0), (1, -1), "Helvetica", 9.5),
                              ("TEXTCOLOR", (0, 0), (0, -1), MUTED), ("TEXTCOLOR", (1, 0), (1, -1), INK),
                              ("LINEBELOW", (0, 0), (-1, -1), 0.4, colors.HexColor("#EEEEEE")),
                              ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
    story += [meta, Spacer(1, 6 * mm)]

    story += [Paragraph("Executive summary", s["H2"])]
    story += [Paragraph(
        "Vanorika Technologies assessed the in-scope web application and public infrastructure for security "
        "weaknesses. The testing identified <b>one Critical</b> and several lower-severity issues that, combined, "
        "would let an attacker access data they should not. All Critical and High findings were reported to the "
        "client during testing and remediated before this report was finalised. Risk ratings reflect business "
        "impact and ease of exploitation, not just technical severity.", s["B"])]

    story += [Paragraph("Findings at a glance", s["H2"])]
    story += [sev_table([
        ("CRITICAL", "Authentication bypass on an unprotected API endpoint"),
        ("HIGH", "Broken access control — horizontal privilege escalation"),
        ("MEDIUM", "Outdated CMS component with a known CVE"),
        ("MEDIUM", "Missing security headers (CSP, HSTS)"),
        ("LOW", "Verbose error messages leak internal paths"),
    ], s)]

    story += [PageBreak(), Paragraph("Detailed findings", s["H2"])]
    story += finding(
        s, "CRITICAL", "Authentication bypass on an unprotected API endpoint", "VAN-2026-01",
        "An internal API endpoint returning customer records was reachable without any authentication token. "
        "Requesting the endpoint directly returned full records belonging to other users.",
        "An attacker could enumerate and exfiltrate the entire customer database — names, contact details and order "
        "history — leading to a reportable data breach under the Data Protection Act (2021).",
        "Enforce authentication and object-level authorisation on every API route; deny by default. Add server-side "
        "checks that the requesting user owns the records being returned.",
        "GET /api/v1/customers/<id> → 200 OK  (no Authorization header)  [response body redacted]",
    )
    story += finding(
        s, "HIGH", "Broken access control — horizontal privilege escalation", "VAN-2026-02",
        "By changing a numeric identifier in a request, a logged-in user could view and modify another user's account.",
        "Any customer could tamper with other customers' data, undermining trust and integrity of the platform.",
        "Validate ownership of every referenced object server-side; use non-guessable identifiers; log access anomalies.",
        "POST /account/update  {\"user_id\": <other_user>}  → 200 OK",
    )

    doc.build(story, onFirstPage=hf, onLaterPages=hf)
    print("wrote", path)


build()
