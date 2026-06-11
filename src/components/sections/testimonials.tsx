"use client";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

export default function Testimonials() {
  return (
    <section className="py-28 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-x-0 top-1/3 flex justify-center pointer-events-none">
        <div className="w-[500px] h-[200px] bg-violet/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="GUARANTEE" title="My" titleGradient="Guarantee"
          subtitle="Every engagement ends with a clear deliverable — not a vague promise." />

        <div className="mt-16">
          <div className="relative bg-card border border-border rounded-3xl p-10 md:p-14 overflow-hidden shine">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-electric to-violet flex items-center justify-center blue-glow-sm">
              <Shield className="w-5 h-5 text-white" />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-center py-4">
              <p className="font-display font-semibold text-foreground text-xl mb-4">
                My Guarantee
              </p>
              <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">
                Every engagement ends with a clear deliverable — a written report, a live website, or working software. If something isn&apos;t right, I fix it. No arguments, no extra invoice.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
