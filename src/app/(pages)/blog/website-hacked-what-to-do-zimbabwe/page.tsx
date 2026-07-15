import type { Metadata } from "next";
import ArticleShell from "@/components/sections/article-shell";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/website-hacked-what-to-do-zimbabwe" },
  openGraph: { type: "article", publishedTime: "2026-06-28", authors: ["Donovan Mudarikwa"] },
  title: "Your Website Just Got Hacked: Here's What to Do",
  description:
    "A calm, step-by-step plan for the first hour after your Zimbabwe business website is hacked: contain it, assess the damage, recover, and meet your Data Protection Act obligations.",
};

export default function Page() {
  return (
    <ArticleShell
      category="Cybersecurity"
      title="Your Website Just Got Hacked: Here's What to Do"
      date="2026-06-28"
      readTime="7 min read"
      intro="The defaced homepage. The customer who messages asking why your site is redirecting to a gambling page. The login that suddenly doesn&apos;t work. Discovering you&apos;ve been hacked is stomach-dropping, but the next hour matters more than the panic. Here&apos;s a calm, ordered plan for exactly what to do."
      cta={{
        heading: "Hacked right now? Get help fast",
        text: "If your site is compromised, message us on WhatsApp. We&apos;ll help you contain it, clean it up, and find how they got in so it doesn&apos;t happen again.",
        label: "Get Emergency Help",
        href: siteConfig.whatsappUrl,
      }}
    >
      <h2>First: don&apos;t panic, and don&apos;t delete everything</h2>
      <p>
        The instinct is to wipe the site and start fresh. Resist it. The compromised files are evidence: they tell you how the attacker
        got in. Delete them blindly and you&apos;ll likely get hacked again the same way next week. Stay calm and work through the steps below
        in order.
      </p>

      <h2>1. Contain it (first 15 minutes)</h2>
      <ul>
        <li><strong>Take the site offline or into maintenance mode</strong>. That stops it serving malware to your visitors and customers.</li>
        <li><strong>Change the critical passwords</strong>: hosting, admin login, database, and the email tied to them. Use new, strong passwords.</li>
        <li><strong>Log out all sessions</strong> if your platform allows it, to kick the attacker out.</li>
      </ul>

      <h2>2. Assess the damage</h2>
      <p>Before you fix anything, understand what happened. Look for:</p>
      <ul>
        <li><strong>What changed</strong>: defaced pages, new admin users, unknown files, unexpected redirects.</li>
        <li><strong>What data was touched</strong>: especially anything with customer details, orders, or payment information.</li>
        <li><strong>How they likely got in</strong>: an outdated plugin, a weak password, an exposed login, a known vulnerability.</li>
      </ul>
      <p>
        Take screenshots and keep your logs. If you don&apos;t know how to read this, this is the point to bring in someone who does. Guessing
        wastes the window where the trail is still fresh.
      </p>

      <h2>3. Clean and recover</h2>
      <ul>
        <li><strong>Restore from a known-good backup</strong> if you have one from before the compromise.</li>
        <li><strong>Remove the malicious files and any backdoors</strong> the attacker left to get back in.</li>
        <li><strong>Update everything</strong> (the platform, themes, plugins, and dependencies) to close the hole.</li>
        <li><strong>Reset all credentials again</strong> after cleaning, in case they were captured.</li>
      </ul>

      <h2>4. Your Data Protection Act obligations</h2>
      <p>
        This is the step Zimbabwean businesses miss. If personal customer data may have been exposed, the{" "}
        <a href="/blog/zimbabwe-data-protection-act-2021">Data Protection Act 2021</a> brings obligations, including notifying the
        regulator and, in some cases, affected individuals. Ignoring a breach isn&apos;t just risky for customers; it can carry penalties.
        Document what happened and what data was involved.
      </p>

      <h2>5. Make sure it can&apos;t happen again</h2>
      <p>
        Recovery isn&apos;t finished when the site is back up. Close the door properly:
      </p>
      <ul>
        <li><strong>Fix the root cause</strong> you found in step 2, not just the symptoms.</li>
        <li><strong>Add the basics</strong>: security headers, strong unique passwords, and two-factor authentication on admin accounts.</li>
        <li><strong>Set up real backups</strong> on a schedule, stored somewhere separate from the site.</li>
        <li><strong>Get a security assessment</strong> to find the other weaknesses before someone else does.</li>
      </ul>
      <p>
        A hack is a horrible way to learn where your weak points were, but businesses that respond properly usually come back more
        secure than they were before. Move calmly, fix the cause, and don&apos;t skip the data-protection step.
      </p>
    </ArticleShell>
  );
}
