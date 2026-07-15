import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ShoppingCart, LayoutTemplate, SearchCheck, Smartphone, Gauge, ArrowRight, Check } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ServiceJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/web-development" },
  title: "Website Development in Zimbabwe",
  description:
    "Professional website development for Zimbabwe businesses: fast, mobile-ready sites built in 1 to 2 weeks with EcoCash/Paynow integration and SEO setup. You own everything. From $299.",
};

const builds = [
  { icon: Globe, title: "Business Websites", desc: "Professional, mobile-ready sites that load fast and turn visitors into enquiries, not just compliments." },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Online stores with EcoCash, Paynow, and card payment integration, inventory, and order management." },
  { icon: LayoutTemplate, title: "Landing Pages", desc: "High-converting single pages for a campaign, product, or launch, built to capture leads." },
  { icon: SearchCheck, title: "SEO Setup", desc: "Proper titles, structured data, sitemaps, and speed, so customers can actually find you on Google." },
  { icon: Smartphone, title: "Mobile-First", desc: "Most Zimbabwean traffic is on a phone. Every site is built and tested for mobile from the ground up." },
  { icon: Gauge, title: "Fast & Secure", desc: "Modern hosting, HTTPS, and security hardening as standard. Built by a security company, after all." },
];

export default function WebDevelopmentPage() {
  return (
    <main>
      <ServiceJsonLd
        name="Website Development in Zimbabwe"
        description="Professional website and e-commerce development for Zimbabwean businesses: fast, mobile-ready sites with EcoCash/Paynow integration and SEO setup, built in 1 to 2 weeks."
        path="/web-development"
        price="from $299"
      />
      <Navbar />
      <section className="relative pt-28 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs className="mb-8 text-left" items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Web Development", path: "/web-development" }]} />
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Globe className="w-3.5 h-3.5" /> WEB DEVELOPMENT
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Website Development in Zimbabwe</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A website that works, not just one that looks good in a browser. Built in 1 to 2 weeks, mobile-ready, fast, and set up to bring
            you enquiries. You own everything.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm uppercase tracking-wider">
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">What we build</h2>
            <p className="text-muted-foreground mt-3">Everything a Zimbabwean business needs to win customers online.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-2xl p-7 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <b.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You get + pricing */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">What every site includes</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              No nasty surprises and no charging extra for the basics. As standard, you get:
            </p>
            <ul className="space-y-3">
              {["Full ownership: code, design, content, and domain", "Mobile-responsive on every device", "Fast loading and clean, modern design", "Basic SEO setup so you can be found", "HTTPS and security hardening", "A working contact path, tested before launch"].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-gold/20 rounded-3xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-1">Professional websites</p>
            <p className="font-display text-5xl font-bold text-gold mb-2">from $299</p>
            <p className="text-muted-foreground text-xs mb-6">Once-off. Starter $299 · Business $799 · Custom from there.</p>
            <Link href="/pricing" className="block w-full text-center py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm mb-3">
              See full pricing
            </Link>
            <Link href="/contact" className="block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
              Start Your Project
            </Link>
            <p className="text-muted-foreground/60 text-xs mt-4">
              Wondering what&apos;s fair?{" "}
              <Link href="/blog/how-much-website-cost-zimbabwe" className="text-gold underline">What a website really costs in Zimbabwe</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
