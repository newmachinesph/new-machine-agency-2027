import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/products.data";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "New Machine — Products";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return new ImageResponse(
      ogCard({
        kicker: "Products",
        title: "New Machine",
        subtitle: "We don't automate tasks. We build systems that improve themselves.",
      }),
      { ...size },
    );
  }

  return new ImageResponse(
    ogCard({
      kicker: "Product",
      title: product.name,
      subtitle: product.oneLiner,
      meta: "The Machine product family",
    }),
    { ...size },
  );
}
