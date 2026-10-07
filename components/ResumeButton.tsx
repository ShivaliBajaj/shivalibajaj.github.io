"use client";

/* ── ResumeButton ─────────────────────────────────────────────────────────────
   Drop-in button for LeftPanel. Place your PDF at public/shivali-bajaj-resume.pdf
   Uses native HTML download attr — no JS needed for the download itself.   */
export default function ResumeButton() {
  return (
    <a
      href="/shivali-bajaj-resume.pdf"
      download="Shivali_Bajaj_Resume.pdf"
      aria-label="Download Shivali Bajaj's resume"
      style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#8892B0", textDecoration:"none", border:"1px solid rgba(138,150,176,0.25)", padding:"8px 16px", borderRadius:4, transition:"color 0.2s ease, border-color 0.2s ease, background 0.2s ease" }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.color="#CCD6F6"; el.style.borderColor="rgba(74,158,255,0.4)"; el.style.background="rgba(74,158,255,0.06)"; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.color="#8892B0"; el.style.borderColor="rgba(138,150,176,0.25)"; el.style.background="transparent"; }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Resume
    </a>
  );
}
