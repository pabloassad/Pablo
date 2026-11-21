"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Lenis-powered smooth scroll. Honours prefers-reduced-motion by never
 * instantiating Lenis at all — native scrolling stays intact for those users.
 * Anchor clicks are intercepted so in-page navigation eases instead of jumps.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  // On route change, land at the top of the new page. Lenis keeps its own
  // scroll state across navigations, so Next's default scroll restoration
  // doesn't take — we reset Lenis (or native scroll) explicitly. The first
  // run is skipped so an initial deep-link / hash anchor isn't overridden.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (window.location.hash) return;
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch devices keep native scrolling — smoother, and immune to the
    // wheel-hijack conflicts that can wedge the page under a finger.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarse) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    // Exposed so overlays (project modal) can freeze the page scroll while
    // they own the wheel. See ProjectModal.
    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
      history.replaceState(null, "", id);
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
