import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog.data";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-language articles on brand, product, websites and growth, written for founders, not marketers.",
  alternates: { canonical: "/blog/" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="v2-scope">
      <div className="pt-32 pb-24">
        <div className="wrap">
          <Reveal>
            <p className="font-display text-[13px] uppercase tracking-[0.16em] text-muted">
              Blog
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="v2-display mt-6 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]">
              Ideas that <span className="text-accent">grow</span> businesses.
            </h1>
          </Reveal>

          {/* ponytail: plain typographic list replaces BlogIndex (thumbnails,
              tag chips, infinite scroll) — Payload caps posts at 200, static
              render carries that fine. */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} className="h-full" delay={(i % 3) * 90}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="v2-frame group block h-full p-6"
                >
                  <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-3 font-display text-lg font-semibold text-fg transition-colors group-hover:text-accent-fg">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-1 text-sm text-muted">
                    {post.description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Blog",
          description:
            "Plain-language articles on brand, product, websites and growth, written for founders.",
          path: "/blog/",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
        ])}
      />
      <JsonLd
        data={itemListSchema({
          name: "Articles",
          description: "Articles from the New Machine blog.",
          items: posts.map((post) => ({
            name: post.title,
            path: `/blog/${post.slug}/`,
            description: post.description,
          })),
        })}
      />
    </div>
  );
}
