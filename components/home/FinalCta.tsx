"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
      <Reveal>
        <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
          {t.home.ctaTitle}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-9 flex justify-center">
          <Button href="/contact">{t.home.ctaButton}</Button>
        </div>
      </Reveal>
    </section>
  );
}
