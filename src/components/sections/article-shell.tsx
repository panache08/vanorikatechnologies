import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, MessageCircle, ArrowRight, Linkedin, Twitter, Share2, ShieldCheck } from "lucide-react";
import { siteConfig, blogPosts, SITE_URL } from "@/lib/data";
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

  // Resolve this post (for share links) and pick 2 related — same category first.
  const post = blogPosts.find((p) => p.title === title);
  const shareUrl = post ? `${SITE_URL}/blog/${post.slug}` : SITE_URL;
  const u = encodeURIComponent(shareUrl);
  const t = encodeURIComponent(title);
  const shares = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: Twitter },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: Linkedin },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: MessageCircle },
  ];
  const related = [
    ...blogPosts.filter((p) => p.title !== title && p.category === category),
    ...blogPosts.filter((p) => p.title !== title && p.category !== category),
  ].slice(0, 2);

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

          {/* Share */}
          <div className="mt-12 flex items-center gap-3 border-t border-border pt-6">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground text-sm font-medium"><Share2 className="w-4 h-4" /> Share</span>
            {shares.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-card border border-gold/20 rounded-3xl p-8 md:p-10 text-center">
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

          {/* Author bio */}
          <div className="mt-12 flex items-start gap-4 bg-card border border-border rounded-2xl p-6">
            <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-[#07070D] font-bold font-display text-lg">DM</div>
            <div>
              <p className="text-foreground font-semibold text-sm">{siteConfig.founder}</p>
              <p className="text-gold/80 text-xs mb-2 inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> CompTIA A+, Security+ &amp; PenTest+ certified</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{siteConfig.founderBio}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="pb-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">Keep reading</h2>
            <div className="grid sm:grid-cols-2 gap-6 font-jost">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all hover:-translate-y-1 flex flex-col">
                  <div className="relative h-36 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-gold rounded-full bg-background/80 border border-gold/20">{p.category}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-playfair font-bold text-foreground text-base mb-2 group-hover:text-gold transition-colors leading-snug">{p.title}</h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-gold text-sm font-medium">
                      Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
