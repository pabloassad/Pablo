"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { socials } from "@/lib/data";
import { SpotifyIcon, SoundcloudIcon, YoutubeIcon, InstagramIcon, CopyIcon, CheckIcon } from "@/components/ui/icons";

const links = [
  { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
  { href: socials.soundcloud, label: "SoundCloud", Icon: SoundcloudIcon },
  { href: socials.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function SocialSidebar() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <div className="pointer-events-none fixed inset-y-0 right-4 z-40 hidden flex-col items-center justify-center gap-5 lg:flex xl:right-8">
      <div className="pointer-events-auto flex flex-col items-center gap-5">
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group text-muted transition-colors duration-300 hover:text-accent"
          >
            <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        ))}
        <div className="h-12 w-px bg-line" />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={t.footer.copyLink}
          title={t.footer.copyLink}
          className="group relative text-muted transition-colors duration-300 hover:text-accent"
        >
          {copied ? (
            <CheckIcon className="h-[18px] w-[18px] text-accent transition-opacity duration-150" />
          ) : (
            <CopyIcon className="h-[18px] w-[18px] transition-all duration-300 group-hover:-translate-y-0.5" />
          )}
          {copied && (
            <span className="absolute right-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-[11px] font-medium text-background">
              {t.footer.linkCopied}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
