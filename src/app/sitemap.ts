import { MetadataRoute } from "next";
import { blogPosts, SITE_URL } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cybersecurity-zimbabwe`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cost-estimator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/security-for-law-firms`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/security-for-travel-agencies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/security-for-healthcare`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/penetration-testing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/web-development`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/custom-software`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/mobile-apps`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ai-automation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/zenvora`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/casino`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/research/zimbabwe-web-security-2026`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/security-check`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tools/password`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools/email-security`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools/lookalike`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools/dns`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools/headers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools/ssl`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools/whois`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tools/subdomains`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/security`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/status`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
