"use client";
import { motion } from "framer-motion";
import { Search, FileText, Code2, Rocket, Headphones } from "lucide-react";
import { process } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const iconMap: Record<string, React.ElementType> = { Search, FileText, Code2, Rocket, Headphones };

export default function ProcessSection() {
  return (
    <section className="relative py-24 bg-[#0D0D1A] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="How It Works"
          title="A Simple, Honest Process"
          subtitle="No kickoff decks, no project managers. Clear steps and honest timelines from day one."
          centered
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-6">
          {process.map((step, i) => {
            const Icon = iconMap[step.icon] ?? Search;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center group"
              >
                {/* Connector line */}
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/15 to-transparent" />
                )}

                {/* Icon */}
                <div className="relative w-14 h-14 mx-auto mb-5">
                  <div className="w-full h-full rounded-xl bg-[#07070D] border border-[#1A1A30] group-hover:border-gold/25 flex items-center justify-center transition-all">
                    <Icon className="w-5 h-5 text-gold/70 group-hover:text-gold transition-colors" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center">
                    <span className="font-mono font-bold text-gold text-[9px]">{i + 1}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-white/80 text-sm mb-2 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/35 text-xs leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
