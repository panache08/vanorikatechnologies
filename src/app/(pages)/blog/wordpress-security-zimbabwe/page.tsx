import type { Metadata } from "next";
import ArticleShell from "@/components/sections/article-shell";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/wordpress-security-zimbabwe" },
  title: "Is Your WordPress Site a Sitting Duck?",
  description:
    "Most Zimbabwean business websites run WordPress, and most are dangerously out of date. Here's why outdated WordPress is a target, and how to lock yours down.",
};

export default function Page() {
  return (
    <ArticleShell
      category="Cybersecurity"
      title="Is Your WordPress Site a Sitting Duck?"
      date="2026-06-30"
      readTime="5 min read"
      intro="WordPress powers a huge share of the websites in Zimbabwe: it's flexible, affordable and everywhere. That popularity is also exactly why it's a target. Attackers don't hand-pick victims; they run automated bots that scan the whole internet for WordPress sites running known-vulnerable versions. If yours is out of date, it's not a question of whether you'll be found. It's when."
      cta={{
        heading: "Is your WordPress site exposed?",
        text: "We'll check your site from the outside (version, exposed admin, outdated plugins) and tell you exactly what to fix. Free.",
        label: "Request Free Assessment",
        href: siteConfig.whatsappUrl,
      }}
    >
      <h2>Why outdated WordPress is so dangerous</h2>
      <p>
        WordPress core, plus every plugin and theme, ships security patches regularly. When a vulnerability is disclosed, it&apos;s
        published, which means attackers get the exploit at the same time you get the fix. Bots then sweep the internet looking for
        sites that haven&apos;t patched. An unmaintained site is a standing invitation.
      </p>

      <h2>The usual weak spots</h2>
      <ul>
        <li><strong>Outdated core or plugins</strong>: the single biggest cause of WordPress compromises.</li>
        <li><strong>Abandoned plugins</strong>: installed once, never updated, sometimes no longer maintained at all.</li>
        <li><strong>Weak admin logins</strong>: <code>admin</code> / a guessable password, with no two-factor authentication.</li>
        <li><strong>Exposed login page</strong>: <code>/wp-admin</code> open to the world and brute-forced around the clock.</li>
        <li><strong>No backups</strong>, so a compromise becomes a catastrophe instead of an inconvenience.</li>
      </ul>

      <h2>What to do this week</h2>
      <ul>
        <li>Update WordPress core, plugins and themes, and remove anything you don&apos;t use.</li>
        <li>Enforce strong passwords and turn on two-factor authentication for every admin.</li>
        <li>Add security headers and limit login attempts.</li>
        <li>Set up automatic, tested backups stored off the server.</li>
        <li>Check what version you&apos;re broadcasting. Our <a href="/tools/tech-stack">tech-stack detector</a> will show you in seconds.</li>
      </ul>

      <h2>Not sure where you stand?</h2>
      <p>
        Most owners genuinely don&apos;t know how exposed their WordPress site is, and that&apos;s normal. A quick passive assessment
        answers it without touching your live site, and tells you precisely what to fix first. If you&apos;d rather not deal with it
        yourself, we&apos;ll harden it for you.
      </p>
    </ArticleShell>
  );
}
