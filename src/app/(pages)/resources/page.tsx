import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Newsletter from "@/components/sections/newsletter";
import type { Metadata } from "next";
import { FileText, ShieldCheck, ClipboardCheck, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Free Resources",
  description:
    "Free branded PDFs for Zimbabwe businesses — a website security checklist, a Data Protection Act 2021 compliance guide for SMEs, and a self-assessment.",
};

const resources = [
  {
    icon: ShieldCheck,
    title: "Zimbabwe Website Security Checklist",
    desc: "A no-jargon checklist covering SSL, security headers, software updates, and data handling. Tick each item — anything unchecked is worth fixing.",
    file: "/resources/vanorika-website-security-checklist.pdf",
  },
  {
    icon: FileText,
    title: "DPA 2021 Compliance Guide for SMEs",
    desc: "A plain-English starting point for Zimbabwe's Cyber and Data Protection Act — what it requires, what non-compliance costs, and a first-90-days checklist.",
    file: "/resources/vanorika-dpa-2021-compliance-guide.pdf",
  },
  {
    icon: ClipboardCheck,
    title: "“Is My Website Secure?” Self-Assessment",
    desc: "Score yourself in two minutes. Eight honest questions that tell you how exposed your website is right now — and what to do about it.",
    file: "/resources/vanorika-is-my-website-secure-self-assessment.pdf",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">FREE DOWNLOADS</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Resources</h1>
          <p className="text-white/60 text-lg">Practical, branded guides for Zimbabwe businesses. Free to download and share — no email required.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((r) => (
              <div key={r.title} className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:border-gold/40 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                  <r.icon className="w-6 h-6 text-gold" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-3 leading-snug">{r.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">{r.desc}</p>
                <a href={r.file} download
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gold text-[#07070D] hover:bg-gold-light transition-all gold-glow-sm">
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground/60 text-xs mt-8">Free resources. Share freely. Not legal advice.</p>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
