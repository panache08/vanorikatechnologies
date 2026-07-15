"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { Calculator, AlertTriangle, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

const sizes = [
  { id: "micro", label: "1 to 5 staff", base: 1500, records: 500 },
  { id: "small", label: "6 to 20 staff", base: 4000, records: 3000 },
  { id: "medium", label: "21 to 100 staff", base: 12000, records: 20000 },
  { id: "large", label: "100+ staff", base: 35000, records: 100000 },
];
const sectors = [
  { id: "general", label: "General / retail", mult: 1 },
  { id: "hospitality", label: "Hospitality / travel", mult: 1.2 },
  { id: "finance", label: "Finance / fintech", mult: 1.8 },
  { id: "health", label: "Healthcare", mult: 2 },
  { id: "legal", label: "Legal / professional", mult: 1.5 },
];

function money(n: number) {
  return "$" + Math.round(n).toLocaleString();
}

export default function BreachCostPage() {
  const [size, setSize] = useState(sizes[1]);
  const [sector, setSector] = useState(sectors[0]);
  const [pii, setPii] = useState(true);
  const [payments, setPayments] = useState(false);

  const dataMult = 1 + (pii ? 0.4 : 0) + (payments ? 0.6 : 0);
  const lowBase = size.base * sector.mult * dataMult;
  const breakdown = [
    { label: "Downtime & recovery", value: lowBase * 0.4 },
    { label: "Lost customers & reputation", value: lowBase * 0.35 },
    { label: "DPA 2021 fines & legal exposure", value: lowBase * 0.2 },
    { label: "Notification & remediation", value: lowBase * 0.15 },
  ];
  const low = breakdown.reduce((a, b) => a + b.value, 0);
  const high = low * 2.4;

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Calculator className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">What Could a Breach Cost You?</h1>
          <p className="text-white/60 text-lg">A quick estimate of what a data breach could cost your Zimbabwean business, so you can weigh it against the cost of prevention.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Business size</p>
              <div className="grid grid-cols-2 gap-2">
                {sizes.map((s) => (
                  <button key={s.id} onClick={() => setSize(s)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all ${size.id === s.id ? "bg-gold text-[#07070D]" : "bg-background border border-border text-muted-foreground hover:text-foreground"}`}>{s.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-muted-foreground mb-2">Sector</label>
              <select id="sector" value={sector.id} onChange={(e) => setSector(sectors.find((x) => x.id === e.target.value)!)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:border-gold focus:outline-none transition-all text-sm">
                {sectors.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer bg-background border border-border rounded-xl px-4 py-3">
                <input type="checkbox" checked={pii} onChange={(e) => setPii(e.target.checked)} className="accent-[#C9A84C] w-4 h-4" /> We store personal data
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer bg-background border border-border rounded-xl px-4 py-3">
                <input type="checkbox" checked={payments} onChange={(e) => setPayments(e.target.checked)} className="accent-[#C9A84C] w-4 h-4" /> We handle payments
              </label>
            </div>
          </div>

          <div className="mt-8 bg-card border border-gold/20 rounded-3xl p-8 text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">Estimated breach cost</p>
            <p className="font-display font-black text-4xl md:text-5xl text-gold mb-1">{money(low)} to {money(high)}</p>
            <p className="text-muted-foreground text-xs mb-6">Indicative range in USD</p>
            <div className="text-left space-y-2 mb-7">
              {breakdown.map((b) => (
                <div key={b.label} className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="text-foreground font-medium">{money(b.value)} to {money(b.value * 2.4)}</span>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi Donovan, your calculator estimates a breach could cost my business ${money(low)} to ${money(high)}. I'd like to reduce that risk. Can we talk?`)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm gold-glow-sm">
              <MessageCircle className="w-4 h-4" /> Reduce my risk for less
            </a>
            <p className="text-muted-foreground/60 text-xs mt-5 flex items-start gap-1.5 justify-center">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> Indicative only: a directional estimate, not a precise figure. A free assessment gives you the real picture.
            </p>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6">
            A typical security audit costs a fraction of any of these numbers.{" "}
            <a href="/pricing" className="text-gold hover:underline">See pricing →</a>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
