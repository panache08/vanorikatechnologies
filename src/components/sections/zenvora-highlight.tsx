"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { zenvora } from "@/lib/data";

export default function ZenvoraHighlight() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-gold/20 bg-gradient-to-br from-[#0D0D1A] to-[#111122] p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-gold border border-gold/30 rounded-full bg-gold/5 mb-5 uppercase">
                <Sparkles className="w-3 h-3" /> Also Building
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Zenvora — an <span className="text-gradient-gold">AI-powered ERP</span> for African SMEs
              </h2>
              <p className="text-white/55 leading-relaxed mb-7">
                A live SaaS product: accounting, invoicing, HR, CRM and a casino suite in one system — built for Zimbabwe
                with USD/ZWG dual currency, ZIMRA compliance, EcoCash, and an AI Copilot.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/zenvora"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm">
                  Explore Zenvora <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={zenvora.demoUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border2 text-white/70 hover:text-white hover:border-gold/30 rounded-xl transition-all text-sm font-medium">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {zenvora.modules.slice(0, 6).map((m) => (
                <div key={m.title} className="rounded-xl border border-border bg-[#07070D]/60 px-4 py-3.5">
                  <p className="text-white/80 text-sm font-semibold">{m.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
