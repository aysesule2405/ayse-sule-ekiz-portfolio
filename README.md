<p align="center">
  <img src="images/logo-light.png" alt="Ayse Sule Ekiz" width="80" height="80" style="border-radius:50%;">
</p>

<h1 align="center">Ayse Sule Ekiz — Portfolio</h1>

<p align="center">
  A hand-crafted, multi-page personal portfolio for <strong>software projects, visual art, ceramics, painting, charcoal, and graphic design</strong>.<br>
  Built entirely with vanilla HTML, CSS, and JavaScript — no framework, no build step.
</p>

<p align="center">
  The visual identity pairs a warm cream-and-crimson light mode with an amber-accented dark mode, running through every page: masonry gallery cards, project catalog pop-ups, interactive mini-games, and a hand-illustrated moon motif.
</p>

---

## Pages

| Page | Description |
|---|---|
| `index.html` | Landing page with animated hero and editorial art section |
| `projects.html` | Technical project cards with expandable catalog pop-ups |
| `about.html` | Personal story, roots, contact form, and sand canvas game |
| `playground.html` | Three interactive mini-games (Half Moon, Oracle, Sand Canvas) |
| `resume.html` | Downloadable résumé with inline preview |
| `graphicdesign.html` | Graphic design gallery (masonry layout) |
| `ceramics.html` | Ceramics gallery |
| `painting.html` | Painting gallery |

---

## Projects Showcased

### <img src="projects/OpenStaxAlign/logo.png" height="22" align="center" alt=""> OpenStaxAlign — Rice Datathon 2026
**OpenStax Track Winner · 2nd Place Overall**

![OpenStaxAlign dashboard](projects/OpenStaxAlign/bg.png)

An NLP pipeline that maps textbook sections to educational standards automatically. Built end-to-end in a single hackathon day: raw JSON ingestion → TF-IDF vectorization → class-weighted Linear SVM → stratified cross-validation. Achieved **75% validation accuracy** on a severely imbalanced multi-class label space.

**Stack:** Python · scikit-learn · TF-IDF · Linear SVM · MongoDB · Logistic Regression

---

### <img src="projects/Obi/logo.png" height="22" align="center" alt=""> Obi — Local AI Desktop Assistant
**LA Hacks 2026 · Figma UI Challenge Winner**

| Homepage | Chat & Search |
|---|---|
| ![Obi homepage](projects/Obi/homepage.png) | ![Obi chat](projects/Obi/chat_search.png) |

Cross-platform AI desktop assistant with a locally-hosted Gemma LLM, sub-second contextual responses, and zero cloud dependency. Winner of the Figma UI Challenge at LA Hacks 2026.

**Stack:** Electron · Vite · Gemma LLM · RAG Pipeline · Local AI

---

### <img src="projects/Whisperwind%20Grove/logo.png" height="22" align="center" alt=""> Whisperwind Grove — CS Senior Capstone

![Whisperwind Grove](projects/Whisperwind%20Grove/whisperwind-grove.copy.jpg)

| Delivery on the Wind | Rise of the Half Moon | Spirit Drift |
|---|---|---|
| ![Scene 1](projects/Whisperwind%20Grove/delivery-on-the-wind%20copy.png) | ![Scene 2](projects/Whisperwind%20Grove/rise-of-the-half-moon%20copy.png) | ![Scene 3](projects/Whisperwind%20Grove/spirit-drift%20copy.png) |

A full-stack capstone platform with four playable worlds, achievements, leaderboards, and AI-assisted interactions. Full marks for systems integration.

**Stack:** React · TypeScript · Phaser · Gemini AI

---

### <img src="projects/Reverie/logo.jpg" height="22" align="center" alt=""> Reverie — Social Reading App

| Home | My Spaces | Community | Timeline |
|---|---|---|---|
| ![Home](projects/Reverie/Screenshot%201%20-%20Home%20Screen%201%20copy.png) | ![Spaces](projects/Reverie/Screenshot%205%20-%20My%20Spaces%20copy.png) | ![Community](projects/Reverie/Screenshot%206%20-%20Community%20copy.png) | ![Timeline](projects/Reverie/Screenshot%208%20-%20Timeline%20copy.png) |

A mobile-first social platform for readers: curated reading spaces, community discussion threads, personal timelines, and a saved-books library. Designed with an emphasis on calm, editorial UI and genuine community feel.

**Stack:** React Native · Node.js · Express · MongoDB · JWT Auth

---

### <img src="projects/Ghibli%20Guardians/logo.png" height="22" align="center" alt=""> Ghibli Guardians — Data Dashboard

| Dashboard | Statistics | Mobile |
|---|---|---|
| ![Dashboard](projects/Ghibli%20Guardians/dashboard.png) | ![Stats](projects/Ghibli%20Guardians/backend.png) | ![Mobile](projects/Ghibli%20Guardians/mobile.png) |

An analytics dashboard styled around Studio Ghibli's visual language, built to explore environmental and ecological data. Privacy-first design with protected user profiles and a responsive layout across all screen sizes.

**Stack:** React · D3.js · Node.js · PostgreSQL · Tailwind CSS

---

