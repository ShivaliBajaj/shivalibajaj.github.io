"use client";

/* ─── LoadingScreen ──────────────────────────────────────────────────────────
   Displays for 1.5s then fades out and unmounts completely.

   Timeline:
   0.0s → component mounts, line 1 fades in (CSS .l1)
   0.6s → line 2 fades in        (CSS .l2 has 0.6s delay)
   1.5s → setExiting(true)       → .exit class triggers fade-out animation
   2.0s → setGone(true)          → component returns null, removed from DOM

   Performance note:
   We use two separate timers instead of one so the exit animation
   has time to finish (0.5s) before the component unmounts.

   "Genius at work." appears ONLY here — nowhere else in the portfolio.     */

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [exiting, setExiting] = useState(false);
  const [gone,    setGone]    = useState(false);

  useEffect(() => {
    const exitTimer   = setTimeout(() => setExiting(true), 1500);
    const removeTimer = setTimeout(() => setGone(true),    2000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  /* Fully removed from DOM — no layout impact after animation */
  if (gone) return null;

  return (
    <div
      className={exiting ? "exit" : ""}
      style={{
        /* Cover the entire viewport */
        position:        "fixed",
        inset:           0,
        zIndex:          50,       /* above everything */

        /* Background matches body so no flash */
        backgroundColor: "#00003C",

        /* Centre the two lines */
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        gap:             12,
      }}
    >
      {/* Soft radial glow behind the text — purely decorative */}
      <div style={{
        position:     "absolute",
        width:        360,
        height:       360,
        borderRadius: "50%",
        background:   "radial-gradient(circle, rgba(74,158,255,0.08) 0%, transparent 70%)",
        pointerEvents:"none",
      }} />

      {/* Line 1 — fades in immediately via .l1 class */}
      <p
        className="l1"
        style={{
          position:      "relative",   /* sits above the glow div */
          fontFamily:    "'Inter', sans-serif",
          fontSize:      11,
          fontWeight:    400,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "#8892B0",
        }}
      >
        Initializing Midnight Clinical Intelligence…
      </p>

      {/* Line 2 — fades in at 0.6s via .l2 class
          "Genius at work." is locked here and appears nowhere else.       */}
      <p
        className="l2 font-heading"
        style={{
          position:   "relative",
          fontSize:   17,
          fontStyle:  "italic",
          fontWeight: 300,
          color:      "#4A9EFF",
        }}
      >
        Genius at work.
      </p>
    </div>
  );
}
