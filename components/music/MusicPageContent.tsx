"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { TrackCard } from "@/components/music/TrackCard";
import { GradientArt } from "@/components/ui/GradientArt";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PlayIcon, SpotifyIcon, SoundcloudIcon, YoutubeIcon } from "@/components/ui/icons";
import { socials } from "@/lib/data";
import type { ArtVariant } from "@/lib/data";

const variants: ArtVariant[] = ["amber", "violet", "teal", "rose", "gold", "slate"];
const patterns: ("circle" | "lines" | "grid")[] = ["circle", "lines", "grid", "circle", "lines", "grid"];

const platformLinks = [
  { label: "Spotify", href: socials.spotify, Icon: SpotifyIcon },
  { label: "SoundCloud", href: socials.soundcloud, Icon: SoundcloudIcon },
  { label: "YouTube", href: socials.youtube, Icon: YoutubeIcon },
];

export function MusicPageContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero kicker={t.music.kicker} title={t.music.title} intro={t.music.intro} />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line">
            <GradientArt variant="amber" pattern="lines" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
            <div className="relative flex min-h-[360px] flex-col justify-end gap-5 p-8 sm:p-12 lg:p-16">
              <span className="text-xs uppercase tracking-[0.4em] text-accent">{t.music.embedTitle}</span>
              <h2 className="max-w-xl text-balance text-3xl font-medium tracking-tight sm:text-4xl">
                {t.music.tracks[1].title}
              </h2>
              <p className="max-w-md text-sm text-muted sm:text-base">{t.music.embedNote}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                {platformLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-black/30 px-5 py-2.5 text-sm backdrop-blur-sm transition-all duration-300 hover:border-accent/50"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                ))}
              </div>
              <span className="absolute right-8 top-8 flex h-16 w-16 items-center justify-center rounded-full bg-foreground/95 text-background shadow-[0_0_30px_rgba(216,200,168,0.35)]">
                <PlayIcon className="ml-1 h-6 w-6" />
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">
        <Reveal>
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{t.music.latestSets}</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.music.tracks.map((track, i) => (
            <RevealItem key={track.title}>
              <TrackCard {...track} variant={variants[i % variants.length]} pattern={patterns[i % patterns.length]} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
