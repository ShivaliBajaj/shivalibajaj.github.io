"use client";
import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import CopyEmail        from "@/components/CopyEmail";

/* ─── Contact Section ────────────────────────────────────────────────────────
   Structure + heading + description in this part (22).
   Content added in:
   ✅ Part 22 — shell, heading, description
   ⏳ Part 23 — email, LinkedIn, GitHub link rows
   ⏳ Part 24 — locked footer

   Design decision — no contact form:
   Forms require a backend or a third-party service (Formspree, Netlify).
   GitHub Pages is purely static — no server.
   Direct links (email, LinkedIn) are simpler, faster, and more reliable.
   Brittany also uses direct links — no form.

   "Let's work together." — heading choice:
   Warmer than "Get in touch" or "Contact me".
   Signals openness to collaboration specifically — not just general enquiries.
   Short enough to work at large font sizes without wrapping on mobile.      */


/* FooterLink — reusable anchor for the locked footer (Part 24) */
export function FooterLink({
  href,
  children,
}: {
  href:     string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#4A9EFF", textDecoration: "none" }}
      onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
      onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
    >
      {children}
    </a>
  );
}

/* ── Contact links config ─────────────────────────────────────────────────── */
const LINKS = [
  {
    label: "Email",
    value: "reachshivalibajaj@gmail.com",
    href:  "mailto:reachshivalibajaj@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/reachshivalibajaj",
    href:  "https://linkedin.com/in/reachshivalibajaj",
  },
  {
    label: "GitHub",
    value: "github.com/shivalibajaj",
    href:  "https://github.com/shivalibajaj",
  },
];

/* ── ContactRow ──────────────────────────────────────────────────────────────
   Each link renders as a full-width hoverable row.
   Same hover pattern as ProjectCard and PrincipleRow — consistent feel.

   Two-column layout inside the row:
   Left  : uppercase label (Email / LinkedIn / GitHub) — muted, small
   Right : the actual value + arrow — bright, readable

   Why the whole row is the link (not just the value text)?
   Larger click/tap target — especially important on mobile where
   precise tapping is harder. Brittany uses the same full-row pattern
   on her experience items.                                                  */
function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href:  string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="contact-row"
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            20,
        borderRadius:   8,
        border:         "1px solid transparent",
        textDecoration: "none",
        transition:     "background 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = "rgba(148, 163, 184, 0.06)";
        e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.18)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = "transparent";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      {/* Label — uppercase, muted, fixed width so values align */}
      <span style={{
        fontFamily:    "'Inter', sans-serif",
        fontSize:      10,
        fontWeight:    700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color:         "#8892B0",
        minWidth:      72,
        flexShrink:    0,
      }}>
        {label}
      </span>

      {/* Value + arrow */}
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize:   14,
        fontWeight: 400,
        color:      "#CCD6F6",
        display:    "flex",
        alignItems: "center",
        gap:        6,
      }}>
        {value}
        <span style={{ color: "#4A9EFF", fontSize: 13 }}>↗</span>
      </span>
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-contact"
    >
      {/* Sticky label */}
      <SectionLabel text="Contact" />

      {/* ── Heading ───────────────────────────────────────────────────────
          clamp(24px, 3vw, 36px) — scales from mobile to desktop.
          font-heading (Merriweather) — matches the About hero statement,
          creating visual bookends: the portfolio opens and closes with
          the same serif typeface.

          fontWeight: 300
          ───────────────
          Light weight on a large heading reads as calm confidence —
          not shouting. Brittany uses the same approach on her headings.  */}
      <h2
        className="font-heading contact-heading"
        style={{
          fontWeight:    300,
          fontSize:      "clamp(24px, 3vw, 36px)",
          color:         "#CCD6F6",
          letterSpacing: "-0.01em",
          lineHeight:    1.25,
          marginBottom:  16,
        }}
      >
        Let&apos;s work together.
      </h2>

      {/* ── Description ───────────────────────────────────────────────────
          Three specific areas — not a generic "reach out anytime".
          Specificity signals that Shivali knows what she wants to work on
          and filters for the right kind of collaboration.

          maxWidth: 440
          ──────────────
          Narrower than About paragraphs (520px) — Contact descriptions
          are meant to be glanced at, not read at length. Tighter column
          = faster to read.                                               */}
      <p
        className="contact-description"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize:   15,
          fontWeight: 400,
          color:      "#8892B0",
          lineHeight: 1.85,
        }}
      >
        Open to collaborations on healthcare AI research, clinical data
        science projects, and responsible ML system development.
      </p>

      {/* ── Link rows ✅ ──────────────────────────────────────────────────
          marginBottom:48 separates the rows from the footer below.      */}
      <div style={{ marginBottom: 48 }}>
        {/* Email row — uses CopyEmail for clipboard copy + toast */}
        <div
          className="contact-row"
          style={{
            display:     "flex",
            alignItems:  "center",
            gap:         20,
            borderRadius: 8,
            border:      "1px solid transparent",
          }}
        >
          <span style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      10,
            fontWeight:    700,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            color:         "#8892B0",
            minWidth:      72,
            flexShrink:    0,
          }}>
            Email
          </span>
          <CopyEmail />
        </div>

        {/* LinkedIn + GitHub — standard link rows */}
        {LINKS.filter(l => l.label !== "Email").map(({ label, value, href }) => (
          <ContactRow key={label} label={label} value={value} href={href} />
        ))}
      </div>

      {/* ── Locked footer ─────────────────────────────────────────────────
          This text is locked — do not change without explicit instruction.

          Full locked text:
          "Coded in Visual Studio Code by yours truly. Built with Next.js,
          Tailwind CSS & TypeScript, version-controlled and deployed with
          GitHub Pages. Built at the intersection of biology and bytes.
          With every model, a patient in mind."

          Design decisions:
          - Thin top border separates footer from contact rows visually
          - fontSize:12 — smallest text on the page, deliberately quiet
          - maxWidth:500 — keeps the long sentence from stretching too wide
          - FooterLink component handles hover underline on linked words    */}
      <div style={{
        paddingTop: 28,
        borderTop:  "1px solid rgba(74, 158, 255, 0.08)",
      }}>
        <p
          className="contact-footer"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   12,
            fontWeight: 400,
            color:      "#8892B0",
            lineHeight: 1.9,
            margin:     0,
          }}
        >
          Coded in{" "}
          <FooterLink href="https://code.visualstudio.com/">
            Visual Studio Code
          </FooterLink>
          {" "}by yours truly. Built with{" "}
          <FooterLink href="https://nextjs.org/">
            Next.js
          </FooterLink>
          ,{" "}
          <FooterLink href="https://tailwindcss.com/">
            Tailwind CSS
          </FooterLink>
          {" "}&amp;{" "}
          <FooterLink href="https://www.typescriptlang.org/">
            TypeScript
          </FooterLink>
          , version-controlled and deployed with{" "}
          <FooterLink href="https://pages.github.com/">
            GitHub Pages
          </FooterLink>
          . Built at the intersection of biology and bytes. With every
          model, a patient in mind.
        </p>
      </div>

    </section>
  );
}
