<p align="center">
  <img src="images/logo-light.png" alt="Ayse Sule Ekiz" width="88" height="88" style="border-radius:50%;">
</p>

<h1 align="center">Ayse Sule Ekiz — Portfolio</h1>

<p align="center">
  A hand-crafted personal portfolio spanning <strong>software engineering, visual art, ceramics, painting, and graphic design</strong>.<br>
  Built entirely with vanilla HTML, CSS, and JavaScript — no framework, no build step, no dependencies.
</p>

<p align="center">
  <a href="https://aysesule2405.github.io/ayse-sule-ekiz-portfolio/">Live Site</a> &nbsp;·&nbsp;
  <a href="#pages">Pages</a> &nbsp;·&nbsp;
  <a href="#projects-showcased">Projects</a> &nbsp;·&nbsp;
  <a href="#interactive-mini-games">Mini-Games</a> &nbsp;·&nbsp;
  <a href="#run-locally">Run Locally</a>
</p>

---

## Highlights

- **Zero build step** — open any `.html` file directly in a browser or serve statically
- **Full light / dark mode** — CSS custom properties, `localStorage` persistence, OS preference detection, and instant favicon swap
- **Three interactive mini-games** — a physics sand canvas, a color palette quiz, and a lunar memory game
- **Masonry galleries** — pure CSS `column-count`, no JS layout library
- **Web Audio sound design** — synthesised game sounds + fade-in/out MP3 loops, global mute
- **Accessible markup** — semantic HTML5, ARIA labels, keyboard navigation, scroll-reveal animations

---

## Pages

| Page | Description |
|---|---|
| `index.html` | Landing page — animated hero, editorial art preview, tools showcase |
| `projects.html` | Technical project cards with expandable detail pop-ups |
| `playground.html` | Three interactive mini-games |
| `about.html` | Personal story, background, and contact form |
| `resume.html` | Inline résumé viewer with download link |
| `graphicdesign.html` | Graphic design & digital art gallery (masonry) |
| `ceramics.html` | Sculpting & ceramics gallery |
| `painting.html` | Painting & charcoal gallery |

---

## Projects Showcased

### <img src="projects/OpenStaxAlign/logo.png" height="20" align="center" alt=""> OpenStaxAlign — Rice Datathon 2026
**OpenStax Track Winner · 2nd Place Overall**

<img src="projects/OpenStaxAlign/bg.png" width="640" alt="OpenStaxAlign dashboard">

An NLP pipeline that maps textbook sections to educational standards automatically. Built end-to-end in a single hackathon day: raw JSON ingestion → TF-IDF vectorization → class-weighted Linear SVM → stratified cross-validation. Achieved **75% validation accuracy** on a severely imbalanced multi-class label space.

**Stack:** Python · scikit-learn · TF-IDF · Linear SVM · MongoDB · Logistic Regression

---

### <img src="projects/Obi/logo.png" height="20" align="center" alt=""> Obi — Local AI Desktop Assistant
**LA Hacks 2026 · Figma UI Challenge Winner**

| Homepage | Chat & Search |
|---|---|
| <img src="projects/Obi/homepage.png" width="200" alt="Obi homepage"> | <img src="projects/Obi/chat_search.png" width="200" alt="Obi chat"> |

Cross-platform AI desktop assistant with a locally-hosted Gemma LLM, sub-second contextual responses, and zero cloud dependency.

**Stack:** Electron · Vite · Gemma LLM · RAG Pipeline · Local AI

---

### <img src="projects/Whisperwind%20Grove/logo.png" height="20" align="center" alt=""> Whisperwind Grove — CS Senior Capstone

<img src="projects/Whisperwind%20Grove/whisperwind-grove.copy.jpg" width="640" alt="Whisperwind Grove">

| Delivery on the Wind | Rise of the Half Moon | Spirit Drift | Spirit Sapling |
|---|---|---|---|
| <img src="projects/Whisperwind%20Grove/delivery-on-the-wind%20copy.png" width="200" alt="Delivery on the Wind"> | <img src="projects/Whisperwind%20Grove/rise-of-the-half-moon%20copy.png" width="200" alt="Rise of the Half Moon"> | <img src="projects/Whisperwind%20Grove/spirit-drift%20copy.png" width="200" alt="Spirit Drift"> | <img src="projects/Whisperwind%20Grove/spirit-sapling%20copy.png" width="200" alt="Spirit Sapling"> |

