import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import Link from "next/link";
import { Target, Search, CheckCircle2, ArrowRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies" },
  title: "Case Studies",
  description:
    "Real Vanorika Technologies engagements — GlowTrack Auctions, Pearlsard Travel, and Beauty by Nyasha. The challenge, what we found, and the outcome.",
};

const caseStudies = [
  {
    name: "GlowTrack Auctions",
    type: "Web Application Security Audit",
    color: "from-red-600 to-orange-500",
    challenge: "A Harare auction platform needed assurance its web application was safe before going public.",
    found: "6 vulnerabilities — including a critical unauthenticated API endpoint that allowed an authentication bypass.",
    outcome: "Critical auth bypass patched before public launch; full remediation report delivered.",
    href: "/case-study/glowtrack-auctions",
  },
  {
    name: "Pearlsard Travel Services",
    type: "Passive Security Assessment",
    color: "from-blue-600 to-cyan-500",
    challenge: "Two websites for a travel agency, with an Instagram bio link silently sending followers to a dead page.",
    found: "10 vulnerabilities across both domains — including a live server error and a missing privacy policy.",
    outcome: "Full remediation roadmap delivered as a branded PDF report, restoring the broken lead path.",
    href: null,
  },
  {
    name: "Beauty by Nyasha",
    type: "Web Development + Security Audit",
    color: "from-pink-500 to-rose-500",
    challenge: "A new luxury salon site needed a security review before launch — booking, payments and customer data all live.",
    found: "8 vulnerabilities across the application and its Supabase backend.",
    outcome: "All findings resolved; site rated 7.5/10 and launched clean.",
    href: "https://beauty-by-nyasha.vercel.app",
  },
];

export default function CaseStudiesPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">CASE STUDIES</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Real Engagements</h1>
          <p className="text-white/60 text-lg mb-7">The challenge, what we found, and what changed as a result.</p>
          <a href="/sample-pentest-report.pdf" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all text-sm font-semibold">
            <FileText className="w-4 h-4" /> See a sample report (PDF)
          </a>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {caseStudies.map((cs) => (
            <div key={cs.name} className="bg-card border border-border rounded-3xl p-8 md:p-10 hover:border-gold/30 transition-all">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${cs.color}`}>{cs.type}</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">{cs.name}</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: Target, label: "Challenge", text: cs.challenge },
                  { icon: Search, label: "What We Found", text: cs.found },
                  { icon: CheckCircle2, label: "Outcome", text: cs.outcome },
                ].map((b) => (
                  <div key={b.label}>
                    <div className="flex items-center gap-2 mb-2">
                      <b.icon className="w-4 h-4 text-gold" />
                      <p className="font-mono text-[10px] font-semibold text-gold/70 uppercase tracking-[0.18em]">{b.label}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </div>
              {cs.href && (
                <div className="mt-8 pt-6 border-t border-border">
                  {cs.href.startsWith("http") ? (
                    <a href={cs.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gold text-sm font-medium hover:gap-2.5 transition-all">
                      Visit live site <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link href={cs.href} className="inline-flex items-center gap-1.5 text-gold text-sm font-medium hover:gap-2.5 transition-all">
                      Read the full case study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