### <img src="projects/NAU%20Portal/logo.jpg" height="22" align="center" alt=""> NAU Portal — University Platform

| Dashboard | Statistics |
|---|---|
| ![NAU Dashboard](projects/NAU%20Portal/Dashboard.png) | ![NAU Stats](projects/NAU%20Portal/Statistics.png) |

A student portal for Northern Arizona University that consolidates course management, academic statistics, and campus resources into one cohesive interface. Designed with accessibility and global student needs in mind.

**Stack:** React · Node.js · PostgreSQL · REST API · Tailwind CSS

---

## Interactive Mini-Games

### Half Moon
A memory game built around the lunar cycle. All 8 moon phase cards are revealed for a brief memorisation period, then flip face-down. The player must click them back in correct lunar order from memory.

### Palette Oracle
Guess which color in a curated 5-swatch palette is the "story color" — the most distinctive hue in the palette's narrative. 100+ palettes with names like *Kiln Garden*, *Moonlit Conservatory*, and *Velvet Debug*.

### Sand Canvas
A real-time falling-sand physics simulation inspired by [thisissand.com](https://thisissand.com).

- **Single colors** — pick from presets or the spectrum strip, save to your palette
- **Gradient builder** — accumulate 2–8 colors, save as a gradient swatch; grains cycle in a ping-pong sweep
- **Double-tap to lock** — continuous-pour mode without holding; pulsing outline confirms the lock
- **Shake to scatter** — tilt/shake (mobile) or the shake button to redistribute grains
- Palette supports mixed single-color and gradient swatches side-by-side

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic, ARIA-labeled) |
| Styling | CSS3 · Tailwind CSS (CDN) · CSS custom properties |
| Scripting | Vanilla JavaScript (no framework) |
| Audio | Web Audio API · HTML Audio (MP3) |
| Icons | Streamline Freehand & Ultimate (PNG) · Lucide · Iconify |
| Fonts | Playfair Display · Inter (Google Fonts) |
| Contact | Web3Forms API |
| Hosting | GitHub Pages — no build step required |

---

## Theming

Full **light / dark mode** toggle stored in `localStorage`. CSS custom properties in `styles/main.css` define both themes:

| Token | Light | Dark |
|---|---|---|
| `--color-accent` | `#941b0c` (crimson) | `#FFA618` (amber) |
| `--color-bg` | `#fff7ed` (cream) | `#020617` |
| `--color-surface` | `#fffdf9` | `#0f172a` |
| `--color-text` | `#2a120c` | `#ffffff` |

---

## Project Structure

```
ayse-sule-ekiz-portfolio/
├── index.html              # Landing / home
├── projects.html           # Technical projects + catalog pop-ups
├── about.html              # About, contact, sand canvas game
├── playground.html         # Three mini-games
├── resume.html             # Résumé viewer
├── graphicdesign.html      # Graphic design gallery
├── ceramics.html           # Ceramics gallery
├── painting.html           # Painting gallery
│
├── styles/
│   ├── main.css            # Global theme tokens, dark mode, header/footer
│   ├── cards.css           # Masonry grid + card styles for gallery pages
│   ├── animations.css      # Scroll-reveal and keyframe animations
│   └── nav-dropdown.css    # Mobile navigation
│
├── js/
│   ├── portfolio-mini-games.js   # Palette Oracle + Sand Canvas logic
│   ├── half-moon-game.js         # Half Moon memory game
│   ├── sfx.js                    # Web Audio sound effects
│   ├── theme-toggle.js           # Light/dark toggle + persistence
│   └── scroll-animations.js     # Intersection observer scroll reveals
│
├── images/
│   ├── logo-light.png      # Site logo (light mode)
│   ├── logo-dark.png       # Site logo (dark mode)
│   ├── icons/              # Streamline Freehand/Ultimate PNGs
│   ├── ceramics/
│   ├── paintings/
│   └── dijital_art/
│
├── projects/
│   ├── OpenStaxAlign/
│   ├── Obi/
│   ├── Whisperwind Grove/
│   ├── Reverie/
│   ├── Ghibli Guardians/
│   └── NAU Portal/
│
├── moon_phases/            # Moon phase images for Half Moon game
└── sfx/                    # MP3 audio files for Sand Canvas
```

---

## Run Locally

No build step — open directly or serve statically:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .

# VS Code
# Install "Live Server" and click "Go Live"
```

Then visit `http://localhost:8000`.

---

## Design Notes

- **No JavaScript frameworks** — every interaction (game loops, palette state, drag-and-drop, modal animations) is vanilla JS
- **Masonry layout** — CSS `column-count`, no JS library; cards use `break-inside: avoid`
- **Icon colorization** — Streamline PNG icons are tinted to match accent tokens using computed CSS `filter` chains rather than SVG fills
- **Sand canvas physics** — 2×2 pixel cells packed into a `Uint32Array`; gravity pass alternates scan direction each frame to prevent drift; gradient cycling uses a deterministic `gradientPhase` counter ping-ponging at 0.0025 per frame
- **Sound design** — Web Audio API synthesis for all game sounds; MP3 loops with JS fade-in/out for sand pour; global mute toggle
