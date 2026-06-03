"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props { badge?: string; title: string; titleGradient?: string; subtitle?: string; centered?: boolean; light?: boolean; className?: string; }

export default function SectionHeader({ badge, title, titleGradient, subtitle, centered = true, light = false, className }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className={cn(centered ? "text-center" : "", className)}>
      {badge && (
        <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-electric border border-electric/30 rounded-full bg-electric/5 mb-4">
          {badge}
        </span>
      )}
      <h2 className={cn("font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4", light ? "text-white" : "text-foreground")}>
        {title}{titleGradient && <span className="text-gradient"> {titleGradient}</span>}
      </h2>
      {subtitle && (
        <p className={cn("text-lg leading-relaxed", centered ? "max-w-2xl mx-auto" : "max-w-xl", light ? "text-white/60" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
