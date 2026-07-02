import { NextResponse } from "next/server";
import { SHIELD_SITES } from "@/lib/shield-sites";
import { runReport } from "@/lib/report-scan";
import { generateReportPdf } from "@/lib/report-pdf";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function monthlyEmail(siteName: string, grade: string, score: number): string {
  const month = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <div style="background:#0D0D1A;padding:24px 28px;border-top:4px solid #C9A84C">
      <div style="color:#fff;font-size:20px;font-weight:800">VANORIKA <span style="color:#C9A84C;font-size:12px;letter-spacing:2px">SHIELD</span></div>
    </div>
    <div style="padding:28px">
      <h2 style="margin:0 0 6px">Your ${month} security report — ${siteName}</h2>
      <p style="color:#666;margin:0 0 20px">This month's grade: <b style="font-size:18px">${grade}</b> (${score}/100). The full breakdown is attached as a PDF.</p>
      <p>Anything you'd like us to fix, just reply — or message us on WhatsApp <b>+263 77 690 2542</b>.</p>
      <p style="color:#999;font-size:12px;margin-top:28px">Vanorika Shield · continuous monitoring · vanorikatechnologies.co.zw</p>
    </div>
  </div>`;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized or CRON_SECRET not configured" }, { status: process.env.CRON_SECRET ? 401 : 503 });
  }

  const results: { host: string; grade: string; score: number; emailed: boolean }[] = [];

  for (const site of SHIELD_SITES) {
    const report = await runReport(site.host);
    const pdf = await generateReportPdf(report);
    const base64 = Buffer.from(pdf).toString("base64");

    let emailed = false;
    if (site.notify.length) {
      const r = await sendEmail({
        to: site.notify,
        subject: `Your monthly Vanorika Shield report — ${site.name} (grade ${report.grade})`,
        html: monthlyEmail(site.name, report.grade, report.score),
        attachments: [{ filename: `Vanorika-Shield-Report-${site.host}.pdf`, content: base64 }],
      });
      emailed = r.ok;
    }
    results.push({ host: site.host, grade: report.grade, score: report.score, emailed });
  }

  return NextResponse.json({ ok: true, ran: new Date().toISOString(), sites: SHIELD_SITES.length, results });
}
