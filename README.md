# Cloudfolio · Vishal Singh

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

## Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the site and publishes it to https://codemitvishal.github.io/ (the `main` branch of [`CodeMitVishal.github.io`](https://github.com/CodeMitVishal/CodeMitVishal.github.io), which only holds the built files). Run it after editing `src/data.js`. This repo's `gh-pages` branch only redirects the old `/cloudfolio/` address to the main site.
