import type { Metadata } from "next";
import ArticleShell from "@/components/sections/article-shell";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/data-protection-act-compliance-checklist-zimbabwe" },
  openGraph: { type: "article", publishedTime: "2026-06-28", authors: ["Donovan Mudarikwa"] },
  title: "Data Protection Act Compliance: A Checklist for Zimbabwe Businesses",
  description:
    "A practical, plain-English checklist to get your business compliant with Zimbabwe's Data Protection Act 2021 — what to do, in what order, without needing a lawyer to start.",
};

export default function Page() {
  return (
    <ArticleShell
      category="Compliance"
      title="Data Protection Act Compliance: A Checklist for Zimbabwe Businesses"
      date="2026-06-28"
      readTime="7 min read"
      intro="Zimbabwe&apos;s Data Protection Act has been in force for a while now, and the regulator is active. The good news: getting compliant isn&apos;t the legal mountain it sounds like. Most of it is practical housekeeping. Here&apos;s a plain-English checklist you can work through — in order — to get from &quot;we&apos;ve done nothing&quot; to genuinely covered."
      cta={{
        heading: "Want help getting compliant?",
        text: "We&apos;ll assess where your business stands against the Data Protection Act and give you a clear, prioritised plan — plus fix the technical security side ourselves.",
        label: "Request an Assessment",
        href: siteConfig.whatsappUrl,
      }}
    >
      <p>
        Quick grounding first: if you collect any personal information about people — names, phone numbers, emails, ID numbers, payment
        details — the Act applies to you. That&apos;s almost every business. For the full background, see our overview of the{" "}
        <a href="/blog/zimbabwe-data-protection-act-2021">Data Protection Act 2021</a>. This piece is the action list.
      </p>

      <h2>1. Know what data you hold</h2>
      <p>
        You can&apos;t protect what you haven&apos;t mapped. Write down what personal data you collect, where it lives (spreadsheets, your
        website, WhatsApp, a CRM), who can access it, and how long you keep it. This single exercise surfaces most of your risk.
      </p>

      <h2>2. Have a lawful reason for collecting it</h2>
      <p>
        For each type of data, you should be able to say <em>why</em> you have it — a contract, the customer&apos;s consent, a legal
        requirement. If you&apos;re collecting something &quot;just in case&quot; with no real reason, stop collecting it.
      </p>

      <h2>3. Publish a clear privacy policy</h2>
      <p>
        Your website needs a privacy policy that tells people, in plain language, what you collect, why, who you share it with, and how
        they can ask to see or delete their data. This is one of the most visible signs of compliance — and one of the easiest to fix.
      </p>

      <h2>4. Get consent properly</h2>
      <ul>
        <li><strong>Don&apos;t pre-tick boxes</strong> — consent has to be a genuine choice.</li>
        <li><strong>Separate marketing consent</strong> from the main transaction — let people buy without being forced onto your mailing list.</li>
        <li><strong>Make opting out easy</strong> — an unsubscribe link that actually works.</li>
      </ul>

      <h2>5. Secure the data (the technical part)</h2>
      <p>
        The Act expects &quot;appropriate&quot; security. In practice that means the basics done properly:
      </p>
      <ul>
        <li><strong>HTTPS</strong> on your website and any form that collects data.</li>
        <li><strong>Strong, unique passwords</strong> and two-factor authentication on admin accounts.</li>
        <li><strong>Access control</strong> — only staff who need the data can reach it.</li>
        <li><strong>Backups</strong> and a patched, up-to-date website.</li>
      </ul>
      <p>
        A <a href="/penetration-testing">security assessment</a> is the fastest way to know whether your &quot;appropriate security&quot; would
        actually hold up.
      </p>

      <h2>6. Have a breach plan</h2>
      <p>
        Decide now what you&apos;d do if data were exposed — who&apos;s responsible, how you&apos;d contain it, and how you&apos;d notify the regulator
        and affected people. Our guide on{" "}
        <a href="/blog/website-hacked-what-to-do-zimbabwe">what to do when your website is hacked</a> walks through the response.
      </p>

      <h2>7. Respect people&apos;s rights</h2>
      <p>
        People can ask what data you hold about them, ask you to correct it, or ask you to delete it. Have a simple process so that when
        a request comes in, you&apos;re not scrambling.
      </p>

      <h2>The short version</h2>
      <p>
        Map your data, justify why you hold it, tell people the truth in a privacy policy, get consent honestly, secure it properly,
        and know what you&apos;d do in a breach. Do those six things and you&apos;re ahead of the overwhelming majority of Zimbabwean businesses —
        and genuinely protecting the customers who trusted you with their information.
      </p>
    </ArticleShell>
  );
}
