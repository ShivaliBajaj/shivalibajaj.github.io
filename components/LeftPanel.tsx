"use client";
import React from "react";

/* ─── LeftPanel ──────────────────────────────────────────────────────────────
   ✅ Part 7  — structure, hooks, config
   ✅ Part 8  — name, title, tagline
   ✅ Part 9  — nav with animated lines
   ✅ Part 10 — social icons
   ✅ Part 11 — refined IntersectionObserver active tracking                 */

import { useActiveSection } from "@/hooks/useActiveSection";
import MobileNav            from "@/components/MobileNav";

/* ── Config ──────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "About",       id: "about"      },
  { label: "Work",        id: "work"        },
  { label: "How I Think", id: "how-i-think" },
  { label: "Contact",     id: "contact"     },
];

const SOCIAL_LINKS = [
  {
    label: "Gmail",
    /* Opens Gmail compose in browser — recruiters prefer web over mail apps */
    href:  "https://mail.google.com/mail/?view=cm&to=reachshivalibajaj@gmail.com&su=Hello%20Shivali",
    title: "Email via Gmail",
  },
  { label: "GitHub",   href: "https://github.com/shivalibajaj",           title: "GitHub"  },
  { label: "LinkedIn", href: "https://linkedin.com/in/reachshivalibajaj", title: "LinkedIn"},
];

/* ── SVG Icons ───────────────────────────────────────────────────────────── */
const GmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ICONS: Record<string, React.ReactNode> = {
  Gmail:    <GmailIcon />,
  GitHub:   <GitHubIcon />,
  LinkedIn: <LinkedInIcon />,
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ── NavItem ─────────────────────────────────────────────────────────────── */
function NavItem({ label, id, active }: { label: string; id: string; active: boolean }) {
  return (
    <li>
      <button
        onClick={() => scrollToSection(id)}
        aria-current={active ? "page" : undefined}
        style={{
          background: "none", border: "none", cursor: "pointer",
          padding: "6px 0", width: "100%", textAlign: "left",
          display: "flex", alignItems: "center", gap: 16,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: active ? "#CCD6F6" : "#8892B0",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = "#CCD6F6";
          const ln = e.currentTarget.querySelector<HTMLSpanElement>(".nav-line");
          if (ln) { ln.style.width = "56px"; ln.style.background = "#CCD6F6"; }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = active ? "#CCD6F6" : "#8892B0";
          const ln = e.currentTarget.querySelector<HTMLSpanElement>(".nav-line");
          if (ln) {
            ln.style.width      = active ? "56px" : "28px";
            ln.style.background = active ? "#4A9EFF" : "#8892B0";
          }
        }}
      >
        <span className="nav-line" style={{
          display: "inline-block", height: "1px", flexShrink: 0,
          width:      active ? "56px" : "28px",
          background: active ? "#4A9EFF" : "#8892B0",
          transition: "width 0.25s ease, background 0.25s ease",
        }} />
        {label}
      </button>
    </li>
  );
}

/* ── SocialIcon ──────────────────────────────────────────────────────────── */
function SocialIcon({ label, href, title }: { label: string; href: string; title: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={title} title={title}
      style={{
        color: "#8892B0", display: "flex", alignItems: "center",
        textDecoration: "none",
        transition: "color 0.2s ease, transform 0.2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color     = "#CCD6F6";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color     = "#8892B0";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {ICONS[label]}
    </a>
  );
}

/* ─── LeftPanel — complete ───────────────────────────────────────────────── */
export default function LeftPanel() {
  const activeId = useActiveSection();

  return (
    <aside className="panel-left">
      <div>
        <h1 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700,
          color: "#CCD6F6", letterSpacing: "-0.02em",
          lineHeight: 1.1, marginBottom: 12,
        }}>
          Shivali Bajaj
        </h1>

        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(14px, 1.4vw, 18px)", fontWeight: 500,
          color: "#CCD6F6", letterSpacing: "-0.01em",
          lineHeight: 1.4, marginBottom: 16,
        }}>
          Medical Data Scientist
        </h2>

        <p
          className="panel-tagline font-body"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize:   14,
            fontWeight: 400,
            color:      "#8892B0",
            lineHeight: 1.75,
          }}
        >
          I build clinically aware intelligence systems with a focus on
          interpretability and responsible engineering.
        </p>

        {/* Mobile hamburger — only visible on mobile via .mobile-nav CSS class.
            Renders here in the DOM but display:none on tablet/desktop.      */}
        <MobileNav />

        {/* Nav — hidden on mobile via .nav-desktop, shown on tablet/desktop */}
        <nav aria-label="Main navigation" className="nav-desktop">
          <ul style={{
            listStyle: "none", margin: 0, padding: 0,
            display: "flex", flexDirection: "column", gap: 2,
          }}>
            {NAV_ITEMS.map(({ label, id }) => (
              <NavItem key={id} label={label} id={id} active={activeId === id} />
            ))}
          </ul>
        </nav>
      </div>

      <div className="panel-social">
        {SOCIAL_LINKS.map(({ label, href, title }) => (
          <SocialIcon key={label} label={label} href={href} title={title} />
        ))}
      </div>
    </aside>
  );
}
