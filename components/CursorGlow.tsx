"use client";

/* ─── CursorGlow ──────────────────────────────────────────────────────────────
   Brittany's signature effect — a soft radial light that follows the mouse.

   Performance design decision:
   We use useRef + direct DOM style mutation instead of useState.
   Why? useState would trigger a React re-render on EVERY mousemove event
   (up to 60 times/second). With a ref, we write directly to the DOM node —
   same visual result, zero React overhead, perfectly smooth on all devices.

   Cross-device behaviour:
   - Desktop/laptop : full glow follows cursor
   - Touch (mobile) : touchmove fires, glow follows finger
   - No mouse/touch : glow stays transparent (default)                      */

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    /* Direct DOM mutation — no rAF, no transition, no delay.
       rAF adds exactly 1 frame (16ms) of latency. For a glow
       that tracks the cursor, direct sync update feels tighter. */
    const onMouseMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(74,158,255,0.12), transparent 80%)`;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      el.style.background = `radial-gradient(350px circle at ${t.clientX}px ${t.clientY}px, rgba(74,158,255,0.09), transparent 80%)`;
    };

    const onMouseLeave = () => { el.style.background = "none"; };

    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        /* Fixed so it stays relative to viewport, not page content */
        position:       "fixed",
        inset:          0,

        /* Below content, above background */
        zIndex:         2,

        /* Never intercept clicks or hover events */
        pointerEvents:  "none",

        /* GPU-accelerated layer — smoother animation */
        willChange:     "background",

        /* Default: transparent until mouse moves */
        background:     "none",
      }}
    />
  );
}
