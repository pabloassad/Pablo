"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox, type LightboxMedia } from "@/components/ui/Lightbox";
import { RichText } from "@/components/ui/RichText";
import type { CaseStudy, Localized, ProjectMedia } from "@/lib/content/types";

const posterFor = (src: string) => src.replace(/\.mp4$/, "-poster.webp");

/** A muted, in-view autoplay clip with an instant poster; click to enlarge. */
function CaseVideo({ src, ar, onExpand }: { src: string; ar: number; onExpand: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const poster = posterFor(src);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const mount = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setMounted(true);
          mount.disconnect();
        }
      },
      { rootMargin: "700px 0px" },
    );
    mount.observe(el);
    return () => mount.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const v = ref.current;
    if (!v) return;
    const play = new IntersectionObserver(
      (e) => (e[0].isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { rootMargin: "-20% 0px -20% 0px" },
    );
    play.observe(v);
    return () => play.disconnect();
  }, [mounted]);

  return (
    <button ref={boxRef} type="button" onClick={onExpand} className="group relative block w-full overflow-hidden" style={{ aspectRatio: `${ar}` }}>
      <Image src={poster} alt="" fill sizes="(max-width: 1024px) 100vw, 900px" className="object-cover" />
      {mounted && (
        <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover" />
      )}
    </button>
  );
}

