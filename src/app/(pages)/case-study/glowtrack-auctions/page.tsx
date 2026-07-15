import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, CheckCircle, Clock, ArrowLeft, AlertTriangle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/case-study/glowtrack-auctions" },
  title: "Case Study: GlowTrack Auctions Security Audit",
  description: "How Vanorika Technologies found 6 vulnerabilities in a Harare auction platform in under 24 hours, including one exposing live customer data.",
};

const findings = [
  {
    severity: "Critical",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    title: "Unauthenticated API endpoint exposing customer records",
    detail: "A REST endpoint returning bidder names, email addresses, and phone numbers required no authentication. Any visitor who knew the URL, or guessed it, could download the full customer list.",
  },
  {
    severity: "High",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    title: "SQL injection in the auction search function",
    detail: "User input passed directly to a database query without sanitisation. An attacker could extract, modify, or delete database records, including bid history and user accounts.",
  },
  {
    severity: "High",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    title: "No rate limiting on the login page",
    detail: "The login form had no brute-force protection. An attacker could run unlimited password attempts against any account with no lockout or delay.",
  },
  {
    severity: "Medium",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Reflected cross-site scripting (XSS) in lot descriptions",
    detail: "HTML was rendered unescaped in the lot listing page. A malicious seller could inject scripts that run in the browser of every visitor who views that lot.",
  },
  {
    severity: "Medium",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Outdated dependencies with known CVEs",
    detail: "Three third-party packages had publicly disclosed security vulnerabilities. One had a patch available for over 18 months. These are the first things automated scanners look for.",
  },
  {
    severity: "Low",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "Verbose error messages revealing server internals",
    detail: "Stack traces and database error messages were displayed to end users on certain error conditions. This leaked the server framework, database type, and file paths to anyone who triggered an error.",
  },
];

const timeline = [
  { day: "Day 1", label: "Authorisation signed, scan begins", done: true },
  { day: "Day 1", label: "Critical API vulnerability identified and reported immediately", done: true },
  { day: "Day 1", label: "All 6 findings documented by end of day", done: true },
  { day: "Day 2", label: "Written report delivered with fixes ranked by priority", done: true },
  { day: "Days 3 to 5", label: "Critical and high findings patched by client developer", done: true },
  { day: "Day 7", label: "Verification retest: all 6 issues confirmed resolved", done: true },
];

export default function CaseStudyPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-white/40 hover:text-cyan text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">CASE STUDY</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            GlowTrack Auctions:<br />
            <span className="text-gradient">6 Vulnerabilities Found in 24 Hours</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            A Harare-based auction platform asked us to check their website before going live to the public. We found a critical vulnerability exposing customer data on day one.
          </p>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { value: "6", label: "Vulnerabilities found" },
              { value: "<24h", label: "Time to first report" },
              { value: "7 days", label: "All issues resolved" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-electric">{s.value}</p>
                <p className="text-white/40 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Background */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">The Situation</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                GlowTrack Auctions runs online and in-person auctions for buyers and sellers across Harare. Before opening their platform to the public, they wanted an independent check of their website security.
              </p>
              <p>
                They had a developer who built the site but had no security background. The platform handled user registration, live bidding, and payment coordination, all of which required storing personal customer data.
              </p>
              <p>
                They contacted Vanorika Technologies for a website security audit. We signed a written authorisation agreement and started work the same day.
              </p>
            </div>
          </div>

          {/* Findings */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">What We Found</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Six vulnerabilities across the platform, ranging from critical to low severity. The most serious was found and reported within the first few hours of testing.
            </p>

            <div className="space-y-4">
              {findings.map((f, i) => (
                <div key={i} className={`border ${f.border} rounded-2xl p-6 ${f.bg}`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 ${f.color} shrink-0 mt-0.5`} />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${f.color}`}>{f.severity}</span>
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">The Report</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Every finding was written up in plain English, not just a list of CVE numbers. Each issue included what it was, what an attacker could do with it, and exactly what needed to change to fix it.
              </p>
              <p>
                Findings were ranked by priority so the developer knew what to fix first. The critical API issue was flagged verbally on day one (before the written report was even complete), so work could start immediately.
              </p>
              <p>
                The client's developer handled the patches. We did a verification retest on day seven to confirm all six issues were resolved before the platform went live.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Timeline</h2>
            <div className="space-y-3">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-electric" />
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-electric uppercase tracking-wider">{t.day}</span>
                    <p className="text-muted-foreground text-sm mt-0.5">{t.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div className="bg-card border border-electric/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-electric" />
              <h2 className="font-display text-xl font-bold text-foreground">Outcome</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              GlowTrack Auctions launched with all six vulnerabilities resolved. The platform that went live was materially more secure than the one we tested, with no customer data exposed and no trivially exploitable entry points.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Had the platform gone live with the critical API vulnerability in place, any visitor could have downloaded their full customer database. It would likely have gone unnoticed until something went wrong.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">Want to know what we&apos;d find on your website?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-electric text-[#07070D] font-bold rounded-2xl hover:bg-electric-light transition-all gold-glow-sm">
              Request a Free Security Check <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
