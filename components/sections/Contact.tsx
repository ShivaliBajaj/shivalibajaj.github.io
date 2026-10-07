/* ─── Contact Section ────────────────────────────────────────────────────────
   Clean, minimal contact block. No forms — just direct links.               */

export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 py-28"
    >
      {/* Thin divider line above */}
      <div className="mb-16 h-px" style={{ backgroundColor: "#0A0A6A" }} />

      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* ── Left: Heading + context ───────────────────────────────────── */}
        <div>
          <p
            className="font-body text-xs tracking-widest uppercase mb-3"
            style={{ color: "#4A9EFF" }}
          >
            Contact
          </p>
          <h2
            className="font-heading font-light text-2xl md:text-3xl mb-6"
            style={{ color: "#E8EDF4" }}
          >
            Let&apos;s work together.
          </h2>
          <p
            className="font-body text-sm font-light leading-relaxed"
            style={{ color: "#B8C2D1", maxWidth: "400px" }}
          >
            Open to collaborations on healthcare AI research, clinical data
            science projects, and responsible ML system development. Reach out
            through any of the channels below.
          </p>
        </div>

        {/* ── Right: Contact links ──────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {[
            {
              label: "Email",
              value: "shivalibajaj@example.com",   /* ← update with real email */
              href:  "mailto:shivalibajaj@example.com",
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/shivalibajaj",
              href:  "https://linkedin.com/in/shivalibajaj",
            },
            {
              label: "GitHub",
              value: "github.com/shivalibajaj",
              href:  "https://github.com/shivalibajaj",
            },
          ].map(({ label, value, href }) => (
            <div key={label}>
              <p
                className="font-body text-xs tracking-widest uppercase mb-1"
                style={{ color: "#B8C2D1" }}
              >
                {label}
              </p>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-body text-sm font-light transition-colors duration-200"
                style={{ color: "#4A9EFF" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {value}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer line ───────────────────────────────────────────────────── */}
      <div className="mt-24 pt-8 border-t flex flex-col md:flex-row justify-between gap-2"
        style={{ borderColor: "#0A0A6A" }}
      >
        <p className="font-body text-xs font-light" style={{ color: "#B8C2D1" }}>
          Shivali Bajaj — Medical Data Scientist — India
        </p>
        <p className="font-body text-xs font-light" style={{ color: "#B8C2D1" }}>
          {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
