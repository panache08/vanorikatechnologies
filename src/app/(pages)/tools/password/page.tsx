import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, ArrowRight } from "lucide-react";
import PasswordTool from "@/components/sections/password-tool";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/password" },
  title: "Free Password Strength Checker",
  description:
    "Test how strong your password is and how long it would take to crack, checked privately in your browser, nothing sent anywhere. A free tool from Vanorika Technologies, Harare.",
};

export default function PasswordPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <KeyRound className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Password Strength Checker</h1>
          <p className="text-white/60 text-lg">See how strong your password really is, and how fast an attacker could crack it.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PasswordTool />

          {/* CTA */}
          <div className="mt-16 max-w-2xl mx-auto bg-card border border-gold/20 rounded-3xl p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">Weak passwords are just one way in</h2>
            <p className="text-muted-foreground leading-relaxed mb-7">
              Most breaches we find in Harare don&apos;t start with a cracked password. They start with a missing security header or an
              unpatched system. Get a free passive scan of your website and see what an attacker would.
            </p>
            <Link href="/tools/security-check"
              className="inline-flex items-center gap-2 px-7 py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider">
              Run a free security check <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-muted-foreground/60 text-xs mt-5">Or message {siteConfig.phone} on WhatsApp.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
