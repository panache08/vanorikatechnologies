"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Code2, Smartphone, Shield, Cloud, Lightbulb, Brain, Headphones, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const iconMap: Record<string, React.ElementType> = { Globe, Code2, Smartphone, Shield, Cloud, Lightbulb, Brain, Headphones };

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="WHAT WE DO" title="Our" titleGradient="Services"
          subtitle="End-to-end technology solutions designed to accelerate your business growth." />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group relative bg-card border border-border rounded-2xl p-6 card-hover hover:border-electric/40 hover:shadow-blue-500/10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-electric transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.shortDesc}</p>
                <Link href={service.href} className="flex items-center gap-1 text-electric text-sm font-medium hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3 border border-electric/30 text-electric rounded-xl hover:bg-electric/10 transition-all font-medium">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
