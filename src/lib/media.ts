/**
 * Product card imagery. Products with a real brand-generated asset in
 * `/public/products/<slug>.webp` use it; the rest fall back to a stable,
 * seeded picsum placeholder until their art is ready. Add a slug here the
 * moment its `.webp` lands in `/public/products`.
 */
const PRODUCTS_WITH_IMAGE = new Set<string>([
  "content-machine",
  "reputation-machine",
  "answer-engine-machine",
]);

export function productImage(slug: string): string {
  return PRODUCTS_WITH_IMAGE.has(slug)
    ? `/products/${slug}.webp`
    : `https://picsum.photos/seed/${slug}/1200/900`;
}
