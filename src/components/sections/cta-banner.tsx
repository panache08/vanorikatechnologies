"use client";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";
import LeadCaptureModal from "@/components/lead-capture-modal";

export default function CTABanner() {
  return (
    <section className="relative py-24 bg-[#0D0D1A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] text-gold/60 uppercase tracking-[0.25em] mb-4 label-line inline-flex items-center">
            Get Started
          </p>

          <h2 className="font-display font-black text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}>
            Ready to Secure Your Business?
          </h2>

          <p className="text-white/45 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Whether you need a penetration test, a professional website, or both: we respond within 2 hours and can start your engagement in under 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LeadCaptureModal
              source="CTA banner"
              label="WhatsApp Us Now"
              icon={<MessageCircle className="w-4.5 h-4.5" style={{ width: "18px", height: "18px" }} />}
              whatsappMessage="Hello! I'd like to discuss a project with Vanorika Technologies."
              heading="Let's get started"
              subheading="Leave your name and best contact. We reply within 2 hours. We'll open WhatsApp now so you can message us straight away."
              className="flex items-center gap-2.5 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow text-sm uppercase tracking-wider"
            />
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 px-7 py-4 border border-[#252545] text-white/65 hover:text-white hover:border-gold/30 rounded-xl transition-all text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              {siteConfig.email}
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
