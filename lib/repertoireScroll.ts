const KEY = "repScroll";

/**
 * Remember the current scroll position before leaving the Répertoire for a
 * case-study page, so returning lands exactly where the visitor clicked rather
 * than at the top. Read + cleared once by the Répertoire on mount.
 */
export function saveRepertoireScroll() {
  try {
    sessionStorage.setItem(KEY, String(Math.round(window.scrollY)));
  } catch {
    // storage blocked — no restore, lands at top, acceptable
  }
}

export function takeRepertoireScroll(): number | null {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v === null) return null;
    sessionStorage.removeItem(KEY);
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? null : n;
  } catch {
    return null;
  }
}
