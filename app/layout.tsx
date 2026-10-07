import type { Metadata } from "next";
import "./globals.css";

/* ─── SEO Metadata ───────────────────────────────────────────────────────────
   GitHub Pages reads this from the built HTML — keep it descriptive.       */
export const metadata: Metadata = {
  title: "Shivali Bajaj — Medical Data Scientist",
  description:
    "Building clinically aware intelligence systems across healthcare NLP, " +
    "Computer Vision, and applied machine learning.",
  openGraph: {
    title: "Shivali Bajaj — Medical Data Scientist",
    description:
      "Medical Data Scientist based in India, building responsible healthcare AI systems.",
    url: "https://shivalibajaj.github.io",
    siteName: "Shivali Bajaj",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* background-color on body matches --bg so there's no flash on load */}
      <body style={{ backgroundColor: "#00003C" }}>
        {children}
      </body>
    </html>
  );
}
