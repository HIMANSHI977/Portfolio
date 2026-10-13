# Himanshi Bisht — Portfolio

Plain HTML, CSS and JavaScript portfolio: Three.js background, project filters,
dark/light theme (saved in the browser), interactive terminal, a separate resume
and a Formspree contact form.

## Files

| File | Purpose |
|---|---|
| `index.html` | Main portfolio page |
| `style.css` | All styling (`editorial.css` is intentionally empty, kept for compatibility) |
| `script.js` | Projects data, filters, terminal, theme toggle, contact form |
| `theme-init.js` | Applies the saved theme before first paint |
| `background.js` | Three.js 3D background (loads from jsDelivr) |
| `assets/Himanshi_Bisht_Resume.pdf` | Your resume PDF |

## Run locally

Chrome blocks JavaScript modules on `file://`, so don't double-click `index.html`.

```bash
cd Himanshi_3D_Portfolio
python3 -m http.server 8000
```

Open http://localhost:8000 in Chrome. (Or use the VS Code "Live Server" extension.)

## Edit your projects

Open `script.js` and change the `PROJECTS` array near the top. Each project has its own
`live` (Live Demo) and `repo` (Source Code) URL; the cards are generated from it.

## Resume

Replace `assets/Himanshi_Bisht_Resume.pdf` with your updated PDF (same file name).
The "View Resume" button opens the PDF directly in a new tab.

## Contact form

The form posts with `fetch()` to `https://formspree.io/f/xjygepwg`; visitors stay on the page.
Test it once after deployment from your live URL (and confirm the Formspree email arrives).

## Deploy

**GitHub Pages**
1. Create a new repo (e.g. `portfolio`) and push the *contents* of this folder to it
   (`index.html` must be at the repo root).
2. Repo → Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)` → Save.
3. Your site will be at `https://<username>.github.io/<repo>/`.

**Vercel**
1. Push the same repo to GitHub.
2. vercel.com → Add New → Project → import the repo.
3. Framework preset: "Other"; leave build command empty; Deploy.
