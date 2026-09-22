"use client";

/* ─── ScrollProgress ─────────────────────────────────────────────────────────
   A thin line at the very top of the viewport that grows from left to right
   as the user scrolls down the page.

   How it works:
   scrollTop    = how many pixels the user has scrolled from the top
   scrollHeight = total scrollable height of the document
   clientHeight = visible viewport height

   progress = scrollTop / (scrollHeight - clientHeight) × 100

   Why (scrollHeight - clientHeight)?
   When you're at the very bottom, scrollTop equals (scrollHeight - clientHeight)
   not scrollHeight. Subtracting clientHeight makes 100% = fully scrolled.

   Performance:
   Same pattern as CursorGlow — useRef + direct DOM mutation.
   No useState means zero re-renders on scroll.
   requestAnimationFrame smooths the update to match display refresh rate.  */

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateProgress = () => {
      const scrollTop    = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;

      /* Clamp between 0–100 to handle edge cases */
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    const onScroll = () => {
      /* Cancel any pending frame before requesting a new one
         Prevents queuing multiple frames on fast scroll               */
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress(); /* Set initial value */

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    /* Fixed to the very top of the viewport — above everything */
    <div
      style={{
        position:  "fixed",
        top:       0,
        left:      0,
        right:     0,
        height:    2,
        zIndex:    60,          /* above LoadingScreen's z-index 50 once loaded */
        backgroundColor: "rgba(0, 0, 60, 0.0)",  /* transparent track */
        pointerEvents: "none",
      }}
    >
      {/* The actual progress bar — width grows via JS */}
      <div
        ref={barRef}
        style={{
          height:    "100%",
          width:     "0%",
          background: "linear-gradient(to right, #4A9EFF, #7BBFDE)",
          /* No CSS transition — requestAnimationFrame handles smoothness */
        }}
      />
    </div>
  );
}
