"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { RichText } from "@/components/ui/RichText";
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
 * A quiet editorial list of case studies — each row a link to its dedicated,
 * shareable page, the result line proving the thinking before you even open it.
 * Used for the non-featured studies (the featured ones lead as full blocks).
 * `startNumber` continues the numbering after the featured cases.
 */
export function CaseList({ cases, startNumber = 0 }: { cases: CaseStudy[]; startNumber?: number }) {
  const { locale } = useLanguage();
  if (cases.length === 0) return null;

  return (
    <ol className="mt-2 px-1 sm:px-2">
      {cases.map((study, i) => (
        <li key={study.slug}>
          <Link
            href={`/repertoire/${study.slug}`}
            className="group border-line hover:bg-paper/60 flex items-center gap-4 border-t py-4 transition-colors last:border-b sm:gap-6"
          >
            <span className="mono text-faint hidden text-sm sm:block" aria-hidden>
              {String(startNumber + i + 1).padStart(2, "0")}
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
  );
}
