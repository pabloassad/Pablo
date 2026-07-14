"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useAudio } from "@/lib/audio/AudioProvider";

/**
 * The shared waveform: on the active track it dances with the real signal
 * (Web Audio analyser) and doubles as a scrub surface (mouse + touch);
 * inactive rows carry a quiet deterministic bar pattern seeded by the track
 * id, with the played portion inked in. Reduced-motion keeps bars still.
 */
export function Waveform({
  trackId,
  active,
  seekable = true,
  bars = 64,
  dark = true,
  className,
}: {
  trackId: string;
  active: boolean;
  seekable?: boolean;
  bars?: number;
  /** true = paper bars on ink ground; false = ink bars on paper ground. */
  dark?: boolean;
  className?: string;
}) {
  const { playing, progress, seek, getAnalyser } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const progressRef = useRef(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);
  const reduced = useReducedMotion();

  // Deterministic idle pattern per track — looks like a waveform, costs nothing.
  const seededHeights = useCallback(() => {
    let h = 0;
    for (const c of trackId) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const out: number[] = [];
    for (let i = 0; i < bars; i++) {
      h = (h * 1103515245 + 12345) >>> 0;
      out.push(0.25 + ((h >>> 16) % 1000) / 1000 * 0.65);
    }
    return out;
  }, [trackId, bars]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    const { width, height } = canvas;
    g.clearRect(0, 0, width, height);
    const gap = 2;
    const bw = (width - gap * (bars - 1)) / bars;

    const analyser = active ? getAnalyser() : null;
    let live: Uint8Array<ArrayBuffer> | null = null;
    if (analyser && playing && !reduced) {
      live = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
      analyser.getByteFrequencyData(live);
    }
    const idle = seededHeights();
    const played = active ? progressRef.current : 0;

    for (let i = 0; i < bars; i++) {
      const liveV = live ? live[Math.floor((i / bars) * live.length * 0.75)] / 255 : null;
      const v = liveV ?? idle[i] * (active ? 1 : 0.55);
      const bh = Math.max(2, v * height * 0.9);
      const isPlayed = i / bars <= played;
      const base = dark ? "242,241,238" : "10,10,10";
      g.fillStyle = `rgba(${base},${isPlayed ? 0.95 : active ? 0.4 : 0.3})`;
      g.fillRect(i * (bw + gap), (height - bh) / 2, bw, bh);
    }
  }, [active, playing, reduced, bars, dark, seededHeights, getAnalyser]);

  useEffect(() => {
    if (active && playing && !reduced) {
      const loop = () => {
        rafRef.current = requestAnimationFrame(loop);
        draw();
      };
      rafRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(rafRef.current);
    }
    draw();
  }, [active, playing, reduced, draw, progress]);

  const handleSeek = (clientX: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    seek((clientX - r.left) / r.width);
  };

  return (
    <div
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
      <canvas ref={canvasRef} width={480} height={44} className="block h-full w-full" aria-hidden />
    </div>
  );
}
