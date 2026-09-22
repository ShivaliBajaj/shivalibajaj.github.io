import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#00003C",   // deep navy background
        accent:  "#4A9EFF",   // medical blue accent
        text:    "#CCD6F6",   // Brittany's exact primary text
        muted:   "#8892B0",   // Brittany's exact muted text
        surface: "#020247",   // card / hover surface
      },
      fontFamily: {
        // Inter for body — exactly like Brittany
        sans:    ["Inter", "system-ui", "sans-serif"],
        // Merriweather for headings — Shivali's identity
        heading: ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
