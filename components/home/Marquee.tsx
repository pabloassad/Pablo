"use client";

import { clubs } from "@/lib/data";

export function Marquee() {
  const row = [...clubs, ...clubs];

  return (
    <div className="border-y border-line bg-background-elevated/40">
      <div className="group relative overflow-hidden py-5 [-webkit-mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap pr-12 will-change-transform [backface-visibility:hidden] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {row.map((club, i) => (
            <a
              key={`${club.name}-${i}`}
              href={club.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-12 text-sm uppercase tracking-[0.35em] text-muted transition-colors duration-300 hover:text-foreground"
            >
              <span className="transition-all duration-300 group-hover:[text-shadow:0_0_18px_rgba(216,200,168,0.4)]">
                {club.name}
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent/40" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
