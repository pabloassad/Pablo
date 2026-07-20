"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The cinematic arrival: the Montmartre photograph opens the site full
 * viewport with only a discreet name on it. The first scroll folds the image
 * into a wide band (height mapped 1:1 to scroll, native touch, no hijack) and
 * the typographic block, the name set large with the statement, builds
 * beneath it. Static band and no scrub under reduced-motion.
 */
export function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const reduced = useReducedMotion();
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const set = () => setVh(window.innerHeight);
    set();
    window.addEventListener("resize", set, { passive: true });
    return () => window.removeEventListener("resize", set);
  }, []);

  const { scrollY } = useScroll();
  const height = useTransform(
    scrollY,
    [0, Math.max(1, vh * 0.45)],
    [Math.max(1, vh), Math.max(1, vh * 0.5)],
  );
  const fade = useTransform(scrollY, [0, Math.max(1, vh * 0.3)], [1, 0]);
  const ready = vh > 0 && !reduced;

  return (
    <section id="top" className="relative">
      {/* The curtain — full-viewport photograph, discreet name */}
      <motion.div
        style={ready ? { height } : undefined}
        className={`relative overflow-hidden ${ready ? "" : reduced ? "h-[52svh]" : "h-[100svh]"}`}
      >
        <Image
          src="/portrait/montmartre.webp"
          alt="Pablo Assad, Montmartre"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "36% 42%" }}
        />
        <motion.div
          style={ready ? { opacity: fade } : undefined}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/45 to-transparent px-5 pt-20 pb-6 sm:px-8"
        >
          <span className="font-display text-paper text-lg tracking-tight" style={{ fontWeight: 700 }} aria-hidden>
            Pablo Assad
          </span>
          <span className="text-paper/80 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] sm:block">
            Montmartre · Paris
          </span>
        </motion.div>
      </motion.div>

      {/* The typographic block builds beneath the curtain */}
      <div className="px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="hairline w-10" aria-hidden />
          <span className="kicker">{h.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.35 }}
          className="font-display text-ink mt-6 uppercase"
          style={{ fontSize: "clamp(3.5rem, 15.5vw, 17rem)", lineHeight: 0.86, letterSpacing: "-0.04em", fontWeight: 800 }}
        >
          {h.name}
        </motion.h1>

        <div className="mt-10 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.55 }}
            className="font-display text-ink text-balance"
            style={{ fontSize: "var(--text-h3)", lineHeight: "var(--text-h3--line-height)", fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            {h.statement}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.68 }}
            className="text-mute mt-4 max-w-xs text-base leading-relaxed"
          >
            {h.intro}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
