import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, FileText, Users, Handshake, Dice5, Network,
  Coins, ShieldCheck, Smartphone, Sparkles,
  CheckCircle, ExternalLink, MessageCircle, ArrowRight, Zap,
} from "lucide-react";
import { siteConfig, zenvora } from "@/lib/data";

export const metadata: Metadata = {
  title: "Zenvora — Africa's First AI-Powered ERP",
  description:
    "Zenvora is an AI-powered ERP for African SMEs — accounting, invoicing, HR, CRM, casino suite and partner console, with USD/ZWG dual currency, ZIMRA compliance, EcoCash and an AI Copilot.",
};

const moduleIcons = { Calculator, FileText, Users, Handshake, Dice5, Network } as const;
const diffIcons = { Coins, ShieldCheck, Smartphone, Sparkles } as const;

export default function ZenvoraPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Sparkles className="w-3.5 h-3.5" /> ZENVORA ERP
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Africa&apos;s First <span className="text-gradient-gold">AI-Powered ERP</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Built for African SMEs. USD/ZWG dual currency, ZIMRA compliance, EcoCash payments,
            and an AI Copilot across every module.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={zenvora.demoUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow text-sm uppercase tracking-wider">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 border border-border2 text-white/70 hover:text-white hover:border-gold/30 rounded-xl transition-all text-sm font-medium">
              <MessageCircle className="w-4 h-4" /> Talk to Us
            </a>
          </div>
        </div>
      </section>

      {/* What is Zenvora */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">WHAT IS ZENVORA</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">One system. Your whole business.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{zenvora.intro}</p>
        </div>
      </section>

      {/* Key Modules */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">KEY MODULES</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Everything you need, built in</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zenvora.modules.map((m) => {
              const Icon = moduleIcons[m.icon as keyof typeof moduleIcons];
              return (
                <div key={m.title} className="bg-card border border-border rounded-2xl p-8 hover:border-gold/40 transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{m.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">BUILT FOR ZIMBABWE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Why Zenvora is different</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {zenvora.differentiators.map((d) => {
              const Icon = diffIcons[d.icon as keyof typeof diffIcons];
              return (
                <div key={d.title} className="flex items-start gap-5 bg-card border border-border rounded-2xl p-7 hover:border-gold/30 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1.5">{d.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">PRICING</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Plans that scale with you</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {zenvora.pricing.map((p) => (
              <div key={p.name} className={`relative bg-card border rounded-3xl p-8 flex flex-col transition-all hover:-translate-y-1 ${p.highlight ? "border-gold shadow-lg shadow-gold/10 md:scale-105" : "border-border hover:border-gold/40"}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 bg-gold text-[#07070D] text-xs font-bold rounded-full">
                    <Zap className="w-3 h-3" /> MOST POPULAR
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-4xl font-bold text-gold">{p.price}</span>
                  <span className="text-muted-foreground text-sm">/ {p.period.replace("per ", "")}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${p.highlight ? "bg-gold text-[#07070D] font-bold hover:bg-gold-light gold-glow-sm" : "border border-gold/30 text-gold hover:bg-gold/10"}`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[#0D0D1A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">See Zenvora in action</h2>
          <p className="text-white/50 text-lg mb-10">Try the live demo or message us for a guided walkthrough tailored to your business.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={zenvora.demoUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow text-sm uppercase tracking-wider">
              <ExternalLink className="w-4 h-4" /> Launch Demo
            </a>
            <Link href="/contact"
              className="flex items-center gap-2 px-7 py-4 border border-border2 text-white/70 hover:text-white hover:border-gold/30 rounded-xl transition-all text-sm font-medium">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
