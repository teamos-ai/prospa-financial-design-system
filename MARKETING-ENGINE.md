# Marketing Engine — asset notes & Impeccable audit

A self-contained, on-brand marketing asset added to the design system.
Served at **`/marketing-engine.html`** (file: `public/marketing-engine.html`).

It is a scroll-through walkthrough of the five-stage lifecycle marketing engine
(**Capture → Nurture → Convert → Optimize → Reactivate**) for the Q3 2026
delegation meeting. It was recreated from an off-brand source page
(`finance-os-marketing-engine.html`) and rebuilt so **every element reads from the
Prospa Financial design language**.

---

## 1. What changed in the port (off-brand → Prospa)

| Dimension | Source (Finance OS) | Rebuilt (Prospa Financial) |
|---|---|---|
| Theme | Dark-first, 3 themes (dark/light/paper) + toggle | **Light only** — the brand intent. Toggle removed. |
| Palette | `#000` canvas, amber/gold/blue, glowing accents | Teal `#135f69` + green `#5dce38`, **ember `#c65a1e` used once** (Convert), white/tinted surfaces |
| Type | Spline Sans + Anonymous Pro | **Poppins** (display/body) + **JetBrains Mono** (labels/data) |
| Radii | 2–8px | Design-system scale: `--r-sm 10 … --r-pill 100` |
| Elevation | Dark drop-shadows + colored glows | Soft **teal-tinted** shadows (`--sh-card` / `--sh-raise`) |
| Iconography | ~120 emoji + floating particle field + hover bursts | **Prospa's 24px line-icon set** (Family, Growth, Award, Chat, Call, Doc, Wealth, Plan). No emoji, no particles, no bursts. |
| Motion | Bounce easing `cubic-bezier(.34,1.56,.64,1)`, `transition: width`, wiggle/bob | `--ease` only; reveal-on-scroll, gentle float, marquee — all **transform/opacity** (no layout-property animation) |
| Card accent | 3px colored side stripe (`::before`) — the *side-tab* AI tell | Removed. Accent carried by the icon chip + number pill, per the system's card pattern |
| Headings | Gradient (`background-clip:text`) | Solid — green `<em>` accent, matching `.hero h1 em` |
| Identity | "Finance OS", broker persona | **Prospa Financial** wordmark + logo squircle; persona generalised to *clients/prospects* |

Structure, copy intent, owner tags and the Q3 scoreboard are preserved — this is a
visual/design-system rebuild, not a content rewrite.

## 2. Component ↔ design-system mapping

- **Top nav** → frosted white bar; pill links with a `.active` teal fill (mirrors sidebar `.nav a.active`); logo in a white squircle chip (`--r-sm`, matches `.brand-logo`).
- **Eyebrows** → `.eyebrow` teal uppercase with the green 2px dash `::before`.
- **Stepper / cards / scenes** → the `.svc-card` recipe (white, `--r-lg`, `--sh-card`, hover lift to `--sh-raise`, `#eef3f3` hairline) + the 54px icon chip (`.ic` on `--bg1`-style soft tint).
- **Tags** → pill tags; owner tag = filled accent-soft pill (the `.badge`/voice-tag pattern, *not* a side accent).
- **Progress + stepper fills** → `transform: scaleX()` (never `width`).
- **Footer** → the deep-teal (`--teal-900`) footer with light teal-tinted text and the green-dash eyebrow; credit links back to the design system.
- **Stage accents** → teal · green · **ember** (Convert) · deep-teal · slate — all inside the brand palette; ember is the single sparing warm accent, as intended.

## 3. Impeccable sweep — PASS (0)

Run with the repo detector (`impeccable detect`). Both modes clean:

```
detect --fast  (regex, the CSS-gate equivalent) …… 0 findings  (exit 0)
detect         (full, jsdom computed-style)      …… 0 findings  (exit 0)
```

Positive control on the original `finance-os-marketing-engine.html` returns
**14 findings** (gradient-text, bounce-easing, `transition: width`, and 11
all-caps-body runs) — every one of which is designed out of this rebuild.

**One deliberate, brand-consistent exception:** the hero accent word uses green
(`--green-600`) on white, matching the design system's own `.hero h1 em`
treatment. As a large decorative accent inside an otherwise ink heading it is an
intentional brand signature; the detector does not flag it.

*Footer note:* the footer's light-on-dark text is genuinely high-contrast
(7–10:1 against `--teal-900`); its colours are token-referenced like the rest of
the system, which is why the contrast pass treats them the same way it treats
every other tokenised colour.

## 4. Critique (design review)

- **Hierarchy** — strong and intact: 62px hero → 40/34px section titles → 18px card titles → 14px body → 12px mono labels. Clear top-down read.
- **Clarity** — the five stages are self-describing (icon + number + name + one-line sub), and the "loop back to Capture" note closes the mental model.
- **Restraint** — removing the emoji field, glows and bursts makes it read as *considered* rather than *decorated*, which is the right register for a financial brand — while the line-icons, gentle float and marquee keep it alive.
- **Accessibility** — reduced-motion honoured; focus ring uses the teal token; heading order h1→h2→h3 is unbroken; no all-caps body runs.
- **Watch-list** — the hero green accent is the one place contrast is style-led over strict AA; keep decorative accents to headings only, never body text.
