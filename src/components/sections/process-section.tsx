"use client";
import { motion } from "framer-motion";
import { Search, FileText, Code2, Rocket, Headphones } from "lucide-react";
import { process } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const iconMap: Record<string, React.ElementType> = { Search, FileText, Code2, Rocket, Headphones };
const stepColors = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-blue-500",
  "from-cyan-500 to-teal-400",
  "from-orange-500 to-yellow-400",
  "from-green-500 to-emerald-400",
];

export default function ProcessSection() {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-35" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="HOW WE WORK" title="Our Proven" titleGradient="Process"
          subtitle="A clear, transparent process that keeps you informed and in control at every step." />

        <div className="mt-16 grid md:grid-cols-5 gap-6">
          {process.map((step, i) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center group">
                {/* Connector */}
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-white/5" />
                )}
                {/* Icon circle */}
                <div className="relative z-10 w-16 h-16 rounded-2xl mx-auto mb-5">
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${stepColors[i]} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stepColors[i]} blur-xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                </div>
                <span className={`text-xs font-bold tracking-[0.2em] bg-gradient-to-r ${stepColors[i]} bg-clip-text text-transparent`}>
                  {step.step}
                </span>
                <h3 className="font-display font-bold text-foreground mt-1.5 mb-2 group-hover:text-electric transition-colors">{step.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
