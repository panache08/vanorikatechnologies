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
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="OUR WORK" title="Featured" titleGradient="Projects"
          subtitle="Real results for real businesses. Here's what we've built recently." />
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {featured.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden card-hover hover:border-electric/30">
              <div className="relative h-52 overflow-hidden">
                <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${p.color}`}>
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-electric transition-colors">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs font-medium bg-electric/10 text-electric rounded-md border border-electric/20">{t}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">✅ {p.result}</p>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-electric transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-3 border border-electric/30 text-electric rounded-xl hover:bg-electric/10 transition-all font-medium">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
