"use client";

/* ─── Page — Root composition ────────────────────────────────────────────────
   Renders the loading screen on top, then the full portfolio beneath it.
   Sections: Hero → Work → HowIThink → Contact                              */

import LoadingScreen   from "@/components/LoadingScreen";
import Navbar          from "@/components/Navbar";
import Hero            from "@/components/sections/Hero";
import Work            from "@/components/sections/Work";
import HowIThink       from "@/components/sections/HowIThink";
import Contact         from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      {/* Loading screen sits above everything; unmounts itself after 2s */}
      <LoadingScreen />

      {/* Fixed navbar — always visible after loading */}
      <Navbar />

      {/* Main content — all sections flow in a single long page */}
      <main>
        <Hero      />
        <Work      />
        <HowIThink />
        <Contact   />
      </main>
    </>
  );
}
