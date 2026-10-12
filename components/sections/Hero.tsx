/* ─── Hero Section ───────────────────────────────────────────────────────────
   Identity line + locked hero statement + core domain tags.
   All copy is locked — do not modify without explicit instruction.          */

/* Core domains Shivali operates in */
const DOMAINS = [
  "Medical Data Science",
  "Clinical Language Intelligence",
  "Medical NLP",
  "Medical Imaging & Computer Vision",
  "Environmental Health Analytics",
];

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto px-6 pt-32 pb-24"
    >
      {/* ── Identity line — locked ─────────────────────────────────────────── */}
      <p
        className="font-body text-xs tracking-widest uppercase mb-10"
        style={{ color: "#B8C2D1" }}
      >
        Shivali Bajaj&nbsp;/&nbsp;Medical Data Scientist&nbsp;/&nbsp;India
      </p>

      {/* ── Hero statement — locked ───────────────────────────────────────── */}
      <h1
        className="font-heading font-light text-3xl md:text-4xl lg:text-5xl leading-snug mb-10"
        style={{ color: "#E8EDF4", maxWidth: "780px" }}
      >
        Building clinically aware intelligence systems across{" "}
        <em style={{ color: "#4A9EFF", fontStyle: "italic" }}>
          healthcare NLP
        </em>
        ,{" "}
        <em style={{ color: "#4A9EFF", fontStyle: "italic" }}>
          Computer Vision
        </em>
        , and{" "}
        <em style={{ color: "#4A9EFF", fontStyle: "italic" }}>
          applied machine learning
        </em>
        , with a focus on interpretability, careful analysis, and responsible
        engineering.
      </h1>

      {/* ── Background note ───────────────────────────────────────────────── */}
      <p
        className="font-body text-base font-light leading-relaxed mb-12"
        style={{ color: "#B8C2D1", maxWidth: "620px" }}
      >
        Background in SQL, Power BI, and healthcare analytics — working across
        healthcare and mortgage domains. Currently building hands-on analytical
        pipelines in medical imaging and clinical language processing.
      </p>

      {/* ── Core domain tags ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {DOMAINS.map((domain) => (
          <span
            key={domain}
            className="font-body text-xs font-light tracking-wide px-3 py-1.5 rounded-sm border"
            style={{
              color: "#B8C2D1",
              borderColor: "#0A0A6A",
              backgroundColor: "#00005A",
            }}
          >
            {domain}
          </span>
        ))}
      </div>
    </section>
  );
}
