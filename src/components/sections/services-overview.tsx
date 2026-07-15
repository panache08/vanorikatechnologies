"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Code2, Smartphone, Shield, Brain, ArrowRight, MessageCircle } from "lucide-react";
import { services, siteConfig } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const ICONS: Record<string, React.ElementType> = {
  Shield,
  Globe,
  Code2,
  Smartphone,
  Brain,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServicesOverview() {
  return (
    <section className="relative py-24 bg-[#07070D] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="What We Do"
          title="Enterprise-Grade Services"
          subtitle="From penetration testing to production-ready web platforms, we build and secure what Zimbabwean businesses depend on."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {services.map((svc, i) => {
            const Icon = ICONS[svc.icon] ?? Shield;
            return (
              <motion.div
                key={svc.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
              >
                <Link
                  href={svc.href}
                  className="group block h-full p-6 rounded-xl border border-[#1A1A30] bg-[#0D0D1A] hover:border-gold/25 hover:bg-[#111122] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Gold top border reveal */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-xl" />

                  <div className="w-11 h-11 rounded-lg bg-gold/8 border border-gold/12 flex items-center justify-center mb-4 group-hover:bg-gold/12 group-hover:border-gold/25 transition-all">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>

                  <h3 className="font-display font-bold text-white/90 text-[15px] mb-2 group-hover:text-white transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light mb-4">
                    {svc.description}
                  </p>

                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-gold/50 group-hover:text-gold/80 transition-colors uppercase tracking-wider">
                    Learn more
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            custom={services.length}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full p-6 rounded-xl border border-gold/20 bg-gold/4 hover:bg-gold/8 hover:border-gold/40 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-gold/15 border border-gold/25 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-bold text-gold text-[15px] mb-2">
                Free Passive Security Assessment
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-light mb-4">
                No commitment. We scan your public-facing assets and share what we find, at no cost.
              </p>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-gold/70 group-hover:text-gold uppercase tracking-wider">
                Get yours free
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
