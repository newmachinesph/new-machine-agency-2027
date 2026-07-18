import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllPosts } from "@/lib/blog.data";
import { getProducts } from "@/lib/products.data";
import { getServices } from "@/lib/services.data";
import { getCaseStudies } from "@/lib/work.data";

export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  "",
  "/services/",
  "/work/",
  "/pricing/",
  "/products/",
  "/about/",
  "/careers/",
  "/blog/",
  "/contact/",
  "/privacy-policy/",
  "/terms-of-service/",
];

/** Payload stamps `updatedAt` on every doc, but the *.data.ts types are derived
 *  from the seed JSON so it isn't on the surface type. Read it defensively:
 *  a doc that somehow lacks it just omits lastModified rather than inventing one. */
function lastModified(doc: unknown): Date | undefined {
  const value = (doc as { updatedAt?: unknown }).updatedAt;
  return typeof value === "string" ? new Date(value) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, products, work, posts] = await Promise.all([
    getServices(),
    getProducts(),
    getCaseStudies(),
    getAllPosts(),
  ]);

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${site.url}${path || "/"}`,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceEntries = services.map((service) => ({
    url: `${site.url}/services/${service.slug}/`,
    lastModified: lastModified(service),
    priority: 0.7,
  }));

  const productEntries = products.map((product) => ({
    url: `${site.url}/products/${product.slug}/`,
    lastModified: lastModified(product),
    priority: 0.7,
  }));

  const workEntries = work.map((cs) => ({
    url: `${site.url}/work/${cs.slug}/`,
    lastModified: lastModified(cs),
    priority: 0.8,
  }));

  const postEntries = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...workEntries, ...productEntries, ...postEntries];
}
