"use client";

/* ─── MobileNav ──────────────────────────────────────────────────────────────
   Mobile-only navigation. Invisible on tablet/desktop via CSS.
   Renders:
   ✅ 26a — shell + open/closed state
   ⏳ 26b — hamburger button (3 lines → X animation)
   ⏳ 26c — dropdown overlay
   ⏳ 26d — nav links inside dropdown
   ⏳ 26e — wired into LeftPanel + auto-close on scroll

   Why a separate component instead of adding to LeftPanel directly?
   ─────────────────────────────────────────────────────────────────
   LeftPanel is already 200+ lines. Mobile nav has its own state,
   its own animation, its own event listeners. Keeping it separate:
   - Makes LeftPanel easier to read
   - Makes MobileNav independently testable
   - Follows single responsibility principle — one component, one job

   State design — why one boolean?
   ─────────────────────────────────
   The menu is either open or closed. No intermediate states.
   One useState(false) is all we need.

   `isOpen = false` → hamburger visible, dropdown hidden
   `isOpen = true`  → X visible, dropdown visible

   Everything else (animation, visibility) is derived from this
   single boolean — no extra state, no complexity.                          */

import { useState, useEffect } from "react";

/* Nav items — same as LeftPanel, defined here independently
   so MobileNav has no dependency on LeftPanel's internals.                 */
const NAV_ITEMS = [
  { label: "About",       id: "about"      },
  { label: "Work",        id: "work"        },
  { label: "How I Think", id: "how-i-think" },
  { label: "Contact",     id: "contact"     },
];

