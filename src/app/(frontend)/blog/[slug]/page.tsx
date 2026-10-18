import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/icons";
import { getAllPosts, getPostBySlug } from "@/lib/blog.data";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/ui/Button";
import GhostTitle from "@/components/v2/GhostTitle";
import JsonLd from "@/components/ui/JsonLd";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  // No `images`: the route's own opengraph-image.tsx populates them.
  return pageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}/`,
    type: "article",
    publishedTime: post.meta.date,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const morePosts = (await getAllPosts())
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="v2-scope">
      <article className="wrap max-w-3xl pt-32 pb-24">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <IconArrowLeft size={14} />
          All articles
        </Link>

        <p className="mt-8 font-display text-[13px] uppercase tracking-[0.16em] text-muted">
          {post.meta.tags[0] ?? "Insights"}
        </p>

        <h1 className="v2-display mt-6 text-[clamp(2.6rem,6.5vw,6rem)]">
          {post.meta.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{formatDate(post.meta.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.meta.readingMinutes} min read</span>
        </div>

        <div className="prose measure mx-auto mt-12">
          <MDXRemote source={post.content} />
        </div>

        <div className="v2-frame mt-16 p-8">
          <h2 className="font-display text-xl font-semibold md:text-2xl">
            Put this to work.
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            A free 30-minute call is the fastest way to find out what this means
            for your business.
          </p>
          <div className="mt-6">
            <Button href="/contact">
              Book a strategy call
              <IconArrowRight size={16} />
            </Button>
          </div>
        </div>

        {morePosts.length > 0 ? (
          <div className="mt-24">
            <GhostTitle>More articles</GhostTitle>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {morePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}/`}
                  className="v2-frame group block p-6"
                >
                  <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">
                    {formatDate(p.date)}
                  </p>
                  <h3 className="mt-3 font-display text-base font-semibold text-fg transition-colors group-hover:text-accent-fg">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <JsonLd
          data={blogPostingSchema({
            title: post.meta.title,
            description: post.meta.description,
            slug,
            date: post.meta.date,
            tags: post.meta.tags,
            wordCount: post.meta.wordCount,
            readingMinutes: post.meta.readingMinutes,
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog/" },
            { name: post.meta.title, path: `/blog/${slug}/` },
          ])}
        />
      </article>
    </div>
  );
}
