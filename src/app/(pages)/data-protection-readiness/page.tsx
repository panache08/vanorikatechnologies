import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileLock2, Map, ShieldAlert, Users, FileSearch, Network,
  ArrowRight, Check, X, Scale,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ServiceJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/data-protection-readiness" },
  title: "Data Protection Readiness Assessment in Zimbabwe",
  description:
    "Find out where your business actually stands against Zimbabwe's Cyber and Data Protection Act [Chapter 12:07]. A technical readiness assessment: data mapping, security controls, breach readiness, and a prioritised remediation plan.",
};

const assessed = [
  {
    icon: Map,
    title: "Personal Data Mapping",
    desc: "We trace every place personal data enters, moves through, and rests in your business: forms, spreadsheets, WhatsApp, CRMs, backups, and third-party tools. Most organisations are surprised by the list.",
  },
  {
    icon: FileLock2,
    title: "Security Controls Review",
    desc: "Encryption in transit and at rest, access control, password and account hygiene, database exposure, and whether your hosting arrangement stands up to scrutiny.",
  },
  {
    icon: ShieldAlert,
    title: "Breach Readiness",
    desc: "The Act expects you to detect and report. We test whether you would actually notice a breach, who would be told, and how fast, then write the runbook if one does not exist.",
  },
  {
    icon: Network,
    title: "Third-Party and Processor Risk",
    desc: "Your payment gateway, hosting provider, email platform, and outsourced developer all touch customer data. We assess what each one holds and what your exposure looks like.",
  },
  {
    icon: Users,
    title: "Data Subject Rights Capability",
    desc: "If a customer asked for a copy of their data, or asked you to delete it, could you comply? We test the request path end to end and flag where it breaks.",
  },
  {
    icon: FileSearch,
    title: "Public-Facing Compliance Signals",
    desc: "Privacy policy, cookie and tracker behaviour, consent capture, and retention practice on your live website, checked against what you actually do behind the scenes.",
  },
];

const steps = [
  {
    n: "01",
    title: "Passive scan",
    desc: "We start outside your perimeter with the same free scan anyone can run, so you see the public evidence before you spend anything.",
  },
  {
    n: "02",
    title: "Discovery session",
    desc: "A structured 60 to 90 minute session with whoever handles your customer data. No forms to fill in beforehand.",
  },
  {
    n: "03",
    title: "Assessment and report",
    desc: "We test what we were told against what we can observe, then write it up: every gap rated by risk, with the fix and rough effort beside it.",
  },
  {
    n: "04",
    title: "Remediation",
    desc: "You take the report to your own team, to a licensed DPO, or back to us to build the fixes. All three are fine. The report is yours either way.",
  },
];

const tiers = [
  {
    name: "Readiness Assessment",
    scope: "One-off engagement",
    note: "Where most SMEs start. Scoped on how many systems hold personal data.",
    features: [
      "Full personal data map",
      "Security controls review",
      "Written gap report, risk rated",
      "Prioritised remediation plan",
      "60 minute findings walkthrough",
    ],
    cta: "Book an assessment",
    featured: false,
  },
  {
    name: "Assess and Remediate",
    scope: "Fixed-scope project",
    note: "The assessment plus the engineering to close the gaps it finds.",
    features: [
      "Everything in the assessment",
      "Consent capture and privacy policy build",
      "Data subject request handling",
      "Encryption, access control, and retention fixes",
      "Audit logging where it is missing",
      "Retest to confirm gaps are closed",
    ],
    cta: "Scope a project",
    featured: true,
  },
  {
    name: "Ongoing Compliance Support",
    scope: "Monthly retainer",
    note: "For businesses whose data footprint keeps changing.",
    features: [
      "Quarterly reassessment",
      "Continuous monitoring via Vanorika Shield",
      "Breach response on call",
      "Staff awareness refreshers",
      "Advisory on new systems before you buy them",
    ],
    cta: "Talk retainer",
    featured: false,
  },
];

const sectors = [
  "SMEs", "NGOs", "Schools and colleges", "Clinics and pharmacies",
  "Hotels and guest houses", "Churches", "Financial services", "Law firms",
];

