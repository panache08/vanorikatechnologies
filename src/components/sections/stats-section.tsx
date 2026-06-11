"use client";
import { motion } from "framer-motion";

const certs = [
  { abbr: "CompTIA PenTest+", label: "Penetration Testing Certification", color: "from-red-500 to-orange-500", glow: "bg-red-500/8" },
  { abbr: "CompTIA Security+", label: "Cybersecurity Certification", color: "from-blue-500 to-cyan-500", glow: "bg-blue-500/8" },
  { abbr: "CompTIA A+", label: "IT Fundamentals Certification", color: "from-violet-500 to-blue-500", glow: "bg-violet-500/8" },
];

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <motion.div
              key={c.abbr}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center group bg-card border border-border rounded-2xl p-8 overflow-hidden"
            >
              <div className={`absolute inset-0 ${c.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <p className={`font-display text-xl font-bold mb-2 bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                  {c.abbr}
                </p>
                <p className="text-white/45 text-sm tracking-wider uppercase font-medium">{c.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
