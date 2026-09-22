"use client";

/* ─── SectionLabel ───────────────────────────────────────────────────────────
   Shared sticky label used at the top of every section.
   One source of truth — all four sections import from here.

   Mobile: tighter padding via .section-label-inner CSS class.
   Desktop: full padding + frosted glass effect.                            */

export function SectionLabel({ text }: { text: string }) {
  return (
    <div
      className="section-label-inner"
      style={{
        position:             "sticky",
        top:                  0,
        zIndex:               10,
        background:           "rgba(0, 0, 60, 0.85)",
        backdropFilter:       "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <p
        className="section-label-text"
        style={{
          fontFamily:    "'Inter', sans-serif",
          fontWeight:    700,
          textTransform: "uppercase",
          color:         "#CCD6F6",
          margin:        0,
        }}
      >
        {text}
      </p>
    </div>
  );
}