function CaseFigure({ m, alt, onExpand }: { m: ProjectMedia; alt: string; onExpand: (lb: LightboxMedia) => void }) {
  const ar = m.type === "video" ? (m.w ?? 9) / (m.h ?? 16) : (m.w ?? 4) / (m.h ?? 5);
  // Cap every figure to ~82vh so portrait media never tower; centred otherwise.
  return (
    <div className="mx-auto w-full" style={{ maxWidth: `min(100%, calc(82vh * ${ar}))` }}>
      {m.type === "video" ? (
        <CaseVideo src={m.src} ar={ar} onExpand={() => onExpand({ src: m.src, type: "video", alt, ar })} />
      ) : (
        <button
          type="button"
          onClick={() => onExpand({ src: m.src, alt, ar })}
          className="group relative block w-full overflow-hidden"
          style={{ aspectRatio: `${ar}` }}
        >
          <Image src={m.src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-cover" />
        </button>
      )}
    </div>
  );
}

function Cover({ study, onExpand }: { study: CaseStudy; onExpand: (lb: LightboxMedia) => void }) {
  if (!study.cover) return null;
  return (
    <div className="mx-auto mt-10 max-w-5xl overflow-hidden sm:mt-14">
      <CaseFigure
        m={{ src: study.cover, type: study.coverType, w: study.coverW, h: study.coverH }}
        alt={study.title.fr}
        onExpand={onExpand}
      />
    </div>
  );
}

/** A numbered prose block: mono index + label, then the body. */
function Block({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <Reveal className="border-line grid gap-3 border-t py-8 sm:grid-cols-[8rem_1fr] sm:gap-8 sm:py-10">
      <div className="flex items-baseline gap-3">
        <span className="mono text-faint text-sm">{index}</span>
        <span className="kicker">{label}</span>
      </div>
      <div className="max-w-2xl">{children}</div>
    </Reveal>
  );
}

/**
 * A case study told in full: hero, then Contexte / Enjeu / Décisions / Résultat,
 * the media, and a foot that moves to the next study or to contact. Reuses the
 * shared Lightbox for enlarge-with-sound.
 */
export function CaseStudyView({
  study,
  prev,
  next,
}: {
  study: CaseStudy;
  prev?: { slug: string; title: Localized };
  next?: { slug: string; title: Localized };
}) {
  const { t, locale } = useLanguage();
  const w = t.work;
  const [expanded, setExpanded] = useState<LightboxMedia | null>(null);

  const meta = [study.role[locale], study.client, study.year].filter(Boolean) as string[];

  return (
    <article className="px-4 pt-28 pb-24 sm:px-6 sm:pt-32 lg:px-8">
      {/* Head */}
      <div className="mx-auto max-w-5xl">
        <Link href="/repertoire#cas" className="group text-faint hover:text-ink inline-flex items-center gap-2 text-sm font-medium transition-colors">
          <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
          {w.caseBack}
        </Link>
        <p className="kicker mt-8">{w.casesTitle}</p>
        <h1
          className="font-display text-ink mt-3 uppercase"
          style={{ fontSize: "clamp(2.5rem,8vw,6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.9 }}
        >
          {study.title[locale]}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
          {meta.map((m, i) => (
            <span key={i} className="text-mute text-sm">
              {i > 0 && <span className="text-faint mr-3" aria-hidden>·</span>}
              {m}
            </span>
          ))}
        </div>
        <p className="font-display text-mute mt-8 max-w-3xl text-balance" style={{ fontSize: "var(--text-h3)", lineHeight: "var(--text-h3--line-height)", fontWeight: 400, letterSpacing: "-0.02em" }}>
          <RichText text={study.result[locale]} strongClass="text-ink font-bold" />
        </p>
      </div>

      <Cover study={study} onExpand={setExpanded} />

      {/* Story */}
      <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
        <Block index="01" label={w.caseContext}>
          <p className="text-mute text-lg font-light leading-relaxed text-pretty">
            <RichText text={study.context[locale]} />
          </p>
        </Block>
        <Block index="02" label={w.caseChallenge}>
          <p className="text-mute text-lg font-light leading-relaxed text-pretty">
            <RichText text={study.challenge[locale]} />
          </p>
        </Block>
        <Block index="03" label={w.caseDecisions}>
          <ul className="space-y-4">
            {study.decisions.map((d, i) => (
              <li key={i} className="text-mute flex gap-3 text-lg font-light leading-relaxed text-pretty">
                <span className="mono text-faint mt-1 shrink-0 text-xs" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span><RichText text={d[locale]} /></span>
              </li>
            ))}
          </ul>
        </Block>
        {study.metrics && study.metrics.length > 0 && (
          <Block index="04" label={w.caseResult}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {study.metrics.map((mt, i) => (
                <div key={i}>
                  <dt className="font-display text-ink text-3xl sm:text-4xl" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>{mt.value}</dt>
                  <dd className="text-faint mt-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] leading-snug">{mt.label[locale]}</dd>
                </div>
              ))}
            </dl>
          </Block>
        )}
      </div>

      {/* Media */}
      {study.media && study.media.length > 0 && (
        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-3 sm:mt-20">
          {study.media.map((m) => (
            <Reveal key={m.src}>
              <CaseFigure m={m} alt={study.title[locale]} onExpand={setExpanded} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Foot — next study + contact */}
      <div className="border-line mx-auto mt-20 max-w-5xl border-t pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-8">
            {prev && (
              <Link href={`/repertoire/${prev.slug}`} className="group">
                <span className="text-faint block text-[0.65rem] font-medium uppercase tracking-[0.18em]">{w.casePrev}</span>
                <span className="font-display text-ink group-hover:text-mute mt-1 block text-lg transition-colors" style={{ fontWeight: 700 }}>{prev.title[locale]}</span>
              </Link>
            )}
            {next && (
              <Link href={`/repertoire/${next.slug}`} className="group text-right sm:text-left">
                <span className="text-faint block text-[0.65rem] font-medium uppercase tracking-[0.18em]">{w.caseNext}</span>
                <span className="font-display text-ink group-hover:text-mute mt-1 block text-lg transition-colors" style={{ fontWeight: 700 }}>{next.title[locale]}</span>
              </Link>
            )}
          </div>
          <a href="/#contact" className="bg-ink text-paper inline-block shrink-0 self-start rounded-full px-6 py-3 text-sm font-medium transition-opacity duration-300 hover:opacity-85 sm:self-end">
            {w.caseCta}
          </a>
        </div>
      </div>

      <Lightbox media={expanded} onClose={() => setExpanded(null)} />
    </article>
  );
}
