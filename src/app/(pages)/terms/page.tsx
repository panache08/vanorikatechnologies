import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern the use of Vanorika Technologies' website and services.",
};

const updated = "24 June 2026";

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">LEGAL</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/50 text-sm">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed
          [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3
          [&_p]:text-sm [&_li]:text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-gold [&_a]:underline [&_strong]:text-foreground">
          <p>
            These terms govern your use of {siteConfig.website} and any services provided by {siteConfig.name}{" "}
            (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By using this site or engaging our services, you agree to these terms.
          </p>

          <h2>Services</h2>
          <p>
            We provide cybersecurity assessments, penetration testing, web and software development, and related services.
            The specific scope, deliverables, timeline, and price of any engagement are agreed in a written proposal before
            work begins. That proposal, together with these terms, forms our agreement.
          </p>

          <h2>Security testing authorisation</h2>
          <p>
            We only test systems, websites, or networks that you own or are explicitly authorised to assess. By engaging us
            for a security assessment, you confirm you have the authority to permit the testing described in the agreed
            scope. We will not test anything outside that scope.
          </p>

          <h2>Quotes &amp; payment</h2>
          <ul>
            <li>Prices shown on this site are starting points; final quotes depend on scope.</li>
            <li>Engagements typically require a deposit to begin, with the balance due on completion or per agreed milestones.</li>
            <li>Quotes are valid for the period stated in the proposal.</li>
          </ul>

          <h2>Confidentiality</h2>
          <p>
            We treat your systems, data, and any findings from an assessment as strictly confidential. Reports and findings
            are shared only with you, and we do not disclose your details without consent except where required by law.
          </p>

          <h2>Intellectual property</h2>
          <p>
            On full payment for a development project, you own the delivered code, content, and design files, as set out in
            the project proposal. Pre-existing tools, libraries, and frameworks remain the property of their respective owners.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            A security assessment reflects the state of your systems at the time of testing and cannot guarantee that no
            vulnerabilities exist or will ever arise. To the extent permitted by law, our liability for any engagement is
            limited to the fees paid for that engagement.
          </p>

          <h2>Changes</h2>
          <p>We may update these terms from time to time. The latest version always applies and is published on this page.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact {siteConfig.founder} at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or {siteConfig.phone}.
          </p>

          <p className="text-xs text-muted-foreground/60 pt-6 border-t border-border">
            These terms are provided in good faith for general use and are not legal advice. For binding contracts, have
            them reviewed by a qualified legal professional.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
