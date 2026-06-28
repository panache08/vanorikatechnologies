import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, X, Zap } from "lucide-react";
import { pricingPlans, faqs } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing",
  description: "Transparent pricing for web development, software, and tech solutions. Starter, Business, Professional, and Enterprise packages available.",
};

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">TRANSPARENT PRICING</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Simple, Clear Pricing</h1>
          <p className="text-white/60 text-lg">Fixed prices. You know the cost before we start.</p>
        </div>
      </section>

      {/* Cybersecurity Pricing */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">CYBERSECURITY</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Security Assessments</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free Security Check",
                price: "$0",
                desc: "Basic external scan of your website. Delivered as a short report via WhatsApp. No obligation.",
                cta: "Request Free Check",
                href: "/contact",
                highlight: false,
              },
              {
                name: "Website Security Audit",
                price: "from $150",
                desc: "Full vulnerability assessment of your website. Written report with fixes ranked by priority.",
                cta: "Get a Quote",
                href: "/contact",
                highlight: true,
              },
              {
                name: "Full Penetration Test",
                price: "from $400",
                desc: "Comprehensive test of your systems, network and website. Formal report suitable for compliance or board review.",
                cta: "Get a Quote",
                href: "/contact",
                highlight: false,
              },
            ].map((p) => (
              <div key={p.name} className={`relative bg-card border rounded-3xl p-8 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${p.highlight ? "border-electric shadow-blue-500/20 shadow-lg" : "border-border hover:border-electric/40"}`}>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.name}</h3>
                <p className="font-display text-3xl font-bold text-electric mb-4">{p.price}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">{p.desc}</p>
                <a href={p.href} className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${p.highlight ? "bg-electric text-[#07070D] font-bold hover:bg-electric-light gold-glow-sm" : "border border-electric/30 text-electric hover:bg-electric/10"}`}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">WEB & SOFTWARE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Website Packages</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className={`relative bg-card border rounded-3xl p-8 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${
                plan.popular ? "border-electric shadow-blue-500/20 shadow-lg scale-105" : "border-border hover:border-electric/40"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 bg-electric text-[#07070D] text-xs font-bold rounded-full">
                    <Zap className="w-3 h-3" /> MOST POPULAR
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-xs mb-6">{plan.description}</p>
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <p className="font-display text-3xl font-bold text-foreground">Custom</p>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-muted-foreground text-sm">USD</span>
                      <span className="font-display text-4xl font-bold text-foreground">${plan.price}</span>
                    </div>
                  )}
                  <p className="text-muted-foreground text-xs mt-1">{plan.period}</p>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground/40">
                      <X className="w-4 h-4 shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular ? "bg-electric text-[#07070D] font-bold hover:bg-electric-light gold-glow-sm" : "border border-electric/30 text-electric hover:bg-electric/10"}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-8">
            All prices in USD. Payment plans available. Contact us for a custom quote.
          </p>
        </div>
      </section>

      {/* Open Rate Card */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">OPEN PRICING</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">No Hidden Numbers</h2>
            <p className="text-muted-foreground text-sm mt-3">Honest starting points so you can budget before you even message us.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                heading: "Cybersecurity",
                rows: [
                  { service: "Passive Security Assessment", price: "Free" },
                  { service: "Website Security Audit", price: "From $150" },
                  { service: "Full Penetration Test", price: "From $400" },
                ],
              },
              {
                heading: "Software",
                rows: [
                  { service: "Website — Starter", price: "From $299", note: "5-page business site" },
                  { service: "Website — Business", price: "From $799", note: "CMS + e-commerce" },
                  { service: "Custom Software", price: "From $500", note: "Web apps & systems" },
                  { service: "Mobile App", price: "From $800", note: "Android / cross-platform" },
                  { service: "Zenvora ERP — SME", price: "$49 / month", note: "Accounting, invoicing & CRM" },
                  { service: "Zenvora Casino Suite", price: "$200 / month", note: "Gaming ERP + compliance" },
                ],
              },
            ].map((group) => (
              <div key={group.heading}>
                <h3 className="font-mono text-[10px] font-semibold text-gold/70 mb-4 uppercase tracking-[0.2em]">{group.heading}</h3>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  {group.rows.map((row, i) => (
                    <div key={row.service}
                      className={`flex items-center justify-between gap-4 px-6 py-4 ${i !== 0 ? "border-t border-border" : ""} hover:bg-gold/5 transition-colors`}>
                      <span className="min-w-0">
                        <span className="block text-foreground text-sm font-medium">{row.service}</span>
                        {"note" in row && row.note && <span className="block text-muted-foreground/70 text-xs mt-0.5">{row.note}</span>}
                      </span>
                      <span className="font-display text-gold font-bold text-sm whitespace-nowrap shrink-0">{row.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-xs mt-8">
            Prices are starting points in USD. Final quotes depend on scope — message us for an exact figure.
          </p>
        </div>
      </section>

      {/* What drives pentest pricing + Payment */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* Pentest scope factors */}
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">PENTEST SCOPE</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">What drives the price</h2>
            <p className="text-muted-foreground text-sm mb-6">A full penetration test starts at $400. The final figure depends on:</p>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {[
                { factor: "Number of domains / apps", effect: "More targets, more time" },
                { factor: "External vs internal", effect: "Internal needs network access" },
                { factor: "Authenticated testing", effect: "Testing logged-in roles" },
                { factor: "Report type", effect: "Standard vs board / compliance-ready" },
                { factor: "Retest included", effect: "Verifying your fixes afterwards" },
              ].map((r, i) => (
                <div key={r.factor} className={`flex items-start justify-between gap-4 px-5 py-3.5 ${i !== 0 ? "border-t border-border" : ""}`}>
                  <span className="text-foreground text-sm font-medium">{r.factor}</span>
                  <span className="text-muted-foreground text-xs text-right max-w-[55%]">{r.effect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment methods */}
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">PAYMENT</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">How you pay</h2>
            <p className="text-muted-foreground text-sm mb-6">We keep it simple and flexible for Zimbabwean businesses:</p>
            <div className="grid grid-cols-2 gap-3">
              {["EcoCash", "InnBucks", "USD cash", "Bank transfer (USD)", "International (Wise / card)", "Milestone payment plans"].map((m) => (
                <div key={m} className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-foreground text-sm">{m}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-xs mt-5">
              Typically 50% to start and 50% on completion. Larger projects can be split across milestones.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="FAQ" title="Frequently Asked" titleGradient="Questions" />
          <div className="mt-12 space-y-3">
            {faqs.slice(0, 10).map((faq) => (
              <details key={faq.q} className="group bg-card border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-foreground text-sm list-none">
                  {faq.q}
                  <span className="text-electric text-xl group-open:rotate-45 transition-transform shrink-0 ml-4">+</span>
                </summary>
                <div className="px-6 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
