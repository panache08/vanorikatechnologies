"use client";
import { motion } from "framer-motion";
import { techStack } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const categoryStyle: Record<string, string> = {
  Frontend: "text-gold/80 bg-gold/5 border-gold/15",
  Backend:  "text-green/80 bg-green/5 border-green/15",
  Database: "text-white/60 bg-white/4 border-white/8",
  Cloud:    "text-gold-light/70 bg-gold-light/5 border-gold-light/10",
  DevOps:   "text-muted bg-white/3 border-white/6",
  Mobile:   "text-white/55 bg-white/3 border-white/6",
};

const categoryDot: Record<string, string> = {
  Frontend: "bg-gold",
  Backend:  "bg-green",
  Database: "bg-white/50",
  Cloud:    "bg-gold-light",
  DevOps:   "bg-muted",
  Mobile:   "bg-white/40",
};

export default function TechStack() {
  const categories = Array.from(new Set(techStack.map((t) => t.category)));

  return (
    <section className="relative py-24 bg-[#07070D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Tech Stack"
          title="Technologies We Work With"
          subtitle="Modern, production-proven tools — chosen for performance, security, and developer experience."
          centered
        />

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.025, duration: 0.3 }}
              whileHover={{ scale: 1.06 }}
              className={`px-4 py-2 rounded-lg border font-mono text-[11px] uppercase tracking-wider cursor-default ${categoryStyle[tech.category] ?? "text-white/50 bg-white/3 border-white/6"}`}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${categoryDot[cat] ?? "bg-white/40"}`} />
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
