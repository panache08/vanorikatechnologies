"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronDown, Shield, FileText } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden bg-[#07070D]">
        {/* Background layers */}
        <div className="absolute inset-0 bg-mesh-gradient" />
        <div className="absolute inset-0 bg-grid opacity-100" />

        {/* Gold orbs */}
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-gold/5 blur-[140px] animate-glow-pulse" />
          <div className="absolute bottom-[15%] right-[8%] w-[400px] h-[400px] rounded-full bg-gold/4 blur-[120px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
        </motion.div>

        {/* Main content */}
        <motion.div style={{ opacity }} className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

            {/* LEFT */}
            <div>
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-black text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", letterSpacing: "-0.03em" }}>
                Your Business
                <br />
                <span className="text-gradient-white">Is Probably</span>
                <br />
                <span className="relative">
                  <span className="text-gradient">Exposed Online.</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-gold-gradient"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
                <br />
                <span className="text-white/70 font-bold" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}>
                  Let&apos;s Fix That.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-muted font-light text-lg leading-[1.75] mb-8 max-w-lg">
                Donovan Mudarikwa: penetration tester and web developer, based in Harare.{" "}
                <span className="text-white/70">We find security vulnerabilities in Zimbabwean businesses and build websites that bring in real clients.</span>
              </motion.p>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4 mb-10">
                {[
                  "Penetration Testing Specialist",
                  "Based in Harare, same day response",
                  "Reply within 2 hours",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-white/45 text-sm font-light">
                    <CheckCircle className="w-4 h-4 text-gold/70 flex-shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </motion.div>

              {/* Certifications: the strongest differentiator, made explicit above the fold */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-2.5 mb-10 -mt-4">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mr-1">Certified</span>
                {siteConfig.certifications.map((c) => (
                  <span key={c.abbr}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/25 bg-gold/5 text-gold text-xs font-semibold">
                    <Shield className="w-3 h-3" /> {c.full}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact"
                  className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-8 py-4 bg-gold text-[#07070D] font-bold rounded-xl text-base gold-glow shine uppercase tracking-wider">
                  <Shield className="w-4 h-4" />
                  <span className="relative z-10 flex items-center gap-2">
                    Get a Free Security Check
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/portfolio"
                  className="group flex items-center justify-center gap-2.5 px-8 py-4 border border-[#1A1A30] text-white/60 font-medium rounded-xl text-base hover:border-gold/30 hover:text-white hover:bg-gold/4 transition-all">
                  View Our Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Pricing signal removes friction before they even message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-5 text-sm text-white/45">
                <Link href="/pricing" className="hover:text-gold transition-colors">
                  Pentests from <span className="text-gold font-semibold">$400</span> · Websites from{" "}
                  <span className="text-gold font-semibold">$300</span> · Passive scan{" "}
                  <span className="text-gold font-semibold">free</span>
                </Link>
              </motion.p>
            </div>

            {/* RIGHT: credentials card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative hidden lg:block">

              <div className="absolute inset-0 bg-gold/6 blur-3xl rounded-3xl scale-95" />

              <div className="relative bg-[#0D0D1A] rounded-2xl p-8 border border-[#1A1A30] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                {/* Scan line */}
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-scan-line pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green/80" />
                  </div>
                  <span className="font-mono text-white/20 text-[10px] tracking-wider uppercase">vanorikatechnologies.co.zw</span>
                </div>

                {/* Founder */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/20 flex items-center justify-center text-xl font-black text-gold">
                      DM
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green border-2 border-[#0D0D1A] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#07070D] animate-ping" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">{siteConfig.founder}</h3>
                    <p className="text-gold text-sm font-mono">{siteConfig.founderTitle}</p>
                    <p className="text-white/30 text-xs font-light">Available now · Harare, ZW</p>
                  </div>
                </div>

                {/* Quick pitch */}
                <div className="mb-6">
                  <p className="text-white/55 text-sm font-light leading-relaxed">
                    Penetration testing and professional websites for Zimbabwean businesses. Clear, plain-English reports and direct, founder-led delivery.
                  </p>
                </div>

                {/* Proof artifact: see report quality before you commit */}
                <a href="/sample-pentest-report.pdf" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-[#111122] border border-[#1A1A30] hover:border-gold/30 transition-all group">
                  <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/85 text-xs font-medium">See a sample report</p>
                    <p className="text-white/30 text-[10px]">Redacted real-format pentest report (PDF)</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/25 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>

                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-xl text-sm hover:bg-gold-light transition-colors uppercase tracking-wider">
                  Chat with Donovan Directly
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 z-10">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07070D] to-transparent z-10" />
      </section>
    </>
  );
}
