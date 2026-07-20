"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export interface LightboxMedia {
  src: string;
  type?: "image" | "video";
  alt: string;
  /** Aspect ratio (w/h) of the media, used to size the frame. */
  ar: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Click a piece, see it alone: the media grows to the centre of the screen at
 * its native ratio, everything else steps back; click beside it (or Esc, or ✕)
 * and it returns to its place. No dedicated panel, no gallery chrome — just
 * the work, isolated and larger. Scroll is frozen while open; reduced-motion
 * gets a plain fade.
 */
export function Lightbox({ media, onClose }: { media: LightboxMedia | null; onClose: () => void }) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!media) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [media, onClose]);

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={media.alt}
          className="bg-ink/75 fixed inset-0 z-[90] flex items-center justify-center p-4 backdrop-blur-md sm:p-10"
        >
          <motion.div
            key={media.src}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: reduced ? 0 : 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative overflow-hidden"
            style={{
              aspectRatio: `${media.ar}`,
              width: `min(92vw, calc(84svh * ${media.ar}))`,
            }}
          >
            {media.type === "video" ? (
              <video
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="92vw"
                className="object-contain"
              />
            )}
          </motion.div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.work.close}
            className="text-paper/80 hover:text-paper absolute right-5 top-4 text-2xl leading-none transition-colors sm:right-8 sm:top-6"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
