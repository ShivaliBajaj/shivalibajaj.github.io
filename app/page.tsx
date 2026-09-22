"use client";

/* ─── Page ───────────────────────────────────────────────────────────────────
   Root composition. Uses the .layout-shell / .panel-left / .panel-right
   CSS classes defined in globals.css — those classes handle ALL responsive
   behaviour (desktop sticky, tablet sticky, mobile stacked).

   Nothing here needs to know about breakpoints — CSS handles it.           */

import LoadingScreen   from "@/components/LoadingScreen";
import CursorGlow      from "@/components/CursorGlow";
import ScrollProgress  from "@/components/ScrollProgress";
import LeftPanel       from "@/components/LeftPanel";
import About         from "@/components/sections/About";
import Work          from "@/components/sections/Work";
import HowIThink     from "@/components/sections/HowIThink";
import Contact       from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      {/* Fades out after 1.5s — unmounts itself */}
      <LoadingScreen />

      {/* Fixed overlay, follows cursor, pointer-events:none */}
      {/* Thin progress line at very top of viewport */}
      <ScrollProgress />

      <CursorGlow />

      {/* ── Two-column shell ─────────────────────────────────────────────────
          .layout-shell → max-width, flex, align-items:flex-start
          Responsive behaviour is entirely in globals.css:
          - ≥1024px : two columns, left panel sticky
          - 768-1023: two columns, left panel sticky (narrower)
          - <768px  : single column, left panel normal flow               */}
      <div className="layout-shell">

        {/* ── Left panel ───────────────────────────────────────────────────
            .panel-left → position:sticky, top:0, height:100vh
            On mobile .panel-left overrides to position:relative, height:auto */}
        <LeftPanel />

        {/* ── Right panel ──────────────────────────────────────────────────
            .panel-right → flex:1, padding
            The body scrolls — this column flows naturally past the sticky panel */}
        <main className="panel-right">
          <About     />
          <Work      />
          <HowIThink />
          <Contact   />
        </main>

      </div>
    </>
  );
}
