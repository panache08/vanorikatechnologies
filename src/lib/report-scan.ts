import { promises as dns } from "dns";
import type { ReportData, ReportCheck, TopFinding } from "@/lib/report-pdf";

export type { ReportData, ReportCheck, TopFinding };

export function normalizeHost(input: string): string | null {
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

async function safeFetch(url: string, opts: RequestInit, ms = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

const UA = { "User-Agent": "VanorikaSecurityReport/1.0" };

/** Runs the full passive report scan for a host. Shared by /api/report and Shield. */
export async function runReport(host: string): Promise<ReportData> {
  const checks: ReportCheck[] = [];
  let headers: Headers | null = null;
  let html = "";
  let httpsOk = false;

  try {
    const res = await safeFetch(`https://${host}`, { redirect: "follow", headers: UA });
    headers = res.headers;
    html = await res.text().catch(() => "");
    httpsOk = res.status < 500;
  } catch {
    httpsOk = false;
  }
  checks.push({
    id: "https", label: "Serves a secure HTTPS connection", pass: httpsOk, weight: 22, severity: "high",
    detail: httpsOk ? "The site responded correctly over an encrypted HTTPS connection." : "We could not reach the site over HTTPS. The certificate may be missing, expired or misconfigured.",
    fix: "Install a valid TLS certificate (Let's Encrypt is free) and serve all traffic over HTTPS.",
  });

  let redirects = false;
  try {
    const res = await safeFetch(`http://${host}`, { headers: UA, redirect: "manual" });
    const loc = res.headers.get("location") || "";
    redirects = res.status >= 300 && res.status < 400 && /^https:/i.test(loc);
  } catch {
    redirects = false;
  }
  checks.push({
    id: "redirect", label: "Forces insecure traffic to HTTPS", pass: redirects, weight: 8, severity: "medium",
    detail: redirects ? "Visitors arriving over plain HTTP are redirected to the secure version." : "Plain HTTP requests are not redirected, so visitors can be served an insecure version of the site.",
    fix: "Add a permanent 301 redirect from http:// to https:// at the server or CDN level.",
  });

  const headerDefs = [
    { id: "hsts", key: "strict-transport-security", name: "HSTS", weight: 10, fix: "Add a Strict-Transport-Security header to force HTTPS in browsers." },
    { id: "csp", key: "content-security-policy", name: "Content-Security-Policy", weight: 10, fix: "Add a Content-Security-Policy header to defend against content injection and XSS." },
    { id: "xfo", key: "x-frame-options", name: "X-Frame-Options", weight: 6, fix: "Add X-Frame-Options: DENY (or a CSP frame-ancestors rule) to prevent clickjacking." },
    { id: "xcto", key: "x-content-type-options", name: "X-Content-Type-Options", weight: 6, fix: "Add X-Content-Type-Options: nosniff to stop MIME-type sniffing." },
    { id: "refpol", key: "referrer-policy", name: "Referrer-Policy", weight: 5, fix: "Add a Referrer-Policy header to control what referrer data leaks to third parties." },
  ] as const;
  for (const h of headerDefs) {
    const has = !!headers?.has(h.key);
    checks.push({
      id: h.id, label: `${h.name} security header`, pass: has, weight: h.weight, severity: h.weight >= 10 ? "medium" : "low",
      detail: has ? `The ${h.name} header is present and configured.` : `The ${h.name} header is missing.`,
      fix: h.fix,
    });
  }

  const txt = await withTimeout(dns.resolveTxt(host), 8000, [] as string[][]);
  const dmarcTxt = await withTimeout(dns.resolveTxt(`_dmarc.${host}`), 8000, [] as string[][]);
  const spf = txt.map((p) => p.join("")).find((r) => /^v=spf1/i.test(r)) || null;
  const dmarcRec = dmarcTxt.map((p) => p.join("")).find((r) => /^v=DMARC1/i.test(r)) || null;
  const dmarcPolicy = dmarcRec ? (dmarcRec.match(/\bp=(\w+)/i)?.[1]?.toLowerCase() ?? "none") : null;
  const dmarcStrong = dmarcPolicy === "reject" || dmarcPolicy === "quarantine";

  checks.push({
    id: "spf", label: "SPF record (anti-spoofing)", pass: !!spf, weight: 12, severity: "high",
    detail: spf ? "An SPF record is published, declaring who may send email for this domain." : "No SPF record found, so anyone can send email that appears to come from this domain.",
    fix: "Publish an SPF TXT record listing your legitimate mail servers (e.g. v=spf1 include:your-provider ~all).",
  });
  checks.push({
    id: "dmarc", label: "DMARC policy (anti-spoofing)", pass: !!dmarcRec && dmarcStrong, weight: 13, severity: "high",
    detail: !dmarcRec
      ? "No DMARC record found. There is nothing telling mail servers to reject forged email from this domain."
      : dmarcStrong
        ? `A DMARC policy is enforced (p=${dmarcPolicy}), actively blocking spoofed email.`
        : "A DMARC record exists but its policy is p=none, so spoofed email is monitored but not blocked.",
    fix: "Publish a DMARC record at _dmarc with an enforcing policy (p=quarantine or p=reject).",
  });

  const lower = html.toLowerCase();
  const hasPrivacy = /href=["'][^"']*privacy[^"']*["']/.test(lower) || lower.includes("privacy policy");
  checks.push({
    id: "privacy", label: "Privacy policy (Data Protection Act 2021)", pass: hasPrivacy, weight: 8, severity: "medium",
    detail: hasPrivacy ? "A privacy policy was found, a baseline expectation under Zimbabwe's Data Protection Act (2021)." : "No privacy policy was detected. Zimbabwe's Data Protection Act (2021) requires businesses handling personal data to disclose how it's used.",
    fix: "Publish a clear privacy policy covering what personal data you collect, why, and how it's protected.",
  });

  const totalWeight = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.reduce((s, c) => s + (c.pass ? c.weight : 0), 0);
  const score = Math.round((earned / totalWeight) * 100);
  const grade = score >= 90 ? "A" : score >= 75 ? "B" : score >= 60 ? "C" : score >= 40 ? "D" : "F";

  const sevRank: Record<string, number> = { high: 3, medium: 2, low: 1 };
  const topFindings: TopFinding[] = checks
    .filter((c) => !c.pass)
    .sort((a, b) => sevRank[b.severity] - sevRank[a.severity] || b.weight - a.weight)
    .map((c) => ({ label: c.label, severity: c.severity, detail: c.detail, fix: c.fix }));

  return {
    host,
    score,
    grade,
    passed: checks.filter((c) => c.pass).length,
    total: checks.length,
    checks,
    topFindings,
    scannedAt: new Date().toISOString(),
  };
}
