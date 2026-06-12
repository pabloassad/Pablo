"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { usePlayer } from "@/lib/player/PlayerProvider";
import { ArtImage } from "@/components/ui/ArtImage";
import { images, playerQueue } from "@/lib/data";
import { PlayIcon } from "@/components/ui/icons";

const NAME = "PABLITO";

export function Hero() {
  const { t } = useLanguage();
  const { playTrack } = usePlayer();
  const reduced = useReducedMotion();

  // Multi-layer parallax: each layer drifts at its own speed on scroll
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, (v) => (reduced ? 0 : v * 0.4));
  const overlayY = useTransform(scrollY, (v) => (reduced ? 0 : v * 0.2));
  const titleY = useTransform(scrollY, (v) => (reduced ? 0 : v * -0.1));
  const taglineY = useTransform(scrollY, (v) => (reduced ? 0 : v * -0.2));

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-background">
      {/* Photography backdrop — slowest layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 -bottom-[15%] -top-[15%] will-change-transform">
        <ArtImage
          src={images.portraitAmber}
          alt="Pablito · portrait"
          fallback="amber"
          priority
          sizes="100vw"
          className="absolute inset-0"
          imgClassName="object-cover object-[center_top] md:object-[38%_22%]"
        />
      </motion.div>
      {/* Atmosphere overlays — mid layer */}
      <motion.div
        aria-hidden
        style={{ y: overlayY }}
        className="pointer-events-none absolute inset-x-0 -bottom-[15%] -top-[15%] will-change-transform"
      >
        {/* Dark veil keeping the title legible over the photography */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.65)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </motion.div>

      {/* Slow ring ornament — Le Cercle signature */}
      <div className="pointer-events-none absolute -right-[20vmin] top-1/2 hidden -translate-y-1/2 md:block">
        <div className="spin-slow h-[70vmin] w-[70vmin] rounded-full border border-white/[0.07]">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 sm:px-8 lg:px-12 lg:pb-24">
        {/* Name block — rises gently against the scroll */}
        <motion.div style={{ y: titleY }} className="will-change-transform">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block text-xs uppercase tracking-[0.5em] text-accent"
          >
            {t.home.kicker}
          </motion.span>

          <h1 className="mt-4 flex select-none flex-wrap font-brand text-[16vw] font-bold uppercase leading-[0.95] tracking-[0.06em] sm:text-[11vw] lg:text-[8.5rem]">
            {NAME.split("").map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Tagline & actions — fastest counter-layer */}
        <motion.div style={{ y: taglineY }} className="will-change-transform">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-md text-balance text-base font-light tracking-wide text-foreground/80 sm:text-lg"
          >
            {t.home.heroTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
          <button
            type="button"
            onClick={() => playTrack(playerQueue[0].id)}
            className="group inline-flex items-center gap-3 rounded-full bg-foreground py-3 pl-4 pr-6 text-sm tracking-wide text-background transition-all duration-300 hover:bg-accent hover:shadow-[0_0_36px_rgba(216,200,168,0.4)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/10">
              <PlayIcon className="ml-0.5 h-3.5 w-3.5" />
            </span>
            {t.home.heroPlay}
          </button>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm tracking-wide text-foreground transition-all duration-300 hover:border-accent/50 hover:bg-white/[0.03]"
          >
            {t.home.heroProjects}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
            </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-2 py-3 text-xs uppercase tracking-[0.3em] text-muted transition-colors hover:text-accent"
          >
            {t.home.heroBooking}
          </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 text-muted sm:flex lg:right-12"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">{t.home.scroll}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
