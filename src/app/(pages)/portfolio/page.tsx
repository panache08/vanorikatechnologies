import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { portfolio } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio" },
  title: "Portfolio",
  description: "Explore our portfolio of completed projects — websites, apps, software, and digital solutions for businesses across Zimbabwe.",
};

export default function PortfolioPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">OUR WORK</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Portfolio</h1>
          <p className="text-white/60 text-lg">Real projects. Real results. Real businesses transformed.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="CASE STUDIES" title="Featured" titleGradient="Projects"
            subtitle="Each project represents a unique challenge solved with innovative technology." />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((p) => (
              <div key={p.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-electric/40 transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-52 overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${p.color}`}>{p.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-foreground text-xl mb-2 group-hover:text-electric transition-colors">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map((t) => (
                      <span key={t} className="px-2 py-1 text-xs font-medium bg-electric/10 text-electric rounded-md border border-electric/20">{t}</span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground">Result</p>
                    <p className="text-green-500 text-sm">✅ {p.result}</p>
                  </div>
                  {"url" in p && p.url && (
                    <a
                      href={(p as { url: string }).url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-electric/10 border border-electric/30 text-electric text-sm font-semibold hover:bg-electric/20 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Live Site
                    </a>
                  )}
                </div>
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
