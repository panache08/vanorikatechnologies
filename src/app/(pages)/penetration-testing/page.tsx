import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ScanSearch, FileText, Network, UserX, Radio, ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/lib/data";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ServiceJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/penetration-testing" },
  title: "Penetration Testing in Zimbabwe",
  description:
    "Professional penetration testing for Zimbabwe businesses: manual, CompTIA PenTest+ certified testing of your website, app, and network, with a plain-English report. From $400. Free passive scan available.",
};

const tests = [
  { icon: ScanSearch, title: "Web Application Testing", desc: "We test your website or web app the way an attacker would: auth bypasses, injection, broken access control, and the OWASP Top 10." },
  { icon: Network, title: "Network & Infrastructure", desc: "External and internal network testing that covers exposed services, misconfigurations, and weak points in your perimeter." },
  { icon: UserX, title: "Vulnerability Assessment", desc: "A structured scan-and-review of your public-facing systems, with every finding ranked by real business risk." },
  { icon: Radio, title: "Phishing Simulation", desc: "A controlled phishing campaign that shows how your team responds, and where security awareness training is needed." },
  { icon: FileText, title: "Written Remediation Report", desc: "An executive summary plus every finding rated by severity, with proof and clear, developer-ready fix instructions." },
  { icon: ShieldCheck, title: "Retest & Verification", desc: "After you fix the findings, we retest to confirm the holes are actually closed, not just reported." },
];

export default function PenetrationTestingPage() {
  return (
    <main>
      <ServiceJsonLd
        name="Penetration Testing in Zimbabwe"
        description="Manual, CompTIA PenTest+ certified penetration testing of websites, apps, and networks for Zimbabwean businesses, with a plain-English remediation report."
        path="/penetration-testing"
        price="from $400"
      />
      <Navbar />
      <section className="relative pt-28 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs className="mb-8 text-left" items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Penetration Testing", path: "/penetration-testing" }]} />
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> CYBERSECURITY
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Penetration Testing in Zimbabwe</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We find what attackers would find, before they do. Manual, CompTIA PenTest+ certified testing for Zimbabwean businesses,
            with a report you can actually act on.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools/security-check" className="inline-flex items-center gap-2 px-6 py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm uppercase tracking-wider">
              Free Security Check
            </Link>
          </div>
        </div>
      </section>

      {/* What we test */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">What we test</h2>
            <p className="text-muted-foreground mt-3">A real human tester, not just an automated scan with a logo on it.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((t) => (
              <div key={t.title} className="bg-card border border-border rounded-2xl p-7 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <t.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{t.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get + pricing */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">A report you can act on</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              You finish reading our report knowing exactly what&apos;s wrong, how serious each issue is, and what it takes to fix it.
              No jargon, no fluff. It includes:
            </p>
            <ul className="space-y-3">
              {["Executive summary for decision-makers", "Every finding rated Critical / High / Medium / Low", "Proof of how each issue was exploited", "Clear, developer-ready remediation steps", "Real-time alerts for any critical finding"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-gold/20 rounded-3xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-1">Full penetration test</p>
            <p className="font-display text-5xl font-bold text-gold mb-2">from $400</p>
            <p className="text-muted-foreground text-xs mb-6">Final price depends on scope. Free passive scan available first.</p>
            <Link href="/pricing" className="block w-full text-center py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm mb-3">
              See full pricing
            </Link>
            <Link href="/contact" className="block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
              Get a Quote
            </Link>
            <p className="text-muted-foreground/60 text-xs mt-4">
              New to pentests? Read{" "}
              <Link href="/blog/how-much-penetration-test-cost-zimbabwe" className="text-gold underline">what a pentest really costs in Zimbabwe</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
