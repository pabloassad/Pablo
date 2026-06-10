"use client";

import { venueLogos } from "@/lib/data";

export function Marquee() {
  const row = [...venueLogos, ...venueLogos];

  return (
    <div className="relative overflow-hidden border-y border-line bg-background-elevated/40 py-5">
      <div className="animate-marquee flex w-max items-center gap-12 whitespace-nowrap pr-12">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-12 text-sm uppercase tracking-[0.35em] text-muted/70"
          >
            {name}
            <span aria-hidden className="h-1 w-1 rounded-full bg-accent/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
