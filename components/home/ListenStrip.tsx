"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { usePlayer } from "@/lib/player/PlayerProvider";
import { Reveal } from "@/components/ui/Reveal";
import { socials, playerQueue } from "@/lib/data";
import {
  SpotifyIcon,
  SoundcloudIcon,
  YoutubeIcon,
  InstagramIcon,
  PlayIcon,
} from "@/components/ui/icons";

const platformLinks = [
  { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
  { href: socials.soundcloud, label: "SoundCloud", Icon: SoundcloudIcon },
  { href: socials.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function ListenStrip() {
  const { t } = useLanguage();
  const { playTrack } = usePlayer();

  return (
    <section className="border-y border-line bg-background-elevated/40">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:px-8 md:flex-row md:items-center lg:px-12">
        <div>
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {t.home.listenLabel}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
              {t.home.listenTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-2 max-w-md text-sm text-muted">{t.home.listenLine}</p>
          </Reveal>
        </div>
        <Reveal delay={0.18} className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => playTrack(playerQueue[0].id)}
            aria-label={t.home.heroPlay}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 hover:scale-105 hover:bg-accent hover:shadow-[0_0_30px_rgba(216,200,168,0.4)]"
          >
            <PlayIcon className="ml-0.5 h-5 w-5" />
          </button>
          <div className="flex items-center gap-5">
            {platformLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted transition-colors duration-300 hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
