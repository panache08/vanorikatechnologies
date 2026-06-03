import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import { CheckCircle, Zap, Target, Eye, Heart } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Panashe Tech Solutions, founder Donovan Mudarikwa, our mission, values, and commitment to transforming businesses through technology.",
};

const values = [
  { icon: Target, title: "Excellence", desc: "I deliver nothing short of the best. Every line of code, every design, every interaction reflects my commitment to quality." },
  { icon: Heart, title: "Client-First", desc: "Your success is my success. I make decisions based on what is best for your business, not what is easiest for me." },
  { icon: Zap, title: "Innovation", desc: "I stay ahead of technology trends so my clients always have access to the most powerful and modern solutions." },
  { icon: CheckCircle, title: "Transparency", desc: "Clear pricing, honest timelines, and open communication throughout every project. No surprises, ever." },
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
          <p className="text-white/60 text-lg">Built by one person with a passion for technology and a mission to transform businesses.</p>
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
                  I am Donovan Mudarikwa — a technology entrepreneur based in Harare, Zimbabwe, with a deep passion for building digital solutions that help businesses grow and succeed.
                </p>
                <p>
                  I founded Panashe Tech Solutions with one clear goal: to make world-class technology accessible to businesses in Zimbabwe and across Africa at prices that make sense.
                </p>
                <p>
                  I work directly with every client — no middlemen, no junior developers, no outsourcing. When you hire Panashe Tech Solutions, you get me personally handling your project from start to finish.
                </p>
                <p>
                  My expertise spans web development, mobile applications, custom software, cloud infrastructure, cybersecurity, and AI integration. Whatever your technology challenge, I have the skills to solve it.
                </p>
              </div>
              <div className="mt-8 p-6 bg-electric/5 border border-electric/20 rounded-2xl">
                <p className="text-foreground italic">&ldquo;Technology should be an enabler, not a barrier. My goal is to ensure every business in Zimbabwe has access to the digital tools they need to compete and thrive in the modern world.&rdquo;</p>
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
                  {[["20+", "Projects"], ["15+", "Clients"], ["5+", "Years"]].map(([v, l]) => (
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
              <p className="text-muted-foreground leading-relaxed">To deliver premium technology solutions that drive real business results — helping companies across Zimbabwe and Africa compete on a global stage through digital innovation, accessible pricing, and unmatched personal service.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-10 hover:border-cyan/30 transition-all">
              <Eye className="w-10 h-10 text-cyan mb-6" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">My Vision</h3>
              <p className="text-muted-foreground leading-relaxed">To be recognized as Zimbabwe&apos;s most trusted technology solutions provider — known for quality, integrity, and transformative impact. I envision a future where every African business has the technology it needs to grow and succeed.</p>
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
