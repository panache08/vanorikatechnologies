import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technology insights, cybersecurity tips, and business security advice from Vanorika Technologies.",
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">TECH INSIGHTS</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-white/60 text-lg">Technology insights and business advice — coming soon.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card border border-border rounded-3xl p-14 flex flex-col items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center">
              <Clock className="w-7 h-7 text-electric" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">Articles Coming Soon</h2>
              <p className="text-muted-foreground leading-relaxed">
                Writing is in progress. Articles on web development, cybersecurity, and running a tech business in Zimbabwe will be published here as they&apos;re ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
