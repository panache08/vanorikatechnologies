"use client";
import { motion } from "framer-motion";
import { Shield, UserCheck, Zap, FileText, MessageCircle, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { siteConfig } from "@/lib/data";

const reasons = [
  {
    icon: Shield,
    title: "Attacker's Mindset",
    desc: "We test the way real attackers do, chaining small weaknesses together to find the issues automated scanners quietly miss.",
  },
  {
    icon: Zap,
    title: "Sub-48-Hour Audit Start",
    desc: "We mobilise fast. From first contact to active assessment in under 48 hours, because threats don't wait for procurement cycles.",
  },
  {
    icon: UserCheck,
    title: "Founder-Led Engagements",
    desc: "Every project is handled personally by Donovan Mudarikwa. You get the expert, not a junior delegated without context.",
  },
  {
    icon: FileText,
    title: "Clear, Actionable Reports",
    desc: "No 80-page PDF dumps. Our reports map vulnerabilities to business risk with a prioritised remediation roadmap you can actually execute.",
  },
  {
    icon: MessageCircle,
    title: "Ongoing Support Included",
    desc: "Security is not a one-time event. We stay available after delivery for questions, re-tests, and follow-up. No extra invoice.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-[#0D0D1A] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: reasons */}
          <div>
            <SectionHeader
              label="Why Vanorika"
              title="Built Different by Design"
              subtitle="We operate at the intersection of real-world testing, Harare-based availability, and founder accountability."
            />

            <div className="space-y-5 mt-10">
              {reasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    className="group flex gap-4 p-5 rounded-xl border border-[#1A1A30] bg-[#07070D] hover:border-gold/20 transition-all relative overflow-hidden"
                  >
                    {/* Left gold reveal */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top rounded-l-xl" />

                    <div className="w-10 h-10 rounded-lg bg-gold/8 border border-gold/12 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4.5 h-4.5 text-gold" style={{ width: "18px", height: "18px" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white/85 text-[15px] mb-1.5">{r.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{r.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: sticky credentials panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="rounded-2xl border border-[#1A1A30] bg-[#07070D] p-7 space-y-6">
              {/* Header */}
              <div>
                <p className="font-mono text-[10px] text-gold/60 uppercase tracking-[0.2em] mb-1 label-line">Credentials</p>
                <h3 className="font-display font-bold text-white text-xl">Donovan Mudarikwa</h3>
                <p className="font-mono text-[11px] text-gold/50 mt-0.5">Founder & CEO · Vanorika Technologies</p>
              </div>

              {/* Bug Bounty */}
              <div className="space-y-3">
                <p className="font-mono text-[10px] text-white/25 uppercase tracking-wider">Bug Bounty Profiles</p>
                {[
                  { label: "HackerOne", href: siteConfig.bugBounty.hackerone, handle: "panashesec" },
                  { label: "Bugcrowd", href: siteConfig.bugBounty.bugcrowd, handle: "donovanmudarikwa1" },
                ].map((b) => (
                  <a
                    key={b.label}
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0D0D1A] border border-[#1A1A30] hover:border-gold/20 transition-all group"
                  >
                    <div>
                      <p className="text-white/70 text-xs font-medium group-hover:text-white transition-colors">{b.label}</p>
                      <p className="font-mono text-[10px] text-gold/50">{b.handle}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-gold/50 transition-colors" />
                  </a>
                ))}
              </div>

              {/* CTA */}
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-lg text-sm uppercase tracking-wider hover:bg-gold-light transition-all gold-glow-sm"
              >
                Start Free Assessment
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
