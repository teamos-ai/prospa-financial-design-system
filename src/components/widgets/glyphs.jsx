/* ============================================================
   WIDGET GLYPHS — the few small marks the widgets need beyond the
   24px line-icon set in data/tokens.js.

   The Health OS originals pulled these from lucide-react. This system
   carries no icon dependency, so they are drawn here at the same
   24px / 2px-stroke convention as the rest of the set. Solid marks
   (play, pause, stop, star) use fill rather than stroke.
   ============================================================ */

const line = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

export const TrendUp = ({ size = 13 }) => (
  <svg width={size} height={size} {...line}>
    <path d="M3 17 9 11l4 4 8-8" />
    <path d="M15 3h6v6" />
  </svg>
)

export const TrendDown = ({ size = 13 }) => (
  <svg width={size} height={size} {...line}>
    <path d="M3 7l6 6 4-4 8 8" />
    <path d="M15 21h6v-6" />
  </svg>
)

export const Check = ({ size = 13, strokeWidth = 3 }) => (
  <svg width={size} height={size} {...line} strokeWidth={strokeWidth}>
    <path d="m4 12.5 5.2 5.2L20 6.5" />
  </svg>
)

export const CheckRing = ({ size = 13 }) => (
  <svg width={size} height={size} {...line}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m7.8 12.4 2.9 2.9 5.5-5.9" />
  </svg>
)

export const Play = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15l13-7.5z" />
  </svg>
)

export const Pause = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="6" y="4.5" width="4" height="15" rx="1.2" />
    <rect x="14" y="4.5" width="4" height="15" rx="1.2" />
  </svg>
)

export const Stop = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="5" y="5" width="14" height="14" rx="2" />
  </svg>
)

/** A star, filled or outlined, for the rating summary. */
export const Star = ({ size = 17, filled, colour }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? colour : 'none'}
    stroke={colour}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95z" />
  </svg>
)

export const Plus = ({ size = 15 }) => (
  <svg width={size} height={size} {...line}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const Arrow = ({ size = 15 }) => (
  <svg width={size} height={size} {...line} strokeWidth={2.3}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)
