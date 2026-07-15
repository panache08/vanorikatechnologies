import type { Metadata } from "next";
import ArticleShell from "@/components/sections/article-shell";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/zimbabwe-website-security-2026" },
  openGraph: { type: "article", publishedTime: "2026-06-24", authors: ["Donovan Mudarikwa"] },
  title: "Is Your Zimbabwe Business Website Actually Secure in 2026?",
  description:
    "Most Harare business websites have at least 3 fixable vulnerabilities: missing security headers, outdated software, and weak password resets. Here's how to find and fix them.",
};

export default function Page() {
  return (
    <ArticleShell
      category="Cybersecurity"
      title="Is Your Zimbabwe Business Website Actually Secure in 2026?"
      date="2026-06-24"
      readTime="6 min read"
      intro="Here's an uncomfortable truth from doing this work in Harare every week: most local business websites we look at have at least three fixable vulnerabilities. Not exotic, nation-state stuff. Boring, well-understood issues that a motivated attacker can find in minutes. The good news is they're cheap to fix once you know they're there."
      cta={{
        heading: "Get a free passive assessment",
        text: "We'll run a no-touch external scan of your website and send you a short, plain-English report of what we find. No obligation, no cost.",
        label: "Request Free Assessment",
        href: siteConfig.whatsappUrl,
      }}
    >
      <h2>1. Missing security headers</h2>
      <p>
        Security headers are simple instructions your server sends to every visitor&apos;s browser telling it how to behave safely.
        Get them wrong and your site becomes far easier to attack with clickjacking, content injection, or downgrade attacks.
      </p>
      <ul>
        <li><strong>Content-Security-Policy</strong>: limits where scripts and content can load from.</li>
        <li><strong>Strict-Transport-Security</strong>: forces HTTPS so logins can&apos;t be downgraded.</li>
        <li><strong>X-Frame-Options</strong>: stops your site being framed for clickjacking.</li>
      </ul>
      <p>
        The overwhelming majority of Zimbabwe business sites we scan are missing several of these. Adding them is usually a
        five-minute configuration change, but almost no one does it until someone points it out.
      </p>

      <h2>2. Outdated software</h2>
      <p>
        WordPress, plugins, themes, and server software all ship security patches regularly. Every version you fall behind is a
        published, documented weakness that attackers actively scan the internet for. A site running a two-year-old plugin isn&apos;t
        &quot;probably fine&quot;; it&apos;s on a list somewhere.
      </p>
      <p>
        If you can&apos;t remember the last time your site was updated, assume it&apos;s overdue. Automated bots don&apos;t care how small
        your business is; they care which version you&apos;re running.
      </p>

      <h2>3. Weak password reset flows</h2>
      <p>
        The &quot;forgot password&quot; feature is one of the most attacked parts of any site, and one of the most commonly broken. We
        regularly find reset links that don&apos;t expire, tokens that can be guessed, and flows that leak whether an email address has an
        account, handing attackers a free user list.
      </p>
      <p>
        A secure reset flow uses long random tokens, expires them quickly, and gives the same response whether or not the email exists.
        Most off-the-shelf setups don&apos;t do all three out of the box.
      </p>

      <h2>4. No privacy policy</h2>
      <p>
        This one isn&apos;t just a security gap. It&apos;s a legal one. Under Zimbabwe&apos;s Data Protection Act, businesses that collect
        personal data are expected to tell people how that data is used. A surprising number of Harare sites with contact forms,
        booking systems, or newsletters have no privacy policy at all.
      </p>
      <p>
        Beyond compliance, a missing or boilerplate privacy policy signals to customers, and to a regulator, that data handling
        was never thought through. It&apos;s one of the easiest things to fix and one of the most commonly skipped.
      </p>

      <h2>How to know where you stand</h2>
      <p>
        You don&apos;t need to guess. A <strong>passive assessment</strong> checks all of the above from the outside, without touching or
        disrupting your live site, and tells you exactly which of these issues you have. Most Harare businesses we test discover at
        least one thing they had no idea about.
      </p>
    </ArticleShell>
  );
}