Full-stack capstone platform with four playable worlds, achievements, leaderboards, and AI-assisted interactions. Received full marks for systems integration.

**Stack:** React · TypeScript · Phaser · Gemini AI

---

### <img src="projects/Reverie/logo.jpg" height="20" align="center" alt=""> Reverie — Social Reading App

| Home | My Spaces | Community | Timeline |
|---|---|---|---|
| <img src="projects/Reverie/Screenshot%201%20-%20Home%20Screen%201%20copy.png" width="200" alt="Home"> | <img src="projects/Reverie/Screenshot%205%20-%20My%20Spaces%20copy.png" width="200" alt="My Spaces"> | <img src="projects/Reverie/Screenshot%206%20-%20Community%20copy.png" width="200" alt="Community"> | <img src="projects/Reverie/Screenshot%208%20-%20Timeline%20copy.png" width="200" alt="Timeline"> |

Mobile-first social platform for readers — curated reading spaces, community threads, personal timelines, and a saved-books library. Designed for calm, editorial UI with genuine community feel.

**Stack:** React Native · Node.js · Express · MongoDB · JWT Auth

---

### <img src="projects/Ghibli%20Guardians/logo.png" height="20" align="center" alt=""> Ghibli Guardians — Data Dashboard

| Dashboard | Statistics | Mobile |
|---|---|---|
| <img src="projects/Ghibli%20Guardians/dashboard.png" width="200" alt="Dashboard"> | <img src="projects/Ghibli%20Guardians/backend.png" width="200" alt="Statistics"> | <img src="projects/Ghibli%20Guardians/mobile.png" width="200" alt="Mobile"> |

Analytics dashboard styled around Studio Ghibli's visual language, built to explore environmental and ecological data. Privacy-first design with protected user profiles and a fully responsive layout.

**Stack:** React · D3.js · Node.js · PostgreSQL · Tailwind CSS

---

### <img src="projects/NAU%20Portal/logo.jpg" height="20" align="center" alt=""> NAU Portal — University Platform

| Dashboard | Statistics |
|---|---|
| <img src="projects/NAU%20Portal/Dashboard.png" width="200" alt="NAU Dashboard"> | <img src="projects/NAU%20Portal/Statistics.png" width="200" alt="NAU Statistics"> |

Student portal for Northern Arizona University consolidating course management, academic statistics, and campus resources into one cohesive interface. Designed with accessibility and international student needs in mind.

**Stack:** React · Node.js · PostgreSQL · REST API · Tailwind CSS

---

## Interactive Mini-Games

### Half Moon
A lunar memory game. All 8 moon phase cards are revealed for a brief memorisation window, then flip face-down. The player must tap them back in correct lunar order from memory. Timed scoring with a perfect-round bonus.

### Palette Oracle
A color intuition quiz. Each round presents a 5-swatch palette with one color hidden — the player picks which of four options completes the palette's story. Every palette has a title and narrative theme; the correct answer is the most chromatically distinctive hue. 100+ handcrafted palettes across categories from *Kiln Garden* and *Moonlit Conservatory* to *Velvet Debug*.

