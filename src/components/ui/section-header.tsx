"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  badge?: string;
  title: string;
  titleGradient?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({ badge, title, titleGradient, subtitle, centered = true, light = false, className }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className={cn(centered ? "text-center" : "", className)}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-cyan border border-cyan/25 rounded-full bg-cyan/5 backdrop-blur-sm mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className={cn(
        "font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 tracking-tight leading-tight",
        light ? "text-white" : "text-foreground"
      )}>
        {title}
        {titleGradient && <span className="text-gradient"> {titleGradient}</span>}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg leading-relaxed",
          centered ? "max-w-2xl mx-auto" : "max-w-xl",
          light ? "text-white/55" : "text-muted-foreground"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
