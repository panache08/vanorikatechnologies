import { NextResponse } from "next/server";
import dns from "node:dns/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeDomain(input: string): string | null {
  let v = (input || "").trim().toLowerCase();
  if (!v) return null;
  v = v.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\s/g, "");
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) return null;
  return v;
}

async function subdomains(domain: string): Promise<string[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(`https://crt.sh/?q=${encodeURIComponent("%." + domain)}&output=json`, { signal: controller.signal, headers: { "User-Agent": "VanorikaTools/1.0" } });
    if (!res.ok) return [];
    const rows: { name_value: string }[] = await res.json();
    const set = new Set<string>();
    for (const r of rows) for (const n of String(r.name_value || "").split("\n")) {
      const v = n.trim().toLowerCase().replace(/^\*\./, "");
      if (v && (v === domain || v.endsWith("." + domain))) set.add(v);
    }
    return [...set].sort().slice(0, 60);
  } catch { return []; } finally { clearTimeout(timer); }
}

export async function POST(req: Request) {
  let domain: string | null = null;
  try { domain = normalizeDomain(String((await req.json())?.domain ?? "")); } catch { /* ignore */ }
  if (!domain) return NextResponse.json({ error: "Enter a valid domain, e.g. example.co.zw" }, { status: 400 });

  const [subs, a, mx, ns, txt] = await Promise.all([
    subdomains(domain),
    dns.resolve4(domain).catch(() => []),
    dns.resolveMx(domain).then((r) => r.map((x) => x.exchange)).catch(() => []),
    dns.resolveNs(domain).catch(() => []),
    dns.resolveTxt(domain).then((r) => r.map((x) => x.join(""))).catch(() => []),
  ]);

  const spf = txt.find((t) => /^v=spf1/i.test(t)) || null;
  return NextResponse.json({
    domain,
    counts: { subdomains: subs.length, a: a.length, mx: mx.length, ns: ns.length },
    subdomains: subs,
    dns: { a, mx, ns, hasSpf: !!spf },
  });
}
