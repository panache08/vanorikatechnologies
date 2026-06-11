"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function CTABanner() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-60" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      {/* Large glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-electric/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-cyan border border-cyan/25 rounded-full bg-cyan/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-3 h-3" /> GET IN TOUCH
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ready to Sort Your
            <br />
            <span className="text-gradient">Business Online?</span>
          </h2>
          <p className="text-white/55 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Free security check or new website — let&apos;s talk today. No obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-10 py-4.5 bg-[#25D366] text-white font-semibold rounded-2xl text-lg hover:opacity-90 transition-opacity">
              <MessageCircle className="w-5 h-5" /> WhatsApp Donovan
            </a>
            <a href={`mailto:${siteConfig.email}`}
              className="flex items-center justify-center gap-2.5 px-10 py-4 glass border border-white/15 text-white font-semibold rounded-2xl text-lg hover:border-electric/40 hover:bg-white/5 transition-all">
              <ArrowRight className="w-5 h-5" /> Send an Email
            </a>
          </div>
          <p className="text-white/25 text-sm tracking-wide">
            Free consultation · No obligation · Reply within 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
