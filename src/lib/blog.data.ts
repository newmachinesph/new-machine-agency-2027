import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";
import type { PostMeta, Post } from "@/lib/blog";

// Same return shapes as the old fs-based lib/blog.ts, so page code is unchanged.
export type { PostMeta, Post };

// Subset of the Payload "posts" doc we read. tags is an array-of-objects
// (Payload array field), body is the raw MDX kept as text.
type PostDoc = {
  slug: string;
  title?: string | null;
  description?: string | null;
  date?: string | null;
  tags?: { tag?: string | null }[] | null;
  body?: string | null;
};

// readingMinutes/wordCount are DERIVED here (never stored) — mirrors toMeta in lib/blog.ts.
function toMeta(doc: PostDoc): PostMeta {
  const body = doc.body ?? "";
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  return {
    slug: doc.slug,
    title: String(doc.title ?? doc.slug),
    description: String(doc.description ?? ""),
    date: String(doc.date ?? ""),
    tags: Array.isArray(doc.tags)
      ? doc.tags.map((t) => String(t.tag ?? "")).filter(Boolean)
      : [],
    readingMinutes: Math.max(1, Math.round(wordCount / 200)),
    wordCount,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    sort: "-date",
    limit: 200,
  });
  return (docs as unknown as PostDoc[]).map(toMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const doc = docs[0] as unknown as PostDoc | undefined;
  if (!doc) return null;
  return { meta: toMeta(doc), content: doc.body ?? "" };
}
