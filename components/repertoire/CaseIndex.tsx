"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/lib/content/types";

const posterFor = (src: string) => src.replace(/\.mp4$/, "-poster.webp");

/** Thumbnail for a study — the cover still, or a typographic card if none. */
function Thumb({ study }: { study: CaseStudy }) {
  const src = study.cover
    ? study.coverType === "video"
      ? posterFor(study.cover)
      : study.cover
    : null;
  if (!src) {
    const initials = study.title.fr
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <div className="bg-ink text-paper flex h-full w-full items-center justify-center">
        <span className="font-display text-lg" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
          {initials}
        </span>
      </div>
    );
  }
  return <Image src={src} alt="" fill sizes="112px" className="object-cover" />;
}

/**
 * "Études" — the case-study index. Not the justified grid: a quiet editorial
 * list where the result line proves the thinking before you even open a study.
 * Each row links to a dedicated, shareable page.
 */
export function CaseIndex() {
  const { t, locale } = useLanguage();
  const w = t.work;

  return (
    <Reveal className="mt-16">
      <div id="cas" className="scroll-mt-28">
        <header className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-1 sm:px-2">
          <h2
            className="font-display text-ink uppercase"
            style={{ fontSize: "clamp(1.5rem,3.2vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
          >
            {w.casesTitle}
          </h2>
          <p className="text-faint max-w-sm text-[0.8rem] leading-relaxed">{w.casesIntro}</p>
        </header>

        <ol className="px-1 sm:px-2">
          {caseStudies.map((study, i) => (
            <li key={study.slug}>
              <Link
                href={`/repertoire/${study.slug}`}
                className="group border-line hover:bg-paper/60 flex items-center gap-4 border-t py-4 transition-colors last:border-b sm:gap-6"
              >
                <span className="mono text-faint hidden text-sm sm:block" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative h-16 w-14 shrink-0 overflow-hidden sm:h-20 sm:w-16">
                  <Thumb study={study} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-x-3">
                    <h3 className="font-display text-ink truncate text-xl sm:text-2xl" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
                      {study.title[locale]}
                    </h3>
                    <span className="text-faint hidden shrink-0 text-[0.65rem] font-medium uppercase tracking-[0.16em] sm:block">
                      {study.year}
                    </span>
                  </div>
                  <p className="text-mute mt-1 text-sm leading-snug text-pretty">
                    <RichText text={study.result[locale]} />
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-faint shrink-0 pr-1 text-lg transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
