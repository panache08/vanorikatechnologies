import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { CalendarClock, Video, Clock, ShieldCheck, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/book" },
  title: "Book a Free Consultation",
  description:
    "Book a free 30-minute consultation with Donovan Mudarikwa to discuss a security assessment, a website, or Zenvora. No obligation.",
};

// Calendly inline embed, themed to the Vanorika dark/gold palette.
const CAL_URL =
  "https://calendly.com/donovanmudarikwa/30min?hide_gdpr_banner=1&background_color=0d0d1a&text_color=f0ede8&primary_color=c9a84c";

export default function BookPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-14 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <CalendarClock className="w-3.5 h-3.5" /> BOOK A CALL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Book a Free Consultation</h1>
          <p className="text-white/60 text-lg">
            A free 30-minute call with Donovan: talk through a security assessment, a website, or Zenvora. No obligation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-white/50 text-sm">
            <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> 30 minutes</span>
            <span className="inline-flex items-center gap-2"><Video className="w-4 h-4 text-gold" /> Google Meet</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gold" /> No obligation</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-3xl overflow-hidden">
            <iframe
              src={CAL_URL}
              title="Book a consultation with Vanorika Technologies"
              className="w-full"
              style={{ height: "720px", border: "0" }}
              loading="lazy"
            />
          </div>
          <p className="text-center text-muted-foreground text-sm mt-8">
            Prefer to message first?{" "}
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline inline-flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
