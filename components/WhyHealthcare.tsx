"use client";

/* ── WhyHealthcare ────────────────────────────────────────────────────────────
   A tiny ECG flatline in the footer corner.
   Hover → brightens + shows "Why healthcare?" tooltip.
   Click → card rises with rotating quotes (auto-advances every 4s).
   Click outside or press Escape to dismiss.
   No over-engineering: pure CSS animation + useState. No deps.

   v1.1 changes:
   - Drag handle pill: visible on mobile (<768px) only, hidden on desktop
   - Left accent bar: 2px → 1px (subtler, more clinical)
   - Indicators: width-expanding dashes → vitals bars (6 vertical bars,
     varying heights, bottom-aligned — looks like a monitor reading)         */

import { useState, useEffect, useCallback } from "react";

const QUOTES = [
  "I come from software. I chose medicine. The gap between them is where I work.",
  "I didn't choose healthcare because it's impactful. I chose it because I couldn't stop thinking about it.",
  "Software taught me to ship fast. Biology taught me why that's dangerous.",
  "Healthcare didn't choose me as a career. It chose me as a problem I couldn't leave alone.",
  "There's a difference between a model that performs and a model that helps. I'm interested in the second one.",
  "If I can't explain it to the person it's meant to help, it's not ready.",
];

/* Bar heights (px) for vitals indicator — organic variation mimics a reading */
const BAR_HEIGHTS = [8, 14, 10, 18, 12, 9];

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

  const openCard  = () => { setIndex(0); setExiting(false); setOpen(true); };
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
        <svg width="48" height="18" viewBox="0 0 48 18" fill="none" aria-hidden>
          <polyline
            points="0,9 10,9 13,3 16,15 19,9 22,9 24,9 27,9 48,9"
            stroke="#4A9EFF" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
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
              position:   "fixed",
              bottom:     exiting ? "-320px" : "0",
              left:       "50%",
              transform:  "translateX(-50%)",
              zIndex:     201,
              width:      "min(560px, 94vw)",
              background: "linear-gradient(180deg, #06065C 0%, #020240 100%)",
              borderTop:   "1px solid rgba(74,158,255,0.18)",
              borderLeft:  "1px solid rgba(74,158,255,0.07)",
              borderRight: "1px solid rgba(74,158,255,0.07)",
              borderBottom:"none",
              borderRadius:"20px 20px 0 0",
              padding:    "12px 36px 48px",
              transition: "bottom 0.35s cubic-bezier(0.32,0.72,0,1)",
              animation:  exiting ? "none" : "slideUp 0.35s cubic-bezier(0.32,0.72,0,1) forwards",
            }}
          >
            {/* Drag handle pill — mobile only; hidden ≥768px via injected CSS */}
            <div className="drag-handle-pill" style={{
              width: 36, height: 3,
              background: "rgba(74,158,255,0.22)",
              borderRadius: 2,
              margin: "0 auto 28px",
            }} />

            {/* Header: ECG + label + close */}
            <div style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              marginBottom:   28,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <svg width="38" height="14" viewBox="0 0 38 14" fill="none" aria-hidden>
                  <polyline
                    points="0,7 8,7 11,2 14,12 17,7 20,7 38,7"
                    stroke="#4A9EFF" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                <span style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      10, fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color:         "#4A9EFF",
                }}>
                  Why healthcare?
                </span>
              </div>

              <button
                onClick={closeCard}
                aria-label="Close"
                style={{
                  background:"none", border:"none", cursor:"pointer",
                  color:"rgba(136,146,176,0.5)", fontSize:16, lineHeight:1,
                  transition:"color 0.15s ease", padding:"4px 6px",
                }}
                onMouseEnter={e => (e.currentTarget.style.color="#CCD6F6")}
                onMouseLeave={e => (e.currentTarget.style.color="rgba(136,146,176,0.5)")}
              >
                ✕
              </button>
            </div>

            {/* Left accent bar — 1px thin (subtler, more clinical feel) */}
            <div style={{
              borderLeft: "1px solid rgba(74,158,255,0.28)",
              paddingLeft: 20,
              marginBottom: 28,
            }}>
              <blockquote style={{
                margin:     0,
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize:   "clamp(15px, 2.8vw, 18px)",
                fontWeight: 300, fontStyle: "italic",
                lineHeight: 1.85,
                color:      "#CCD6F6",
                minHeight:  72,
                transition: "opacity 0.4s ease",
              }}>
                {QUOTES[index]}
              </blockquote>
            </div>

            {/* Vitals bars — 6 vertical bars, bottom-aligned, varying heights.
                Active bar = solid blue; inactive = dim ghost.
                Clicking any bar jumps to that quote.                        */}
            <div style={{ display:"flex", gap: 6, alignItems: "flex-end" }}>
              {BAR_HEIGHTS.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Quote ${i + 1}`}
                  style={{
                    width:        4,
                    height:       h,
                    borderRadius: 2,
                    background:   i === index ? "#4A9EFF" : "rgba(74,158,255,0.18)",
                    border:       "none", cursor: "pointer",
                    transition:   "background 0.3s ease",
                    padding:      0,
                    flexShrink:   0,
                  }}
                />
              ))}
            </div>
                        {/* Keyboard hint */}
            <p style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      10,
              color:         "rgba(136,146,176,0.35)",
              letterSpacing: "0.08em",
              textAlign:     "center",
              marginTop:     16,
              marginBottom:  0,
            }}>
              Press <kbd style={{ fontFamily: "monospace", background: "rgba(74,158,255,0.08)", border: "1px solid rgba(74,158,255,0.15)", borderRadius: 3, padding: "1px 5px" }}>Esc</kbd> to close
            </p>
          </div>
        </>
      )}

      {/* Keyframe animations + drag handle responsive rule */}
      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes fadeOut { from { opacity:1 } to { opacity:0 } }
        @keyframes slideUp { from { transform:translateX(-50%) translateY(100%) } to { transform:translateX(-50%) translateY(0) } }
        .drag-handle-pill { display: block; }
        @media (min-width: 768px) { .drag-handle-pill { display: none; } }
      `}</style>
    </>
  );
}
