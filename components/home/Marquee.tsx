"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { clubs } from "@/lib/data";

export function Marquee() {
  const { t } = useLanguage();
  const row = [...clubs, ...clubs];

  return (
    <div className="border-y border-line bg-background-elevated/40">
      <div className="relative overflow-hidden py-5">
        <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap pr-12">
          {row.map((club, i) => (
            <a
              key={`${club.name}-${i}`}
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-12 text-sm uppercase tracking-[0.35em] text-muted/70 transition-colors duration-300 hover:text-foreground"
            >
              <span className="transition-all duration-300 group-hover:[text-shadow:0_0_18px_rgba(216,200,168,0.4)]">
                {club.name}
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent/40" />
            </a>
          ))}
        </div>
      </div>
      <p className="px-6 pb-5 text-center text-xs italic text-muted/60 sm:px-8">
        {t.home.collabsExtra}
      </p>
    </div>
  );
}
