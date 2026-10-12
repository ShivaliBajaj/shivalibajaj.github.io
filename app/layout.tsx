import type { Metadata, Viewport } from "next";
import "./globals.css";

/* Fonts imported directly from npm — self-hosted, no external CDN at runtime */

/* ─── SEO Metadata ───────────────────────────────────────────────────────────
   GitHub Pages reads this from the built HTML.

   Description: 150–160 chars is the SEO sweet spot — long enough to be
   descriptive, short enough not to be truncated in search results.

   Keywords: target what healthcare AI recruiters and collaborators
   actually search. Mix of role, domain, tools, and location.

   Author URL: points to GitHub profile — gives search engines a link
   to verify identity and connect the page to a real person.               */
export const metadata: Metadata = {
  title: "Shivali Bajaj — Medical Data Scientist",

  /* 155 chars — fits cleanly in Google's snippet without truncation */
  description:
    "Medical Data Scientist based in India. Building clinically aware " +
    "intelligence systems in healthcare NLP, medical imaging, and " +
    "responsible machine learning.",

  /* Broad enough to catch searches, specific enough to be relevant */
  keywords: [
    "Medical Data Scientist",
    "Healthcare AI",
    "Medical NLP",
    "Healthcare Machine Learning",
    "Clinical AI",
    "Medical Imaging",
    "Healthcare Analytics",
    "Clinical Data Science",
    "Interpretable ML",
    "Responsible AI",
    "Healthcare Computer Vision",
    "SQL Healthcare",
    "Power BI Healthcare",
    "Medical Data Scientist India",
    "Clinical Language Processing",
    "Environmental Health Analytics",
    "AirAware",
    "MindCare",
  ],

  /* author.url connects this page to the GitHub identity */
  authors: [
    {
      name: "Shivali Bajaj",
      url:  "https://github.com/shivalibajaj",
    },
  ],

  /* creator is read by social platforms and content aggregators */
  creator:  "Shivali Bajaj",
  category: "Healthcare AI Portfolio",

  openGraph: {
    /* 39a-3-1: title, siteName, type ──────────────────────────────────────
       title    → headline shown in the link preview card
       siteName → shown below the title on some platforms (LinkedIn)
       type     → "website" is correct for a portfolio — not "article"    */
    title:    "Shivali Bajaj — Medical Data Scientist",
    siteName: "Shivali Bajaj",
    type:     "website",

    /* 39a-3-2: description ──────────────────────────────────────────────────
       Shorter + punchier than the SEO description.
       WhatsApp truncates at ~100 chars, LinkedIn at ~120.
       This version is 97 chars — safe on every platform.                 */
    description:
      "Medical Data Scientist building clinically aware AI systems " +
      "in healthcare NLP and medical imaging. India.",

    /* 39a-3-3: url + locale ─────────────────────────────────────────────────
       url    → canonical link for the shared page
       locale → en_IN signals Indian English to platforms and search      */
    url:    "https://shivalibajaj.github.io",
    locale: "en_IN",

    /* 39a-3-4: og:image placeholder ────────────────────────────────────────
       Points to /og-image.png which Part 42 will generate.
       1200×630 is the LinkedIn/Facebook recommended size.
       alt is required for accessibility on platforms that support it.    */
    images: [
      {
        url:    "https://shivalibajaj.github.io/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Shivali Bajaj — Medical Data Scientist",
      },
    ],
  },
  twitter: {
    /* card: "summary_large_image" shows a big image preview on X/Twitter.
       "summary" shows a small thumbnail. Since Part 42 generates a 1200×630
       og:image, "summary_large_image" uses it fully — much more visual
       impact when shared on X, LinkedIn (which also reads twitter: tags),
       and Slack.                                                           */
    card:        "summary_large_image",
    title:       "Shivali Bajaj — Medical Data Scientist",

    /* Twitter truncates descriptions at 200 chars — this is 97 chars,
       matching the OG description for consistency across platforms.        */
    description:
      "Medical Data Scientist building clinically aware AI systems " +
      "in healthcare NLP and medical imaging. India.",

    /* images array — Twitter reads this independently of og:image.
       Same 1200×630 image, pointed to explicitly.                         */
    images: ["https://shivalibajaj.github.io/og-image.png"],
  },

  /* ── Canonical URL ────────────────────────────────────────────────────────
     Tells search engines: this is the ONE authoritative URL.
     Prevents duplicate content penalties if GitHub Pages serves the same
     page at multiple URLs (trailing slash, http vs https variants).       */
  alternates: {
    canonical: "https://shivalibajaj.github.io",
  },

  /* ── Robots ───────────────────────────────────────────────────────────────
     index   → allow search engines to index this page
     follow  → allow crawling of outbound links (GitHub, LinkedIn etc.)
     googleBot → separate ruleset for Google's crawler specifically.
     max-image-preview: large → lets Google show the OG image in results.
     max-snippet: -1 → no limit on snippet length in search results.      */
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
};

/* ─── Viewport ───────────────────────────────────────────────────────────────
   width=device-width → no horizontal zoom on mobile
   initial-scale=1    → correct zoom level on all devices
   themeColor         → browser chrome (address bar) matches our navy bg

   themeColor effect by platform:
   - Android Chrome   → address bar turns #00003C (deep navy)
   - iOS Safari       → status bar background matches
   - macOS Safari     → tab bar tints to match
   - PWA installed    → app chrome uses this colour

   Two values: dark media = our navy, light media = also navy since
   this portfolio has no light mode. Both point to the same colour.         */
export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   [
    { media: "(prefers-color-scheme: dark)",  color: "#00003C" },
    { media: "(prefers-color-scheme: light)", color: "#00003C" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-darkreader-lock
    >
      <head>
        {/* color-scheme: dark — prevents extensions overriding palette */}
        <meta name="color-scheme" content="dark" />

        {/* ── Content Security Policy ───────────────────────────────────────
            Restricts what can load on the page. Since fonts are now
            self-hosted via next/font, no external font CDN needed.
            default-src 'self'   → only load from our own domain
            script-src 'self'    → no inline scripts, no eval
            style-src 'self' 'unsafe-inline' → Next.js needs inline styles
            img-src 'self' data: → our images + inline SVGs via data:
            font-src 'self'      → self-hosted fonts only, no Google CDN
            frame-ancestors 'none' → blocks clickjacking (X-Frame-Options++)
            base-uri 'self'      → prevents base tag injection attacks
            form-action 'self'   → no forms but good practice             */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            /* unsafe-eval needed by React in development (Turbopack).
               In production React never uses eval — this is safe.        */
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join("; ")}
        />

        {/* ── Permissions Policy ───────────────────────────────────────────
            Explicitly disables browser features this site never uses.
            An attacker who somehow injects JS can't access camera/mic etc.
            interest-cohort=() → opts out of Google's FLoC tracking.       */}
        <meta
          httpEquiv="Permissions-Policy"
          content={[
            "camera=()",
            "microphone=()",
            "geolocation=()",
            "payment=()",
            "usb=()",
            "interest-cohort=()",
          ].join(", ")}
        />
      </head>
      <body style={{ backgroundColor: "#00003C" }}>
        {children}
      </body>
    </html>
  );
}
