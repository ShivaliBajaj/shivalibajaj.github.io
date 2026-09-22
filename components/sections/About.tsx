"use client";

/* ─── About Section ──────────────────────────────────────────────────────────
   Structure only in this part (12).
   Content is added in:
   ✅ Part 12 — shell + SectionLabel
   ⏳ Part 13 — hero statement + bio paragraphs
   ⏳ Part 14 — domain tag pills

   Why is About a <section> not a <div>?
   HTML5 landmark elements help screen readers navigate the page.
   <section id="about"> means assistive technology announces
   "About section" as the user jumps between landmarks.

   paddingBottom: 100
   ───────────────────
   Generous bottom padding separates sections visually.
   Without it the next section's sticky label appears too soon
   and the IntersectionObserver switches active nav too early.            */

import { SectionLabel } from "@/components/ui/SectionLabel";

/* ── Locked domain tags ───────────────────────────────────────────────────── */
const DOMAINS = [
  "Medical Data Science",
  "Clinical Language Intelligence",
  "Medical NLP",
  "Medical Imaging & Computer Vision",
  "Environmental Health Analytics",
];

export default function About() {
  return (
    <section
      id="about"
      className="section-about"
    >
      {/* Sticky label — always visible while scrolling through About */}
      <SectionLabel text="About" />

      {/* ── Part 13: Hero statement ───────────────────────────────────────
          The locked hero statement. Key phrases are italicised in accent
          blue — same technique Brittany uses for emphasis in her about.

          font-family: Merriweather
          ──────────────────────────
          Only the hero heading uses Merriweather — everything else is
          Inter. This gives About a distinct editorial feel that separates
          it visually from the rest of the right panel content.

          clamp(20px, 2.2vw, 28px)
          ─────────────────────────
          Scales smoothly between mobile (20px) and desktop (28px).
          At 2.2vw it's proportional to viewport width in between —
          no media queries needed, no abrupt size jumps.

          maxWidth: 520
          ──────────────
          Caps line length at ~75 characters — the typographic sweet spot
          for reading comfort. Beyond this, eyes have to travel too far
          across each line and reading slows down.                        */}
      <h2
        className="font-heading about-heading"
        style={{
          fontWeight:    300,
          fontSize:      "clamp(20px, 2.2vw, 28px)",
          lineHeight:    1.5,
          color:         "#CCD6F6",
          letterSpacing: "-0.01em",
          marginBottom:  24,
        }}
      >
        Building clinically aware{" "}
        <em style={{ color: "#4A9EFF", fontStyle: "italic" }}>
          intelligence systems
        </em>{" "}
        across healthcare NLP, Computer Vision, and applied machine
        learning — with a focus on{" "}
        <em style={{ color: "#4A9EFF", fontStyle: "italic" }}>
          interpretability
        </em>
        , careful analysis, and responsible engineering.
      </h2>

      {/* ── Bio paragraph 1 ──────────────────────────────────────────────
          Background context — where she comes from professionally.

          fontSize 15 + lineHeight 1.85
          ───────────────────────────────
          Slightly larger than body default (14px) for long-form reading.
          1.85 line height gives generous breathing room between lines —
          Brittany uses similar spacing in her about paragraphs.

          maxWidth: 520
          ──────────────
          Matches the hero heading width — visual alignment down the left
          edge creates a clean reading column.                            */}
      <p
        className="about-bio"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   15,
          fontWeight: 400,
          color:      "#8892B0",
          lineHeight: 1.85,
          marginBottom: 16,
        }}
      >
        Background in SQL, Power BI, and healthcare analytics — working
        across healthcare and mortgage domains. I care about building
        systems that are transparent, reproducible, and clinically grounded.
      </p>

      {/* ── Bio paragraph 2 ──────────────────────────────────────────────
          Current focus — where she's headed.
          Slightly more future-facing tone than paragraph 1.
          Same styling keeps visual consistency between the two.          */}
      <p
        className="about-bio"
        style={{
          fontFamily:   "'Inter', sans-serif",
          fontSize:     15,
          fontWeight:   400,
          color:        "#8892B0",
          lineHeight:   1.85,
          marginBottom: 48,
        }}
      >
        Currently building hands-on analytical pipelines in medical
        imaging and clinical language processing — exploring how machine
        learning can support, rather than replace, thoughtful clinical
        reasoning.
      </p>

      {/* ── Part 14: Domain tag pills ─────────────────────────────────────
          Five locked domain tags — pill style matching Brittany's
          tech stack chips on her experience and project items.

          Why pills (border-radius: 9999px) not squares?
          Pills feel lighter and more modern than rectangular badges.
          Brittany uses fully rounded pills for her tech chips — we match
          that exactly, just with our accent blue instead of her teal.

          Why outline style (border + transparent bg) not solid fills?
          Solid coloured badges compete with the accent blue text and
          links elsewhere. Outline pills let the label breathe without
          adding visual weight to the page.

          flex-wrap: wrap
          ────────────────
          On narrow screens (tablet/mobile) the tags wrap to the next
          line naturally — no overflow, no horizontal scroll, no JS needed.

          gap: 8px
          ─────────
          Consistent spacing between pills in all directions — both
          horizontal (between pills in a row) and vertical (between rows
          when they wrap on smaller screens).                             */}
      <div className="about-tags">
        {DOMAINS.map((domain) => (
          <span
            key={domain}
            style={{
              /* Type */
              fontFamily:    "'Inter', sans-serif",
              fontSize:      12,
              fontWeight:    600,
              letterSpacing: "0.04em",
              color:         "#4A9EFF",

              /* Pill shape */
              border:       "1px solid rgba(74, 158, 255, 0.25)",
              background:   "rgba(74, 158, 255, 0.07)",
              borderRadius: 9999,
              padding:      "5px 14px",

              /* Prevent individual pills from wrapping internally */
              whiteSpace:   "nowrap",
            }}
          >
            {domain}
          </span>
        ))}
      </div>
    </section>
  );
}
