/* ============================================================
   WIDGETS 23–27 — scheduling and product controls.

   These five are interactive: they hold selection state and report
   changes through callbacks, so they can be dropped into a real booking
   or settings flow rather than only demonstrated.
   ============================================================ */
import { useState } from 'react'
import { Check } from './glyphs.jsx'
import { useSeen } from './motion.jsx'
import PricingCard from '../PricingCard.jsx'

/* ── 23 · Mini calendar ──────────────────────────────────────────────
   Monday-first. `startOffset` is the number of empty cells before day 1.
   Days carrying bookings show a green pip. */
export function MiniCalendar({
  monthLabel,
  daysInMonth,
  startOffset,
  today,
  booked = [],
  defaultSelected,
  onSelect,
}) {
  const [selected, setSelected] = useState(defaultSelected)
  const { ref, seen } = useSeen(0.3)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="w-cal" ref={ref}>
      <p className="w-label" style={{ marginBottom: 'var(--s1)' }}>
        {monthLabel}
      </p>
      <div className="w-cal-head" aria-hidden="true">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="w-cal-grid" role="group" aria-label={monthLabel}>
        {Array.from({ length: startOffset }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {days.map((d, i) => {
          const isToday = d === today
          const isSel = d === selected
          const hasBookings = booked.includes(d)
          return (
            <button
              key={d}
              type="button"
              className={
                'w-cal-day w-pop' +
                (seen ? ' in' : '') +
                (isToday ? ' today' : isSel ? ' sel' : '')
              }
              style={{ transitionDelay: `${i * 12}ms` }}
              aria-pressed={isSel}
              aria-label={`${d} ${monthLabel}${hasBookings ? ', has bookings' : ''}${isToday ? ', today' : ''}`}
              onClick={() => {
                setSelected(d)
                onSelect?.(d)
              }}
            >
              {d}
              {hasBookings && !isToday && <i aria-hidden="true" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── 24 · Slot picker ────────────────────────────────────────────────
   `slots` is [{ time, taken }]. A taken slot is disabled and struck
   through rather than hidden, so the shape of the day stays readable. */
export function SlotPicker({ label, slots, defaultSelected, onSelect }) {
  const [selected, setSelected] = useState(defaultSelected)
  const { ref, seen } = useSeen(0.3)
  return (
    <fieldset className="w-slots" ref={ref}>
      <legend className="w-label">{label}</legend>
      <div className="w-slots-grid">
        {slots.map((s, i) => {
          const isSel = s.time === selected
          return (
            <button
              key={s.time}
              type="button"
              className={'w-slot w-pop' + (seen ? ' in' : '') + (isSel ? ' sel' : '')}
              style={{ transitionDelay: `${i * 40}ms` }}
              disabled={s.taken}
              aria-pressed={isSel}
              onClick={() => {
                setSelected(s.time)
                onSelect?.(s.time)
              }}
            >
              {s.time}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

/* ── 25 · Onboarding stepper ─────────────────────────────────────────
   `steps` is [{ title, status, detail }] where status is
   done | current | next. The status word is in the accessibility tree,
   so progress does not depend on reading the colour of a mark. */
export function OnboardingStepper({ steps }) {
  const { ref, seen } = useSeen(0.3)
  return (
    <ol className="w-stepper" ref={ref}>
      {steps.map((s, i) => (
        <li key={s.title} className={'w-pop' + (seen ? ' in' : '')} style={{ transitionDelay: `${i * 120}ms` }}>
          {i < steps.length - 1 && <span aria-hidden="true" className="w-stepper-rule" />}
          <span className={'w-step-mark ' + s.status}>{s.status === 'done' ? <Check size={12} /> : i + 1}</span>
          <span className={'w-step-body' + (s.status === 'next' ? ' next' : '')}>
            <b>{s.title}</b>
            {s.detail && <span>{s.detail}</span>}
            <span className="sr-only">
              {s.status === 'done' ? 'Done' : s.status === 'current' ? 'In progress' : 'Not started'}
            </span>
          </span>
        </li>
      ))}
    </ol>
  )
}

/* ── 26 · Plan card ──────────────────────────────────────────────────
   One plan inside the product, such as an upgrade prompt. It is the same
   PricingCard every pricing view uses, featured, so a plan never looks
   different in the product and on the site. */
export function PlanCard(props) {
  return <PricingCard {...props} featured />
}

/* ── 27 · Toggle settings ────────────────────────────────────────────── */
export function ToggleSettings({ items, onChange }) {
  const [state, setState] = useState(() => Object.fromEntries(items.map((i) => [i.id, i.enabled])))
  const { ref, seen } = useSeen(0.3)
  return (
    <ul className="w-toggles" ref={ref}>
      {items.map((it, i) => {
        const on = state[it.id]
        return (
          <li
            key={it.id}
            className={'w-toggle-row w-pop' + (seen ? ' in' : '')}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span id={`w-tg-${it.id}`}>
              <b>{it.label}</b>
              <em>{it.detail}</em>
            </span>
            <button
              type="button"
              className="w-switch"
              role="switch"
              aria-checked={on}
              aria-labelledby={`w-tg-${it.id}`}
              onClick={() => {
                setState((s) => ({ ...s, [it.id]: !on }))
                onChange?.(it.id, !on)
              }}
            >
              <i aria-hidden="true" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
