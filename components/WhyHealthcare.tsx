"use client";

/* ── WhyHealthcare ────────────────────────────────────────────────────────────
   A tiny ECG flatline in the footer corner.
   Hover → brightens + shows "Why healthcare?" tooltip.
   Click → card rises with rotating quotes (auto-advances every 4s).
   Click outside or press Escape to dismiss.
   No over-engineering: pure CSS animation + useState. No deps.             */

import { useState, useEffect, useCallback } from "react";

const QUOTES = [
  "I come from software. I chose medicine. The gap between them is where I work.",
  "I didn't choose healthcare because it's impactful. I chose it because I couldn't stop thinking about it.",
  "Software taught me to ship fast. Biology taught me why that's dangerous.",
  "Healthcare didn't choose me as a career. It chose me as a problem I couldn't leave alone.",
  "There's a difference between a model that performs and a model that helps. I'm interested in the second one.",
  "If I can't explain it to the person it's meant to help, it's not ready.",
];

export default function WhyHealthcare() {
  const [open,    setOpen]    = useState(false);
  const [index,   setIndex]   = useState(0);
  const [exiting, setExiting] = useState(false);

  /* Auto-advance quotes every 4s when card is open */
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => {
      setIndex(i => (i + 1) % QUOTES.length);
    }, 4000);
    return () => clearInterval(t);
  }, [open]);

  /* Close on Escape */
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") closeCard();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const openCard = () => { setIndex(0); setExiting(false); setOpen(true); };
  const closeCard = () => {
    setExiting(true);
    setTimeout(() => { setOpen(false); setExiting(false); }, 300);
  };

  return (
    <>
      {/* ── Trigger: tiny ECG line ── */}
      <button
        onClick={openCard}
        aria-label="Why healthcare? Click to read."
        title="Why healthcare?"
        style={{
          background: "none", border: "none", cursor: "pointer",
          padding: "4px 8px", display: "inline-flex",
          alignItems: "center", gap: 8,
          opacity: 0.45, transition: "opacity 0.3s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.45")}
      >
        {/* SVG ECG flatline → spike → flatline */}
        <svg width="48" height="18" viewBox="0 0 48 18" fill="none" aria-hidden>
          <polyline
            points="0,9 10,9 13,3 16,15 19,9 22,9 24,9 27,9 48,9"
            stroke="#4A9EFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10, fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#4A9EFF",
        }}>
          Why healthcare?
        </span>
      </button>

      {/* ── Quote card ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeCard}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(0,0,40,0.5)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              animation: exiting
                ? "fadeOut 0.3s ease forwards"
                : "fadeIn 0.3s ease forwards",
            }}
          />

          {/* Card */}
          <div
            role="dialog"
            aria-label="Why I chose healthcare"
            style={{
              position: "fixed",
              bottom: exiting ? "-200px" : "0",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 201,
              width: "min(520px, 90vw)",
              background: "rgba(2,2,71,0.98)",
              border: "1px solid rgba(74,158,255,0.2)",
              borderBottom: "none",
              borderRadius: "16px 16px 0 0",
              padding: "40px 36px 48px",
              transition: "bottom 0.35s cubic-bezier(0.32,0.72,0,1)",
              animation: exiting ? "none" : "slideUp 0.35s cubic-bezier(0.32,0.72,0,1) forwards",
            }}
          >
            {/* Close */}
            <button
              onClick={closeCard}
              aria-label="Close"
              style={{
                position:"absolute", top:16, right:16,
                background:"none", border:"none", cursor:"pointer",
                color:"#8892B0", fontSize:18, lineHeight:1,
                transition:"color 0.15s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color="#CCD6F6")}
              onMouseLeave={e => (e.currentTarget.style.color="#8892B0")}
            >
              ✕
            </button>

            {/* Label */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#4A9EFF", margin: "0 0 24px",
            }}>
              Why healthcare?
            </p>

            {/* Quote */}
            <blockquote style={{
              margin: 0,
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize: "clamp(16px, 3vw, 20px)",
              fontWeight: 300, fontStyle: "italic",
              lineHeight: 1.75,
              color: "#CCD6F6",
              minHeight: 80,
              transition: "opacity 0.4s ease",
            }}>
              {QUOTES[index]}
            </blockquote>

            {/* Dot indicators */}
            <div style={{ display:"flex", gap:8, marginTop:28 }}>
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Quote ${i + 1}`}
                  style={{
                    width: i === index ? 20 : 6,
                    height: 6, borderRadius: 3,
                    background: i === index ? "#4A9EFF" : "rgba(74,158,255,0.25)",
                    border: "none", cursor: "pointer",
                    transition: "width 0.3s ease, background 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes fadeOut { from { opacity:1 } to { opacity:0 } }
        @keyframes slideUp { from { transform:translateX(-50%) translateY(100%) } to { transform:translateX(-50%) translateY(0) } }
      `}</style>
    </>
  );
}
