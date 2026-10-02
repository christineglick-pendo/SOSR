# CLAUDE.md

Guidance for Claude Code (or any future agent) working in this repo.

## What this is

A static, multi-page boilerplate site used for **testing** (tag managers, form flows, mock auth UI). It is intentionally plain HTML/CSS/JS with no build step, no framework, and no backend.

**It is deliberately not a SPA.** Every tab (`index.html`, `about.html`, `gallery.html`, `pricing.html`, `checkout.html`) is a real, separate HTML page with a full page load on navigation — not client-side routing. Keep it that way; adding a router or bundler defeats the purpose of this site.

## Structure

- `index.html`, `about.html`, `gallery.html`, `pricing.html`, `checkout.html` — the pages. Each repeats the same header/nav/sign-in-modal markup rather than importing a shared partial (no templating layer by design).
- `css/styles.css` — shared styles, one file for the whole site.
- `js/main.js` — shared behavior:
  - Sign-in modal: accepts **any** email/password combination, does not validate, store, or send credentials anywhere. Purely a UI mock for testing auth-adjacent flows.
  - Checkout form submit handler: `preventDefault()`, hides the form, shows an order confirmation. No destination/backend is wired up.
- `images/` — local SVG placeholders (hero banner + 4 tiles). No external image hosts are used.

## Conventions to preserve

- If you add a new page, copy the header/nav/footer/sign-in-modal block from an existing page verbatim (including the GTM snippets below) rather than factoring it into a shared include — this repo has no server-side templating.
- Keep all links relative (`about.html`, `css/styles.css`, etc.) so the site works whether served from a repo root or a subpath (important for GitHub Pages).
- Don't add a bundler, framework, or client-side router — the multi-page structure is the point.

## Google Tag Manager

Container ID: `GTM-KFN4D35G`. Every page must have:
- The GTM `<script>` snippet in `<head>`
- The GTM `<noscript><iframe>` snippet immediately after the opening `<body>` tag

If you add a new page, copy both snippets exactly as they appear in the existing pages.

## Deploying

See [README.md](README.md) for GitHub Pages deployment steps. No CI/build step is required — pushing the static files is sufficient.

## Testing locally

```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000/index.html`.
