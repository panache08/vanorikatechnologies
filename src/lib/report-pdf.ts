import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type RGB } from "pdf-lib";

// Structural shape of the /api/report response (kept local to avoid importing a route module).
export type ReportCheck = {
  id: string;
  label: string;
  pass: boolean;
  weight: number;
  severity: "high" | "medium" | "low";
  detail: string;
  fix: string;
};
export type TopFinding = { label: string; severity: "high" | "medium" | "low"; detail: string; fix: string };
/**
 * A regulatory obligation we can infer applies, but cannot verify compliance with
 * from outside. Deliberately kept out of the score: an advisory says "this duty
 * applies to you", never "you have failed it".
 */
export type Advisory = { id: string; label: string; basis: string; detail: string; action: string };
export type ReportData = {
  host: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  passed: number;
  total: number;
  checks: ReportCheck[];
  topFindings: TopFinding[];
  advisories?: Advisory[];
  scannedAt: string;
};

// Brand palette
const GOLD = rgb(0.788, 0.659, 0.298);
const DARK = rgb(0.05, 0.05, 0.1);
const INK = rgb(0.13, 0.13, 0.16);
const MUTE = rgb(0.42, 0.42, 0.47);
const LIGHT = rgb(0.9, 0.9, 0.92);
const WHITE = rgb(1, 1, 1);
const RED = rgb(0.85, 0.2, 0.2);
const AMBER = rgb(0.85, 0.6, 0.15);
const GREEN = rgb(0.2, 0.65, 0.35);

const GRADE_COLOR: Record<string, RGB> = {
  A: GREEN, B: rgb(0.5, 0.7, 0.2), C: AMBER, D: rgb(0.9, 0.5, 0.15), F: RED,
};

const A4: [number, number] = [595.28, 841.89];
const M = 50; // margin

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

