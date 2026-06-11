import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import { CheckCircle, Zap, Target, Eye, Heart } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "About Us",
  description: "Donovan Mudarikwa — CompTIA A+, Security+, and PenTest+ certified. Penetration tester and web developer based in Harare, Zimbabwe.",
};

const values = [
  { icon: Target, title: "Excellence", desc: "I don't send work I wouldn't put my name on. Every project gets the same attention whether it's $300 or $3000." },
  { icon: Heart, title: "Client-First", desc: "I tell clients what they need to hear, not what they want to hear. That's more useful long term." },
  { icon: Zap, title: "Staying Current", desc: "I stay current so I can tell you what actually works — not just what's trendy." },
  { icon: CheckCircle, title: "Transparency", desc: "Fixed quotes. Real timelines. You always know where things stand." },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">MY STORY</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">About Me</h1>
          <p className="text-white/60 text-lg">One person. Certified. Based in Harare. I do the work myself.</p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-electric border border-electric/30 rounded-full bg-electric/5 mb-6">FOUNDER & CEO</span>
              <h2 className="font-display text-4xl font-bold text-foreground mb-2">{siteConfig.founder}</h2>
              <p className="text-electric font-medium mb-6">{siteConfig.founderTitle} · Panashe Tech Solutions</p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m Donovan Mudarikwa — a certified penetration tester and web developer based in Harare, Zimbabwe. I hold CompTIA A+, Security+, and PenTest+ certifications and work directly with clients on cybersecurity and web projects.
                </p>
                <p>
                  I started Panashe Tech Solutions because most Zimbabwean businesses have no idea what their security exposure looks like — and web developers here are either too expensive or too slow.
                </p>
                <p>
                  I work directly with every client — no middlemen, no junior developers, no outsourcing. When you hire Panashe Tech Solutions, you get me personally handling your project from start to finish.
                </p>
                <p>
                  My main focus is cybersecurity assessments and web development. If you need a pentest, a website, or both — I handle it personally.
                </p>
              </div>
              <div className="mt-8 p-6 bg-electric/5 border border-electric/20 rounded-2xl">
                <p className="text-foreground italic">&ldquo;Most businesses in Zimbabwe find out they&apos;ve been hacked after the damage is done. I&apos;d rather you found out from me first.&rdquo;</p>
                <p className="text-electric font-semibold mt-3">— {siteConfig.founder}, Founder & CEO</p>
              </div>
            </div>

            {/* Profile Card */}
            <div className="flex flex-col gap-6">
              <div className="bg-card border border-border rounded-3xl p-10 text-center">
                <div className="w-28 h-28 rounded-2xl bg-electric-gradient flex items-center justify-center mx-auto mb-6 text-4xl font-bold text-white blue-glow">
                  DM
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">{siteConfig.founder}</h3>
                <p className="text-electric text-sm mt-1">{siteConfig.founderTitle}</p>
                <p className="text-muted-foreground text-sm mt-1">Panashe Tech Solutions</p>
                <p className="text-muted-foreground text-xs mt-1">📍 Harare, Zimbabwe</p>
                <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  {[["A+", "CompTIA Certified"], ["Sec+", "Security Certified"], ["PenTest+", "Pentest Certified"]].map(([v, l]) => (
                    <div key={l} className="text-center">
                      <p className="font-display text-2xl font-bold text-electric">{v}</p>
                      <p className="text-muted-foreground text-xs">{l}</p>
                    </div>
                  ))}
                </div>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="mt-6 block w-full py-3 bg-electric text-white font-semibold rounded-xl text-sm hover:bg-electric-dark transition-all">
                  Chat with Me Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-10 hover:border-electric/30 transition-all">
              <Target className="w-10 h-10 text-electric mb-6" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">My Mission</h3>
              <p className="text-muted-foreground leading-relaxed">To give Zimbabwean businesses an honest picture of their security exposure and build websites that actually bring in clients — at prices that don&apos;t require a loan.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-10 hover:border-cyan/30 transition-all">
              <Eye className="w-10 h-10 text-cyan mb-6" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">My Vision</h3>
              <p className="text-muted-foreground leading-relaxed">To be the first call Harare businesses make when they need a website built properly or want to know if their systems are secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="WHAT I STAND FOR" title="My Core" titleGradient="Values" />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-2xl p-6 hover:border-electric/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                  <v.icon className="w-5 h-5 text-electric" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
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
