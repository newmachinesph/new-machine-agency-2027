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

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
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
