"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function VenuesGrid() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading kicker={t.projects.venuesLabel} title={t.projects.venuesTitle} intro={t.projects.venuesIntro} />
        <RevealGroup className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {t.projects.venues.map((venue) => (
            <RevealItem key={venue}>
              <div className="group flex h-28 items-center justify-center bg-background px-4 text-center transition-colors duration-500 hover:bg-background-elevated sm:h-36">
                <span className="text-lg font-medium tracking-tight text-muted transition-colors duration-300 group-hover:text-foreground sm:text-xl">
                  {venue}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