export async function generateReportPdf(data: ReportData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Vanorika Security Report: ${data.host}`);
  doc.setAuthor("Vanorika Technologies");
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const W = A4[0];
  const contentW = W - M * 2;
  const date = new Date(data.scannedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const footer = (page: PDFPage, n: number) => {
    page.drawText("Vanorika Technologies  ·  vanorikatechnologies.co.zw", { x: M, y: 30, size: 8, font, color: MUTE });
    page.drawText(`Page ${n}`, { x: W - M - 40, y: 30, size: 8, font, color: MUTE });
  };

  // ---------- PAGE 1: COVER ----------
  const p1 = doc.addPage(A4);
  const H = A4[1];
  p1.drawRectangle({ x: 0, y: 0, width: W, height: H, color: DARK });
  p1.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: GOLD });
  p1.drawText("VANORIKA", { x: M, y: H - 110, size: 34, font: bold, color: WHITE });
  p1.drawText("TECHNOLOGIES", { x: M, y: H - 132, size: 12, font, color: GOLD });
  p1.drawText("Website Security Report", { x: M, y: H - 230, size: 26, font: bold, color: WHITE });
  p1.drawText(data.host, { x: M, y: H - 262, size: 16, font, color: GOLD });
  p1.drawText(`Passive external assessment  ·  ${date}`, { x: M, y: H - 288, size: 11, font, color: LIGHT });

  // Grade badge
  const badgeY = H - 470;
  const gc = GRADE_COLOR[data.grade] ?? RED;
  p1.drawRectangle({ x: M, y: badgeY, width: 150, height: 130, color: rgb(0.08, 0.08, 0.14), borderColor: gc, borderWidth: 2 });
  p1.drawText(data.grade, { x: M + 45, y: badgeY + 40, size: 70, font: bold, color: gc });
  p1.drawText(`${data.score}/100`, { x: M + 45, y: badgeY + 18, size: 14, font, color: LIGHT });
  p1.drawText("OVERALL GRADE", { x: M + 30, y: badgeY + 105, size: 9, font, color: MUTE });

  const summary = data.grade === "A"
    ? "This site follows the core security basics well. A deeper manual test is the natural next step to confirm nothing subtle was missed."
    : data.grade === "F" || data.grade === "D"
      ? "This site is missing several basic protections that attackers routinely look for. The good news: most are quick, low-cost fixes."
      : "This site gets some fundamentals right but leaves clear, preventable gaps that are worth closing.";
  wrap(summary, font, 12, 250).forEach((ln, i) => {
    p1.drawText(ln, { x: M + 170, y: badgeY + 100 - i * 17, size: 12, font, color: LIGHT });
  });

  p1.drawText("Prepared by Donovan Mudarikwa, CompTIA A+ / Security+ / PenTest+ certified", { x: M, y: 60, size: 9, font, color: MUTE });

  // ---------- PAGE 2: EXECUTIVE SUMMARY ----------
  const p2 = doc.addPage(A4);
  let y = H - 70;
  const heading = (page: PDFPage, t: string, yy: number) => {
    page.drawText(t, { x: M, y: yy, size: 18, font: bold, color: INK });
    page.drawRectangle({ x: M, y: yy - 8, width: 40, height: 3, color: GOLD });
  };
  heading(p2, "Executive summary", y);
  y -= 40;

  const fails = data.checks.filter((c) => !c.pass);
  const passes = data.checks.filter((c) => c.pass);
  const highFails = fails.filter((c) => c.severity === "high").length;

  const intro = `We ran a passive, external check of ${data.host}, the same read-only signals any visitor's browser sees. Out of ${data.total} checks, ${data.passed} passed and ${fails.length} need attention${highFails ? `, including ${highFails} high-severity issue${highFails > 1 ? "s" : ""}` : ""}.`;
  wrap(intro, font, 11, contentW).forEach((ln) => { p2.drawText(ln, { x: M, y, size: 11, font, color: INK }); y -= 16; });
  y -= 14;

  p2.drawText("What needs attention", { x: M, y, size: 12, font: bold, color: RED }); y -= 20;
  if (fails.length === 0) {
    p2.drawText("Nothing failed the passive checks. See page 5 for what to verify with a manual test.", { x: M, y, size: 10, font, color: INK }); y -= 16;
  } else {
    for (const c of fails.slice(0, 8)) {
      p2.drawText("•", { x: M, y, size: 11, font: bold, color: RED });
      wrap(`${c.label}: ${c.detail}`, font, 10, contentW - 14).forEach((ln, i) => {
        p2.drawText(ln, { x: M + 14, y: y - i * 13, size: 10, font, color: INK });
      });
      y -= wrap(`${c.label}: ${c.detail}`, font, 10, contentW - 14).length * 13 + 6;
    }
  }
  y -= 10;
  p2.drawText("What's already in place", { x: M, y, size: 12, font: bold, color: GREEN }); y -= 20;
  if (passes.length === 0) {
    p2.drawText("None of the checks passed.", { x: M, y, size: 10, font, color: INK }); y -= 16;
  } else {
    const passLine = passes.map((c) => c.label).join(", ") + ".";
    wrap(passLine, font, 10, contentW).forEach((ln) => { p2.drawText(ln, { x: M, y, size: 10, font, color: INK }); y -= 14; });
  }
  footer(p2, 2);

  // ---------- PAGE 3: DETAILED FINDINGS ----------
  const p3 = doc.addPage(A4);
  y = H - 70;
  heading(p3, "Detailed findings", y);
  y -= 40;
  const sevColor: Record<string, RGB> = { high: RED, medium: AMBER, low: MUTE };
  for (const c of data.checks) {
    if (y < 90) { footer(p3, 3); break; }
    const mark = c.pass ? "PASS" : "FAIL";
    p3.drawText(mark, { x: M, y, size: 9, font: bold, color: c.pass ? GREEN : RED });
    p3.drawText(c.label, { x: M + 42, y, size: 11, font: bold, color: INK });
    if (!c.pass) {
      p3.drawText(c.severity.toUpperCase(), { x: W - M - 55, y, size: 8, font: bold, color: sevColor[c.severity] });
    }
    y -= 15;
    wrap(c.detail, font, 9.5, contentW - 42).forEach((ln) => { p3.drawText(ln, { x: M + 42, y, size: 9.5, font, color: MUTE }); y -= 12; });
    if (!c.pass) {
      wrap(`Fix: ${c.fix}`, font, 9.5, contentW - 42).forEach((ln) => { p3.drawText(ln, { x: M + 42, y, size: 9.5, font, color: GOLD }); y -= 12; });
    }
    y -= 8;
  }
  footer(p3, 3);

  // ---------- PAGE 4: DPA 2021 + RISK ----------
  const p4 = doc.addPage(A4);
  y = H - 70;
  heading(p4, "Compliance & business risk", y);
  y -= 40;
  const dpaIntro = "Zimbabwe's Cyber and Data Protection Act (2021) places real obligations on any business that collects personal data: names, emails, phone numbers, payment details. The findings below carry legal or reputational risk, not just technical risk.";
  wrap(dpaIntro, font, 11, contentW).forEach((ln) => { p4.drawText(ln, { x: M, y, size: 11, font, color: INK }); y -= 16; });
  y -= 14;

  const riskItems = data.checks.filter((c) => !c.pass && (c.severity === "high" || c.id === "privacy"));
  if (riskItems.length === 0) {
    p4.drawText("No high-risk compliance gaps were found in this passive scan.", { x: M, y, size: 10, font, color: GREEN }); y -= 16;
  } else {
    for (const c of riskItems) {
      p4.drawText("!", { x: M, y, size: 12, font: bold, color: RED });
      p4.drawText(c.label, { x: M + 16, y, size: 11, font: bold, color: INK }); y -= 15;
      wrap(c.detail, font, 10, contentW - 16).forEach((ln) => { p4.drawText(ln, { x: M + 16, y, size: 10, font, color: MUTE }); y -= 13; });
      y -= 8;
    }
  }

  for (const a of data.advisories ?? []) {
    y -= 10;
    p4.drawRectangle({ x: M, y: y - 4, width: contentW, height: 1, color: LIGHT });
    y -= 22;
    p4.drawText(a.label, { x: M, y, size: 11, font: bold, color: INK }); y -= 15;
    wrap(a.basis, font, 10, contentW).forEach((ln) => { p4.drawText(ln, { x: M, y, size: 10, font, color: MUTE }); y -= 13; });
    y -= 6;
    wrap(a.detail, font, 10, contentW).forEach((ln) => { p4.drawText(ln, { x: M, y, size: 10, font, color: MUTE }); y -= 13; });
    y -= 6;
    wrap(a.action, font, 10, contentW).forEach((ln) => { p4.drawText(ln, { x: M, y, size: 10, font, color: INK }); y -= 13; });
    y -= 6;
    wrap(
      "This is an obligation that applies to you, not a check you failed. Licence status is not publicly searchable, so we cannot confirm from outside whether you already hold one. It does not affect your score.",
      font, 9, contentW,
    ).forEach((ln) => { p4.drawText(ln, { x: M, y, size: 9, font, color: MUTE }); y -= 12; });
  }

  footer(p4, 4);

  // ---------- PAGE 5: CLOSING / CONVERSION ----------
  const p5 = doc.addPage(A4);
  p5.drawRectangle({ x: 0, y: 0, width: W, height: H, color: DARK });
  p5.drawRectangle({ x: 0, y: 0, width: W, height: 6, color: GOLD });
  y = H - 120;
  p5.drawText("This is what a browser can see.", { x: M, y, size: 20, font: bold, color: WHITE }); y -= 28;
  p5.drawText("An attacker looks deeper.", { x: M, y, size: 20, font: bold, color: GOLD }); y -= 44;

  const closing = "This report is a passive scan: it reads only public signals. It does not test authentication, injection flaws, business logic, or outdated software behind the scenes. Those are exactly where the serious problems hide, and they can only be confirmed with a manual test.";
  wrap(closing, font, 12, contentW).forEach((ln) => { p5.drawText(ln, { x: M, y, size: 12, font, color: LIGHT }); y -= 18; });
  y -= 20;

  const need = Math.max(3, data.checks.filter((c) => !c.pass && c.severity === "high").length);
  p5.drawRectangle({ x: M, y: y - 90, width: contentW, height: 84, color: rgb(0.08, 0.08, 0.14), borderColor: GOLD, borderWidth: 1 });
  p5.drawText(`${need} of these findings need a manual test to confirm.`, { x: M + 20, y: y - 32, size: 14, font: bold, color: WHITE });
  p5.drawText("Reply YES on WhatsApp for a free 20-minute consult, no obligation.", { x: M + 20, y: y - 54, size: 12, font, color: GOLD });
  p5.drawText("WhatsApp +263 77 690 2542", { x: M + 20, y: y - 74, size: 11, font: bold, color: WHITE });
  y -= 130;

  p5.drawText("Want ongoing cover? The Security & Maintenance Retainer starts at $50/month:", { x: M, y, size: 10, font, color: LIGHT }); y -= 16;
  p5.drawText("monitoring, monthly re-scans, updates and priority support.", { x: M, y, size: 10, font, color: LIGHT });

  p5.drawText("Vanorika Technologies  ·  Penetration testing & web development  ·  Harare, Zimbabwe", { x: M, y: 40, size: 9, font, color: MUTE });

  return doc.save();
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
