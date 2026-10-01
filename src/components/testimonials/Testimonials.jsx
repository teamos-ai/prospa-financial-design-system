/* ============================================================
   TESTIMONIALS — one card, two arrangements.

   Ported from Health OS, including the rule that matters most here:
   **every card carries the Sample mark while the copy is sample copy.**

   Prospa's claims register deliberately holds back every testimonial,
   award and outcome claim until compliance has cleared it, exactly as
   the Health OS database does. So `sample` defaults to true and should
   stay true until a quote is real, measured and carries the person's
   written permission on file. Turning it off is a compliance decision,
   not a design one.

   The quote leads and the person follows, because the sentence is what
   someone reads as a card goes past.
   ============================================================ */
import { useRef, useState } from 'react'
import { Stagger } from '../ui/reveal.jsx'

/* ── One card ────────────────────────────────────────────────────── */
export function TestimonialCard({ quote, name, role, portrait, context, size = 'row', sample = true, className }) {
  const tall = size === 'tall'
  return (
    <figure className={['tcard', tall && 'tall', className].filter(Boolean).join(' ')}>
      <div className="tcard-top">
        {(sample || context) && (
          <div className="tcard-meta">
            {context ? <span className="w-label">{context}</span> : <span />}
            {sample && (
              <span className="tcard-sample" title="Sample copy. Not a Prospa Financial client.">
                Sample
              </span>
            )}
          </div>
        )}
        <blockquote>{quote}</blockquote>
      </div>
      <figcaption>
        {portrait ? (
          <img src={portrait} alt="" width="40" height="40" loading="lazy" decoding="async" />
        ) : (
          <span className="tcard-initials" aria-hidden="true">
            {name
              .split(' ')
              .map((p) => p[0])
              .slice(0, 2)
              .join('')}
          </span>
        )}
        <span className="tcard-who">
          <span className="tcard-name">{name}</span>
          <span className="tcard-role">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/* ── Columns — a few taller cards side by side ───────────────────── */
export function TestimonialColumns({ items, columns = 3, sample = true, className }) {
  return (
    <Stagger as="ul" className={['tcols', 'cols-' + columns, className].filter(Boolean).join(' ')}>
      {items.map((t) => (
        <li key={t.quote}>
          <TestimonialCard {...t} size="tall" sample={sample} />
        </li>
      ))}
    </Stagger>
  )
}

/* ── Wall — rows that drift, pausing on hover and on focus ───────────
   The marquee is decorative motion over real content, so it has to be
   stoppable: it pauses on hover, pauses on keyboard focus anywhere
   inside, and does not run at all under reduced motion. The duplicate
   row is aria-hidden so a screen reader hears each quote once. */
export function TestimonialWall({ items, rows = 3, sample = true, className }) {
  const [paused, setPaused] = useState(false)
  const perRow = Math.ceil(items.length / rows)
  const lanes = Array.from({ length: rows }, (_, r) => items.slice(r * perRow, (r + 1) * perRow)).filter(
    (l) => l.length
  )

  return (
    <div
      className={['twall', paused && 'paused', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
    >
      {lanes.map((lane, r) => (
        <div className="twall-row" key={r}>
          <div className="twall-track" style={{ animationDuration: `${46 + r * 8}s`, animationDirection: r % 2 ? 'reverse' : 'normal' }}>
            {lane.map((t) => (
              <TestimonialCard key={t.quote} {...t} sample={sample} />
            ))}
            {/* The second pass makes the loop seamless; it is a duplicate, so
                it is hidden from assistive technology. */}
            <span aria-hidden="true" className="twall-dup">
              {lane.map((t) => (
                <TestimonialCard key={t.quote + '-dup'} {...t} sample={sample} />
              ))}
            </span>
          </div>
        </div>
      ))}
      <button type="button" className="twall-pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
        {paused ? 'Resume' : 'Pause'} the wall
      </button>
    </div>
  )
}
