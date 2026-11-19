"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { RichText } from "@/components/ui/RichText";
import { saveRepertoireScroll } from "@/lib/repertoireScroll";
import type { CaseStudy } from "@/lib/content/types";

const posterFor = (src: string) => src.replace(/\.mp4$/, "-poster.webp");

/** The tile image for a case: the cover still (or a video cover's poster),
 *  else null → a light logo card. */
function tileImage(study: CaseStudy): string | null {
  if (!study.cover) return null;
  return study.coverType === "video" ? posterFor(study.cover) : study.cover;
}

function Caption({ study, dark, big }: { study: CaseStudy; dark: boolean; big?: boolean }) {
  const { locale } = useLanguage();
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3
          className={`font-display uppercase ${dark ? "text-paper" : "text-ink"}`}
          style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: big ? "clamp(1.4rem,2.6vw,2.3rem)" : "clamp(1.05rem,1.5vw,1.45rem)" }}
        >
          {study.title[locale]}
        </h3>
        <span className={`${dark ? "text-paper/60" : "text-faint"} shrink-0 text-[0.6rem] uppercase tracking-[0.16em]`}>
          {study.year}
        </span>
      </div>
      <p className={`mt-1 text-pretty ${dark ? "text-paper/85" : "text-mute"} ${big ? "max-w-md text-sm" : "line-clamp-2 text-xs"}`}>
        <RichText text={study.result[locale]} strongClass={dark ? "text-paper font-semibold" : "text-ink font-semibold"} />
      </p>
    </>
  );
}

function Tile({ study, className, big }: { study: CaseStudy; className?: string; big?: boolean }) {
  const { locale } = useLanguage();
  const img = tileImage(study);

  return (
    <Link
      href={`/repertoire/${study.slug}`}
      onClick={saveRepertoireScroll}
      aria-label={study.title[locale]}
      className={`group border-line relative block overflow-hidden border ${className ?? ""}`}
    >
      {img ? (
        <>
          <Image
            src={img}
            alt=""
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <Caption study={study} dark big={big} />
          </div>
        </>
      ) : (
        <div className="bg-paper-2 absolute inset-0 flex flex-col">
          <div className="flex flex-1 items-center justify-center p-6">
            {study.logo ? (
              <span className="relative block h-12 w-28 sm:h-14 sm:w-36">
                <Image src={study.logo} alt="" fill sizes="160px" className="object-contain" />
              </span>
            ) : (
              <span className="font-display text-ink/90 text-3xl" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                {study.title[locale]}
              </span>
            )}
          </div>
          <div className="p-4 sm:p-5">
            <Caption study={study} dark={false} />
          </div>
        </div>
      )}
    </Link>
  );
}

/**
 * The projects as an interlocking bento, not a stacked list: the strongest case
 * leads as a tall tile, the others packed around it so the set reads on one
 * screen — a puzzle, not a scroll. Falls back to a plain grid off four.
 */
export function CaseMosaic({ cases }: { cases: CaseStudy[] }) {
  if (cases.length === 0) return null;

  if (cases.length === 4) {
    const [a, b, c, d] = cases;
    return (
      <div className="mt-2 grid grid-cols-2 gap-2 px-1 sm:px-2 lg:h-[34rem] lg:grid-cols-4 lg:grid-rows-2">
        <Tile study={a} big className="col-span-2 aspect-[16/10] lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full" />
        <Tile study={b} className="col-span-2 aspect-[16/9] lg:col-span-2 lg:aspect-auto lg:h-full" />
        <Tile study={c} className="aspect-[4/5] lg:aspect-auto lg:h-full" />
        <Tile study={d} className="aspect-[4/5] lg:aspect-auto lg:h-full" />
      </div>
    );
  }

  return (
    <div className="mt-2 grid grid-cols-2 gap-2 px-1 sm:px-2 lg:grid-cols-3">
      {cases.map((study) => (
        <Tile key={study.slug} study={study} className="aspect-[4/3]" />
      ))}
    </div>
  );
}
