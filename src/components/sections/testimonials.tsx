"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-28 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-x-0 top-1/3 flex justify-center pointer-events-none">
        <div className="w-[500px] h-[200px] bg-violet/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="CLIENT REVIEWS" title="What Our" titleGradient="Clients Say"
          subtitle="Don't take our word for it — hear from businesses we've helped transform." />

        <div className="mt-16">
          <div className="relative bg-card border border-border rounded-3xl p-10 md:p-14 overflow-hidden shine">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent" />
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-br from-electric to-violet flex items-center justify-center blue-glow-sm">
              <Quote className="w-5 h-5 text-white" />
            </div>

            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-center">
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>
              <p className="text-foreground text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                &ldquo;{testimonials[active].content}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric to-cyan flex items-center justify-center font-bold text-white text-lg blue-glow-sm">
                  {testimonials[active].avatar}
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-foreground">{testimonials[active].name}</p>
                  <p className="text-electric text-sm">{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`transition-all rounded-full ${i === active ? "w-8 h-2.5 bg-electric" : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
