"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { Button } from "@/components/ui/Button";
import { Emph } from "@/components/ui/Emph";
import { images } from "@/lib/data";

/*
 * Service window — a brighter, warmer counterpoint to the dark universe of
 * the rest of the site: cream text panels, denim photo series, soft filter.
 */
const panel = {
  group: "mt-12 grid gap-px overflow-hidden rounded-2xl bg-[#ddd3c2] md:grid-cols-3 lg:grid-cols-4",
  cell: "bg-[#f0ebe3]",
  number: "text-xs tracking-[0.3em] text-[#8a7456]",
  heading: "text-xl font-medium tracking-tight text-[#1f1b16]",
  body: "text-sm leading-relaxed text-[#5c5347]",
};

export function ServicePageContent() {
  const { t } = useLanguage();

  return (
    <div className="pb-32 pt-28 lg:pt-36">
      {/* Header — denim series, white backdrop */}
      <header className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="text-xs uppercase tracking-[0.4em] text-accent">
                {t.service.kicker}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                {t.service.title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-balance text-base text-muted sm:text-lg">
                {t.service.intro}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <ArtImage
              src={images.premiumPortrait}
              alt="Pablito · portrait"
              fallback="gold"
              tone="soft"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[3/4] overflow-hidden rounded-2xl"
              imgClassName="object-cover object-[center_15%]"
            />
          </Reveal>
        </div>
      </header>

      {/* A. Private events — migrated content, untouched wording */}
      <section id="events" className="mx-auto mt-28 max-w-7xl scroll-mt-28 px-6 sm:px-8 lg:px-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            {t.service.eventsLabel}
          </span>
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                {t.service.eventsTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-2 text-sm italic tracking-wide text-accent/80">
                {t.service.eventsAxis}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              <Emph text={t.service.eventsIntro} />
            </p>
          </Reveal>
        </div>
        <RevealGroup className={panel.group} stagger={0.08}>
          <RevealItem className={`min-h-48 lg:min-h-0 ${panel.cell}`}>
            <ArtImage
              src={images.serviceEvents}
              alt="Pablito · portrait"
              fallback="gold"
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="h-full w-full"
              imgClassName="object-cover object-[center_20%]"
            />
          </RevealItem>
          {t.service.eventsPoints.map((point, i) => (
            <RevealItem key={point.title} className={panel.cell}>
              <div className="flex h-full flex-col gap-4 p-8">
                <span className={panel.number}>0{i + 1}</span>
                <h3 className={panel.heading}>{point.title}</h3>
                <p className={panel.body}>{point.line}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* B. Custom compositions — FL Studio production for commissions */}
      <section
        id="compositions"
        className="mx-auto mt-28 max-w-7xl scroll-mt-28 px-6 sm:px-8 lg:px-12"
      >
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            {t.service.compositionsLabel}
          </span>
        </Reveal>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              {t.service.compositionsTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              <Emph text={t.service.compositionsIntro} />
            </p>
          </Reveal>
        </div>
        <RevealGroup className={panel.group} stagger={0.08}>
          <RevealItem className={`min-h-48 lg:min-h-0 ${panel.cell}`}>
            <ArtImage
              src={images.studioFlStudio}
              alt="Pablito · studio"
              fallback="gold"
              tone="soft"
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="h-full w-full"
              imgClassName="object-cover object-[center_50%] md:object-[center_35%]"
            />
          </RevealItem>
          {t.service.compositionsPoints.map((point, i) => (
            <RevealItem key={point.title} className={panel.cell}>
              <div className="flex h-full flex-col gap-4 p-8">
                <span className={panel.number}>0{i + 1}</span>
                <h3 className={panel.heading}>{point.title}</h3>
                <p className={panel.body}>{point.line}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pt-28 text-center sm:px-8">
        <Reveal>
          <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            {t.service.ctaTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex justify-center">
            <Button href="/contact">{t.service.ctaButton}</Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
