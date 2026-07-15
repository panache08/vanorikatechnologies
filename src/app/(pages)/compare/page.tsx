import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import CompareRunner from "@/components/sections/compare-runner";
import type { Metadata } from "next";
import { Swords, Zap, ShieldCheck } from "lucide-react";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "You vs Them: Compare Your Website Security to a Competitor",
  description:
    "Scan your website and a competitor's side by side. See who's more secure on SSL, security headers, email spoofing and Data Protection Act 2021 exposure, graded A to F, instantly and free.",
  openGraph: {
    title: "You vs Them: Website Security Showdown",
    description: "Compare your site's security against a competitor, graded A to F. Free and instant.",
    url: `${SITE_URL}/compare`,
    type: "website",
  },
};

export default function ComparePage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-gold border border-gold/30 rounded-full bg-gold/5 mb-6">
            <Swords className="w-3.5 h-3.5" /> SECURITY SHOWDOWN
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            How does your website stack up against the competition?
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Put your site head-to-head with a competitor. We grade both on the security basics that customers and attackers
            both notice, and show you exactly where you win and where you fall behind.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/45 text-sm">
            <span className="inline-flex items-center gap-2"><Zap className="w-4 h-4 text-gold" /> Instant side-by-side</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gold" /> Passive & fair</span>
            <span className="inline-flex items-center gap-2"><Swords className="w-4 h-4 text-gold" /> Shareable result</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompareRunner />
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
