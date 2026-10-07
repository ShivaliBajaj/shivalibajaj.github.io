"use client";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#00003C", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", opacity: visible ? 1 : 0, transition:"opacity 0.6s ease" }}>
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:120, fontWeight:700, color:"rgba(74,158,255,0.08)", lineHeight:1, margin:0, letterSpacing:"-0.04em", userSelect:"none" }}>404</p>
      <h1 style={{ fontFamily:"'Merriweather',Georgia,serif", fontSize:"clamp(20px,3vw,28px)", fontWeight:300, color:"#CCD6F6", letterSpacing:"-0.01em", marginTop:-24, marginBottom:16, textAlign:"center" }}>
        This path doesn&apos;t exist in the system.
      </h1>
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:"#8892B0", lineHeight:1.75, maxWidth:440, textAlign:"center", marginBottom:48 }}>
        Built at the intersection of biology and bytes — but this page wasn&apos;t part of the build.
      </p>
      <a href="/"
        style={{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4A9EFF", textDecoration:"none", border:"1px solid rgba(74,158,255,0.3)", padding:"12px 28px", borderRadius:6, background:"rgba(74,158,255,0.06)" }}
        onMouseEnter={e => { e.currentTarget.style.background="rgba(74,158,255,0.12)"; e.currentTarget.style.borderColor="rgba(74,158,255,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.background="rgba(74,158,255,0.06)"; e.currentTarget.style.borderColor="rgba(74,158,255,0.3)"; }}
      >
        ← Return to portfolio
      </a>
      <p style={{ position:"absolute", bottom:32, fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(138,150,176,0.5)", letterSpacing:"0.08em" }}>
        Shivali Bajaj · Medical Data Scientist · India
      </p>
    </div>
  );
}
