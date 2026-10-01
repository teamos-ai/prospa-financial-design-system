/* ============================================================
   PricingTable — the one pricing system.

   A row of PricingCards, two or three plans, one featured, used
   everywhere pricing appears so every view has the same layout, motion
   and switch. Currency and anything charged on top go in the note
   below the table.

   Motion: the cards rise as the table comes into view, and from the
   wide breakpoint the featured plan settles slightly forward with the
   others back and in, so the eye lands on the recommendation.

   It replays. A reader scrolls past a pricing table, thinks, and
   scrolls back — and on the second visit a play-once entrance has
   already happened somewhere they were not looking. The gesture is the
   point of this block, so it is worth repeating.

   Billing switch: it appears only when every plan carries an
   `annualPrice`, so a table cannot invent one. For a financial brand
   the annual figure must come from the published rate card, never from
   multiplying the monthly price by a number that feels generous.
   ============================================================ */
import { useEffect, useRef, useState } from 'react'
import PricingCard from '../PricingCard.jsx'
import { useReducedMotion } from '../widgets/motion.jsx'

/** Is there room to fan the cards out? */
function useWide(query = '(min-width: 860px)') {
  const [wide, setWide] = useState(() => typeof matchMedia === 'function' && matchMedia(query).matches)
  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const mq = matchMedia(query)
    const on = () => setWide(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return wide
}

/** Unlike useSeen this one does not latch — it reports every entry and exit. */
function useInView(amount = 0.25) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (reduced) {
      setInView(true)
      return
    }
    const el = ref.current
    if (!el || typeof IntersectionObserver !== 'function') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver((es) => setInView(es[0].isIntersecting), { threshold: amount })
    io.observe(el)
    return () => io.disconnect()
  }, [amount, reduced])
  return { ref, inView: inView || reduced }
}

export default function PricingTable({ plans, note, annualLabel = 'Annual billing', annualNote, className }) {
  const [billing, setBilling] = useState('monthly')
  const { ref, inView } = useInView(0.25)
  const wide = useWide()

  const hasAnnual = plans.length > 0 && plans.every((p) => p.annualPrice !== undefined)
  const featuredIndex = plans.findIndex((p) => p.featured)
  const annual = billing === 'annual'

  return (
    <div className={className} ref={ref}>
      {hasAnnual && (
        <div className="ptable-switch">
          <button
            type="button"
            className="w-switch"
            role="switch"
            aria-checked={annual}
            aria-labelledby="ptable-billing"
            onClick={() => setBilling(annual ? 'monthly' : 'annual')}
          >
            <i aria-hidden="true" />
          </button>
          <span id="ptable-billing">{annualLabel}</span>
          {annualNote && <span className="ptable-note">{annualNote}</span>}
          <span className="sr-only" aria-live="polite">
            {annual
              ? `Showing prices billed annually: ${plans.map((p) => `${p.name} $${p.annualPrice.toLocaleString('en-AU')} a year`).join(', ')}`
              : `Showing prices billed monthly: ${plans.map((p) => `${p.name} $${p.price.toLocaleString('en-AU')} a month`).join(', ')}`}
          </span>
        </div>
      )}

      <div className={'ptable' + (plans.length === 2 ? ' two' : '')}>
        {plans.map((plan, i) => {
          const featured = i === featuredIndex
          const side = featuredIndex < 0 || !wide ? '' : featured ? ' fore' : i < featuredIndex ? ' back-l' : ' back-r'
          return (
            <div
              key={plan.name}
              className={'ptable-cell' + (inView ? ' in' : '') + side}
              style={{ transitionDelay: `${wide ? 100 : i * 80}ms` }}
            >
              <PricingCard
                {...plan}
                billing={hasAnnual ? billing : undefined}
                annualNote={hasAnnual ? annualNote : undefined}
              />
            </div>
          )
        })}
      </div>

      {note && <p className="ptable-foot">{note}</p>}
    </div>
  )
}
