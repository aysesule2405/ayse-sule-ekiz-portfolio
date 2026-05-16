# Ayse Sule Ekiz Portfolio

A multi-page personal portfolio for software projects, visual art, ceramics, painting, charcoal, and graphic design. The site blends technical work with a warm visual identity built around light/dark themes, moon imagery, and handmade artwork.

## What It Includes

- Project cards with screenshots, tech tags, awards, links, and expandable details
- Gallery pages for graphic design, ceramics, painting, and charcoal work
- Light/dark theme toggle
- Responsive mobile navigation
- Interactive Half Moon mini-game
- Contact form powered by Web3Forms
- Custom CSS animations and masonry-style gallery cards

## Tech Stack

- HTML5
- CSS3
- Tailwind via CDN
- Vanilla JavaScript
- Lucide Icons via CDN
- Web3Forms contact submission

## Run Locally

No build step is required. Open `index.html` directly in a browser, or serve the folder with any static file server.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project Structure

- `index.html` - Home page
- `projects.html` - Technical and capstone projects
- `about.html` - About, contact form, and Half Moon game
- `resume.html` - Resume page
- `graphicdesign.html`, `ceramics.html`, `painting.html` - Art galleries
- `styles/` - Shared CSS
- `js/` - Shared interactions, theme handling, animations, and mini-game logic
- `images/`, `projects/`, `moon_phases/` - Portfolio assets

## Future Improvements

- Move repeated header/footer markup into a true static template or build step
- Add gallery filtering/search
- Optimize large images for faster page loads
- Add a deployed URL when the site goes live
