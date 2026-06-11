"use client";
import { motion } from "framer-motion";
import Link from "next/link";
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
            <Sparkles className="w-3 h-3" /> READY TO START?
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Let&apos;s Build Something
            <br />
            <span className="text-gradient">Amazing Together</span>
          </h2>
          <p className="text-white/55 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you need a website, custom software, or a security assessment — I&apos;m ready to help. Free consultation, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact"
              className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-10 py-4.5 bg-electric text-white font-semibold rounded-2xl text-lg blue-glow shine">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-electric to-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-10 py-4 bg-[#25D366] text-white font-semibold rounded-2xl text-lg hover:opacity-90 transition-opacity">
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
          <p className="text-white/25 text-sm tracking-wide">
            Free consultation · No obligation · Response within 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
