import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/icons";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
import DuotoneImage from "@/components/ui/DuotoneImage";
import JsonLd from "@/components/ui/JsonLd";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
    },
  };
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
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const morePosts = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <article className="wrap max-w-3xl pt-32 pb-24">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
      >
        <IconArrowLeft size={14} />
        All articles
      </Link>

      <div className="mt-8 flex items-center gap-2.5">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg">
          {post.meta.tags[0] ?? "Insights"}
        </span>
      </div>

      <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
        {post.meta.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted">
        <span>{formatDate(post.meta.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.meta.readingMinutes} min read</span>
      </div>

      {post.meta.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.meta.tags.map((tag) => (
            <span
              key={tag}
              className="border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <DuotoneImage
        src={`https://picsum.photos/seed/${post.meta.slug}/1200/600`}
        className="mt-10 aspect-[2/1] w-full"
        sizes="(min-width: 768px) 48rem, 100vw"
      />

      <div className="prose measure mx-auto mt-10">
        <MDXRemote source={post.content} />
      </div>

      <div className="panel mt-16 p-8 text-center">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">
          Enjoyed this? Put it to work.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          A free 30-minute call is the fastest way to find out what this means for your
          business.
        </p>
        <div className="mt-5 flex justify-center">
          <Button href="/contact">
            Book a Strategy Call
            <IconArrowRight size={16} />
          </Button>
        </div>
      </div>

      {morePosts.length > 0 ? (
        <div className="mt-16">
          <h2 className="font-display text-lg font-bold tracking-tight">
            More from the blog
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {morePosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="panel group block overflow-hidden"
              >
                <DuotoneImage
                  src={`https://picsum.photos/seed/${p.slug}/600/400`}
                  className="h-32 w-full"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="p-4">
                  <p className="text-xs text-muted">{formatDate(p.date)}</p>
                  <h3 className="mt-2 text-sm font-semibold transition-colors group-hover:text-accent-fg">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.meta.title,
          description: post.meta.description,
          datePublished: post.meta.date,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
        }}
      />
    </article>
  );
}
