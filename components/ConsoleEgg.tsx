"use client";
import { useEffect } from "react";

/* Renders nothing — fires one console.log when the page loads */
export default function ConsoleEgg() {
  useEffect(() => {
    console.log(
      "%c Hey, you opened DevTools.",
      "font-size:15px; font-weight:600; color:#4a9eff;"
    );
    console.log(
      "%cDiagnosis: Curiosity.  Prognosis: Excellent.",
      "font-size:13px; color:#8892b0;"
    );
    console.log(
      "%c-> reachshivalibajaj@gmail.com",
      "font-size:13px; color:#10b981;"
    );
  }, []);   // empty array = runs once on mount, never again

  return null;  //no DOM output
}