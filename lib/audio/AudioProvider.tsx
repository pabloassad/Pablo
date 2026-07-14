"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { audioTracks } from "@/data/audio";
import type { AudioTrack } from "@/lib/content/types";

/**
 * Global audio state — one <audio> element for the whole site, hoisted above
 * every list and page. Playback survives filtering, scrolling and route
 * changes; one track at a time is guaranteed by construction. The Web Audio
 * analyser feeds every waveform (row + mini player). No autoplay, ever.
 */

const ordered: AudioTrack[] = [
  ...audioTracks.filter((t) => t.kind !== "perso"),
  ...audioTracks.filter((t) => t.kind === "perso"),
];

interface AudioState {
  current: AudioTrack | null;
  playing: boolean;
  /** 0..1 through the current track. */
  progress: number;
  durations: Record<string, number>;
  toggle: (track: AudioTrack) => void;
  seek: (ratio: number) => void;
  skip: (seconds: number) => void;
  stop: () => void;
  /** Live analyser — null until the first play. */
  getAnalyser: () => AnalyserNode | null;
  /** id of the video currently allowed to sound (one at a time), or null. */
  soundingVideo: string | null;
  /** A video asks for the floor: mutes every other source (table + videos). */
  requestVideoSound: (id: string) => void;
  /** A video gives the floor back (only if it still holds it). */
  releaseVideoSound: (id: string) => void;
}

const Ctx = createContext<AudioState | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [current, setCurrent] = useState<AudioTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const [soundingVideo, setSoundingVideo] = useState<string | null>(null);

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

  const play = useCallback(
    (track: AudioTrack) => {
      const el = ensureGraph();
      ctxRef.current?.resume();
      setSoundingVideo(null); // the table takes the floor — hush the videos
      if (audioRef.current?.src.endsWith(encodeURI(track.file)) !== true) {
        el.src = track.file;
        setCurrent(track);
        setProgress(0);
      } else {
        setCurrent(track);
      }
      el.play().catch(() => {});
    },
    [ensureGraph],
  );

  // One sound at a time across the site: a video claiming sound hushes the
  // table; the table playing hushes the videos (handled in play()).
  const requestVideoSound = useCallback((id: string) => {
    audioRef.current?.pause();
    setSoundingVideo(id);
  }, []);

  const releaseVideoSound = useCallback((id: string) => {
    setSoundingVideo((v) => (v === id ? null : v));
  }, []);

  const toggle = useCallback(
    (track: AudioTrack) => {
      const el = audioRef.current;
      if (current?.id === track.id && el && !el.paused) el.pause();
      else play(track);
    },
    [current, play],
  );

  const seek = useCallback((ratio: number) => {
    const el = audioRef.current;
    if (el && el.duration) el.currentTime = Math.min(el.duration, Math.max(0, ratio * el.duration));
  }, []);

  const skip = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (el && el.duration)
      el.currentTime = Math.min(el.duration, Math.max(0, el.currentTime + seconds));
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setCurrent(null);
    setProgress(0);
  }, []);

  // Element events — rebind when the current track changes.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onMeta = () => setDurations((d) => ({ ...d, [current.id]: el.duration }));
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
  }, [current, play]);

  const getAnalyser = useCallback(() => analyserRef.current, []);

  return (
    <Ctx.Provider
      value={{
        current,
        playing,
        progress,
        durations,
        toggle,
        seek,
        skip,
        stop,
        getAnalyser,
        soundingVideo,
        requestVideoSound,
        releaseVideoSound,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}

export function formatTime(sec?: number) {
  return sec && Number.isFinite(sec)
    ? `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`
    : "—";
}
