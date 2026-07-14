/**
 * Product card imagery. Every product currently ships a brand-generated
 * asset at `/public/products/<slug>.webp`, so we resolve straight to it.
 * If a new product is ever added without art, drop its `.webp` in that
 * folder (the filename is the slug) and it renders automatically.
 */
export function productImage(slug: string): string {
  return `/products/${slug}.webp`;
}
