import { NextResponse } from "next/server";
import { promises as dns } from "dns";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeDomain(input: string): string | null {
  let v = (input || "").trim().toLowerCase();
  if (!v) return null;
  v = v.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/.*@/, "").replace(/\s/g, "");
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) return null;
  return v;
}

function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([p.catch(() => fallback), new Promise<T>((res) => setTimeout(() => res(fallback), ms))]);
}

export async function POST(req: Request) {
  let domain: string | null = null;
  try {
    domain = normalizeDomain(String((await req.json())?.domain ?? ""));
  } catch {
    /* ignore */
  }
  if (!domain) {
    return NextResponse.json({ error: "Enter a valid domain, e.g. example.co.zw" }, { status: 400 });
  }

  const [a, aaaa, mx, ns, txt, cname] = await Promise.all([
    withTimeout(dns.resolve4(domain), 6000, [] as string[]),
    withTimeout(dns.resolve6(domain), 6000, [] as string[]),
    withTimeout(dns.resolveMx(domain), 6000, [] as { priority: number; exchange: string }[]),
    withTimeout(dns.resolveNs(domain), 6000, [] as string[]),
    withTimeout(dns.resolveTxt(domain), 6000, [] as string[][]),
    withTimeout(dns.resolveCname(domain), 6000, [] as string[]),
  ]);

  return NextResponse.json({
    domain,
    a,
    aaaa,
    mx: mx.sort((x, y) => x.priority - y.priority).map((m) => `${m.exchange.replace(/\.$/, "")} (priority ${m.priority})`),
    ns: ns.map((n) => n.replace(/\.$/, "")),
    txt: txt.map((parts) => parts.join("")),
    cname: cname.map((c) => c.replace(/\.$/, "")),
  });
}
