"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The affiche: PABLO / ASSAD set large in two condensed lines on the left, a
 * portrait plate holding the right, the statement anchored below the name.
 * Balanced type/image on desktop; on phones the name leads, the plate sits
 * full width beneath it, then the statement. Scroll drifts the name up and the
 * plate gently against it. Static under reduced-motion.
 */
export function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  // Gentle drift — a hint of parallax, not a slide.
  const nameY = useTransform(scrollY, [0, 700], [0, -26]);
  const plateY = useTransform(scrollY, [0, 700], [0, 18]);

  // The name is the LCP element — reveal it fast (a short fade-up, minimal
  // delay) so the largest paint isn't held behind a long opacity animation.
  const line = (text: string, delay: number) => (
    <motion.span
      initial={{ opacity: 0, y: "0.28em" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
      className="block will-change-transform"
    >
      {text}
    </motion.span>
  );

  const plate = (
    <figure className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.5 }}
        style={reduced ? undefined : { y: plateY }}
      >
        <div className="relative aspect-square w-full overflow-hidden sm:aspect-[4/5]">
          <Image
            src="/portrait/hero-2.webp"
            alt="Pablo Assad, portrait"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 34vw"
            className="object-cover"
            style={{ objectPosition: "50% 18%" }}
          />
          <span className="border-ink/40 absolute left-0 top-0 z-10 h-3 w-3 border-l border-t" aria-hidden />
          <span className="border-ink/40 absolute right-0 top-0 z-10 h-3 w-3 border-r border-t" aria-hidden />
          <span className="border-ink/40 absolute bottom-0 left-0 z-10 h-3 w-3 border-b border-l" aria-hidden />
          <span className="border-ink/40 absolute bottom-0 right-0 z-10 h-3 w-3 border-b border-r" aria-hidden />
        </div>
      </motion.div>
      <figcaption className="mt-2 flex items-center justify-between">
        <span className="kicker">Portrait</span>
        <span className="text-faint text-[0.65rem] uppercase tracking-[0.15em]">Paris</span>
      </figcaption>
    </figure>
  );

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-8">
      {/* Capped + centred so the affiche stays a tight composition on ultrawide
          instead of stranding the name and portrait either side of a dead band. */}
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-x-10 gap-y-8 lg:grid-cols-12">
        {/* Type column */}
        <div className="order-2 lg:order-1 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="kicker">{h.eyebrow}</span>
          </motion.div>

          <motion.h1
            style={reduced ? undefined : { y: nameY }}
            className="font-display text-ink mt-5 select-none uppercase"
            aria-label={h.name}
          >
            <span
              className="block"
              style={{ fontSize: "clamp(3rem, 14vw, 15rem)", lineHeight: 0.84, letterSpacing: "-0.04em", fontWeight: 800 }}
            >
              {line("Pablo", 0.04)}
              {line("Assad", 0.1)}
            </span>
          </motion.h1>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:items-end">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="font-display text-ink max-w-md text-balance"
              style={{ fontSize: "var(--text-h3)", lineHeight: "var(--text-h3--line-height)", fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              {h.statement}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.62 }}
              className="text-mute max-w-xs text-base leading-relaxed sm:pb-1"
            >
              {h.intro}
            </motion.p>
          </div>
        </div>

        {/* Portrait column — on phones the plate runs full width, flush with the
            text's own margins (no centring inset), so photo and type share one
            clean column. Constrained again from sm upward. */}
        <div className="order-1 w-full sm:max-w-sm lg:order-2 lg:col-span-4 lg:max-w-none">
          {plate}
        </div>
      </div>
    </section>
  );
}
