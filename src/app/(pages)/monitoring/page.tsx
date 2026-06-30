"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { Activity, Mail, ShieldCheck, RefreshCw, BellRing, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { toast } from "sonner";

export default function MonitoringPage() {
  const [domain, setDomain] = useState("");
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = domain.trim();
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(d.replace(/^https?:\/\//, "").replace(/\/.*$/, ""))) {
      toast.error("Please enter a valid domain, e.g. yourbusiness.co.zw");
      return;
    }
    const msg = `Hi Donovan, please add me to free monthly security monitoring.\n\nBusiness: ${name || "(not given)"}\nDomain: ${d}`;
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp — just hit send and you're on the list.");
  };

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Activity className="w-3.5 h-3.5" /> FREE MONITORING
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Free Monthly Security Monitoring</h1>
          <p className="text-white/60 text-lg">We re-scan your site every month and message you if anything changes — SSL expiry, new exposures, missing protections. No cost.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: RefreshCw, t: "Monthly re-scan", d: "We watch so you don't have to." },
              { icon: BellRing, t: "Change alerts", d: "Told the moment something shifts." },
              { icon: ShieldCheck, t: "Zero cost", d: "Genuinely free, no card." },
            ].map((c) => (
              <div key={c.t} className="bg-card border border-border rounded-2xl p-5 text-center">
                <c.icon className="w-6 h-6 text-gold mx-auto mb-3" />
                <p className="text-foreground text-sm font-semibold">{c.t}</p>
                <p className="text-muted-foreground text-xs mt-1">{c.d}</p>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="bg-card border border-border rounded-3xl p-8 space-y-5">
            <div>
              <label htmlFor="m-name" className="block text-sm font-medium text-muted-foreground mb-1.5">Business name</label>
              <input id="m-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your business"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
            </div>
            <div>
              <label htmlFor="m-domain" className="block text-sm font-medium text-muted-foreground mb-1.5">Website to monitor *</label>
              <input id="m-domain" value={domain} onChange={(e) => setDomain(e.target.value)} required placeholder="yourbusiness.co.zw"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
            </div>
            <button type="submit" className="w-full py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all flex items-center justify-center gap-2 text-sm gold-glow-sm">
              <Mail className="w-4 h-4" /> Start free monitoring
            </button>
            <p className="text-muted-foreground/60 text-xs text-center">Confirms over WhatsApp so we can reach you with alerts. Unsubscribe anytime.</p>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Prefer to talk first?{" "}
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline inline-flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> Message us
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
