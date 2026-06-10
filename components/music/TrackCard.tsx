"use client";

import { GradientArt } from "@/components/ui/GradientArt";
import { PlayIcon, SpotifyIcon, SoundcloudIcon, YoutubeIcon } from "@/components/ui/icons";
import type { ArtVariant } from "@/lib/data";

const platformIcons: Record<string, typeof SpotifyIcon> = {
  Spotify: SpotifyIcon,
  SoundCloud: SoundcloudIcon,
  YouTube: YoutubeIcon,
};

export function TrackCard({
  title,
  type,
  platform,
  variant,
  pattern = "circle",
}: {
  title: string;
  type: string;
  platform: string;
  variant: ArtVariant;
  pattern?: "circle" | "lines" | "grid";
}) {
  const Icon = platformIcons[platform] ?? SpotifyIcon;

  return (
    <div className="group flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line">
        <GradientArt variant={variant} pattern={pattern} className="h-full w-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/30 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground/95 text-background shadow-[0_0_30px_rgba(216,200,168,0.35)] transition-transform duration-500 group-hover:scale-105">
            <PlayIcon className="ml-1 h-5 w-5" />
          </span>
        </div>
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-foreground backdrop-blur-sm">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div>
        <h3 className="text-base font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted">{type}</p>
      </div>
    </div>
  );
}
