import { ImageResponse } from "next/og";
import { getCaseStudyBySlug } from "@/lib/work.data";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "New Machine — Work";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);

  if (!cs) {
    return new ImageResponse(
      ogCard({ kicker: "Work", title: "New Machine", subtitle: "Selected case studies." }),
      { ...size },
    );
  }

  return new ImageResponse(
    ogCard({
      kicker: "Case Study",
      title: cs.client,
      metric: cs.metric,
      metricLabel: cs.metricLabel,
      meta: [cs.industry, cs.year].filter(Boolean).join(" · "),
    }),
    { ...size },
  );
}
