# Test Boilerplate Site

A plain multi-page HTML/CSS/JS site for testing (tag managers, form flows, mock auth UI, etc.). Deliberately **not** a single-page app — every tab is a real page load.

## Structure

- `index.html`, `about.html`, `gallery.html`, `pricing.html`, `contact.html` — the five tabs, sharing the same header/nav and sign-in modal markup
- `css/styles.css` — shared styles
- `js/main.js` — sign-in modal logic (accepts any name/password, nothing is checked or stored) and the contact form's submit handler
- `images/` — a hero banner and four placeholder graphics (local SVGs, no external image hosts)

## Behavior notes

- **Sign In**: click the button in the header to open a modal with Name + Password fields. Any values are accepted; there is no validation, storage, or network call. Submitting shows "Signed in as {name}" and the button toggles to a signed-in state (client-side only, resets on reload).
- **Contact form** (`contact.html`): includes a required email field. Submitting has no destination configured — it just hides the form and shows a "Thank you" message.
- **Google Tag Manager**: installed on every page with container `GTM-KFN4D35G` (script in `<head>`, noscript iframe right after `<body>`).

## Running locally

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## Deploying to GitHub Pages

1. Push this folder's contents to a GitHub repo (root of the repo, or a `/docs` folder).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to "Deploy from a branch".
4. Pick the branch (e.g. `main`) and folder (`/ (root)` or `/docs`), then save.
5. GitHub will publish the site at `https://<username>.github.io/<repo-name>/`.

Since this is a plain multi-page site with relative links (`about.html`, `css/styles.css`, etc.), it works whether it's served from the repo root or from a subpath — no base-path configuration needed.
