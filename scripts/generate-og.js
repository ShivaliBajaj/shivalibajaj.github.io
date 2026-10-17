/**
 * generate-og.js
 * Generates public/og-image.png at exactly 1200x630px
 * using Playwright to screenshot an inline HTML template.
 *
 * Run from repo root:  node scripts/generate-og.js
 */

const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

// ── OG image HTML ────────────────────────────────────────────────────────────
// Inline everything — fonts loaded from Google Fonts CDN at screenshot time.
const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Merriweather:ital,wght@0,300;1,300&display=swap">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: linear-gradient(135deg, #00003C 0%, #020248 55%, #010130 100%);
    font-family: 'Inter', sans-serif;
    position: relative;
  }

  /* Faint horizontal grid lines */
  .grid {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      0deg,
      rgba(74,158,255,0.04) 0px, rgba(74,158,255,0.04) 1px,
      transparent 1px, transparent 63px
    );
  }

  /* Ghost ECG — right side background */
  .ecg-ghost {
    position: absolute; right: -20px; top: 50%;
    transform: translateY(-50%);
    opacity: 0.05; width: 640px;
  }

  /* Main content */
  .content {
    position: relative; z-index: 1;
    height: 100%;
    padding: 72px 80px 60px 80px;
    display: flex; flex-direction: column;
    justify-content: space-between;
  }

  .top { display: flex; flex-direction: column; gap: 28px; }

  /* Role label */
  .role {
    display: flex; align-items: center; gap: 12px;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #4A9EFF;
  }

  /* Name */
  .name {
    font-family: 'Merriweather', Georgia, serif;
    font-weight: 300; font-size: 58px;
    color: #CCD6F6; line-height: 1.15;
    letter-spacing: -0.01em;
  }

  /* Tagline */
  .tagline {
    font-size: 18px; font-weight: 400;
    color: #8892B0; line-height: 1.65;
    max-width: 580px;
  }

  /* Bottom row */
  .bottom {
    display: flex; align-items: center;
    justify-content: space-between;
  }

  .url {
    font-size: 13px; font-weight: 600;
    letter-spacing: 0.06em;
    color: rgba(74,158,255,0.55);
  }

  /* Vitals bars — matches WhyHealthcare BAR_HEIGHTS */
  .vitals {
    display: flex; align-items: flex-end; gap: 5px;
    opacity: 0.35;
  }
  .vitals span {
    display: block; width: 4px;
    background: #4A9EFF; border-radius: 2px;
  }
</style>
</head>
<body>
  <div class="grid"></div>

  <!-- Ghost ECG waveform -->
  <svg class="ecg-ghost" viewBox="0 0 600 200" fill="none">
    <polyline
      points="0,100 60,100 80,30 110,170 140,100 170,100 200,100
              230,40 260,160 290,100 320,100 360,100
              390,55 420,145 440,100 480,100 600,100"
      stroke="#4A9EFF" stroke-width="3"
      stroke-linecap="round" stroke-linejoin="round"
    />
  </svg>

  <div class="content">
    <div class="top">
      <!-- Role label with mini ECG -->
      <div class="role">
        <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
          <polyline points="0,6 6,6 8,2 10,10 12,6 14,6 32,6"
            stroke="#4A9EFF" stroke-width="1.4"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Medical Data Scientist
      </div>

      <h1 class="name">Shivali Bajaj</h1>

      <p class="tagline">
        Building clinically aware intelligence systems in healthcare NLP,
        medical imaging, and responsible ML.
      </p>
    </div>

    <div class="bottom">
      <span class="url">shivalibajaj.github.io</span>
      <!-- Vitals bars: heights match BAR_HEIGHTS = [8,14,10,18,12,9] -->
      <div class="vitals">
        <span style="height:8px"></span>
        <span style="height:14px"></span>
        <span style="height:10px"></span>
        <span style="height:18px"></span>
        <span style="height:12px"></span>
        <span style="height:9px"></span>
      </div>
    </div>
  </div>
</body>
</html>`;

// ── Screenshot ───────────────────────────────────────────────────────────────
(async () => {
  const outPath = path.resolve(__dirname, "../public/og-image.png");

  // Make sure public/ exists
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set exact OG image dimensions
  await page.setViewportSize({ width: 1200, height: 630 });

  // Load the HTML (with font CDN access)
  await page.setContent(HTML, { waitUntil: "networkidle" });

  // Extra wait to ensure fonts are rendered
  await page.waitForTimeout(500);

  await page.screenshot({ path: outPath, type: "png" });
  await browser.close();

  console.log(`✓ OG image saved → ${outPath}`);
})();
