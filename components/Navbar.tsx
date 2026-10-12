"use client";

import { useState, useEffect } from "react";

/* ─── Navbar links — locked as specified ────────────────────────────────────*/
const NAV_LINKS = [
  { label: "About",       href: "#about"      },
  { label: "Work",        href: "#work"        },
  { label: "How I Think", href: "#how-i-think" },
  { label: "GitHub",      href: "https://github.com/shivalibajaj", external: true },
  { label: "LinkedIn",    href: "https://linkedin.com/in/shivalibajaj", external: true },
  { label: "Contact",     href: "#contact"     },
];

export default function Navbar() {
  // Adds a subtle background when user scrolls down
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${scrolled ? "py-3 border-b" : "py-5"}`}
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 60, 0.92)" : "transparent",
        borderColor: "#0A0A6A",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between">

        {/* Identity wordmark — clicking scrolls to top */}
        <a
          href="#"
          className="font-heading text-sm font-light tracking-wide"
          style={{ color: "#B8C2D1" }}
        >
          SB
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-body text-sm font-light tracking-wide transition-colors duration-200"
                style={{ color: "#B8C2D1" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4A9EFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#B8C2D1")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="block w-5 h-px" style={{ backgroundColor: "#B8C2D1" }} />
          <span className="block w-5 h-px" style={{ backgroundColor: "#B8C2D1" }} />
          <span className="block w-3 h-px" style={{ backgroundColor: "#B8C2D1" }} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ backgroundColor: "rgba(0, 0, 60, 0.96)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="font-body text-sm font-light"
              style={{ color: "#B8C2D1" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
