import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import { CheckCircle, Zap, Target, Eye, Heart } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "About Us",
  description: "Donovan Mudarikwa — CompTIA A+, Security+, and PenTest+ certified. Founder & CEO of Vanorika Technologies. Penetration tester and web developer based in Harare, Zimbabwe.",
};

const values = [
  { icon: Target, title: "Excellence", desc: "We don't send work we wouldn't put our name on. Every project gets the same attention whether it's $300 or $3000." },
  { icon: Heart, title: "Client-First", desc: "We tell clients what they need to hear, not what they want to hear. That's more useful long term." },
  { icon: Zap, title: "Staying Current", desc: "We stay current so we can tell you what actually works — not just what's trendy." },
  { icon: CheckCircle, title: "Transparency", desc: "Fixed quotes. Real timelines. You always know where things stand." },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#07070D] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-gold/4 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-[10px] text-gold/60 uppercase tracking-[0.25em] mb-5 inline-flex items-center label-line">
            Our Story
          </p>
          <h1 className="font-display font-black text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            About Vanorika
          </h1>
          <p className="text-white/45 text-lg font-light">
            One certified founder. Founder-led engagements. Based in Harare.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 bg-[#0D0D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-[10px] text-gold/60 uppercase tracking-[0.2em] mb-5 flex items-center label-line">
                Founder & CEO
              </p>
              <h2 className="font-display font-black text-white text-4xl mb-1" style={{ letterSpacing: "-0.02em" }}>
                {siteConfig.founder}
              </h2>
              <p className="font-mono text-[11px] text-gold/50 mb-7 uppercase tracking-wider">
                {siteConfig.founderTitle} · Vanorika Technologies
              </p>
              <div className="space-y-4 text-white/45 text-sm leading-relaxed font-light">
                <p>
                  I&apos;m Donovan Mudarikwa — a certified penetration tester and web developer based in Harare, Zimbabwe. I hold CompTIA A+, Security+, and PenTest+ certifications and work directly with clients on cybersecurity and web projects.
                </p>
                <p>
                  I started Vanorika Technologies because most Zimbabwean businesses have no idea what their security exposure looks like — and web developers here are either too expensive or too slow.
                </p>
                <p>
                  We work directly with every client — no middlemen, no junior developers, no outsourcing. When you hire Vanorika Technologies, you get the founder handling your project from start to finish.
                </p>
                <p>
                  Our main focus is cybersecurity assessments and web development. If you need a pentest, a website, or both — we handle it personally.
                </p>
              </div>
              <div className="mt-8 p-6 border border-gold/15 rounded-2xl bg-gold/3">
                <p className="text-white/70 italic text-sm leading-relaxed">&ldquo;Most businesses in Zimbabwe find out they&apos;ve been hacked after the damage is done. I&apos;d rather you found out from us first.&rdquo;</p>
                <p className="font-mono text-[11px] text-gold/60 mt-3 uppercase tracking-wider">— {siteConfig.founder}, Founder & CEO</p>
              </div>
            </div>

            {/* Profile Card */}
            <div>
              <div className="rounded-2xl border border-[#1A1A30] bg-[#07070D] p-10 text-center">
                <div className="w-24 h-24 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6 gold-glow-sm">
                  <span className="font-display font-black text-gold text-3xl">DM</span>
                </div>
                <h3 className="font-display font-bold text-white text-xl">{siteConfig.founder}</h3>
                <p className="font-mono text-[11px] text-gold/50 mt-1 uppercase tracking-wider">{siteConfig.founderTitle}</p>
                <p className="text-white/30 text-xs mt-0.5">Vanorika Technologies · Harare, Zimbabwe</p>

                <div className="mt-7 grid grid-cols-3 gap-4 pt-6 border-t border-[#1A1A30]">
                  {siteConfig.certifications.map((c) => (
                    <div key={c.abbr} className="text-center">
                      <p className="font-mono font-bold text-gold text-sm">{c.abbr}</p>
                      <p className="text-white/30 text-[10px] mt-0.5">{c.desc.split(" ")[0]}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 block w-full py-3.5 bg-gold text-[#07070D] font-bold rounded-xl text-sm hover:bg-gold-light transition-all gold-glow-sm uppercase tracking-wider"
                >
                  Chat With Us Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#07070D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#1A1A30] bg-[#0D0D1A] p-10 hover:border-gold/20 transition-all">
              <Target className="w-9 h-9 text-gold mb-5" />
              <h3 className="font-display font-bold text-white text-xl mb-3">Our Mission</h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                To give Zimbabwean businesses an honest picture of their security exposure and build websites that actually bring in clients — at prices that don&apos;t require a loan.
              </p>
            </div>
            <div className="rounded-2xl border border-[#1A1A30] bg-[#0D0D1A] p-10 hover:border-gold/20 transition-all">
              <Eye className="w-9 h-9 text-gold mb-5" />
              <h3 className="font-display font-bold text-white text-xl mb-3">Our Vision</h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                To be the first call Harare businesses make when they need a website built properly or want to know if their systems are secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0D0D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="What We Stand For" title="Our Core Values" centered />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-[#1A1A30] bg-[#07070D] p-6 hover:border-gold/20 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-gold/8 border border-gold/12 flex items-center justify-center mb-4 group-hover:bg-gold/12 transition-colors">
                  <v.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-semibold text-white/85 text-[15px] mb-2">{v.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
