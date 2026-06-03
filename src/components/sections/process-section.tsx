"use client";
import { motion } from "framer-motion";
import { Search, FileText, Code2, Rocket, Headphones } from "lucide-react";
import { process } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const iconMap: Record<string, React.ElementType> = { Search, FileText, Code2, Rocket, Headphones };

export default function ProcessSection() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader badge="HOW WE WORK" title="Our Proven" titleGradient="Process" light
          subtitle="A clear, transparent process that keeps you informed and in control at every step." />
        <div className="mt-16 grid md:grid-cols-5 gap-4">
          {process.map((step, i) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative text-center group">
                {/* Connector line */}
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-electric/40 to-electric/10" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-electric-gradient flex items-center justify-center mx-auto mb-4 blue-glow group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-cyan text-xs font-bold tracking-widest">{step.step}</span>
                <h3 className="font-display font-bold text-white mt-1 mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
