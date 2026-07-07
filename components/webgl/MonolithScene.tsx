"use client";

/* eslint-disable react-hooks/refs -- three.js geometries/materials are mutable
   GPU resources; they live in a lazy ref (init-once) and are only mutated from
   the render loop, which is the idiomatic R3F pattern. */

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * "Le Monolithe" — the site's signature 3D moment. A faceted ink sculpture
 * floats through the page: the camera-object pair is driven entirely by
 * scroll (the scrub), morphing and relocating at each chapter, leaning
 * toward the pointer, trailed by a few satellite fragments.
 *
 * Runs as a fixed, pointer-transparent overlay choreographed into the
 * layout's whitespace so legibility always wins.
 */

// Per-section choreography — x/y are viewport fractions (-1..1), applied in
// world space. Tuned to sit in each chapter's whitespace.
const KEYFRAMES: Record<
  string,
  { x: number; y: number; s: number; morph: number; o: number }
> = {
  top: { x: 0.58, y: -0.02, s: 1.0, morph: 0.18, o: 1 },
  parcours: { x: 0.66, y: 0.05, s: 0.55, morph: 0.5, o: 0.85 },
  projets: { x: 0.86, y: 0.1, s: 0.28, morph: 0.75, o: 0.14 },
  creation: { x: 0.62, y: 0.16, s: 0.5, morph: 0.95, o: 0.7 },
  outils: { x: -0.72, y: 0.12, s: 0.34, morph: 0.6, o: 0.45 },
  contact: { x: 0.55, y: 0.06, s: 0.78, morph: 0.28, o: 0.9 },
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
    // Re-measure once content (fonts/images) settles.
    setTimeout(measure, 1200);
  }, []);
  return spansRef;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

/** Blended keyframe for the current scroll position. */
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
  // Blend across the last 45% of the current section into the next.
  const span = Math.max(1, cur.bottom - cur.top);
  const p = Math.min(1, Math.max(0, (scrollCenter - cur.top) / span));
  const blend = ease(Math.min(1, Math.max(0, (p - 0.55) / 0.45)));
  return {
    x: lerp(a.x, b.x, blend),
    y: lerp(a.y, b.y, blend),
    s: lerp(a.s, b.s, blend),
    morph: lerp(a.morph, b.morph, blend),
    o: lerp(a.o, b.o, blend),
  };
}

