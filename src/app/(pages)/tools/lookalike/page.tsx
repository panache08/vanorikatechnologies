import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ToolRunner from "@/components/sections/tool-runner";
import type { Metadata } from "next";
import { Copy } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/lookalike" },
  title: "Free Lookalike Domain Finder",
  description:
    "Find lookalike and typosquat domains impersonating your business: the common misspellings and homoglyphs that attackers register for phishing. Free tool from Vanorika Technologies, Harare.",
};

export default function LookalikePage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Copy className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Lookalike Domain Finder</h1>
          <p className="text-white/60 text-lg">Is someone registering domains that look like yours to phish your customers? Find out in seconds.</p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolRunner variant="lookalike" placeholder="yourbrand.co.zw" endpoint="/api/tools/lookalike" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
