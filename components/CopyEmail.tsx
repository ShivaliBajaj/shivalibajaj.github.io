"use client";

import { useState, useRef, useEffect } from "react";

const EMAIL = "reachshivalibajaj@gmail.com";

export default function CopyEmail() {
  const [copied,      setCopied]      = useState(false);
  const [visible,     setVisible]     = useState(false);
  const [exiting,     setExiting]     = useState(false);
  const [announcement,setAnnouncement]= useState("");
  const [hovered,     setHovered]     = useState(false);

  const exitTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (exitTimer.current)  clearTimeout(exitTimer.current);
    if (resetTimer.current) clearTimeout(resetTimer.current);
  };

  useEffect(() => () => clearTimers(), []);

  const handleCopySuccess = () => {
    clearTimers();
    setCopied(true);
    setVisible(true);
    setExiting(false);
    setAnnouncement("Email address copied to clipboard");
    setTimeout(() => setAnnouncement(""), 2500);
    exitTimer.current  = setTimeout(() => setExiting(true), 1800);
    resetTimer.current = setTimeout(() => {
      setVisible(false);
      setCopied(false);
      setExiting(false);
    }, 2050);
  };

  const fallbackCopy = () => {
    try {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      if (document.execCommand("copy")) handleCopySuccess();
      document.body.removeChild(ta);
    } catch { /* silent fail */ }
  };

  const copyToClipboard = async () => {
    if (visible) return;
    try {
      await navigator.clipboard.writeText(EMAIL);
      handleCopySuccess();
    } catch {
      fallbackCopy();
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>

      {/* Screen reader announcement */}
      <span aria-live="polite" aria-atomic="true" style={{
        position:"absolute", width:1, height:1, padding:0,
        margin:-1, overflow:"hidden", clip:"rect(0,0,0,0)",
        whiteSpace:"nowrap", border:0,
      }}>
        {announcement}
      </span>

      {/* ── Email button ─────────────────────────────────────────────── */}
      <button
        onClick={copyToClipboard}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Copy email address ${EMAIL} to clipboard`}
        title="Click to copy email address"
        style={{
          background: "none", border: "none",
          cursor:     "copy",          /* browser shows clipboard cursor on hover */
          padding:    0,
          display:    "flex", alignItems: "center", gap: 8,
          fontFamily: "'Inter', sans-serif",
          fontSize:   14, fontWeight: 400,
          color:      copied ? "#4A9EFF" : "#CCD6F6",
          transition: "color 0.2s ease",
          textAlign:  "left",
        }}
      >
        {/* Copy icon — two overlapping pages = universally "copy" */}
        <span style={{
          display:    "flex",
          alignItems: "center",
          opacity:    copied ? 1 : hovered ? 1 : 0.5,
          transition: "opacity 0.2s ease",
          flexShrink: 0,
          color:      copied ? "#4A9EFF" : "#8892B0",
        }}>
          {copied ? (
            /* Checkmark after copy */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            /* Two overlapping pages — universally means "copy" */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          )}
        </span>

        {EMAIL}

        {/* Hover hint text — appears on hover, disappears after copy */}
        {!copied && (
          <span style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      10,
            fontWeight:    500,
            letterSpacing: "0.08em",
            color:         "#4A9EFF",
            opacity:       hovered ? 1 : 0,
            transition:    "opacity 0.2s ease",
            whiteSpace:    "nowrap",
          }}>
            click to copy
          </span>
        )}

        {/* Post-copy confirmation inline */}
        {copied && (
          <span style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      10,
            fontWeight:    500,
            letterSpacing: "0.08em",
            color:         "#4A9EFF",
          }}>
            copied!
          </span>
        )}
      </button>

      {/* ── Toast ────────────────────────────────────────────────────── */}
      {visible && (
        <div
          role="status"
          style={{
            position:      "fixed",      /* fixed so it's never clipped */
            bottom:        32,
            right:         32,
            zIndex:        99,
            pointerEvents: "none",
            whiteSpace:    "nowrap",
            background:    "#020247",
            border:        "1px solid rgba(74,158,255,0.35)",
            borderRadius:  8,
            padding:       "10px 18px",
            fontFamily:    "'Inter', sans-serif",
            fontSize:      13,
            fontWeight:    500,
            color:         "#CCD6F6",
            boxShadow:     "0 4px 24px rgba(0,0,0,0.4)",
            animation:     exiting
              ? "toastOut 0.25s ease forwards"
              : "toastIn  0.2s  ease forwards",
          }}
        >
          <span style={{ color: "#4A9EFF", marginRight: 8 }}>✓</span>
          Email copied to clipboard
        </div>
      )}
    </div>
  );
}

export { EMAIL };
