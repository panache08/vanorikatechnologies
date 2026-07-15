import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Dice5, ShieldCheck, Coins, Smartphone, FileCheck, Lock,
  AlertTriangle, Scale, TrendingDown, MessageCircle, ArrowRight, ExternalLink,
} from "lucide-react";
import { siteConfig, zenvora } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/casino" },
  title: "Casino Technology & Security | Vanorika",
  description:
    "The only technology partner built for Zimbabwe's casino industry: Zenvora Casino Suite with ZIMRA gaming-levy automation, plus casino security audits and penetration testing.",
};

const suiteFeatures = [
  { icon: FileCheck, text: "ZIMRA gaming-levy automation" },
  { icon: Dice5, text: "Floor, cashier & player tracking ERP" },
  { icon: Coins, text: "USD / ZWG dual currency" },
  { icon: Smartphone, text: "EcoCash & bank reconciliation" },
];

const auditFeatures = [
  { icon: Lock, text: "Penetration testing of systems & network" },
  { icon: ShieldCheck, text: "Vulnerability assessments" },
  { icon: Scale, text: "Compliance & data-protection review" },
  { icon: FileCheck, text: "Board-ready written reports" },
];

export default function CasinoPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Dice5 className="w-3.5 h-3.5" /> CASINO &amp; GAMING
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            The Only Technology Partner Built for <span className="text-gradient-gold">Zimbabwe&apos;s Casino Industry</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Gaming-levy compliance, dual-currency operations, and security testing, from a CompTIA PenTest+ certified
            partner who understands ZIMRA and the Data Protection Act.
          </p>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow text-sm uppercase tracking-wider">
            <MessageCircle className="w-4 h-4" /> Talk to Us Directly
          </a>
        </div>
      </section>

      {/* Two offerings */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Zenvora Casino Suite */}
            <div className="bg-card border border-gold/20 rounded-3xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                <Dice5 className="w-6 h-6 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Zenvora Casino Suite</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                A full ERP built for gaming venues, running your floor, cashier and compliance in one system, with ZIMRA
                gaming-levy automation handled for you.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {suiteFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <f.icon className="w-4 h-4 text-gold shrink-0" /> {f.text}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/zenvora" className="flex-1 text-center py-3 rounded-xl font-semibold text-sm border border-gold/30 text-gold hover:bg-gold/10 transition-all">
                  Explore Zenvora
                </Link>
                <a href={zenvora.demoUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gold text-[#07070D] hover:bg-gold-light transition-all gold-glow-sm">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>
            </div>

            {/* Casino Security Audits */}
            <div className="bg-card border border-border rounded-3xl p-8 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Casino Security Audits</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Cash-heavy, compliance-bound and heavily targeted, casinos need real testing. We probe your systems the way
                an attacker would and hand you a fix-it roadmap.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {auditFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <f.icon className="w-4 h-4 text-gold shrink-0" /> {f.text}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gold text-[#07070D] hover:bg-gold-light transition-all gold-glow-sm">
                Book a Security Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">WHY IT MATTERS</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">The stakes are higher in gaming</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Scale, title: "ZIMRA Compliance Risk", desc: "Gaming-levy and tax obligations are strict. Manual reconciliation invites costly errors and penalties." },
              { icon: ShieldCheck, title: "Data Protection Duty", desc: "You hold player identities and payment data, so the Data Protection Act (2021) applies in full." },
              { icon: TrendingDown, title: "Reputational Risk", desc: "A breach or a public compliance failure in gaming travels fast and erodes player trust overnight." },
            ].map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-2xl p-7">
                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <c.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target operators / CTA */}
      <section className="relative py-24 bg-[#0D0D1A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-10 h-10 text-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">For licensed operators</h2>
          <p className="text-white/50 text-lg mb-3">
            Built for venues like Rainbow Towers, Carribea Bay Resort, and other licensed casinos and gaming operators
            across Zimbabwe.
          </p>
          <p className="text-white/30 text-sm mb-10">Direct line to Donovan. No account managers, no middlemen.</p>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow text-sm uppercase tracking-wider">
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
