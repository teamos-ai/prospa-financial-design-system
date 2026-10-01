/* ============================================================
   PricingCard — one advice service level.

   Ported from the Health OS design system. `featured` marks the one to
   recommend: a soft teal-tinted header, a badge and the green primary
   button. Only one featured card per set; the others take the outline
   button.

   Prices are numbers so they can change calmly. When `billing` is
   'annual' and the plan carries an `annualPrice`, the figure swaps and
   the cadence changes with it. Never show an annual price the offer does
   not have.

   `guarantee` sits as a chip on the action's shoulder, centred and tight
   to the button, so the two read as one control. Give it to one plan,
   not all of them, or it stops reading as a promise and starts reading
   as a disclaimer. The full wording belongs in a strip near the table —
   never shortened to fit a card, because a clipped promise is a
   different commitment.

   For a financial brand, every figure here must come from the published
   rate card, and anything charged on top has to be stated.
   ============================================================ */
import Badge from './Badge.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import { Check } from './widgets/glyphs.jsx'

export default function PricingCard({
  name,
  icon,
  price,
  annualPrice,
  annualCadence,
  symbol = '$',
  cadence,
  fee,
  description,
  features = [],
  action,
  guarantee,
  featured = false,
  billing,
  annualNote,
  className,
}) {
  const annual = billing === 'annual' && annualPrice !== undefined
  const shown = annual ? annualPrice : price

  return (
    <article className={['plan', featured && 'plan-featured', className].filter(Boolean).join(' ')}>
      <header className="plan-head">
        <div className="plan-head-top">
          <div className="plan-name">
            {icon && (
              <span className="plan-ic">
                <Icon name={icon} size={18} />
              </span>
            )}
            <h3>{name}</h3>
          </div>
          {featured && <Badge variant="green">Recommended</Badge>}
        </div>
        {/* Figure and cadence on their own lines, so a longer yearly price
            never reflows the row of cards. */}
        <p className="plan-price">
          <span className="plan-figure">
            {symbol}
            {shown.toLocaleString('en-AU')}
          </span>
          <span className="plan-cadence">{annual ? annualCadence ?? cadence : cadence}</span>
        </p>
        {billing && (
          <p className="plan-note">
            {annual ? `Billed annually${annualNote ? `, ${annualNote}` : ''}` : 'Billed monthly'}
          </p>
        )}
        {fee && <p className="plan-note">{fee}</p>}
      </header>

      <div className="plan-body">
        <p className="plan-desc">{description}</p>
        <ul className="plan-features">
          {features.map((f) => (
            <li key={f}>
              <span className="plan-tick">
                <Check size={11} strokeWidth={2.6} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {guarantee && (
          <p className="plan-guarantee">
            <span>{guarantee.name}</span>
          </p>
        )}

        <div className={'plan-action' + (guarantee ? ' tight' : '')}>
          {action.href ? (
            <a
              className={'btn ' + (featured ? 'btn-primary' : 'btn-outline')}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.label}
            </a>
          ) : (
            <Button variant={featured ? 'primary' : 'outline'} onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
