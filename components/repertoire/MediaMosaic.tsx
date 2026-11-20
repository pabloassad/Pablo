"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useElementWidth } from "@/lib/hooks/useElementWidth";
import { justifyRows } from "@/lib/justifyRows";
import { Lightbox, type LightboxMedia } from "@/components/ui/Lightbox";
import type { ProjectMedia } from "@/lib/content/types";

const posterFor = (src: string) => src.replace(/\.mp4$/, "-poster.webp");

/** A muted, in-view autoplay clip that fills its mosaic tile; poster instant. */
function MosaicVideo({ src, onExpand, onMeta }: { src: string; onExpand: () => void; onMeta: (ar: number) => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const poster = posterFor(src);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) { setMounted(true); io.disconnect(); } },
      { rootMargin: "700px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (e) => (e[0].isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { rootMargin: "-15% 0px -15% 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <button ref={boxRef} type="button" onClick={onExpand} className="group absolute inset-0 h-full w-full overflow-hidden">
      <Image src={poster} alt="" fill sizes="(max-width:1024px) 70vw, 900px" className="object-cover" />
      {mounted && (
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.videoWidth && v.videoHeight) onMeta(v.videoWidth / v.videoHeight);
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </button>
  );
}

/**
 * A project's visuals as a justified mosaic — images and clips packed into rows
 * that fill the width edge to edge (a composition, not a one-after-another
 * stack). Click any tile to enlarge it (with sound) in the shared Lightbox.
 */
export function MediaMosaic({ media, title }: { media: ProjectMedia[]; title: string }) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [videoAr, setVideoAr] = useState<Record<string, number>>({});
  const [expanded, setExpanded] = useState<LightboxMedia | null>(null);

  const GAP = 4;
  const targetH = width < 640 ? 240 : width < 1024 ? 340 : width < 1600 ? 440 : 520;

  const arOf = (m: ProjectMedia) =>
    m.type === "video" ? (videoAr[m.src] ?? (m.w ?? 9) / (m.h ?? 16)) : (m.w ?? 4) / (m.h ?? 5);

  const rows = useMemo(
    () => justifyRows(media, width, GAP, targetH, arOf),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [media, width, targetH, videoAr],
  );

  return (
    <div ref={ref} className="flex flex-col" style={{ gap: GAP }}>
      {rows.map((row, ri) => (
        <div key={ri} className="flex" style={{ gap: GAP, height: row.h }}>
          {row.items.map(({ it: m, w }) => (
            <div key={m.src} className="bg-paper-2 relative shrink-0 overflow-hidden" style={{ width: w, height: row.h }}>
              {m.type === "video" ? (
                <MosaicVideo
                  src={m.src}
                  onExpand={() => setExpanded({ src: m.src, type: "video", alt: title, ar: videoAr[m.src] ?? 0.5625 })}
                  onMeta={(ar) => setVideoAr((p) => (p[m.src] === ar ? p : { ...p, [m.src]: ar }))}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setExpanded({ src: m.src, alt: title, ar: (m.w ?? 4) / (m.h ?? 5) })}
                  aria-label={title}
                  className="group absolute inset-0"
                >
                  <Image
                    src={m.src}
                    alt={title}
                    fill
                    sizes="(max-width:1024px) 70vw, 900px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
      <Lightbox media={expanded} onClose={() => setExpanded(null)} />
    </div>
  );
}
