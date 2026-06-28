"use client";
import { useState } from "react";
import { Search, Loader2, Check, X, ArrowRight, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/lib/data";

type Variant = "ssl" | "whois" | "subdomains" | "email";

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ToolRunner({ variant, placeholder, endpoint }: { variant: Variant; placeholder: string; endpoint: string }) {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong. Try again.");
      else setResult(data);
    } catch {
      setError("Could not run the check. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={run} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder={placeholder}
          aria-label="Domain"
          className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm"
        />
        <button type="submit" disabled={loading}
          className="px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking…</> : <><Search className="w-4 h-4" /> Run Check</>}
        </button>
      </form>
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

      {result && (
        <div className="mt-8 bg-card border border-border rounded-3xl p-8">
          {variant === "ssl" && <SslResult r={result} />}
          {variant === "whois" && <WhoisResult r={result} />}
          {variant === "subdomains" && <SubdomainsResult r={result} />}
          {variant === "email" && <EmailResult r={result} />}

          <div className="mt-8 pt-6 border-t border-border flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                This is a passive, read-only check. A full assessment goes far deeper — authentication, injection, outdated software and business logic.
              </p>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-2.5 transition-all">
                Want a full audit? Get yours free <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      <p className="text-muted-foreground/60 text-xs text-center mt-6">
        Read-only and passive. We only query public records — no login, no port scanning, no exploitation.
      </p>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-border last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-foreground text-sm font-medium text-right break-words">{value}</span>
    </div>
  );
}

function SslResult({ r }: { r: any }) {
  const ok = r.valid && (r.daysRemaining ?? 0) > 0;
  const warn = (r.daysRemaining ?? 0) > 0 && (r.daysRemaining ?? 0) <= 21;
  return (
    <div>
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${ok ? "bg-green/10 text-green" : "bg-red-500/10 text-red-500"}`}>
          {ok ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </div>
        <div>
          <p className="font-display text-lg font-bold text-foreground break-all">{r.host}</p>
          <p className={`text-sm ${ok ? "text-green" : "text-red-500"}`}>
            {r.error ? r.error : ok ? "Valid certificate" : "Certificate problem"}
          </p>
        </div>
      </div>
      {!r.error && (
        <div>
          <Row label="Days remaining" value={
            <span className={warn ? "text-gold" : !ok ? "text-red-500" : ""}>{r.daysRemaining} days{warn ? " — renew soon" : ""}</span>
          } />
          <Row label="Expires" value={fmtDate(r.validTo)} />
          <Row label="Issued" value={fmtDate(r.validFrom)} />
          <Row label="Issuer" value={r.issuer || "—"} />
          <Row label="Issued to" value={r.subject || "—"} />
          {r.san?.length > 0 && <Row label="Covers" value={r.san.join(", ")} />}
        </div>
      )}
    </div>
  );
}

function WhoisResult({ r }: { r: any }) {
  return (
    <div>
      <p className="font-display text-lg font-bold text-foreground mb-4 break-all">{r.domain}</p>
      <Row label="Registrar" value={r.registrar} />
      <Row label="Registered" value={fmtDate(r.registered)} />
      <Row label="Expires" value={fmtDate(r.expires)} />
      <Row label="Last updated" value={fmtDate(r.updated)} />
      {r.status?.length > 0 && <Row label="Status" value={r.status.join(", ")} />}
      {r.nameservers?.length > 0 && <Row label="Name servers" value={r.nameservers.join(", ")} />}
    </div>
  );
}

function CheckRow({ ok, label, detail }: { ok: boolean; label: string; detail: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ok ? "bg-green/10 text-green" : "bg-red-500/10 text-red-500"}`}>
        {ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      </div>
      <div className="min-w-0">
        <p className="text-foreground text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-xs mt-0.5 break-words">{detail}</p>
      </div>
    </div>
  );
}

function EmailResult({ r }: { r: any }) {
  const grade = r.score >= 80 ? { t: "Strong", c: "text-green" } : r.score >= 50 ? { t: "Partial", c: "text-gold" } : { t: "Weak", c: "text-red-500" };
  const weakDmarc = r.dmarc.found && (r.dmarc.policy === "none" || !r.dmarc.policy);
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-6 pb-6 border-b border-border">
        <p className="font-display text-lg font-bold text-foreground break-all">{r.domain}</p>
        <div className="text-right shrink-0">
          <p className={`font-display text-2xl font-bold ${grade.c}`}>{r.score}%</p>
          <p className={`text-xs ${grade.c}`}>{grade.t} email security</p>
        </div>
      </div>
      <CheckRow ok={r.spf.found} label="SPF — sender spoofing protection"
        detail={r.spf.found ? <span className="font-mono">{r.spf.record}</span> : "No SPF record. Anyone can forge email from your domain."} />
      <CheckRow ok={r.dmarc.found && !weakDmarc} label="DMARC — enforces SPF/DKIM"
        detail={
          r.dmarc.found
            ? weakDmarc
              ? `Policy is "p=none" — monitoring only, not blocking spoofed mail. Move to quarantine or reject.`
              : `Policy "p=${r.dmarc.policy}" — spoofed mail is actively rejected or quarantined.`
            : "No DMARC record. Spoofed email isn't being blocked."
        } />
      <CheckRow ok={r.mx.length > 0} label="MX — mail servers"
        detail={r.mx.length > 0 ? r.mx.join(", ") : "No MX records found for this domain."} />
    </div>
  );
}

function SubdomainsResult({ r }: { r: any }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <p className="font-display text-lg font-bold text-foreground break-all">{r.domain}</p>
        <p className="text-gold font-display text-2xl font-bold">{r.count}</p>
      </div>
      <p className="text-muted-foreground text-xs mb-4">Subdomains found in public certificate transparency logs:</p>
      {r.count === 0 ? (
        <p className="text-muted-foreground text-sm">No subdomains found in certificate transparency logs.</p>
      ) : (
        <div className="max-h-80 overflow-y-auto space-y-1.5 pr-1">
          {r.subdomains.map((s: string) => (
            <div key={s} className="font-mono text-xs text-foreground bg-background border border-border rounded-lg px-3 py-2 break-all">{s}</div>
          ))}
        </div>
      )}
    </div>
  );
}
