"use client";

/* ─── Tech Stack Section ─────────────────────────────────────────────────────
   Five categories — Languages, ML & AI, Healthcare, Data & Viz, Infrastructure.
   Each category: uppercase label + pill chips (same style as About domain tags).

   paddingBottom: 100
   ───────────────────
   Matches About's bottom padding — consistent breathing room between sections
   so the IntersectionObserver switches nav state at the right moment.        */

import { SectionLabel } from "@/components/ui/SectionLabel";

/* ── Tool categories ──────────────────────────────────────────────────────────
   Static data outside the component — no re-creation on every render.       */
const STACK = [
  {
    category: "Languages",
    tools:    ["Python", "R", "SQL", "Scala"],
  },
  {
    category: "ML & AI",
    tools:    ["scikit-learn", "PyTorch", "TensorFlow"],
  },
  {
    category: "Healthcare",
    tools:    ["Medical NLP", "Clinical NER", "EHR", "HL7 / FHIR"],
  },
  {
    category: "Data & Visualization",
    tools:    ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI"],
  },
  {
    category: "Infrastructure",
    tools:    ["Git", "GitHub Actions", "Docker", "Jupyter"],
  },
];

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      style={{ paddingBottom: 100 }}
    >
      <SectionLabel text="Tech Stack" />

      <p
        style={{
          fontFamily:   "'Inter', sans-serif",
          fontSize:     15,
          fontWeight:   400,
          color:        "#8892B0",
          lineHeight:   1.85,
          marginBottom: 40,
        }}
      >
        Tools and frameworks I work with across the full pipeline — from
        raw clinical data to interpretable model outputs.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {STACK.map(({ category, tools }) => (
          <div key={category}>
            <p
              style={{
                fontFamily:    "'Inter', sans-serif",
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         "rgba(136, 146, 176, 0.6)",
                margin:        0,
                marginBottom:  10,
              }}
            >
              {category}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily:    "'Inter', sans-serif",
                    fontSize:      12,
                    fontWeight:    600,
                    letterSpacing: "0.04em",
                    color:         "#4A9EFF",
                    border:        "1px solid rgba(74, 158, 255, 0.25)",
                    background:    "rgba(74, 158, 255, 0.07)",
                    borderRadius:  9999,
                    padding:       "5px 14px",
                    whiteSpace:    "nowrap",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
