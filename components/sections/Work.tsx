"use client";

/* ─── Work Section ───────────────────────────────────────────────────────────
   Structure only in this part (15).
   Content is added in:
   ✅ Part 15 — shell, header, placeholder
   ✅ Part 16 — AirAware card
   ✅ Part 17 — MindCare card
   ✅ Part 18 — hover effects across both cards

   Why a two-line section header?
   Brittany's work section has a small label above the main heading —
   "FEATURED PROJECTS" above "Things I've Built".
   We mirror this pattern: a muted uppercase label + a larger heading.
   It gives the section a clear visual entry point before the cards.

   Card layout decision — vertical stack not grid:
   Two cards side-by-side in a grid would make each card too narrow on
   most laptop screens. A vertical stack gives each card full width —
   more room for the description text and domain chips to breathe.

   v1.1 — "More systems" placeholder:
   Replaced plain <p> with Option B: left accent bar + faint blue wash.
   No icon, no text decoration. Just a clean directional signal.            */

import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard  } from "@/components/ui/ProjectCard";

/* ── Project data — locked ───────────────────────────────────────────────── */
export const PROJECTS = [
  {
    id:          "01",
    name:        "AirAware",
    type:        "Environmental Risk Analysis Framework",
    description:
      "Environmental respiratory risk intelligence integrating medical " +
      "imaging, environmental exposure analysis, and interpretable " +
      "healthcare reasoning.",
    domains:     ["Medical Imaging", "Environmental Health Analytics", "Risk Modeling"],
    status:      "In Development",
    githubUrl:   "https://github.com/ShivaliBajaj/airaware-lung-health-intelligence",
  },
  {
    id:          "02",
    name:        "MindCare",
    type:        "Clinical Language Intelligence System",
    description:
      "Clinical language intelligence system for suicidality detection, " +
      "escalation pattern analysis, and responsible healthcare AI " +
      "interpretation.",
    domains:     ["Medical NLP", "Clinical Language Processing", "Healthcare ML"],
    status:      "In Development",
    githubUrl:   "https://github.com/ShivaliBajaj/MindCare",
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="section-work"
    >
      {/* Sticky label */}
      <SectionLabel text="Work" />

      {/* ── Section header — two lines like Brittany ──────────────────────
          Small muted label sits above the main heading.
          marginBottom: 48 gives breathing room before the first card.    */}
      <div style={{ marginBottom: 48 }}>

        {/* Muted uppercase label — "FEATURED PROJECTS" equivalent */}
        <p
          className="work-subtitle"
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontWeight:    600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         "#8892B0",
            marginBottom:  8,
          }}
        >
          ML Systems for Clinical Problems
        </p>

      </div>

      {/* ── Cards stack ─────────────────────────────────────────────────── */}
      <div style={{
        display:       "flex",
        flexDirection: "column",
        gap:           4,
        marginBottom:  4,
      }}>
        {/* AirAware card */}
        <ProjectCard project={PROJECTS[0]} />

        {/* MindCare card */}
        <ProjectCard project={PROJECTS[1]} />
      </div>

      {/* ── "More systems" — Option B: left accent bar + faint blue wash ──
          No icon, no dash, no decorative prefix.
          The left bar is the only visual signal — quiet but directional.  */}
      <div style={{
        borderLeft:   "3px solid rgba(74,158,255,0.45)",
        background:   "rgba(74,158,255,0.04)",
        borderRadius: "0 4px 4px 0",
        padding:      "14px 14px 14px 16px",
        marginTop:    24,
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   13,
          fontWeight: 400,
          color:      "rgba(136,146,176,0.7)",
          margin:     0,
          letterSpacing: "0.01em",
        }}>
          More systems for clinical problems in development
        </p>
      </div>

    </section>
  );
}
