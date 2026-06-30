"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { Lock, Search, Loader2, Check, X, AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

type Proto = { version: string; supported: boolean; weak: boolean; cipher: string | null };
type Data = { host: string; protocols: Proto[]; weakEnabled: string[]; modern: boolean; good: boolean };

export default function TlsPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setData(null); setLoading(true);
    try {
      const res = await fetch("/api/tools/tls", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain }) });
      const d = await res.json();
      if (!res.ok) setError(d.error || "Something went wrong."); else setData(d);
    } catch { setError("Could not run the check."); } finally { setLoading(false); }
  };

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Lock className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">TLS / Protocol Checker</h1>
          <p className="text-white/60 text-lg">Find out which TLS versions your site accepts — and whether it still allows weak, legacy protocols attackers exploit.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={run} className="flex flex-col sm:flex-row gap-3">
            <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourbusiness.co.zw" aria-label="Domain"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Testing…</> : <><Search className="w-4 h-4" /> Test</>}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

          {data && (
            <div className="mt-8 bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <p className="font-display text-lg font-bold text-foreground break-all">{data.host}</p>
                <span className={`text-sm font-semibold ${data.weakEnabled.length ? "text-red-500" : "text-green"}`}>{data.weakEnabled.length ? "Weak protocols enabled" : "Looks good"}</span>
              </div>
              <div className="space-y-3">
                {data.protocols.map((p) => (
                  <div key={p.version} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${!p.supported ? "bg-muted/30 text-muted-foreground" : p.weak ? "bg-red-500/10 text-red-500" : "bg-green/10 text-green"}`}>
                      {!p.supported ? <X className="w-4 h-4" /> : p.weak ? <AlertTriangle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </div>
                    <span className="text-foreground text-sm font-medium w-20">{p.version}</span>
                    <span className={`text-sm ${!p.supported ? "text-muted-foreground" : p.weak ? "text-red-500" : "text-green"}`}>
                      {!p.supported ? "Not supported" : p.weak ? "Supported — weak, disable this" : "Supported"}
                    </span>
                    {p.cipher && <span className="text-muted-foreground text-xs ml-auto font-mono hidden sm:inline">{p.cipher}</span>}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{data.weakEnabled.length ? `Disable ${data.weakEnabled.join(" and ")} — they're deprecated and exploitable. We can fix your TLS configuration.` : "Your TLS configuration looks healthy. A full audit checks ciphers, certificates and the rest of your stack."}</p>
                  <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi Donovan, I tested ${data.host} TLS${data.weakEnabled.length ? ` — it still allows ${data.weakEnabled.join(", ")}` : ""}. Can you review my configuration?`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-2.5 transition-all">
                    Get a full audit — free <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
          <p className="text-muted-foreground/60 text-xs text-center mt-6">Passive — we attempt a handshake at each protocol version. No data is sent beyond the standard TLS negotiation.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