export default function DataProtectionReadinessPage() {
  return (
    <main>
      <ServiceJsonLd
        name="Data Protection Readiness Assessment in Zimbabwe"
        description="A technical readiness assessment against Zimbabwe's Cyber and Data Protection Act [Chapter 12:07]: personal data mapping, security controls review, breach readiness, third-party risk, and a prioritised remediation plan."
        path="/data-protection-readiness"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Breadcrumbs
            className="mb-8 text-left"
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Data Protection Readiness", path: "/data-protection-readiness" },
            ]}
          />
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Scale className="w-3.5 h-3.5" /> COMPLIANCE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            Data Protection Readiness Assessment
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Zimbabwe&apos;s Cyber and Data Protection Act [Chapter 12:07] applies to you whether or not
            anyone has come knocking. We tell you exactly where you stand, and what it takes to close the gap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider"
            >
              Book an Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/cookies"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm uppercase tracking-wider"
            >
              Free Privacy Scan
            </Link>
          </div>
        </div>
      </section>

      {/* The boundary. Honesty as the differentiator. */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-balance">
              Read this before you buy anything from anyone
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Compliance work in Zimbabwe splits into two halves that are easy to confuse. Being clear about
              which half we do is the whole reason to trust us with the other one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-gold/25 rounded-2xl p-8">
              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                <Check className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">What we do</h3>
              <ul className="space-y-3">
                {[
                  "Assess your technical and organisational security posture",
                  "Map where personal data actually lives in your business",
                  "Test whether you would detect and survive a breach",
                  "Build the systems that make compliance possible: consent capture, audit logs, retention, access control",
                  "Train your staff on the security half of their obligations",
                  "Hand you a written, risk-rated gap report you own outright",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-11 h-11 rounded-xl bg-muted/40 border border-border flex items-center justify-center mb-5">
                <X className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">What we do not do</h3>
              <ul className="space-y-3">
                {[
                  "Act as your appointed Data Protection Officer",
                  "Provide legal advice or legal interpretation of the Act",
                  "File breach notifications or represent you before POTRAZ",
                  "Handle formal data subject complaints on your behalf",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <X className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-foreground/80 leading-relaxed mt-6 pt-6 border-t border-border">
                Those are the role of a Data Protection Officer, and in Zimbabwe that role carries registration
                requirements with POTRAZ as the Data Protection Authority. If you need one, we will say so and
                point you to someone who holds it. We would rather send you down the road than sell you
                something we are not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we assess */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-balance">
              What the assessment covers
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Six areas, tested against what the Act expects rather than against a generic checklist
              written for somewhere else.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessed.map((a) => (
              <div key={a.title} className="bg-card border border-border rounded-2xl p-7 hover:border-gold/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <a.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-14 text-balance">
            How it runs
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <li key={s.n}>
                <p className="font-mono text-sm text-gold/70 mb-3">{s.n}</p>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground text-sm mt-12 pt-8 border-t border-border max-w-2xl leading-relaxed">
            Turnaround is typically one to two weeks from the discovery session, depending on how many
            systems are in scope.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-balance">
              Three ways to engage
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              No hourly billing, no surprise invoices. Every engagement is quoted on scope, which
              means how many systems hold personal data, not how large your logo is.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={
                  t.featured
                    ? "bg-card border border-gold/40 rounded-3xl p-8 gold-glow-sm"
                    : "bg-card border border-border rounded-3xl p-8"
                }
              >
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{t.name}</h3>
                <p className="font-display text-xl font-bold text-gold mb-2">{t.scope}</p>
                <p className="text-muted-foreground text-xs mb-7 leading-relaxed">{t.note}</p>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={
                    t.featured
                      ? "block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm uppercase tracking-wider"
                      : "block w-full text-center py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm uppercase tracking-wider"
                  }
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it is for + closing */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">
                Who this is for
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-7">
                If you hold names, phone numbers, ID numbers, medical records, or payment details for
                Zimbabwean residents, the Act applies to you. Size is not the test.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {sectors.map((s) => (
                  <span
                    key={s}
                    className="px-3.5 py-1.5 text-xs font-medium text-foreground/80 bg-card border border-border rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-card border border-gold/20 rounded-3xl p-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                Start with the free scan
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-7">
                Before you commit to anything, run your own domain through our privacy and cookie scanner.
                It checks what your website is doing with visitor data right now. It takes about a minute
                and costs nothing.
              </p>
              <Link
                href="/tools/cookies"
                className="block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all gold-glow-sm text-sm uppercase tracking-wider mb-3"
              >
                Run the free scan
              </Link>
              <Link
                href="/book"
                className="block w-full text-center py-3.5 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/10 transition-all text-sm mb-6"
              >
                Book a 30 minute call
              </Link>
              <p className="text-muted-foreground/70 text-xs leading-relaxed">
                Prefer to read first? Start with our{" "}
                <Link href="/blog/data-protection-act-compliance-checklist-zimbabwe" className="text-gold underline">
                  Data Protection Act compliance checklist
                </Link>{" "}
                or the plain-English{" "}
                <Link href="/blog/zimbabwe-data-protection-act-2021" className="text-gold underline">
                  guide to the Act
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
