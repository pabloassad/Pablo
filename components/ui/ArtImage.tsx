"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { GradientArt } from "./GradientArt";
import type { ArtVariant } from "@/lib/data";

interface ArtImageProps {
  src: string;
  alt: string;
  fallback?: ArtVariant;
  pattern?: "circle" | "lines" | "grid";
  /** "soft" lightens the global colorimetry for warm, bright sections */
  tone?: "default" | "soft";
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
}

/*
 * Photography slot: renders the real photo when the file exists in /public,
 * and falls back to abstract gradient art until it does — so layouts stay
 * art-directed while assets are still being delivered.
 */
export function ArtImage({
  src,
  alt,
  fallback = "amber",
  pattern = "circle",
  tone = "default",
  className,
  imgClassName,
  sizes,
  priority,
  children,
}: ArtImageProps) {
  const [failed, setFailed] = useState(false);

  // Callers either position the slot themselves (absolute inset-0) or give it
  // a layout size — only add `relative` when no positioning was provided, as
  // Tailwind would otherwise let it override the caller's `absolute`.
  const positioned = className?.split(/\s+/).includes("absolute");

  return (
    <div className={clsx("overflow-hidden", !positioned && "relative", className)}>
      {failed ? (
        <div className="absolute inset-0">
          <GradientArt variant={fallback} pattern={pattern} className="h-full w-full" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className={clsx(
            "object-cover",
            tone === "soft"
              ? "[filter:contrast(1.05)_saturate(0.92)_brightness(1.02)]"
              : "[filter:contrast(1.08)_saturate(0.88)_brightness(0.97)]",
            imgClassName
          )}
          onError={() => setFailed(true)}
        />
      )}
      {/* Overlays are tuned for photography — soften them over fallback art */}
      {failed ? <div className="absolute inset-0 opacity-40">{children}</div> : children}
    </div>
  );
}
