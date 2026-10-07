# Shivali Bajaj — Portfolio

Personal portfolio for **Shivali Bajaj**, Medical Data Scientist, India.  
Live at: [shivalibajaj.github.io](https://shivalibajaj.github.io)

## Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS custom properties
- **Fonts**: Merriweather (headings) · Manrope (body)
- **Deployment**: GitHub Pages via static export

## Running locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploying

Push to `main` — GitHub Actions builds and deploys automatically.

**Before first deploy**, go to your GitHub repo:  
`Settings → Pages → Source → GitHub Actions`

## What to update before deploying

1. `components/sections/Contact.tsx` — replace the placeholder email with your real one
2. `components/sections/Work.tsx` — update GitHub URLs when repositories are public
3. `public/` — add a profile image or favicon if desired

## Architecture

```
app/
  layout.tsx        ← Root layout, metadata
  page.tsx          ← Composes all sections
  globals.css       ← Design tokens, fonts, base styles

components/
  LoadingScreen.tsx ← 1.5s fade loading screen
  Navbar.tsx        ← Fixed nav with scroll effect
  sections/
    Hero.tsx        ← Identity line + hero statement + domain tags
    Work.tsx        ← AirAware, MindCare, placeholder
    HowIThink.tsx   ← Ten locked working principles
    Contact.tsx     ← Contact links + footer
```
