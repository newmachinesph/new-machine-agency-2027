import { site } from "@/config/site";

/**
 * Stable `@id` anchors for the site's entity graph.
 *
 * Search crawlers and AI assistants resolve entities, not pages. Emitting an
 * Organization node once with a fixed `@id`, then *referencing* it from every
 * other node, lets them merge one company across the whole site instead of
 * inferring a new one from each isolated blob. This is the difference between
 * being an entity they can cite and a page they happened to read.
 */
export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

/** Reference to the Organization node defined once in the root layout. */
export const orgRef = { "@id": ORG_ID };

/** Where the studio takes on work — kept identical everywhere a node declares
 *  `areaServed` so an assistant reads one consistent answer, not three. */
export const AREA_SERVED = ["United States", "Philippines", "Worldwide"] as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** FAQ pairs an assistant can quote verbatim. Emitted on any page that answers
 *  real questions (home, pricing, each service). Centralised so the shape —
 *  and future additions like `inLanguage` — stay identical across the site. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** A service the studio sells. Always references the one Organization node and
 *  the shared `areaServed`, so the index list and each detail page agree. */
export function serviceSchema(input: { name: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url: absoluteUrl(`/services/${input.slug}/`),
    provider: orgRef,
    areaServed: [...AREA_SERVED],
  };
}

/** A blog article as a citable entity. Real, derivable fields only — no
 *  invented author or modified date. `keywords`/`articleSection` come from the
 *  post's own tags; `timeRequired` from its computed reading time. */
export function blogPostingSchema(input: {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  wordCount?: number;
  readingMinutes?: number;
  image?: string;
}) {
  const url = absoluteUrl(`/blog/${input.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    mainEntityOfPage: url,
    url,
    image: input.image ?? `${site.url}/og-image.png`,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: orgRef,
    publisher: orgRef,
    ...(input.tags.length
      ? { keywords: input.tags.join(", "), articleSection: input.tags[0] }
      : {}),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    ...(input.readingMinutes ? { timeRequired: `PT${input.readingMinutes}M` } : {}),
  };
}

/** A case study rendered as an Article that mirrors what the page shows. We
 *  deliberately omit Review/aggregateRating: the sample engagements carry
 *  representative metrics, and asserting them as verified structured data
 *  would misrepresent them to crawlers. */
export function caseStudySchema(input: {
  client: string;
  summary: string;
  slug: string;
  industry: string;
  service: string;
  year?: string | number;
}) {
  const url = absoluteUrl(`/work/${input.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${input.client} — case study`,
    description: input.summary,
    url,
    mainEntityOfPage: url,
    image: `${site.url}/og-image.png`,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: orgRef,
    publisher: orgRef,
    about: input.industry,
    keywords: [input.industry, input.service].filter(Boolean).join(", "),
    ...(input.year ? { datePublished: String(input.year) } : {}),
  };
}

export type Crumb = { name: string; path: string };

/** Breadcrumbs tell a crawler where a page sits in the hierarchy. Google uses
 *  them in the result snippet; assistants use them to scope what a page is about. */
export function breadcrumbSchema(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export type ListItemInput = {
  name: string;
  path: string;
  description?: string;
};

/** An explicit, ordered list of what a collection page contains. This is the
 *  most citable shape for an answer engine: it can quote the set without having
 *  to parse a grid of cards back out of the markup. */
export function itemListSchema(input: {
  name: string;
  description: string;
  items: ListItemInput[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    description: input.description,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      url: absoluteUrl(item.path),
    })),
  };
}

/** A page node that names the organization behind it. Cheap way to attach every
 *  page to the entity graph instead of leaving it floating. */
export function webPageSchema(input: {
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: orgRef,
  };
}
