import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldAlert, Check, X, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig, SITE_URL } from "@/lib/data";
import LeadCaptureModal from "@/components/lead-capture-modal";
import {
  SCAN_DATE,
  SCAN_SAMPLE,
  SCAN_SECTORS,
  SCORED,
  GRADE_COUNTS,
  AVG_GRADE,
  AVG_SCORE,
  SECTOR_SUMMARY,
  STAT_FAILING,
  STAT_TOP,
  STAT_NO_HSTS,
  STAT_NO_DMARC,
  CHECK_LABELS,
  type IndexGrade,
} from "@/lib/security-index";

export const metadata: Metadata = {
  alternates: { canonical: "/security-index" },
  title: "Zimbabwe Web Security Index: How the Country's Top Sites Score",
  description:
    "A live index grading the security posture of Zimbabwe's most prominent websites (HTTPS, security headers and email anti-spoofing) across banking, telecom, government, insurance, media and retail.",
  openGraph: {
    title: "Zimbabwe Web Security Index",
    description:
      "We graded the security of Zimbabwe's top organisations A to F. Most are failing. See where each sector stands.",
    url: `${SITE_URL}/security-index`,
    type: "website",
  },
};

const GRADE_COLOR: Record<IndexGrade, string> = {
  A: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  B: "text-lime-400 border-lime-400/40 bg-lime-400/10",
  C: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  D: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  F: "text-red-400 border-red-400/40 bg-red-400/10",
};

const claimUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  "Hi Vanorika, I saw the Zimbabwe Web Security Index. Is my organisation on the list? I'd like our free detailed security breakdown."
)}`;

function GradeBadge({ grade, big }: { grade: IndexGrade; big?: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center font-display font-black rounded-lg border ${GRADE_COLOR[grade]} ${
        big ? "w-14 h-14 text-2xl" : "w-8 h-8 text-sm"
      }`}
    >
      {grade}
    </span>
  );
}

