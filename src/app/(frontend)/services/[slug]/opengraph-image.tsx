import { ImageResponse } from "next/og";
import { getServiceBySlug } from "@/lib/services.data";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "New Machine — Services";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return new ImageResponse(
      ogCard({
        kicker: "Services",
        title: "New Machine",
        subtitle: "From brand to scale, the studio behind growing startups.",
      }),
      { ...size },
    );
  }

  return new ImageResponse(
    ogCard({
      kicker: "Service",
      title: service.name,
      subtitle: service.outcome,
      meta: service.stage,
    }),
    { ...size },
  );
}
