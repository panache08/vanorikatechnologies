"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { Mail, Copy, Check, ShieldAlert, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

const providers: Record<string, { label: string; spf: string }> = {
  google: { label: "Google Workspace / Gmail", spf: "include:_spf.google.com" },
  zoho: { label: "Zoho Mail", spf: "include:zoho.com" },
  microsoft: { label: "Microsoft 365 / Outlook", spf: "include:spf.protection.outlook.com" },
  other: { label: "Other / not sure", spf: "" },
};

export default function SpfDmarcGenerator() {
  const [domain, setDomain] = useState("");
  const [provider, setProvider] = useState("google");
  const [policy, setPolicy] = useState("quarantine");
  const [copied, setCopied] = useState("");

  const d = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "yourdomain.co.zw";
  const inc = providers[provider].spf;
  const spf = `v=spf1 ${inc ? inc + " " : ""}~all`.replace(/\s+/g, " ").trim();
  const dmarc = `v=DMARC1; p=${policy}; rua=mailto:dmarc@${d}; fo=1; adkim=s; aspf=s`;

  const copy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(""), 2000); });
  };

  const records = [
    { key: "spf", type: "TXT", name: "@ (root)", value: spf, note: "Tells the world which servers may send email for your domain." },
    { key: "dmarc", type: "TXT", name: "_dmarc", value: dmarc, note: "Tells receivers what to do with email that fails SPF/DKIM." },
  ];

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Mail className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">SPF &amp; DMARC Generator</h1>
          <p className="text-white/60 text-lg">Generate the exact DNS records that stop attackers spoofing email from your domain.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="sm:col-span-3">
              <label htmlFor="d" className="block text-sm font-medium text-muted-foreground mb-1.5">Your domain</label>
              <input id="d" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourbusiness.co.zw"
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
            </div>
            <div>
              <label htmlFor="p" className="block text-sm font-medium text-muted-foreground mb-1.5">Email provider</label>
              <select id="p" value={provider} onChange={(e) => setProvider(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-gold focus:outline-none transition-all text-sm">
                {Object.entries(providers).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="pol" className="block text-sm font-medium text-muted-foreground mb-1.5">DMARC enforcement</label>
              <select id="pol" value={policy} onChange={(e) => setPolicy(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-gold focus:outline-none transition-all text-sm">
                <option value="none">Monitor only (p=none), start here</option>
                <option value="quarantine">Quarantine (p=quarantine), recommended</option>
                <option value="reject">Reject (p=reject), strictest</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {records.map((r) => (
              <div key={r.key} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-gold/10 text-gold rounded font-mono font-semibold">{r.type}</span>
                    <span className="text-muted-foreground font-mono">Name: <span className="text-foreground">{r.name}</span></span>
                  </div>
                  <button onClick={() => copy(r.key, r.value)} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors">
                    {copied === r.key ? <><Check className="w-3.5 h-3.5 text-green" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
                <code className="block bg-background border border-border rounded-lg px-3 py-2.5 text-xs text-foreground font-mono break-all">{r.value}</code>
                <p className="text-muted-foreground text-xs mt-2">{r.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-card border border-border rounded-2xl p-5 text-sm text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium mb-2">How to use these</p>
            Add both as <strong className="text-foreground">TXT records</strong> in your domain&apos;s DNS panel (e.g. name.co.zw → DNS → TXT).
            Start DMARC on <strong className="text-foreground">p=none</strong> to monitor for a week or two, then move to <strong className="text-foreground">quarantine</strong>.
            If you also use a separate provider (newsletters, CRM), add their <code className="text-gold">include:</code> to the SPF record before <code className="text-gold">~all</code>.
          </div>

          <div className="mt-8 pt-6 border-t border-border flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Not sure these are right for your setup? We&apos;ll configure email security for you as part of a free assessment.</p>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-2.5 transition-all">
                Get help setting this up <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
