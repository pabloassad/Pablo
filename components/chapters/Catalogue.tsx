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
import type { Project, ProjectCategory, ProjectMedia, Piece } from "@/lib/content/types";

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

  // Detached pieces split by medium — images feed the Image universe, moving
  // pieces (Ruby, Manifesto) feed Vidéo.
  const imagePieces = useMemo(() => pieces.filter((p) => (p.type ?? "image") !== "video"), []);
  const videoPieces = useMemo(() => pieces.filter((p) => p.type === "video"), []);

  // The wall shows the pieces that belong to the active universe.
  const visiblePieces = useMemo(() => {
    if (filter === "sound") return [];
    if (filter === "design") return imagePieces;
    if (filter === "video") return videoPieces;
    return pieces;
  }, [filter, imagePieces, videoPieces]);

  // Honest counts: each universe counts what it actually shows —
  // projects, plus its detached pieces, plus the tracks for Son.
  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      all: 0,
      design: imagePieces.length,
      video: videoPieces.length,
      sound: audioTracks.length,
    };
    projects.forEach((p) => {
      map[p.category] += 1;
    });
    map.all = map.design + map.video + map.sound;
    return map;
  }, [imagePieces.length, videoPieces.length]);

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

          {/* Pièces détachées — a borderless, edge-to-edge wall of one-shot
              visuals (images and moving pieces), packed into justified tiers */}
          {visiblePieces.length > 0 && (
            <Reveal className="border-line mt-2 border-t pt-8 pb-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-faint text-sm tracking-tight" aria-hidden>
                  {String(rows.length + 1).padStart(2, "0")}
                </span>
                <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.2em]">
                  {w.pieces}
                </span>
              </div>
              <PieceWall pieces={visiblePieces} comingSoonLabel={w.comingSoon} />
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

  const GAP = 6;
  const targetH = width < 640 ? 240 : width < 1024 ? 340 : 420;

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
              className={`group relative shrink-0 overflow-hidden ${m.type === "video" ? "bg-ink" : "bg-paper-2"}`}
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
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 560px"
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
      <span aria-hidden className="text-paper/70 absolute bottom-2.5 right-3 text-[0.6rem]">
        ▶
      </span>
    </>
  );
}

/**
 * The detached-pieces wall — the same justified-tier packing as the project
 * sheets, but chrome-free: no borders, tight gutters, near full-bleed tiles,
 * no two rows alike. Titles surface only on hover so the visuals lead; video
 * pieces autoplay muted while the wall is on screen; a missing visual becomes
 * a quiet placeholder rather than a hole.
 */
function PieceWall({ pieces, comingSoonLabel }: { pieces: Piece[]; comingSoonLabel: string }) {
  const { locale } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [width, setWidth] = useState(0);
  const [inView, setInView] = useState(false);
  const [videoAr, setVideoAr] = useState<Record<string, number>>({});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const GAP = 6;
  const targetH = width < 640 ? 260 : width < 1024 ? 340 : 420;

  const arOf = useCallback(
    (p: Piece) =>
      p.type === "video"
        ? (videoAr[p.src ?? p.id] ?? (p.w ?? 16) / (p.h ?? 9))
        : (p.w ?? 3) / (p.h ?? 4),
    [videoAr],
  );

  // Greedy justification into rows — identical grammar to the project sheets.
  const rows = useMemo(() => {
    if (!width) return [];
    const out: { items: { p: Piece; w: number }[]; h: number }[] = [];
    let line: Piece[] = [];
    let arSum = 0;
    for (const p of pieces) {
      line.push(p);
      arSum += arOf(p);
      const rowW = arSum * targetH + GAP * (line.length - 1);
      if (rowW >= width) {
        const avail = width - GAP * (line.length - 1);
        const h = avail / arSum;
        out.push({ h, items: line.map((it) => ({ p: it, w: arOf(it) * h })) });
        line = [];
        arSum = 0;
      }
    }
    if (line.length) {
      const h = Math.min(targetH, (width - GAP * (line.length - 1)) / arSum);
      out.push({ h, items: line.map((it) => ({ p: it, w: arOf(it) * h })) });
    }
    return out;
  }, [pieces, width, targetH, arOf]);

  return (
    <div ref={ref} className="mt-6 flex flex-col" style={{ gap: GAP }}>
      {rows.map((row, ri) => (
        <div key={ri} className="flex" style={{ gap: GAP, height: row.h }}>
          {row.items.map(({ p, w }) => (
            <figure
              key={p.id}
              className={`group relative shrink-0 overflow-hidden ${p.type === "video" ? "bg-ink" : "bg-paper-2"}`}
              style={{ width: w, height: row.h }}
            >
              {p.src ? (
                p.type === "video" ? (
                  <PieceVideo
                    piece={p}
                    active={inView && !reduced}
                    onMeta={(ar) =>
                      setVideoAr((prev) => (prev[p.src!] === ar ? prev : { ...prev, [p.src!]: ar }))
                    }
                  />
                ) : (
                  <Image
                    src={p.src}
                    alt={p.title[locale]}
                    fill
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 520px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
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

              {/* Discrete caption — surfaces on hover/focus, silent otherwise */}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-gradient-to-t from-ink/70 to-transparent px-3 pt-8 pb-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-display text-paper truncate text-sm" style={{ fontWeight: 600 }}>
                  {p.title[locale]}
                </span>
                <span className="text-paper/70 shrink-0 text-[0.6rem] uppercase tracking-[0.14em] whitespace-nowrap">
                  {p.src ? p.year : comingSoonLabel}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

function PieceVideo({
  piece,
  active,
  onMeta,
}: {
  piece: Piece;
  active: boolean;
  onMeta: (ar: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
        src={piece.src}
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
      <span aria-hidden className="text-paper/70 absolute bottom-2.5 right-3 text-[0.6rem]">
        ▶
      </span>
    </>
  );
}
