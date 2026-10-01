/* ============================================================
   WIDGET TONES — the colour system every widget draws with.

   Prospa reads at full strength. The three accents are the brand's own
   data colours, the same ones the Power-Up calculators use, so a widget
   and a calculator sitting on the same page agree:

     green   a positive outcome — take-home, surplus, on track
     ember   a cost or an adverse result — interest, tax, a shortfall
     teal    the base or the principal
     neutral an unattributed remainder

   (The Health OS originals were pastel by rule — data never used full
   strength, because that brand must not read as loud. Prospa's own chart
   semantics win here; the light and soft shades below are kept for
   gradient partners, tinted grounds and empty tracks, not for the datum.)

   SVG fill and stroke cannot take a CSS custom property cleanly, so the
   hexes are mirrored here from tokens.css. Changing one means changing
   both — scripts/check-tones.mjs fails the build if they drift.
   ============================================================ */

/** Full strength — the datum itself. */
export const FULL = {
  teal: '#135f69',
  green: '#5dce38',
  ember: '#c65a1e',
  neutral: '#8fa3a5',
}

/** Light — a gradient partner, a second series, a lit tick. */
export const LIGHT = {
  teal: '#5fa6a4',
  green: '#a8e88f',
  ember: '#e9a87e',
  neutral: '#c2cccd',
}

/** Soft — tile and well fills, faces, tinted grounds. */
export const SOFT = {
  teal: '#e7efef',
  green: '#e8f5e2',
  ember: '#f9ece2',
  neutral: '#edf1f1',
}

/** Empty tracks and unlit ticks. */
export const TRACK = '#e6ecec'

/** Deep teal, for text that has to sit on a soft ground. */
export const INK = '#121212'
export const GRAY = '#616773'
export const WHITE = '#ffffff'

/** A tile or an avatar: full strength into soft, with white text on top. */
export const TILE = {
  teal: `linear-gradient(150deg, ${FULL.teal} 0%, ${LIGHT.teal} 100%)`,
  green: `linear-gradient(150deg, ${FULL.green} 0%, ${LIGHT.green} 100%)`,
  ember: `linear-gradient(150deg, ${FULL.ember} 0%, ${LIGHT.ember} 100%)`,
  neutral: `linear-gradient(150deg, ${FULL.neutral} 0%, ${LIGHT.neutral} 100%)`,
}

/** A soft tile, for avatars and faces that carry ink text. */
export const TILE_SOFT = {
  teal: `linear-gradient(140deg, ${LIGHT.teal} 0%, ${SOFT.teal} 100%)`,
  green: `linear-gradient(140deg, ${LIGHT.green} 0%, ${SOFT.green} 100%)`,
  ember: `linear-gradient(140deg, ${LIGHT.ember} 0%, ${SOFT.ember} 100%)`,
  neutral: `linear-gradient(140deg, ${LIGHT.neutral} 0%, ${SOFT.neutral} 100%)`,
}

/** A horizontal bar fill: light into full, so the bar reads as it fills. */
export const BAR = {
  teal: `linear-gradient(90deg, ${LIGHT.teal}, ${FULL.teal})`,
  green: `linear-gradient(90deg, ${LIGHT.green}, ${FULL.green})`,
  ember: `linear-gradient(90deg, ${LIGHT.ember}, ${FULL.ember})`,
  neutral: `linear-gradient(90deg, ${LIGHT.neutral}, ${FULL.neutral})`,
}

/**
 * The brand sweep, for rings, gauges and progress fills that measure one
 * thing rather than comparing several. Teal into green: base into growth.
 * Never reversed, and ember never joins it — ember means cost.
 */
export const SWEEP = [FULL.teal, LIGHT.teal, FULL.green]
export const SWEEP_BAR = `linear-gradient(90deg, ${FULL.teal}, ${LIGHT.teal}, ${FULL.green})`

/** The accents a widget prop will accept. */
export const ACCENTS = ['teal', 'green', 'ember', 'neutral']
