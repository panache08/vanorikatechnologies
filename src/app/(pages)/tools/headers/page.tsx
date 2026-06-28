import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ToolRunner from "@/components/sections/tool-runner";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/headers" },
  title: "Free Security Headers Checker",
  description:
    "Check whether your website sends the right security headers — HSTS, CSP, X-Frame-Options and more. Free, passive grader from Vanorika Technologies, Harare.",
};

export default function HeadersPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Security Headers Checker</h1>
          <p className="text-white/60 text-lg">Is your website sending the security headers that protect your visitors? Grade it in seconds.</p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolRunner variant="headers" placeholder="yourbusiness.co.zw" endpoint="/api/tools/headers" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
