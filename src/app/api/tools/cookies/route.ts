import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeHost(input: string): string | null {
  let v = (input || "").trim().toLowerCase();
  if (!v) return null;
  v = v.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\s/g, "");
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) return null;
  return v;
}

const TRACKERS: { name: string; re: RegExp }[] = [
  { name: "Google Analytics", re: /google-analytics\.com|gtag\(|googletagmanager\.com/i },
  { name: "Google Tag Manager", re: /googletagmanager\.com\/gtm/i },
  { name: "Meta / Facebook Pixel", re: /connect\.facebook\.net|fbq\(/i },
  { name: "Hotjar", re: /static\.hotjar\.com|hotjar/i },
  { name: "LinkedIn Insight", re: /snap\.licdn\.com/i },
  { name: "TikTok Pixel", re: /analytics\.tiktok\.com/i },
  { name: "Microsoft Clarity", re: /clarity\.ms/i },
  { name: "HubSpot", re: /js\.hs-scripts\.com|hsubspot/i },
];

export async function POST(req: Request) {
  let host: string | null = null;
  try { host = normalizeHost(String((await req.json())?.domain ?? "")); } catch { /* ignore */ }
  if (!host) return NextResponse.json({ error: "Enter a valid website, e.g. example.co.zw" }, { status: 400 });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(`https://${host}`, { redirect: "follow", signal: controller.signal, headers: { "User-Agent": "Mozilla/5.0 VanorikaTech/1.0" } });
    const html = (await res.text().catch(() => "")).slice(0, 200000);

    let cookies: string[] = [];
    try {
      const getSetCookie = (res.headers as unknown as { getSetCookie?: () => string[] }).getSetCookie;
      if (typeof getSetCookie === "function") cookies = getSetCookie.call(res.headers);
      else { const raw = res.headers.get("set-cookie"); if (raw) cookies = [raw]; }
    } catch { /* ignore */ }

    const cookieNames = cookies.map((c) => c.split("=")[0].trim()).filter(Boolean);
    const trackers = TRACKERS.filter((t) => t.re.test(html)).map((t) => t.name);
    const hasPrivacyLink = /href=["'][^"']*privacy[^"']*["']/i.test(html) || /privacy policy/i.test(html);

    return NextResponse.json({
      host,
      cookiesSetOnLoad: cookieNames.length,
      cookieNames,
      trackers,
      hasPrivacyLink,
      // DPA/consent concern: tracking cookies set before any consent banner.
      concern: (cookieNames.length > 0 || trackers.length > 0) && !hasPrivacyLink,
    });
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return NextResponse.json({ error: aborted ? "Request timed out. Try again." : "Could not reach that site." }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
