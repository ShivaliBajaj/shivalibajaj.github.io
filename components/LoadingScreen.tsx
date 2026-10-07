"use client";

import { useEffect, useState } from "react";

/* ─── LoadingScreen ──────────────────────────────────────────────────────────
   Displays for 1.5 seconds, then fades out and unmounts.
   The phrase "Genius at work." appears ONLY here — not anywhere else.       */
export default function LoadingScreen() {
  // Controls whether we are in the "exit" animation phase
  const [exiting, setExiting] = useState(false);
  // Controls whether the component is fully removed from the DOM
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // After 1.5s — start the fade-out animation
    const exitTimer = setTimeout(() => setExiting(true), 1500);

    // After 2s (1.5s display + 0.5s fade) — remove the component entirely
    const removeTimer = setTimeout(() => setGone(true), 2000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Once gone, render nothing — the main page content takes over
  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center
        ${exiting ? "loading-screen-exit" : ""}`}
      style={{ backgroundColor: "#00003C" }}
    >
      {/* Line 1: fades in immediately */}
      <p
        className="loading-line-1 font-body text-sm tracking-widest uppercase"
        style={{ color: "#B8C2D1" }}
      >
        Initializing Midnight Clinical Intelligence…
      </p>

      {/* Line 2: fades in after a short delay — appears only here */}
      <p
        className="loading-line-2 font-heading italic mt-3 text-base"
        style={{ color: "#4A9EFF" }}
      >
        Genius at work.
      </p>
    </div>
  );
}
