import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  alternates: { canonical: "/cybersecurity-zimbabwe" },
  title: "Cybersecurity for Zimbabwe Businesses: The Complete Guide",
  description:
    "Everything a Zimbabwean business needs to know about cybersecurity: website security, penetration testing, the Data Protection Act, breach response, and free tools. A practical guide from Vanorika Technologies, Harare.",
};

const sections = [
  {
    heading: "1. Securing your website",
    body: "Most Harare business websites have fixable vulnerabilities the owner never sees: missing security headers, weak password resets, outdated software. This is where most real-world attacks start.",
    links: [
      { label: "Is your website actually secure in 2026?", href: "/blog/zimbabwe-website-security-2026" },
      { label: "Run a free security check", href: "/tools/security-check" },
      { label: "Check your security headers", href: "/tools/headers" },
    ],
  },
  {
    heading: "2. Penetration testing",
    body: "A penetration test is hiring someone to break into your systems (with permission) so you find the holes before a criminal does. Here's what it involves and what it costs locally.",
    links: [
      { label: "What is penetration testing?", href: "/blog/what-is-penetration-testing-zimbabwe" },
      { label: "How much does a pentest cost in Zimbabwe?", href: "/blog/how-much-penetration-test-cost-zimbabwe" },
      { label: "Our penetration testing service", href: "/penetration-testing" },
    ],
  },
  {
    heading: "3. The Data Protection Act",
    body: "Zimbabwe's Data Protection Act is in force and the regulator is active. Almost every business collects customer data, and if you do, you have obligations. Getting compliant is mostly practical housekeeping.",
    links: [
      { label: "The Data Protection Act 2021 explained", href: "/blog/zimbabwe-data-protection-act-2021" },
      { label: "DPA compliance checklist", href: "/blog/data-protection-act-compliance-checklist-zimbabwe" },
    ],
  },
  {
    heading: "4. When things go wrong",
    body: "If you discover you've been hacked, the first hour matters more than the panic. A calm, ordered response limits the damage and keeps you on the right side of the law.",
    links: [
      { label: "Your website just got hacked: what to do", href: "/blog/website-hacked-what-to-do-zimbabwe" },
    ],
  },
  {
    heading: "5. Email & domain security",
    body: "Attackers don't only target your website. They impersonate your email and register lookalike domains to phish your customers. SPF, DMARC, and domain monitoring close those gaps.",
    links: [
      { label: "Check your email security (SPF/DMARC)", href: "/tools/email-security" },
      { label: "Find lookalike domains impersonating you", href: "/tools/lookalike" },
      { label: ".co.zw or .com for your business?", href: "/blog/co-zw-vs-com-zimbabwe-business" },
    ],
  },
];

export default function CybersecurityGuidePage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-28 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs className="mb-8" items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: "Cybersecurity Guide", path: "/cybersecurity-zimbabwe" }]} />
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
              <ShieldCheck className="w-3.5 h-3.5" /> COMPLETE GUIDE
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Cybersecurity for Zimbabwe Businesses</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              A practical, jargon-free guide to protecting your business online, from securing your website to meeting the Data Protection Act. Everything in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">{s.heading}</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">{s.body}</p>
              <div className="space-y-2">
                {s.links.map((l) => (
                  <Link key={l.href} href={l.href}
                    className="flex items-center justify-between gap-3 bg-card border border-border rounded-xl px-5 py-3.5 hover:border-gold/40 transition-all group">
                    <span className="text-foreground text-sm font-medium group-hover:text-gold transition-colors">{l.label}</span>
                    <ArrowRight className="w-4 h-4 text-gold shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
