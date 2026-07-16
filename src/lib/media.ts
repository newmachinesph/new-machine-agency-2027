/**
 * Product card imagery. Every product currently ships a brand-generated
 * asset at `/public/products/<slug>.webp`, so we resolve straight to it.
 * If a new product is ever added without art, drop its `.webp` in that
 * folder (the filename is the slug) and it renders automatically.
 */
export function productImage(slug: string): string {
  return `/products/${slug}.webp`;
}

/** Payload `upload` relations come back as the Media doc (depth>=1) with a
 *  `.url`. Prefer that (R2) when present, else fall back to the bundled asset. */
export function productImageUrl(image: unknown, slug: string): string {
  if (image && typeof image === "object" && "url" in image) {
    const url = (image as { url?: unknown }).url;
    if (typeof url === "string" && url) return url;
  }
  return productImage(slug);
}
