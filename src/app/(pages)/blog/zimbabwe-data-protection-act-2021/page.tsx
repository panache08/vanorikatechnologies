import type { Metadata } from "next";
import ArticleShell from "@/components/sections/article-shell";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/zimbabwe-data-protection-act-2021" },
  openGraph: { type: "article", publishedTime: "2026-06-24", authors: ["Donovan Mudarikwa"] },
  title: "Zimbabwe's Data Protection Act 2021 — What Your Business Must Do Now",
  description:
    "What Zimbabwe's Data Protection Act (Cyber and Data Protection Act, 2021) requires of your business, the penalties for non-compliance, and how a security audit helps you comply.",
};

export default function Page() {
  return (
    <ArticleShell
      category="Compliance"
      title="Zimbabwe's Data Protection Act 2021 — What Your Business Must Do Now"
      date="2026-06-24"
      readTime="7 min read"
      intro="Zimbabwe's Cyber and Data Protection Act came into force in 2021, and it applies to almost every business that collects customer information — names, phone numbers, ID numbers, payment details, the lot. If you've been treating it as a problem for &quot;big companies,&quot; this is the article to change your mind."
      cta={{
        heading: "Get a free assessment",
        text: "A free passive assessment shows you where your customer data is exposed — the first practical step toward Data Protection Act compliance.",
        label: "Request Free Assessment",
        href: siteConfig.whatsappUrl,
      }}
    >
      <h2>What the law requires</h2>
      <p>
        The Act sets out how organisations must collect, store, and handle personal data. In practical terms, if you hold information
        about customers or staff, you are expected to:
      </p>
      <ul>
        <li><strong>Collect only what you need</strong> — and tell people why you&apos;re collecting it.</li>
        <li><strong>Keep it secure</strong> — with appropriate technical safeguards against loss or theft.</li>
        <li><strong>Get consent</strong> — for how you use and share personal information.</li>
        <li><strong>Allow access and correction</strong> — individuals can ask what you hold about them.</li>
        <li><strong>Register where required</strong> — and appoint someone responsible for data protection.</li>
      </ul>
      <p>
        Oversight sits with the regulator (POTRAZ acting as the Data Protection Authority), and the obligations apply regardless of how
        small your business is.
      </p>

      <h2>What happens if you're not compliant</h2>
      <p>
        Non-compliance is not a paperwork inconvenience. The Act carries real penalties — significant fines and, for serious breaches,
        the possibility of imprisonment for those responsible. Beyond the legal exposure, there&apos;s the cost that doesn&apos;t appear in any
        statute:
      </p>
      <ul>
        <li><strong>Reputational damage</strong> — a public data breach in Zimbabwe&apos;s tight business community travels fast.</li>
        <li><strong>Lost customers</strong> — people don&apos;t come back to a business that leaked their ID and payment details.</li>
        <li><strong>Liability</strong> — affected individuals can pursue you for mishandling their data.</li>
      </ul>
      <p>The cheapest breach is the one that never happens. Compliance is mostly about getting the basics right before something goes wrong.</p>

      <h2>How a security audit helps you comply</h2>
      <p>
        &quot;Keep personal data secure&quot; is the part of the Act most businesses struggle to evidence — because they don&apos;t actually know how
        secure their systems are. A security audit answers that directly. It tells you:
      </p>
      <ul>
        <li>Where personal data is exposed or inadequately protected.</li>
        <li>Which systems are running outdated, vulnerable software.</li>
        <li>Whether your website leaks information it shouldn&apos;t.</li>
        <li>What concrete steps close those gaps — ranked by risk.</li>
      </ul>
      <p>
        That report becomes your evidence trail: proof that you assessed your security posture and acted on it. If the regulator ever asks
        what steps you took to protect data, &quot;we commissioned an assessment and fixed the findings&quot; is a far stronger answer than silence.
      </p>

      <h2>Start with what's free</h2>
      <p>
        You don&apos;t have to commit to a full audit to begin. A free passive assessment is a no-risk first step that shows you where your
        most obvious data-protection gaps are — and gives you a clear, prioritised path to closing them.
      </p>
    </ArticleShell>
  );
}
