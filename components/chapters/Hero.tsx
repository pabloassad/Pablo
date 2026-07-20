"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The poster hero: the name set edge to edge in condensed Helvetica, two
 * stacked lines, with a restrained portrait plate tucked under the second
 * line — a Swiss affiche where the type does the talking and the photograph
 * stays a controlled accent. Scroll drifts the name up and the plate against
 * it. Static under reduced-motion.
 */
export function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const nameY = useTransform(scrollY, [0, 720], [0, -90]);
  const plateY = useTransform(scrollY, [0, 720], [0, 60]);

  const line = (text: string, delay: number) => (
    <motion.span
      initial={{ opacity: 0, y: "0.35em" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay }}
      className="block will-change-transform"
    >
      {text}
    </motion.span>
  );

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 pb-6 sm:pt-28">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="flex items-center gap-3 px-4 sm:px-6 lg:px-8"
      >
        <span className="hairline w-10" aria-hidden />
        <span className="kicker">{h.eyebrow}</span>
      </motion.div>

      {/* The poster: name edge to edge, portrait plate under the second line */}
      <div className="relative mt-4 flex-1">
        {/* Portrait plate — right side, behind the type (desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.55 }}
          style={reduced ? undefined : { y: plateY }}
          className="absolute right-4 top-[18%] z-0 hidden w-[26vw] max-w-[400px] md:block lg:right-8"
        >
          <figure>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/portrait/portrait-2.webp"
                alt="Pablo Assad, portrait"
                fill
                priority
                sizes="26vw"
                className="object-cover"
                style={{ objectPosition: "50% 30%" }}
              />
              <span className="border-ink/40 absolute left-0 top-0 z-10 h-3 w-3 border-l border-t" aria-hidden />
              <span className="border-ink/40 absolute right-0 top-0 z-10 h-3 w-3 border-r border-t" aria-hidden />
              <span className="border-ink/40 absolute bottom-0 left-0 z-10 h-3 w-3 border-b border-l" aria-hidden />
              <span className="border-ink/40 absolute bottom-0 right-0 z-10 h-3 w-3 border-b border-r" aria-hidden />
            </div>
            <figcaption className="mt-2 flex items-center justify-between">
              <span className="kicker">Portrait</span>
              <span className="text-faint text-[0.65rem] uppercase tracking-[0.15em]">Paris</span>
            </figcaption>
          </figure>
        </motion.div>

        {/* The name — h1, two lines, edge to edge */}
        <motion.h1
          style={reduced ? undefined : { y: nameY }}
          className="font-display text-ink relative z-10 select-none px-3 uppercase sm:px-5 lg:px-6"
          aria-label={h.name}
        >
          <span
            className="block"
            style={{ fontSize: "clamp(4rem, 24vw, 26rem)", lineHeight: 0.82, letterSpacing: "-0.04em", fontWeight: 800 }}
          >
            {line("Pablo", 0.12)}
            {line("Assad", 0.24)}
          </span>
        </motion.h1>

        {/* Portrait — mobile, in flow under the name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.5 }}
          className="mt-8 px-4 md:hidden"
        >
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden">
            <Image
              src="/portrait/portrait-2.webp"
              alt="Pablo Assad, portrait"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Statement block — stacked left, clear of the portrait plate */}
      <div className="relative z-20 mt-10 max-w-xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="font-display text-ink text-balance"
          style={{ fontSize: "var(--text-h3)", lineHeight: "var(--text-h3--line-height)", fontWeight: 500, letterSpacing: "-0.02em" }}
        >
          {h.statement}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.62 }}
          className="text-mute mt-4 max-w-xs text-base leading-relaxed"
        >
          {h.intro}
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#apropos"
        aria-label={h.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.9 }}
        className="text-faint hover:text-ink mx-auto mt-6 flex w-fit items-center gap-2 transition-colors"
      >
        <span className="kicker">{h.scroll}</span>
        <motion.span
          aria-hidden
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
