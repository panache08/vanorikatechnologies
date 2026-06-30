"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { ShieldCheck, ShieldAlert, Check, X, Loader2, Search, ArrowRight, Download } from "lucide-react";
import LeadCaptureModal from "@/components/lead-capture-modal";

type Check = { id: string; label: string; pass: boolean; detail: string };
type Result = { host: string; score: number; checks: Check[] };

export default function SecurityCheckPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/security-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Could not run the check. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = result ? (result.score >= 75 ? "text-green" : result.score >= 50 ? "text-gold" : "text-red-500") : "";

  const failed = result ? result.checks.filter((c) => !c.pass).map((c) => c.label) : [];
  const leadMessage = result
    ? `Hi Donovan, I ran your free security check on ${result.host} and scored ${result.score}%.` +
      (failed.length ? ` It flagged: ${failed.join(", ")}.` : "") +
      ` Can you help me fix these?`
    : "Hello! I'd like to discuss a project with Vanorika Technologies.";
  const lowScore = result ? result.score < 75 : false;

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Free Website Security Check</h1>
          <p className="text-white/60 text-lg">
            Enter your website and we&apos;ll run a few passive checks — SSL, security headers, HTTPS redirect and privacy policy.
            No login, nothing intrusive.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={run} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourbusiness.co.zw"
              aria-label="Website address"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm"
            />
            <button type="submit" disabled={loading}
              className="px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Scanning…</> : <><Search className="w-4 h-4" /> Run Check</>}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

          {result && (
            <div id="print-report" className="mt-10 bg-card border border-border rounded-3xl p-8">
              {/* Branded header — only appears in the printed / saved PDF */}
              <div className="print-only mb-8 pb-6" style={{ borderBottom: "1px solid #C9A84C" }}>
                <p style={{ color: "#C9A84C", fontWeight: 800, fontSize: "18px", letterSpacing: "0.08em" }}>VANORIKA TECHNOLOGIES</p>
                <p style={{ color: "#9aa3b2", fontSize: "11px", marginTop: "2px" }}>Website Security Report · vanorikatechnologies.co.zw · {new Date().toLocaleDateString("en-GB")}</p>
              </div>
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Results for</p>
                  <p className="font-display text-xl font-bold text-foreground break-all">{result.host}</p>
                </div>
                <div className="text-right">
                  <p className={`font-display text-4xl font-bold ${scoreColor}`}>{result.score}%</p>
                  <p className="text-muted-foreground text-xs">passed</p>
                </div>
              </div>

              <ul className="space-y-4">
                {result.checks.map((c) => (
                  <li key={c.id} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.pass ? "bg-green/10 text-green" : "bg-red-500/10 text-red-500"}`}>
                      {c.pass ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">{c.label}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-border bg-gold/5 -mx-8 -mb-8 px-8 pb-8 rounded-b-3xl">
                <div className="flex items-start gap-3 mb-5">
                  <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This is a surface-level passive check. A full audit tests far more — authentication, injection, outdated
                    software, and business logic.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <LeadCaptureModal
                    source={`Security check tool (${result?.host ?? ""} — ${result?.score ?? ""}%)`}
                    label={lowScore ? "Get a quote to fix these" : "Want a full audit? Get yours free"}
                    icon={<ArrowRight className="w-4 h-4 order-last" />}
                    whatsappMessage={leadMessage}
                    heading="Let's fix what we found"
                    subheading="Leave your name and contact — we'll review your results and come back with exactly what to fix and a quote. We'll open WhatsApp now so you can send your score over."
                    className="no-print inline-flex items-center gap-2 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm uppercase tracking-wider"
                  />
                  <button onClick={() => window.print()} type="button"
                    className="no-print inline-flex items-center gap-2 px-5 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all text-sm font-semibold">
                    <Download className="w-4 h-4" /> Download report
                  </button>
                </div>
              </div>
            </div>
          )}

          {!result && !loading && (
            <p className="text-muted-foreground/60 text-xs text-center mt-6">
              We only read publicly available information. We never log in, scan ports, or attempt to exploit anything.
              Results may vary for sites behind a firewall or bot protection (e.g. Cloudflare) — this is a quick teaser,
              not a definitive scan.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