### Sand Canvas
A real-time falling-sand physics simulation inspired by [thisissand.com](https://thisissand.com). Key mechanics:

| Feature | Detail |
|---|---|
| **Physics** | 1 px grains in a `Uint32Array` grid; 6 physics substeps per frame with free-fall + landing roll cascade |
| **Flow control** | Gaussian spray brush with adjustable density (slider 1–20); rate-limited to one brush stamp per rendered frame so speed is consistent whether the pointer is still or moving |
| **Colors** | Pick from spectrum strip or presets; save singles or build multi-stop gradients (2–8 colors) |
| **Gradient mode** | Saved gradients sweep in a ping-pong cycle controlled by a deterministic `gradientPhase` counter |
| **Continuous pour** | Double-tap canvas to lock pour on; pulsing outline confirms the lock |
| **Shake** | Redistributes settled grains randomly |
| **Export** | Save canvas as PNG |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 — semantic elements, ARIA roles and labels throughout |
| Styling | CSS3 · Tailwind CSS (CDN) · CSS custom properties for theming |
| Scripting | Vanilla JavaScript — no framework, no bundler |
| Audio | Web Audio API (synthesised SFX) · HTML Audio (MP3 loops with JS fade) |
| Icons | Streamline Freehand & Ultimate (PNG) · Lucide · Iconify |
| Fonts | Playfair Display · Inter (Google Fonts) |
| Contact | Web3Forms API |
| Hosting | GitHub Pages |

---

## Theming

Full **light / dark mode** with `localStorage` persistence and OS preference detection. Switching also updates the browser tab favicon instantly via cache-busting. CSS custom properties in `styles/main.css`:

| Token | Light | Dark |
|---|---|---|
| `--color-accent` | `#941b0c` crimson | `#FFA618` amber |
| `--color-bg` | `#fff7ed` cream | `#020617` |
| `--color-surface` | `#fffdf9` | `#0f172a` |
| `--color-text` | `#2a120c` | `#ffffff` |

---

## Project Structure

```
ayse-sule-ekiz-portfolio/
├── index.html                    # Landing / home
├── projects.html                 # Technical projects + detail pop-ups
├── playground.html               # Three mini-games
├── about.html                    # About + contact form
├── resume.html                   # Résumé viewer
├── graphicdesign.html            # Graphic design gallery
├── ceramics.html                 # Ceramics gallery
├── painting.html                 # Painting gallery
│
├── styles/
│   ├── main.css                  # Theme tokens, dark mode, header/footer
│   ├── cards.css                 # Masonry grid + gallery card styles
│   ├── animations.css            # Scroll-reveal keyframes
│   └── nav-dropdown.css          # Mobile navigation drawer
│
├── js/
│   ├── portfolio-mini-games.js   # Palette Oracle + Sand Canvas
│   ├── half-moon-game.js         # Half Moon memory game
│   ├── sfx.js                    # Web Audio sound effects
│   ├── theme-toggle.js           # Light/dark toggle + favicon swap
│   └── scroll-animations.js      # Intersection Observer scroll reveals
│
├── images/
│   ├── logo-light.png            # Site logo (light mode)
│   ├── logo-dark.png             # Site logo (dark mode)
│   ├── icons/                    # Streamline PNG icons
│   ├── ceramics/
│   ├── paintings/
│   └── dijital_art/
│
├── projects/                     # Per-project assets (logo, screenshots)
│   ├── OpenStaxAlign/
│   ├── Obi/
│   ├── Whisperwind Grove/
│   ├── Reverie/
│   ├── Ghibli Guardians/
│   └── NAU Portal/
│
├── moon_phases/                  # Moon phase images for Half Moon game
└── sfx/                          # MP3 audio files for Sand Canvas
```

---

## Run Locally

No build step required — open any page directly or serve the directory:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .

# VS Code
# Install "Live Server" → click "Go Live"
```

Then open `http://localhost:8000`.

---

## Design Notes

- **No JavaScript frameworks** — every interaction (game loops, palette state, drag-and-drop, modal animations) is vanilla JS with no runtime dependencies
- **Masonry layout** — pure CSS `column-count` with `break-inside: avoid`; no JS layout library
- **Icon colorization** — Streamline PNG icons are tinted to match accent tokens via computed CSS `filter` chains rather than SVG fills, so they respond to theme changes automatically
- **Sand canvas physics** — 1 px grains packed into a `Uint32Array` buffer; gravity runs 6 substeps per frame; each grain free-falls one cell per substep then cascades diagonally up to 4 times on landing; Gaussian brush spray gives a natural cone rather than a hard disc
- **Sound design** — Web Audio API synthesis for all in-game sounds; MP3 loops with JS fade-in/out for sand pour audio; global mute persists across pages
