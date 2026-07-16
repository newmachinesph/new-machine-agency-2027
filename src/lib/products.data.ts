import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import productsJson from "@/content/products.json";

/** Product shape mirrors the seed JSON, so page field access is unchanged.
 *  Payload adds id/order/image/timestamps on top (harmless extra keys). */
export type Product = (typeof productsJson)[number];

export async function getProducts(): Promise<Product[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "products",
    limit: 100,
    sort: "order",
  });
  return docs as unknown as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "products",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return (docs[0] as unknown as Product) ?? null;
}
