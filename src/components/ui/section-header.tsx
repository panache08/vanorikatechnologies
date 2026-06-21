"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  badge?: string;
  title: string;
  titleGradient?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({ label, badge, title, titleGradient, subtitle, centered, className }: Props) {
  const effectiveLabel = label ?? badge;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(centered && "text-center", className)}
    >
      {effectiveLabel && (
        <p className={cn(
          "font-mono text-[10px] text-gold/60 uppercase tracking-[0.25em] mb-4",
          centered ? "inline-flex items-center label-line" : "flex items-center label-line"
        )}>
          {effectiveLabel}
        </p>
      )}
      <h2
        className="font-display font-black text-white leading-tight mb-4"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em" }}
      >
        {title}{titleGradient && <> <span className="text-gradient">{titleGradient}</span></>}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-white/45 font-light leading-relaxed",
          centered ? "max-w-2xl mx-auto text-base md:text-lg" : "text-base"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
