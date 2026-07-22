"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useAudio } from "@/lib/audio/AudioProvider";

export interface LightboxMedia {
  src: string;
  type?: "image" | "video";
  alt: string;
  /** Aspect ratio (w/h) of the media, used to size the frame. */
  ar: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The enlarged video plays WITH sound — the enlarge itself is an explicit user
 * gesture, so it takes the audio floor (hushing the listening table) and starts
 * unmuted, with a speaker toggle. Poster paints instantly.
 */
function LightboxVideo({ media }: { media: LightboxMedia }) {
  const { t } = useLanguage();
  const { requestVideoSound, releaseVideoSound } = useAudio();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const poster = media.src.replace(/\.mp4$/, "-poster.webp");

  useEffect(() => {
    requestVideoSound("lightbox"); // hush the table + other videos
    const v = ref.current;
    if (v) {
      v.muted = false;
      v.play().catch(() => {
        // Browser blocked unmuted autoplay — fall back to muted, keep playing.
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    }
    return () => releaseVideoSound("lightbox");
  }, [requestVideoSound, releaseVideoSound]);

  useEffect(() => {
    const v = ref.current;
    if (v) v.muted = muted;
  }, [muted]);

  return (
    <>
      <video ref={ref} src={media.src} poster={poster} autoPlay loop playsInline className="h-full w-full object-cover" />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setMuted((m) => !m);
        }}
        aria-label={muted ? t.work.soundOn : t.work.soundOff}
        aria-pressed={!muted}
        className="bg-ink/55 text-paper hover:bg-ink/80 absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
          {muted ? <path d="M16 9.5l4.5 5M20.5 9.5l-4.5 5" /> : (<><path d="M15.5 9.5a4 4 0 0 1 0 5" /><path d="M18 7.5a7 7 0 0 1 0 9" /></>)}
        </svg>
      </button>
    </>
  );
}

/**
 * Click a piece, see it alone: the media grows to the centre of the screen at
 * its native ratio, everything else steps back; click beside it (or Esc, or ✕)
 * and it returns to its place. Scroll is frozen while open; reduced-motion
 * gets a plain fade.
 */
export function Lightbox({ media, onClose }: { media: LightboxMedia | null; onClose: () => void }) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!media) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    window.__lenis?.stop();

    // Return focus to whatever opened the lightbox once it closes.
    const opener = document.activeElement as HTMLElement | null;
    // Move focus in — next frame, after the dialog has mounted.
    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Trap Tab within the dialog so keyboard focus never leaks to the page.
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement;
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.__lenis?.start();
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      opener?.focus?.();
    };
  }, [media, onClose]);

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
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
              <LightboxVideo media={media} />
            ) : (
              <Image src={media.src} alt={media.alt} fill sizes="92vw" className="object-contain" />
            )}
          </motion.div>

          <button
            type="button"
            ref={closeRef}
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
