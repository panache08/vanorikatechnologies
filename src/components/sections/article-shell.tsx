import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { Clock, ArrowLeft, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { ArticleJsonLd } from "@/components/seo/json-ld";

type CTA = { heading: string; text: string; label: string; href: string };

export default function ArticleShell({
  category, title, date, readTime, intro, cta, children,
}: {
  category: string;
  title: string;
  date: string;
  readTime: string;
  intro: string;
  cta: CTA;
  children: React.ReactNode;
}) {
  const isWhatsApp = cta.href.startsWith("http");
  return (
    <main>
      <ArticleJsonLd title={title} />
      <Navbar />

      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-gold/70 hover:text-gold text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
          <span className="block px-3 py-1 w-fit text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-5">{category.toUpperCase()}</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">{title}</h1>
          <div className="font-jost flex items-center gap-4 text-white/50 text-sm">
            <span>{new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readTime}</span>
          </div>
        </div>
      </section>

      <article className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 font-jost">
          <p className="text-foreground/90 text-xl leading-relaxed mb-10 font-light">{intro}</p>
          <div className="prose-article space-y-6 text-muted-foreground leading-relaxed [&_h2]:font-playfair [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-playfair [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_strong]:text-foreground [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_a]:text-gold [&_a]:underline">
            {children}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-card border border-gold/20 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="font-playfair text-2xl font-bold text-foreground mb-3">{cta.heading}</h2>
            <p className="text-muted-foreground leading-relaxed mb-7 max-w-xl mx-auto">{cta.text}</p>
            {isWhatsApp ? (
              <a href={cta.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" /> {cta.label}
              </a>
            ) : (
              <Link href={cta.href}
                className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
                {cta.label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <p className="text-muted-foreground/60 text-xs mt-5">Or message {siteConfig.phone} on WhatsApp.</p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
