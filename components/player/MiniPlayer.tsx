"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { usePlayer } from "@/lib/player/PlayerProvider";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { GradientArt } from "@/components/ui/GradientArt";

function buildEmbedSrc(track: NonNullable<ReturnType<typeof usePlayer>["track"]>) {
  if (track.source === "youtube") {
    const params = new URLSearchParams({
      enablejsapi: "1",
      autoplay: "1",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
    });
    return `https://www.youtube.com/embed/${track.videoId}?${params.toString()}`;
  }
  const params = new URLSearchParams({
    url: track.url,
    auto_play: "true",
    visual: "true",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

export function MiniPlayer() {
  const { t } = useLanguage();
  const player = usePlayer();
  const { track, isPlaying, isOpen, isExpanded } = player;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Drive the embedded players through their postMessage APIs.
  const sendCommand = (play: boolean) => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame || !track) return;
    if (track.source === "youtube") {
      frame.postMessage(
        JSON.stringify({ event: "command", func: play ? "playVideo" : "pauseVideo", args: [] }),
        "*"
      );
    } else {
      frame.postMessage(JSON.stringify({ method: play ? "play" : "pause" }), "*");
    }
  };

  const handleToggle = () => {
    sendCommand(!isPlaying);
    player.togglePlay();
  };

  // YouTube state sync: handshake then listen for end-of-video to auto-advance.
  useEffect(() => {
    if (!track || track.source !== "youtube") return;

    const handshake = window.setInterval(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: "pablito-player", channel: "widget" }),
        "*"
      );
    }, 600);
    const stopHandshake = window.setTimeout(() => window.clearInterval(handshake), 4000);

    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string" || !event.origin.includes("youtube")) return;
      try {
        const data = JSON.parse(event.data);
        if (data.event !== "infoDelivery" || data.info?.playerState === undefined) return;
        if (data.info.playerState === 0) player.next();
        else if (data.info.playerState === 1) player.setPlaying(true);
        else if (data.info.playerState === 2) player.setPlaying(false);
      } catch {
        // non-JSON message — ignore
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.clearInterval(handshake);
      window.clearTimeout(stopHandshake);
      window.removeEventListener("message", onMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-arm per track
  }, [track?.id]);

  if (!isOpen || !track) return null;

  return (
    <>
      {/*
        Single persistent iframe — restyled rather than remounted between the
        mini and expanded states so the audio never cuts out.
      */}
      <div
        className={clsx(
          "fixed z-[75] overflow-hidden bg-black transition-all duration-500 ease-out",
          isExpanded
            ? "inset-x-4 bottom-24 top-auto mx-auto aspect-video max-w-3xl rounded-2xl border border-line shadow-[0_24px_80px_rgba(0,0,0,0.7)] sm:inset-x-6 lg:bottom-28"
            : "pointer-events-none bottom-0 right-0 h-px w-px opacity-0"
        )}
      >
        <iframe
          ref={iframeRef}
          key={track.id}
          src={buildEmbedSrc(track)}
          title={track.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>

      {isExpanded && (
        <button
          type="button"
          aria-label={t.player.collapse}
          onClick={() => player.setExpanded(false)}
          className="fixed inset-0 z-[70] cursor-default bg-background/70 backdrop-blur-sm"
        />
      )}

      <AnimatePresence>
        <motion.div
          key="mini-player"
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-md sm:inset-x-6"
        >
          <div className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-3 shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
            <button
              type="button"
              onClick={() => player.setExpanded(!isExpanded)}
              aria-label={isExpanded ? t.player.collapse : t.player.expand}
              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full"
            >
              <GradientArt variant={track.art} className="h-full w-full" pattern="circle" />
              <span className="absolute inset-0 flex items-end justify-center gap-[3px] pb-2.5">
                {[0, 1, 2].map((bar) => (
                  <span
                    key={bar}
                    className={clsx(
                      "eq-bar w-[3px] rounded-full bg-foreground/90",
                      !isPlaying && "eq-paused"
                    )}
                    style={{ animationDelay: `${bar * 0.18}s` }}
                  />
                ))}
              </span>
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium leading-tight">{track.title}</p>
              <p className="truncate text-[11px] uppercase tracking-[0.2em] text-muted">
                {track.subtitle}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={player.previous}
                aria-label={t.player.previous}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M6 5h2v14H6V5Zm12.5.86v12.28a1 1 0 0 1-1.54.84L8.3 12.84a1 1 0 0 1 0-1.68l8.66-5.14a1 1 0 0 1 1.54.84Z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleToggle}
                aria-label={isPlaying ? t.player.pause : t.player.play}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M7 5h3.5v14H7V5Zm6.5 0H17v14h-3.5V5Z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={player.next}
                aria-label={t.player.next}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M16 5h2v14h-2V5ZM5.5 5.86v12.28a1 1 0 0 0 1.54.84l8.66-6.14a1 1 0 0 0 0-1.68L7.04 5.02a1 1 0 0 0-1.54.84Z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={player.close}
                aria-label={t.player.close}
                className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
