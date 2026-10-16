# Sakshee Sachan · Portfolio

My personal site: a single-page portfolio built with **React 18, Vite and Three.js**. It has no UI framework and no CSS library, and all content comes from one data file.

<!-- Replace with your deployed URL once it's live -->
**Live:** _coming soon_ · **LinkedIn:** [sakshee2518](https://www.linkedin.com/in/sakshee2518) · **Email:** sakshee.sachan003@gmail.com

---

## Highlights

- **"Ask about me" assistant:** press <kbd>/</kbd> on the site to open a chat that answers questions about my work. It's a small **intent classifier that runs entirely in the browser**: keyword scoring picks an intent, and the answer is built from the portfolio data. It's a pocket-sized version of the conversational AI products I build at work, and it needs no API keys or backend.
- **Interactive 3D hero:** a Three.js point-cloud sphere that follows the mouse and reacts to scroll. It's **code-split** so the text paints first, and it **pauses rendering when off-screen** to save GPU and battery.
- **Motion with restraint:**
  - The name appears letter by letter, and section titles wipe up from a mask.
  - Project cards tilt in 3D, with a spotlight that follows the cursor.
  - A timeline rail fills as you scroll, and two rows of skills scroll sideways in a loop.
- **Accessible by default:** every animation turns off for visitors with *reduce motion* enabled. The page also has keyboard focus styles, a mobile menu that can't be tabbed into while hidden, and screen-reader text for animated content.
- **Content-driven:** profile, experience, projects, skills and education all live in [`src/data/portfolio.js`](src/data/portfolio.js). Updating the site never means touching components.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, plain CSS (custom properties, no framework) |
| 3D | Three.js (lazy-loaded) |
| Build | Vite 5 |
| Fonts | Fraunces, Inter, JetBrains Mono (Google Fonts) |

## Run locally

Requires **Node 18+**.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Project structure

```
├── index.html                     # HTML shell, meta/SEO tags, fonts
├── vite.config.js                 # base: "./" so the build works on any host
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                   # React entry
    ├── App.jsx                    # page composition (section order)
    ├── assets/
    │   └── portrait.jpg           # About photo
    ├── data/
    │   └── portfolio.js           # ★ all site content
    ├── lib/
    │   └── assistant.js           # intent classifier behind "Ask about me"
    ├── hooks/
    │   ├── useReveal.js           # scroll-in animations
    │   └── useActiveSection.js    # highlights the current section in the nav
    ├── styles/
    │   ├── global.css             # design tokens, page styles, motion
    │   └── assistant.css          # chat widget styles
    └── components/
        ├── layout/                # Navbar, Footer
        ├── sections/              # Hero, About, Experience, Projects, Skills, Education, Contact
        ├── ui/                    # SectionHeading, ProjectCard, RotatingText, CountUp,
        │                          # ScrollProgress, Marquee, Cursor
        ├── three/                 # HeroScene (Three.js)
        └── assistant/             # AskAssistant chat widget
```

## Customising

| To change… | Edit |
| --- | --- |
| Any text, project, skill or job | `src/data/portfolio.js` |
| Featured (full-width) project | set `featured: true` on the project |
| Project link button | the project's `link` field (`""` hides it) |
| Employer-owned project | set `company: "Name"`; shows a *Private* badge instead of a link |
| Hero's rotating line | `profile.focus` |
| Assistant answers | add keywords or an intent in `src/lib/assistant.js` |
| Photo | replace `src/assets/portrait.jpg` (portrait orientation) |
| Colours | tokens at the top of `src/styles/global.css` (`--accent`, `--bg`, …) |

## Deploy

**Vercel / Netlify:** import the repo with build command `npm run build` and output directory `dist`. No other config is needed.

**GitHub Pages:**

```bash
npm run build
npx gh-pages -d dist
```

Then enable Pages for the `gh-pages` branch in the repo settings.

## Notes

Projects marked *Private · Spinify.AI* were built for my employer, so their source isn't public. I'm happy to walk through them in an interview.

The code is free to read and learn from. Please don't reuse the personal content (text, photo, project descriptions) as your own.
