"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VinylScene = dynamic(() => import("./VinylScene").then((m) => m.VinylScene), {
  ssr: false,
});

/**
 * Mounts the vinyl 3D layer only where it earns its keep: desktop, motion
 * allowed, WebGL available. While active, `data-vinyl="on"` on <html> lets the
 * CSS swap the hero's static portrait out (the record takes its place) — the
 * photo then lives in the Contact chapter. Everyone else keeps the static
 * hero portrait: graceful, never broken.
 */
export function VinylLayer() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => {
      let ok = desktop.matches && !reduced.matches;
      if (ok) {
        const probe = document.createElement("canvas");
        ok = Boolean(probe.getContext("webgl") ?? probe.getContext("experimental-webgl"));
      }
      document.documentElement.dataset.vinyl = ok ? "on" : "off";
      setActive(ok);
    };
    decide();
    desktop.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      desktop.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 no-print" aria-hidden>
      <VinylScene />
    </div>
  );
}
