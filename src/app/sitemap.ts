import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import products from "@/content/products.json";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "",
  "/services/",
  "/products/",
  "/about/",
  "/careers/",
  "/blog/",
  "/contact/",
  "/privacy-policy/",
  "/terms-of-service/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${site.url}${path || "/"}`,
    priority: path === "" ? 1 : 0.7,
  }));

  const productEntries = products.map((product) => ({
    url: `${site.url}/products/${product.slug}/`,
    priority: 0.7,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries, ...postEntries];
}
