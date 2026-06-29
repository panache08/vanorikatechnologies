import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import { Download, ShieldAlert, FileWarning, Server, Mail, Lock, Eye, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/research/zimbabwe-web-security-2026" },
  title: "The State of Zimbabwe Web Security 2026",
  description:
    "A data-driven report from Vanorika Technologies based on passive security assessments of Harare businesses across hospitality, healthcare, law, education and NGOs — what we found, and what it means.",
};

/* ─────────────────────────────────────────────────────────────────
   EDIT THESE to match your real anonymised assessment data before
   promoting the report. Numbers below are representative placeholders.
   ───────────────────────────────────────────────────────────────── */
const headline = {
  assessed: "17",
  sectors: "5",
  withIssue: "94%",
  avgFindings: "4",
};

const findings = [
  { icon: ShieldAlert, label: "Missing one or more critical security headers", pct: 88 },
  { icon: FileWarning, label: "No privacy policy (Data Protection Act 2021 gap)", pct: 71 },
  { icon: Server, label: "Running outdated software / CMS / plugins", pct: 65 },
  { icon: Lock, label: "No HTTP→HTTPS redirect or weak TLS configuration", pct: 47 },
  { icon: Mail, label: "No SPF/DMARC — email can be spoofed from their domain", pct: 41 },
  { icon: Eye, label: "Exposed admin panel or sensitive endpoint", pct: 24 },
];

const sectors = ["Hospitality", "Healthcare", "Law firms", "Schools", "NGOs"];
/* ───────────────────────────────────────────────────────────────── */

export default function ReportPage() {
  return (
    <main>
      <Navbar />

      <section className="relative pt-40 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">SECURITY RESEARCH · 2026</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The State of <span className="text-gradient-gold">Zimbabwe Web Security</span> 2026
          </h1>
          <p className="text-white/60 text-lg mb-8">
            What we found assessing {headline.assessed} Harare businesses across {headline.sectors} sectors — and what every
            Zimbabwean business owner should take from it.
          </p>
          <a href="/research/zimbabwe-web-security-2026.pdf" download
            className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow text-sm uppercase tracking-wider">
            <Download className="w-4 h-4" /> Download the PDF
          </a>
        </div>
      </section>

      {/* Headline stats */}
      <section className="py-20 bg-[#0D0D1A] border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { v: headline.assessed, l: "Businesses assessed" },
            { v: headline.sectors, l: "Sectors covered" },
            { v: headline.withIssue, l: "Had a fixable vulnerability" },
            { v: headline.avgFindings, l: "Avg findings per business" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display font-black text-4xl md:text-5xl text-gradient mb-1">{s.v}</p>
              <p className="text-white/50 text-sm">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <article className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed
          [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-[15px] [&_strong]:text-foreground">
          <p className="text-foreground/90 text-lg font-light">
            Over the past months we ran <strong>passive, no-touch security assessments</strong> of {headline.assessed} businesses
            across Harare — hospitality, healthcare, legal, education and the NGO sector. We never logged in, scanned ports, or
            touched a live system. Everything below comes from publicly available information any attacker could see. The picture
            is consistent, and it&apos;s fixable.
          </p>

          <h2>What we found</h2>
          <p>The most common issues, by share of the businesses assessed:</p>

          <div className="not-prose space-y-4 my-8">
            {findings.map((f) => (
              <div key={f.label} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <f.icon className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-foreground text-sm font-medium flex-1">{f.label}</span>
                  <span className="font-display text-gold font-bold text-sm">{f.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-background overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light" style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <h2>Sectors we looked at</h2>
          <div className="not-prose flex flex-wrap gap-2 my-4">
            {sectors.map((s) => (
              <span key={s} className="px-4 py-2 bg-card border border-border rounded-full text-foreground text-sm">{s}</span>
            ))}
          </div>

          <h2>What it means</h2>
          <p>
            None of these are exotic, nation-state problems. They&apos;re the basics — security headers, software updates, a privacy
            policy, email anti-spoofing — and the overwhelming majority of the businesses we assessed were missing at least one.
            Each is cheap to fix once you know it&apos;s there, and each is something a motivated attacker (or an automated bot) finds
            in minutes.
          </p>
          <p>
            The privacy-policy gap matters twice over: it&apos;s a Data Protection Act (2021) compliance exposure as well as a trust
            signal. And the email anti-spoofing gap means a stranger can send mail that looks like it came from these businesses —
            a direct phishing risk to their own customers.
          </p>

          <h2>What to do about it</h2>
          <ul className="list-disc pl-5 space-y-2 text-[15px]">
            <li>Add the core security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options).</li>
            <li>Update your CMS, plugins, and server software — and keep them updated.</li>
            <li>Publish a privacy policy and make sure HTTP redirects to HTTPS.</li>
            <li>Set SPF and DMARC records so no one can spoof email from your domain.</li>
            <li>Get a passive assessment so you know exactly where you stand — it&apos;s free.</li>
          </ul>

          <p className="text-xs text-muted-foreground/60 pt-6 border-t border-border">
            Methodology: passive assessment only — public DNS, certificate transparency, HTTP response headers, and open-source
            reconnaissance. No authentication, port scanning, or exploitation. Figures are aggregated and anonymised; no individual
            business is identified.
          </p>
        </div>
      </article>

      {/* CTA */}
      <section className="relative py-20 bg-[#0D0D1A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Where does your business stand?</h2>
          <p className="text-white/50 text-lg mb-8">Get a free passive assessment of your own site — no obligation, no cost.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow text-sm uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" /> Request Free Assessment
            </a>
            <Link href="/tools/security-check"
              className="inline-flex items-center gap-2 px-7 py-4 border border-border2 text-white/70 hover:text-white hover:border-gold/30 rounded-xl transition-all text-sm font-medium">
              Run a free check now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
