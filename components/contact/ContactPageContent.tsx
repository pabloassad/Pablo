"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactEmail, socials } from "@/lib/data";
import { SpotifyIcon, SoundcloudIcon, YoutubeIcon, InstagramIcon } from "@/components/ui/icons";

const socialLinks = [
  { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
  { href: socials.soundcloud, label: "SoundCloud", Icon: SoundcloudIcon },
  { href: socials.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero kicker={t.contact.kicker} title={t.contact.title} intro={t.contact.intro} />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-col gap-10 lg:border-l lg:border-line lg:pl-12">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{t.contact.directLabel}</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-3 block text-xl font-medium tracking-tight transition-colors duration-300 hover:text-accent sm:text-2xl"
                >
                  {contactEmail}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{t.contact.socialLabel}</p>
                <div className="mt-4 flex gap-5">
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
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
