/* ============================================================
   WIDGETS 01–08 — headline figures and live pieces.

   Every widget takes its data as props and animates its measurement
   into view. Ported from the Health OS library; the behaviour is the
   same, the colour and type are this system's.
   ============================================================ */
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { Figure, Grow, SweepRing, useSeen } from './motion.jsx'
import { Pause, Play, Stop, TrendDown, TrendUp } from './glyphs.jsx'
import { FULL, LIGHT, SOFT, SWEEP, SWEEP_BAR, TILE, WHITE } from './tones.js'

/* ── 01 · Stat tiles ──────────────────────────────────────────────────
   Three full-strength tiles, each carrying a white icon chip. Items are
   [{ label, value, icon, accent, suffix }] where `icon` names an entry in
   the icon set and `accent` is teal | green | ember | neutral. */
export function StatTiles({ items }) {
  const { ref, seen } = useSeen(0.4)
  return (
    <div className="w-tiles" ref={ref}>
      {items.map(({ label, value, icon, accent, suffix }, i) => (
        <div
          key={label}
          className={'w-tile' + (seen ? ' in' : '')}
          style={{ backgroundImage: TILE[accent], transitionDelay: `${i * 80}ms` }}
        >
          <span aria-hidden="true" className="w-bloom" />
          <span className="w-tile-ic">
            <Icon name={icon} size={22} />
          </span>
          <Figure value={value} suffix={suffix} className="w-value" />
          <span className="w-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── 02 · Gradient ring ──────────────────────────────────────────────── */
export function GradientRing({ value, unit, caption }) {
  return (
    <div className="w-ringblock">
      <SweepRing pct={value} size={132} thickness={13} stops={SWEEP}>
        <Figure value={value} suffix="%" className="w-value-sm" />
        <span className="w-label">{unit}</span>
      </SweepRing>
      <p className="w-body">{caption}</p>
    </div>
  )
}

/* ── 03 · Capacity meter ─────────────────────────────────────────────── */
export function CapacityMeter({ used, total, unit, note }) {
  return (
    <div className="w-meter">
      <div className="w-meter-head">
        <span className="w-value-sm">
          <Figure value={used} />
          <span className="w-meter-total"> / {total}</span>
        </span>
        <span className="w-label">{unit}</span>
      </div>
      <div className="w-track w-track-md">
        <Grow pct={(used / total) * 100} style={{ backgroundImage: SWEEP_BAR }} />
      </div>
      <div className="w-meter-foot">
        <span className="w-label w-label-ink">{total - used} open</span>
        {note && <span className="w-label">{note}</span>}
      </div>
    </div>
  )
}

/* ── 04 · Trend card ─────────────────────────────────────────────────
   The line draws itself in with a dash offset, the area fades up behind
   it, and the peak lands last. A rising delta reads green, a falling one
   ember — the brand semantic, not a traffic light. */
export function TrendCard({ label, value, suffix = '', delta, points }) {
  const { ref, seen } = useSeen(0.4)
  const max = Math.max(...points)
  const min = Math.min(...points)
  const coords = points.map((v, i) => [
    (i / (points.length - 1)) * 300,
    70 - ((v - min) / (max - min || 1)) * 56,
  ])
  const line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const peak = coords.reduce((a, b) => (b[1] < a[1] ? b : a))
  const up = delta >= 0

  return (
    <div className="w-trend">
      <div className="w-between">
        <span className="w-label">{label}</span>
        <span className={'w-chip ' + (up ? 'w-chip-green' : 'w-chip-ember')}>
          {up ? <TrendUp /> : <TrendDown />}
          {up ? '+' : ''}
          {delta}%
        </span>
      </div>
      <Figure value={value} suffix={suffix} className="w-value" />
      <svg ref={ref} viewBox="0 0 300 78" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="w-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={FULL.green} stopOpacity=".3" />
            <stop offset="1" stopColor={FULL.green} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="w-trend-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={FULL.teal} />
            <stop offset="1" stopColor={FULL.green} />
          </linearGradient>
        </defs>
        <path className={'w-trend-area' + (seen ? ' in' : '')} d={`${line} L300 78 L0 78 Z`} fill="url(#w-trend-fill)" />
        <path
          className={'w-trend-line' + (seen ? ' in' : '')}
          d={line}
          fill="none"
          stroke="url(#w-trend-line)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
        />
        <circle
          className={'w-trend-peak' + (seen ? ' in' : '')}
          cx={peak[0]}
          cy={peak[1]}
          r="4"
          fill={FULL.green}
          stroke={WHITE}
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

/* ── 05 · Live timer ─────────────────────────────────────────────────
   Starts counting once it is in view, so it never runs off-screen. */
export function LiveTimer({ label, startSeconds = 0 }) {
  const [elapsed, setElapsed] = useState(startSeconds)
  const [state, setState] = useState('running')
  const { ref, seen } = useSeen(0.4)

  useEffect(() => {
    if (!seen || state !== 'running') return
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [seen, state])

  const pad = (n) => String(n).padStart(2, '0')
  const h = Math.floor(elapsed / 3600)
  const m = Math.floor((elapsed % 3600) / 60)
  const s = elapsed % 60
  const running = state === 'running'

  return (
    <div className="w-timer" ref={ref}>
      <div className="w-between">
        <span className={'w-timer-state w-label' + (running ? ' w-label-ink' : '')}>
          <span className={'w-pulse ' + (running ? 'on' : 'off')}>
            <i />
          </span>
          {running ? 'Recording' : state === 'paused' ? 'Paused' : 'Stopped'}
        </span>
      </div>
      <p className="w-timer-clock" aria-live="off">
        {pad(h)}:{pad(m)}
        <span>:{pad(s)}</span>
      </p>
      <div className="w-timer-foot">
        <span className="w-body">{label}</span>
        <div className="w-row" style={{ gap: 'var(--s0)' }}>
          <button
            type="button"
            className="w-icon-btn"
            aria-label={running ? 'Pause' : 'Resume'}
            onClick={() => setState((v) => (v === 'running' ? 'paused' : 'running'))}
          >
            {running ? <Pause /> : <Play />}
          </button>
          <button
            type="button"
            className="w-icon-btn ghost"
            aria-label="Stop"
            onClick={() => {
              setState('stopped')
              setElapsed(0)
            }}
          >
            <Stop />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── 06 · Tracking cluster ───────────────────────────────────────────── */
export function TrackingCluster({ items }) {
  const pairs = {
    teal: [FULL.teal, LIGHT.teal],
    green: [LIGHT.green, FULL.green],
    ember: [LIGHT.ember, FULL.ember],
    neutral: [LIGHT.neutral, FULL.neutral],
  }
  return (
    <div className="w-cluster">
      {items.map((it) => (
        <div className="w-cluster-item" key={it.label}>
          <SweepRing pct={it.value} size={82} thickness={9} stops={pairs[it.accent]}>
            <Figure value={it.value} suffix="%" className="w-name" />
          </SweepRing>
          <span className="w-label">{it.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ── 07 · Bar cluster ────────────────────────────────────────────────
   This period against the one before it. Current reads teal (the base
   measure), previous reads neutral, so the comparison never implies a
   judgement the data does not carry. */
export function BarCluster({ series, currentLabel, previousLabel }) {
  const max = Math.max(...series.flatMap((s) => [s.current, s.previous]))
  return (
    <div className="w-col" style={{ gap: 'var(--s2)', width: '100%' }}>
      <div className="w-bars-legend">
        <span>
          <i className="w-dot" style={{ background: FULL.teal }} />
          {currentLabel}
        </span>
        <span>
          <i className="w-dot" style={{ background: LIGHT.neutral }} />
          {previousLabel}
        </span>
      </div>
      <div className="w-barcluster">
        {series.map((s, i) => (
          <div className="w-barcluster-group" key={s.label} title={`${s.label}: ${s.current} vs ${s.previous}`}>
            <Grow
              axis="y"
              pct={(s.current / max) * 100}
              delay={i * 50}
              style={{ background: `linear-gradient(180deg, ${FULL.teal}, ${LIGHT.teal})` }}
            />
            <Grow
              axis="y"
              pct={(s.previous / max) * 100}
              delay={i * 50 + 40}
              style={{ background: `linear-gradient(180deg, ${LIGHT.neutral}, ${SOFT.neutral})` }}
            />
          </div>
        ))}
      </div>
      <div className="w-barcluster-axis">
        {series.map((s) => (
          <span key={s.label}>{s.label}</span>
        ))}
      </div>
    </div>
  )
}

/* ── 08 · Countdown ──────────────────────────────────────────────────── */
export function Countdown({ target }) {
  const { ref, seen } = useSeen(0.4)
  const [now, setNow] = useState(() => Date.now())
  const targetMs = useRef(target instanceof Date ? target.getTime() : new Date(target).getTime())

  useEffect(() => {
    if (!seen) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [seen])

  const left = Math.max(0, Math.floor((targetMs.current - now) / 1000))
  const units = [
    { v: Math.floor(left / 86400), u: 'days', accent: 'teal' },
    { v: Math.floor((left % 86400) / 3600), u: 'hrs', accent: 'green' },
    { v: Math.floor((left % 3600) / 60), u: 'min', accent: 'ember' },
  ]

  return (
    <div
      className="w-countdown"
      ref={ref}
      role="timer"
      aria-label={`${units[0].v} days, ${units[1].v} hours, ${units[2].v} minutes remaining`}
    >
      {units.map((x, i) => (
        <span key={x.u} style={{ display: 'contents' }}>
          {i > 0 && (
            <span aria-hidden="true" className="w-countdown-sep">
              :
            </span>
          )}
          <div
            className={'w-countdown-cell' + (seen ? ' in' : '')}
            style={{ backgroundImage: TILE[x.accent], transitionDelay: `${i * 80}ms` }}
          >
            <span aria-hidden="true" className="w-bloom" />
            <b>{String(x.v).padStart(2, '0')}</b>
            <span>{x.u}</span>
          </div>
        </span>
      ))}
    </div>
  )
}
