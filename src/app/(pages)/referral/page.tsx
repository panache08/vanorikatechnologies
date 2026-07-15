"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Gift, Users, Percent, Share2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function ReferralPage() {
  const shareMsg = encodeURIComponent(
    `I use Vanorika Technologies for cybersecurity and web work in Zimbabwe, worth a look. They give free security assessments: ${siteConfig.website}`,
  );
  const referMsg = encodeURIComponent("Hi Donovan, I'd like to refer a business to you under your referral programme.");

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Gift className="w-3.5 h-3.5" /> REFERRAL PROGRAMME
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Refer a business, you both win</h1>
          <p className="text-white/60 text-lg">
            Know a Zimbabwean business that needs a secure website or a security check? Refer them. When they take on a paid engagement,
            <span className="text-gold"> you both get 20% off.</span>
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Share2, t: "1. Refer them", d: "Share Vanorika with a business that needs it." },
              { icon: Users, t: "2. They engage", d: "They take on a paid project or audit." },
              { icon: Percent, t: "3. You both save", d: "20% off for them, and 20% off your next project." },
            ].map((c) => (
              <div key={c.t} className="bg-card border border-border rounded-2xl p-5">
                <c.icon className="w-6 h-6 text-gold mb-3" />
                <p className="text-foreground text-sm font-semibold">{c.t}</p>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/20 rounded-3xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Make a referral</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-7 max-w-md mx-auto">
              Send us their details over WhatsApp, or share Vanorika directly and tell us their name so we can credit you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${referMsg}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm gold-glow-sm">
                <MessageCircle className="w-4 h-4" /> Refer over WhatsApp
              </a>
              <a href={`https://wa.me/?text=${shareMsg}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all text-sm font-semibold">
                <Share2 className="w-4 h-4" /> Share Vanorika
              </a>
            </div>
          </div>

          <p className="text-muted-foreground/60 text-xs text-center mt-6">Discount applies to the referred business&apos;s first paid engagement and your next one. One referral credit per project.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
