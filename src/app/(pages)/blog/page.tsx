import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import SectionHeader from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technology insights, cybersecurity tips, AI trends, and business technology advice from Panashe Tech Solutions.",
};

const categoryColors: Record<string, string> = {
  "Business Technology": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Cybersecurity": "bg-red-500/10 text-red-400 border-red-500/20",
  "AI & Technology": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Cloud Services": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "Mobile Development": "bg-green-500/10 text-green-400 border-green-500/20",
  "Web Development": "bg-electric/10 text-electric border-electric/20",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts as typeof blogPosts;
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">TECH INSIGHTS</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-white/60 text-lg">Technology insights and business advice from our team.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          <div className="mb-16 grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border hover:border-electric/30 transition-all group">
            <div className="relative h-72 lg:h-auto overflow-hidden">
              <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50" />
            </div>
            <div className="bg-card p-10 flex flex-col justify-center">
              <span className={`self-start px-3 py-1 text-xs font-semibold border rounded-full mb-4 ${categoryColors[featured.category] || "bg-electric/10 text-electric border-electric/20"}`}>
                {featured.category}
              </span>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-electric transition-colors">{featured.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-muted-foreground text-xs mb-6">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(featured.date)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="self-start inline-flex items-center gap-2 px-6 py-3 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all text-sm">
                Read Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Grid */}
          <SectionHeader badge="ALL ARTICLES" title="More" titleGradient="Insights" />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-electric/40 transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>
                <div className="p-6">
                  <span className={`inline-block px-2.5 py-1 text-xs font-semibold border rounded-full mb-3 ${categoryColors[post.category] || "bg-electric/10 text-electric border-electric/20"}`}>
                    {post.category}
                  </span>
                  <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-electric transition-colors leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-muted-foreground text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span className="text-electric text-xs font-medium flex items-center gap-1">Read <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
