import { siteConfig, services, blogPosts, faqs, SITE_URL } from "@/lib/data";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * ProfessionalService + Organization graph. Rendered once globally (in the root
 * layout). This is what lets Google show Vanorika as a local business for
 * "penetration testing Zimbabwe" / "cybersecurity Harare" and what AI answer
 * engines cite when asked about security providers in Zimbabwe.
 */
export function OrganizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#organization`,
        name: siteConfig.name,
        alternateName: "Vanorika",
        description: siteConfig.description,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        image: `${SITE_URL}/apple-icon.png`,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        priceRange: "$$",
        founder: {
          "@type": "Person",
          name: siteConfig.founder,
          jobTitle: siteConfig.founderTitle,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Harare",
          addressCountry: "ZW",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "14:00",
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Zimbabwe" },
          { "@type": "Place", name: "Africa" },
        ],
        knowsAbout: [
          "Penetration Testing",
          "Cybersecurity",
          "Vulnerability Assessment",
          "Web Development",
          "Data Protection Act compliance",
        ],
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.shortDesc,
          },
        })),
        sameAs,
      }}
    />
  );
}

/** WebSite node so search engines understand the site identity and publisher. */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: siteConfig.name,
        url: SITE_URL,
        inLanguage: "en-ZW",
        publisher: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}

/**
 * BlogPosting schema for a single article. Looked up by title from blogPosts so
 * the 3 article pages need no extra props. Enables rich article results.
 */
export function ArticleJsonLd({ title }: { title: string }) {
  const post = blogPosts.find((p) => p.title === title);
  if (!post) return null;
  const url = `${SITE_URL}/blog/${post.slug}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}/#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: post.category,
        author: { "@type": "Person", name: siteConfig.founder },
        publisher: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}

/** FAQPage schema. Drop onto any page that renders the shared FAQ list. */
export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

/** Service schema for a service landing page, tying the offering to the org. */
export function ServiceJsonLd({
  name, description, path, price,
}: { name: string; description: string; path: string; price?: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        serviceType: name,
        description,
        url: `${SITE_URL}${path}`,
        areaServed: { "@type": "Country", name: "Zimbabwe" },
        provider: { "@id": `${SITE_URL}/#organization` },
        ...(price
          ? { offers: { "@type": "Offer", price: price.replace(/[^0-9.]/g, ""), priceCurrency: "USD" } }
          : {}),
      }}
    />
  );
}

/** BreadcrumbList schema. `items` is ordered from Home to the current page. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${SITE_URL}${it.path}`,
        })),
      }}
    />
  );
}
