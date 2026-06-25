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

type CertInfo = {
  host: string;
  valid: boolean;
  issuer: string | null;
  subject: string | null;
  validFrom: string | null;
  validTo: string | null;
  daysRemaining: number | null;
  san: string[];
  error?: string;
};

function getCert(host: string): Promise<CertInfo> {
  return new Promise((resolve) => {
    const socket = tls.connect(
      { host, port: 443, servername: host, rejectUnauthorized: false, timeout: 8000 },
      () => {
        const cert = socket.getPeerCertificate(true);
        const authorized = socket.authorized;
        socket.end();
        if (!cert || !cert.valid_to) {
          resolve({ host, valid: false, issuer: null, subject: null, validFrom: null, validTo: null, daysRemaining: null, san: [], error: "No certificate presented." });
          return;
        }
        const to = new Date(cert.valid_to);
        const days = Math.round((to.getTime() - Date.now()) / 86400000);
        const str = (v: string | string[] | undefined): string | null =>
          Array.isArray(v) ? v.join(", ") : v ?? null;
        const issuerOrg = str(cert.issuer?.O) || str(cert.issuer?.CN);
        const san = (cert.subjectaltname || "")
          .split(",")
          .map((s) => s.trim().replace(/^DNS:/, ""))
          .filter(Boolean)
          .slice(0, 12);
        resolve({
          host,
          valid: authorized && days > 0,
          issuer: issuerOrg,
          subject: str(cert.subject?.CN) || host,
          validFrom: cert.valid_from ? new Date(cert.valid_from).toISOString() : null,
          validTo: to.toISOString(),
          daysRemaining: days,
          san,
        });
      },
    );
    socket.on("error", (err) => {
      resolve({ host, valid: false, issuer: null, subject: null, validFrom: null, validTo: null, daysRemaining: null, san: [], error: err.message });
    });
    socket.on("timeout", () => {
      socket.destroy();
      resolve({ host, valid: false, issuer: null, subject: null, validFrom: null, validTo: null, daysRemaining: null, san: [], error: "Connection timed out." });
    });
  });
}

export async function POST(req: Request) {
  let host: string | null = null;
  try {
    host = normalizeHost(String((await req.json())?.domain ?? ""));
  } catch {
    /* ignore */
  }
  if (!host) {
    return NextResponse.json({ error: "Enter a valid domain, e.g. example.co.zw" }, { status: 400 });
  }
  const info = await getCert(host);
  return NextResponse.json(info);
}
