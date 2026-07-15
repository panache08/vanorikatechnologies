import type { Metadata } from "next";
import ArticleShell from "@/components/sections/article-shell";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/what-is-penetration-testing-zimbabwe" },
  openGraph: { type: "article", publishedTime: "2026-06-24", authors: ["Donovan Mudarikwa"] },
  title: "What Is Penetration Testing and Does Your Business Need It?",
  description:
    "A plain-English guide to penetration testing for Zimbabwe businesses: what it is, who needs it, and what a real pentest report looks like.",
};

export default function Page() {
  return (
    <ArticleShell
      category="Cybersecurity"
      title="What Is Penetration Testing and Does Your Business Need It?"
      date="2026-06-24"
      readTime="7 min read"
      intro="&quot;Penetration testing&quot; sounds like something only banks and tech giants do. It isn't. Stripped of the jargon, a pentest is simply hiring someone to try to break into your systems, with your permission, so you find the holes before a criminal does. Here's what that actually means for a Zimbabwe business."
      cta={{
        heading: "Book a penetration test",
        text: "Get a CompTIA PenTest+ certified assessment of your website or systems, with a written report you can hand to your board, your auditor, or your developer.",
        label: "Book a Pentest",
        href: siteConfig.whatsappUrl,
      }}
    >
      <h2>What a penetration test actually is</h2>
      <p>
        A penetration test is an authorised, controlled attack on your own systems. A tester uses the same tools and techniques a real
        attacker would (probing your website, network, and applications), but instead of stealing data, they document every way in and
        hand you the map. It&apos;s the difference between waiting to be robbed and hiring someone to test your locks.
      </p>
      <p>
        It&apos;s different from an automated scan. A scanner flags known issues; a human tester chains small weaknesses together the way a
        real attacker does, and finds the things scanners miss.
      </p>

      <h2>Who actually needs one</h2>
      <p>If your business handles money or sensitive data, the answer is almost certainly yes. In particular:</p>
      <ul>
        <li><strong>Banks &amp; financial services</strong>: regulatory pressure and high-value targets.</li>
        <li><strong>Travel agents</strong>: they hold passports, payment details, and itineraries.</li>
        <li><strong>Legal firms</strong>: confidential client data is the whole business.</li>
        <li><strong>Casinos &amp; gaming</strong>: cash-heavy, compliance-bound, and heavily targeted.</li>
        <li><strong>Healthcare</strong>: patient records are among the most sensitive data there is.</li>
      </ul>
      <p>
        If a breach would cost you customers, money, or your reputation, a pentest is cheaper than finding out the hard way.
      </p>

      <h2>What a pentest report looks like</h2>
      <p>A good report is written for humans, not just engineers. Ours includes:</p>
      <ul>
        <li><strong>An executive summary</strong>: the overall risk picture in plain language for decision-makers.</li>
        <li><strong>Each finding rated by severity</strong> (Critical, High, Medium, Low) so you know what to fix first.</li>
        <li><strong>Proof</strong>: exactly how the issue was exploited, with evidence.</li>
        <li><strong>Clear remediation steps</strong>: what to change, in language your developer can act on immediately.</li>
      </ul>
      <p>
        You should finish reading a pentest report knowing precisely what&apos;s wrong, how serious each problem is, and what it takes to fix
        it. If a report leaves you more confused than when you started, it wasn&apos;t done right.
      </p>

      <h2>How long it takes</h2>
      <p>
        For a typical Zimbabwe business website, an engagement runs about 5 to 7 business days from start to report. You get notified of any
        critical finding in real time. You don&apos;t have to wait for the final document to start protecting yourself.
      </p>
    </ArticleShell>
  );
}
