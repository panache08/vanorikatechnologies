"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { Radar, Search, Loader2, Globe, Mail, Server, Network, ShieldAlert, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

type Data = {
  domain: string;
  counts: { subdomains: number; a: number; mx: number; ns: number };
  subdomains: string[];
  dns: { a: string[]; mx: string[]; ns: string[]; hasSpf: boolean };
};

export default function AttackSurfacePage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setData(null); setLoading(true);
    try {
      const res = await fetch("/api/tools/attack-surface", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain }) });
      const d = await res.json();
      if (!res.ok) setError(d.error || "Something went wrong."); else setData(d);
    } catch { setError("Could not run the check."); } finally { setLoading(false); }
  };

  const groups = data ? [
    { icon: Globe, label: "Subdomains", count: data.counts.subdomains, items: data.subdomains },
    { icon: Server, label: "IP addresses (A)", count: data.dns.a.length, items: data.dns.a },
    { icon: Mail, label: "Mail servers (MX)", count: data.dns.mx.length, items: data.dns.mx },
    { icon: Network, label: "Name servers (NS)", count: data.dns.ns.length, items: data.dns.ns },
  ] : [];

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Radar className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Attack Surface Mapper</h1>
          <p className="text-white/60 text-lg">See everything an attacker can discover about your domain — subdomains, IPs, mail and name servers — in one view.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={run} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourbusiness.co.zw" aria-label="Domain"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Mapping…</> : <><Search className="w-4 h-4" /> Map it</>}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

          {data && (
            <div className="mt-10">
              <div className="text-center mb-8">
                <div className="inline-block px-5 py-3 bg-gold/10 border border-gold/30 rounded-xl">
                  <p className="font-display text-lg font-bold text-gold break-all">{data.domain}</p>
                </div>
                {!data.dns.hasSpf && (
                  <p className="text-red-400 text-xs mt-3 inline-flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /> No SPF record — email can be spoofed from this domain.</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {groups.map((g) => (
                  <div key={g.label} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <g.icon className="w-4 h-4 text-gold" />
                      <span className="text-foreground text-sm font-semibold flex-1">{g.label}</span>
                      <span className="font-display text-gold font-bold text-sm">{g.count}</span>
                    </div>
                    {g.items.length === 0 ? (
                      <p className="text-muted-foreground text-xs">None found.</p>
                    ) : (
                      <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                        {g.items.map((it) => (
                          <div key={it} className="font-mono text-xs text-muted-foreground bg-background border border-border rounded px-2.5 py-1.5 break-all">{it}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-card border border-border rounded-2xl p-5 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">Every subdomain and service is a potential way in. Forgotten or outdated ones are where attackers start. We&apos;ll assess all of them — free.</p>
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-2.5 transition-all">
                    Assess my attack surface <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
          <p className="text-muted-foreground/60 text-xs text-center mt-6">Passive — public certificate transparency logs and DNS only. Nothing intrusive.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
