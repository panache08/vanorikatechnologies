"use client";
import { motion } from "framer-motion";
import { Shield, UserCheck, Zap, FileText, MessageCircle } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const reasons = [
  { icon: Shield, title: "CompTIA PenTest+ Certified", desc: "One of very few certified penetration testers operating in Zimbabwe.", color: "text-electric", bg: "bg-electric/10 group-hover:bg-electric/18" },
  { icon: UserCheck, title: "Direct Founder Access", desc: "You deal with Donovan directly. No junior staff, no middlemen, no broken telephone.", color: "text-cyan", bg: "bg-cyan/10 group-hover:bg-cyan/18" },
  { icon: Zap, title: "Fast Turnaround", desc: "Websites delivered in 1–2 weeks. Security audits start within 48 hours of sign-off.", color: "text-gold", bg: "bg-gold/10 group-hover:bg-gold/18" },
  { icon: FileText, title: "Plain English Reports", desc: "Security findings written so you understand them, not just your IT person.", color: "text-violet", bg: "bg-violet/10 group-hover:bg-violet/18" },
  { icon: MessageCircle, title: "WhatsApp First", desc: "Reply within 2 hours during business hours. No ticket systems.", color: "text-electric", bg: "bg-electric/10 group-hover:bg-electric/18" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="WHY US" title="Why Businesses in Harare Choose" titleGradient="Panashe Tech"
          subtitle="You deal directly with me — no account managers, no middlemen." />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-card border border-border rounded-2xl p-7 card-hover overflow-hidden shine">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
              <div className={`w-12 h-12 rounded-2xl ${r.bg} flex items-center justify-center mb-5 transition-colors`}>
                <r.icon className={`w-6 h-6 ${r.color}`} />
              </div>
              <h3 className={`font-display font-semibold text-foreground mb-3 group-hover:${r.color} transition-colors`}>{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
