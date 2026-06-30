"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

const items = [
  { service: "Passive Security Assessment", price: "Free" },
  { service: "Website Security Audit", price: "From $150" },
  { service: "Full Penetration Test", price: "From $400" },
  { service: "Business Website", price: "From $300" },
];

export default function PricingTeaser() {
  return (
    <section className="relative py-24 bg-[#0D0D1A] border-y border-border overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-5">TRANSPARENT PRICING</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">No mystery quotes. Know the cost up front.</h2>
            <p className="text-white/55 leading-relaxed mb-7">
              Honest starting prices in USD, published before you ever message us. Final figures depend on scope — but you&apos;ll never be left guessing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm">
                See full pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="/sample-pentest-report.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border2 text-white/70 hover:text-white hover:border-gold/30 rounded-xl transition-all text-sm font-medium">
                <FileText className="w-4 h-4" /> See a sample report
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl overflow-hidden">
            {items.map((it, i) => (
              <div key={it.service} className={`flex items-center justify-between px-6 py-4 ${i !== 0 ? "border-t border-border" : ""}`}>
                <span className="text-foreground text-sm font-medium">{it.service}</span>
                <span className="font-display text-gold font-bold text-sm whitespace-nowrap">{it.price}</span>
              </div>
            ))}
            <div className="px-6 py-3 bg-gold/5 text-center">
              <Link href="/pricing" className="text-gold text-xs font-semibold hover:underline">+ Zenvora ERP, mobile apps &amp; custom software →</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
