"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-[#07070D] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Guarantee"
          title="We Stand Behind Our Work"
          subtitle="Every engagement is backed by a clear commitment — if we miss something in scope, we re-test at no charge."
          centered
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Guarantee card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 rounded-2xl border border-gold/20 bg-gold/4 flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gold/12 border border-gold/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-2">Free Re-Test Guarantee</h3>
              <p className="text-white/45 text-sm leading-relaxed font-light">
                If a vulnerability we documented resurfaces after remediation — or if we missed something clearly in scope — we come back. No questions, no invoice.
              </p>
            </div>
            <p className="font-mono text-[10px] text-gold/50 uppercase tracking-wider mt-auto">
              Applies to all pentest engagements
            </p>
          </motion.div>

          {/* Case study teaser */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/case-study/glowtrack-auctions"
              className="group block h-full p-7 rounded-2xl border border-[#1A1A30] bg-[#0D0D1A] hover:border-gold/20 transition-all"
            >
              <p className="font-mono text-[10px] text-gold/60 uppercase tracking-[0.2em] mb-4 label-line">Case Study</p>
              <h3 className="font-display font-bold text-white text-lg mb-3 group-hover:text-gold/90 transition-colors">
                GlowTrack Auctions Security Assessment
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-light mb-6">
                A full web application penetration test for a Harare-based auction platform — uncovering critical auth bypasses and data exposure before launch.
              </p>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-gold/50 group-hover:text-gold/80 transition-colors uppercase tracking-wider">
                Read full case study
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
