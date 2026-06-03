"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Star } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useState } from "react";
import { toast } from "sonner";

export default function Hero() {
  const [email, setEmail] = useState("");

  const handleLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks! We'll be in touch within 24 hours.");
    setEmail("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Animated mesh background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 backdrop-blur-sm mb-8">
                <Zap className="w-3 h-3" /> PREMIUM TECH SOLUTIONS · HARARE, ZIMBABWE
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              We Build{" "}
              <span className="text-gradient-white">Digital Solutions</span>
              {" "}That Grow Your Business
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              From stunning websites to custom software and AI automation — Panashe Tech Solutions delivers enterprise-grade technology at affordable prices.
            </motion.p>

            {/* Trust indicators */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10">
              {["50+ Projects Delivered", "30+ Happy Clients", "Direct Founder Access"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <CheckCircle className="w-4 h-4 text-cyan" /> {t}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all blue-glow text-lg">
                Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/portfolio"
                className="flex items-center justify-center gap-2 px-8 py-4 glass border border-white/20 text-white font-semibold rounded-xl hover:border-electric/50 transition-all text-lg">
                View Our Work
              </Link>
            </motion.div>

            {/* Quick lead form */}
            <motion.form onSubmit={handleLead} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex gap-3 max-w-md">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email for a free quote"
                className="flex-1 px-4 py-3 glass border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-electric/60 focus:outline-none text-sm" />
              <button type="submit" className="px-5 py-3 bg-cyan text-navy font-semibold rounded-xl hover:bg-cyan-light transition-all text-sm whitespace-nowrap">
                Get Quote
              </button>
            </motion.form>
          </div>

          {/* Right — Founder card + floating elements */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block">
            {/* Founder card */}
            <div className="relative glass rounded-3xl p-8 border border-white/10 blue-glow">
              {/* Avatar placeholder */}
              <div className="w-24 h-24 rounded-2xl bg-electric-gradient flex items-center justify-center mb-6 mx-auto text-4xl font-bold text-white">
                PP
              </div>
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl font-bold text-white">{siteConfig.founder}</h3>
                <p className="text-cyan text-sm">{siteConfig.founderTitle}</p>
                <p className="text-white/50 text-xs mt-2">Panashe Tech Solutions</p>
              </div>
              <p className="text-white/60 text-sm text-center leading-relaxed italic mb-6">
                &ldquo;{siteConfig.founderBio}&rdquo;
              </p>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-electric text-white font-semibold rounded-xl text-sm hover:bg-electric-dark transition-all">
                Chat with Panashe Directly
              </a>
            </div>

            {/* Floating badges */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 glass rounded-xl px-4 py-3 border border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {["⭐", "⭐", "⭐", "⭐", "⭐"].map((s, i) => <span key={i} className="text-xs">{s}</span>)}
                </div>
                <span className="text-white text-xs font-semibold">5.0 Rating</span>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-6 glass rounded-xl px-4 py-3 border border-cyan/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-xs font-semibold">Available for Projects</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
