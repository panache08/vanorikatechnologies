import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ToolRunner from "@/components/sections/tool-runner";
import type { Metadata } from "next";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/ssl" },
  title: "SSL Certificate Checker",
  description: "Check any website's SSL certificate: expiry date, issuer, and coverage. Free, passive, no login.",
};

export default function SslCheckPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Lock className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">SSL Certificate Checker</h1>
          <p className="text-white/60 text-lg">See when a certificate expires, who issued it, and what it covers. All before it lapses.</p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolRunner variant="ssl" placeholder="yourbusiness.co.zw" endpoint="/api/tools/ssl" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
