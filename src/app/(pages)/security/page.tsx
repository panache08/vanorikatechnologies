import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { ShieldCheck, CheckCircle, XCircle, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/security" },
  title: "Responsible Disclosure Policy",
  description:
    "Vanorika Technologies' responsible disclosure / vulnerability disclosure policy — how to safely report a security issue in our systems.",
};

export default function SecurityPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> SECURITY
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Responsible Disclosure Policy</h1>
          <p className="text-white/60 text-lg">We&apos;re a security company — we hold ourselves to the standard we set for clients.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed
          [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3
          [&_p]:text-sm [&_li]:text-sm [&_a]:text-gold [&_a]:underline [&_strong]:text-foreground">
          <p>
            If you believe you&apos;ve found a security vulnerability in any Vanorika Technologies system or website
            ({siteConfig.website}), we want to hear from you. We welcome reports from security researchers and will work
            with you to understand and resolve the issue quickly.
          </p>

          <h2>How to report</h2>
          <p>Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or message us on{" "}
            <a href={`https://wa.me/${siteConfig.whatsapp}`}>WhatsApp</a>. Please include:</p>
          <ul className="space-y-2 list-disc pl-5">
            <li>A clear description of the issue and where you found it</li>
            <li>Steps to reproduce it (proof-of-concept where possible)</li>
            <li>The potential impact, as you see it</li>
          </ul>
          <p>Our machine-readable contact details are published at{" "}
            <a href="/.well-known/security.txt">/.well-known/security.txt</a>.</p>

          <h2>What we ask of you</h2>
          <div className="grid sm:grid-cols-2 gap-4 not-prose">
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="font-semibold text-green-500 text-sm mb-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Please do</p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                <li>Report issues as soon as you find them</li>
                <li>Give us reasonable time to fix before disclosing publicly</li>
                <li>Only test against your own accounts / data</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <p className="font-semibold text-red-500 text-sm mb-3 flex items-center gap-2"><XCircle className="w-4 h-4" /> Please don&apos;t</p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                <li>Access, modify, or delete other people&apos;s data</li>
                <li>Run DoS / DDoS or destructive tests</li>
                <li>Use social engineering or physical attacks</li>
              </ul>
            </div>
          </div>

          <h2>Our commitment</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>We&apos;ll acknowledge your report and keep you updated as we investigate.</li>
            <li>We won&apos;t pursue legal action against researchers who act in good faith under this policy.</li>
            <li>We&apos;re happy to credit you for a valid finding if you&apos;d like.</li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-4 not-prose">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm">
              <Mail className="w-4 h-4" /> Report by email
            </a>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all text-sm font-semibold">
              <MessageCircle className="w-4 h-4" /> Report on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
