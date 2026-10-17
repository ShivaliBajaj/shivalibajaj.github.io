"use client";

/* ─── SectionLabel ───────────────────────────────────────────────────────────
   Shared sticky label used at the top of every section.
   One source of truth — all four sections import from here.

   Design: Option C — label text left, faint accent rule extends right.
   Halo (backdrop blur) is intentional — Donny's confirmed style.

   backdropFilter: blur(12px)
   ───────────────────────────
   Semi-transparent background + blur = frosted glass halo as content
   scrolls underneath. rgba(0,0,60,0.85) = #00003C at 85% opacity.
   Content bleeds through faintly. This is a deliberate design choice.

   Rule line
   ──────────
   1px line extends right from the label text, fading out via gradient.
   Editorial chapter-divider feel.

   Mobile: tighter padding via .section-label-inner CSS class.              */

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
        WebkitBackdropFilter: "blur(12px)",   /* Safari */

        /* Option C layout: text + rule line side by side */
        display:              "flex",
        alignItems:           "center",
        gap:                  16,
      }}
    >
      {/* Label text — never shrinks, never wraps */}
      <p
        className="section-label-text"
        style={{
          fontFamily:    "'Inter', sans-serif",
          fontWeight:    700,
          textTransform: "uppercase",
          color:         "#CCD6F6",
          margin:        0,
          flexShrink:    0,
        }}
      >
        {text}
      </p>

      {/* Rule line — fades accent blue → transparent, left to right */}
      <div style={{
        flex:       1,
        height:     "1px",
        background: "linear-gradient(to right, rgba(74,158,255,0.35) 0%, transparent 100%)",
      }} />
    </div>
  );
}
