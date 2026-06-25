import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ToolRunner from "@/components/sections/tool-runner";
import type { Metadata } from "next";
import { Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Subdomain Finder",
  description: "Discover a domain's subdomains from public certificate transparency logs — see your real attack surface. Free and passive.",
};

export default function SubdomainsPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Network className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Subdomain Finder</h1>
          <p className="text-white/60 text-lg">
            Discover subdomains from public certificate transparency logs — the same first step an attacker takes to map your attack surface.
          </p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolRunner variant="subdomains" placeholder="yourbusiness.co.zw" endpoint="/api/tools/subdomains" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
