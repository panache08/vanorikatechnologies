"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { Layers, Search, Loader2, ShieldAlert, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

type Tech = { name: string; category: string; detail?: string };

export default function TechStackPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ host: string; server: string | null; count: number; tech: Tech[] } | null>(null);
  const [error, setError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setData(null); setLoading(true);
    try {
      const res = await fetch("/api/tools/tech-stack", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain }) });
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
            <Layers className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">What&apos;s This Site Built With?</h1>
          <p className="text-white/60 text-lg">Detect a website&apos;s CMS, frameworks, server and tools — and spot outdated software.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={run} className="flex flex-col sm:flex-row gap-3">
            <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.co.zw" aria-label="Website"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Detecting…</> : <><Search className="w-4 h-4" /> Detect</>}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

          {data && (
            <div className="mt-8 bg-card border border-border rounded-3xl p-8">
              <div className="flex items-baseline justify-between mb-5">
                <p className="font-display text-lg font-bold text-foreground break-all">{data.host}</p>
                <p className="text-gold font-display text-2xl font-bold">{data.count}</p>
              </div>
              {data.count === 0 ? (
                <p className="text-muted-foreground text-sm">No common technologies were fingerprinted (the site may be heavily proxied or custom-built).</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {data.tech.map((t) => (
                    <span key={t.name} className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground">
                      {t.name}<span className="text-muted-foreground text-xs"> · {t.category}</span>
                      {t.detail && <span className="text-gold text-xs"> ({t.detail})</span>}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-8 pt-6 border-t border-border flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">Outdated CMS or plugins are the #1 way sites get hacked. If a version shows above, it&apos;s worth checking it&apos;s current.</p>
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-2.5 transition-all">
                    Get a full audit — free <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
          <p className="text-muted-foreground/60 text-xs text-center mt-6">Passive fingerprinting from public response headers and page source only.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
