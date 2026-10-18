import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Per-page title/description/OG/Twitter in one call.
 *
 * Next merges metadata *shallowly*: a route that omits `openGraph` inherits the
 * root layout's object whole, so every page would otherwise share the homepage
 * card. Titles stay bare — the root `title.template` is applied to `title`,
 * `openGraph.title` and `twitter.title` alike.
 *
 * `withImage` opts into the site-wide card. Leave it off on routes that ship a
 * file-based `opengraph-image.tsx`: setting `images` here would override it.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  withImage?: boolean;
}): Metadata {
  const { title, description, path, type = "website", publishedTime, withImage = false } = input;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...(type === "article"
        ? { type: "article" as const, ...(publishedTime ? { publishedTime } : {}) }
        : { type: "website" as const }),
      url: `${site.url}${path}`,
      title,
      description,
      ...(withImage ? { images: ["/og-image.png"] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(withImage ? { images: ["/og-image.png"] } : {}),
    },
  };
}
