"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projects, categoryLabels } from "@/data/projects";
import { pieces } from "@/data/pieces";
import { audioTracks } from "@/data/audio";
import { SoundLibrary } from "@/components/repertoire/SoundLibrary";
import type { Project, ProjectCategory, ProjectMedia } from "@/lib/content/types";

type Filter = "all" | ProjectCategory;

const CATS: ProjectCategory[] = ["design", "video", "sound"];
const ease = [0.16, 1, 0.3, 1] as const;
const HASH_PREFIX = "#projet-";

/**
 * The Répertoire as contact sheets: every published project is a full-width
 * row whose media scroll by in their native formats — the work is visible
 * before any click. Strips drift slowly on their own (paused on hover/touch,
 * off under reduced-motion), teasers play muted when the row is on screen.
 * The modal stays as the detail view, deep-linkable, never a toll gate.
 */
export function Catalogue({ standalone = false }: { standalone?: boolean }) {
  const { t, locale } = useLanguage();
  const w = t.work;
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // The important work first: published rows, in data order.
  const published = useMemo(() => projects.filter((p) => p.status === "published"), []);
  const pending = useMemo(() => projects.filter((p) => p.status !== "published"), []);

  const rows = useMemo(
    () => (filter === "all" ? published : published.filter((p) => p.category === filter)),
    [filter, published],
  );
  const pendingFiltered = useMemo(
    () => (filter === "all" ? pending : pending.filter((p) => p.category === filter)),
    [filter, pending],
  );

  // Honest counts: each universe counts what it actually shows —
  // projects, plus the poster wall for Image, plus the tracks for Son.
  const counts = useMemo(() => {
    const map: Record<Filter, number> = { all: 0, design: pieces.length, video: 0, sound: audioTracks.length };
    projects.forEach((p) => {
      map[p.category] += 1;
    });
    map.all = map.design + map.video + map.sound;
    return map;
  }, []);

  const openProject = useMemo(
    () => projects.find((p) => p.slug === openSlug) ?? null,
    [openSlug],
  );

  // Deep link: open from #projet-<slug> on load, keep the hash in sync.
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash;
      if (h.startsWith(HASH_PREFIX)) {
        const slug = decodeURIComponent(h.slice(HASH_PREFIX.length));
        if (projects.some((p) => p.slug === slug)) {
          setOpenSlug(slug);
        }
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const open = useCallback((slug: string, el: HTMLElement) => {
    triggerRef.current = el;
    setOpenSlug(slug);
    history.replaceState(null, "", `${HASH_PREFIX}${slug}`);
  }, []);

  const close = useCallback(() => {
    setOpenSlug(null);
    history.replaceState(null, "", window.location.pathname);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  return (
    <section
      id="projets"
      className={`bg-paper-2 px-6 sm:px-10 lg:px-16 ${standalone ? "py-16 sm:py-20" : "py-24 sm:py-32"}`}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index={standalone ? "01" : "02"} label={w.label} />
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealText
            as="h2"
            text={w.title}
            className="font-display uppercase"
            style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
          />
          <Reveal delayIndex={1} as="p" className="text-mute max-w-xs text-base leading-relaxed">
            {w.intro}
          </Reveal>
        </div>

        {/* Filters — instant, evenly measured */}
        <Reveal delayIndex={1}>
          <div className="border-line mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t pt-5">
            {(["all", ...CATS] as Filter[]).map((f) => {
              const label = f === "all" ? w.filterAll : categoryLabels[f][locale];
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`relative whitespace-nowrap pb-1.5 text-sm font-medium transition-colors duration-200 ${
                    active ? "text-ink" : "text-faint hover:text-mute"
                  }`}
                >
                  {label}
                  <span className="text-faint ml-1.5 align-super text-[0.6rem]">{counts[f]}</span>
                  {active && (
                    <motion.span
                      layoutId="filter-underline"
                      transition={{ duration: 0.4, ease }}
                      className="bg-ink absolute bottom-0 left-0 h-[2px] w-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Contact sheets */}
        <div className="mt-4">
          <AnimatePresence mode="popLayout">
            {rows.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease, delay: (i % 3) * 0.06 }}
              >
                <ProjectRow project={p} index={i} openLabel={w.open} onOpen={open} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* La Table d'écoute — the sound library owns the Son universe */}
          {(filter === "all" || filter === "sound") && <SoundLibrary />}

          {/* Pieces — the poster wall: strong one-shot visuals, no chrome */}
          {(filter === "all" || filter === "design") && pieces.length > 0 && (
            <Reveal className="border-line mt-2 border-t pt-8 pb-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-faint text-sm tracking-tight" aria-hidden>
                  {String(rows.length + 1).padStart(2, "0")}
                </span>
                <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.2em]">
                  {w.pieces}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                {pieces.map((piece) =>
                  piece.src ? (
                    <figure key={piece.id} className="group">
                      <div
                        className="border-line bg-paper relative h-60 overflow-hidden border sm:h-72"
                        style={{ aspectRatio: `${piece.w ?? 4} / ${piece.h ?? 5}` }}
                      >
                        <Image
                          src={piece.src}
                          alt={piece.title[locale]}
                          fill
                          sizes="(max-width: 640px) 60vw, 320px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      </div>
                      <figcaption className="mt-2 flex items-baseline justify-between gap-3">
                        <span className="font-display text-ink truncate text-sm" style={{ fontWeight: 600 }}>
                          {piece.title[locale]}
                        </span>
                        {piece.year && (
                          <span className="text-faint shrink-0 text-[0.6rem] uppercase tracking-[0.14em] whitespace-nowrap">
                            {piece.year}
                          </span>
                        )}
                      </figcaption>
                    </figure>
                  ) : (
                    <figure key={piece.id}>
                      <div
                        className="border-line bg-paper relative h-60 overflow-hidden border sm:h-72"
                        style={{ aspectRatio: "3 / 4" }}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 opacity-40"
                          style={{
                            backgroundImage: "radial-gradient(rgba(10,10,10,0.25) 1px, transparent 1.4px)",
                            backgroundSize: "9px 9px",
                            maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 75%)",
                            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 75%)",
                          }}
                        />
                        <span className="text-faint absolute right-3 top-3 text-[0.6rem] font-medium uppercase tracking-[0.18em]">
                          {w.comingSoon}
                        </span>
                      </div>
                      <figcaption className="mt-2">
                        <span className="font-display text-mute truncate text-sm" style={{ fontWeight: 600 }}>
                          {piece.title[locale]}
                        </span>
                      </figcaption>
                    </figure>
                  ),
                )}
              </div>
            </Reveal>
          )}

          {/* Coming soon — quiet slots, never broken holes */}
          {pendingFiltered.length > 0 && (
            <Reveal className="border-line mt-2 border-t pt-8 pb-4">
              <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.2em]">
                {w.comingSoon}
              </span>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2.5">
                {pendingFiltered.map((p) => (
                  <li key={p.slug} className="flex items-baseline gap-2 whitespace-nowrap">
                    <span className="bg-ink/30 h-1.5 w-1.5 shrink-0 self-center rounded-full" aria-hidden />
                    <span className="font-display text-mute text-base" style={{ fontWeight: 600 }}>
                      {p.title[locale]}
                    </span>
                    <span className="text-faint text-xs">{categoryLabels[p.category][locale]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>

      <ProjectModal project={openProject} onClose={close} />
    </section>
  );
}

/* ── One project = one sheet ──────────────────────────────────────────── */

function ProjectRow({
  project,
  index,
  openLabel,
  onOpen,
}: {
  project: Project;
  index: number;
  openLabel: string;
  onOpen: (slug: string, el: HTMLElement) => void;
}) {
  const { locale } = useLanguage();

  // Videos lead, then images — the moving work catches the eye first.
  const strip: ProjectMedia[] = useMemo(() => {
    const all = [
      ...(project.cover
        ? [{ src: project.cover, w: project.coverW, h: project.coverH }]
        : []),
      ...(project.media ?? []).filter((m) => m.src !== project.cover),
    ];
    const videos = all.filter((m) => m.type === "video");
    const images = all.filter((m) => m.type !== "video");
    return [...videos, ...images];
  }, [project]);

  return (
    <article className="border-line border-t py-10 first:border-t-0 sm:py-12">
      <div className="grid gap-6 lg:grid-cols-[15rem_1fr]">
        {/* Meta — the bar number, the name, the door to the detail */}
        <div className="flex flex-row items-baseline gap-x-5 gap-y-2 lg:flex-col lg:items-start">
          <span className="font-display text-faint text-sm tracking-tight" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <button
              type="button"
              onClick={(e) => onOpen(project.slug, e.currentTarget)}
              className="group text-left"
            >
              <h3
                className="font-display text-ink transition-colors duration-200 group-hover:text-mute"
                style={{ fontSize: "clamp(1.35rem,2.4vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
              >
                {project.title[locale]}
              </h3>
            </button>
            <p className="text-faint mt-2 text-[0.65rem] font-medium uppercase tracking-[0.16em]">
              <span className="whitespace-nowrap">{categoryLabels[project.category][locale]}</span>
              {project.year && <span className="whitespace-nowrap">{` · ${project.year}`}</span>}
            </p>
            <button
              type="button"
              onClick={(e) => onOpen(project.slug, e.currentTarget)}
              className="group text-ink mt-4 hidden items-center gap-2 text-sm font-medium lg:inline-flex"
            >
              {openLabel}
              <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>

        {/* The sheet — media laid out in justified tiers: uniform heights,
            native ratios, everything visible at once, nothing overflowing */}
        <MediaMosaic strip={strip} project={project} onOpen={onOpen} />
      </div>
    </article>
  );
}

/**
 * Justified tiers ("étages", à la Rémi Gatteaux / GLGTH): media pack into rows
 * of uniform height that fill the width edge to edge, each tile keeping its
 * native aspect ratio — nothing overflows, nothing looks oversized next to a
 * thumbnail. The last row stays at target height, left-aligned, rather than
 * stretching. Video ratios settle on metadata load, then the layout re-packs.
 */
function MediaMosaic({
  strip,
  project,
  onOpen,
}: {
  strip: ProjectMedia[];
  project: Project;
  onOpen: (slug: string, el: HTMLElement) => void;
}) {
  const { locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false);
  // Measured video aspect ratios (w/h), keyed by src.
  const [videoAr, setVideoAr] = useState<Record<string, number>>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const GAP = 10;
  const targetH = width < 640 ? 190 : width < 1024 ? 240 : 280;

  // Greedy justification into rows.
  const rows = useMemo(() => {
    if (!width) return [];
    const arOf = (m: ProjectMedia) =>
      m.type === "video" ? (videoAr[m.src] ?? 0.5625) : (m.w ?? 4) / (m.h ?? 5);
    const out: { items: { m: ProjectMedia; w: number }[]; h: number }[] = [];
    let line: ProjectMedia[] = [];
    let arSum = 0;
    for (const m of strip) {
      line.push(m);
      arSum += arOf(m);
      const rowW = arSum * targetH + GAP * (line.length - 1);
      if (rowW >= width) {
        const avail = width - GAP * (line.length - 1);
        const h = avail / arSum;
        out.push({ h, items: line.map((it) => ({ m: it, w: arOf(it) * h })) });
        line = [];
        arSum = 0;
      }
    }
    if (line.length) {
      const h = Math.min(targetH, (width - GAP * (line.length - 1)) / arSum);
      out.push({ h, items: line.map((it) => ({ m: it, w: arOf(it) * h })) });
    }
    return out;
  }, [strip, width, targetH, videoAr]);

  return (
    <div ref={ref} className="flex flex-col" style={{ gap: GAP }}>
      {rows.map((row, ri) => (
        <div key={ri} className="flex" style={{ gap: GAP, height: row.h }}>
          {row.items.map(({ m, w }) => (
            <button
              key={m.src}
              type="button"
              onClick={(e) => onOpen(project.slug, e.currentTarget)}
              aria-label={project.title[locale]}
              className={`group border-line relative shrink-0 overflow-hidden border ${m.type === "video" ? "bg-ink" : "bg-paper"}`}
              style={{ width: w, height: row.h }}
            >
              {m.type === "video" ? (
                <MosaicVideo
                  media={m}
                  active={inView && !reduced}
                  onMeta={(ar) => setVideoAr((prev) => (prev[m.src] === ar ? prev : { ...prev, [m.src]: ar }))}
                />
              ) : (
                <Image
                  src={m.src}
                  alt={m.alt?.[locale] ?? project.title[locale]}
                  fill
                  sizes="(max-width: 640px) 60vw, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function MosaicVideo({
  media,
  active,
  onMeta,
}: {
  media: ProjectMedia;
  active: boolean;
  onMeta: (ar: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Muted autoplay only while the sheet is on screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  return (
    <>
      <video
        ref={videoRef}
        src={media.src}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (v.videoWidth && v.videoHeight) onMeta(v.videoWidth / v.videoHeight);
        }}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <span className="text-paper/80 absolute bottom-2.5 right-3 text-[0.6rem] font-medium uppercase tracking-[0.15em]">
        ▶ muet
      </span>
    </>
  );
}
