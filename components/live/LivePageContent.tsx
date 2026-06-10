"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GradientArt } from "@/components/ui/GradientArt";

export function LivePageContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero kicker={t.live.kicker} title={t.live.title} intro={t.live.intro} />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
              <GradientArt variant="violet" pattern="circle" className="h-full w-full" />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center gap-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.4em] text-accent">{t.live.experienceLabel}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl">{t.live.experienceTitle}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-balance text-base leading-relaxed text-muted sm:text-lg">{t.live.experienceBody}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-background-elevated/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <SectionHeading kicker={t.live.capabilitiesLabel} title={t.live.capabilitiesTitle} />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {t.live.capabilities.map((capability, i) => (
              <RevealItem key={capability.title}>
                <div className="flex h-full flex-col gap-4 bg-background p-8">
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <h3 className="text-lg font-medium tracking-tight">{capability.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{capability.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.4em] text-accent">{t.live.testimonialsLabel}</span>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {t.live.testimonials.map((testimonial) => (
            <RevealItem key={testimonial.author}>
              <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-line p-8">
                <blockquote className="text-balance text-lg leading-relaxed tracking-tight">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="text-sm uppercase tracking-[0.2em] text-muted">{testimonial.author}</figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl">{t.live.ctaTitle}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted sm:text-lg">{t.live.ctaBody}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <Button href="/contact">{t.live.ctaButton}</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
