"use client";

/* eslint-disable react-hooks/refs -- three.js geometries/materials/textures are
   mutable GPU resources; they live in a lazy ref (init-once) and are only
   mutated from the render loop, which is the idiomatic R3F pattern. */

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * The signature 3D moment: a vinyl record spinning as you scroll — the scroll
 * IS the turntable. Procedurally textured (grooves, paper label, spindle
 * hole), glossy clearcoat for realism, tilted like a listening-room display,
 * with music notes gravitating around it that shy away from the pointer.
 *
 * Lives as a fixed, pointer-transparent overlay choreographed through the
 * chapters' whitespace; legibility always wins.
 */

// Per-section choreography — x/y are viewport fractions (-1..1).
const KEYFRAMES: Record<string, { x: number; y: number; s: number; o: number }> = {
  top: { x: 0.58, y: -0.02, s: 1.0, o: 1 },
  parcours: { x: 0.66, y: 0.05, s: 0.6, o: 0.85 },
  projets: { x: 0.88, y: 0.12, s: 0.3, o: 0.12 },
  creation: { x: 0.6, y: 0.14, s: 0.55, o: 0.75 },
  outils: { x: -0.72, y: 0.12, s: 0.38, o: 0.45 },
  contact: { x: 0.55, y: 0.06, s: 0.8, o: 0.9 },
};
const SECTION_IDS = ["top", "parcours", "projets", "creation", "outils", "contact"];

interface SectionSpan {
  id: string;
  top: number;
  bottom: number;
}

function useSectionSpans() {
  const spansRef = useRef<SectionSpan[]>([]);
  useMemo(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      spansRef.current = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: 0, bottom: 0 };
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return { id, top, bottom: top + r.height };
      }).filter((s) => s.bottom > s.top);
    };
    measure();
    window.addEventListener("resize", measure);
    setTimeout(measure, 1200);
  }, []);
  return spansRef;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function keyframeAt(spans: SectionSpan[], scrollCenter: number) {
  if (!spans.length) return KEYFRAMES.top;
  let idx = 0;
  for (let i = 0; i < spans.length; i++) {
    if (scrollCenter >= spans[i].top) idx = i;
  }
  const cur = spans[idx];
  const next = spans[Math.min(idx + 1, spans.length - 1)];
  const a = KEYFRAMES[cur.id] ?? KEYFRAMES.top;
  const b = KEYFRAMES[next.id] ?? a;
  const span = Math.max(1, cur.bottom - cur.top);
  const p = Math.min(1, Math.max(0, (scrollCenter - cur.top) / span));
  const blend = smoothstep(Math.min(1, Math.max(0, (p - 0.55) / 0.45)));
  return {
    x: lerp(a.x, b.x, blend),
    y: lerp(a.y, b.y, blend),
    s: lerp(a.s, b.s, blend),
    o: lerp(a.o, b.o, blend),
  };
}

/** Draws a photoreal-ish vinyl face: grooves, track bands, label, spindle. */
function drawVinylFace(size = 1024): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const cx = size / 2;
  const R = size / 2;

  // Vinyl body
  ctx.fillStyle = "#0b0b0b";
  ctx.beginPath();
  ctx.arc(cx, cx, R, 0, Math.PI * 2);
  ctx.fill();

  // Micro-grooves — dense concentric rings with slight tonal jitter
  const labelR = R * 0.31;
  for (let r = labelR + 6; r < R - 4; r += 1.5) {
    const a = 0.025 + Math.random() * 0.05;
    ctx.strokeStyle = Math.random() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a + 0.05})`;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, cx, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Track-separation bands (slightly glossier rings)
  [0.42, 0.55, 0.68, 0.82].forEach((f) => {
    ctx.strokeStyle = "rgba(255,255,255,0.10)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cx, R * f, 0, Math.PI * 2);
    ctx.stroke();
  });
  // Outer edge highlight
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cx, R - 2, 0, Math.PI * 2);
  ctx.stroke();

  // Paper label — Swiss white with ink type
  ctx.fillStyle = "#f2f1ee";
  ctx.beginPath();
  ctx.arc(cx, cx, labelR, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(10,10,10,0.7)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cx, labelR - 3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#0a0a0a";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 ${size * 0.045}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillText("PABLO ASSAD", cx, cx - size * 0.055);
  ctx.font = `500 ${size * 0.02}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillText("C O M M U N I C A T I O N", cx, cx + size * 0.06);
  ctx.font = `500 ${size * 0.016}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
  ctx.fillStyle = "rgba(10,10,10,0.55)";
  ctx.fillText("PARIS · 33 ⅓ RPM", cx, cx + size * 0.095);

  // Spindle hole
  ctx.fillStyle = "#141414";
  ctx.beginPath();
  ctx.arc(cx, cx, size * 0.013, 0, Math.PI * 2);
  ctx.fill();

  return c;
}

/** A music-note glyph on a transparent canvas → crisp ink sprite. */
function drawNote(glyph: string, size = 256): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#131311";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${size * 0.72}px "Helvetica Neue", "Segoe UI Symbol", Arial, sans-serif`;
  ctx.fillText(glyph, size / 2, size / 2 + size * 0.04);
  return c;
}

interface VinylAssets {
  discGeo: THREE.CylinderGeometry;
  faceMat: THREE.MeshPhysicalMaterial;
  sideMat: THREE.MeshStandardMaterial;
  noteMats: THREE.SpriteMaterial[];
}

