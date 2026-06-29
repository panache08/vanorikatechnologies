"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Radar, Mail, KeyRound, Layers, Network, ArrowRight, HelpCircle } from "lucide-react";

const featured = [
  { icon: ShieldCheck, title: "Website Security Check", href: "/tools/security-check" },
  { icon: Radar, title: "Attack Surface Mapper", href: "/tools/attack-surface" },
  { icon: Mail, title: "SPF & DMARC Generator", href: "/tools/spf-dmarc-generator" },
  { icon: Network, title: "Subdomain Finder", href: "/tools/subdomains" },
  { icon: Layers, title: "Tech-Stack Detector", href: "/tools/tech-stack" },
  { icon: KeyRound, title: "Password Generator", href: "/tools/password-generator" },
];

export default function FreeToolsSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-4">FREE SECURITY TOOLS</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">See what attackers see — free</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            A full suite of free, passive tools for Zimbabwe businesses. No login, nothing intrusive — run them on your own site in seconds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map((t, i) => (
            <motion.div key={t.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}>
              <Link href={t.href}
                className="group flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold/40 hover:-translate-y-0.5 transition-all h-full">
                <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                  <t.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="text-foreground text-sm font-medium flex-1 group-hover:text-gold transition-colors">{t.title}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/tools/security-quiz"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm">
            <HelpCircle className="w-4 h-4" /> Take the 2-min Cyber-Safety Quiz
          </Link>
          <Link href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-border2 text-foreground/70 hover:text-foreground hover:border-gold/30 rounded-xl transition-all text-sm font-medium">
            View all tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
