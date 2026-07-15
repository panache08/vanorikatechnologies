import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import ReportRunner from "@/components/sections/report-runner";
import type { Metadata } from "next";
import { FileText, Zap, ShieldCheck } from "lucide-react";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/report" },
  title: "Free Website Security Report: Instant Branded PDF",
  description:
    "Scan your website and get a free 5-page security report as a branded PDF covering SSL, security headers, email spoofing (SPF/DMARC), and Data Protection Act 2021 exposure, with plain-English fixes.",
  openGraph: {
    title: "Free Website Security Report",
    description: "Scan your site and get a complete 5-page security report, free, as a branded PDF.",
    url: `${SITE_URL}/report`,
    type: "website",
  },
};

export default function ReportPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-gold border border-gold/30 rounded-full bg-gold/5 mb-6">
            <FileText className="w-3.5 h-3.5" /> FREE SECURITY REPORT
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Get a complete security report on your website, free
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Enter your site and we&apos;ll check it the way an attacker first would. You&apos;ll see your grade instantly, and
            get the full 5-page breakdown as a branded PDF.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/45 text-sm">
            <span className="inline-flex items-center gap-2"><Zap className="w-4 h-4 text-gold" /> Results in seconds</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gold" /> Passive & non-intrusive</span>
            <span className="inline-flex items-center gap-2"><FileText className="w-4 h-4 text-gold" /> Branded PDF report</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReportRunner />
        </div>
      </section>

      <section className="pb-8 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              { n: "1", t: "Scan", d: "Enter your domain. We run passive checks: SSL, headers, email spoofing, DPA 2021." },
              { n: "2", t: "See your grade", d: "Get your score and top findings on screen, instantly." },
              { n: "3", t: "Get the PDF", d: "Download the full 5-page branded report and book a free consult." },
            ].map((s) => (
              <div key={s.n} className="bg-card border border-border rounded-2xl p-5">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 text-gold font-display font-bold flex items-center justify-center mx-auto mb-3">{s.n}</div>
                <p className="font-display font-bold text-foreground mb-1">{s.t}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
