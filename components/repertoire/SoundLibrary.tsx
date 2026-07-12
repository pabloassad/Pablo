"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { audioTracks } from "@/data/audio";
import type { AudioTrack } from "@/lib/content/types";

const BAR_COUNT = 56;

/**
 * La Table d'écoute — the sound library as the site's dark centrepiece.
 * One shared <audio> element (one track at a time, by construction), a live
 * monochrome waveform fed by the Web Audio API, scored rows in La Mesure's
 * grammar (bar number ‖ title · context · BPM). No autoplay, keyboard-first,
 * zero bytes loaded until the first click.
 */
export function SoundLibrary() {
  const { t, locale } = useLanguage();
  const s = t.sound;
  const reduced = useReducedMotion();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef(0);

  const [current, setCurrent] = useState<AudioTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState<Record<string, number>>({});

  const commissioned = useMemo(() => audioTracks.filter((tr) => tr.kind !== "perso"), []);
  const personal = useMemo(() => audioTracks.filter((tr) => tr.kind === "perso"), []);
  const ordered = useMemo(() => [...commissioned, ...personal], [commissioned, personal]);

  /* ── Audio graph, created lazily on the first play ─────────────────── */
  const ensureGraph = useCallback(() => {
    if (!audioRef.current) {
      const el = new Audio();
      el.preload = "none";
      audioRef.current = el;
    }
    if (!ctxRef.current && typeof AudioContext !== "undefined") {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
    }
    return audioRef.current;
  }, []);

  /* ── Waveform ──────────────────────────────────────────────────────── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    const { width, height } = canvas;
    g.clearRect(0, 0, width, height);
    const gap = 3;
    const bw = (width - gap * (BAR_COUNT - 1)) / BAR_COUNT;

    let data: Uint8Array<ArrayBuffer> | null = null;
    if (analyser) {
      data = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
      analyser.getByteFrequencyData(data);
    }
    for (let i = 0; i < BAR_COUNT; i++) {
      const v = data ? data[Math.floor((i / BAR_COUNT) * data.length * 0.75)] / 255 : 0;
      const h = Math.max(2, v * height * 0.92);
      g.fillStyle = `rgba(242,241,238,${0.25 + v * 0.75})`;
      g.fillRect(i * (bw + gap), (height - h) / 2, bw, h);
    }
  }, []);

  useEffect(() => {
    if (!playing || reduced) {
      cancelAnimationFrame(rafRef.current);
      draw();
      return;
    }
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      draw();
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, reduced, draw]);

  /* ── Transport ─────────────────────────────────────────────────────── */
  const play = useCallback(
    (track: AudioTrack) => {
      const el = ensureGraph();
      ctxRef.current?.resume();
      if (current?.id !== track.id) {
        el.src = track.file;
        setCurrent(track);
        setProgress(0);
      }
      el.play();
    },
    [current, ensureGraph],
  );

  const toggle = useCallback(
    (track: AudioTrack) => {
      const el = audioRef.current;
      if (current?.id === track.id && el && !el.paused) el.pause();
      else play(track);
    },
    [current, play],
  );

  // Wire element events once it exists.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onMeta = () =>
      setDurations((d) => ({ ...d, [current.id]: el.duration }));
    const onEnded = () => {
      const idx = ordered.findIndex((tr) => tr.id === current.id);
      const next = ordered[idx + 1];
      if (next) play(next);
      else setPlaying(false);
    };
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnded);
    };
  }, [current, ordered, play]);

  // Stop cleanly if the visitor leaves the page.
  useEffect(
    () => () => {
      audioRef.current?.pause();
      cancelAnimationFrame(rafRef.current);
      ctxRef.current?.close().catch(() => {});
    },
    [],
  );

  const seek = useCallback((ratio: number) => {
    const el = audioRef.current;
    if (el && el.duration) el.currentTime = ratio * el.duration;
  }, []);

  const fmt = (sec?: number) =>
    sec && Number.isFinite(sec)
      ? `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`
      : "—";

  const kindLabel: Record<string, string> = {
    commande: s.kindCommande,
    jingle: s.kindJingle,
    reportage: s.kindReportage,
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

          {/* Live waveform */}
          <div className="border-paper/15 mt-8 border-y py-5">
            <canvas ref={canvasRef} width={960} height={64} className="block h-16 w-full" aria-hidden />
            {/* Progress — seekable */}
            <div
              role="slider"
              aria-label={s.seekLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              tabIndex={current ? 0 : -1}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                seek((e.clientX - r.left) / r.width);
              }}
              onKeyDown={(e) => {
                const el = audioRef.current;
                if (!el?.duration) return;
                if (e.key === "ArrowRight") seek(Math.min(1, (el.currentTime + 5) / el.duration));
                if (e.key === "ArrowLeft") seek(Math.max(0, (el.currentTime - 5) / el.duration));
              }}
              className="group mt-4 cursor-pointer py-2"
            >
              <div className="bg-paper/15 relative h-px w-full">
                <div
                  className="bg-paper absolute inset-y-0 left-0 transition-[width] duration-150"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
            <div className="text-paper/50 mt-2 flex items-baseline justify-between text-[0.65rem] uppercase tracking-[0.15em]">
              <span className="truncate">{current ? current.title : s.idle}</span>
              <span className="whitespace-nowrap">{current ? fmt(durations[current.id] && durations[current.id] * progress) : ""} {current ? `/ ${fmt(durations[current.id])}` : ""}</span>
            </div>
          </div>

          {/* Score — commissioned first, then personal */}
          {[
            { label: s.commissioned, list: commissioned },
            { label: s.personal, list: personal },
          ].map((group, gi) => (
            <div key={group.label} className={gi === 0 ? "mt-8" : "mt-10"}>
              <span className="text-paper/45 text-[0.65rem] font-medium uppercase tracking-[0.2em]">
                {group.label}
              </span>
              <ol className="mt-3">
                {group.list.map((track, i) => {
                  const active = current?.id === track.id;
                  const isPlaying = active && playing;
                  return (
                    <li key={track.id} className="border-paper/10 border-t last:border-b">
                      <button
                        type="button"
                        onClick={() => toggle(track)}
                        aria-pressed={isPlaying}
                        aria-label={`${isPlaying ? s.pause : s.play} — ${track.title}`}
                        className={`group grid w-full grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 py-3.5 text-left transition-colors duration-200 sm:grid-cols-[2.5rem_1fr_auto_5rem_4rem] ${
                          active ? "text-paper" : "text-paper/75 hover:text-paper"
                        }`}
                      >
                        <span className="font-display text-paper/40 text-sm tracking-tight" aria-hidden>
                          {isPlaying ? "▮▮" : active ? "▶" : String(gi === 0 ? i + 1 : commissioned.length + i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="font-display block truncate text-lg" style={{ fontWeight: active ? 800 : 600, letterSpacing: "-0.01em" }}>
                            {track.title}
                          </span>
                          <span className="text-paper/50 block truncate text-xs">{track.context[locale]}</span>
                        </span>
                        <span className="hidden sm:block">
                          {track.kind !== "perso" && (
                            <span className="border-paper/25 text-paper/70 rounded-full border px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.12em] whitespace-nowrap">
                              {kindLabel[track.kind]}
                            </span>
                          )}
                        </span>
                        <span className="text-paper/45 hidden text-right text-xs whitespace-nowrap sm:block">
                          {track.bpm ? `${track.bpm} bpm` : ""}
                        </span>
                        <span className="text-paper/45 hidden text-right text-xs whitespace-nowrap sm:block">
                          {fmt(durations[track.id])}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
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
