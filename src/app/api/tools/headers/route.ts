import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeDomain(input: string): string | null {
  let v = (input || "").trim().toLowerCase();
  if (!v) return null;
  v = v.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\s/g, "");
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) return null;
  return v;
}

const CHECKS = [
  { key: "strict-transport-security", name: "Strict-Transport-Security", desc: "Forces browsers to use HTTPS." },
  { key: "content-security-policy", name: "Content-Security-Policy", desc: "Limits where scripts and content can load from." },
  { key: "x-frame-options", name: "X-Frame-Options", desc: "Stops your site being framed for clickjacking." },
  { key: "x-content-type-options", name: "X-Content-Type-Options", desc: "Stops the browser MIME-sniffing responses." },
  { key: "referrer-policy", name: "Referrer-Policy", desc: "Controls how much referrer information leaks." },
  { key: "permissions-policy", name: "Permissions-Policy", desc: "Restricts access to camera, mic, location, etc." },
];

export async function POST(req: Request) {
  let domain: string | null = null;
  try {
    domain = normalizeDomain(String((await req.json())?.domain ?? ""));
  } catch {
    /* ignore */
  }
  if (!domain) {
    return NextResponse.json({ error: "Enter a valid domain, e.g. yourbusiness.co.zw" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(`https://${domain}`, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "VanorikaTools/1.0 (+security headers check)" },
    });
    const checks = CHECKS.map((c) => {
      const value = res.headers.get(c.key);
      return { name: c.name, desc: c.desc, present: !!value, value: value ? value.slice(0, 90) : null };
    });
    const passed = checks.filter((c) => c.present).length;
    const score = Math.round((passed / checks.length) * 100);
    return NextResponse.json({ domain, finalUrl: res.url, status: res.status, score, passed, total: checks.length, checks });
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return NextResponse.json(
      { error: aborted ? "The site took too long to respond." : "Couldn't reach this site over HTTPS. Check the domain and that it's online." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
