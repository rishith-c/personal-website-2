"use client";

import { useEffect, useRef } from "react";

/**
 * A real-time 3D orb rendered on a WebGL canvas. It's an analytic lit sphere
 * drawn entirely in the fragment shader: graphite metal body, a warm rim that
 * picks up the site accent, white specular glints, and a slow hue drift so it
 * never sits still. The key light drifts on its own and leans toward the
 * cursor when you hover the hero. Square, so it scales cleanly to whatever box
 * it's dropped in. Under reduced-motion it paints one static frame and stops;
 * if WebGL isn't available the CSS gradient sphere underneath shows through.
 */
const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_pointer;

vec3 hue(float h) {
  return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

void main() {
  vec2 uv = v_uv;
  float r2 = dot(uv, uv);
  if (r2 > 1.0) { gl_FragColor = vec4(0.0); return; }
  float z = sqrt(1.0 - r2);
  vec3 N = vec3(uv, z);

  // Key light: slow autonomous drift, nudged toward the cursor on hover.
  vec2 pp = u_pointer * 0.6;
  vec3 L = normalize(vec3(
    pp.x + 0.34 * sin(u_time * 0.4),
    pp.y + 0.52 + 0.20 * cos(u_time * 0.33),
    0.85));
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);

  float diff = clamp(dot(N, L), 0.0, 1.0);
  float spec = pow(clamp(dot(N, H), 0.0, 1.0), 60.0);
  float fres = pow(1.0 - z, 2.3);

  vec3 base = mix(vec3(0.055, 0.055, 0.07), vec3(0.21, 0.21, 0.24), diff);
  base += 0.10 * hue(0.03 + N.y * 0.05 + u_time * 0.012) * diff;

  vec3 accent = vec3(0.86, 0.19, 0.12);
  vec3 col = base;
  col += accent * fres * 0.95;
  col += vec3(1.0) * spec * 0.85;
  col *= 0.84 + 0.16 * z;

  float edge = smoothstep(1.0, 0.984, r2);
  gl_FragColor = vec4(col, edge);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function OrbCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return; // CSS fallback sphere stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // Two triangles covering clip space; a_pos doubles as the sphere's uv.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uPointer = gl.getUniformLocation(prog, "u_pointer");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const size = canvas.clientWidth;
      const px = Math.max(1, Math.floor(size * dpr));
      if (canvas.width !== px) {
        canvas.width = px;
        canvas.height = px;
        gl.viewport(0, 0, px, px);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pointer in canvas-local space, eased toward the target each frame.
    let px = 0, py = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
      tx = Math.max(-1.4, Math.min(1.4, tx));
      ty = Math.max(-1.4, Math.min(1.4, ty));
    };
    const onLeave = () => { tx = 0; ty = 0; };

    let raf = 0;
    const start = performance.now();
    const draw = (now: number) => {
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uPointer, px, py);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      resize();
      gl.uniform1f(uTime, 0);
      gl.uniform2f(uPointer, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onLeave);
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{
        display: "block",
        width: "100%",
        aspectRatio: "1 / 1",
        // CSS sphere fallback, visible if WebGL never paints.
        background:
          "radial-gradient(40% 38% at 38% 32%, #34343a 0%, #1a1a1f 42%, #0c0c10 78%, transparent 100%)",
        borderRadius: "9999px",
      }}
    />
  );
}