export default function MobileNav() {
  /* Single boolean drives everything — open or closed */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = ()  => setIsOpen(prev => !prev);
  const close  = ()  => setIsOpen(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    /* Close menu after nav — user is going somewhere */
    close();
  };

  /* ── Auto-close on scroll ───────────────────────────────────────────────
     When the menu is open and the user scrolls (e.g. by swiping),
     close it automatically. This prevents the menu staying open while
     content scrolls underneath it — confusing UX.

     Why only add the listener when isOpen = true?
     If we always listened to scroll, we'd have a permanent scroll
     listener running even when the menu is closed — wasted CPU.
     Adding it only when open means it exists only when needed.

     { passive: true } — same reason as useActiveSection:
     tells the browser we won't call preventDefault(), so it can
     run scroll on a separate thread without waiting for our JS.

     Cleanup: removes the listener when isOpen changes or component
     unmounts — no memory leaks.                                           */
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => close();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <div className="mobile-nav">

      {/* ── Hamburger button ─────────────────────────────────────────────
          Three spans = three lines.
          When isOpen, they animate into an X:
          Line 1 → rotates  45deg, moves down  7px
          Line 2 → fades out (opacity 0)
          Line 3 → rotates -45deg, moves up    7px

          Why 7px? Each line is 1px tall with 6px gap between them.
          7px moves each outer line to the centre to cross at the midpoint.

          aria-label changes between "Open menu" / "Close menu" so
          screen readers announce the correct action.

          aria-expanded tells screen readers if the menu is open.          */}
      <button
        onClick={toggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-dropdown"
        style={{
          background: "none",
          border:     "none",
          cursor:     "pointer",
          padding:    "8px 4px",
          display:    "flex",
          flexDirection: "column",
          gap:        "6px",
          /* Align to right side of the panel header */
          marginLeft: "auto",
          marginTop:  "-8px",
        }}
      >
        {/* Line 1 — rotates to 45deg on open */}
        <span style={{
          display:         "block",
          width:           24,
          height:          1,
          backgroundColor: "#8892B0",
          transition:      "transform 0.3s ease, opacity 0.3s ease",
          transformOrigin: "center",
          transform:       isOpen ? "translateY(7px) rotate(45deg)" : "none",
        }} />

        {/* Line 2 — fades out on open */}
        <span style={{
          display:         "block",
          width:           24,
          height:          1,
          backgroundColor: "#8892B0",
          transition:      "opacity 0.3s ease",
          opacity:         isOpen ? 0 : 1,
        }} />

        {/* Line 3 — rotates to -45deg on open */}
        <span style={{
          display:         "block",
          width:           24,
          height:          1,
          backgroundColor: "#8892B0",
          transition:      "transform 0.3s ease, opacity 0.3s ease",
          transformOrigin: "center",
          transform:       isOpen ? "translateY(-7px) rotate(-45deg)" : "none",
        }} />
      </button>

      {/* ── Dropdown overlay ─────────────────────────────────────────────
          Slides in below the hamburger button when isOpen = true.

          position: fixed
          ────────────────
          Fixed to the viewport — not relative to the panel.
          This means the dropdown covers the full screen width
          regardless of padding on the parent element.

          top: 0, left: 0, right: 0
          ──────────────────────────
          Starts from the very top. We use paddingTop to push
          the content below the header height (~160px).

          pointer-events
          ───────────────
          When closed, pointer-events:none means the invisible overlay
          doesn't accidentally block taps on content underneath.
          When open, pointer-events:auto restores normal interaction.

          opacity + transform transition
          ───────────────────────────────
          Two properties animate together:
          opacity:   0 → 1    (fade in)
          translateY: -8px → 0 (slides down slightly)
          Combined they feel like the menu "drops" into place.

          zIndex: 40
          ───────────
          Above all content (z-index 3) but below LoadingScreen (z-index 50).
          The cursor glow (z-index 2) shows through the semi-transparent bg. */}
      {isOpen && (
        <div
          id="mobile-dropdown"
          role="dialog"
          aria-label="Navigation menu"
          style={{
            position:   "fixed",
            top:        0,
            left:       0,
            right:      0,
            bottom:     0,
            zIndex:     40,
            background:           "rgba(0, 0, 60, 0.97)",
            backdropFilter:       "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            animation: "mobileMenuIn 0.25s ease forwards",
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            padding:        "0 32px",
          }}
          onClick={close}
        >
          {/* ── Nav links ──────────────────────────────────────────────────
              Large tap targets — minimum 48px height per link (Apple HIG
              and Material Design both recommend ≥48px for touch targets).

              e.stopPropagation()
              ────────────────────
              Prevents the tap on a link from bubbling up to the overlay's
              onClick={close}. Without this, tapping a link would trigger
              both scrollTo() AND close() simultaneously from two different
              handlers — causing a race condition.
              With stopPropagation, only the link's own onClick fires.
              close() is called explicitly inside scrollTo() instead.

              fontSize: clamp(28px, 8vw, 40px)
              ─────────────────────────────────
              Large enough to be the visual centrepiece of the overlay.
              On a 375px wide phone: 8vw = 30px. On a 430px phone: 34px.
              Scales naturally with screen width.                          */}
          <nav aria-label="Mobile navigation">
            <ul style={{
              listStyle: "none",
              margin:    0,
              padding:   0,
              display:   "flex",
              flexDirection: "column",
              gap:       8,
            }}>
              {NAV_ITEMS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={e => {
                      /* Stop tap from bubbling to overlay close handler */
                      e.stopPropagation();
                      scrollTo(id);
                    }}
                    style={{
                      background:  "none",
                      border:      "none",
                      cursor:      "pointer",
                      padding:     "12px 0",
                      width:       "100%",
                      textAlign:   "left",

                      /* Large, readable type */
                      fontFamily:    "'Inter', sans-serif",
                      fontSize:      "clamp(28px, 8vw, 40px)",
                      fontWeight:    300,
                      letterSpacing: "-0.02em",
                      color:         "#CCD6F6",

                      /* Transition for hover/tap colour */
                      transition: "color 0.15s ease",

                      /* Minimum 48px touch target height */
                      minHeight: 48,
                      display:   "flex",
                      alignItems: "center",
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

          {/* Social icons at the bottom of the dropdown */}
          <div style={{
            position:   "absolute",
            bottom:     48,
            left:       32,
            display:    "flex",
            gap:        20,
            alignItems: "center",
          }}
            /* Stop tap on icons from closing menu unintentionally */
            onClick={e => e.stopPropagation()}
          >
            {[
              { label: "Gmail",    href: "mailto:reachshivalibajaj@gmail.com"        },
              { label: "GitHub",   href: "https://github.com/shivalibajaj"           },
              { label: "LinkedIn", href: "https://linkedin.com/in/reachshivalibajaj" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                style={{
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      12,
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         "#8892B0",
                  textDecoration:"none",
                  transition:    "color 0.15s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#CCD6F6")}
                onMouseLeave={e => (e.currentTarget.style.color = "#8892B0")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

/* Export these so 26e can import them into LeftPanel without re-declaring */
export { NAV_ITEMS };
