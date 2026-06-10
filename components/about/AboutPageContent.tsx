"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GradientArt } from "@/components/ui/GradientArt";

export function AboutPageContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero kicker={t.about.kicker} title={t.about.title} intro={t.about.intro} />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line lg:sticky lg:top-28">
              <GradientArt variant="rose" pattern="grid" className="h-full w-full" />
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            {t.about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-balance text-base leading-relaxed text-muted sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <blockquote className="mt-4 border-l border-accent/40 pl-6 text-balance text-xl font-medium leading-relaxed tracking-tight sm:text-2xl">
                {t.about.quote}
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-background-elevated/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-accent">{t.about.valuesLabel}</span>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {t.about.values.map((value, i) => (
              <RevealItem key={value.title}>
                <div className="flex h-full flex-col gap-4 bg-background p-8 lg:p-10">
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <h3 className="text-xl font-medium tracking-tight">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{value.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
