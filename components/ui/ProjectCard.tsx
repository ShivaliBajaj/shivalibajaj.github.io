"use client";

/* ─── ProjectCard ────────────────────────────────────────────────────────────
   Reusable card component used by both AirAware (Part 16) and
   MindCare (Part 17). Hover effects added in Part 18.

   Why a separate component file?
   Both cards are structurally identical — only the data differs.
   One component + two data objects = zero duplication.
   If the card layout changes, one edit updates both cards.

   Why the whole card is an <a> tag:
   Brittany wraps her project cards in anchor tags — the entire
   surface is clickable, not just a "View" button at the bottom.
   Better UX: larger click target, clearer affordance.

   rel="noopener noreferrer"
   ──────────────────────────
   Security best practice for all target="_blank" links.
   noopener  → new tab can't access window.opener (prevents tab hijacking)
   noreferrer → doesn't send the referring URL to GitHub                  */

export type Project = {
  id:          string;
  name:        string;
  type:        string;
  description: string;
  domains:     string[];
  status:      string;
  githubUrl:   string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      style={{
        display:        "block",
        borderRadius:   8,
        border:         "1px solid transparent",
        textDecoration: "none",
        transition:     "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        /* Brittany's exact card hover — subtle tint + faint border + top glow */
        el.style.background   = "rgba(148, 163, 184, 0.06)";
        el.style.borderColor  = "rgba(148, 163, 184, 0.18)";
        el.style.boxShadow    = "inset 0 1px 0 0 rgba(74, 158, 255, 0.1)";

        /* Arrow nudges diagonally — signals "opens externally" */
        const arrow = el.querySelector<HTMLSpanElement>(".card-arrow");
        if (arrow) arrow.style.transform = "translate(2px, -2px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.background  = "transparent";
        el.style.borderColor = "transparent";
        el.style.boxShadow   = "none";

        const arrow = el.querySelector<HTMLSpanElement>(".card-arrow");
        if (arrow) arrow.style.transform = "translate(0, 0)";
      }}
    >
      {/* ── Top row: type badge + project number ──────────────────────── */}
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "flex-start",
        marginBottom:   10,
      }}>
        {/* Type label — uppercase, accent colour */}
        <p
          className="project-card-type"
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontWeight:    600,
            textTransform: "uppercase",
            color:         "#4A9EFF",
            margin:        0,
          }}
        >
          {project.type}
        </p>

        {/* Project number — faint, purely decorative */}
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   11,
          fontWeight: 400,
          color:      "rgba(74, 158, 255, 0.3)",
        }}>
          {project.id}
        </span>
      </div>

      {/* ── Project name + arrow ──────────────────────────────────────── */}
      <div style={{
        display:     "flex",
        alignItems:  "center",
        gap:         8,
        marginBottom: 10,
      }}>
        <h3
          className="font-heading"
          style={{
            fontWeight:    400,
            fontSize:      "clamp(17px, 1.8vw, 20px)",
            color:         "#CCD6F6",
            letterSpacing: "-0.01em",
            margin:        0,
          }}
        >
          {project.name}
        </h3>

        {/* Arrow — nudges diagonally on hover (Part 18) */}
        <span
          className="card-arrow"
          style={{
            color:      "#4A9EFF",
            fontSize:   14,
            lineHeight: 1,
            transition: "transform 0.2s ease",
            display:    "inline-block",
          }}
        >
          ↗
        </span>
      </div>

      {/* ── Description ───────────────────────────────────────────────── */}
      <p
        className="body-md"
        style={{ marginBottom: 16 }}
      >
        {project.description}
      </p>

      {/* ── Domain chips — pill style matching About tags ──────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.domains.map((domain) => (
          <span
            key={domain}
            className="project-chip"
            style={{
              fontFamily:   "'Inter', sans-serif",
              fontWeight:   600,
              color:        "#4A9EFF",
              background:   "rgba(74, 158, 255, 0.08)",
              borderRadius: 9999,
              whiteSpace:   "nowrap",
            }}
          >
            {domain}
          </span>
        ))}
      </div>
    </a>
  );
}
