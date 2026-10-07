/* ─── Work Section ───────────────────────────────────────────────────────────
   Presents the two named projects + a placeholder.
   Terminology is locked — clinical/research framing, no startup language.   */

/* Project data — content locked */
const PROJECTS = [
  {
    name:        "AirAware",
    type:        "Environmental Risk Analysis Framework",
    description:
      "Environmental respiratory risk intelligence integrating medical imaging, " +
      "environmental exposure analysis, and interpretable healthcare reasoning.",
    domains:     ["Medical Imaging", "Environmental Health Analytics", "Risk Modeling"],
    status:      "In Development",
    /* Replace with your actual GitHub URL when ready */
    githubUrl:   "https://github.com/shivalibajaj/airaware",
  },
  {
    name:        "MindCare",
    type:        "Clinical Language Intelligence System",
    description:
      "Clinical language intelligence system for suicidality detection, escalation " +
      "pattern analysis, and responsible healthcare AI interpretation.",
    domains:     ["Medical NLP", "Clinical Language Processing", "Healthcare ML"],
    status:      "In Development",
    /* Replace with your actual GitHub URL when ready */
    githubUrl:   "https://github.com/shivalibajaj/mindcare",
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="max-w-5xl mx-auto px-6 py-28"
    >
      {/* ── Section heading ───────────────────────────────────────────────── */}
      <div className="mb-16">
        <p
          className="font-body text-xs tracking-widest uppercase mb-3"
          style={{ color: "#4A9EFF" }}
        >
          Work
        </p>
        <h2
          className="font-heading font-light text-2xl md:text-3xl"
          style={{ color: "#E8EDF4" }}
        >
          Systems &amp; Analytical Pipelines
        </h2>
      </div>

      {/* ── Project cards ─────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className="flex flex-col p-8 rounded-sm border"
            style={{
              backgroundColor: "#00005A",
              borderColor: "#0A0A6A",
            }}
          >
            {/* Project type label */}
            <p
              className="font-body text-xs tracking-widest uppercase mb-4"
              style={{ color: "#4A9EFF" }}
            >
              {project.type}
            </p>

            {/* Project name */}
            <h3
              className="font-heading font-light text-xl mb-4"
              style={{ color: "#E8EDF4" }}
            >
              {project.name}
            </h3>

            {/* Description */}
            <p
              className="font-body text-sm font-light leading-relaxed mb-6 flex-grow"
              style={{ color: "#B8C2D1" }}
            >
              {project.description}
            </p>

            {/* Domain tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.domains.map((d) => (
                <span
                  key={d}
                  className="font-body text-xs px-2 py-1 rounded-sm border"
                  style={{ color: "#B8C2D1", borderColor: "#1A3A6A", backgroundColor: "#00003C" }}
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Footer: status + GitHub link */}
            <div className="flex items-center justify-between">
              <span
                className="font-body text-xs tracking-wide"
                style={{ color: "#B8C2D1" }}
              >
                ◎ {project.status}
              </span>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs font-medium tracking-wide transition-colors duration-200"
                style={{ color: "#4A9EFF" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Repository →
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* ── Placeholder card ──────────────────────────────────────────────── */}
      <div
        className="p-8 rounded-sm border text-center"
        style={{ borderColor: "#0A0A6A", borderStyle: "dashed" }}
      >
        <p
          className="font-body text-sm font-light tracking-wide"
          style={{ color: "#B8C2D1" }}
        >
          More systems in development.
        </p>
      </div>
    </section>
  );
}
