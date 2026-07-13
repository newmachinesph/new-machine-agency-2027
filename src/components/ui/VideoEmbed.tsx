"use client";

import { useState } from "react";

type VideoEmbedProps = {
  id: string;
  title: string;
  className?: string;
  /** Eager-load the thumbnail: set on above-the-fold embeds (e.g. the hero). */
  priority?: boolean;
};

/**
 * Performance-friendly YouTube facade. Until the viewer activates it, we show
 * only the thumbnail under the brand green-duotone (grayscale + accent-deep
 * multiply, same recipe as DuotoneImage / the footer band); no iframe, no
 * YouTube JS ships. On activate we mount the nocookie embed with autoplay.
 * A real <button> gives Enter/Space activation + focus-visible for free.
 */
export default function VideoEmbed({ id, title, className = "", priority = false }: VideoEmbedProps) {
  const [active, setActive] = useState(false);
  const [thumbnail, setThumbnail] = useState(
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  );

  return (
    <div className={`chamfer relative aspect-video overflow-hidden bg-card ${className}`.trim()}>
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full text-left"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- facade thumbnail; plain img skips remote-image config and ships lighter than next/image here */}
          <img
            src={thumbnail}
            alt=""
            aria-hidden="true"
            width={1280}
            height={720}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            onError={() => setThumbnail(`https://img.youtube.com/vi/${id}/hqdefault.jpg`)}
            className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
          />
          {/* green duotone: matches DuotoneImage / Footer band */}
          <span aria-hidden="true" className="absolute inset-0 bg-accent-deep mix-blend-multiply" />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-accent-deep/70 via-transparent to-accent/10"
          />
          {/* centered accent play button */}
          <span
            aria-hidden="true"
            className="chamfer absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent text-accent-ink shadow-lg transition-transform duration-300 group-hover:scale-110"
          >
            <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor" className="ml-0.5">
              <path d="M0 0 L22 12 L0 24 Z" />
            </svg>
          </span>
          {/* title caption */}
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
            <span className="text-sm font-semibold text-white">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
