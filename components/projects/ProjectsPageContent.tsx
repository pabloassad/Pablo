"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { Button } from "@/components/ui/Button";
import { images, clubs, cercleInstagram, cercleStats } from "@/lib/data";
import { InstagramIcon } from "@/components/ui/icons";
import { StatCounter } from "@/components/ui/StatCounter";
import { SetsCarousel } from "./SetsCarousel";

export function ProjectsPageContent() {
  const { t } = useLanguage();

  return (
    <div className="pb-32">
      {/* Hero — black & white crowd */}
      <header className="relative flex min-h-[70svh] items-end overflow-hidden">
        <ArtImage
          src={images.crowdBW}
          alt="Pablito — crowd"
          fallback="slate"
          pattern="lines"
          priority
          sizes="100vw"
          className="absolute inset-0"
          imgClassName="object-cover object-[center_30%] grayscale"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
        </ArtImage>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 sm:px-8 lg:px-12">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-accent">
              {t.projects.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              {t.projects.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-md text-balance text-base text-foreground/75 sm:text-lg">
              {t.projects.intro}
            </p>
          </Reveal>
        </div>
      </header>

      {/* A. Booking — clubs & stages */}
      <section id="clubs" className="mx-auto mt-24 max-w-7xl scroll-mt-28 px-6 sm:px-8 lg:px-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            {t.projects.clubsLabel}
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            {t.projects.clubsTitle}
          </h2>
        </Reveal>
        <RevealGroup
          className="mt-10 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4"
          stagger={0.05}
        >
          {clubs.map((club) => (
            <RevealItem key={club.name}>
              <a
                href={club.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-28 flex-col items-center justify-center gap-3 border-b border-r border-line px-4 transition-colors duration-500 hover:bg-white/[0.03] sm:h-32"
              >
                <Image
                  src={club.logo}
                  alt={club.name}
                  width={120}
                  height={48}
                  className="h-8 w-auto object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:h-10"
                />
                <span className="text-[11px] uppercase tracking-[0.25em] text-muted transition-all duration-500 group-hover:text-foreground group-hover:[text-shadow:0_0_24px_rgba(216,200,168,0.45)]">
                  {club.name}
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-6 text-sm italic text-muted/70">{t.projects.collabsExtra}</p>
        </Reveal>
      </section>

      {/* B. Le Cercle — case study */}
      <section id="cercle" className="relative mt-32 scroll-mt-20 overflow-hidden">
        <div className="pointer-events-none absolute -left-[30vmin] top-0 hidden lg:block">
          <div className="spin-slow h-[80vmin] w-[80vmin] rounded-full border border-white/[0.05]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="text-xs uppercase tracking-[0.4em] text-accent">
                  {t.projects.cercleLabel}
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
                  {t.projects.cercleTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-foreground/85">
                  {t.projects.cercleIntro}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-4 max-w-lg text-balance text-base leading-relaxed text-muted">
                  {t.projects.cercleBody}
                </p>
              </Reveal>
              <RevealGroup className="mt-7 flex flex-wrap gap-3" stagger={0.06}>
                {t.projects.cercleTags.map((tag) => (
                  <RevealItem key={tag}>
                    <span className="rounded-full border border-line px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted">
                      {tag}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
              <Reveal delay={0.22}>
                <a
                  href={cercleInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted transition-colors duration-300 hover:text-accent"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {t.projects.cercleInstagram}
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <ArtImage
                src={images.liveClub}
                alt="Le Cercle — Pablito in the booth"
                fallback="amber"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/3] overflow-hidden rounded-2xl"
                imgClassName="object-cover"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </ArtImage>
            </Reveal>
          </div>

          {/* Live archive — Cercle Sets */}
          <div className="mt-24">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-accent">
                {t.projects.setsLabel}
              </span>
            </Reveal>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <Reveal delay={0.05}>
                <h3 className="text-3xl font-medium tracking-tight sm:text-4xl">
                  {t.projects.setsTitle}
                </h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-sm text-sm text-muted">{t.projects.setsIntro}</p>
              </Reveal>
            </div>

            <SetsCarousel />
          </div>

          {/* Animated stats band */}
          <RevealGroup
            className="mt-24 grid grid-cols-2 gap-10 border-t border-line pt-12 sm:grid-cols-4"
            stagger={0.08}
          >
            <RevealItem>
              <StatCounter value={cercleStats.participants} label={t.projects.statsParticipants} />
            </RevealItem>
            <RevealItem>
              <StatCounter value={cercleStats.editions} label={t.projects.statsEditions} />
            </RevealItem>
            <RevealItem>
              <StatCounter value={cercleStats.views} label={t.projects.statsViews} />
            </RevealItem>
            <RevealItem>
              <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <StatCounter
                  value={String(cercleStats.partners.length)}
                  label={t.projects.statsPartners}
                />
                <p className="text-xs tracking-[0.15em] text-muted/70">
                  {cercleStats.partners.join(" · ")}
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* C. Premium & Private Events */}
      <section id="premium" className="mx-auto mt-32 max-w-7xl scroll-mt-28 px-6 sm:px-8 lg:px-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            {t.projects.premiumLabel}
          </span>
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              {t.projects.premiumTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-muted">{t.projects.premiumIntro}</p>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3" stagger={0.08}>
          {t.projects.premiumPoints.map((point, i) => (
            <RevealItem key={point.title} className="bg-background">
              <div className="group flex h-full flex-col gap-4 p-8 transition-colors duration-500 hover:bg-white/[0.02]">
                <span className="text-xs tracking-[0.3em] text-accent/80">0{i + 1}</span>
                <h3 className="text-xl font-medium tracking-tight">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{point.line}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pt-28 text-center sm:px-8">
        <Reveal>
          <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            {t.projects.ctaTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex justify-center">
            <Button href="/contact">{t.projects.ctaButton}</Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
