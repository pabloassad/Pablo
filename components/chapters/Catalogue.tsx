"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useAudio } from "@/lib/audio/AudioProvider";
import { useElementWidth } from "@/lib/hooks/useElementWidth";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { RichText } from "@/components/ui/RichText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lightbox, type LightboxMedia } from "@/components/ui/Lightbox";
import { pieces } from "@/data/pieces";
import { caseStudies } from "@/data/caseStudies";
import { SoundLibrary } from "@/components/repertoire/SoundLibrary";
import { CaseList } from "@/components/repertoire/CaseIndex";
import { saveRepertoireScroll, takeRepertoireScroll } from "@/lib/repertoireScroll";
import type { CaseStudy, Piece, ProjectMedia } from "@/lib/content/types";

// The dedicated hero video that opens the Répertoire full screen (cut for
// this page). It lives only in the hero, never inline in a sheet.
const HERO_SRC = "/works/adonis/hero.mp4";
// Every video ships a ~40 KB poster next to it (same name, -poster.webp) so a
// still paints instantly and the clip is fetched only when needed.
const posterFor = (src: string) => src.replace(/\.mp4$/, "-poster.webp");

/**
 * The Répertoire, unsequenced: one continuous visual flow — every published
 * project as a full-bleed contact sheet, then the detached pieces folded into
 * the same stream, then the Table d'écoute as the closing movement. No
 * filters, no medium tabs: the work speaks first. A minimal Visuel · Son
 * anchor is the only navigation. Videos can be un-muted in place (hover on
 * desktop, tap on mobile) — one sound at a time across the whole site.
 */
export function Catalogue({ standalone = false }: { standalone?: boolean }) {
  const { t } = useLanguage();
  const w = t.work;
  // One click = the piece alone, larger, centre screen. No dedicated panel.
  const [expanded, setExpanded] = useState<LightboxMedia | null>(null);

  const expand = useCallback((m: LightboxMedia) => setExpanded(m), []);
  const collapse = useCallback(() => setExpanded(null), []);

  const featured = useMemo(() => caseStudies.filter((c) => c.featured), []);
  const others = useMemo(() => caseStudies.filter((c) => !c.featured), []);

  // Returning from a case study: land back exactly where the visitor left, not
  // at the top. The page is held invisible until the media grids have settled
  // their heights, then restored once and revealed — so there is no flash of a
  // wrong scroll position while the layout grows.
  const [restoring, setRestoring] = useState(false);
  useEffect(() => {
    if (!standalone) return;
    const y = takeRepertoireScroll();
    if (y === null) return;
    setRestoring(true);
    let cancelled = false;
    let frames = 0;
    // Re-assert the scroll every frame (beating Lenis / hash anchoring) but only
    // once the page has grown tall enough to actually reach y; reveal the moment
    // it is settled there. Hidden throughout, so no wrong position ever shows.
    const loop = () => {
      if (cancelled) return;
      frames++;
      const canReach = document.documentElement.scrollHeight - window.innerHeight >= y - 2;
      if (canReach) {
        const l = window.__lenis;
        if (l) l.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
      }
      const atY = Math.abs(window.scrollY - y) < 4;
      if ((canReach && atY) || frames > 90) {
        requestAnimationFrame(() => !cancelled && setRestoring(false));
        return;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    return () => {
      cancelled = true;
    };
  }, [standalone]);

  return (
    <section
      id="projets"
      className={`bg-paper-2 px-3 sm:px-6 lg:px-8 ${standalone ? "pt-0 pb-0" : "py-24"}`}
      style={restoring ? { opacity: 0 } : { opacity: 1, transition: "opacity 0.25s ease" }}
    >
      {standalone ? (
        <RepertoireHero />
      ) : (
        <div className="px-1 sm:px-2">
          <Reveal>
            <SectionLabel index="01" label={w.label} />
          </Reveal>
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <RevealText
              as="h2"
              text={w.title}
              className="font-display uppercase text-balance"
              style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
            />
            <Reveal delayIndex={1} as="p" className="text-mute max-w-xs text-base leading-relaxed text-pretty">
              {w.intro}
            </Reveal>
          </div>
        </div>
      )}

      <FlowAnchor />

      {/* Études de cas — the wow: featured projects lead with their full visuals
          and key figures inline, then the rest as a compact index. */}
      <div id="cas" className="mx-auto mt-12 max-w-[2100px] scroll-mt-28">
        <Reveal as="div">
          <header className="mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-1 sm:px-2">
            <h2
              className="font-display text-ink uppercase"
              style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.95 }}
            >
              {w.casesTitle}
            </h2>
            <p className="text-faint max-w-sm text-[0.8rem] leading-relaxed">{w.casesIntro}</p>
          </header>
        </Reveal>
        {featured.map((c, i) => (
          <FeaturedCase key={c.slug} study={c} index={i} onExpand={expand} />
        ))}
        <CaseList cases={others} startNumber={featured.length} />
      </div>

      {/* Pièces détachées — a wide selection, the rest behind "see more" */}
      <div id="visuel" className="mx-auto mt-28 max-w-[2100px] scroll-mt-28">
        {pieces.length > 0 && (
          <Reveal>
            <header className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 px-1 sm:px-2">
              <h2
                className="font-display text-ink uppercase"
                style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.95 }}
              >
                {w.pieces}
              </h2>
              <p className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.16em]">{w.piecesNote}</p>
            </header>
            <PieceWall pieces={pieces} comingSoonLabel={w.comingSoon} onExpand={expand} />
          </Reveal>
        )}
      </div>

      {/* The closing movement */}
      <SoundLibrary />

      <Lightbox media={expanded} onClose={collapse} />
    </section>
  );
}

