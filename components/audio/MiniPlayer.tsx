"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useAudio, formatTime } from "@/lib/audio/AudioProvider";
import { Waveform } from "./Waveform";

/**
 * The persistent listening dock. Once a track is playing it rides at the
 * bottom of every page — waveform, title, transport, close — so the music
 * survives scrolling, filtering and the route change between the two spaces.
 */
export function MiniPlayer() {
  const { t, locale } = useLanguage();
  const s = t.sound;
  const { current, playing, durations, progress, toggle, skip, stop } = useAudio();

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key="mini"
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] no-print"
          role="region"
          aria-label={s.title}
        >
          <div className="bg-ink/95 text-paper border-paper/10 border-t backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-10 lg:px-16">
              {/* Play / pause */}
              <button
                type="button"
                onClick={() => toggle(current)}
                aria-label={playing ? s.pause : s.play}
                className="border-paper/25 hover:bg-paper hover:text-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors"
              >
                <span aria-hidden className="text-sm">{playing ? "❚❚" : "▶"}</span>
              </button>

              {/* Skip back / forward */}
              <div className="hidden shrink-0 items-center gap-1 sm:flex">
                <button type="button" onClick={() => skip(-10)} aria-label="-10s" className="text-paper/60 hover:text-paper text-[0.7rem] font-medium tracking-tight transition-colors">
                  −10
                </button>
                <button type="button" onClick={() => skip(10)} aria-label="+10s" className="text-paper/60 hover:text-paper text-[0.7rem] font-medium tracking-tight transition-colors">
                  +10
                </button>
              </div>

              {/* Title + waveform */}
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="min-w-0 shrink-0 max-w-[9rem] sm:max-w-[14rem]">
                  <span className="font-display block truncate text-sm" style={{ fontWeight: 700 }}>
                    {current.title}
                  </span>
                  <span className="text-paper/50 block truncate text-[0.65rem]">
                    {current.context[locale]}
                  </span>
                </div>
                <Waveform track={current} active dark className="h-9 flex-1" />
              </div>

              {/* Time */}
              <span className="mono text-paper/50 hidden shrink-0 text-[0.7rem] whitespace-nowrap sm:block">
                {formatTime((durations[current.id] ?? 0) * progress)} / {formatTime(durations[current.id])}
              </span>

              {/* Close */}
              <button
                type="button"
                onClick={stop}
                aria-label={s.close}
                className="text-paper/50 hover:text-paper shrink-0 text-lg leading-none transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
