"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudio } from "@/lib/audio/AudioProvider";
import { loadPeaks, downsample } from "@/lib/audio/peaks";

/**
 * The waveform — Pablo's signature, so it has to be sharp.
 * The canvas is sized in *physical* pixels (× devicePixelRatio) and the bar
 * count follows the real component width, so it stays crisp on Retina and at
 * any size, before and after resize. The active track shows its true RMS
 * envelope (decoded once, cached); idle rows carry a quiet deterministic
 * pattern. The played portion is inked; the rest stays faint. Redraws only
 * when something actually changes — never per animation frame.
 */
export function Waveform({
  trackId,
  file,
  active,
  seekable = true,
  dark = true,
  className,
}: {
  trackId: string;
  /** Source file — lets the active waveform load its real peaks. */
  file?: string;
  active: boolean;
  seekable?: boolean;
  /** true = paper bars on ink ground; false = ink bars on paper ground. */
  dark?: boolean;
  className?: string;
}) {
  const { playing, progress, seek } = useAudio();
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

  // Load the real peaks for the active track, once, cached.
  useEffect(() => {
    if (!active || !file) return;
    let alive = true;
    loadPeaks(file)
      .then((p) => alive && setPeaks(p))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [active, file]);

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
    const values =
      active && peaks ? downsample(peaks, bars) : seeded(bars).map((v) => v * (active ? 1 : 0.7));
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

  const handleSeek = (clientX: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    seek((clientX - r.left) / r.width);
  };

  return (
    <div
      ref={wrapRef}
      className={className}
      role={seekable && active ? "slider" : undefined}
      aria-label={seekable && active ? "Position" : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={seekable && active ? Math.round(progress * 100) : undefined}
      tabIndex={seekable && active ? 0 : -1}
      style={{ touchAction: seekable && active ? "pan-y" : undefined, cursor: seekable && active ? "pointer" : undefined }}
      onPointerDown={
        seekable && active
          ? (e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              handleSeek(e.clientX, e.currentTarget);
            }
          : undefined
      }
      onPointerMove={
        seekable && active
          ? (e) => {
              if (e.buttons > 0) handleSeek(e.clientX, e.currentTarget);
            }
          : undefined
      }
      onKeyDown={
        seekable && active
          ? (e) => {
              if (e.key === "ArrowRight") seek(Math.min(1, progress + 0.03));
              if (e.key === "ArrowLeft") seek(Math.max(0, progress - 0.03));
            }
          : undefined
      }
    >
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}
