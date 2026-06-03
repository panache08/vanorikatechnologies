import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, X, Zap } from "lucide-react";
import { pricingPlans, faqs } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
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
          <p className="text-white/60 text-lg">No hidden fees. No surprises. Just great technology at fair prices.</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <div key={plan.id} className={`relative bg-card border rounded-3xl p-8 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${
                plan.popular ? "border-electric shadow-blue-500/20 shadow-lg scale-105" : "border-border hover:border-electric/40"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 bg-electric text-white text-xs font-bold rounded-full">
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
                    plan.popular ? "bg-electric text-white hover:bg-electric-dark blue-glow" : "border border-electric/30 text-electric hover:bg-electric/10"}`}>
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
