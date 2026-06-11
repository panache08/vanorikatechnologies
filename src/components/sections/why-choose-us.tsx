"use client";
import { motion } from "framer-motion";
import { UserCheck, DollarSign, Zap, Clock, Code2, HeartHandshake } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const reasons = [
  { icon: UserCheck, title: "Direct Founder Access", desc: "You work directly with Donovan — no account managers or middlemen. Clear, fast, personal communication.", color: "text-electric", bg: "bg-electric/10 group-hover:bg-electric/18" },
  { icon: DollarSign, title: "Affordable Premium Quality", desc: "High-quality work at prices that make sense for businesses. No hidden fees, ever.", color: "text-cyan", bg: "bg-cyan/10 group-hover:bg-cyan/18" },
  { icon: Zap, title: "Fast Turnaround", desc: "We move quickly without compromising quality. Most websites delivered in 1–2 weeks.", color: "text-gold", bg: "bg-gold/10 group-hover:bg-gold/18" },
  { icon: Clock, title: "24/7 Support", desc: "Our support is available around the clock. We treat your business like our own.", color: "text-violet", bg: "bg-violet/10 group-hover:bg-violet/18" },
  { icon: Code2, title: "Modern Technology", desc: "We use current, well-supported technologies — nothing trendy for its own sake, nothing outdated.", color: "text-electric", bg: "bg-electric/10 group-hover:bg-electric/18" },
  { icon: HeartHandshake, title: "Long-Term Partnership", desc: "We don't disappear after launch. Call, WhatsApp, or email — you'll get Donovan directly.", color: "text-cyan", bg: "bg-cyan/10 group-hover:bg-cyan/18" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="WHY US" title="The PanasheTech" titleGradient="Difference"
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
