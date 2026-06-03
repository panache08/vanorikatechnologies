"use client";
import { motion } from "framer-motion";
import { ShoppingBag, GraduationCap, Heart, Hotel, TrendingUp, Building, Rocket, Globe } from "lucide-react";
import { industries } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const iconMap: Record<string, React.ElementType> = { ShoppingBag, GraduationCap, Heart, Hotel, TrendingUp, Building, Rocket, Globe };

export default function IndustriesSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="INDUSTRIES" title="Who We" titleGradient="Serve"
          subtitle="We have experience across a wide range of industries, delivering tailored technology solutions." />
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind, i) => {
            const Icon = iconMap[ind.icon] || Globe;
            return (
              <motion.div key={ind.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group bg-card border border-border rounded-2xl p-5 text-center card-hover hover:border-electric/40">
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mb-3 mx-auto group-hover:bg-electric/20 transition-colors">
                  <Icon className="w-6 h-6 text-electric" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-1 group-hover:text-electric transition-colors">{ind.name}</h3>
                <p className="text-muted-foreground text-xs">{ind.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
