import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Check = { id: string; label: string; pass: boolean; detail: string };

function normalizeHost(input: string): string | null {
  let v = input.trim();
  if (!v) return null;
  v = v.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/\s/g, "");
  // very loose hostname validation
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(v)) return null;
  return v.toLowerCase();
}

async function safeFetch(url: string, opts: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    return await fetch(url, { ...opts, signal: controller.signal, redirect: "manual" });
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: Request) {
  let host: string | null = null;
  try {
    const body = await req.json();
    host = normalizeHost(String(body?.url ?? ""));
  } catch {
    /* ignore */
  }
  if (!host) {
    return NextResponse.json({ error: "Please enter a valid website address, e.g. example.co.zw" }, { status: 400 });
  }

  const checks: Check[] = [];
  let headers: Headers | null = null;
  let html = "";

  // 1. SSL / HTTPS reachable
  try {
    const res = await fetch(`https://${host}`, { redirect: "follow", headers: { "User-Agent": "VanorikaSecurityCheck/1.0" } });
    headers = res.headers;
    html = await res.text().catch(() => "");
    checks.push({ id: "ssl", label: "Valid SSL certificate (HTTPS)", pass: res.ok || res.status < 500, detail: `Site responded over HTTPS (status ${res.status}).` });
  } catch {
    checks.push({ id: "ssl", label: "Valid SSL certificate (HTTPS)", pass: false, detail: "Could not establish a secure HTTPS connection — certificate may be missing or invalid." });
  }

  // 2. HTTP -> HTTPS redirect
  try {
    const res = await safeFetch(`http://${host}`, { headers: { "User-Agent": "VanorikaSecurityCheck/1.0" } });
    const loc = res.headers.get("location") || "";
    const redirects = res.status >= 300 && res.status < 400 && /^https:/i.test(loc);
    checks.push({
      id: "redirect",
      label: "HTTP redirects to HTTPS",
      pass: redirects,
      detail: redirects ? "Insecure HTTP traffic is redirected to HTTPS." : "HTTP requests are not forced to HTTPS — visitors can be served insecurely.",
    });
  } catch {
    checks.push({ id: "redirect", label: "HTTP redirects to HTTPS", pass: false, detail: "Could not verify an HTTP→HTTPS redirect." });
  }

  // 3. Security headers present
  const wanted = [
    { key: "strict-transport-security", name: "HSTS" },
    { key: "content-security-policy", name: "CSP" },
    { key: "x-frame-options", name: "X-Frame-Options" },
    { key: "x-content-type-options", name: "X-Content-Type-Options" },
  ];
  const present = headers ? wanted.filter((w) => headers!.has(w.key)) : [];
  checks.push({
    id: "headers",
    label: "Security headers present",
    pass: present.length >= 3,
    detail: headers
      ? present.length
        ? `Found ${present.length}/4: ${present.map((p) => p.name).join(", ")}.${present.length < 4 ? " Missing: " + wanted.filter((w) => !headers!.has(w.key)).map((w) => w.name).join(", ") + "." : ""}`
        : "None of the four core security headers were found."
      : "Could not read response headers.",
  });

  // 4. Privacy policy detected
  const lower = html.toLowerCase();
  const hasPrivacy = /href=["'][^"']*privacy[^"']*["']/.test(lower) || lower.includes("privacy policy");
  checks.push({
    id: "privacy",
    label: "Privacy policy detected",
    pass: hasPrivacy,
    detail: hasPrivacy ? "A privacy policy link or reference was found on the homepage." : "No privacy policy link was detected — this is a Data Protection Act (2021) compliance gap.",
  });

  const score = Math.round((checks.filter((c) => c.pass).length / checks.length) * 100);
  return NextResponse.json({ host, score, checks });
}
