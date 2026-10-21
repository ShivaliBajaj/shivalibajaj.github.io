"use client";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#00003C", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", opacity: visible ? 1 : 0, transition:"opacity 0.6s ease" }}>

      {/* Ghost 404 — faded background number, more opacity reduced for breathing room */}
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:160, fontWeight:700, color:"rgba(74,158,255,0.04)", lineHeight:1, margin:0, letterSpacing:"-0.04em", userSelect:"none" }}>
        404
      </p>

      {/* Heading */}
      <h1 style={{ fontFamily:"'Merriweather',Georgia,serif", fontSize:"clamp(20px,3vw,28px)", fontWeight:300, color:"#CCD6F6", letterSpacing:"-0.01em", marginTop:-32, marginBottom:16, textAlign:"center" }}>
        404 — Page not found
      </h1>

      {/* Subtext — medical + data, no AI traces */}
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:"#8892B0", lineHeight:1.75, maxWidth:440, textAlign:"center", marginBottom:48 }}>
        Vitals flatlined. This page didn't make it. 🫀
      </p>

      {/* CTA button */}
      <a href="/"
        style={{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4A9EFF", textDecoration:"none", border:"1px solid rgba(74,158,255,0.3)", padding:"12px 28px", borderRadius:6, background:"rgba(74,158,255,0.06)" }}
        onMouseEnter={e => { e.currentTarget.style.background="rgba(74,158,255,0.12)"; e.currentTarget.style.borderColor="rgba(74,158,255,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.background="rgba(74,158,255,0.06)"; e.currentTarget.style.borderColor="rgba(74,158,255,0.3)"; }}
      >
        <span style={{ verticalAlign:"middle", marginRight:8 }}>⟵</span>Return to portfolio
      </a>

      {/* Footer — human, not job-title heavy */}
      <p style={{ position:"absolute", bottom:32, fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(138,150,176,0.5)", letterSpacing:"0.08em" }}>
        Shivali Bajaj · Indore, India
      </p>

    </div>
  );
}