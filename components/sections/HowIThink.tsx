/* ─── How I Think Section ────────────────────────────────────────────────────
   Ten locked working principles. This is the key differentiator section.
   Presented as a clean, readable list — no numbering (order isn't the point),
   letting each principle stand on its own.                                   */

/* Ten principles — content locked, do not reorder or paraphrase */
const PRINCIPLES = [
  {
    title:  "Healthcare context matters as much as model performance.",
    detail: "A metric without clinical context is incomplete. Understanding the domain is inseparable from building useful systems.",
  },
  {
    title:  "False positives and false negatives carry real-world consequences.",
    detail: "In healthcare, errors have patient impact. Every threshold decision is a clinical decision.",
  },
  {
    title:  "Interpretability improves trust in healthcare systems.",
    detail: "A system that cannot explain its reasoning cannot be safely adopted. Explainability is not optional.",
  },
  {
    title:  "Documentation is part of responsible engineering.",
    detail: "If it isn't documented, it isn't done. Reproducible work requires clear records of decisions, assumptions, and limitations.",
  },
  {
    title:  "Limitations should be stated clearly, not hidden.",
    detail: "Honest documentation of what a system cannot do is as important as describing what it can.",
  },
  {
    title:  "Healthcare AI should assist reasoning, not replace it.",
    detail: "Clinical intelligence systems are tools for augmentation. The goal is to support thoughtful human decision-making.",
  },
  {
    title:  "Careful analysis is more valuable than unnecessary complexity.",
    detail: "A well-understood, well-validated simpler system often outperforms an overengineered one with unclear failure modes.",
  },
  {
    title:  "Good systems explain themselves clearly.",
    detail: "Output that cannot be communicated to a clinical stakeholder is output that cannot be trusted.",
  },
  {
    title:  "Research and engineering are strongest when they remain reproducible.",
    detail: "Reproducibility is the standard. Results that cannot be independently verified have limited practical value.",
  },
  {
    title:  "Trust is earned through transparency, not confidence.",
    detail: "Confidence without evidence is noise. Transparent methodology — including failures — is how trust is built over time.",
  },
];

export default function HowIThink() {
  return (
    <section
      id="how-i-think"
      className="max-w-5xl mx-auto px-6 py-28"
    >
      {/* ── Section heading ───────────────────────────────────────────────── */}
      <div className="mb-16">
        <p
          className="font-body text-xs tracking-widest uppercase mb-3"
          style={{ color: "#4A9EFF" }}
        >
          How I Think
        </p>
        <h2
          className="font-heading font-light text-2xl md:text-3xl"
          style={{ color: "#E8EDF4" }}
        >
          Working Principles
        </h2>
        <p
          className="font-body text-sm font-light mt-4"
          style={{ color: "#B8C2D1", maxWidth: "540px" }}
        >
          These are the ideas that guide how I approach healthcare data problems,
          model development, and engineering decisions.
        </p>
      </div>

      {/* ── Principles grid ───────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: "#0A0A6A" }}>
        {PRINCIPLES.map((principle, index) => (
          <div
            key={index}
            className="p-8"
            style={{ backgroundColor: "#00003C" }}
          >
            {/* Principle title */}
            <p
              className="font-heading font-light text-base leading-snug mb-3"
              style={{ color: "#E8EDF4" }}
            >
              {principle.title}
            </p>

            {/* Supporting detail */}
            <p
              className="font-body text-sm font-light leading-relaxed"
              style={{ color: "#B8C2D1" }}
            >
              {principle.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
