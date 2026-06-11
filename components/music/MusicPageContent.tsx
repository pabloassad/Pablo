"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { Emph } from "@/components/ui/Emph";
import { SetsCarousel } from "@/components/projects/SetsCarousel";
import {
  images,
  socials,
  spotifyArtistId,
  soundcloudProfileUrl,
  liveSetsMusic,
} from "@/lib/data";
import { YoutubeIcon } from "@/components/ui/icons";

export function MusicPageContent() {
  const { t } = useLanguage();

  return (
    <div className="pb-32">
      {/* Header — studio and composition */}
      <header className="relative flex min-h-[85svh] items-end overflow-hidden sm:min-h-[70svh]">
        <ArtImage
          src={images.studioSession}
          alt="Pablito · mains sur le clavier"
          fallback="slate"
          priority
          sizes="100vw"
          className="absolute inset-0"
          imgClassName="object-cover object-[center_50%]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background from-15% via-background/75 via-50% to-background/10" />
        </ArtImage>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 sm:px-8 sm:pt-40 lg:px-12">
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

      {/* Sets live — Le Cercle highlight and every other recorded live set */}
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

        <Reveal delay={0.15} className="mt-5">
          <a
            href={socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex aspect-[21/9] w-full items-end overflow-hidden rounded-2xl sm:aspect-[3/1]"
          >
            <ArtImage
              src={images.liveChampagne}
              alt="Pablito · YouTube"
              fallback="slate"
              pattern="lines"
              sizes="100vw"
              className="absolute inset-0"
              imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            </ArtImage>
            <div className="relative flex w-full items-end justify-between gap-4 p-6 sm:p-7">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-accent">YouTube</p>
                <h2 className="mt-1 text-xl font-medium tracking-tight sm:text-2xl">
                  {t.music.youtubeTitle}
                </h2>
                <p className="mt-1 text-sm text-foreground/70">{t.music.youtubeLine}</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-foreground transition-all duration-300 group-hover:border-accent/60 group-hover:text-accent sm:h-12 sm:w-12">
                <YoutubeIcon className="h-5 w-5" />
              </span>
            </div>
          </a>
        </Reveal>
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
