/* ============================================================
   WIDGETS 09–16 — relational pieces that answer who, when and how much.
   ============================================================ */
import { Figure, Grow, useSeen } from './motion.jsx'
import { Plus } from './glyphs.jsx'
import { BAR, FULL, LIGHT, SOFT, SWEEP_BAR, TILE_SOFT, TRACK } from './tones.js'

/* ── Avatar — a soft monogram tile, shared by 09, 15 and 28. ─────────── */
export function Avatar({ initials, accent = 'teal', large, className }) {
  return (
    <span
      className={['w-avatar', large && 'w-avatar-lg', className].filter(Boolean).join(' ')}
      style={{ backgroundImage: TILE_SOFT[accent] }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

/* ── 09 · Leaderboard ────────────────────────────────────────────────── */
export function Leaderboard({ rows }) {
  const { ref, seen } = useSeen(0.3)
  const max = Math.max(...rows.map((r) => r.value))
  return (
    <ol className="w-board" ref={ref}>
      {rows.map((r, i) => (
        <li key={r.name}>
          <div className={'w-stagger w-board-row' + (seen ? ' in' : '')} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="w-board-rank">{i + 1}</span>
            <Avatar initials={r.initials} accent={r.accent} />
            <span className="w-board-main">
              <span className="w-name w-trunc">{r.name}</span>
              <span className="w-track w-track-sm">
                <Grow pct={(r.value / max) * 100} delay={i * 60} style={{ backgroundImage: BAR[r.accent] }} />
              </span>
            </span>
            <Figure value={r.value} className="w-name" />
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ── 10 · Agenda ─────────────────────────────────────────────────────
   Status reads through the chip, not through a coloured side border —
   the side-tab treatment is an anti-pattern this system designs out. */
const AGENDA_CHIP = {
  confirmed: 'w-chip-green',
  pending: 'w-chip-ember',
  new: 'w-chip-teal',
}
export function Agenda({ rows }) {
  const { ref, seen } = useSeen(0.3)
  return (
    <ul className="w-agenda" ref={ref}>
      {rows.map((r, i) => (
        <li key={r.time + r.title}>
          <div className={'w-stagger w-agenda-row' + (seen ? ' in' : '')} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="w-agenda-time">{r.time}</span>
            <span aria-hidden="true" className="w-agenda-rule" style={{ background: FULL[r.accent] }} />
            <span className="w-fill">
              <span className="w-name w-trunc" style={{ display: 'block' }}>
                {r.title}
              </span>
              <span className="w-label w-trunc" style={{ display: 'block' }}>
                {r.detail}
              </span>
            </span>
            <span className={'w-chip ' + AGENDA_CHIP[r.status]}>{r.status}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ── 11 · Score gauge ────────────────────────────────────────────────
   The same half-ring geometry the Executive Wealth Score uses. */
export function ScoreGauge({ value, max = 100, unit }) {
  const { ref, seen } = useSeen(0.4)
  const frac = Math.max(0, Math.min(1, value / max))
  return (
    <div className="w-gauge">
      <svg ref={ref} viewBox="0 0 200 108" role="img" aria-label={`${value} of ${max} ${unit}`}>
        <defs>
          <linearGradient id="w-gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={FULL.teal} />
            <stop offset="0.55" stopColor={LIGHT.teal} />
            <stop offset="1" stopColor={FULL.green} />
          </linearGradient>
        </defs>
        <path d="M16 100 A84 84 0 0 1 184 100" fill="none" stroke={TRACK} strokeWidth="14" strokeLinecap="round" />
        <path
          className={'w-gauge-arc' + (seen ? ' in' : '')}
          d="M16 100 A84 84 0 0 1 184 100"
          fill="none"
          stroke="url(#w-gauge-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          pathLength="1"
          style={{ strokeDasharray: `${frac} 1`, strokeDashoffset: seen ? 0 : frac }}
        />
      </svg>
      <div className="w-gauge-face">
        <Figure value={value} className="w-value" />
        <span className="w-label">{unit}</span>
      </div>
    </div>
  )
}

/* ── 12 · Breakdown bar ──────────────────────────────────────────────── */
export function BreakdownBar({ segments }) {
  const { ref, seen } = useSeen(0.4)
  const total = segments.reduce((a, s) => a + s.value, 0) || 1
  return (
    <div className="w-breakdown">
      <div className="w-breakdown-bar" ref={ref}>
        {segments.map((s, i) => (
          <span
            key={s.label}
            className={'w-breakdown-seg' + (seen ? ' in' : '')}
            style={{
              width: `${(s.value / total) * 100}%`,
              background: FULL[s.accent],
              transitionDelay: `${i * 180}ms`,
            }}
          />
        ))}
      </div>
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

/* ── 13 · Activity heatmap ───────────────────────────────────────────
   Five levels: an empty track, then green deepening to teal. `weeks` is
   an array of week arrays, each holding seven level indices 0–4. */
const HEAT = [TRACK, SOFT.green, LIGHT.green, FULL.green, FULL.teal]
export function ActivityHeatmap({ weeks, caption }) {
  const { ref, seen } = useSeen(0.3)
  const cells = weeks.flat()
  return (
    <div className="w-heat">
      <div className="w-heat-grid" ref={ref} role="img" aria-label={caption}>
        {cells.map((level, i) => (
          <span
            key={i}
            className={'w-heat-cell' + (seen ? ' in' : '')}
            style={{ background: HEAT[level], transitionDelay: `${i * 18}ms` }}
          />
        ))}
      </div>
      <div className="w-heat-foot">
        <span className="w-label">Mon to Sun</span>
        <span className="w-heat-key w-label">
          Less
          {HEAT.map((c) => (
            <i key={c} aria-hidden="true" style={{ background: c }} />
          ))}
          More
        </span>
      </div>
    </div>
  )
}

/* ── 14 · Revenue card ───────────────────────────────────────────────── */
export function RevenueCard({ collected, billed, categories }) {
  const max = Math.max(...categories.map((c) => c.value))
  return (
    <div className="w-revenue">
      <div>
        <div className="w-revenue-head">
          <Figure value={collected} prefix="$" className="w-value" />
          <span className="w-label">collected of ${billed.toLocaleString('en-AU')} billed</span>
        </div>
        <div className="w-track w-track-sm" style={{ marginTop: 'var(--s1)' }}>
          <Grow pct={(collected / billed) * 100} style={{ backgroundImage: SWEEP_BAR }} />
        </div>
      </div>
      <ul className="w-revenue-list">
        {categories.map((c, i) => (
          <li key={c.label}>
            <span className="w-revenue-label">{c.label}</span>
            <span className="w-track w-track-sm w-fill">
              <Grow pct={(c.value / max) * 100} delay={200 + i * 80} style={{ backgroundImage: BAR[c.accent] }} />
            </span>
            <Figure value={c.value} prefix="$" className="w-revenue-value" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── 15 · Avatar cluster ─────────────────────────────────────────────── */
export function AvatarCluster({ people, total, caption }) {
  const { ref, seen } = useSeen(0.4)
  return (
    <div className="w-avatars">
      <div className="w-avatars-row" ref={ref}>
        {people.map((p, i) => (
          <span
            key={p.initials + i}
            className={'w-pop' + (seen ? ' in' : '')}
            style={{ transitionDelay: `${i * 60}ms`, display: 'inline-flex' }}
          >
            <Avatar initials={p.initials} accent={p.accent} large />
          </span>
        ))}
        <span className="w-avatars-more">+{total - people.length}</span>
        <button type="button" className="w-avatars-add" aria-label="Add a person">
          <Plus />
        </button>
      </div>
      <p className="w-body">{caption}</p>
    </div>
  )
}

/* ── 16 · Conversion funnel ──────────────────────────────────────────── */
function FunnelBar({ pct, accent, delay, children }) {
  const { ref, seen } = useSeen(0.4)
  return (
    <div className="w-funnel-bar" ref={ref} style={{ width: `${pct}%` }}>
      <span
        aria-hidden="true"
        className={'w-funnel-fill' + (seen ? ' in' : '')}
        style={{
          backgroundImage: `linear-gradient(150deg, ${FULL[accent]}, ${LIGHT[accent]})`,
          transitionDelay: `${delay}ms`,
        }}
      />
      <b>{children}</b>
    </div>
  )
}

export function ConversionFunnel({ stages }) {
  const max = stages[0]?.value ?? 1
  return (
    <div className="w-funnel">
      {stages.map((s, i) => (
        <div className="w-funnel-row" key={s.label}>
          <span className="w-funnel-label">{s.label}</span>
          <span className="w-funnel-slot">
            <FunnelBar pct={(s.value / max) * 100} accent={s.accent} delay={i * 150}>
              <Figure value={s.value} />
            </FunnelBar>
          </span>
          <span className="w-funnel-note">{s.note}</span>
        </div>
      ))}
    </div>
  )
}
