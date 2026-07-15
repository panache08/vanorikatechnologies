"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Globe, ShoppingCart, Layers, Smartphone, Check, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

const TYPES = [
  { id: "website", label: "Business Website", icon: Globe, base: 250 },
  { id: "ecommerce", label: "Online Store", icon: ShoppingCart, base: 600 },
  { id: "webapp", label: "Web App / System", icon: Layers, base: 1200 },
  { id: "mobile", label: "Mobile App", icon: Smartphone, base: 800 },
];

const SIZES = [
  { id: "small", label: "Small", note: "1 to 5 pages", mult: 1 },
  { id: "medium", label: "Medium", note: "6 to 15 pages", mult: 1.6 },
  { id: "large", label: "Large", note: "15+ pages", mult: 2.5 },
];

const ADDONS = [
  { id: "cms", label: "Content dashboard (edit it yourself)", price: 150 },
  { id: "payments", label: "Online payments (EcoCash / Paynow / card)", price: 400 },
  { id: "design", label: "Custom design (not a template)", price: 250 },
  { id: "seo", label: "SEO setup", price: 120 },
  { id: "booking", label: "Booking / appointments", price: 300 },
  { id: "accounts", label: "User accounts & logins", price: 400 },
  { id: "multilang", label: "Multi-language", price: 200 },
];

const SUPPORT = [
  { id: "1m", label: "1 month", price: 0 },
  { id: "3m", label: "3 months", price: 100 },
  { id: "6m", label: "6 months", price: 250 },
];

function money(n: number) {
  return "$" + Math.round(n / 10) * 10;
}

export default function CostEstimator() {
  const [type, setType] = useState("website");
  const [size, setSize] = useState("small");
  const [addons, setAddons] = useState<string[]>(["seo"]);
  const [support, setSupport] = useState("1m");

  const toggle = (id: string) =>
    setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const { low, high } = useMemo(() => {
    const t = TYPES.find((x) => x.id === type)!;
    const s = SIZES.find((x) => x.id === size)!;
    const addonsTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
    const supportTotal = SUPPORT.find((x) => x.id === support)!.price;
    const mid = t.base * s.mult + addonsTotal + supportTotal;
    return { low: mid * 0.85, high: mid * 1.2 };
  }, [type, size, addons, support]);

  const card = "bg-card border rounded-xl px-4 py-3 text-sm cursor-pointer transition-all";
  const on = "border-gold/60 bg-gold/5 text-foreground";
  const off = "border-border text-muted-foreground hover:border-gold/30";

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
      <div className="space-y-8">
        {/* Type */}
        <div>
          <p className="text-foreground font-semibold text-sm mb-3">What do you need?</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {TYPES.map((t) => (
              <button key={t.id} onClick={() => setType(t.id)} className={`${card} flex items-center gap-3 ${type === t.id ? on : off}`}>
                <t.icon className="w-5 h-5 text-gold shrink-0" /> {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <p className="text-foreground font-semibold text-sm mb-3">How big?</p>
          <div className="grid grid-cols-3 gap-3">
            {SIZES.map((s) => (
              <button key={s.id} onClick={() => setSize(s.id)} className={`${card} text-center ${size === s.id ? on : off}`}>
                <span className="block font-medium">{s.label}</span>
                <span className="block text-xs text-muted-foreground/70 mt-0.5">{s.note}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div>
          <p className="text-foreground font-semibold text-sm mb-3">Add features</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {ADDONS.map((a) => {
              const active = addons.includes(a.id);
              return (
                <button key={a.id} onClick={() => toggle(a.id)} className={`${card} flex items-center gap-2.5 text-left ${active ? on : off}`}>
                  <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${active ? "bg-gold border-gold" : "border-muted-foreground/40"}`}>
                    {active && <Check className="w-3 h-3 text-[#07070D]" />}
                  </span>
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Support */}
        <div>
          <p className="text-foreground font-semibold text-sm mb-3">Free support period</p>
          <div className="grid grid-cols-3 gap-3">
            {SUPPORT.map((s) => (
              <button key={s.id} onClick={() => setSupport(s.id)} className={`${card} text-center ${support === s.id ? on : off}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-card border border-gold/20 rounded-3xl p-7 lg:sticky lg:top-28">
        <p className="text-muted-foreground text-sm mb-1">Estimated range</p>
        <p className="font-display text-4xl font-bold text-gold leading-tight">{money(low)} to {money(high)}</p>
        <p className="text-muted-foreground/70 text-xs mt-2 mb-6">USD, once-off. A real quote depends on your exact needs.</p>
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider mb-3">
          <MessageCircle className="w-4 h-4" /> Get an exact quote
        </a>
        <Link href="/pricing" className="block w-full text-center py-3 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm">
          See full pricing
        </Link>
        <p className="text-muted-foreground/60 text-xs mt-4 text-center">No obligation. Most quotes back within 2 hours.</p>
      </div>
    </div>
  );
}
