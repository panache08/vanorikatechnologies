import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, AlertTriangle, type LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ServiceJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/data";

type Risk = { title: string; desc: string };

export default function IndustryLanding({
  industry, path, BadgeIcon, title, intro, serviceDescription, stakes, risks, help,
}: {
  industry: string;
  path: string;
  BadgeIcon: LucideIcon;
  title: string;
  intro: string;
  serviceDescription: string;
  stakes: string;
  risks: Risk[];
  help: { label: string; href: string }[];
}) {
  return (
    <main>
      <ServiceJsonLd name={title} description={serviceDescription} path={path} />
      <Navbar />
      <section className="relative pt-28 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs className="mb-10" items={[{ name: "Home", path: "/" }, { name: "Industries", path: "/services" }, { name: industry, path }]} />
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
              <BadgeIcon className="w-3.5 h-3.5" /> {industry.toUpperCase()}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
            <p className="text-white/60 text-lg">{intro}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
                Get a Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/tools/security-check" className="inline-flex items-center gap-2 px-6 py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm uppercase tracking-wider">
                Free Security Check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stakes */}
      <section className="py-16 bg-muted/20 border-y border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-8 h-8 text-gold mx-auto mb-4" />
          <p className="text-foreground text-lg leading-relaxed">{stakes}</p>
        </div>
      </section>

      {/* Risks */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">The risks for {industry.toLowerCase()}</h2>
            <p className="text-muted-foreground mt-3">The threats we see most often in this sector.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {risks.map((r) => (
              <div key={r.title} className="bg-card border border-border rounded-2xl p-7 hover:border-gold/40 transition-all">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center">How we help</h2>
          <div className="space-y-2">
            {help.map((h) => (
              <Link key={h.href} href={h.href}
                className="flex items-center justify-between gap-3 bg-card border border-border rounded-xl px-5 py-4 hover:border-gold/40 transition-all group">
                <span className="text-foreground text-sm font-medium group-hover:text-gold transition-colors">{h.label}</span>
                <ArrowRight className="w-4 h-4 text-gold shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
              Talk to us about your {industry.toLowerCase().replace(/s$/, "")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
