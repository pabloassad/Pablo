"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The site's signature moment: Pablo's portrait rendered as a living cloud of
 * ~20k ink particles. The cloud assembles when the hero enters view, breathes,
 * leans away from the pointer, and disperses as you scroll past.
 *
 * Hand-written WebGL (no three.js) to keep the bundle tiny. DPR is capped, the
 * loop pauses off-screen, and reduced-motion users get the plain photograph.
 */

const VERT = `
attribute vec2 a_target;   // resting position, image space [0,1]
attribute vec4 a_seed;     // per-particle randoms
attribute float a_weight;  // darkness 0..1 → size/alpha

uniform float u_time;
uniform float u_form;      // 0 scattered → 1 assembled
uniform float u_scatter;   // 0 assembled → 1 dispersed (scroll)
uniform vec2  u_mouse;     // image space; x<-5 = inactive
uniform vec2  u_size;      // canvas px

varying float v_alpha;

float easeOut(float t) { return 1.0 - pow(1.0 - t, 3.0); }

void main() {
  // Staggered formation: each particle starts on its own delay.
  float t = clamp((u_form - a_seed.w * 0.55) / 0.45, 0.0, 1.0);
  float f = easeOut(t);

  vec2 scattered = a_target + (a_seed.xy - 0.5) * vec2(2.4, 2.8);
  vec2 pos = mix(scattered, a_target, f);

  // Idle breath.
  pos += vec2(
    sin(u_time * 0.7 + a_seed.x * 6.2832),
    cos(u_time * 0.9 + a_seed.y * 6.2832)
  ) * 0.0035 * (0.4 + a_seed.z);

  // Pointer repulsion.
  if (u_mouse.x > -4.0) {
    vec2 d = pos - u_mouse;
    float dist = length(d) + 1e-4;
    float push = exp(-dist * 9.0) * 0.10;
    pos += (d / dist) * push;
  }

  // Scroll dispersion: drift outward and up, fade away.
  vec2 fromCenter = pos - vec2(0.5, 0.45);
  pos += fromCenter * u_scatter * 1.6 + vec2(0.0, -0.25) * u_scatter * a_seed.z;

  v_alpha = a_weight * f * (1.0 - u_scatter);

  vec2 clip = vec2(pos.x * 2.0 - 1.0, 1.0 - pos.y * 2.0);
  gl_Position = vec4(clip, 0.0, 1.0);
  float base = u_size.y / 620.0;
  gl_PointSize = max(1.0, base * (0.8 + a_weight * 2.4));
}
`;

const FRAG = `
precision mediump float;
varying float v_alpha;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float disc = smoothstep(0.5, 0.32, d);
  float a = v_alpha * disc * 0.92;
  if (a < 0.01) discard;
  gl_FragColor = vec4(0.04, 0.04, 0.04, a);
}
`;

interface ParticlePortraitProps {
  src: string;
  alt: string;
  className?: string;
}

export function ParticlePortrait({ src, alt, className }: ParticlePortraitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Client-only capability check: reduced-motion (and WebGL support below)
      // can't be known during SSR, so the fallback swap must happen post-mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFallback(true);
      return;
    }

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      setFallback(true);
      return;
    }

    let raf = 0;
    let disposed = false;
    let visible = false;
    let formStart = 0;
    const mouse = { x: -10, y: -10 };

    const compile = (type: number, source: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return null;
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFallback(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uForm = gl.getUniformLocation(prog, "u_form");
    const uScatter = gl.getUniformLocation(prog, "u_scatter");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uSize = gl.getUniformLocation(prog, "u_size");

    let count = 0;

    // ── Sample the photograph into particles ────────────────────────────
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (disposed) return;
      const isSmall = window.innerWidth < 768;
      const GW = isSmall ? 96 : 140;
      const GH = Math.round(GW * 1.25);
      const off = document.createElement("canvas");
      off.width = GW;
      off.height = GH;
      const ctx = off.getContext("2d");
      if (!ctx) {
        setFallback(true);
        return;
      }
      ctx.drawImage(img, 0, 0, GW, GH);
      const data = ctx.getImageData(0, 0, GW, GH).data;

      const targets: number[] = [];
      const seeds: number[] = [];
      const weights: number[] = [];
      const BG = 0.9; // near-white studio ground

      for (let y = 0; y < GH; y++) {
        for (let x = 0; x < GW; x++) {
          const i = (y * GW + x) * 4;
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          const darkness = Math.min(1, Math.max(0, (BG - lum) * 2.1));
          if (darkness < 0.05) continue;
          if (Math.random() > 0.12 + darkness * 0.88) continue;
          targets.push((x + 0.5) / GW, (y + 0.5) / GH);
          seeds.push(Math.random(), Math.random(), Math.random(), Math.random());
          weights.push(0.25 + darkness * 0.75);
        }
      }
      count = weights.length;

      const bind = (name: string, arr: number[], size: number) => {
        const loc = gl.getAttribLocation(prog, name);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      };
      bind("a_target", targets, 2);
      bind("a_seed", seeds, 4);
      bind("a_weight", weights, 1);
    };
    img.onerror = () => setFallback(true);

    // ── Size / DPR ──────────────────────────────────────────────────────
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── Interaction ─────────────────────────────────────────────────────
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      mouse.x = -10;
      mouse.y = -10;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
          if (visible && !formStart) formStart = performance.now();
        });
      },
      { threshold: 0.15 },
    );
    io.observe(wrap);

    // ── Loop ────────────────────────────────────────────────────────────
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || !count) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return;
      }

      const t = (now - start) / 1000;
      const form = formStart ? Math.min(1, (now - formStart) / 1900) : 0;

      // Scroll dispersion: how far the hero has been scrolled past.
      const rect = wrap.getBoundingClientRect();
      const gone = Math.min(1, Math.max(0, -rect.top / (rect.height * 1.15)));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uForm, form);
      gl.uniform1f(uScatter, gone);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2f(uSize, canvas.width, canvas.height);
      gl.drawArrays(gl.POINTS, 0, count);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={className} style={{ aspectRatio: "4 / 5" }}>
      {fallback ? (
        // eslint-disable-next-line @next/next/no-img-element -- static fallback, already optimized
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <canvas ref={canvasRef} aria-label={alt} role="img" className="h-full w-full" />
      )}
    </div>
  );
}
