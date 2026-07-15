import type { Metadata } from "next";
import ArticleShell from "@/components/sections/article-shell";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/5-security-mistakes-harare-businesses" },
  title: "5 Security Mistakes Every Harare Business Makes",
  description:
    "After assessing 17+ Harare businesses, the same five security gaps come up again and again. Here they are, and how to fix each one for free.",
};

export default function Page() {
  return (
    <ArticleShell
      category="Cybersecurity"
      title="5 Security Mistakes Every Harare Business Makes"
      date="2026-06-30"
      readTime="6 min read"
      intro="We've now run passive security assessments on more than 17 Harare businesses across hospitality, healthcare, law, education and the NGO sector. The striking thing isn't how varied the problems are. It's how similar. The same five mistakes come up again and again. None of them are exotic, and all of them are fixable. Here they are."
      cta={{
        heading: "Find out which of these you're making",
        text: "A free passive assessment checks your site from the outside and tells you exactly which of these gaps you have. No obligation.",
        label: "Request Free Assessment",
        href: siteConfig.whatsappUrl,
      }}
    >
      <h2>1. No SPF or DMARC: anyone can spoof your email</h2>
      <p>
        The most common gap by far. Without SPF and DMARC records, a stranger can send email that looks exactly like it came from
        your business, to your own customers. It&apos;s a direct phishing risk, and it&apos;s free to fix. Most businesses we test have
        neither.
      </p>

      <h2>2. Missing security headers</h2>
      <p>
        Security headers are simple instructions your server sends every browser. Without them, your site is easier to attack with
        clickjacking and content injection. Adding them is usually a five-minute configuration change, but almost nobody does it
        until it&apos;s pointed out.
      </p>

      <h2>3. Outdated software</h2>
      <p>
        Old WordPress, old plugins, old server software. Every version you fall behind is a published, documented weakness that bots
        scan the internet for automatically. &quot;It still works&quot; is not the same as &quot;it&apos;s safe.&quot;
      </p>

      <h2>4. No privacy policy</h2>
      <p>
        Half the sites we assess collect personal data (through contact forms, bookings, newsletters) with no privacy policy at
        all. Under Zimbabwe&apos;s Data Protection Act (2021), that&apos;s a compliance gap as well as a trust problem.
      </p>

      <h2>5. Forgotten subdomains and services</h2>
      <p>
        Old test sites, staging environments, abandoned subdomains: still online, still exposed, and rarely updated. Attackers
        love them because nobody&apos;s watching. Most owners have no idea they&apos;re even there. (You can see your own in seconds with
        our <a href="/tools/subdomains">subdomain finder</a>.)
      </p>

      <h2>The good news</h2>
      <p>
        Every one of these is cheap to fix once you know it&apos;s there. The hard part is knowing, and that&apos;s exactly what a free
        passive assessment is for. You can also run several of these checks yourself with our <a href="/tools">free tools</a>.
      </p>
    </ArticleShell>
  );
}
