"use client";

import { useRef, useState } from "react";

type VideoPlayerProps = {
  /** Path to a self-hosted file in /public, e.g. "/video/reel.mp4". */
  src: string;
  title: string;
  className?: string;
  /** Eager-load metadata: set on above-the-fold players. */
  priority?: boolean;
};

/**
 * Self-hosted video facade, styled to match VideoEmbed / DuotoneImage. Until
 * the viewer activates it, the poster frame (seeked to 0.5s via a media
 * fragment) sits under the brand green-duotone with a chamfered play button;
 * no controls, no autoplay. On activate we show native controls and play.
 * A real <button> gives Enter/Space activation + focus-visible for free.
 */
export default function VideoPlayer({ src, title, className = "", priority = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  function activate() {
    const video = videoRef.current;
    if (!video) return;
    setActive(true);
    video.controls = true;
    void video.play().catch(() => {});
  }

  return (
    <div className={`chamfer relative aspect-video overflow-hidden bg-card ${className}`.trim()}>
      <video
        ref={videoRef}
        // #t=0.5 shows the frame at 0.5s as the poster while preload=metadata.
        src={`${src}#t=0.5`}
        title={title}
        preload={priority ? "auto" : "metadata"}
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {!active && (
        <button
          type="button"
          onClick={activate}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full text-left"
        >
          {/* green duotone: matches VideoEmbed / DuotoneImage / Footer band */}
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