/* ── Featured case: the visual content as a contact sheet, key figures below ── */

function MediaGrid({
  media,
  keyPrefix,
  title,
  onExpand,
}: {
  media: ProjectMedia[];
  keyPrefix: string;
  title: string;
  onExpand: (m: LightboxMedia) => void;
}) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [videoAr, setVideoAr] = useState<Record<string, number>>({});

  const GAP = 6;
  const targetH = width < 640 ? 240 : width < 1024 ? 360 : width < 1600 ? 480 : 560;
  const HERO = 1.42; // the opening media runs taller — the block's accroche

  const rows = useMemo(() => {
    const arOf = (m: ProjectMedia) =>
      m.type === "video" ? (videoAr[m.src] ?? 0.5625) : (m.w ?? 4) / (m.h ?? 5);
    const featureOf = (m: ProjectMedia) => (m === media[0] ? HERO : 1);
    return justifyRows(media, width, GAP, targetH, arOf, featureOf);
  }, [media, width, targetH, videoAr]);

  return (
    <div ref={ref} className="flex flex-col" style={{ gap: GAP }}>
      {rows.map((row, ri) => (
        <div key={ri} className="flex" style={{ gap: GAP, height: row.h }}>
          {row.items.map(({ it: m, w }) =>
            m.type === "video" ? (
              <div key={m.src} className="bg-paper-2 relative shrink-0 overflow-hidden" style={{ width: w, height: row.h }}>
                <VideoTile
                  id={`${keyPrefix}:${m.src}`}
                  src={m.src}
                  title={title}
                  onMeta={(ar) => setVideoAr((prev) => (prev[m.src] === ar ? prev : { ...prev, [m.src]: ar }))}
                  onExpand={() => onExpand({ src: m.src, type: "video", alt: title, ar: videoAr[m.src] ?? 0.5625 })}
                />
              </div>
            ) : (
              <button
                key={m.src}
                type="button"
                onClick={() => onExpand({ src: m.src, alt: title, ar: (m.w ?? 4) / (m.h ?? 5) })}
                aria-label={title}
                className="group bg-paper-2 relative shrink-0 overflow-hidden"
                style={{ width: w, height: row.h }}
              >
                <Image
                  src={m.src}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, (max-width: 1600px) 40vw, 640px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </button>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

function FeaturedCase({ study, index, onExpand }: { study: CaseStudy; index: number; onExpand: (m: LightboxMedia) => void }) {
  const { t, locale } = useLanguage();
  const w = t.work;
  const media: ProjectMedia[] = [
    ...(study.cover ? [{ src: study.cover, type: study.coverType, w: study.coverW, h: study.coverH }] : []),
    ...(study.media ?? []),
  ];
  const meta = [study.role[locale], study.client ? "Client" : null, study.year].filter(Boolean) as string[];

  return (
    <Reveal as="div">
      <article className="border-line border-t py-10 first:border-t-0 sm:py-12">
        <header className="mb-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 px-1 sm:px-2">
          <span className="mono text-faint text-sm" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="font-display text-ink"
            style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
          >
            {study.title[locale]}
          </h3>
          <p className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.16em]">
            {meta.map((m, i) => (
              <span key={i}>
                {i > 0 && (
                  <span aria-hidden className="mx-1.5">
                    ·
                  </span>
                )}
                <span className="whitespace-nowrap">{m}</span>
              </span>
            ))}
          </p>
        </header>

        <MediaGrid media={media} keyPrefix={study.slug} title={study.title[locale]} onExpand={onExpand} />

        {/* Below the content: the line + key figures, and the way into the full study */}
        <div className="mt-6 grid gap-6 px-1 sm:px-2 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            {/* Lead: quiet by default so the bold facts carry the line and it
                sits a clear notch under the title (rarely wraps on desktop). */}
            <p
              className="font-display text-mute text-balance text-xl sm:text-2xl"
              style={{ lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              <RichText text={study.result[locale]} strongClass="text-ink font-semibold" />
            </p>
          </div>
          <Link
            href={`/repertoire/${study.slug}`}
            onClick={saveRepertoireScroll}
            className="group text-ink inline-flex items-center gap-2 self-start text-sm font-medium transition-colors md:self-end"
          >
            {w.caseRead}
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * The Répertoire curtain: the dedicated hero video opens the page full
 * viewport with the title over it, and the first scroll folds it into a
 * full-width band (height mapped 1:1 to scroll, native touch, no hijack).
 * Static band and no autoplay under reduced-motion.
 */
function RepertoireHero() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const set = () => setVh(window.innerHeight);
    set();
    window.addEventListener("resize", set, { passive: true });
    return () => window.removeEventListener("resize", set);
  }, []);

  const { scrollY } = useScroll();
  const NAV = 60; // fixed nav clearance
  const height = useTransform(
    scrollY,
    [0, Math.max(1, vh * 0.45)],
    [Math.max(1, vh - NAV), Math.max(1, vh * 0.56)],
  );
  const fade = useTransform(scrollY, [0, Math.max(1, vh * 0.32)], [1, 0]);
  const ready = vh > 0 && !reduced;

  return (
    <div className="-mx-3 sm:-mx-6 lg:-mx-8">
      <motion.div
        style={ready ? { height } : undefined}
        className={`bg-ink relative overflow-hidden ${
          ready ? "" : reduced ? "h-[56svh]" : "h-[calc(100svh-3.75rem)]"
        }`}
      >
        <VideoTile id="hero:repertoire" src={HERO_SRC} title="Adonis" silent eager />
        <motion.div
          style={ready ? { opacity: fade } : undefined}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/55 to-transparent px-4 pt-24 pb-6 sm:px-8 sm:pb-8"
        >
          <h1
            className="font-display text-paper uppercase"
            style={{ fontSize: "clamp(3rem,9.5vw,10rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.88 }}
          >
            {t.work.title}
          </h1>
          <p className="text-paper/80 mt-3 max-w-md text-sm text-pretty sm:text-base">{t.work.intro}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Minimal navigation: Visuel · Études · Son ────────────────────────── */

function FlowAnchor() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [active, setActive] = useState("visuel");
  // Hidden at the very top — the header should breathe on arrival; the anchor
  // materialises once exploration begins (reduced-motion: shown from the start).
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const update = () => setRevealed(reduced || window.scrollY > Math.max(96, window.innerHeight * 0.55));
    update();
    if (reduced) return;
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [reduced]);

  useEffect(() => {
    const ids = ["visuel", "cas", "son"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // don't also trigger the global Lenis anchor handler
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const item = (on: boolean) =>
    `relative px-1 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors ${
      on ? "text-ink" : "text-faint hover:text-mute"
    }`;

  const tabs: { id: string; label: string }[] = [
    { id: "cas", label: t.work.flowCases },
    { id: "visuel", label: t.work.flowPieces },
    { id: "son", label: t.work.flowSound },
  ];

  return (
    <div
      className="pointer-events-none sticky top-[4.75rem] z-30 -mx-3 my-6 flex justify-center transition-[opacity,transform] duration-500 ease-out sm:top-20 sm:-mx-6 lg:-mx-8"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(-8px)",
      }}
      aria-hidden={!revealed}
    >
      <div
        className={`border-line bg-paper/80 flex items-center gap-4 rounded-full border px-4 py-1.5 backdrop-blur-xl ${
          revealed ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {tabs.map((tab, i) => (
          <div key={tab.id} className="flex items-center gap-4">
            {i > 0 && <span className="bg-line h-3 w-px" aria-hidden />}
            <a href={`#${tab.id}`} onClick={go(tab.id)} className={item(active === tab.id)} tabIndex={revealed ? 0 : -1}>
              {tab.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Justified rows ("étages"): pack items into rows of a common height that fill
 * the width edge to edge, each keeping its native ratio — no crop, no bands.
 * `featureOf` (>1) makes an item's row taller (fewer items → bigger). Rules:
 * every row is closed (filled) except a non-full last row, which keeps natural
 * height rather than stretching; and a lone item never sits alone on the last
 * row (it borrows a neighbour). One helper for both projects and pieces.
 */
type JRow<T> = { items: { it: T; w: number }[]; h: number };
function justifyRows<T>(
  items: T[],
  width: number,
  gap: number,
  baseH: number,
  arOf: (it: T) => number,
  featureOf: (it: T) => number = () => 1,
): JRow<T>[] {
  if (!width || !items.length) return [];
  const lines: T[][] = [];
  let line: T[] = [];
  let arSum = 0;
  let maxFeat = 0;
  for (const it of items) {
    line.push(it);
    arSum += arOf(it);
    maxFeat = Math.max(maxFeat, featureOf(it));
    if (arSum * baseH * maxFeat + gap * (line.length - 1) >= width) {
      lines.push(line);
      line = [];
      arSum = 0;
      maxFeat = 0;
    }
  }
  if (line.length) lines.push(line);
  // No orphan: a single item on the last row borrows one from the previous row.
  const last = lines[lines.length - 1];
  if (lines.length >= 2 && last.length === 1) {
    const prev = lines[lines.length - 2];
    if (prev.length >= 2) last.unshift(prev.pop() as T);
  }
  return lines.map((row, i) => {
    const sum = row.reduce((s, it) => s + arOf(it), 0);
    const feat = Math.max(...row.map(featureOf));
    const avail = width - gap * (row.length - 1);
    const full = avail / sum;
    const isLast = i === lines.length - 1 && lines.length > 1;
    const h = isLast ? Math.min(baseH * feat, full) : full;
    return { h, items: row.map((it) => ({ it, w: arOf(it) * h })) };
  });
}

/**
 * A video tile that can sound: muted autoplay while on screen, and un-mutable
 * in place — hover with intent on desktop (250 ms so a passing cursor doesn't
 * trigger it), tap the speaker on mobile. Claiming sound hushes every other
 * source (global audio state); leaving the tile or scrolling it off screen
 * gives the floor back. Under reduced-motion, nothing autoplays and hover is
 * inert — only an explicit tap sounds.
 */
function VideoTile({
  id,
  src,
  title,
  onMeta,
  onExpand,
  silent = false,
  eager = false,
}: {
  id: string;
  src: string;
  title: string;
  onMeta?: (ar: number) => void;
  /** Click the tile to see it isolated and larger. */
  onExpand?: () => void;
  /** Hero use: no speaker control, no hover-sound (footage without audio). */
  silent?: boolean;
  /** Above-the-fold (hero): mount + preload immediately for an instant start. */
  eager?: boolean;
}) {
  const { t } = useLanguage();
  const { soundingVideo, requestVideoSound, releaseVideoSound } = useAudio();
  const reduced = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const wasVisible = useRef(false);
  // The heavy <video> is only rendered once the tile nears the viewport; until
  // then the ~40 KB poster carries the frame. This is what keeps the grid from
  // pulling every clip at once (was 32 mp4 / 302 MB on one mobile load).
  const [mounted, setMounted] = useState(eager);
  const [visible, setVisible] = useState(false);
  const sounding = soundingVideo === id;
  const poster = posterFor(src);

  useEffect(() => {
    if (mounted) return;
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "700px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  // Play only once the tile crosses the central band; rewind to the intro on entry.
  useEffect(() => {
    if (!mounted) return;
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), {
      threshold: 0,
      rootMargin: "-25% 0px -25% 0px",
    });
    io.observe(v);
    return () => io.disconnect();
  }, [mounted]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if ((visible && !reduced) || sounding) {
      if (visible && !wasVisible.current && !sounding) {
        try {
          v.currentTime = 0;
        } catch {
          /* not seekable yet — will start at 0 anyway on first play */
        }
      }
      v.play().catch(() => {});
    } else {
      v.pause();
    }
    wasVisible.current = visible;
  }, [visible, sounding, reduced, mounted]);

  useEffect(() => {
    const v = ref.current;
    if (v) v.muted = !sounding;
  }, [sounding, mounted]);

  useEffect(() => {
    if (!visible && sounding) releaseVideoSound(id);
  }, [visible, sounding, id, releaseVideoSound]);

  const enter = () => {
    if (reduced || silent) return;
    timer.current = window.setTimeout(() => requestVideoSound(id), 250);
  };
  const leave = () => {
    if (silent) return;
    window.clearTimeout(timer.current);
    releaseVideoSound(id);
  };

  return (
    <div ref={boxRef} className="absolute inset-0" onPointerEnter={enter} onPointerLeave={leave}>
      {/* Poster — instant paint, always under the (lazily mounted) video */}
      <Image src={poster} alt="" fill sizes="(max-width:1024px) 60vw, 640px" className="object-cover" />
      {mounted && (
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload={eager ? "auto" : "none"}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.videoWidth && v.videoHeight) onMeta?.(v.videoWidth / v.videoHeight);
          }}
          className="absolute inset-0 h-full w-full scale-[1.004] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      {onExpand && (
        <button type="button" onClick={onExpand} aria-label={title} className="absolute inset-0" />
      )}
      {!silent && (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (sounding) releaseVideoSound(id);
          else requestVideoSound(id);
        }}
        aria-label={sounding ? t.work.soundOff : t.work.soundOn}
        aria-pressed={sounding}
        className="bg-ink/50 text-paper hover:bg-ink/80 absolute bottom-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
          {sounding ? (
            <>
              <path d="M15.5 9.5a4 4 0 0 1 0 5" />
              <path d="M18 7.5a7 7 0 0 1 0 9" />
            </>
          ) : (
            <path d="M16 9.5l4.5 5M20.5 9.5l-4.5 5" />
          )}
        </svg>
      </button>
      )}
    </div>
  );
}

/** A single piece figure that fills whatever flex slot it's given. */
function PieceFigure({
  p,
  onMeta,
  onExpand,
  comingSoonLabel,
  style,
}: {
  p: Piece;
  onMeta: (ar: number) => void;
  onExpand: (m: LightboxMedia) => void;
  comingSoonLabel: string;
  style?: React.CSSProperties;
}) {
  const { locale } = useLanguage();
  const ar = (p.w ?? 3) / (p.h ?? 4);
  return (
    <figure className="group bg-paper-2 relative h-full min-w-0 overflow-hidden" style={style}>
      {p.src ? (
        p.type === "video" ? (
          <VideoTile
            id={`piece:${p.id}`}
            src={p.src}
            title={p.title[locale]}
            onMeta={onMeta}
            onExpand={() => onExpand({ src: p.src!, type: "video", alt: p.title[locale], ar })}
          />
        ) : (
          <button
            type="button"
            onClick={() => onExpand({ src: p.src!, alt: p.title[locale], ar })}
            aria-label={p.title[locale]}
            className="absolute inset-0"
          >
            <Image
              src={p.src}
              alt={p.title[locale]}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, (max-width: 1600px) 40vw, 560px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </button>
        )
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(10,10,10,0.22) 1px, transparent 1.4px)",
            backgroundSize: "9px 9px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 75%)",
          }}
        />
      )}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-gradient-to-t from-ink/70 to-transparent px-3 pt-8 pb-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-display text-paper truncate text-sm" style={{ fontWeight: 600 }}>
          {p.title[locale]}
        </span>
        <span className="text-paper/70 shrink-0 text-[0.6rem] uppercase tracking-[0.14em] whitespace-nowrap">
          {p.src ? p.year : comingSoonLabel}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * The detached-pieces wall — same justified grammar as the sheets, chrome-free,
 * folded straight into the flow (no rubric). Pieces sharing a `pair` id (e.g.
 * Rosa's flyer + menu) travel together as one unit, side by side at every
 * width. Titles surface on hover; video pieces autoplay muted and can be
 * un-muted; a missing visual becomes a quiet placeholder.
 */
// How many packed units show on arrival; the rest sit behind "see more".
const PIECES_VISIBLE = 10;

function PieceWall({ pieces, comingSoonLabel, onExpand }: { pieces: Piece[]; comingSoonLabel: string; onExpand: (m: LightboxMedia) => void }) {
  const { t } = useLanguage();
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [videoAr, setVideoAr] = useState<Record<string, number>>({});
  const [showAll, setShowAll] = useState(false);

  const GAP = 6;
  const targetH = width < 640 ? 260 : width < 1024 ? 360 : width < 1600 ? 460 : 540;

  const arOf = useCallback(
    (p: Piece) =>
      p.type === "video" ? (videoAr[p.src ?? p.id] ?? (p.w ?? 16) / (p.h ?? 9)) : (p.w ?? 3) / (p.h ?? 4),
    [videoAr],
  );

  const setMeta = useCallback(
    (src: string, ar: number) => setVideoAr((prev) => (prev[src] === ar ? prev : { ...prev, [src]: ar })),
    [],
  );

  // Group consecutive same-pair pieces into one unit; its aspect ratio is the
  // sum of its members', its feature the max — so the unit packs as a single
  // tile that never splits and can be featured bigger.
  const units = useMemo(() => {
    const out: { id: string; members: Piece[]; ar: number; feature: number }[] = [];
    for (const p of pieces) {
      const last = out[out.length - 1];
      if (p.pair && last && last.members[0].pair === p.pair) {
        last.members.push(p);
        last.ar += arOf(p);
        last.feature = Math.max(last.feature, p.feature ?? 1);
      } else {
        out.push({ id: p.id, members: [p], ar: arOf(p), feature: p.feature ?? 1 });
      }
    }
    return out;
  }, [pieces, arOf]);

  const visibleUnits = useMemo(() => units.slice(0, PIECES_VISIBLE), [units]);
  const restUnits = useMemo(() => units.slice(PIECES_VISIBLE), [units]);
  const restCount = restUnits.reduce((s, u) => s + u.members.length, 0);

  const visibleRows = useMemo(
    () => justifyRows(visibleUnits, width, GAP, targetH, (u) => u.ar, (u) => u.feature),
    [visibleUnits, width, targetH],
  );
  const restRows = useMemo(
    () => justifyRows(restUnits, width, GAP, targetH, (u) => u.ar, (u) => u.feature),
    [restUnits, width, targetH],
  );

  const renderRows = (rows: JRow<{ id: string; members: Piece[]; ar: number; feature: number }>[]) =>
    rows.map((row, ri) => (
      <div key={ri} className="flex" style={{ gap: GAP, height: row.h }}>
        {row.items.map(({ it: u, w }) => (
          <div key={u.id} className="flex shrink-0" style={{ width: w, height: row.h, gap: u.members.length > 1 ? 4 : 0 }}>
            {u.members.map((p) => (
              <PieceFigure
                key={p.id}
                p={p}
                onMeta={(ar) => setMeta(p.src ?? p.id, ar)}
                onExpand={onExpand}
                comingSoonLabel={comingSoonLabel}
                style={{ flex: `${arOf(p) / u.ar} 1 0%` }}
              />
            ))}
          </div>
        ))}
      </div>
    ));

  return (
    <div ref={ref} className="flex flex-col" style={{ gap: GAP }}>
      {renderRows(visibleRows)}

      {restCount > 0 && (
        <>
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                key="rest"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="flex flex-col" style={{ gap: GAP, paddingTop: GAP }}>
                  {renderRows(restRows)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="group mt-6 flex w-full items-center gap-4 text-[0.65rem] font-medium uppercase tracking-[0.2em]"
          >
            <span className="bg-line h-px flex-1" aria-hidden />
            <span className="text-faint group-hover:text-ink flex items-center gap-2 whitespace-nowrap transition-colors">
              {showAll ? t.work.seeLess : `${t.work.seeMore} · ${restCount}`}
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                {showAll ? "↑" : "↓"}
              </span>
            </span>
            <span className="bg-line h-px flex-1" aria-hidden />
          </button>
        </>
      )}
    </div>
  );
}
