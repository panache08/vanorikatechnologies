import { NextResponse } from "next/server";
import { SHIELD_SITES, SSL_WARN_DAYS } from "@/lib/shield-sites";
import { checkSsl, checkUptime } from "@/lib/shield-checks";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // must be configured
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function alertEmail(siteName: string, host: string, alerts: string[]): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <div style="background:#0D0D1A;padding:24px 28px;border-top:4px solid #C9A84C">
      <div style="color:#fff;font-size:20px;font-weight:800">VANORIKA <span style="color:#C9A84C;font-size:12px;letter-spacing:2px">SHIELD</span></div>
    </div>
    <div style="padding:28px">
      <h2 style="margin:0 0 6px">Security alert: ${siteName}</h2>
      <p style="color:#666;margin:0 0 20px">${host}</p>
      <ul style="padding-left:18px;line-height:1.7">
        ${alerts.map((a) => `<li>${a}</li>`).join("")}
      </ul>
      <p style="margin-top:24px">Reply to this email or message us on WhatsApp <b>+263 77 690 2542</b> and we'll take care of it.</p>
      <p style="color:#999;font-size:12px;margin-top:28px">Vanorika Shield · continuous monitoring · vanorikatechnologies.co.zw</p>
    </div>
  </div>`;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized or CRON_SECRET not configured" }, { status: process.env.CRON_SECRET ? 401 : 503 });
  }

  const results: { host: string; alerts: string[]; emailed: boolean }[] = [];

  for (const site of SHIELD_SITES) {
    const alerts: string[] = [];

    const ssl = await checkSsl(site.host);
    if (!ssl.ok) {
      alerts.push(`<b style="color:#c0392b">SSL certificate problem:</b> ${ssl.error || "the certificate is expired or invalid"}. Visitors may see a security warning.`);
    } else if (ssl.daysRemaining !== null && (SSL_WARN_DAYS.includes(ssl.daysRemaining) || ssl.daysRemaining <= 1)) {
      alerts.push(`<b>SSL certificate expires in ${ssl.daysRemaining} day${ssl.daysRemaining === 1 ? "" : "s"}.</b> Renew it before then to avoid downtime and browser warnings.`);
    }

    const up = await checkUptime(site.host);
    if (!up.up) {
      alerts.push(`<b style="color:#c0392b">Site is unreachable</b>${up.status ? ` (HTTP ${up.status})` : ""}. We could not load ${site.host} just now.`);
    }

    let emailed = false;
    if (alerts.length && site.notify.length) {
      const r = await sendEmail({
        to: site.notify,
        subject: `Vanorika Shield alert: ${site.name}`,
        html: alertEmail(site.name, site.host, alerts),
      });
      emailed = r.ok;
    }
    results.push({ host: site.host, alerts, emailed });
  }

  return NextResponse.json({ ok: true, ran: new Date().toISOString(), sites: SHIELD_SITES.length, results });
}
