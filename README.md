# Cloudfolio · Vishal Singh

**Live:** https://codemitvishal.github.io/ (also at https://codemitvishal.github.io/cloudfolio/)

Personal portfolio of Vishal Singh, hands-on Software Engineer (C# / .NET APIs, event-driven back ends, Angular, Azure & Kubernetes, AI agents): experience, professional and open-source projects, skills and certifications, education, master's thesis, free courses, and contact.

## Tech

- React 18 + Vite, plain CSS with light and dark themes
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
npm run deploy:root
```

```bash
npm run deploy
```

The first publishes to https://codemitvishal.github.io/ (the `main` branch of `CodeMitVishal.github.io`). The second publishes to `/cloudfolio/` (this repo's `gh-pages` branch). Run both after editing `src/data.js`.
