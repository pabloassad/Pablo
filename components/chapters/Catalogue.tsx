"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useAudio } from "@/lib/audio/AudioProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projects, categoryLabels } from "@/data/projects";
import { pieces } from "@/data/pieces";
import { SoundLibrary } from "@/components/repertoire/SoundLibrary";
import type { Project, ProjectMedia, Piece } from "@/lib/content/types";

const HASH_PREFIX = "#projet-";

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
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const published = useMemo(() => projects.filter((p) => p.status === "published"), []);

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
        if (projects.some((p) => p.slug === slug)) setOpenSlug(slug);
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
      className={`bg-paper-2 px-3 sm:px-6 lg:px-8 ${standalone ? "pt-4 pb-16" : "py-24"}`}
    >
      <FlowAnchor />

      <div id="visuel" className="mx-auto max-w-[2100px] scroll-mt-28">
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

        {/* One flow: published projects, then the detached pieces, no headings */}
        <div className="mt-8">
          {published.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} openLabel={w.open} onOpen={open} />
          ))}

          {pieces.length > 0 && (
            <Reveal className="border-line mt-6 border-t pt-6">
              <PieceWall pieces={pieces} comingSoonLabel={w.comingSoon} />
            </Reveal>
          )}
        </div>
      </div>

      {/* The closing movement */}
      <SoundLibrary />

      <ProjectModal project={openProject} onClose={close} />
    </section>
  );
}

/* ── Minimal navigation: Visuel · Son ─────────────────────────────────── */

function FlowAnchor() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [onSound, setOnSound] = useState(false);
  // Hidden at the very top — the header should breathe on arrival; the anchor
  // materialises once exploration begins (reduced-motion: shown from the start).
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const update = () => setRevealed(reduced || window.scrollY > 72);
    update();
    if (reduced) return;
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [reduced]);

  useEffect(() => {
    const el = document.getElementById("son");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setOnSound(e.isIntersecting)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // don't also trigger the global Lenis anchor handler
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const item = (active: boolean) =>
    `relative px-1 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors ${
      active ? "text-ink" : "text-faint hover:text-mute"
    }`;

  return (
    <div
      className="pointer-events-none sticky top-14 z-30 -mx-3 mb-6 flex justify-center transition-[opacity,transform] duration-500 ease-out sm:top-16 sm:-mx-6 lg:-mx-8"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(-8px)",
      }}
      aria-hidden={!revealed}
    >
      <div className="border-line bg-paper/80 pointer-events-auto flex items-center gap-4 rounded-full border px-4 py-1.5 backdrop-blur-xl">
        <a href="#visuel" onClick={go("visuel")} className={item(!onSound)} tabIndex={revealed ? 0 : -1}>
          {t.work.flowVisual}
        </a>
        <span className="bg-line h-3 w-px" aria-hidden />
        <a href="#son" onClick={go("son")} className={item(onSound)} tabIndex={revealed ? 0 : -1}>
          {t.work.flowSound}
        </a>
      </div>
    </div>
  );
}

