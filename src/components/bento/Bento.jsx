/* ============================================================
   BENTO — four grids for composing a page section.

     BentoGrid / BentoCell   the plain container and span
     FeatureBento            a six-cell feature grid, in three styles
     ProductBento            what the product does, each job drawn
     GalleryBento            an image-led mosaic

   Ported from Health OS. Every visual below is drawn with tokens and
   markup rather than a screenshot, and is decorative — the title and
   the sentence carry the meaning, so the drawings are aria-hidden.
   Only a cell that can be pressed lifts on hover.
   ============================================================ */
import Badge from '../Badge.jsx'
import Icon from '../Icon.jsx'
import { Arrow, Check } from '../widgets/glyphs.jsx'
import { Figure } from '../widgets/motion.jsx'
import { FadeIn } from '../ui/reveal.jsx'
import { FULL, LIGHT, SOFT } from '../widgets/tones.js'

/* ── The plain grid ──────────────────────────────────────────────── */
export function BentoGrid({ className, children }) {
  return <div className={['bento', className].filter(Boolean).join(' ')}>{children}</div>
}

export function BentoCell({ span = 1, className, children }) {
  return <div className={['bento-cell', 'span-' + span, className].filter(Boolean).join(' ')}>{children}</div>
}

/* A figure that counts when it is a number and reads as written when it
   is a word, so "One" and 128 can sit in the same slot. */
function BentoFigure({ value, prefix = '', suffix = '', decimals }) {
  return typeof value === 'number' ? (
    <Figure value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
  ) : (
    <>{`${prefix}${value}${suffix}`}</>
  )
}

/* ── FeatureBento ────────────────────────────────────────────────────
   Six cells: a hero, a highlight figure and a feature beside it, then
   an action and two facts. The style only changes how the cells are
   filled — photo, tint or quiet. */
export function FeatureBento({ variant = 'photo', hero, highlight, feature, action, facts, className }) {
  const photo = (
    <img src={hero.image.src} alt={hero.image.alt} loading="lazy" decoding="async" />
  )

  return (
    <div className={['fbento', variant, className].filter(Boolean).join(' ')}>
      <div className="fbento-cell fbento-hero">
        {variant === 'photo' && (
          <>
            <div className="fbento-hero-photo fade-b">{photo}</div>
            <div className="fbento-hero-copy">
              <HeroText hero={hero} />
            </div>
          </>
        )}
        {variant === 'tint' && (
          <div className="fbento-hero-tint">
            <div className="fbento-hero-frame">{photo}</div>
            <HeroText hero={hero} />
          </div>
        )}
        {variant === 'quiet' && (
          <div className="fbento-hero-split">
            <div className="fbento-hero-photo fade-l">{photo}</div>
            <div className="fbento-hero-copy">
              <HeroText hero={hero} />
            </div>
          </div>
        )}
      </div>

      <div className="fbento-cell fbento-highlight">
        <span className="feat-ic">
          <Icon name={highlight.icon} size={24} />
        </span>
        <div>
          <p className="fbento-figure">
            <BentoFigure {...highlight} />
          </p>
          <p className="feat-desc">{highlight.label}</p>
        </div>
      </div>

      <div className="fbento-cell fbento-feature">
        <span className="feat-ic">
          <Icon name={feature.icon} size={24} />
        </span>
        <div>
          <h3 className="feat-title">{feature.title}</h3>
          <p className="feat-desc">{feature.description}</p>
        </div>
      </div>

      <a className="fbento-cell fbento-action" href={action.href ?? '#'}>
        <span className="fbento-action-top">
          <Badge variant="soft">{action.eyebrow}</Badge>
          <span className="fbento-arrow" aria-hidden="true">
            <Arrow size={16} />
          </span>
        </span>
        <span className="feat-title">{action.title}</span>
      </a>

      {facts.map((fact, i) => (
        <div className={'fbento-cell fbento-fact f' + i} key={fact.label}>
          <p className="feat-title">
            <BentoFigure {...fact} />
          </p>
          <p className="w-label">{fact.label}</p>
        </div>
      ))}
    </div>
  )
}

function HeroText({ hero }) {
  return (
    <div className="fbento-herotext">
      {hero.live ? (
        <Badge variant="green" dot>
          {hero.live}
        </Badge>
      ) : (
        hero.eyebrow && <Badge variant="soft">{hero.eyebrow}</Badge>
      )}
      <h3 className="feat-title lg">{hero.title}</h3>
      <p className="feat-desc">{hero.description}</p>
    </div>
  )
}

