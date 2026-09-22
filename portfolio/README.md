# Ponnana Rohit — Developer Portfolio

A minimal, monochromatic, modern single-page developer portfolio for **Ponnana Rohit**, a B.Tech Computer Science student specializing in **AI, Backend Development, and Full-Stack Development**.

Built with **React**, **Vite**, **Tailwind CSS v4**, **TypeScript**, and **Lucide Icons**.

---

## Features

- **Strictly Monochromatic Aesthetic**: Engineered around pure black, white, and balanced grayscale tones with high contrast and zero rainbow distractions.
- **Three-State Theme Engine**:
  - `System` (auto-synced with OS `prefers-color-scheme`)
  - `Light` (clean off-white surfaces with deep neutral accents)
  - `Dark` (sleek near-black canvas with white highlights)
  - Persisted dynamically in `localStorage`.
- **Typewriter Intro Sequence**: A typewriter intro (`Ponnana Rohit_`) fading into the hero section, fully respecting `prefers-reduced-motion`.
- **Live GitHub Activity Timeline**: Monochromatic contribution calendar for `@Rohit-96522` featuring interactive date/commit tooltips and grayscale intensity tiers.
- **Data-Driven Architecture**: All portfolio data (projects, tech stacks, certifications, social coordinates) is centralized in `src/data/portfolioData.ts`.
- **Large Featured Project Showcases**: Architectural breakdown for *PDS Slot Management System*, *Pro Audit*, and *Crop Residue Marketplace* with problem statements, tech badges, and source links.
- **Responsive Navigation**: Sticky header with section spy, compact scroll states, and a mobile drawer menu.
- **Accessibility First**: Semantic HTML5 landmarks, keyboard-friendly focus rings, and screen-reader labels.

---

## Project Structure

```text
portfolio/
├── public/                 # Static assets & icons
├── src/
│   ├── components/         # Reusable presentation components
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── GitHubActivity.tsx
│   │   ├── Hero.tsx
│   │   ├── Icons.tsx       # Crisp monochromatic brand SVGs
│   │   ├── IntroAnimation.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── Technologies.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/
│   │   └── portfolioData.ts # Centralized portfolio configuration
│   ├── hooks/
│   │   └── useTheme.ts     # Multi-theme state and media-query listener
│   ├── App.tsx             # Single-page orchestrator
│   ├── index.css           # Tailwind v4 directives & font styles
│   └── main.tsx            # Entry point
├── index.html              # Head metadata, Inter font, and anti-FOUC script
├── vite.config.ts          # Vite + Tailwind CSS plugin
└── package.json
```

---

## 1. Installation

Ensure you have [Node.js](https://nodejs.org/) (v18 or newer recommended).

```bash
# Clone or navigate into the portfolio directory
cd portfolio

# Install project dependencies
npm install
```

---

## 2. Local Development

Start the local Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 3. Production Build & Quality Checks

```bash
# Typecheck and create optimized production bundle
npm run build

# Preview the production build locally
npm run preview

# Run ESLint validation
npm run lint
```

---

## 4. Deployment

### Vercel (Recommended)
1. Push your code to GitHub.
2. Import your repository into [Vercel](https://vercel.com).
3. Set the **Root Directory** to `portfolio` (if the repo root contains the `portfolio` subfolder) or `./`.
4. Deploy — Vercel automatically detects Vite.

### Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Set **Base directory** to `portfolio`.
3. Set **Build command** to `npm run build`.
4. Set **Publish directory** to `portfolio/dist`.

### GitHub Pages
1. In `vite.config.ts`, add `base: '/<repository-name>/'` if deploying to a project page.
2. Deploy the generated `dist/` directory via GitHub Actions or the `gh-pages` branch.

---

## 5. Where to Edit Portfolio Information

All portfolio content is decoupled from UI logic in **`src/data/portfolioData.ts`**:

- **Personal Information**: Change your name, headline, bio, or education badge in `portfolioData.personal`.
- **Projects**: Add, modify, or remove projects in the `portfolioData.projects` array. Each project supports `title`, `description`, `problemSolved`, `technologies`, `githubUrl`, and optional `liveUrl`.
- **Technologies**: Categorized lists in `portfolioData.technologies` (`languages`, `frontend`, `backend`, `databases`, `tools`).
- **Certifications**: Add or edit certifications in `portfolioData.certifications`.
- **Social & Contact Links**:
  - `github`: `https://github.com/Rohit-96522`
  - `githubUsername`: `Rohit-96522`
  - `linkedin`: `https://www.linkedin.com/in/ponnana-rohit-026b7a350/`
  - `leetcode`: `https://leetcode.com/u/ponnanarohit/`
  - `codechef`: Insert your CodeChef profile URL when ready.
  - `email`: Insert your email (`mailto:your.email@example.com`) when ready.

---

## 6. How the Theme System Works

The theme system is managed by `src/hooks/useTheme.ts`:

1. **Storage**: The selected theme (`system`, `light`, or `dark`) is stored in `localStorage` under `'theme-preference'`.
2. **Flash Prevention (Anti-FOUC)**: An inline script in `index.html` evaluates the saved preference before the DOM renders, ensuring no white-to-dark or dark-to-white flash occurs on page reload.
3. **System Preference**: When `system` is selected, `window.matchMedia('(prefers-color-scheme: dark)')` attaches an active event listener so that if your OS theme changes between sunrise and sunset, the portfolio updates in real-time.
4. **Tailwind v4 Integration**: `@custom-variant dark (&:where(.dark, .dark *));` in `src/index.css` triggers Tailwind's `dark:` classes whenever `.dark` is applied to the root `<html>` element.

---

## License

MIT © [Ponnana Rohit](https://github.com/Rohit-96522)
