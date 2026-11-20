/**
 * Justified rows ("étages"): pack items into rows of a common height that fill
 * the width edge to edge, each keeping its native ratio — no crop, no bands.
 * `featureOf` (>1) makes an item's row taller (fewer items → bigger). Rules:
 * every row is closed (filled) except a non-full last row, which keeps natural
 * height rather than stretching; and a lone item never sits alone on the last
 * row (it borrows a neighbour). Shared by the projects grid, the pieces wall
 * and the case-page media mosaic.
 */
export type JRow<T> = { items: { it: T; w: number }[]; h: number };

export function justifyRows<T>(
  items: T[],
  width: number,
  gap: number,
  baseH: number,
  arOf: (it: T) => number,
  featureOf: (it: T) => number = () => 1,
  fillLast = false,
): JRow<T>[] {
  if (!width || !items.length) return [];
  const lines: T[][] = [];
  let line: T[] = [];
  let arSum = 0;
  let maxFeat = 0;
  for (const it of items) {
    line.push(it);
    arSum += arOf(it);
    maxFeat = Math.max(maxFeat, featureOf(it));
    if (arSum * baseH * maxFeat + gap * (line.length - 1) >= width) {
      lines.push(line);
      line = [];
      arSum = 0;
      maxFeat = 0;
    }
  }
  if (line.length) lines.push(line);
  // No orphan: a single item on the last row borrows one from the previous row.
  const last = lines[lines.length - 1];
  if (lines.length >= 2 && last.length === 1) {
    const prev = lines[lines.length - 2];
    if (prev.length >= 2) last.unshift(prev.pop() as T);
  }
  return lines.map((row, i) => {
    const sum = row.reduce((s, it) => s + arOf(it), 0);
    const feat = Math.max(...row.map(featureOf));
    const avail = width - gap * (row.length - 1);
    const full = avail / sum;
    const isLast = i === lines.length - 1 && lines.length > 1;
    // Normally the last row keeps its natural height (ragged right). With
    // fillLast, it stretches to the full width like the others — but capped so
    // a two-item last row doesn't tower over the rest.
    const h = isLast && !fillLast ? Math.min(baseH * feat, full) : fillLast && isLast ? Math.min(full, baseH * 2.2) : full;
    return { h, items: row.map((it) => ({ it, w: arOf(it) * h })) };
  });
}
