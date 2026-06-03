"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="CLIENT REVIEWS" title="What Our" titleGradient="Clients Say"
          subtitle="Don't take our word for it — hear from businesses we've helped transform." />
        <div className="mt-16">
          <div className="relative bg-card border border-border rounded-3xl p-10">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-electric flex items-center justify-center blue-glow">
              <Quote className="w-5 h-5 text-white" />
            </div>
            <motion.div key={active} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-foreground text-lg leading-relaxed italic mb-8">&ldquo;{testimonials[active].content}&rdquo;</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-electric-gradient flex items-center justify-center font-bold text-white">
                  {testimonials[active].avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{testimonials[active].name}</p>
                  <p className="text-electric text-sm">{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-electric hover:border-electric/40 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`transition-all rounded-full ${i === active ? "w-8 h-2 bg-electric" : "w-2 h-2 bg-border hover:bg-muted-foreground"}`} />
              ))}
            </div>
            <button onClick={() => setActive((a) => (a + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-electric hover:border-electric/40 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
