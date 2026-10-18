import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog.data";
import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "New Machine — Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      ogCard({ kicker: "Blog", title: "New Machine", subtitle: "Notes from the studio." }),
      { ...size },
    );
  }

  const { title, description, date, readingMinutes } = post.meta;
  const when = date
    ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  const meta = [`${readingMinutes} min read`, when].filter(Boolean).join(" · ");

  return new ImageResponse(
    ogCard({ kicker: "Blog", title, subtitle: description, meta }),
    { ...size },
  );
}
