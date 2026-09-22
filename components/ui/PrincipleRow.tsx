"use client";

/* ─── PrincipleRow ───────────────────────────────────────────────────────────
   Reusable row for each of the 10 locked principles.
   Same hover pattern as ProjectCard — background tint + border.

   Layout mirrors Brittany's experience items:
   Left  : number (faint accent, decorative)
   Right : title (bright) + detail (muted)

   Why <div> not <li>?
   The principles aren't a list in the semantic sense — they're more
   like named sections of a philosophy. <div> with aria-label is cleaner
   than a <ul><li> pattern that would need extra reset styles.             */

export type Principle = {
  num:    number;
  title:  string;
  detail: string;
};

export function PrincipleRow({ num, title, detail }: Principle) {
  return (
    <div
      className="principle-row"
      style={{
        display:      "flex",
        borderRadius: 8,
        border:       "1px solid transparent",
        transition:   "background 0.2s ease, border-color 0.2s ease",
        cursor:       "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background   = "rgba(148, 163, 184, 0.06)";
        e.currentTarget.style.borderColor  = "rgba(148, 163, 184, 0.18)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background   = "transparent";
        e.currentTarget.style.borderColor  = "transparent";
      }}
    >
      {/* ── Number — faint, like Brittany's date column ───────────────── */}
      <span
        className="principle-number"
        style={{
          fontFamily:  "'Inter', sans-serif",
          fontSize:    11,
          fontWeight:  600,
          color:       "rgba(74, 158, 255, 0.3)",
          minWidth:    24,
          paddingTop:  2,
          flexShrink:  0,
          userSelect:  "none",
        }}
      >
        {String(num).padStart(2, "0")}
      </span>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div>
        <p
          className="font-heading principle-title"
          style={{
            fontWeight: 400,
            color:      "#CCD6F6",
            lineHeight: 1.6,
          }}
        >
          {title}
        </p>

        <p
          className="principle-detail"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            color:      "#8892B0",
            margin:     0,
          }}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}
