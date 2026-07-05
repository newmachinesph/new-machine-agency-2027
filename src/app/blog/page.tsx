import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Reveal from "@/components/ui/Reveal";
import BlogIndex from "./BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-language articles on websites, landing pages and digital growth — written for business owners, not marketers.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-24">
      <div className="wrap">
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
          <p className="mt-5 max-w-xl text-muted">
            No fluff, no jargon — practical answers to the questions business owners
            actually ask us.
          </p>
        </Reveal>

        <div className="mt-14">
          <BlogIndex posts={posts} />
        </div>
      </div>
    </div>
  );
}
