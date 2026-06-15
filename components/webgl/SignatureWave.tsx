"use client";

import { useEffect, useRef } from "react";

/**
 * The site's signature element: a generative "frequency ribbon" rendered with
 * hand-written WebGL — layered sine waves in the amber accent, drifting over
 * the paper background and leaning subtly toward the pointer.
 *
 * Deliberately dependency-free (no three.js) to keep the bundle tiny and
 * Lighthouse high. Caps the device-pixel-ratio, pauses when off-screen, and
 * renders a single static frame for prefers-reduced-motion users.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time;
  float acc = 0.0;

  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float freq = 1.0 + fi * 0.85;
    float speed = 0.28 + fi * 0.11;
    float amp = 0.11 - fi * 0.013;
    float phase = fi * 1.27;
    float swell = 0.6 + 0.4 * sin(t * 0.45 + fi);
    float y = 0.5
      + sin(uv.x * 6.2831 * freq + t * speed + phase + u_mouse.x * 1.2) * amp * swell
      + sin(uv.x * 3.14159 * (freq + 1.3) - t * speed * 0.6) * amp * 0.4;
    float d = abs(uv.y - y);
    float line = smoothstep(0.013, 0.0, d);
    acc += line * (0.55 - fi * 0.07);
  }

  vec3 col = vec3(0.886, 0.384, 0.180); // #E2622E
  float alpha = clamp(acc, 0.0, 1.0);
  alpha *= smoothstep(0.0, 0.16, uv.x) * smoothstep(1.0, 0.84, uv.x);
  gl_FragColor = vec4(col, alpha * 0.85);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function SignatureWave({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen triangle.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0, y: 0 };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onPointer = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Pause the loop when the hero scrolls out of view.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !prefersReduced) frame = requestAnimationFrame(render);
    });
    io.observe(canvas);

    let frame = 0;
    const start = performance.now();
    const render = () => {
      const time = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !prefersReduced) frame = requestAnimationFrame(render);
    };

    if (prefersReduced) {
      gl.uniform1f(uTime, 1.5);
      gl.uniform2f(uMouse, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      frame = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
