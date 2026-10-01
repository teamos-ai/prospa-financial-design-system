/* ============================================================
   WIDGETS 28–31 — activity, feedback and conversation.
   ============================================================ */
import { useEffect, useState } from 'react'
import { Figure, Grow, useReducedMotion, useSeen } from './motion.jsx'
import { Star } from './glyphs.jsx'
import { Avatar } from './relational.jsx'
import { FULL, INK, LIGHT, SOFT, TILE_SOFT } from './tones.js'

/* ── 28 · Activity feed ──────────────────────────────────────────────── */
export function ActivityFeed({ items }) {
  const { ref, seen } = useSeen(0.3)
  return (
    <ul className="w-feed" ref={ref} aria-live="polite">
      {items.map((it, i) => (
        <li key={it.actor + it.time} className={'w-pop' + (seen ? ' in' : '')} style={{ transitionDelay: `${i * 120}ms` }}>
          <Avatar initials={it.initials} accent={it.accent} />
          <span className="w-fill w-trunc w-name w-feed-text">
            <b>{it.actor}</b> {it.action}
          </span>
          <span className="w-feed-time">{it.time}</span>
        </li>
      ))}
    </ul>
  )
}

/* ── 29 · Rating summary ─────────────────────────────────────────────
   `distribution` runs five stars first. The stars are decorative — the
   average and the response count carry the meaning in text. */
export function RatingSummary({ average, count, distribution }) {
  const { ref, seen } = useSeen(0.4)
  const total = distribution.reduce((a, b) => a + b, 0) || 1
  return (
    <div className="w-rating" ref={ref}>
      <div className="w-rating-score">
        <Figure value={average} decimals={1} className="w-value" />
        <span className="w-rating-stars" aria-label={`${average} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={seen ? 'in' : undefined} style={{ transitionDelay: `${300 + i * 80}ms` }}>
              <Star filled={i < Math.round(average)} colour={FULL.green} />
            </span>
          ))}
        </span>
        <span className="w-label" style={{ display: 'block', marginTop: 'var(--s0)' }}>
          {count} responses
        </span>
      </div>
      <ul className="w-rating-dist">
        {distribution.map((n, i) => (
          <li key={i}>
            <span>{5 - i}</span>
            <span className="w-track w-track-sm w-fill">
              <Grow pct={(n / total) * 100} delay={i * 80} style={{ background: LIGHT.green }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── 30 · Assistant message ──────────────────────────────────────────
   Types for a beat, then answers. Under reduced motion the answer is
   simply there — no typing indicator, nothing to wait through. */
export function AssistantMessage({ name, message }) {
  const { ref, seen } = useSeen(0.5)
  const reduced = useReducedMotion()
  const [typing, setTyping] = useState(!reduced)

  useEffect(() => {
    if (!seen || reduced) return
    const id = setTimeout(() => setTyping(false), 1400)
    return () => clearTimeout(id)
  }, [seen, reduced])

  return (
    <div className="w-msg" ref={ref}>
      <span aria-hidden="true" className="w-msg-face" style={{ backgroundImage: TILE_SOFT.teal }}>
        <span className="w-bloom" />
      </span>
      <div className="w-msg-bubble">
        <p className="w-label" style={{ marginBottom: 'var(--s0)' }}>
          {name} · AI assistant
        </p>
        {typing ? (
          <span className="w-msg-typing" aria-label="Typing">
            <i />
            <i />
            <i />
          </span>
        ) : (
          <p className="w-msg-body in">{message}</p>
        )}
      </div>
    </div>
  )
}

/* ── 31 · Check-in ───────────────────────────────────────────────────
   A row of faces as a radio group. The label under each face carries the
   meaning; the drawing is decorative. */
const FACE_FILL = [SOFT.ember, SOFT.neutral, SOFT.teal, SOFT.green]
const MOUTHS = ['M17 31q7 4 14 0', 'M18 30q6 2.5 12 0', 'M18 30h12', 'M18 31q6-3 12 0']
export function CheckIn({ question, options, onSelect }) {
  const [selected, setSelected] = useState(null)
  const { ref, seen } = useSeen(0.4)
  return (
    <fieldset className="w-checkin" ref={ref}>
      <legend>{question}</legend>
      <div className="w-checkin-row" role="radiogroup">
        {options.map((o, i) => {
          const on = selected === o
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              className={'w-face' + (seen ? ' in' : '') + (on ? ' sel' : '')}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => {
                setSelected(o)
                onSelect?.(o)
              }}
            >
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <rect width="48" height="48" rx="10" fill={FACE_FILL[i % FACE_FILL.length]} />
                <circle cx="18" cy="21" r="2" fill={INK} />
                <circle cx="30" cy="21" r="2" fill={INK} />
                <path d={MOUTHS[i % MOUTHS.length]} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{o}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
