"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Placeholder for the signature particle-portrait (R3F). Kept intentional and
 * on-brand — a Swiss framed plate with a faint particle field — until Pablo's
 * photo is available, at which point this becomes the live points-cloud canvas.
 */
export function PortraitPlate() {
  const { locale } = useLanguage();

  return (
    <figure className="relative">
      <div className="border-line bg-paper-2 relative aspect-[4/5] w-full overflow-hidden border">
        {/* Faint particle field — evokes the coming points-cloud */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10,10,10,0.28) 1px, transparent 1.4px)",
            backgroundSize: "10px 10px",
            maskImage:
              "radial-gradient(ellipse 60% 55% at 50% 42%, #000 30%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 55% at 50% 42%, #000 30%, transparent 72%)",
          }}
        />
        {/* Corner ticks */}
        <span className="border-ink/40 absolute left-3 top-3 h-3 w-3 border-l border-t" aria-hidden />
        <span className="border-ink/40 absolute right-3 top-3 h-3 w-3 border-r border-t" aria-hidden />
        <span className="border-ink/40 absolute bottom-3 left-3 h-3 w-3 border-b border-l" aria-hidden />
        <span className="border-ink/40 absolute bottom-3 right-3 h-3 w-3 border-b border-r" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
          <span className="kicker">Portrait</span>
          <span className="text-faint text-[0.65rem] tracking-[0.15em] uppercase">
            {locale === "fr" ? "Particules — à venir" : "Particles — soon"}
          </span>
        </div>
      </div>
    </figure>
  );
}
