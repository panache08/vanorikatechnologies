import Link from "next/link";
import { FileText, ArrowRight, Check } from "lucide-react";

export default function ReportBanner() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-[#0D0D1A] to-[#07070D] p-8 md:p-12">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-semibold tracking-widest text-gold border border-gold/30 rounded-full bg-gold/5 mb-4">
                <FileText className="w-3 h-3" /> FREE · INSTANT · BRANDED PDF
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                Get a complete security report on your website — <span className="text-gold">free</span>.
              </h2>
              <p className="text-white/55 text-sm max-w-xl mb-5">
                Enter your domain and we check it the way an attacker first would — SSL, security headers, email spoofing,
                and Data Protection Act 2021 exposure. See your grade instantly, get the full 5-page PDF.
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                {["Results in seconds", "Passive & non-intrusive", "Plain-English fixes"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5 text-white/45 text-xs">
                    <Check className="w-3.5 h-3.5 text-gold" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/report"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gold text-black font-bold hover:bg-gold-light transition-colors whitespace-nowrap gold-glow-sm"
              >
                Scan my site — get the report <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
