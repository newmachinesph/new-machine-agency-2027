import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";
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

  return (
    <article className="wrap max-w-3xl pt-32 pb-24">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft size={14} />
        All articles
      </Link>

      <p className="mt-8 text-xs text-muted">
        {formatDate(post.meta.date)} · {post.meta.readingMinutes} min read
      </p>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
        {post.meta.title}
      </h1>

      {post.meta.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {post.meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="prose mt-10">
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
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

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
