import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ToolRunner from "@/components/sections/tool-runner";
import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/email-security" },
  title: "Free Email Security Checker (SPF / DMARC)",
  description:
    "Check whether your domain is protected against email spoofing, with SPF, DMARC, and MX records analysed in seconds. A free tool from Vanorika Technologies, Harare. No login.",
};

export default function EmailSecurityPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Mail className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Email Security Checker</h1>
          <p className="text-white/60 text-lg">Is someone able to send email pretending to be your business? Check your SPF &amp; DMARC in seconds.</p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolRunner variant="email" placeholder="yourbusiness.co.zw" endpoint="/api/tools/email-security" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
