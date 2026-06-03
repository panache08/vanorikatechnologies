"use client";
import { motion } from "framer-motion";
import { UserCheck, DollarSign, Zap, Clock, Code2, HeartHandshake } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const reasons = [
  { icon: UserCheck, title: "Direct Founder Access", desc: "You work directly with Panashe Party — no account managers or middlemen. Clear, fast, personal communication." },
  { icon: DollarSign, title: "Affordable Premium Quality", desc: "Enterprise-grade solutions at prices that make sense for African businesses. No hidden fees, ever." },
  { icon: Zap, title: "Fast Turnaround", desc: "We move quickly without compromising quality. Most websites delivered in 1–2 weeks." },
  { icon: Clock, title: "24/7 Support", desc: "Our support is available around the clock. We treat your business like our own." },
  { icon: Code2, title: "Modern Technology", desc: "We use the latest, most powerful technologies to ensure your solution is future-proof." },
  { icon: HeartHandshake, title: "Long-Term Partnership", desc: "We don't disappear after launch. We're your dedicated technology partner for the long haul." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="WHY US" title="The Panashe Tech" titleGradient="Difference"
          subtitle="We're not just a vendor — we're a technology partner invested in your success." />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-6 card-hover hover:border-electric/40">
              <div className="w-11 h-11 rounded-xl bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                <r.icon className="w-5 h-5 text-electric" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-electric transition-colors">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
