"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Loader2, ShieldCheck, Lock, Check, X, MessageCircle, FileDown, ArrowRight, Link2 } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { generateReportPdf, downloadPdf, type ReportData } from "@/lib/report-pdf";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "d67988f4-7f52-433d-91e0-08b06ef25f41";

const GRADE_COLOR: Record<string, string> = {
  A: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  B: "text-lime-400 border-lime-400/40 bg-lime-400/10",
  C: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  D: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  F: "text-red-400 border-red-400/40 bg-red-400/10",
};
const SEV_COLOR: Record<string, string> = { high: "text-red-400", medium: "text-amber-400", low: "text-white/50" };

export default function ReportRunner() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ReportData | null>(null);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const runScan = useCallback(async (d: string) => {
    setError(""); setResult(null); setDone(false); setLoading(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain: d }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong. Try again.");
      else setResult(data);
    } catch {
      setError("Could not run the scan. Check the address and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const scan = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) runScan(domain);
  };

  // Deep-link: /report?domain=x auto-runs, so shared links work.
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get("domain");
    if (d) { setDomain(d); runScan(d); }
  }, [runScan]);

  const shareLink = () => {
    if (!result) return;
    const url = `${window.location.origin}/report?domain=${encodeURIComponent(result.host)}`;
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const consultUrl = result
    ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
        `Hi Donovan, I got the full security report for ${result.host} (grade ${result.grade}, ${result.score}/100). YES, I'd like the free 20-minute consult.`,
      )}`
    : siteConfig.whatsappUrl;

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;
    setSubmitting(true);

    // 1. Capture the lead (warm: they gave us their number + their scan result)
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New report lead: ${result.host} (grade ${result.grade}, ${result.score}/100)`,
          from_name: "Vanorika Report Tool",
          name,
          whatsapp,
          email,
          domain: result.host,
          grade: result.grade,
          score: result.score,
          message: `Report requested for ${result.host}. Grade ${result.grade} (${result.score}/100). Name: ${name}. WhatsApp: ${whatsapp}. Email: ${email || "not given"}.`,
        }),
      });
    } catch {
      /* never block the download on a capture hiccup */
    }

    // 2. Generate + download the branded PDF client-side
    try {
      const bytes = await generateReportPdf(result);
      downloadPdf(bytes, `Vanorika-Security-Report-${result.host}.pdf`);
    } catch {
      setError("The report generated but the download was blocked by your browser. Please allow downloads and try again.");
    }

    setSubmitting(false);
    setDone(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Scan input */}
      <form onSubmit={scan} className="flex flex-col sm:flex-row gap-3">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="yourbusiness.co.zw"
          aria-label="Your website"
          className="flex-1 px-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm"
        />
        <button type="submit" disabled={loading}
          className="px-7 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Scanning…</> : <><Search className="w-4 h-4" /> Scan my site</>}
        </button>
      </form>
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
      {!result && !loading && (
        <p className="text-white/30 text-xs mt-4 text-center">Passive checks only: we read public information, never log in or scan aggressively.</p>
      )}

      {result && (
        <div className="mt-8 bg-card border border-border rounded-3xl p-6 sm:p-8">
          {/* Ungated: grade + score + top 2 findings */}
          <div className="flex items-center justify-between pb-6 border-b border-border">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Report for</p>
              <p className="font-display text-lg font-bold text-foreground break-all">{result.host}</p>
              <p className="text-muted-foreground text-xs mt-1">{result.passed}/{result.total} checks passed</p>
            </div>
            <div className={`w-20 h-20 rounded-2xl border flex flex-col items-center justify-center shrink-0 ${GRADE_COLOR[result.grade]}`}>
              <span className="font-display text-3xl font-black leading-none">{result.grade}</span>
              <span className="text-[11px] opacity-80 mt-0.5">{result.score}/100</span>
            </div>
          </div>

          <div className="pt-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70 mb-3">Top findings</p>
            <ul className="space-y-3">
              {result.topFindings.slice(0, 2).map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      {f.label} <span className={`text-[10px] uppercase font-semibold ml-1 ${SEV_COLOR[f.severity]}`}>{f.severity}</span>
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">{f.detail}</p>
                  </div>
                </li>
              ))}
              {result.topFindings.length === 0 && (
                <li className="flex items-center gap-2 text-emerald-400 text-sm"><Check className="w-4 h-4" /> No issues in the passive checks. The full report confirms what to verify manually.</li>
              )}
            </ul>
            <button onClick={shareLink} type="button" className="mt-4 inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-xs transition-colors">
              <Link2 className="w-3.5 h-3.5" /> {copied ? "Link copied" : "Copy shareable link"}
            </button>
          </div>

          {/* Gate */}
          {!done ? (
            <div className="mt-7 pt-7 border-t border-border">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4 text-gold" />
                <p className="font-display font-bold text-foreground">Get the complete 5-page report, free</p>
              </div>
              <p className="text-muted-foreground text-sm mb-5">
                Every finding, ranked by severity, with plain-English fixes and your Data Protection Act (2021) exposure. Sent to you as a branded PDF.
              </p>
              <form onSubmit={unlock} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                    className="px-4 py-3 rounded-xl bg-[#07070D] border border-[#252545] text-white text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none" />
                  <input required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp number"
                    className="px-4 py-3 rounded-xl bg-[#07070D] border border-[#252545] text-white text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none" />
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional, for a copy)"
                  className="w-full px-4 py-3 rounded-xl bg-[#07070D] border border-[#252545] text-white text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none" />
                <button type="submit" disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold text-black font-bold hover:bg-gold-light transition-colors disabled:opacity-60 text-sm">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                  Get my full report
                </button>
                <p className="text-white/25 text-[11px] text-center">No spam. We use your details only to follow up on this report.</p>
              </form>
            </div>
          ) : (
            <div className="mt-7 pt-7 border-t border-border text-center">
              <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="font-display font-bold text-foreground mb-1">Your report is downloading.</p>
              <p className="text-muted-foreground text-sm mb-5">
                Check your downloads for the PDF. {result.topFindings.length > 0 ? "Some findings need a manual test to confirm, so " : ""}reply YES on WhatsApp for a free 20-minute consult.
              </p>
              <a href={consultUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light transition-colors text-sm">
                <MessageCircle className="w-4 h-4" /> Reply YES for a free consult <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
