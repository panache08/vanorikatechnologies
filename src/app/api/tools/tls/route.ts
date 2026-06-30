import { NextResponse } from "next/server";
import tls from "node:tls";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeHost(input: string): string | null {
  let v = (input || "").trim().toLowerCase();
  if (!v) return null;
  v = v.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/\s/g, "");
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) return null;
  return v;
}

type Ver = "TLSv1" | "TLSv1.1" | "TLSv1.2" | "TLSv1.3";

function testVersion(host: string, version: Ver): Promise<{ version: Ver; supported: boolean; cipher: string | null }> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (supported: boolean, cipher: string | null) => { if (!done) { done = true; resolve({ version, supported, cipher }); } };
    try {
      const socket = tls.connect(
        { host, port: 443, servername: host, rejectUnauthorized: false, minVersion: version, maxVersion: version, timeout: 6000 },
        () => { const c = socket.getCipher(); socket.destroy(); finish(true, c?.name || null); },
      );
      socket.on("error", () => finish(false, null));
      socket.on("timeout", () => { socket.destroy(); finish(false, null); });
    } catch {
      finish(false, null);
    }
  });
}

export async function POST(req: Request) {
  let host: string | null = null;
  try { host = normalizeHost(String((await req.json())?.domain ?? "")); } catch { /* ignore */ }
  if (!host) return NextResponse.json({ error: "Enter a valid domain, e.g. example.co.zw" }, { status: 400 });

  const versions: Ver[] = ["TLSv1", "TLSv1.1", "TLSv1.2", "TLSv1.3"];
  const results = await Promise.all(versions.map((v) => testVersion(host!, v)));
  const reachable = results.some((r) => r.supported);
  if (!reachable) return NextResponse.json({ error: "Could not establish a TLS connection to that host." }, { status: 502 });

  const weakEnabled = results.filter((r) => r.supported && (r.version === "TLSv1" || r.version === "TLSv1.1")).map((r) => r.version);
  const modern = results.some((r) => r.supported && r.version === "TLSv1.3");
  return NextResponse.json({
    host,
    protocols: results.map((r) => ({ version: r.version, supported: r.supported, weak: r.version === "TLSv1" || r.version === "TLSv1.1", cipher: r.cipher })),
    weakEnabled,
    modern,
    good: weakEnabled.length === 0 && results.some((r) => r.supported && r.version === "TLSv1.2"),
  });
}
