"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { usePlayer } from "@/lib/player/PlayerProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { Emph } from "@/components/ui/Emph";
import { SetsCarousel } from "@/components/projects/SetsCarousel";
import {
  images,
  socials,
  spotifyArtistId,
  soundcloudProfileUrl,
  cercleSets,
  liveSetsMusic,
} from "@/lib/data";
import { PlayIcon, YoutubeIcon } from "@/components/ui/icons";

export function MusicPageContent() {
  const { t } = useLanguage();
  const { playTrack } = usePlayer();

  return (
    <div className="pb-32">
      {/* Header — studio and composition */}
      <header className="relative flex min-h-[70svh] items-end overflow-hidden">
        <ArtImage
          src={images.studioComposition}
          alt="Pablito · en studio"
          fallback="slate"
          priority
          sizes="100vw"
          className="absolute inset-0"
          imgClassName="object-cover object-[45%_30%]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        </ArtImage>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 sm:px-8 lg:px-12">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-accent">{t.music.kicker}</span>
          </Reveal>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <Reveal delay={0.06}>
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                {t.music.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-xs text-balance text-base text-muted">{t.music.intro}</p>
            </Reveal>
          </div>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-foreground/80">
              <Emph text={t.music.flStudioIntro} />
            </p>
          </Reveal>
        </div>
      </header>

      {/* Live sets — play on site via the global player */}
      <section className="mx-auto mt-20 max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {t.music.youtubeTitle}
          </span>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-5 md:grid-cols-2" stagger={0.1}>
          <RevealItem>
            <button
              type="button"
              onClick={() => playTrack(cercleSets[0].id, { expand: true })}
              className="group relative block aspect-video w-full overflow-hidden rounded-2xl text-left"
            >
              <ArtImage
                src={images.liveViolet}
                alt="Le Cercle · live set"
                fallback="amber"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0"
                imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
              </ArtImage>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent">Le Cercle</p>
                  <h2 className="mt-1 text-2xl font-medium tracking-tight">
                    {cercleSets[0].name}
                  </h2>
                  <p className="mt-1 text-sm text-foreground/70">{t.music.playInPlayer}</p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 group-hover:scale-105 group-hover:bg-accent">
                  <PlayIcon className="ml-0.5 h-4 w-4" />
                </span>
              </div>
            </button>
          </RevealItem>
          <RevealItem>
            <a
              href={socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-video w-full overflow-hidden rounded-2xl"
            >
              <ArtImage
                src={images.liveChampagne}
                alt="Pablito · YouTube"
                fallback="slate"
                pattern="lines"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0"
                imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
              </ArtImage>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-accent">YouTube</p>
                  <h2 className="mt-1 text-2xl font-medium tracking-tight">
                    {t.music.youtubeTitle}
                  </h2>
                  <p className="mt-1 text-sm text-foreground/70">{t.music.youtubeLine}</p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-foreground transition-all duration-300 group-hover:border-accent/60 group-hover:text-accent">
                  <YoutubeIcon className="h-5 w-5" />
                </span>
              </div>
            </a>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Sets live — every recorded set outside the official Le Cercle editions */}
      <section className="mx-auto mt-20 max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            {t.music.setsLiveLabel}
          </span>
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              {t.music.setsLiveTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted">{t.music.setsLiveIntro}</p>
          </Reveal>
        </div>

        <SetsCarousel sets={liveSetsMusic} nowPlayingLabel={t.music.nowPlaying} />
      </section>

      {/* Platform embeds */}
      <section className="mx-auto mt-20 max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{t.music.platforms}</span>
        </Reveal>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-2xl border border-line bg-background-elevated/60">
            <div className="flex items-center justify-between px-6 pt-5">
              <h2 className="text-sm uppercase tracking-[0.25em] text-muted">
                {t.music.spotifyTitle} · Spotify
              </h2>
              <a
                href={socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
              >
                {t.music.openPlatform} ↗
              </a>
            </div>
            <div className="p-4">
              <iframe
                src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
                title="Pablito on Spotify"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="overflow-hidden rounded-2xl border border-line bg-background-elevated/60">
            <div className="flex items-center justify-between px-6 pt-5">
              <h2 className="text-sm uppercase tracking-[0.25em] text-muted">
                {t.music.soundcloudTitle} · SoundCloud
              </h2>
              <a
                href={socials.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
              >
                {t.music.openPlatform} ↗
              </a>
            </div>
            <div className="p-4">
              <iframe
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                  soundcloudProfileUrl
                )}&color=%23d8c8a8&auto_play=false&hide_related=true&show_comments=false&show_user=true&visual=false`}
                title="Pablito on SoundCloud"
                width="100%"
                height="352"
                allow="autoplay"
                loading="lazy"
                className="rounded-xl"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
