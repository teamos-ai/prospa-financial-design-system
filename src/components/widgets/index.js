/* ============================================================
   THE WIDGET LIBRARY — thirty-one functional widgets.

   Ported from the Health OS design system and rebuilt on this system:
   plain JSX and token-driven CSS, no Tailwind, no Framer Motion, no icon
   dependency. Every widget takes real data as props, animates its
   measurement once as it comes into view, and settles on the final state
   under prefers-reduced-motion.

   Colour follows the brand semantic in tones.js — green is a positive
   outcome, ember a cost or an adverse result, teal the base, neutral an
   unattributed remainder. That is the same semantic the Power-Up
   calculators use, so a widget and a calculator agree on the same page.
   ============================================================ */
import '../../styles/widgets.css'

/* 01–08 · headline figures and live pieces */
export { StatTiles, GradientRing, CapacityMeter, TrendCard, LiveTimer, TrackingCluster, BarCluster, Countdown } from './figures.jsx'

/* 09–16 · relational pieces */
export { Avatar, Leaderboard, Agenda, ScoreGauge, BreakdownBar, ActivityHeatmap, RevenueCard, AvatarCluster, ConversionFunnel } from './relational.jsx'

/* 17–22 · metrics and charts */
export { MetricStrip, CategoryDonut, ProgressRows, TickedGauge, GoalProgress, Comparison } from './metrics.jsx'

/* 23–27 · scheduling and product controls */
export { MiniCalendar, SlotPicker, OnboardingStepper, PlanCard, ToggleSettings } from './scheduling.jsx'

/* 28–31 · activity, feedback and conversation */
export { ActivityFeed, RatingSummary, AssistantMessage, CheckIn } from './social.jsx'

/* The motion primitives, for building a widget of your own */
export { Figure, Grow, SweepRing, useSeen, useProgress, useReducedMotion, EASE } from './motion.jsx'

/* The colour system */
export { FULL, LIGHT, SOFT, TILE, TILE_SOFT, BAR, SWEEP, SWEEP_BAR, TRACK, ACCENTS } from './tones.js'