function createAssets(): VinylAssets {
  const face = new THREE.CanvasTexture(drawVinylFace());
  face.anisotropy = 8;
  face.colorSpace = THREE.SRGBColorSpace;

  const faceMat = new THREE.MeshPhysicalMaterial({
    map: face,
    bumpMap: face,
    bumpScale: 0.35,
    roughness: 0.42,
    metalness: 0.05,
    clearcoat: 0.85,
    clearcoatRoughness: 0.3,
    transparent: true,
  });
  const sideMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0b0b0b"),
    roughness: 0.6,
    transparent: true,
  });

  const noteMats = ["♪", "♫", "♬"].map((g) => {
    const tex = new THREE.CanvasTexture(drawNote(g));
    tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  });

  return {
    // Open-ended cylinder caps handled by material groups: side uses sideMat,
    // both caps use the vinyl face.
    discGeo: new THREE.CylinderGeometry(1.3, 1.3, 0.045, 96, 1, false),
    faceMat,
    sideMat,
    noteMats,
  };
}

function Vinyl({ spans }: { spans: React.RefObject<SectionSpan[]> }) {
  const group = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  const assetsRef = useRef<VinylAssets | null>(null);
  if (!assetsRef.current) assetsRef.current = createAssets();
  const { discGeo, faceMat, sideMat, noteMats } = assetsRef.current;
  const smooth = useRef({ x: 0.58, y: 0, s: 1, o: 1, spin: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const assets = assetsRef.current;
    return () => {
      assets?.discGeo.dispose();
      assets?.faceMat.map?.dispose();
      assets?.faceMat.dispose();
      assets?.sideMat.dispose();
      assets?.noteMats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    const d = disc.current;
    if (!g || !d) return;

    const t = state.clock.elapsedTime;
    const scrollCenter = window.scrollY + window.innerHeight * 0.5;
    const kf = keyframeAt(spans.current ?? [], scrollCenter);
    const sm = smooth.current;
    const k = Math.min(1, delta * 4.5);

    sm.x = lerp(sm.x, kf.x, k);
    sm.y = lerp(sm.y, kf.y, k);
    sm.s = lerp(sm.s, kf.s, k);
    sm.o = lerp(sm.o, kf.o, k);

    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;
    g.position.set(sm.x * halfW * 0.92, sm.y * halfH * 0.9 + Math.sin(t * 0.5) * 0.06, 0);
    g.scale.setScalar(sm.s);

    // The scroll is the turntable: rotation tracks page position, with a slow
    // idle spin so the record never feels dead. Pointer tilts the platter.
    sm.spin = lerp(sm.spin, window.scrollY * 0.012 + t * 0.25, Math.min(1, delta * 5));
    d.rotation.y = sm.spin;
    sm.tx = lerp(sm.tx, -pointer.y * 0.16, Math.min(1, delta * 3));
    sm.ty = lerp(sm.ty, pointer.x * 0.22, Math.min(1, delta * 3));
    g.rotation.set(1.12 + sm.tx, sm.ty, -0.16);

    faceMat.opacity = sm.o;
    sideMat.opacity = sm.o;
    noteMats.forEach((m) => (m.opacity = sm.o * 0.9));
  });

  return (
    <group ref={group}>
      <mesh ref={disc} geometry={discGeo} material={[sideMat, faceMat, faceMat]} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Note key={i} index={i} material={noteMats[i % noteMats.length]} />
      ))}
    </group>
  );
}

function Note({ index, material }: { index: number; material: THREE.SpriteMaterial }) {
  const ref = useRef<THREE.Sprite>(null);
  const { pointer } = useThree();
  const seed = useMemo(
    () => ({
      r: 1.75 + (index % 3) * 0.3,
      sp: 0.16 + index * 0.035,
      ph: index * 1.05,
      sc: 0.26 + (index % 3) * 0.05,
    }),
    [index],
  );

  useFrame((state, delta) => {
    const s = ref.current;
    if (!s) return;
    const t = state.clock.elapsedTime;
    const a = t * seed.sp + seed.ph;
    // Inclined orbit around the record + gentle bob.
    const target = new THREE.Vector3(
      Math.cos(a) * seed.r,
      Math.sin(a) * seed.r * 0.35 + Math.sin(t * 0.9 + seed.ph) * 0.18,
      Math.sin(a) * seed.r * 0.6,
    );
    // Pointer magnetism — notes drift away from the cursor.
    const d = new THREE.Vector3(target.x - pointer.x * 2.4, target.y - pointer.y * 1.8, 0);
    const dist = Math.max(0.25, d.length());
    target.add(d.normalize().multiplyScalar(0.28 / dist));
    s.position.lerp(target, Math.min(1, delta * 2.5));
    s.scale.setScalar(seed.sc);
  });

  return <sprite ref={ref} material={material} />;
}

function Scene() {
  const spans = useSectionSpans();
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 7, 5]} intensity={2.1} />
      <directionalLight position={[-6, -2, 4]} intensity={0.45} color="#f4f0e8" />
      <Vinyl spans={spans} />
    </>
  );
}

export function VinylScene() {
  return (
    <Canvas
      className="pointer-events-none"
      camera={{ position: [0, 0, 7], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
    >
      <Scene />
    </Canvas>
  );
}
