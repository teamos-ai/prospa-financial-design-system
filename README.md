# Prospa Financial — Design System

The **Prospa Financial** brand & product design language, implemented as a React
component library and a living, single-page reference site. Built on deep teal
`#135f69`, vivid growth-green `#5dce38`, and the geometric clarity of Poppins — a calm,
trustworthy system for expert financial advice at every stage of life.

> Recreated from a Claude Design handoff bundle (`Prospa Financial Design System.html`),
> rebuilt component-by-component in React and audited to the **Impeccable** standard.

## Live reference

The site documents the full system, with scrollspy navigation:

- **Foundations** — Colour (click any swatch to copy its hex), Typography (Poppins +
  Montserrat, 6-step scale), Spacing (5px base unit), Radius & Elevation (10px → 100px
  pills, soft teal-tinted glows), Iconography (24px / 2px line set), Motion (250–1000ms).
- **Components** — Buttons (green primary "Book a Free Call" + teal / pill / outline /
  ghost), Cards (icon + numbered service variants), Forms (focus glow + error state +
  switch), Navigation, Badges, Accordion, Testimonial.
- **Brand** — Voice & Tone (do / don't guidance).
- **Applied** — *Three Items Lead Magnet*: the ten session tools built on this system for the
  Executive Financial Wellbeing Workshop, led by the Executive Wealth Score. Each card opens the
  live tool.

## Tech stack

- **React 18** + **Vite 5** — fast dev server and a static production build.
- Plain, token-driven **CSS** (no framework) — every value flows from
  [`src/styles/tokens.css`](src/styles/tokens.css).
- Zero runtime dependencies beyond React (~54 KB gzip JS).

## Getting started

```bash
npm install
npm run dev      # dev server (Vite)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  styles/
    tokens.css        # design tokens — the single source of truth
    styles.css        # component & layout styles (token-driven)
  data/
    tokens.js         # token data (colours, spacing, icons, type scale)
  components/          # reusable primitives
    Button, Badge, Icon, ServiceCard, Accordion,
    Field (forms), BrandMark, Sidebar, SectionHead, ToastProvider
  sections/           # the reference page, one file per section
    Hero, ColorSection, TypographySection, SpacingSection,
    RadiusSection, ButtonsSection, CardsSection, FormsSection,
    ComponentsSection, IconsSection, LibrarySection,
    LeadMagnetsSection, MotionSection, VoiceSection
  App.jsx             # composes sidebar + sections
  main.jsx            # entry point
```

## Using the components

```jsx
import Button from './components/Button.jsx'
import ServiceCard from './components/ServiceCard.jsx'

<Button variant="primary">Book a Free Call</Button>
<Button variant="outline" size="sm">View Services</Button>

<ServiceCard num="01" title="Goals Discovery">
  A transformative goal-discovery meeting to map the road ahead.
</ServiceCard>
```

## Quality

Audited with the **Impeccable** skill set — anti-pattern detector **PASS (0 findings)**,
Audit Health Score **19/20 (Excellent)**. Full report in [`AUDIT.md`](AUDIT.md).

## Deployment

Zero-config on **Vercel** — the Vite preset runs `npm run build` and serves `dist/`.
See [`vercel.json`](vercel.json).

## Three Items Lead Magnet

The *Three Items Lead Magnet* section documents the system in use. It links to ten session tools
for Prospa Financial's Executive Financial Wellbeing Workshop, served from
[`public/lead-magnets/`](public/lead-magnets) at `/lead-magnets/`:

| # | Tool | Type |
|---|---|---|
| 01 | **The Executive Wealth Score** — 18 questions, six weighted areas, a score out of 100 and a pattern engine | Scored assessment |
| 02 | Your Financial Freedom Number | Calculator |
| 03 | The Gap Years Map | Calculator |
| 04 | The Next Dollar Decision Map | Decision guide |
| 05 | The Three Wealth Buckets | Worksheet |
| 06 | The Bonus & Surplus Playbook | Planner |
| 07 | The Executive Super Cheatsheet | Cheatsheet |
| 08 | Wealth Structures, Compared | Comparison |
| 09 | The Income Protection Audit | Audit |
| 10 | The Estate & Beneficiary Checklist | Checklist |

They are plain static HTML with no build step, built on
[`lead-magnets/assets/prospa.css`](public/lead-magnets/assets/prospa.css) — a direct port of
[`tokens.css`](src/styles/tokens.css), so the two stay in step. Each sheet carries a print
stylesheet and exports as a clean A4 PDF; everything runs in the browser and nothing is collected.

**Source of truth:** [`teamos-ai/lm-prospa`](https://github.com/teamos-ai/lm-prospa). The copy here
exists so the reference site works standalone — update it there, then copy across. That repo also
holds `SCORING.md` (the Wealth Score model, its disclaimer and the approval items Prospa still
owns) and `CLAIMS.md` (every figure with its source).

## Notes

- The original `logo.svg` in the brand folder was a stray caret icon, not the real mark —
  so a clean green leaf/growth wordmark stands in ([`BrandMark`](src/components/BrandMark.jsx)).
  Drop in the real Prospa logo to replace it.
- Light theme only, by brand intent; the token layer is structured to add a dark theme later.

---

Melbourne, Australia · Financial advisory · Poppins · `#135F69` · `#5DCE38`
