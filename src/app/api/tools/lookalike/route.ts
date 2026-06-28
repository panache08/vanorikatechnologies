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

const SUBS: Record<string, string> = { o: "0", i: "1", l: "1", e: "3", a: "4", s: "5", b: "8" };

function makeVariants(label: string, tld: string): string[] {
  const chars = label.split("");
  const labels = new Set<string>();
  // omission
  for (let i = 0; i < chars.length; i++) labels.add(chars.slice(0, i).concat(chars.slice(i + 1)).join(""));
  // transposition (swap adjacent)
  for (let i = 0; i < chars.length - 1; i++) {
    const a = [...chars];
    [a[i], a[i + 1]] = [a[i + 1], a[i]];
    labels.add(a.join(""));
  }
  // repetition (double a char)
  for (let i = 0; i < chars.length; i++) labels.add(chars.slice(0, i + 1).concat(chars[i], chars.slice(i + 1)).join(""));
  // homoglyph-style substitution
  for (let i = 0; i < chars.length; i++) {
    const sub = SUBS[chars[i]];
    if (sub) { const a = [...chars]; a[i] = sub; labels.add(a.join("")); }
  }
  labels.delete(label);

  const domains = new Set<string>();
  for (const v of labels) if (v.length > 2) domains.add(`${v}.${tld}`);
  // same name, different TLD
  for (const t of ["com", "net", "org", "co.zw", "co", "io", "app"]) if (t !== tld) domains.add(`${label}.${t}`);
  // hyphenation
  domains.add(`${label}-tech.${tld}`);
  domains.add(`get${label}.${tld}`);
  return [...domains].slice(0, 30);
}

async function isRegistered(d: string): Promise<boolean> {
  try {
    const ns = await Promise.race([
      dns.resolveNs(d),
      new Promise<string[]>((_, rej) => setTimeout(() => rej(new Error("t")), 3500)),
    ]);
    return Array.isArray(ns) && ns.length > 0;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let domain: string | null = null;
  try {
    domain = normalizeDomain(String((await req.json())?.domain ?? ""));
  } catch {
    /* ignore */
  }
  if (!domain) {
    return NextResponse.json({ error: "Enter a valid domain, e.g. yourbrand.co.zw" }, { status: 400 });
  }

  const firstDot = domain.indexOf(".");
  const label = domain.slice(0, firstDot);
  const tld = domain.slice(firstDot + 1);
  if (label.length < 3) {
    return NextResponse.json({ error: "Domain name is too short to generate meaningful variants." }, { status: 400 });
  }

  const candidates = makeVariants(label, tld);
  const results = await Promise.all(candidates.map(async (d) => ({ d, reg: await isRegistered(d) })));
  const registered = results.filter((r) => r.reg).map((r) => r.d).sort();

  return NextResponse.json({ domain, checked: candidates.length, found: registered, count: registered.length });
}
