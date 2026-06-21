"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { CheckCircle } from "lucide-react";

const stats = [
  { value: "3", label: "CompTIA Certifications", sub: "A+ · Security+ · PenTest+" },
  { value: "17+", label: "Businesses Assessed", sub: "Across Zimbabwe & region" },
  { value: "<48hr", label: "Audit Start Time", sub: "From first contact" },
  { value: "100%", label: "DPA 2021 Compliant", sub: "Zimbabwe Data Protection Act" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-[#0D0D1A] border-y border-[#1A1A30] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="text-center"
            >
              <p className="font-display font-black text-4xl md:text-5xl text-gradient mb-1 leading-none">
                {s.value}
              </p>
              <p className="font-semibold text-white/80 text-sm mb-0.5">{s.label}</p>
              <p className="font-mono text-[10px] text-gold/50 uppercase tracking-widest">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {siteConfig.certifications.map((cert, i) => (
            <motion.div
              key={cert.abbr}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="flex items-center gap-4 p-4 rounded-xl border border-[#1A1A30] bg-[#07070D] hover:border-gold/20 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/8 border border-gold/15 flex items-center justify-center flex-shrink-0">
                <span className="font-mono font-bold text-gold text-xs">{cert.abbr}</span>
              </div>
              <div>
                <p className="font-semibold text-white/85 text-sm">{cert.full}</p>
                <p className="text-white/35 text-xs mt-0.5">{cert.desc}</p>
              </div>
              <CheckCircle className="w-4 h-4 text-green ml-auto flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
