"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  const { t } = useLanguage();

  return (
    <section id="universe" className="relative mx-auto max-w-5xl px-6 py-28 sm:px-8 sm:py-36 lg:py-44">
      <div className="flex flex-col items-center gap-8 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.4em] text-accent">{t.home.manifestoLabel}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            “{t.home.manifestoQuote}”
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-balance text-base text-muted sm:text-lg">{t.home.manifestoBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
