import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Globe, Network, KeyRound, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/tools" },
  title: "Free Security Tools",
  description:
    "Free passive security tools for Zimbabwe businesses — website security check, SSL certificate checker, WHOIS lookup, and subdomain finder. No login required.",
};

const tools = [
  { icon: ShieldCheck, title: "Website Security Check", desc: "SSL, security headers, HTTPS redirect and privacy policy — a quick health score for any site.", href: "/tools/security-check" },
  { icon: Lock, title: "SSL Certificate Checker", desc: "Check a certificate's expiry, issuer, and what it covers. Know before it lapses.", href: "/tools/ssl" },
  { icon: Globe, title: "WHOIS / Domain Lookup", desc: "Registrar, registration and expiry dates, status, and name servers for any domain.", href: "/tools/whois" },
  { icon: Network, title: "Subdomain Finder", desc: "Discover subdomains from public certificate transparency logs — see your real attack surface.", href: "/tools/subdomains" },
  { icon: KeyRound, title: "Password Strength Checker", desc: "See how strong a password is and how long it would take to crack — checked privately in your browser.", href: "/tools/password" },
];

export default function ToolsPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> FREE TOOLS
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Security Tools</h1>
          <p className="text-white/60 text-lg">Free, passive checks you can run on any domain. No login, nothing intrusive.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {tools.map((t) => (
              <Link key={t.href} href={t.href}
                className="group bg-card border border-border rounded-2xl p-8 hover:border-gold/40 transition-all hover:-translate-y-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <t.icon className="w-6 h-6 text-gold" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">{t.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{t.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold">
                  Open tool <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
