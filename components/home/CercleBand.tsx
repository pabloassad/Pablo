"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { usePlayer } from "@/lib/player/PlayerProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { images, cercleSets } from "@/lib/data";
import { PlayIcon } from "@/components/ui/icons";

export function CercleBand() {
  const { t } = useLanguage();
  const { playTrack } = usePlayer();
  const latestSet = cercleSets[cercleSets.length - 1];

  return (
    <section className="relative overflow-hidden">
      <ArtImage
        src={images.cercleRoom}
        alt="Le Cercle · live"
        fallback="amber"
        pattern="circle"
        sizes="100vw"
        className="absolute inset-0"
        imgClassName="object-cover object-center"
      >
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </ArtImage>

      <div className="relative mx-auto flex min-h-[80svh] max-w-7xl flex-col items-center justify-center px-6 py-28 text-center sm:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="spin-slow h-[60vmin] w-[60vmin] rounded-full border border-white/[0.12]" />
        </div>
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
            {t.home.cercleLabel}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            {t.home.cercleTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-md text-balance text-base text-foreground/80 sm:text-lg">
            {t.home.cercleLine}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {latestSet && (
              <button
                type="button"
                onClick={() => playTrack(latestSet.id, { expand: true })}
                className="group inline-flex items-center gap-3 rounded-full bg-foreground py-3 pl-4 pr-6 text-sm tracking-wide text-background transition-all duration-300 hover:bg-accent hover:shadow-[0_0_36px_rgba(216,200,168,0.4)]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/10">
                  <PlayIcon className="ml-0.5 h-3.5 w-3.5" />
                </span>
                {t.home.cerclePlay}
              </button>
            )}
            <Link
              href="/projects#cercle"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-3 text-sm tracking-wide text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:bg-white/[0.06]"
            >
              {t.home.cercleCta}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
