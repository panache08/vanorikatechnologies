import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "How Vanorika Technologies collects, uses, and protects your personal data — aligned with Zimbabwe's Cyber and Data Protection Act (2021).",
};

const updated = "24 June 2026";

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">LEGAL</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed
          [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-28
          [&_p]:text-sm [&_li]:text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-gold [&_a]:underline [&_strong]:text-foreground">
          <p>
            This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects
            personal information when you visit {siteConfig.website} or engage our services. We are based in {siteConfig.address}{" "}
            and handle personal data in line with Zimbabwe&apos;s Cyber and Data Protection Act (2021).
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li><strong>Information you give us</strong> — your name, email, phone number, company, and the project details you send via our contact form, WhatsApp, or email.</li>
            <li><strong>Newsletter</strong> — the email address you submit to receive our monthly security updates.</li>
            <li><strong>Technical data</strong> — basic, non-identifying analytics about how the site is used (pages visited, device type), where enabled.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiries and deliver the services you request.</li>
            <li>To send you the newsletter you subscribed to (you can unsubscribe anytime).</li>
            <li>To improve our website and services.</li>
          </ul>
          <p>We do not sell your personal data, and we do not share it except with the service providers needed to operate (e.g. email delivery), or where required by law.</p>

          <h2 id="data-protection">Data protection &amp; your rights</h2>
          <p>
            Under the Cyber and Data Protection Act (2021), you have the right to know what personal data we hold about you,
            to ask us to correct it, and to ask us to delete it. We collect only what we need, keep it only as long as
            necessary, and apply appropriate technical safeguards to protect it.
          </p>
          <ul>
            <li><strong>Access &amp; correction</strong> — request a copy of your data or ask us to fix inaccuracies.</li>
            <li><strong>Deletion</strong> — ask us to remove your data where we have no ongoing need to keep it.</li>
            <li><strong>Consent</strong> — withdraw your consent (e.g. unsubscribe) at any time.</li>
          </ul>
          <p>To exercise any of these rights, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>

          <h2>Data security</h2>
          <p>
            We apply reasonable technical and organisational measures to protect personal data against loss, misuse, and
            unauthorised access. No method of transmission over the internet is completely secure, but we work to protect
            your information and review our practices regularly.
          </p>

          <h2>Cookies &amp; analytics</h2>
          <p>
            Our site uses minimal cookies and may use privacy-respecting analytics to understand aggregate usage. You can
            control cookies through your browser settings.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy or your data? Contact {siteConfig.founder} at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or {siteConfig.phone}.
          </p>

          <p className="text-xs text-muted-foreground/60 pt-6 border-t border-border">
            This policy is provided in good faith and reflects our current practices. It is not legal advice; for
            full statutory compliance, have it reviewed against your specific data-processing activities.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
