import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Component = { name: string; url: string; description: string };

const components: Component[] = [
  { name: "Website", url: SITE_URL, description: "vanorikatechnologies.co.zw" },
  { name: "Zenvora ERP", url: "https://zenvora.vercel.app", description: "Cloud ERP platform" },
  { name: "Free Security Tools", url: `${SITE_URL}/tools`, description: "Public scanning tools" },
  { name: "Booking", url: "https://calendly.com/donovanmudarikwa/30min", description: "Consultation scheduling" },
];

async function probe(c: Component) {
  const start = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(c.url, { method: "GET", redirect: "follow", signal: controller.signal, headers: { "User-Agent": "VanorikaStatus/1.0" } });
    return { name: c.name, description: c.description, operational: res.status < 500, status: res.status, latencyMs: Date.now() - start };
  } catch {
    return { name: c.name, description: c.description, operational: false, status: 0, latencyMs: Date.now() - start };
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  const results = await Promise.all(components.map(probe));
  const allOk = results.every((r) => r.operational);
  return NextResponse.json(
    { allOperational: allOk, checkedAt: new Date().toISOString(), components: results },
    { headers: { "Cache-Control": "no-store" } },
  );
}