/** Injects scroll-driven displacement into a standard material. */
function makeMorphMaterial(uniforms: { uTime: { value: number }; uMorph: { value: number } }) {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#111110"),
    roughness: 0.38,
    metalness: 0.22,
    flatShading: true,
  });
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uMorph = uniforms.uMorph;
    shader.vertexShader = `
      uniform float uTime;
      uniform float uMorph;
      ${shader.vertexShader}
    `.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
      {
        vec3 p = normalize(position);
        float f = 2.0 + uMorph * 3.5;
        float w = sin(p.x * f + uTime * 0.5) * sin(p.y * (f * 1.35) - uTime * 0.4) * sin(p.z * (f * 0.8) + uTime * 0.3);
        float w2 = sin(p.y * f * 2.3 + uTime * 0.22) * cos(p.x * f * 1.7 - uTime * 0.35);
        float amp = 0.06 + uMorph * 0.34;
        transformed += normal * (w * amp + w2 * amp * 0.45);
      }`,
    );
  };
  return mat;
}

interface SculptureAssets {
  uniforms: { uTime: { value: number }; uMorph: { value: number } };
  material: THREE.MeshStandardMaterial;
  geometry: THREE.BufferGeometry;
  fragGeo: THREE.BufferGeometry;
  fragMat: THREE.MeshStandardMaterial;
}

// Three.js objects are mutable by design — they live in a lazy ref, the
// sanctioned mutable box, and are mutated from the render loop only.
function createAssets(): SculptureAssets {
  const uniforms = { uTime: { value: 0 }, uMorph: { value: 0.2 } };
  const material = makeMorphMaterial(uniforms);
  material.transparent = true;
  const fragMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#181816"),
    roughness: 0.5,
    metalness: 0.3,
    flatShading: true,
    transparent: true,
  });
  return {
    uniforms,
    material,
    geometry: new THREE.IcosahedronGeometry(1.15, 24),
    fragGeo: new THREE.OctahedronGeometry(0.1, 0),
    fragMat,
  };
}

function Sculpture({ spans }: { spans: React.RefObject<SectionSpan[]> }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();
  const assetsRef = useRef<SculptureAssets | null>(null);
  if (!assetsRef.current) assetsRef.current = createAssets();
  const { uniforms, material, geometry, fragGeo, fragMat } = assetsRef.current;
  const smooth = useRef({ x: 0.58, y: 0, s: 1, o: 1, rx: 0, ry: 0 });

  useEffect(() => {
    const assets = assetsRef.current;
    return () => {
      assets?.geometry.dispose();
      assets?.fragGeo.dispose();
      assets?.material.dispose();
      assets?.fragMat.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    const m = mesh.current;
    if (!g || !m) return;

    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;

    const scrollCenter = window.scrollY + window.innerHeight * 0.5;
    const kf = keyframeAt(spans.current ?? [], scrollCenter);
    const sm = smooth.current;
    const k = Math.min(1, delta * 4.5);

    sm.x = lerp(sm.x, kf.x, k);
    sm.y = lerp(sm.y, kf.y, k);
    sm.s = lerp(sm.s, kf.s, k);
    sm.o = lerp(sm.o, kf.o, k);
    uniforms.uMorph.value = lerp(uniforms.uMorph.value, kf.morph, k);

    // Viewport-fraction → world units.
    const halfW = viewport.width / 2;
    const halfH = viewport.height / 2;
    g.position.set(sm.x * halfW * 0.92, sm.y * halfH * 0.9 + Math.sin(t * 0.55) * 0.07, 0);
    g.scale.setScalar(sm.s);

    // Scroll = the scrub: rotation advances with page progress; pointer leans.
    const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = window.scrollY / docH;
    sm.ry = lerp(sm.ry, progress * Math.PI * 2.4 + pointer.x * 0.35, Math.min(1, delta * 3));
    sm.rx = lerp(sm.rx, -pointer.y * 0.28 + progress * 0.6, Math.min(1, delta * 3));
    m.rotation.set(sm.rx + t * 0.05, sm.ry + t * 0.07, 0);

    material.opacity = sm.o;
    fragMat.opacity = sm.o * 0.9;
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry} material={material} />
      {/* Satellite fragments — quiet levitation, pointer-shy */}
      {[0, 1, 2, 3].map((i) => (
        <Satellite key={i} index={i} geometry={fragGeo} material={fragMat} />
      ))}
    </group>
  );
}

function Satellite({
  index,
  geometry,
  material,
}: {
  index: number;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const seed = useMemo(() => ({ r: 1.7 + index * 0.28, sp: 0.14 + index * 0.05, ph: index * 1.7 }), [index]);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const a = t * seed.sp + seed.ph;
    const target = new THREE.Vector3(
      Math.cos(a) * seed.r,
      Math.sin(a * 0.8 + seed.ph) * 0.75,
      Math.sin(a) * seed.r * 0.5,
    );
    // Pointer magnetism — fragments shy away gently.
    const d = new THREE.Vector3(target.x - pointer.x * 2.2, target.y - pointer.y * 1.6, 0);
    const dist = Math.max(0.25, d.length());
    target.add(d.normalize().multiplyScalar(0.25 / dist));
    m.position.lerp(target, Math.min(1, delta * 2.5));
    m.rotation.x = t * (0.3 + seed.sp);
    m.rotation.y = t * 0.4;
  });

  return <mesh ref={ref} geometry={geometry} material={material} />;
}

function Scene() {
  const spans = useSectionSpans();
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} />
      <directionalLight position={[-6, -2, 4]} intensity={0.5} color="#f4f0e8" />
      <Sculpture spans={spans} />
    </>
  );
}

export function MonolithScene() {
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
