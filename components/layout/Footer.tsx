"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { socials, contactEmail } from "@/lib/data";
import { SpotifyIcon, SoundcloudIcon, YoutubeIcon, InstagramIcon } from "@/components/ui/icons";

const socialLinks = [
  { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
  { href: socials.soundcloud, label: "SoundCloud", Icon: SoundcloudIcon },
  { href: socials.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-semibold tracking-[0.25em]">PABLITO</p>
            <p className="mt-2 max-w-xs text-sm text-muted">{t.home.heroTagline}</p>
          </div>
          <div className="flex gap-5">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted transition-colors duration-300 hover:text-accent"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Pablito. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${contactEmail}`} className="transition-colors duration-300 hover:text-foreground">
              {contactEmail}
            </a>
            <Link href="/privacy" className="transition-colors duration-300 hover:text-foreground">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
