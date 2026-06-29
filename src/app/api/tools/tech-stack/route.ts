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

type Tech = { name: string; category: string; detail?: string };

export async function POST(req: Request) {
  let host: string | null = null;
  try {
    host = normalizeHost(String((await req.json())?.domain ?? ""));
  } catch {
    /* ignore */
  }
  if (!host) return NextResponse.json({ error: "Enter a valid website, e.g. example.co.zw" }, { status: 400 });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const res = await fetch(`https://${host}`, { redirect: "follow", signal: controller.signal, headers: { "User-Agent": "Mozilla/5.0 VanorikaTech/1.0" } });
    const html = (await res.text().catch(() => "")).slice(0, 200000);
    const h = res.headers;
    const tech: Tech[] = [];
    const add = (name: string, category: string, detail?: string) => {
      if (!tech.some((t) => t.name === name)) tech.push({ name, category, detail });
    };

    // From headers
    const server = h.get("server") || "";
    if (/cloudflare/i.test(server)) add("Cloudflare", "CDN / Proxy");
    if (/vercel/i.test(server) || h.get("x-vercel-id")) add("Vercel", "Hosting");
    if (/nginx/i.test(server)) add("Nginx", "Web server", server);
    if (/apache/i.test(server)) add("Apache", "Web server", server);
    if (/litespeed/i.test(server)) add("LiteSpeed", "Web server");
    const powered = h.get("x-powered-by") || "";
    if (/php/i.test(powered)) add("PHP", "Language", powered);
    if (/express/i.test(powered)) add("Express", "Framework");
    if (/asp\.net/i.test(powered)) add("ASP.NET", "Framework", powered);

    // From HTML
    const wpGen = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']WordPress\s*([0-9.]+)?/i);
    if (wpGen || /wp-content|wp-includes/i.test(html)) add("WordPress", "CMS", wpGen?.[1] ? `version ${wpGen[1]}` : undefined);
    if (/<meta[^>]+content=["']Joomla/i.test(html)) add("Joomla", "CMS");
    if (/Drupal\.settings|drupal/i.test(html) && /sites\/(all|default)/i.test(html)) add("Drupal", "CMS");
    if (/cdn\.shopify\.com|Shopify\./i.test(html)) add("Shopify", "E-commerce");
    if (/__NEXT_DATA__|\/_next\//i.test(html)) add("Next.js", "Framework");
    if (/data-reactroot|react(\.|-dom)/i.test(html)) add("React", "Library");
    if (/ng-version|angular/i.test(html)) add("Angular", "Framework");
    if (/jquery[.-]/i.test(html)) add("jQuery", "Library");
    if (/wix\.com|X-Wix/i.test(html) || /x-wix-request-id/i.test([...h.keys()].join(","))) add("Wix", "Website builder");
    if (/squarespace/i.test(html)) add("Squarespace", "Website builder");
    if (/googletagmanager\.com\/gtag|gtag\(/i.test(html)) add("Google Analytics", "Analytics");
    if (/fonts\.googleapis\.com/i.test(html)) add("Google Fonts", "Fonts");
    if (/elementor/i.test(html)) add("Elementor", "Page builder");

    return NextResponse.json({ host, status: res.status, server: server || null, count: tech.length, tech });
  } catch (e) {
    const aborted = e instanceof Error && e.name === "AbortError";
    return NextResponse.json({ error: aborted ? "Request timed out. Try again." : "Could not reach that site." }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
