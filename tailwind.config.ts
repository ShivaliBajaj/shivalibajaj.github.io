import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Mirror our CSS custom properties so Tailwind classes work too
      colors: {
        bg:         "#00003C",
        surface:    "#00005A",
        border:     "#0A0A6A",
        text:       "#E8EDF4",
        muted:      "#B8C2D1",
        accent:     "#4A9EFF",
        "accent-dim": "#1A3A6A",
      },
      fontFamily: {
        heading: ["Merriweather", "Georgia", "serif"],
        body:    ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
