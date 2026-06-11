"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactEmail, contactPhone, images, socials } from "@/lib/data";
import {
  SpotifyIcon,
  SoundcloudIcon,
  YoutubeIcon,
  InstagramIcon,
  LinkIcon,
} from "@/components/ui/icons";

const socialLinks = [
  { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
  { href: socials.soundcloud, label: "SoundCloud", Icon: SoundcloudIcon },
  { href: socials.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function ContactPageContent() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-28 sm:px-8 lg:px-12 lg:pt-36">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Editorial visual + direct contact */}
        <div>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-accent">
              {t.contact.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {t.contact.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-md text-balance text-base text-muted sm:text-lg">
              {t.contact.intro}
            </p>
          </Reveal>

          <div className="mt-10 space-y-7">
            <Reveal>
              <div className="flex flex-col gap-1.5">
                <span className="block whitespace-nowrap text-xs uppercase tracking-[0.25em] text-muted">
                  {t.contact.emailLabel}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-lg text-foreground transition-colors hover:text-accent"
                  >
                    {contactEmail}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={t.footer.copyLink}
                    className="relative text-muted transition-colors hover:text-accent"
                  >
                    <LinkIcon className="h-4 w-4" />
                    {copied && (
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-[11px] font-medium text-background">
                        {t.footer.linkCopied}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="flex flex-col gap-1.5">
                <span className="block whitespace-nowrap text-xs uppercase tracking-[0.25em] text-muted">
                  {t.contact.phoneLabel}
                </span>
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  className="block whitespace-nowrap text-lg tracking-[0.04em] text-foreground transition-colors hover:text-accent"
                >
                  {contactPhone}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="flex flex-col gap-1.5">
                <span className="block whitespace-nowrap text-xs uppercase tracking-[0.25em] text-muted">
                  {t.contact.socialLabel}
                </span>
                <div className="flex items-center gap-4">
                  {socialLinks.map(({ href, label, Icon }) => (
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
              </div>
            </Reveal>
          </div>
        </div>

        {/* Portrait + minimal form */}
        <div className="lg:pt-24">
          <Reveal delay={0.06}>
            <ArtImage
              src={images.pabloCarre}
              alt="Pablito · portrait"
              fallback="amber"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="mb-8 aspect-square overflow-hidden rounded-2xl"
              imgClassName="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-background-elevated/40 p-7 sm:p-9">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