/* ── ProductBento ────────────────────────────────────────────────────
   Five cells: a figure in soft rings, a booking week and a reply, then
   two wide cells that split into text and a drawn visual. Names and
   times are samples, never results. */
export function ProductBento({ figure, booking, message, pipeline, clients, className }) {
  return (
    <div className={['pbento', className].filter(Boolean).join(' ')}>
      <div className="pbento-cell pbento-figure">
        <div className="pbento-rings" aria-hidden="true">
          <span />
          <span />
          <span />
          <b>{figure.value}</b>
        </div>
        <h3 className="feat-title">{figure.title}</h3>
        <p className="feat-desc">{figure.description}</p>
      </div>

      <div className="pbento-cell">
        <div className="pbento-week" aria-hidden="true">
          {booking.days.map((d, i) => (
            <span key={d.date} className={'pbento-day' + (i === booking.bookedDay ? ' on' : '')}>
              <em>{d.weekday}</em>
              <b>{d.date}</b>
            </span>
          ))}
        </div>
        <div className="pbento-slots" aria-hidden="true">
          {booking.slots.map((s, i) => (
            <span key={s} className={'pbento-slot' + (i === booking.bookedSlot ? ' on' : '')}>
              {s}
            </span>
          ))}
        </div>
        <h3 className="feat-title">{booking.title}</h3>
        <p className="feat-desc">{booking.description}</p>
      </div>

      <div className="pbento-cell">
        <div className="pbento-thread" aria-hidden="true">
          <span className="pbento-in">{message.incoming}</span>
          <span className="pbento-out">
            {message.reply}
            <i>
              <Check size={11} strokeWidth={2.6} />
            </i>
          </span>
        </div>
        <h3 className="feat-title">{message.title}</h3>
        <p className="feat-desc">{message.description}</p>
      </div>

      <div className="pbento-cell pbento-wide">
        <div className="pbento-wide-copy">
          <h3 className="feat-title">{pipeline.title}</h3>
          <p className="feat-desc">{pipeline.description}</p>
        </div>
        <div className="pbento-pipeline" aria-hidden="true">
          {pipeline.stages.map((s, i) => (
            <span key={s.label} className="pbento-stage">
              <em>{s.label}</em>
              <i style={{ width: `${s.pct}%`, background: [FULL.teal, LIGHT.teal, FULL.green][i % 3] }} />
            </span>
          ))}
        </div>
      </div>

      <div className="pbento-cell pbento-wide">
        <div className="pbento-wide-copy">
          <h3 className="feat-title">{clients.title}</h3>
          <p className="feat-desc">{clients.description}</p>
        </div>
        <ul className="pbento-clients" aria-hidden="true">
          {clients.rows.map((r, i) => (
            <li key={r.name}>
              <span className="pbento-av" style={{ background: [SOFT.teal, SOFT.green, SOFT.ember][i % 3] }}>
                {r.initials}
              </span>
              <span className="pbento-cname">{r.name}</span>
              <span className="pbento-cmeta">{r.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── GalleryBento ────────────────────────────────────────────────────
   An image-led mosaic: a tall portrait down one side, a wide photo and
   the text across the top, then the details and a second wide photo, so
   photos and words interlock. Photos never carry text — a caption sits
   below its photo. `reverse` mirrors the layout. */
export function GalleryBento({ photos, eyebrow, title, description, action, details = [], reverse, className }) {
  const Photo = ({ p, className: c }) => (
    <figure className={['gbento-photo', c].filter(Boolean).join(' ')}>
      <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
      {p.caption && <figcaption>{p.caption}</figcaption>}
    </figure>
  )

  return (
    <div className={['gbento', reverse && 'reverse', className].filter(Boolean).join(' ')}>
      <Photo p={photos.portrait} className="gbento-tall" />
      <Photo p={photos.wide} className="gbento-wide" />

      <FadeIn className="gbento-copy">
        {eyebrow && <Badge variant="soft">{eyebrow}</Badge>}
        <h3 className="feat-title lg">{title}</h3>
        <p className="feat-desc">{description}</p>
        {action && (
          <a className="btn btn-primary" href={action.href} target="_blank" rel="noopener noreferrer">
            {action.label}
          </a>
        )}
      </FadeIn>

      <div className="gbento-details">
        {details.map((d) => (
          <div key={d.label}>
            <span className="feat-ic sm">
              <Icon name={d.icon} size={18} />
            </span>
            <span>
              <span className="w-label">{d.label}</span>
              <b>{d.value}</b>
            </span>
          </div>
        ))}
      </div>

      <Photo p={photos.second} className="gbento-wide2" />
    </div>
  )
}
