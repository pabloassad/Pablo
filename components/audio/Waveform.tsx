"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudio } from "@/lib/audio/AudioProvider";
import { loadPeaks, downsample } from "@/lib/audio/peaks";
import type { AudioTrack } from "@/lib/content/types";

/**
 * The waveform — Pablo's signature, so it has to be sharp AND playable.
 * The canvas is sized in *physical* pixels (× devicePixelRatio) and the bar
 * count follows the real component width, so it stays crisp on Retina and at
 * any size, before and after resize. The active track shows its true RMS
 * envelope (decoded once, cached); idle rows carry a quiet deterministic
 * pattern. The played portion is inked; the rest stays faint. Redraws only
 * when something actually changes — never per animation frame.
 *
 * Clicking (or tapping) the waveform starts playback at the clicked position:
 * if this isn't the active track it loads into the global player and starts
 * there; if it is, it seeks and keeps playing. Dragging scrubs. The play
 * button and keyboard control remain the accessible primary.
 */
export function Waveform({
  track,
  active,
  seekable = true,
  dark = true,
  className,
}: {
  track: AudioTrack;
  active: boolean;
  seekable?: boolean;
  /** true = paper bars on ink ground; false = ink bars on paper ground. */
  dark?: boolean;
  className?: string;
}) {
  const { playing, progress, seek, playAt } = useAudio();
  const trackId = track.id;
  const file = track.file;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0, dpr: 1 });
  const [peaks, setPeaks] = useState<Float32Array | null>(null);

  // Adaptive bar count — denser on wide (desktop) screens, lighter on mobile.
  const bars = useMemo(() => {
    if (!size.w) return 48;
    const unit = size.w < 480 ? 3 : 3.4; // px per bar (bar + gap)
    return Math.max(24, Math.min(240, Math.floor(size.w / unit)));
  }, [size.w]);

  // Deterministic idle pattern per track — a calm, believable envelope.
  const seeded = useCallback(
    (n: number) => {
      let h = 0;
      for (const c of trackId) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      const out: number[] = [];
      for (let i = 0; i < n; i++) {
        h = (h * 1103515245 + 12345) >>> 0;
        out.push(0.28 + ((h >>> 16) % 1000) / 1000 * 0.6);
      }
      return out;
    },
    [trackId],
  );

  // Decode the real peaks once the waveform nears the viewport — every row
  // shows its true shape from the start, so clicking never swaps the drawing
  // from a placeholder to the real one. Cached, so each file decodes once.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !file) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          loadPeaks(file)
            .then(setPeaks)
            .catch(() => {});
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [file]);

  // Track the real drawing box (CSS px) and the device pixel ratio.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height, dpr: Math.min(window.devicePixelRatio || 1, 3) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Draw — only when inputs change (size, progress, peaks, active, playing).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.w) return;
    const g = canvas.getContext("2d");
    if (!g) return;

    const { w, h, dpr } = size;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);

    const gap = size.w < 480 ? 1 : 1.4;
    const bw = Math.max(1, (w - gap * (bars - 1)) / bars);
    // Real peaks as soon as they are decoded (all rows) — seeded only as the
    // brief placeholder before the decode lands.
    const values = peaks ? downsample(peaks, bars) : seeded(bars);
    const playedTo = active ? progress : 0;
    const base = dark ? "242,241,238" : "10,10,10";
    const round = Math.min(bw / 2, 1.5);

    for (let i = 0; i < bars; i++) {
      const bh = Math.max(1.5, values[i] * h * 0.96);
      const x = i * (bw + gap);
      const y = (h - bh) / 2;
      const isPlayed = (i + 0.5) / bars <= playedTo;
      g.fillStyle = `rgba(${base},${isPlayed ? 0.98 : active ? 0.34 : 0.26})`;
      if (typeof g.roundRect === "function") {
        g.beginPath();
        g.roundRect(x, y, bw, bh, round);
        g.fill();
      } else {
        g.fillRect(x, y, bw, bh);
      }
    }
  }, [size, bars, peaks, active, progress, playing, dark, seeded]);

  // Map an x position to a ratio and act on it: seek if this is the active
  // track, otherwise start this track at that point in the global player.
  const scrubTo = (clientX: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    if (active) seek(ratio);
    else playAt(track, ratio);
  };

  return (
    <div
      ref={wrapRef}
      className={className}
      role={seekable ? "slider" : undefined}
      aria-label={seekable ? `Position, ${track.title}` : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={seekable && active ? Math.round(progress * 100) : undefined}
      tabIndex={seekable ? 0 : -1}
      style={{ touchAction: seekable ? "pan-y" : undefined, cursor: seekable ? "pointer" : undefined }}
      onPointerDown={
        seekable
          ? (e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              scrubTo(e.clientX, e.currentTarget);
            }
          : undefined
      }
      onPointerMove={
        seekable
          ? (e) => {
              if (e.buttons > 0 && active) scrubTo(e.clientX, e.currentTarget);
            }
          : undefined
      }
      onKeyDown={
        seekable
          ? (e) => {
              if (e.key === "ArrowRight") {
                if (active) seek(Math.min(1, progress + 0.03));
                else playAt(track, 0);
              } else if (e.key === "ArrowLeft") {
                if (active) seek(Math.max(0, progress - 0.03));
                else playAt(track, 0);
              } else if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                playAt(track, active ? progress : 0);
              }
            }
          : undefined
      }
    >
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}
