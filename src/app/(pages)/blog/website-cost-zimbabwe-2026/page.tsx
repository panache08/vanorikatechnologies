import type { Metadata } from "next";
import ArticleShell from "@/components/sections/article-shell";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/website-cost-zimbabwe-2026" },
  title: "How Much Should a Website Cost in Zimbabwe in 2026?",
  description:
    "Website quotes in Zimbabwe range from $50 to $5,000. Here's what actually drives the price, plus a realistic cost guide for Zimbabwean businesses in 2026.",
};

export default function Page() {
  return (
    <ArticleShell
      category="Web Development"
      title="How Much Should a Website Cost in Zimbabwe in 2026?"
      date="2026-06-30"
      readTime="6 min read"
      intro="Ask three people to build you a website and you'll get quotes of $50, $500 and $5,000 for what sounds like the same thing. That's confusing and a little alarming. The truth is that the word 'website' covers wildly different things, and the price follows what's actually under the hood. Here's how to read a quote and know what you should pay."
      cta={{
        heading: "Get a clear, fixed quote",
        text: "No hourly billing, no scope creep. Tell us what you need and we'll give you a written, fixed price before any work starts.",
        label: "Get a Free Quote",
        href: siteConfig.whatsappUrl,
      }}
    >
      <h2>What actually drives the price</h2>
      <ul>
        <li><strong>Number of pages and complexity</strong>: a 5-page brochure site is a different job from a 30-page site with a booking system.</li>
        <li><strong>Custom design vs. a template</strong>: a $50 site is almost always a recycled template; a distinctive, on-brand design takes real work.</li>
        <li><strong>Functionality</strong>: contact forms are cheap; e-commerce, logins, payment gateways and dashboards are not.</li>
        <li><strong>Who builds it</strong>: a hobbyist on the side is cheaper than a professional who'll still be reachable in six months.</li>
        <li><strong>What happens after launch</strong>: hosting, security, updates and support all cost something. Cheap quotes often quietly leave these out.</li>
      </ul>

      <h2>A realistic 2026 cost guide (Zimbabwe, USD)</h2>
      <ul>
        <li><strong>Basic business website (3 to 5 pages):</strong> roughly $300 to $600. Mobile-ready, contact form, basic SEO.</li>
        <li><strong>Business site with CMS / e-commerce:</strong> roughly $600 to $2,000. You can edit content yourself, sell products, take payments.</li>
        <li><strong>Custom web application:</strong> $2,000+. Logins, dashboards, integrations, bespoke logic.</li>
      </ul>
      <p>If a quote is dramatically below these, ask what's missing; usually it's the design, the security, or the support.</p>

      <h2>The hidden cost nobody mentions: security</h2>
      <p>
        A cheap site built on an outdated template, never updated, is a liability. We regularly find Harare business sites that
        were built once and never touched again, running software with known, public vulnerabilities. The build was cheap; the
        breach won't be. A professional build includes basic hardening and a plan to keep it current.
      </p>

      <h2>What to ask before you pay</h2>
      <ul>
        <li>Do I own the code, content and domain when it's done?</li>
        <li>Is it a custom design or a template?</li>
        <li>What's included after launch (updates, security, support)?</li>
        <li>How will it actually bring me enquiries, not just look nice?</li>
      </ul>
      <p>
        A good website is an investment that pays for itself in enquiries. The cheapest option rarely is. Pay for the one that&apos;s
        built properly, secured, and supported. Get the price in writing first.
      </p>
    </ArticleShell>
  );
}
