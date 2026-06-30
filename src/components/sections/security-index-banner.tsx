import Link from "next/link";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { SCAN_SAMPLE, STAT_FAILING, AVG_GRADE } from "@/lib/security-index";

export default function SecurityIndexBanner() {
  return (
    <section className="py-16 bg-card/30 border-y border-gold/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-[#0D0D1A] to-[#07070D] p-8 md:p-12">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-semibold tracking-widest text-gold border border-gold/30 rounded-full bg-gold/5 mb-4">
                <ShieldAlert className="w-3 h-3" /> NEW · LIVE INDEX
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                We graded Zimbabwe&apos;s biggest websites on security.
                <span className="text-gold"> Most are failing.</span>
              </h2>
              <p className="text-white/55 text-sm max-w-xl">
                {STAT_FAILING} of {SCAN_SAMPLE} prominent organisations scored an F. The national average is a{" "}
                <strong className="text-white">{AVG_GRADE}</strong>. See where every sector stands — and whether your
                business is exposed.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/security-index"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light transition-colors whitespace-nowrap"
              >
                View the Index <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
