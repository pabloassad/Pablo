/**
 * Waveform peaks — decoded once per file, cached for the session.
 * We compute an RMS envelope at high resolution (buckets), normalised 0..1;
 * the canvas downsamples this to whatever bar count the component needs.
 * decodeAudioData runs on a shared, lazily-created context so nothing is
 * decoded until a waveform actually asks for it. Zero cost until first play.
 */

const RES = 1024;
const cache = new Map<string, Promise<Float32Array>>();
let actx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  actx ??= new AC();
  return actx;
}

export function loadPeaks(url: string): Promise<Float32Array> {
  const hit = cache.get(url);
  if (hit) return hit;

  const job = (async () => {
    const ac = context();
    if (!ac) throw new Error("no AudioContext");
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const audio = await ac.decodeAudioData(buf);
    const ch = audio.getChannelData(0);
    const block = Math.max(1, Math.floor(ch.length / RES));
    const peaks = new Float32Array(RES);
    let max = 0;
    for (let i = 0; i < RES; i++) {
      let sum = 0;
      const start = i * block;
      for (let j = 0; j < block; j++) {
        const v = ch[start + j] || 0;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / block);
      peaks[i] = rms;
      if (rms > max) max = rms;
    }
    if (max > 0) for (let i = 0; i < RES; i++) peaks[i] /= max;
    return peaks;
  })();

  cache.set(url, job);
  job.catch(() => cache.delete(url)); // let a failed decode be retried
  return job;
}

/** Average `src` (0..1 envelope) down to `bars` buckets. */
export function downsample(src: Float32Array, bars: number): number[] {
  const out: number[] = new Array(bars).fill(0);
  const step = src.length / bars;
  for (let i = 0; i < bars; i++) {
    const start = Math.floor(i * step);
    const end = Math.max(start + 1, Math.floor((i + 1) * step));
    let sum = 0;
    for (let j = start; j < end; j++) sum += src[j];
    out[i] = sum / (end - start);
  }
  return out;
}
