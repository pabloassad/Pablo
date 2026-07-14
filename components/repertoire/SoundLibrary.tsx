"use client";

import { useMemo } from "react";
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
            aria-label={`${isPlaying ? s.pause : s.play} — ${track.title}`}
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

          {/* Waveform — inline, live on the active track, scrubbable */}
          <div className="col-span-3 mt-3 flex items-center gap-4 sm:col-span-1 sm:col-start-3 sm:mt-0">
            <Waveform trackId={track.id} active={active} seekable bars={64} dark className="h-9 flex-1" />
            {active && (
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <button type="button" onClick={() => skip(-10)} aria-label="-10s" className="text-paper/60 hover:text-paper text-[0.7rem] font-medium tracking-tight transition-colors">−10</button>
                <button type="button" onClick={() => skip(10)} aria-label="+10s" className="text-paper/60 hover:text-paper text-[0.7rem] font-medium tracking-tight transition-colors">+10</button>
              </div>
            )}
          </div>

          {/* Meta — bpm + duration/time */}
          <div className="col-start-3 row-start-1 text-right sm:col-start-4 sm:row-start-auto">
            <span className="text-paper/45 block text-[0.7rem] tabular-nums whitespace-nowrap">
              {active ? `${formatTime((durations[track.id] ?? 0) * progress)} / ${formatTime(durations[track.id])}` : formatTime(durations[track.id])}
            </span>
            {track.bpm && <span className="text-paper/35 block text-[0.65rem] whitespace-nowrap">{track.bpm} bpm</span>}
          </div>
        </div>
      </li>
    );
  };

  return (
    <Reveal className="mt-2">
      <div className="bg-ink text-paper -mx-6 px-6 py-12 sm:-mx-10 sm:px-10 sm:py-16 lg:-mx-16 lg:px-16">
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
            <p className="text-paper/60 max-w-xs text-sm leading-relaxed">{s.intro}</p>
          </div>

          {/* Score — commissioned first, then personal */}
          {[
            { label: s.commissioned, list: commissioned, offset: 0 },
            { label: s.personal, list: personal, offset: commissioned.length },
          ].map((group) => (
            <div key={group.label} className="mt-10">
              <span className="text-paper/45 text-[0.65rem] font-medium uppercase tracking-[0.2em]">
                {group.label}
              </span>
              <ol className="mt-3">{group.list.map((track) => renderRow(track))}</ol>
            </div>
          ))}

          {/* Sound design — the slot is ready */}
          <div className="border-paper/10 mt-10 flex items-baseline gap-3 border-t pt-5">
            <span className="bg-paper/30 h-1.5 w-1.5 shrink-0 self-center rounded-full" aria-hidden />
            <span className="font-display text-paper/60 text-base" style={{ fontWeight: 600 }}>
              {s.soon}
            </span>
            <span className="text-paper/40 text-xs whitespace-nowrap">{s.soonNote}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
