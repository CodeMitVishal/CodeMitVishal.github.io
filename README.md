# Vishal Singh · Portfolio

**Live:** https://codemitvishal.github.io/

Personal portfolio of Vishal Singh, hands-on Software Engineer (C# / .NET APIs, event-driven back ends, Angular, Azure & Kubernetes, AI agents): experience, professional and open-source projects, skills and certifications, education, master's thesis, free courses, and contact.

## Tech

- React 18 + Vite, plain CSS with light and dark themes; editorial "field notes" design: Instrument Serif, Geist and Geist Mono on paper and ink, hairline rules, numbered sections and schematic diagrams of real systems
- Designed for recruiters: who, what and how to contact within 5 seconds; case studies (challenge, what I did, result); official Microsoft certification badges linked to Microsoft Learn; company and university logos
- Responsive, accessible (keyboard focus, reduced motion), SEO and Open Graph tags
- All content lives in [`src/data.js`](src/data.js): edit it to update the site

## Run locally

```bash
npm install
npm run dev
```

## Languages

The site is in English by default, with German and Hindi via the **EN · DE · हि** switcher (or links like `?lang=de`). Translations live in [`src/i18n/de.js`](src/i18n/de.js) and [`src/i18n/hi.js`](src/i18n/hi.js), keyed by the English text; any text without a translation stays in English.

## Deploy

```bash
npm run deploy
```

This builds the site and pushes the result to this repo's `gh-pages` branch, which GitHub Pages serves at https://codemitvishal.github.io/. The source code lives on `main`.
