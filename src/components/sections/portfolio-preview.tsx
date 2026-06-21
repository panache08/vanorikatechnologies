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
    <section className="relative py-24 bg-[#07070D] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Work"
          title="Featured Projects"
          subtitle="From live production systems to security assessments — a sample of what we ship."
          centered
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-[#1A1A30] bg-[#0D0D1A] hover:border-gold/20 transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A]/20 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gold bg-[#07070D]/80 border border-gold/20 rounded-lg">
                  {p.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-white/90 text-[15px] mb-2 group-hover:text-gold/90 transition-colors">
                  {p.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                  {p.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 font-mono text-[10px] text-gold/60 bg-gold/5 border border-gold/10 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#1A1A30] flex items-center justify-between">
                  <p className="text-xs text-white/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green flex-shrink-0" />
                    {p.result}
                  </p>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-gold/50 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#252545] text-white/60 hover:text-white hover:border-gold/30 rounded-xl transition-all font-medium text-sm"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
