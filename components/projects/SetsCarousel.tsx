"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { usePlayer } from "@/lib/player/PlayerProvider";
import { RevealItem } from "@/components/ui/Reveal";
import { ArtImage } from "@/components/ui/ArtImage";
import { TiltCard } from "@/components/ui/TiltCard";
import type { LiveSet } from "@/lib/data";
import { PlayIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
      aria-disabled={disabled}
      className={clsx(
        "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/[0.06] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.12] sm:flex",
        direction === "left" ? "-left-5" : "-right-5",
        disabled && "pointer-events-none opacity-30"
      )}
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  );
}

export function SetsCarousel({ sets, nowPlayingLabel }: { sets: LiveSet[]; nowPlayingLabel: string }) {
  const player = usePlayer();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBounds = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [updateBounds]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative mt-10">
      <ArrowButton direction="left" onClick={() => scrollByCard(-1)} disabled={atStart} />
      <motion.div
        ref={scrollRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {sets.map((set) => {
          const isCurrent = player.track?.id === set.id;
          return (
            <RevealItem key={set.id} className="w-[78%] shrink-0 snap-start sm:w-[48%] lg:w-[31%]">
              <TiltCard>
                <button
                  type="button"
                  onClick={() => player.playTrack(set.id, { expand: true })}
                  className="group relative block aspect-square w-full overflow-hidden rounded-2xl text-left"
                >
                <ArtImage
                  src={set.cover}
                  alt={`${set.kicker} · ${set.name}`}
                  fallback="amber"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
                  className="absolute inset-0"
                  imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                </ArtImage>
                {/* Ring motif — Cercle editions only */}
                {set.edition && (
                  <span className="pointer-events-none absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-full border border-foreground/25 text-xs tracking-[0.2em] text-foreground/80 backdrop-blur-sm transition-all duration-500 group-hover:border-accent/70 group-hover:text-accent">
                    {set.edition}
                  </span>
                )}
                {/* Discreet brand mark — it suggests itself, never imposes */}
                {set.watermark && (
                  <Image
                    src={set.watermark.src}
                    alt={set.watermark.alt}
                    width={120}
                    height={24}
                    className="pointer-events-none absolute bottom-24 right-6 h-5 w-auto object-contain opacity-70"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-accent">
                      {isCurrent ? nowPlayingLabel : set.kicker}
                    </p>
                    <h4 className="mt-1 text-xl font-medium tracking-tight">{set.name}</h4>
                    {set.sub && <p className="mt-1 text-xs text-foreground/80">{set.sub}</p>}
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 group-hover:scale-105 group-hover:bg-accent">
                    {isCurrent && player.isPlaying ? (
                      <span className="flex items-end gap-[2px]">
                        {[0, 1, 2].map((bar) => (
                          <span
                            key={bar}
                            className="eq-bar w-[2.5px] rounded-full bg-background"
                            style={{ animationDelay: `${bar * 0.18}s`, height: "10px" }}
                          />
                        ))}
                      </span>
                    ) : (
                      <PlayIcon className="ml-0.5 h-4 w-4" />
                    )}
                  </span>
                </div>
                </button>
              </TiltCard>
            </RevealItem>
          );
        })}
      </motion.div>
      <ArrowButton direction="right" onClick={() => scrollByCard(1)} disabled={atEnd} />
    </div>
  );
}
