import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import PatternSignal from "@/components/ui/PatternSignal";
import BlogIndex from "./BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-language articles on brand, product, websites and growth, written for founders, not marketers.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
        <div className="relative overflow-hidden">
          <PatternSignal className="pointer-events-none absolute -top-10 right-0 h-72 w-72 opacity-[0.1] [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)]" />

          <div className="relative">
            <Reveal className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Blog
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-5 max-w-2xl text-4xl font-extrabold tracking-tight md:text-6xl">
                Ideas that grow businesses.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="measure mt-5 text-muted">
                No fluff, no jargon: practical answers to the questions business owners
                actually ask us, from a team that has shipped the work.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14">
          <BlogIndex posts={posts} />
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
