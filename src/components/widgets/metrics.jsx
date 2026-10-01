/* ============================================================
   WIDGETS 17–22 — metrics and charts.
   ============================================================ */
import { Figure, Grow, SweepRing, useSeen } from './motion.jsx'
import { CheckRing, TrendDown, TrendUp } from './glyphs.jsx'
import { BAR, FULL, LIGHT, SWEEP_BAR, TRACK } from './tones.js'

/* A signed change. Up reads green, down ember — the brand semantic. */
function Delta({ value, unit = '%', period }) {
  const up = value >= 0
  return (
    <span className={'w-delta ' + (up ? 'up' : 'down')}>
      {up ? <TrendUp /> : <TrendDown />}
      {up ? '+' : ''}
      {value}
      {unit}
      {period && <span> {period}</span>}
    </span>
  )
}

/* ── 17 · Metric strip ───────────────────────────────────────────────
   Four framed figures with a brand rule that wipes in along the base. */
export function MetricStrip({ items, period }) {
  return (
    <div className="w-strip">
      {items.map((m, i) => (
        <div className="w-strip-cell" key={m.label}>
          <span className="w-label">{m.label}</span>
          <Figure
            value={m.value}
            prefix={m.prefix}
            suffix={m.suffix}
            decimals={m.decimals}
            className="w-value-sm"
          />
          <span style={{ display: 'block' }}>
            <Delta value={m.delta} period={period} />
          </span>
          <span className="w-strip-rule">
            <Grow pct={100} delay={100 + i * 80} style={{ backgroundImage: SWEEP_BAR }} />
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── 18 · Category donut ─────────────────────────────────────────────
   One conic gradient with hard stops, masked into a ring, sweeping to
   full as it enters. Segments are [{ label, value, accent }]. */
export function CategoryDonut({ segments, totalLabel, totalValue }) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1
  let acc = 0
  const stops = segments.map((s) => {
    const from = acc / total
    acc += s.value
    const to = acc / total
    return `${FULL[s.accent]} calc(var(--w-arc) * ${from.toFixed(4)}) calc(var(--w-arc) * ${to.toFixed(4)})`
  })

  return (
    <div className="w-donut">
      <SweepRing pct={100} size={128} thickness={20} stops={[TRACK]} track={TRACK}>
        <span
          aria-hidden="true"
          className="w-donut-fill"
          style={{ background: `conic-gradient(from -90deg, ${stops.join(', ')}, transparent var(--w-arc))` }}
        />
        <span className="w-value-sm">{totalValue}</span>
        <span className="w-label">{totalLabel}</span>
      </SweepRing>
      <ul className="w-legend">
        {segments.map((s) => (
          <li key={s.label}>
            <i aria-hidden="true" className="w-dot" style={{ background: FULL[s.accent] }} />
            <span className="w-fill">{s.label}</span>
            <Figure value={Math.round((s.value / total) * 100)} suffix="%" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── 19 · Progress rows ──────────────────────────────────────────────── */
export function ProgressRows({ rows }) {
  return (
    <ul className="w-rows">
      {rows.map((r, i) => (
        <li key={r.label}>
          <div className="w-rows-head">
            <span>{r.label}</span>
            <b>
              <Figure value={r.value} suffix="%" />
            </b>
          </div>
          <div className="w-track w-track-sm">
            <Grow pct={r.value} delay={i * 100} style={{ backgroundImage: BAR[r.accent] }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ── 20 · Ticked gauge ───────────────────────────────────────────────
   Thirteen ticks sweeping teal into green, lighting up one at a time. */
const TICKS = [
  FULL.teal, FULL.teal, FULL.teal,
  LIGHT.teal, LIGHT.teal, LIGHT.teal, LIGHT.teal,
  LIGHT.green, LIGHT.green, LIGHT.green,
  FULL.green, FULL.green, FULL.green,
]
export function TickedGauge({ value, unit }) {
  const { ref, seen } = useSeen(0.4)
  const count = TICKS.length
  const lit = Math.round((Math.max(0, Math.min(100, value)) / 100) * count)
  return (
    <div className="w-gauge-ticked">
      <div className="w-gauge" style={{ maxWidth: 240 }}>
        <svg ref={ref} viewBox="0 0 200 108" role="img" aria-label={`${value}% ${unit}`}>
          {TICKS.map((c, i) => {
            const a = Math.PI - (i / (count - 1)) * Math.PI
            const on = i < lit
            return (
              <line
                key={i}
                className={'w-tick' + (seen ? ' in' : '')}
                x1={100 + Math.cos(a) * 84}
                y1={100 - Math.sin(a) * 84}
                x2={100 + Math.cos(a) * 74}
                y2={100 - Math.sin(a) * 74}
                strokeWidth="4"
                strokeLinecap="round"
                stroke={on ? c : TRACK}
                style={{ transitionDelay: on ? `${i * 70}ms` : '0ms' }}
              />
            )
          })}
        </svg>
      </div>
      <div className="w-gauge-face">
        <Figure value={value} suffix="%" className="w-value" />
        <span className="w-label">{unit}</span>
      </div>
    </div>
  )
}

/* ── 21 · Goal progress ──────────────────────────────────────────────── */
export function GoalProgress({ label, current, target, onTrack }) {
  return (
    <div className="w-goal">
      <div className="w-between">
        <span className="w-label">{label}</span>
        {onTrack && (
          <span className="w-chip w-chip-green">
            <CheckRing /> On track
          </span>
        )}
      </div>
      <p className="w-goal-value">
        <Figure value={current} prefix="$" />
        <span> / ${target.toLocaleString('en-AU')}</span>
      </p>
      <div className="w-track w-track-md">
        <Grow pct={(current / target) * 100} style={{ backgroundImage: SWEEP_BAR }} />
      </div>
      <div className="w-goal-axis">
        <span>$0</span>
        <span>Halfway</span>
        <span>Target</span>
      </div>
    </div>
  )
}

/* ── 22 · Comparison ─────────────────────────────────────────────────── */
export function Comparison({ current, previous, currentLabel, previousLabel, unit }) {
  const { ref, seen } = useSeen(0.5)
  const diff = current - previous
  const pct = previous ? Math.round((diff / previous) * 1000) / 10 : 0
  return (
    <div className="w-compare" ref={ref}>
      <div className="w-compare-row">
        <div className="w-compare-side">
          <span className="w-label">{currentLabel}</span>
          <Figure value={current} className="w-value" />
        </div>
        <div className="w-compare-vs">
          <span>vs</span>
        </div>
        <div className="w-compare-side prev">
          <span className="w-label">{previousLabel}</span>
          <Figure value={previous} className="w-value" />
        </div>
      </div>
      <p className={'w-compare-foot' + (seen ? ' in' : '')}>
        {diff >= 0 ? '+' : ''}
        {diff} {unit} ({diff >= 0 ? '+' : ''}
        {pct}%)
      </p>
    </div>
  )
}
