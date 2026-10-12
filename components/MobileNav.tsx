"use client";

import { useState, useEffect } from "react";
import { createPortal }        from "react-dom";

/* Nav items — single source of truth */
const NAV_ITEMS = [
  { label: "About",       id: "about"      },
  { label: "Work",        id: "work"        },
  { label: "How I Think", id: "how-i-think" },
  { label: "Contact",     id: "contact"     },
];

export default function MobileNav() {
  const [isOpen,  setIsOpen]  = useState(false);
  const [mounted, setMounted] = useState(false);

  /* createPortal needs DOM — wait for mount */
  useEffect(() => { setMounted(true); }, []);

  const close  = () => setIsOpen(false);
  const toggle = () => setIsOpen(p => !p);

  /* Smooth scroll then close */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    close();
  };

  /* Auto-close on scroll */
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [isOpen]);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <div className="mobile-nav">

      {/* ── Hamburger ── */}
      <button
        onClick={toggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        style={{
          background: "none", border: "none", cursor: "pointer",
          padding: "8px 4px", display: "flex",
          flexDirection: "column", gap: "6px", marginLeft: "auto",
        }}
      >
        <span style={{ display:"block", width:24, height:1, backgroundColor:"#8892B0", transition:"transform 0.3s ease", transformOrigin:"center", transform: isOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
        <span style={{ display:"block", width:24, height:1, backgroundColor:"#8892B0", transition:"opacity 0.3s ease", opacity: isOpen ? 0 : 1 }} />
        <span style={{ display:"block", width:24, height:1, backgroundColor:"#8892B0", transition:"transform 0.3s ease", transformOrigin:"center", transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
      </button>

      {/* ── Dropdown via portal → escapes panel-left stacking context ── */}
      {mounted && isOpen && createPortal(
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,60,0.98)",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "0 32px",
          }}
        >
          {/* Nav links */}
          <nav>
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:8 }}>
              {NAV_ITEMS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={e => { e.stopPropagation(); scrollTo(id); }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      padding: "12px 0", width: "100%", textAlign: "left",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(28px, 8vw, 40px)", fontWeight: 300,
                      letterSpacing: "-0.02em", color: "#CCD6F6",
                      transition: "color 0.15s ease",
                      minHeight: 48, display: "flex", alignItems: "center",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#4A9EFF")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#CCD6F6")}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links at bottom */}
          <div
            style={{ position:"absolute", bottom:48, left:32, display:"flex", gap:20 }}
            onClick={e => e.stopPropagation()}
          >
            {[
              { label:"Gmail",    href:"https://mail.google.com/mail/?view=cm&to=reachshivalibajaj@gmail.com&su=Reaching%20out%20after%20viewing%20your%20portfolio" },
              { label:"GitHub",   href:"https://github.com/shivalibajaj"            },
              { label:"LinkedIn", href:"https://linkedin.com/in/reachshivalibajaj"  },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#8892B0", textDecoration:"none", transition:"color 0.15s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#CCD6F6")}
                onMouseLeave={e => (e.currentTarget.style.color = "#8892B0")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
