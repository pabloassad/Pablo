"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  const { t } = useLanguage();

  return (
    <section id="universe" className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="spin-slow h-[80vmin] w-[80vmin] rounded-full border border-white/[0.05]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.4em] text-accent">
            {t.home.manifestoLabel}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-balance text-2xl font-light leading-snug tracking-tight sm:text-3xl md:text-[2.6rem] md:leading-[1.25]">
            “{t.home.manifestoQuote}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
