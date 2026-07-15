"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { GraduationCap, Video, Clock, Users, CalendarClock, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function ClinicPage() {
  const waitlist = encodeURIComponent("Hi Donovan, please add me to the waitlist for the free Zimbabwe SME cybersecurity clinic.");

  const topics = [
    "The 5 security gaps we find in almost every Harare business",
    "How to stop attackers spoofing email from your domain",
    "Data Protection Act (2021): what you actually have to do",
    "Spotting phishing before your staff click it",
    "What a penetration test is, and when you need one",
  ];

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <GraduationCap className="w-3.5 h-3.5" /> FREE CLINIC
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Free Cybersecurity Clinic for Zimbabwe SMEs</h1>
          <p className="text-white/60 text-lg">A free, no-jargon online session on protecting your business online. Practical, local, and built for owners, not engineers.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-white/50 text-sm">
            <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> 30 minutes</span>
            <span className="inline-flex items-center gap-2"><Video className="w-4 h-4 text-gold" /> Online</span>
            <span className="inline-flex items-center gap-2"><Users className="w-4 h-4 text-gold" /> SME owners</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-5">What we cover</h2>
          <ul className="space-y-3 mb-10">
            {topics.map((t) => (
              <li key={t} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                <div className="w-6 h-6 rounded-md bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-gold" />
                </div>
                <span className="text-foreground text-sm">{t}</span>
              </li>
            ))}
          </ul>

          <div className="bg-card border border-gold/20 rounded-3xl p-8 text-center">
            <CalendarClock className="w-9 h-9 text-gold mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Join the next session</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-7 max-w-md mx-auto">
              We run these regularly. Join the waitlist and we&apos;ll message you the next date, or book a private 1-on-1 session now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${waitlist}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm gold-glow-sm">
                <MessageCircle className="w-4 h-4" /> Join the waitlist
              </a>
              <Link href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold rounded-xl hover:bg-gold/10 transition-all text-sm font-semibold">
                <Video className="w-4 h-4" /> Book a private session
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
