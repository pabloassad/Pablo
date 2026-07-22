import { useEffect, useRef, useState } from "react";

/**
 * Track an element's content-box width via a single ResizeObserver. Used by the
 * justified grids (contact sheets + pieces wall) which re-pack rows whenever the
 * available width changes. Returns [ref, width]; width is 0 until first measure.
 */
export function useElementWidth<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width] as const;
}