export default function SecurityIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Zimbabwe Web Security Index",
    description:
      "Passive security grading of prominent Zimbabwean websites across HTTPS, security headers and email anti-spoofing.",
    creator: { "@type": "Organization", name: "Vanorika Technologies", url: SITE_URL },
    dateModified: SCAN_DATE,
    url: `${SITE_URL}/security-index`,
    measurementTechnique: "Passive external assessment of public signals (HTTPS, response headers, SPF/DMARC DNS records)",
  };

  return (
    <main>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-gold border border-gold/30 rounded-full bg-gold/5 mb-6">
            <ShieldAlert className="w-3.5 h-3.5" /> ZIMBABWE WEB SECURITY INDEX
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            How secure are Zimbabwe&apos;s biggest websites?
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-3">
            We ran a passive, external security check on{" "}
            <strong className="text-white">{SCAN_SAMPLE} prominent organisations</strong> across {SCAN_SECTORS} sectors,
            then graded each one A to F. The results are sobering.
          </p>
          <p className="text-white/30 text-xs font-mono">Last scanned {SCAN_DATE}</p>
        </div>
      </section>

      {/* Headline stats */}
      <section className="py-14 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: `${STAT_FAILING}/${SCAN_SAMPLE}`, l: "scored an F", accent: "text-red-400" },
            { n: AVG_GRADE, l: `national average (${AVG_SCORE}/100)`, accent: "text-orange-400" },
            { n: `${STAT_NO_HSTS}/${SCAN_SAMPLE}`, l: "don't force HTTPS (no HSTS)", accent: "text-amber-400" },
            { n: `${STAT_NO_DMARC}/${SCAN_SAMPLE}`, l: "can be email-spoofed (no DMARC)", accent: "text-amber-400" },
          ].map((s) => (
            <div key={s.l}>
              <p className={`font-display text-4xl md:text-5xl font-black mb-2 ${s.accent}`}>{s.n}</p>
              <p className="text-muted-foreground text-sm leading-snug">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grade distribution */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">The grade spread</h2>
          <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto">
            {(["A", "B", "C", "D", "F"] as IndexGrade[]).map((g) => (
              <div key={g} className="bg-card border border-border rounded-2xl p-4 text-center">
                <GradeBadge grade={g} big />
                <p className="font-display text-2xl font-black text-foreground mt-3">{GRADE_COUNTS[g]}</p>
                <p className="text-muted-foreground text-xs">sites</p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-6 max-w-xl mx-auto">
            Only <strong className="text-emerald-400">{STAT_TOP}</strong> of {SCAN_SAMPLE} organisations reached an A.
            The rest leave visitors, and their own brand, exposed to entirely preventable attacks.
          </p>
        </div>
      </section>

      {/* Sector breakdown */}
      <section className="py-16 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">By sector</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTOR_SUMMARY.map((s) => (
              <div key={s.sector} className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-foreground">{s.sector}</p>
                  <p className="text-muted-foreground text-xs">
                    {s.count} site{s.count > 1 ? "s" : ""} · avg {s.avg}/100
                  </p>
                </div>
                <GradeBadge grade={s.grade} big />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full ranked table */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2 text-center">The full leaderboard</h2>
          <p className="text-center text-muted-foreground text-sm mb-8 max-w-xl mx-auto">
            Anonymised to sector level. Each organisation can claim its named, detailed breakdown for free.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-card/60 text-left">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-gold/70">#</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-gold/70">Organisation</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-gold/70">Grade</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-gold/70">Score</th>
                  {CHECK_LABELS.map((c) => (
                    <th key={c.key} className="px-2 py-3 font-mono text-[10px] uppercase tracking-wider text-gold/70 text-center" title={c.label}>
                      {c.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCORED.map((e, i) => (
                  <tr key={e.id} className="border-t border-border hover:bg-card/40 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-3 text-foreground font-medium whitespace-nowrap">{e.id}</td>
                    <td className="px-4 py-3"><GradeBadge grade={e.grade} /></td>
                    <td className="px-4 py-3 text-muted-foreground font-mono">{e.score}</td>
                    {CHECK_LABELS.map((c) => (
                      <td key={c.key} className="px-2 py-3 text-center">
                        {e.checks[c.key] ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-red-400/70 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-gold/5 to-background border-t border-gold/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Is your organisation on this list?</h2>
          <p className="text-white/60 mb-8">
            We&apos;ll send you the named, full breakdown of where you sit: every check, every gap, and exactly how to fix
            it. No cost, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <LeadCaptureModal
              source="Security Index: claim breakdown"
              label="Claim your free breakdown"
              icon={<MessageCircle className="w-4 h-4" />}
              whatsappMessage="Hi Vanorika, I saw the Zimbabwe Web Security Index. Is my organisation on the list? I'd like our free detailed security breakdown."
              heading="Get your named breakdown"
              subheading="Leave your name and contact. We'll send the full, named detail of where your organisation sits and re-check it for you."
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light transition-colors"
            />
            <Link
              href="/tools/security-check"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gold/30 text-gold font-semibold hover:bg-gold/5 transition-colors"
            >
              Scan your own site now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">How we scored, and what we didn&apos;t do</h2>
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              Every grade comes from a <strong className="text-foreground">passive, external check of public signals only</strong>:
              whether the site serves a working HTTPS response, which security headers it sends (HSTS, CSP, X-Frame-Options,
              X-Content-Type-Options, Referrer-Policy), and whether the domain publishes SPF and DMARC records to stop email
              spoofing. We did not log in, probe aggressively, scan for vulnerabilities, or touch anything private. It is the
              same read-only methodology any visitor&apos;s browser already performs.
            </p>
            <p>
              Scores are out of 100, weighted toward the highest-impact protections (working HTTPS and email anti-spoofing
              carry the most weight). Grades: A 90+, B 75 to 89, C 60 to 74, D 40 to 59, F below 40.
            </p>
            <p>
              Results reflect what was observable on <strong className="text-foreground">{SCAN_DATE}</strong>. A site that did
              not return a response within the scan window is recorded as unreachable over HTTPS at that moment, which affects
              its score. Organisations are anonymised to sector level by design. This index is about the national picture, not
              singling anyone out. Any organisation can{" "}
              <a href={claimUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                claim its entry
              </a>{" "}
              to receive the named detail and have it re-checked.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Methodology and tooling are the same passive checks available free in our{" "}
              <Link href="/tools" className="text-gold hover:underline">
                security tools
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
