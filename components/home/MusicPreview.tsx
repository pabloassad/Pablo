"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TrackCard } from "@/components/music/TrackCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { ArtVariant } from "@/lib/data";

const variants: ArtVariant[] = ["amber", "violet", "teal"];
const patterns: ("circle" | "lines" | "grid")[] = ["circle", "lines", "grid"];

export function MusicPreview() {
  const { t } = useLanguage();
  const tracks = t.music.tracks.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading kicker={t.home.musicLabel} title={t.home.musicTitle} />
          <Button href="/music" variant="ghost" className="shrink-0">
            {t.home.musicCta}
          </Button>
        </div>
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {tracks.map((track, i) => (
            <RevealItem key={track.title}>
              <TrackCard {...track} variant={variants[i % variants.length]} pattern={patterns[i % patterns.length]} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
