"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { images, type ArtVariant } from "@/lib/data";

const visuals: { src: string; fallback: ArtVariant; position: string }[] = [
  { src: images.clubCrowd, fallback: "rose", position: "object-[center_35%]" },
  { src: images.studioComposition, fallback: "slate", position: "object-[center_40%]" },
];

export function Duo() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 sm:px-8 sm:pb-36 lg:px-12">
      <Reveal>
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{t.home.duoLabel}</span>
      </Reveal>
      <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2" stagger={0.12}>
        {t.home.duo.map((item, i) => (
          <RevealItem key={item.title}>
            <Link
              href={item.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[3/4] md:aspect-[4/5]"
            >
              <ArtImage
                src={visuals[i].src}
                alt={item.title}
                fallback={visuals[i].fallback}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0"
                imgClassName={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${visuals[i].position}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </ArtImage>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 sm:p-9">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{item.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-foreground/80">{item.line}</p>
                </div>
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-foreground/80 transition-all duration-300 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-background"
                >
                  →
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
