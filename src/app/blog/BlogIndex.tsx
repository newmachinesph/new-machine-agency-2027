"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import DuotoneImage from "@/components/ui/DuotoneImage";
import { IconArrowRight } from "@/components/ui/icons";

const PAGE_SIZE = 9;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function TagRow({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="border border-border px-2 py-0.5 text-xs text-muted">
          {tag}
        </span>
      ))}
    </div>
  );
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="panel group block overflow-hidden transition-colors hover:border-accent"
    >
      <DuotoneImage
        src={`https://picsum.photos/seed/${post.slug}/800/450`}
        alt={post.title}
        className="h-40 w-full"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="p-6">
        <p className="text-xs text-muted">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </p>
        <TagRow tags={post.tags} />
        <h2 className="mt-3 text-lg font-semibold transition-colors group-hover:text-accent-fg">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{post.description}</p>
        <p className="mt-4 text-sm text-accent-fg">Read →</p>
      </div>
    </Link>
  );
}

type BlogIndexProps = {
  posts: PostMeta[];
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [featured, ...rest] = posts;
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const allShown = visible >= rest.length;

  useEffect(() => {
    if (allShown) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible((v) => Math.min(v + PAGE_SIZE, rest.length));
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [allShown, rest.length]);

  if (!featured) return null;

  return (
    <div>
      {/* Featured: latest post, editorial split hero */}
      <Link
        href={`/blog/${featured.slug}/`}
        className="panel group grid overflow-hidden md:grid-cols-2"
      >
        <DuotoneImage
          src={`https://picsum.photos/seed/${featured.slug}/1200/900`}
          alt={featured.title}
          className="h-64 w-full md:h-full"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            Latest
          </span>
          <h2 className="font-display mt-4 text-2xl font-bold tracking-tight md:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-4 text-muted">{featured.description}</p>
          <p className="mt-6 text-xs text-muted">
            {formatDate(featured.date)} · {featured.readingMinutes} min read
          </p>
          <TagRow tags={featured.tags} />
          <p className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-accent-fg">
            Read the article
            <IconArrowRight size={16} />
          </p>
        </div>
      </Link>

      {rest.length > 0 ? (
        <>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.slice(0, visible).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {allShown ? (
            rest.length > PAGE_SIZE ? (
              <p className="mt-10 text-center text-sm text-muted">You’re all caught up.</p>
            ) : null
          ) : (
            <div ref={sentinelRef} aria-hidden="true" />
          )}
        </>
      ) : null}
    </div>
  );
}
