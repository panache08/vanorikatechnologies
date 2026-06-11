"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Code2, Smartphone, Shield, Cloud, Lightbulb, Brain, Headphones, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const iconMap: Record<string, React.ElementType> = { Globe, Code2, Smartphone, Shield, Cloud, Lightbulb, Brain, Headphones };

export default function ServicesOverview() {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="WHAT WE DO"
          title="End-to-End"
          titleGradient="Tech Services"
          subtitle="From concept to deployment — every technology service your business needs, delivered with precision."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={service.href}
                  className="group relative flex flex-col h-full bg-card border border-border rounded-2xl p-6 card-hover overflow-hidden shine">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-display font-semibold text-foreground mb-2.5 group-hover:text-electric transition-colors text-[15px]">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{service.shortDesc}</p>

                  {/* Features */}
                  <div className="space-y-1 mb-5">
                    {service.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground/70">
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-electric text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-14 text-center">
          <Link href="/services"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-electric/30 text-electric rounded-2xl hover:bg-electric/8 hover:border-electric/50 transition-all font-semibold text-sm shine">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
