import tls from "node:tls";

export type SslResult = { ok: boolean; daysRemaining: number | null; validTo: string | null; error?: string };
export type UptimeResult = { up: boolean; status: number | null; ms: number | null; error?: string };

/** Reads the TLS certificate and returns days until expiry. Pure read, no data sent. */
export function checkSsl(host: string, timeoutMs = 9000): Promise<SslResult> {
  return new Promise((resolve) => {
    let settled = false;
    const done = (r: SslResult) => { if (!settled) { settled = true; try { socket.destroy(); } catch {} resolve(r); } };
    const socket = tls.connect(
      { host, port: 443, servername: host, timeout: timeoutMs },
      () => {
        const cert = socket.getPeerCertificate();
        if (!cert || !cert.valid_to) return done({ ok: false, daysRemaining: null, validTo: null, error: "No certificate returned" });
        const validTo = new Date(cert.valid_to);
        const days = Math.floor((validTo.getTime() - Date.now()) / 86_400_000);
        done({ ok: days > 0, daysRemaining: days, validTo: validTo.toISOString() });
      },
    );
    socket.on("error", (e) => done({ ok: false, daysRemaining: null, validTo: null, error: e.message }));
    socket.on("timeout", () => done({ ok: false, daysRemaining: null, validTo: null, error: "Connection timed out" }));
  });
}

/** Checks whether the site is currently reachable over HTTPS and how fast it responds. */
export async function checkUptime(host: string, timeoutMs = 12000): Promise<UptimeResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();
  try {
    const res = await fetch(`https://${host}`, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "VanorikaShield/1.0" },
    });
    const ms = Date.now() - start;
    // 5xx counts as effectively down for a visitor.
    return { up: res.status < 500, status: res.status, ms };
  } catch (e) {
    return { up: false, status: null, ms: null, error: e instanceof Error ? e.message : "unreachable" };
  } finally {
    clearTimeout(timer);
  }
}
