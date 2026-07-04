import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
      {
        userAgent: "ia_archiver",
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
