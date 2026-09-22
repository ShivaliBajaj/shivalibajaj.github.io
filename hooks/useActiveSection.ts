/* ─── useActiveSection — Part 11 (split into 11a → 11e) ─────────────────────

   This hook lives in its own file so it can be imported cleanly by
   LeftPanel and any other component that needs active section tracking.

   PART 11a — visibleIds ref
   ─────────────────────────
   Why a ref and not state?

   We need to track which sections are currently visible on screen.
   The natural instinct is useState — but that's wrong here.

   If we used useState<Set<string>>, every time a section enters or
   leaves the viewport, React re-renders the whole LeftPanel.
   On a fast scroll that could be 20+ re-renders per second — janky nav.

   useRef solves this:
   - The Set lives in ref.current
   - We mutate it directly (add/delete) — zero re-renders
   - Only setActiveId triggers a render — and only when the
     ACTIVE nav item actually needs to change

   Think of it like a scratchpad:
   visibleIds  = scratchpad  (silent, no re-renders)
   activeId    = final answer (triggers nav highlight update only)          */

import { useState, useRef, useEffect } from "react";

export function useActiveSection() {
  /* ── The one UI state value ───────────────────────────────────────────
     Only this triggers a re-render — and only when the active
     section actually changes, not on every scroll event.                */
  const [activeId, setActiveId] = useState<string>("about");

  /* ── Silent scratchpad ────────────────────────────────────────────────
     useRef<Set<string>> = a ref whose .current holds a Set of strings.
     Initialised as an empty Set.

     We ADD a section ID when it enters the viewport.
     We DELETE a section ID when it leaves the viewport.
     We never call setState here — just mutate the Set silently.         */
  const visibleIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    /* ── Part 11b — pickActive ──────────────────────────────────────────
       Called whenever the visible Set changes (observer) or user scrolls.
       Reads visibleIds.current, finds all matching DOM sections, sorts
       them by their current top position, picks the one closest to the
       top of the viewport — that's the "active" section.

       Why sort by getBoundingClientRect().top?
       Because section order in the DOM doesn't always match what the user
       SEES as "current" — especially mid-scroll when two sections overlap
       the viewport. The section with the smallest positive top value is
       the one the user is actually reading.

       Why not just pick the first ID in the Set?
       Sets preserve insertion order, not DOM order. On fast scroll,
       sections can enter the Set out of sequence. Sorting by real
       pixel position is the only reliable approach.                      */
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );

    const pickActive = () => {
      /* Nothing visible yet — keep current active, don't flicker */
      if (visibleIds.current.size === 0) return;

      const topmost = sections
        /* Only consider sections currently in the visible Set */
        .filter(s => visibleIds.current.has(s.id))
        /* Sort ascending by distance from top of viewport */
        .sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top
        )
        /* The first one is closest to top — that's active */
        [0];

      if (topmost) setActiveId(topmost.id);
    };

    /* ── Part 11c — IntersectionObserver entries handler ───────────────
       The observer watches every section[id] on the page.
       When a section crosses the visibility threshold it fires a callback
       with an array of IntersectionObserverEntry objects — one per section
       that changed visibility state in that frame.

       Each entry tells us:
       - entry.target.id        → which section
       - entry.isIntersecting   → did it enter (true) or leave (false)?

       We use this to maintain visibleIds — the silent scratchpad:
       ENTER → add to Set
       LEAVE → delete from Set
       Then immediately call pickActive() to recalculate the active nav item.

       rootMargin: "-96px 0px -10% 0px"
       ───────────────────────────────
       Shrinks the effective viewport before intersection is calculated:
       -96px top  → ignores the top 96px (accounts for sticky section labels)
       -10% bottom → ignores the bottom 10% (section must be meaningfully visible)
       Without this, a section barely peeking at the bottom edge would
       trigger as "active" before the user has scrolled to it.

       threshold: 0
       ─────────────
       Fire as soon as ANY pixel of the section enters/leaves the
       adjusted viewport. Combined with rootMargin this gives precise
       control without needing multiple threshold values.                  */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /* Section entered viewport — add to scratchpad */
            visibleIds.current.add(entry.target.id);
          } else {
            /* Section left viewport — remove from scratchpad */
            visibleIds.current.delete(entry.target.id);
          }
        });

        /* Recalculate active after every batch of entry changes */
        pickActive();
      },
      {
        rootMargin: "-96px 0px -10% 0px",
        threshold:  0,
      }
    );

    /* Attach observer to every section with an id */
    sections.forEach(s => observer.observe(s));

    /* ── Part 11d — Scroll listener ────────────────────────────────────
       The IntersectionObserver alone has one blind spot: fast scrolling.

       The problem:
       When the user scrolls very quickly, the browser may skip firing
       the observer callback for sections that were visible for only a
       few milliseconds. The section enters AND leaves the viewport
       between two observer ticks — so visibleIds never gets updated.
       Result: the nav highlight gets stuck on the wrong section.

       The fix — a scroll event listener that calls pickActive() directly:
       scroll fires on EVERY frame while scrolling (60fps on most devices).
       Each call re-reads getBoundingClientRect() live from the DOM and
       picks the topmost section from whatever IS in visibleIds.current.

       This doesn't replace the observer — it covers its blind spot.
       Observer  → keeps visibleIds accurate during normal scroll
       Scroll    → recalculates active during fast scroll bursts

       Why { passive: true }?
       Tells the browser this listener will NEVER call preventDefault().
       The browser can then run scroll handling on a separate thread
       without waiting for our JS — smoother scroll performance,
       especially on mobile and low-power devices.

       Why not throttle or debounce?
       We intentionally don't throttle. pickActive() is cheap —
       it only reads from a ref and does an array sort on 4 items.
       Throttling would introduce a delay between scroll position
       and nav highlight update — exactly the jank we're trying to avoid. */
    window.addEventListener("scroll", pickActive, { passive: true });

    /* ── Part 11e — Cleanup ─────────────────────────────────────────────
       Every listener and observer registered in a useEffect MUST be
       cleaned up when the component unmounts — otherwise they keep
       running in the background, leaking memory and causing bugs.

       observer.disconnect()
       → Stops watching all sections. Without this, the observer holds
         references to DOM nodes even after they're removed — memory leak.

       removeEventListener("scroll", pickActive)
       → Without this, pickActive() keeps firing on scroll even after
         the component is gone — calling setActiveId on an unmounted
         component (React warning + wasted CPU).

       visibleIds.current.clear()
       → Empties the scratchpad. Good practice if the component remounts
         in the same session — leaves no stale IDs behind.

       React calls this cleanup:
       - When the component unmounts
       - Before re-running the effect if dependencies changed
       - In Strict Mode: on every mount during development (intentional
         double-invoke to surface cleanup bugs early)                     */
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", pickActive);
      visibleIds.current.clear();
    };
  }, []);

  return activeId;
}
