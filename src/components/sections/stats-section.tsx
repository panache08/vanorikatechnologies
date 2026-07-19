"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "2hr", label: "Response Time", sub: "During business hours" },
  { value: "17+", label: "Businesses Assessed", sub: "Across Zimbabwe & region" },
  { value: "<48hr", label: "Audit Start Time", sub: "From first contact" },
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
}
