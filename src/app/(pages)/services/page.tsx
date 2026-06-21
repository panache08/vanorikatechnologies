import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import { services } from "@/lib/data";
import { Globe, Code2, Smartphone, Shield, Brain, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Services",
  description: "Penetration testing, web development, custom software, mobile apps, and technical support — delivered by a CompTIA PenTest+ certified professional in Harare, Zimbabwe.",
};

const iconMap: Record<string, React.ElementType> = { Globe, Code2, Smartphone, Shield, Brain };

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">WHAT WE OFFER</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-white/60 text-lg">Five services. Quoted honestly. Delivered on time.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <div key={service.id} id={service.id} className="bg-card border border-border rounded-3xl p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-electric border border-electric/30 rounded-full bg-electric/5 mb-1">SERVICE</span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{service.title}</h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-electric shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-[#07070D] font-bold rounded-xl hover:bg-electric-light transition-all text-sm gold-glow-sm">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
