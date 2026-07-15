import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Globe, Network, KeyRound, Mail, Copy, Layers, Radar, FileSearch, HelpCircle, BadgeCheck, ShieldAlert, Calculator, Cookie, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/tools" },
  title: "Free Security Tools",
  description:
    "Free passive security tools for Zimbabwe businesses: website security check, SSL certificate checker, WHOIS lookup, and subdomain finder. No login required.",
};

const tools = [
  { icon: ShieldCheck, title: "Website Security Check", desc: "A quick health score for any site: SSL, security headers, HTTPS redirect and privacy policy.", href: "/tools/security-check" },
  { icon: Lock, title: "SSL Certificate Checker", desc: "Check a certificate's expiry, issuer, and what it covers. Know before it lapses.", href: "/tools/ssl" },
  { icon: Globe, title: "WHOIS / Domain Lookup", desc: "Registrar, registration and expiry dates, status, and name servers for any domain.", href: "/tools/whois" },
  { icon: Network, title: "Subdomain Finder", desc: "Discover subdomains from public certificate transparency logs. See your real attack surface.", href: "/tools/subdomains" },
  { icon: KeyRound, title: "Password Strength Checker", desc: "See how strong a password is and how long it would take to crack, checked privately in your browser.", href: "/tools/password" },
  { icon: Mail, title: "Email Security Checker", desc: "Check your domain's SPF and DMARC records to find out if attackers can spoof email from your business.", href: "/tools/email-security" },
  { icon: Copy, title: "Lookalike Domain Finder", desc: "Find typosquat and lookalike domains impersonating your business for phishing, before your customers fall for them.", href: "/tools/lookalike" },
  { icon: Network, title: "DNS Records Lookup", desc: "View all public DNS records (A, MX, NS, TXT and more) for any domain in one clean view.", href: "/tools/dns" },
  { icon: ShieldCheck, title: "Security Headers Checker", desc: "Grade your website's security headers in seconds: HSTS, CSP, X-Frame-Options and more.", href: "/tools/headers" },
  { icon: Mail, title: "SPF & DMARC Generator", desc: "Generate the exact DNS records that stop attackers spoofing email from your domain, ready to copy and paste.", href: "/tools/spf-dmarc-generator" },
  { icon: FileSearch, title: "Email Header Analyzer", desc: "Suspect a phishing email? Paste its headers and we'll check if it's really from who it claims.", href: "/tools/email-header-analyzer" },
  { icon: KeyRound, title: "Password Generator", desc: "Create strong random passwords and memorable passphrases. Generated privately in your browser.", href: "/tools/password-generator" },
  { icon: Layers, title: "Tech-Stack Detector", desc: "See the CMS, frameworks and server a website is built with, and spot outdated software.", href: "/tools/tech-stack" },
  { icon: Radar, title: "Attack Surface Mapper", desc: "Everything an attacker can discover about your domain in one view: subdomains, IPs, mail and name servers.", href: "/tools/attack-surface" },
  { icon: HelpCircle, title: "Cyber-Safety Quiz", desc: "Answer 10 questions and get your business's security score with tailored recommendations. No email needed.", href: "/tools/security-quiz" },
  { icon: BadgeCheck, title: "Trust Badge", desc: "Grab a \"Secured by Vanorika\" badge for your site's footer. Self-contained, no images or scripts.", href: "/tools/badge" },
  { icon: ShieldAlert, title: "Password Breach Checker", desc: "See if a password has appeared in a known data breach. It's checked privately and never leaves your browser.", href: "/tools/password-breach" },
  { icon: Calculator, title: "Breach Cost Calculator", desc: "Estimate what a data breach could cost your business, so you can weigh it against the cost of prevention.", href: "/tools/breach-cost" },
  { icon: Cookie, title: "Cookie & Privacy Scanner", desc: "See which cookies and trackers your site sets, and whether you have the privacy basics the DPA expects.", href: "/tools/cookies" },
  { icon: Lock, title: "TLS / Protocol Checker", desc: "Find out which TLS versions your site accepts and whether it still allows weak, legacy protocols.", href: "/tools/tls" },
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

          <div className="mt-14 max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8">
            <p className="font-display text-lg font-bold text-foreground mb-2">Open source &amp; transparent</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              The engine behind these tools is open source. Passive, read-only, zero dependencies. Read the code, run it yourself, or build on it.
            </p>
            <a href="https://github.com/panache08/vanorika-security-tools" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all text-sm font-semibold">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
