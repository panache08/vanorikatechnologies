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

type RdapEvent = { eventAction: string; eventDate: string };
type RdapEntity = { roles?: string[]; vcardArray?: unknown[] };

function entityName(entities: RdapEntity[] | undefined, role: string): string | null {
  const ent = (entities || []).find((e) => e.roles?.includes(role));
  const vcard = ent?.vcardArray?.[1] as unknown[] | undefined;
  if (Array.isArray(vcard)) {
    const fn = vcard.find((row) => Array.isArray(row) && row[0] === "fn") as unknown[] | undefined;
    if (fn && typeof fn[3] === "string") return fn[3];
  }
  return null;
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
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    // RDAP — the modern, structured replacement for WHOIS. Free, no key.
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      signal: controller.signal,
      headers: { Accept: "application/rdap+json", "User-Agent": "VanorikaTools/1.0" },
    });
    if (res.status === 404) {
      return NextResponse.json({ error: `No registration record found for ${domain}. The TLD may not publish RDAP data (common for some .co.zw domains).` }, { status: 404 });
    }
    if (!res.ok) throw new Error(`RDAP returned ${res.status}`);
    const data = await res.json();

    const events: RdapEvent[] = data.events || [];
    const evt = (a: string) => events.find((e) => e.eventAction === a)?.eventDate || null;
    const nameservers = (data.nameservers || []).map((n: { ldhName?: string }) => (n.ldhName || "").toLowerCase()).filter(Boolean);

    return NextResponse.json({
      domain,
      registrar: entityName(data.entities, "registrar") || "Unknown",
      registered: evt("registration"),
      expires: evt("expiration"),
      updated: evt("last changed") || evt("last update of RDAP database"),
      status: (data.status || []).slice(0, 6),
      nameservers,
    });
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return NextResponse.json(
      { error: aborted ? "Lookup timed out. Try again." : "Could not retrieve registration data for this domain." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
