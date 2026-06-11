"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { portfolio } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

export default function PortfolioPreview() {
  const featured = portfolio.slice(0, 3);
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="OUR WORK" title="Featured" titleGradient="Projects" light
          subtitle="Our Work" />

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group glass border border-white/8 rounded-2xl overflow-hidden card-hover shine">
              <div className="relative h-52 overflow-hidden">
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${p.color} shadow-lg`}>
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-white text-lg mb-2.5 group-hover:text-electric transition-colors">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium bg-electric/10 text-electric rounded-lg border border-electric/20">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                  <p className="text-xs text-white/40 flex items-center gap-1">
                    <span className="text-green-400">✓</span> {p.result}
                  </p>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-electric transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <Link href="/portfolio"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-white/15 text-white rounded-2xl hover:bg-white/5 hover:border-electric/40 transition-all font-semibold text-sm shine">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
