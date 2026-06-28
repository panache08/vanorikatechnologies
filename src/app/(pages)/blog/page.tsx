import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Newsletter from "@/components/sections/newsletter";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
  title: "Blog",
  description: "Cybersecurity insights and practical security advice for Zimbabwe businesses — from CompTIA PenTest+ certified Vanorika Technologies.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">SECURITY INSIGHTS</span>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="font-jost text-white/60 text-lg">Plain-English cybersecurity advice for Zimbabwe businesses.</p>
          <Link href="/cybersecurity-zimbabwe" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 border border-gold/30 text-gold text-sm font-semibold rounded-xl hover:bg-gold/10 transition-all">
            Read the complete Cybersecurity Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-gold rounded-full bg-background/80 border border-gold/20">{post.category}</span>
                </div>
                <div className="p-6 flex flex-col flex-1 font-jost">
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
                    <span>{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h2 className="font-playfair font-bold text-foreground text-xl mb-2 group-hover:text-gold transition-colors leading-snug">{post.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-gold text-sm font-medium">
                    Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
