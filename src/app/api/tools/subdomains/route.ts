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

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    // crt.sh certificate transparency logs: free, no API key.
    const res = await fetch(`https://crt.sh/?q=${encodeURIComponent("%." + domain)}&output=json`, {
      signal: controller.signal,
      headers: { "User-Agent": "VanorikaTools/1.0" },
    });
    if (!res.ok) throw new Error(`crt.sh returned ${res.status}`);
    const rows: { name_value: string }[] = await res.json();

    const set = new Set<string>();
    for (const r of rows) {
      for (const name of String(r.name_value || "").split("\n")) {
        const n = name.trim().toLowerCase().replace(/^\*\./, "");
        if (n && (n === domain || n.endsWith("." + domain))) set.add(n);
      }
    }
    const subdomains = [...set].sort();
    return NextResponse.json({ domain, count: subdomains.length, subdomains });
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return NextResponse.json(
      { error: aborted ? "Lookup timed out. crt.sh can be slow, so try again." : "Could not reach the certificate transparency logs. Try again shortly." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
