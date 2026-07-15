import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/security-glossary" },
  title: "Cybersecurity Glossary: Plain English",
  description:
    "A plain-English glossary of cybersecurity terms for Zimbabwe business owners. SPF, DMARC, penetration testing, CSP, phishing, ransomware and more, explained simply.",
};

const terms: { term: string; def: string }[] = [
  { term: "Penetration test (pentest)", def: "An authorised, simulated attack on your own systems to find weaknesses before a real attacker does. You get a report of what was found and how to fix it." },
  { term: "Vulnerability assessment", def: "A scan that identifies known weaknesses in your systems. Broader and shallower than a pentest: it finds issues but doesn't try to exploit them." },
  { term: "Passive assessment", def: "A read-only check using only public information (DNS, certificates, response headers). Nothing is logged into, scanned aggressively, or disrupted." },
  { term: "SPF (Sender Policy Framework)", def: "A DNS record listing which servers are allowed to send email for your domain. Without it, anyone can forge email that looks like it's from you." },
  { term: "DMARC", def: "A DNS policy that tells receiving mail servers what to do with email that fails SPF/DKIM: monitor, quarantine, or reject. It's how you stop spoofing." },
  { term: "DKIM", def: "A cryptographic signature added to your outgoing email so receivers can verify it really came from your domain and wasn't tampered with." },
  { term: "Phishing", def: "Fraudulent emails or messages designed to trick people into revealing passwords, payment details, or clicking malicious links." },
  { term: "Ransomware", def: "Malicious software that encrypts your files and demands payment to unlock them. Good backups are the best defence." },
  { term: "SSL / TLS certificate", def: "What puts the padlock in the address bar. It encrypts traffic between your visitors and your site, and proves the site is genuinely yours." },
  { term: "Security headers", def: "Instructions your server sends browsers (like HSTS, CSP, X-Frame-Options) that harden your site against common attacks. Often missing." },
  { term: "CSP (Content Security Policy)", def: "A security header that controls where a page is allowed to load scripts and content from. It's a strong defence against content injection." },
  { term: "HSTS", def: "A header that forces browsers to always use HTTPS for your site, preventing downgrade attacks." },
  { term: "Attack surface", def: "Everything about you that's reachable and could be attacked, including your website, subdomains, exposed services and email." },
  { term: "Subdomain", def: "A site under your main domain, like shop.yourbusiness.co.zw. Forgotten subdomains are a common, overlooked weak point." },
  { term: "Two-factor authentication (2FA)", def: "A second step beyond your password (usually a code on your phone) so a stolen password alone isn't enough to log in." },
  { term: "Data breach", def: "When personal or sensitive data is accessed or taken without authorisation. Under the Data Protection Act, breaches carry real obligations and penalties." },
  { term: "Data Protection Act (2021)", def: "Zimbabwe's Cyber and Data Protection Act, the law governing how businesses must collect, store and protect personal data." },
  { term: "Zero-day", def: "A vulnerability that's being exploited before a patch exists. Rare for small businesses. Outdated software is a far bigger risk." },
];

export default function GlossaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Cybersecurity Glossary",
    hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.def })),
  };

  return (
    <main>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <BookOpen className="w-3.5 h-3.5" /> GLOSSARY
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Cybersecurity, in Plain English</h1>
          <p className="text-white/60 text-lg">No jargon. The security terms you&apos;ll actually run into, explained for business owners.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {terms.map((t) => (
            <div key={t.term} className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-1.5">{t.term}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.def}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
