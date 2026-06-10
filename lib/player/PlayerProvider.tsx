"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { playerQueue, type PlayerTrack } from "@/lib/data";

interface PlayerContextValue {
  queue: PlayerTrack[];
  track: PlayerTrack | null;
  isPlaying: boolean;
  isOpen: boolean;
  isExpanded: boolean;
  playTrack: (id: string, options?: { expand?: boolean }) => void;
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  next: () => void;
  previous: () => void;
  setExpanded: (expanded: boolean) => void;
  close: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const playTrack = useCallback((id: string, options?: { expand?: boolean }) => {
    const trackIndex = playerQueue.findIndex((item) => item.id === id);
    if (trackIndex === -1) return;
    setIndex(trackIndex);
    setIsPlaying(true);
    if (options?.expand) setIsExpanded(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((playing) => (index === null ? playing : !playing));
  }, [index]);

  const next = useCallback(() => {
    setIndex((current) =>
      current === null ? current : (current + 1) % playerQueue.length
    );
    setIsPlaying(true);
  }, []);

  const previous = useCallback(() => {
    setIndex((current) =>
      current === null
        ? current
        : (current - 1 + playerQueue.length) % playerQueue.length
    );
    setIsPlaying(true);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    setIsPlaying(false);
    setIsExpanded(false);
  }, []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      queue: playerQueue,
      track: index === null ? null : playerQueue[index],
      isPlaying,
      isOpen: index !== null,
      isExpanded,
      playTrack,
      togglePlay,
      setPlaying: setIsPlaying,
      next,
      previous,
      setExpanded: setIsExpanded,
      close,
    }),
    [index, isPlaying, isExpanded, playTrack, togglePlay, next, previous, close]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
}
