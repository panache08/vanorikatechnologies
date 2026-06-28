import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ServiceJsonLd } from "@/components/seo/json-ld";

type Feature = { icon: LucideIcon; title: string; desc: string };
type Cta = { label: string; href: string };

export default function ServiceLanding({
  badge, BadgeIcon, title, intro, path, serviceDescription,
  primary, secondary, features, included, price, blogLink,
}: {
  badge: string;
  BadgeIcon: LucideIcon;
  title: string;
  intro: string;
  path: string;
  serviceDescription: string;
  primary: Cta;
  secondary: Cta;
  features: Feature[];
  included: string[];
  price: { label: string; value: string; note: string };
  blogLink?: { href: string; text: string };
}) {
  return (
    <main>
      <ServiceJsonLd name={title} description={serviceDescription} path={path} price={price.value} />
      <Navbar />
      <section className="relative pt-28 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            className="mb-10"
            items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: badge, path }]}
          />
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
              <BadgeIcon className="w-3.5 h-3.5" /> {badge.toUpperCase()}
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">{title}</h1>
            <p className="text-white/60 text-lg">{intro}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link href={primary.href} className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
                {primary.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={secondary.href} className="inline-flex items-center gap-2 px-6 py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm uppercase tracking-wider">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-7 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-gold" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included + pricing */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">What you get</h2>
            <ul className="space-y-3">
              {included.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-gold/20 rounded-3xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-1">{price.label}</p>
            <p className="font-display text-5xl font-bold text-gold mb-2">{price.value}</p>
            <p className="text-muted-foreground text-xs mb-6">{price.note}</p>
            <Link href="/pricing" className="block w-full text-center py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm mb-3">
              See full pricing
            </Link>
            <Link href="/contact" className="block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
              {primary.label}
            </Link>
            {blogLink && (
              <p className="text-muted-foreground/60 text-xs mt-4">
                <Link href={blogLink.href} className="text-gold underline">{blogLink.text}</Link>
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
