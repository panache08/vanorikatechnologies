"use client";
import { useState } from "react";
import { Search, Loader2, Check, X, ShieldCheck, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

type Chk = { id: string; label: string; pass: boolean; detail: string };
type Result = { host: string; score: number; checks: Chk[] };

export default function HomeScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setResult(null); setLoading(true);
    try {
      const res = await fetch("/api/security-check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong."); else setResult(data);
    } catch { setError("Could not run the check. Try again."); } finally { setLoading(false); }
  };

  const color = result ? (result.score >= 75 ? "text-green" : result.score >= 50 ? "text-gold" : "text-red-500") : "";
  const failed = result ? result.checks.filter((c) => !c.pass).map((c) => c.label) : [];
  const leadUrl = result
    ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi Donovan, I scanned ${result.host} on your site and scored ${result.score}%.${failed.length ? ` It flagged: ${failed.join(", ")}.` : ""} Can you help me fix these?`)}`
    : siteConfig.whatsappUrl;

  return (
    <section className="relative py-24 bg-[#0D0D1A] border-y border-border overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-gold/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-5">
          <ShieldCheck className="w-3.5 h-3.5" /> 10-SECOND CHECK
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">How secure is your website?</h2>
        <p className="text-white/55 mb-8">Enter your site and get an instant, free security score. No login, nothing intrusive.</p>

        <form onSubmit={run} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="yourbusiness.co.zw" aria-label="Your website"
            className="flex-1 px-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
          <button type="submit" disabled={loading}
            className="px-7 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Scanning…</> : <><Search className="w-4 h-4" /> Scan free</>}
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        {result && (
          <div className="mt-8 bg-card border border-border rounded-3xl p-6 sm:p-8 text-left">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Results for</p>
                <p className="font-display text-lg font-bold text-foreground break-all">{result.host}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`font-display text-4xl font-bold ${color}`}>{result.score}%</p>
                <p className="text-muted-foreground text-xs">passed</p>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {result.checks.map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${c.pass ? "bg-green/10 text-green" : "bg-red-500/10 text-red-500"}`}>
                    {c.pass ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-foreground text-sm">{c.label}</span>
                </li>
              ))}
            </ul>
            <a href={leadUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm uppercase tracking-wider">
              {result.score < 75 ? "Get a quote to fix these" : "Want a full audit? Get yours free"} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
        {!result && !loading && (
          <p className="text-white/30 text-xs mt-5">We only read public information — no port scanning, no exploitation.</p>
        )}
      </div>
    </section>
  );
}
