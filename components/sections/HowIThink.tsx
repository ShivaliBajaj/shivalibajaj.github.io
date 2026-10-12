"use client";

/* ─── How I Think Section ────────────────────────────────────────────────────
   Structure + intro in this part (19).
   Content added in:
   ✅ Part 19 — shell, intro paragraph
   ⏳ Part 20 — principles 01–05
   ⏳ Part 21 — principles 06–10 + hover rows

   This section is the key differentiator of Shivali's portfolio.
   No other Medical Data Scientist portfolio has a "How I Think" section
   with ten named working principles — it reads like a clinical philosophy,
   not a skills list.

   Layout decision — vertical rows not a grid:
   Brittany's experience items are vertical rows with a date column left
   and content right. We mirror this exactly:
   - Left  : principle number (faint, decorative)
   - Right : principle title + detail paragraph

   Why <section> not <article>?
   <section> groups thematically related content (all principles together).
   <article> is for standalone content (a blog post, a project card).
   The 10 principles are related — they belong in one <section>.           */

import { SectionLabel } from "@/components/ui/SectionLabel";
import { PrincipleRow } from "@/components/ui/PrincipleRow";

/* ── Locked principles 01–05 ─────────────────────────────────────────────── */
const PRINCIPLES_01_05 = [
  {
    num:    1,
    title:  "Healthcare context matters as much as model performance.",
    detail: "A metric without clinical context is incomplete. Understanding the domain is inseparable from building useful systems.",
  },
  {
    num:    2,
    title:  "False positives and false negatives carry real-world consequences.",
    detail: "In healthcare, errors have patient impact. Every threshold decision is a clinical decision.",
  },
  {
    num:    3,
    title:  "Interpretability improves trust in healthcare systems.",
    detail: "A system that cannot explain its reasoning cannot be safely adopted. Explainability is not optional.",
  },
  {
    num:    4,
    title:  "Documentation is part of responsible engineering.",
    detail: "If it isn't documented, it isn't done. Reproducible work requires clear records of decisions, assumptions, and limitations.",
  },
  {
    num:    5,
    title:  "Limitations should be stated clearly, not hidden.",
    detail: "Honest documentation of what a system cannot do is as important as describing what it can.",
  },
];

/* ── Locked principles 06–10 ─────────────────────────────────────────────── */
const PRINCIPLES_06_10 = [
  {
    num:    6,
    title:  "Healthcare AI should assist reasoning, not replace it.",
    detail: "Clinical intelligence systems are tools for augmentation. The goal is to support thoughtful human decision-making.",
  },
  {
    num:    7,
    title:  "Careful analysis is more valuable than unnecessary complexity.",
    detail: "A well-understood, well-validated simpler system often outperforms an overengineered one with unclear failure modes.",
  },
  {
    num:    8,
    title:  "Good systems explain themselves clearly.",
    detail: "Output that cannot be communicated to a clinical stakeholder is output that cannot be trusted.",
  },
  {
    num:    9,
    title:  "Research and engineering are strongest when they remain reproducible.",
    detail: "Reproducibility is the standard. Results that cannot be independently verified have limited practical value.",
  },
  {
    num:    10,
    title:  "Trust is earned through transparency, not confidence.",
    detail: "Transparent methodology — including failures — is how trust is built over time.",
  },
];

export default function HowIThink() {
  return (
    <section
      id="how-i-think"
      className="section-how-i-think"
    >
      {/* Sticky label */}
      <SectionLabel text="How I Think" />

      {/* ── Intro paragraph ───────────────────────────────────────────────
          One sentence that frames what follows.
          Kept short deliberately — the principles speak for themselves.

          maxWidth: 480
          ──────────────
          Slightly narrower than About paragraphs (520px).
          The intro is a single sentence so a tighter column looks
          more intentional — not a paragraph that ran short.              */}
      <p
        className="principle-intro"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   15,
          fontWeight: 400,
          color:      "#8892B0",
          lineHeight: 1.85,
        }}
      >
        The ideas that guide how I approach healthcare data problems,
        model development, and engineering decisions.
      </p>

      {/* ── Principles list — Parts 20 and 21 render here ────────────────
          Outer div with flexDirection:column + gap:4 mirrors the
          Work section card stack — consistent vertical rhythm.            */}
      <div style={{
        display:       "flex",
        flexDirection: "column",
        gap:           4,
      }}>
        {/* Principles 01–05 ✅ */}
        {PRINCIPLES_01_05.map(p => (
          <PrincipleRow key={p.num} {...p} />
        ))}

        {/* Principles 06–10 ✅ */}
        {PRINCIPLES_06_10.map(p => (
          <PrincipleRow key={p.num} {...p} />
        ))}
      </div>

    </section>
  );
}
