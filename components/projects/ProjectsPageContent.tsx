"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { usePlayer } from "@/lib/player/PlayerProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { Button } from "@/components/ui/Button";
import { images, venueLogos, cercleSets } from "@/lib/data";
import { PlayIcon } from "@/components/ui/icons";

export function ProjectsPageContent() {
  const { t } = useLanguage();
  const player = usePlayer();

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
          {venueLogos.map((venue) => (
            <RevealItem key={venue}>
              <div className="group flex h-28 items-center justify-center border-b border-r border-line px-4 transition-colors duration-500 hover:bg-white/[0.03] sm:h-32">
                <span className="text-sm uppercase tracking-[0.25em] text-muted transition-all duration-500 group-hover:scale-105 group-hover:text-foreground group-hover:[text-shadow:0_0_24px_rgba(216,200,168,0.45)]">
                  {venue}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
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

            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {cercleSets.map((set) => {
                const isCurrent = player.track?.id === set.id;
                return (
                  <RevealItem key={set.id}>
                    <button
                      type="button"
                      onClick={() => player.playTrack(set.id, { expand: true })}
                      className="group relative block aspect-square w-full overflow-hidden rounded-2xl text-left"
                    >
                      <ArtImage
                        src={images.liveClub}
                        alt={`Le Cercle — Edition ${set.edition}`}
                        fallback="amber"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="absolute inset-0"
                        imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                      </ArtImage>
                      {/* Ring motif */}
                      <span className="pointer-events-none absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-full border border-foreground/25 text-xs tracking-[0.2em] text-foreground/80 backdrop-blur-sm transition-all duration-500 group-hover:border-accent/70 group-hover:text-accent">
                        {set.edition}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-accent">
                            {isCurrent ? t.projects.nowPlaying : "Le Cercle"}
                          </p>
                          <h4 className="mt-1 text-xl font-medium tracking-tight">
                            Edition {set.edition}
                          </h4>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 group-hover:scale-105 group-hover:bg-accent">
                          {isCurrent && player.isPlaying ? (
                            <span className="flex items-end gap-[2px]">
                              {[0, 1, 2].map((bar) => (
                                <span
                                  key={bar}
                                  className="eq-bar w-[2.5px] rounded-full bg-background"
                                  style={{ animationDelay: `${bar * 0.18}s`, height: "10px" }}
                                />
                              ))}
                            </span>
                          ) : (
                            <PlayIcon className="ml-0.5 h-4 w-4" />
                          )}
                        </span>
                      </div>
                    </button>
                  </RevealItem>
                );
              })}
              <RevealItem>
                <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed border-line">
                  <p className="max-w-[12rem] text-center text-sm text-muted/70">
                    {t.projects.setsMore}
                  </p>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* C. Battle / All-Style */}
      <section id="battle" className="mt-32 scroll-mt-28 border-y border-line bg-background-elevated/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">
              {t.projects.battleLabel}
            </span>
          </Reveal>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                {t.projects.battleTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm uppercase tracking-[0.25em] text-muted">
                {t.projects.battleIntro}
              </p>
            </Reveal>
          </div>
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3" stagger={0.08}>
            {t.projects.battlePoints.map((point, i) => (
              <RevealItem key={point.title} className="bg-background">
                <div className="group flex h-full flex-col gap-4 p-8 transition-colors duration-500 hover:bg-white/[0.02]">
                  <span className="text-xs tracking-[0.3em] text-accent/80">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl font-medium tracking-tight">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{point.line}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
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
