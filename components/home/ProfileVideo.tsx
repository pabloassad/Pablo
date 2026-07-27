"use client";

import { useEffect, useRef } from "react";

type ProfileVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

function prefersLessMotionOrData() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const saveData = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection?.saveData;

  return reducedMotion || reducedData || Boolean(saveData);
}

/*
 * The portrait clip is hosted on Vercel Blob, which meters data transfer: every
 * byte a visitor downloads counts against the store's monthly quota. So the file
 * is only fetched when it is actually going to be watched:
 *   - preload="none" and no src on first paint, so loading the page costs zero
 *     byte of Blob transfer;
 *   - the source is attached when the block scrolls into view — it sits below
 *     the fold, so visitors who never scroll that far never download it;
 *   - playback pauses off-screen, and visitors on data-saver or
 *     prefers-reduced-motion keep the poster photo instead of the video.
 */
export function ProfileVideo({ src, poster, className }: ProfileVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersLessMotionOrData()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        // First time in view: this is the only moment the file is requested.
        if (!video.src) video.src = src;
        // Rejects when the browser blocks autoplay; the poster then stays up.
        void video.play().catch(() => {});
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      className={className}
    />
  );
}
