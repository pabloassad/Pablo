"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Pillars() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-line bg-background-elevated/40">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.4em] text-accent">{t.home.pillarsLabel}</span>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {t.home.pillars.map((pillar, i) => (
            <RevealItem key={pillar.title}>
              <div className="group relative flex h-full flex-col gap-4 bg-background p-8 transition-colors duration-500 hover:bg-background-elevated lg:p-10">
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted sm:text-base">{pillar.text}</p>
                <div className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
