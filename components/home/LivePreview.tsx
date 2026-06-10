"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GradientArt } from "@/components/ui/GradientArt";

export function LivePreview() {
  const { t } = useLanguage();

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-line">
        <GradientArt variant="gold" pattern="lines" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="relative flex min-h-[420px] flex-col justify-end gap-6 p-8 sm:p-12 lg:p-16">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-accent">{t.home.liveLabel}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
              {t.home.liveTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/live">{t.home.liveCta}</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
