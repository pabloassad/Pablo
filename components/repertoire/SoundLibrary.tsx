"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { useAudio, formatTime } from "@/lib/audio/AudioProvider";
import { Waveform } from "@/components/audio/Waveform";
import { audioTracks } from "@/data/audio";
import type { AudioTrack } from "@/lib/content/types";

/**
 * La Table d'écoute — the sound library as the site's dark centrepiece.
 * Option "Console": each track is one self-contained line — transport, title,
 * a live/scrubbable waveform right beside it, ±10s, time. Audio is driven by
 * the global AudioProvider, so playback survives filtering, scroll and route
 * changes and continues in the persistent MiniPlayer.
 */
export function SoundLibrary() {
  const { t, locale } = useLanguage();
  const s = t.sound;
  const { current, playing, durations, progress, toggle, skip } = useAudio();
  const [expanded, setExpanded] = useState(false);

  const commissioned = useMemo(() => audioTracks.filter((tr) => tr.kind !== "perso"), []);
  const personal = useMemo(() => audioTracks.filter((tr) => tr.kind === "perso"), []);

  const kindLabel: Record<string, string> = {
    commande: s.kindCommande,
    jingle: s.kindJingle,
    reportage: s.kindReportage,
  };

  const renderRow = (track: AudioTrack) => {
    const active = current?.id === track.id;
    const isPlaying = active && playing;
    return (
      <li key={track.id} className="border-paper/10 border-t last:border-b">
        <div
          className={`grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-3 py-4 sm:grid-cols-[2.5rem_16rem_1fr_auto] sm:gap-x-5 ${
            active ? "text-paper" : "text-paper/75"
          }`}
        >
          {/* Transport */}
          <button
            type="button"
            onClick={() => toggle(track)}
            aria-pressed={isPlaying}
            aria-label={`${isPlaying ? s.pause : s.play}, ${track.title}`}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              active ? "border-paper bg-paper text-ink" : "border-paper/25 hover:border-paper"
            }`}
          >
            <span aria-hidden className="text-[0.7rem]">{isPlaying ? "❚❚" : "▶"}</span>
          </button>

          {/* Title + context */}
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-display truncate text-lg" style={{ fontWeight: active ? 800 : 600, letterSpacing: "-0.01em" }}>
                {track.title}
              </span>
              {track.kind !== "perso" && (
                <span className="border-paper/25 text-paper/70 shrink-0 rounded-full border px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap">
                  {kindLabel[track.kind]}
                </span>
              )}
            </div>
            <span className="text-paper/50 block truncate text-xs">{track.context[locale]}</span>
          </div>

          {/* Waveform — inline, scrubbable; click starts/repositions playback.
              The ±10 controls keep their space at all times so activating a
              track never reflows (and never "zooms") the waveform. */}
          <div className="col-span-3 mt-3 flex items-center gap-4 sm:col-span-1 sm:col-start-3 sm:mt-0">
            <Waveform track={track} active={active} dark className="h-9 flex-1" />
            <div
              className={`hidden shrink-0 items-center gap-2 transition-opacity duration-200 sm:flex ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!active}
            >
              <button type="button" onClick={() => skip(-10)} aria-label="-10s" tabIndex={active ? 0 : -1} className="text-paper/60 hover:text-paper text-[0.7rem] font-medium tracking-tight transition-colors">−10</button>
              <button type="button" onClick={() => skip(10)} aria-label="+10s" tabIndex={active ? 0 : -1} className="text-paper/60 hover:text-paper text-[0.7rem] font-medium tracking-tight transition-colors">+10</button>
            </div>
          </div>

          {/* Meta — elapsed / duration */}
          <div className="col-start-3 row-start-1 text-right sm:col-start-4 sm:row-start-auto">
            <span className="text-paper/45 block text-[0.7rem] tabular-nums whitespace-nowrap">
              {active ? `${formatTime((durations[track.id] ?? 0) * progress)} / ${formatTime(durations[track.id])}` : formatTime(durations[track.id])}
            </span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <Reveal className="mt-2">
      <div id="son" className="bg-ink text-paper -mx-3 scroll-mt-24 px-3 py-12 sm:-mx-6 sm:px-6 sm:py-16 lg:-mx-8 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-paper/60 text-xs tracking-tight">‖</span>
                <span className="text-paper/60 text-[0.65rem] font-medium uppercase tracking-[0.22em] whitespace-nowrap">
                  {s.label}
                </span>
              </div>
              <h3
                className="font-display mt-4 uppercase"
                style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 0.95 }}
              >
                {s.title}
              </h3>
            </div>
            <div className="max-w-xs">
              <p className="font-display text-paper text-xl" style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
                {s.author}
              </p>
              <p className="text-paper/60 mt-2 text-sm leading-relaxed">
                <span className="block">{s.intro}</span>
                <span className="block">{s.intro2}</span>
              </p>
            </div>
          </div>

          {/* Score — the commissions are the vitrine, always open */}
          <div className="mt-10">
            <span className="text-paper/45 text-[0.65rem] font-medium uppercase tracking-[0.2em]">
              {s.commissioned}
            </span>
            <ol className="mt-3">{commissioned.map((track) => renderRow(track))}</ol>
          </div>

          {/* Personal compositions — folded behind "Voir plus", fluid expand */}
          {personal.length > 0 && (
            <div className="mt-8">
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="perso"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <span className="text-paper/45 text-[0.65rem] font-medium uppercase tracking-[0.2em]">
                      {s.personal}
                    </span>
                    <ol className="mt-3">{personal.map((track) => renderRow(track))}</ol>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="group mt-6 flex w-full items-center gap-4 text-[0.65rem] font-medium uppercase tracking-[0.2em]"
              >
                <span className="bg-paper/15 h-px flex-1" aria-hidden />
                <span className="text-paper/55 group-hover:text-paper flex items-center gap-2 whitespace-nowrap transition-colors">
                  {expanded ? s.less : `${s.more} · ${personal.length}`}
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                    {expanded ? "↑" : "↓"}
                  </span>
                </span>
                <span className="bg-paper/15 h-px flex-1" aria-hidden />
              </button>
            </div>
          )}

          {/* One-line note: the sound-design skill, kept as a mention */}
          <p className="border-paper/10 text-paper/45 mt-10 border-t pt-5 text-xs">
            {s.designer}
          </p>

          {/* The close: the ink runs to the end of the page, so the Répertoire
              finishes on a deliberate contact note instead of a white mass. */}
          <div className="border-paper/10 mt-16 border-t pt-10">
            <span className="text-paper/45 text-[0.65rem] font-medium uppercase tracking-[0.22em]">
              {t.contact.label}
            </span>
            <a
              href={`mailto:${t.contact.email}`}
              className="font-display text-paper hover:text-paper/70 mt-3 block break-all uppercase transition-colors"
              style={{ fontSize: "clamp(1.3rem,3.6vw,3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
            >
              {t.contact.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 pb-2 text-sm">
              <a
                href={t.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/60 hover:text-paper font-medium transition-colors"
              >
                {t.contact.linkedinHandle}
              </a>
              <Link href="/" className="group text-paper/60 hover:text-paper inline-flex items-center gap-2 font-medium transition-colors">
                <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-1">←</span>
                {t.work.back}
              </Link>
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                  })
                }
                className="group text-paper/60 hover:text-paper ml-auto inline-flex items-center gap-2 font-medium transition-colors"
              >
                {t.work.backToTop}
                <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-0.5">↑</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