/* ── One project = one contact sheet ──────────────────────────────────── */

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

  // Media in data order — the author sequences the sheet.
  const strip: ProjectMedia[] = useMemo(
    () => [
      ...(project.cover ? [{ src: project.cover, w: project.coverW, h: project.coverH }] : []),
      ...(project.media ?? []).filter((m) => m.src !== project.cover),
    ],
    [project],
  );

  return (
    <article className="border-line border-t py-8 first:border-t-0 sm:py-10">
      <div className="grid gap-4 lg:grid-cols-[13rem_1fr]">
        {/* Meta — the bar number, the name, the door to the detail */}
        <div className="flex flex-row items-baseline gap-x-5 gap-y-2 px-1 lg:flex-col lg:items-start sm:px-2">
          <span className="font-display text-faint text-sm tracking-tight" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <button type="button" onClick={(e) => onOpen(project.slug, e.currentTarget)} className="group text-left">
              <h3
                className="font-display text-ink transition-colors duration-200 group-hover:text-mute text-balance"
                style={{ fontSize: "clamp(1.35rem,2.4vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
              >
                {project.title[locale]}
              </h3>
            </button>
            <p className="text-faint mt-2 text-[0.65rem] font-medium uppercase tracking-[0.16em]">
              <span className="whitespace-nowrap">{categoryLabels[project.category][locale]}</span>
              {project.year && <span className="whitespace-nowrap">{` · ${project.year}`}</span>}
            </p>
            {project.descriptor && (
              <p className="text-faint/80 mt-1.5 text-[0.62rem] tracking-[0.03em]">
                {project.descriptor[locale]}
              </p>
            )}
            <button
              type="button"
              onClick={(e) => onOpen(project.slug, e.currentTarget)}
              className="group text-ink mt-4 hidden items-center gap-2 text-sm font-medium lg:inline-flex"
            >
              {openLabel}
              <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        <MediaMosaic strip={strip} project={project} onOpen={onOpen} />
      </div>
    </article>
  );
}

/**
 * Justified tiers ("étages"): media pack into rows of uniform height that fill
 * the width edge to edge, each tile keeping its native ratio — chrome-free,
 * near full-bleed on desktop, no two rows alike. Video ratios settle on
 * metadata load, then the layout re-packs.
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
  const targetH = width < 640 ? 240 : width < 1024 ? 360 : width < 1600 ? 480 : 560;
  // The opening row runs taller — the block's accroche (videos lead it) reads
  // big without turning the flow into a wall of video.
  const heroH = Math.round(targetH * 1.42);

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
      const rowTarget = out.length === 0 ? heroH : targetH;
      const rowW = arSum * rowTarget + GAP * (line.length - 1);
      if (rowW >= width) {
        const avail = width - GAP * (line.length - 1);
        const h = avail / arSum;
        out.push({ h, items: line.map((it) => ({ m: it, w: arOf(it) * h })) });
        line = [];
        arSum = 0;
      }
    }
    if (line.length) {
      const cap = out.length === 0 ? heroH : targetH;
      const h = Math.min(cap, (width - GAP * (line.length - 1)) / arSum);
      out.push({ h, items: line.map((it) => ({ m: it, w: arOf(it) * h })) });
    }
    return out;
  }, [strip, width, targetH, heroH, videoAr]);

  return (
    <div ref={ref} className="flex flex-col" style={{ gap: GAP }}>
      {rows.map((row, ri) => (
        <div key={ri} className="flex" style={{ gap: GAP, height: row.h }}>
          {row.items.map(({ m, w }) =>
            m.type === "video" ? (
              <div key={m.src} className="bg-paper-2 relative shrink-0 overflow-hidden" style={{ width: w, height: row.h }}>
                <VideoTile
                  id={`${project.slug}:${m.src}`}
                  src={m.src}
                  title={project.title[locale]}
                  active={inView && !reduced}
                  onMeta={(ar) => setVideoAr((prev) => (prev[m.src] === ar ? prev : { ...prev, [m.src]: ar }))}
                  onOpen={(el) => onOpen(project.slug, el)}
                />
              </div>
            ) : (
              <button
                key={m.src}
                type="button"
                onClick={(e) => onOpen(project.slug, e.currentTarget)}
                aria-label={project.title[locale]}
                className="group bg-paper-2 relative shrink-0 overflow-hidden"
                style={{ width: w, height: row.h }}
              >
                <Image
                  src={m.src}
                  alt={m.alt?.[locale] ?? project.title[locale]}
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
  active,
  onMeta,
  onOpen,
}: {
  id: string;
  src: string;
  title: string;
  active: boolean;
  onMeta?: (ar: number) => void;
  onOpen?: (el: HTMLElement) => void;
}) {
  const { t } = useLanguage();
  const { soundingVideo, requestVideoSound, releaseVideoSound } = useAudio();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const sounding = soundingVideo === id;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active || sounding) v.play().catch(() => {});
    else v.pause();
  }, [active, sounding]);

  useEffect(() => {
    const v = ref.current;
    if (v) v.muted = !sounding;
  }, [sounding]);

  // Don't let a scrolled-away tile keep sounding off screen.
  useEffect(() => {
    if (!active && sounding) releaseVideoSound(id);
  }, [active, sounding, id, releaseVideoSound]);

  const enter = () => {
    if (reduced) return;
    timer.current = window.setTimeout(() => requestVideoSound(id), 250);
  };
  const leave = () => {
    window.clearTimeout(timer.current);
    releaseVideoSound(id);
  };

  return (
    <div className="absolute inset-0" onPointerEnter={enter} onPointerLeave={leave}>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (v.videoWidth && v.videoHeight) onMeta?.(v.videoWidth / v.videoHeight);
        }}
        className="h-full w-full scale-[1.004] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {onOpen && (
        <button type="button" onClick={(e) => onOpen(e.currentTarget)} aria-label={title} className="absolute inset-0" />
      )}
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
    </div>
  );
}

/** A single piece figure that fills whatever flex slot it's given. */
function PieceFigure({
  p,
  active,
  onMeta,
  comingSoonLabel,
  style,
}: {
  p: Piece;
  active: boolean;
  onMeta: (ar: number) => void;
  comingSoonLabel: string;
  style?: React.CSSProperties;
}) {
  const { locale } = useLanguage();
  return (
    <figure className="group bg-paper-2 relative h-full min-w-0 overflow-hidden" style={style}>
      {p.src ? (
        p.type === "video" ? (
          <VideoTile id={`piece:${p.id}`} src={p.src} title={p.title[locale]} active={active} onMeta={onMeta} />
        ) : (
          <Image
            src={p.src}
            alt={p.title[locale]}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, (max-width: 1600px) 40vw, 560px"
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
function PieceWall({ pieces, comingSoonLabel }: { pieces: Piece[]; comingSoonLabel: string }) {
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
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

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
  // sum of its members' — so the unit packs as a single tile that never splits.
  const units = useMemo(() => {
    const out: { id: string; members: Piece[]; ar: number }[] = [];
    for (const p of pieces) {
      const last = out[out.length - 1];
      if (p.pair && last && last.members[0].pair === p.pair) {
        last.members.push(p);
        last.ar += arOf(p);
      } else {
        out.push({ id: p.id, members: [p], ar: arOf(p) });
      }
    }
    return out;
  }, [pieces, arOf]);

  const rows = useMemo(() => {
    if (!width) return [];
    type Unit = (typeof units)[number];
    const out: { items: { u: Unit; w: number }[]; h: number }[] = [];
    let line: Unit[] = [];
    let arSum = 0;
    for (const u of units) {
      line.push(u);
      arSum += u.ar;
      const rowW = arSum * targetH + GAP * (line.length - 1);
      if (rowW >= width) {
        const avail = width - GAP * (line.length - 1);
        const h = avail / arSum;
        out.push({ h, items: line.map((it) => ({ u: it, w: it.ar * h })) });
        line = [];
        arSum = 0;
      }
    }
    if (line.length) {
      const h = Math.min(targetH, (width - GAP * (line.length - 1)) / arSum);
      out.push({ h, items: line.map((it) => ({ u: it, w: it.ar * h })) });
    }
    return out;
  }, [units, width, targetH]);

  return (
    <div ref={ref} className="flex flex-col" style={{ gap: GAP }}>
      {rows.map((row, ri) => (
        <div key={ri} className="flex" style={{ gap: GAP, height: row.h }}>
          {row.items.map(({ u, w }) => (
            <div key={u.id} className="flex shrink-0" style={{ width: w, height: row.h, gap: u.members.length > 1 ? 4 : 0 }}>
              {u.members.map((p) => (
                <PieceFigure
                  key={p.id}
                  p={p}
                  active={inView && !reduced}
                  onMeta={(ar) => setMeta(p.src ?? p.id, ar)}
                  comingSoonLabel={comingSoonLabel}
                  style={{ flex: `${arOf(p) / u.ar} 1 0%` }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
