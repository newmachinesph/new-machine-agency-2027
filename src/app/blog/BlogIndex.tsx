"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

const PAGE_SIZE = 9;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type BlogIndexProps = {
  posts: PostMeta[];
};

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const allShown = visible >= posts.length;

  useEffect(() => {
    if (allShown) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible((v) => Math.min(v + PAGE_SIZE, posts.length));
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [allShown, posts.length]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, visible).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="panel group block p-6 transition-colors hover:border-accent"
          >
            <p className="text-xs text-muted">
              {formatDate(post.date)} · {post.readingMinutes} min read
            </p>
            {post.tags.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <h2 className="mt-3 text-lg font-semibold transition-colors group-hover:text-accent-fg">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm text-muted">{post.description}</p>
            <p className="mt-4 text-sm text-accent-fg">Read →</p>
          </Link>
        ))}
      </div>

      {allShown ? (
        posts.length > PAGE_SIZE ? (
          <p className="mt-10 text-center text-sm text-muted">You’re all caught up.</p>
        ) : null
      ) : (
        <div ref={sentinelRef} aria-hidden="true" />
      )}
    </div>
  );
}
