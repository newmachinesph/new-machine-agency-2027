/**
 * Product card imagery. Every product currently ships a brand-generated
 * asset at `/public/products/<slug>.webp`, so we resolve straight to it.
 * If a new product is ever added without art, drop its `.webp` in that
 * folder (the filename is the slug) and it renders automatically.
 */
export function productImage(slug: string): string {
  return `/products/${slug}.webp`;
}

/** Images are served from the local `/public` fallback only — CMS/R2 media
 *  URLs are intentionally ignored. */
export function mediaUrl(_image: unknown, fallback: string): string {
  return fallback;
}

export function productImageUrl(image: unknown, slug: string): string {
  return mediaUrl(image, productImage(slug));
}
