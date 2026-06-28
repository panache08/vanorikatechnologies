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
  return Promise.race([
    p.catch(() => fallback),
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

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

  // All three lookups are public DNS records — no key, no intrusion.
  const txt = await withTimeout(dns.resolveTxt(domain), 8000, [] as string[][]);
  const dmarcTxt = await withTimeout(dns.resolveTxt(`_dmarc.${domain}`), 8000, [] as string[][]);
  const mxRecs = await withTimeout(dns.resolveMx(domain), 8000, [] as { priority: number; exchange: string }[]);

  const spfRecord = txt.map((p) => p.join("")).find((r) => /^v=spf1/i.test(r)) || null;
  const dmarcRecord = dmarcTxt.map((p) => p.join("")).find((r) => /^v=DMARC1/i.test(r)) || null;
  const dmarcPolicy = dmarcRecord ? (dmarcRecord.match(/\bp=(\w+)/i)?.[1]?.toLowerCase() ?? null) : null;
  // Filter out the RFC 7505 "null MX" (a single ".") which means the domain sends no mail.
  const mx = mxRecs
    .sort((a, b) => a.priority - b.priority)
    .map((m) => m.exchange.replace(/\.$/, ""))
    .filter(Boolean);

  // Posture score: SPF and DMARC each matter; a DMARC policy of none is weak.
  let score = 0;
  if (spfRecord) score += 35;
  if (dmarcRecord) score += dmarcPolicy === "reject" || dmarcPolicy === "quarantine" ? 45 : 25;
  if (mx.length > 0) score += 20;
  score = Math.min(100, score);

  return NextResponse.json({
    domain,
    spf: { found: !!spfRecord, record: spfRecord },
    dmarc: { found: !!dmarcRecord, record: dmarcRecord, policy: dmarcPolicy },
    mx,
    score,
  });
}
