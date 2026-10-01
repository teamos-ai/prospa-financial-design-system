/* ============================================================
   FEATURES — four ways to lay out the same item shape.

   Ported from Health OS. One item shape ({ icon, title, description }),
   one intro block, one heading rule: `headingLevel` is the level of the
   intro title and item titles sit one level below it.

     FeatureGrid    many small features at a glance, in a lined frame
     FeatureCards   two to four, each on its own card over a dot grid
     FeatureSteps   a sequence, advancing on its own beside a photo
     FeatureTabs    a few, one open at a time, beside a photo

   Icons are this system's 24px line set on a teal chip. Nothing here
   lifts on hover except a step or a tab, which can be pressed.
   ============================================================ */
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { Check } from '../widgets/glyphs.jsx'
import { FadeIn, Stagger } from '../ui/reveal.jsx'
import { useReducedMotion, useSeen } from '../widgets/motion.jsx'

/** Item titles sit one level below the intro title. */
const itemHeading = (level = 'h2') => (level === 'h2' ? 'h3' : 'h4')

export function FeatureIntro({ eyebrow, title, description, align = 'start', headingLevel = 'h2' }) {
  if (!eyebrow && !title && !description) return null
  const Heading = headingLevel
  return (
    <FadeIn as="header" className={'feat-intro' + (align === 'center' ? ' center' : '')}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <Heading className="feat-intro-h">{title}</Heading>}
      {description && <p className="feat-intro-p">{description}</p>}
    </FadeIn>
  )
}

/* ── FeatureGrid ─────────────────────────────────────────────────────
   One rounded frame with a hairline holds the cells, and hairlines
   between them do the separating — no cards, tiles or shadows inside.
   Each cell draws only its right and bottom line and the frame clips
   the outer ones, so a short last row closes cleanly. */
export function FeatureGrid({ items, columns = 3, eyebrow, title, description, align, headingLevel = 'h2', className }) {
  const ItemHeading = itemHeading(headingLevel)
  return (
    <div className={className}>
      <FeatureIntro {...{ eyebrow, title, description, align, headingLevel }} />
      <div className="featgrid-frame">
        <Stagger as="ul" className={'featgrid cols-' + columns}>
          {items.map((it) => (
            <li key={it.title}>
              <span className="feat-ic">
                <Icon name={it.icon} size={22} />
              </span>
              <ItemHeading className="feat-title">{it.title}</ItemHeading>
              <p className="feat-desc">{it.description}</p>
            </li>
          ))}
        </Stagger>
      </div>
    </div>
  )
}

/* ── FeatureCards ────────────────────────────────────────────────────
   Each icon sits centred on a 24px dot grid that fades out radially,
   so the mark has somewhere to stand without a heavy tile behind it. */
export function FeatureCards({ items, variant = 'outline', columns = 3, eyebrow, title, description, align, headingLevel = 'h2', className }) {
  const ItemHeading = itemHeading(headingLevel)
  return (
    <div className={className}>
      <FeatureIntro {...{ eyebrow, title, description, align, headingLevel }} />
      <Stagger as="ul" className={'featcards cols-' + columns}>
        {items.map((it) => (
          <li key={it.title}>
            <div className={'featcard ' + variant}>
              <div className="featcard-mark">
                <span aria-hidden="true" className="featcard-pattern" />
                <span className="feat-ic lg">
                  <Icon name={it.icon} size={26} />
                </span>
              </div>
              <ItemHeading className="feat-title">{it.title}</ItemHeading>
              <p className="feat-desc">{it.description}</p>
            </div>
          </li>
        ))}
      </Stagger>
    </div>
  )
}

/* ── FeatureSteps ────────────────────────────────────────────────────
   A sequence that advances on its own beside a photo. It plays only
   while the photo is mostly on screen and nothing is hovered or
   focused, and it stops entirely under reduced motion — auto-advancing
   content that cannot be paused fails WCAG 2.2.2, so the pause control
   is not optional. */
export function FeatureSteps({
  items,
  autoPlay = true,
  interval = 6000,
  mediaSide = 'end',
  eyebrow,
  title,
  description,
  align,
  headingLevel = 'h2',
  className,
}) {
  const reduced = useReducedMotion()
  const { ref: mediaRef, seen } = useSeen(0.5)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(autoPlay)
  const [held, setHeld] = useState(false)
  const ItemHeading = itemHeading(headingLevel)
  const barRef = useRef(null)

  const running = autoPlay && !reduced && items.length > 1 && playing && seen && !held

  useEffect(() => {
    if (!running) return
    const id = setTimeout(() => setCurrent((c) => (c + 1) % items.length), interval)
    return () => clearTimeout(id)
  }, [running, current, interval, items.length])

  /* Warm the photos once the block is in view, so a swap never shows an
     empty frame. */
  useEffect(() => {
    if (!seen) return
    items.forEach((it) => {
      const img = new Image()
      img.src = it.image.src
    })
  }, [seen, items])

  const pick = (i) => {
    setPlaying(false)
    setCurrent(i)
  }

  const step = items[current] ?? items[0]
  if (!step) return null
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className={className}>
      <FeatureIntro {...{ eyebrow, title, description, align, headingLevel }} />
      <div className={'featsteps' + (mediaSide === 'start' ? ' media-start' : '')}>
        <ol
          className="featsteps-list"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false)
          }}
        >
          {items.map((it, i) => {
            const isCurrent = i === current
            const done = i < current
            return (
              <li key={it.title} className={isCurrent ? 'current' : done ? 'done' : undefined}>
                <button type="button" className="featstep-btn" onClick={() => pick(i)} aria-current={isCurrent || undefined}>
                  <span aria-hidden="true" className="featstep-mark">
                    {done ? <Check size={14} strokeWidth={2.4} /> : pad(i + 1)}
                  </span>
                  <span className="featstep-body">
                    <ItemHeading className="feat-title sm">{it.title}</ItemHeading>
                    <span className="feat-desc">{it.description}</span>
                  </span>
                </button>
                {isCurrent && running && (
                  <span aria-hidden="true" className="featstep-bar">
                    <i ref={barRef} style={{ animationDuration: `${interval}ms` }} />
                  </span>
                )}
              </li>
            )
          })}
        </ol>

        <figure className="featsteps-media" ref={mediaRef}>
          <img src={step.image.src} alt={step.image.alt} loading="lazy" decoding="async" key={step.image.src} />
          {autoPlay && !reduced && items.length > 1 && (
            <button
              type="button"
              className="featsteps-play"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause the sequence' : 'Play the sequence'}
            >
              {playing ? 'Pause' : 'Play'}
            </button>
          )}
        </figure>
      </div>
    </div>
  )
}

/* ── FeatureTabs ─────────────────────────────────────────────────────
   A proper tab set: real roles, arrow-key roving focus and one panel
   per tab. The calculators' own tab strip is the thing this fixes —
   tabs with no tabpanel tell a screen reader a panel exists and then
   never name it. */
export function FeatureTabs({ items, eyebrow, title, description, align, headingLevel = 'h2', className }) {
  const [active, setActive] = useState(0)
  const tabsRef = useRef([])
  const ItemHeading = itemHeading(headingLevel)

  const onKeyDown = (e) => {
    const last = items.length - 1
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabsRef.current[next]?.focus()
  }

  return (
    <div className={className}>
      <FeatureIntro {...{ eyebrow, title, description, align, headingLevel }} />
      <div className="feattabs">
        <div className="feattabs-strip" role="tablist" aria-label={title ?? 'Features'} onKeyDown={onKeyDown}>
          {items.map((it, i) => (
            <button
              key={it.title}
              ref={(el) => (tabsRef.current[i] = el)}
              type="button"
              role="tab"
              id={`feattab-${i}`}
              aria-selected={i === active}
              aria-controls={`feattabpanel-${i}`}
              tabIndex={i === active ? 0 : -1}
              className={'feattab' + (i === active ? ' on' : '')}
              onClick={() => setActive(i)}
            >
              <span className="feat-ic sm">
                <Icon name={it.icon} size={18} />
              </span>
              {it.title}
            </button>
          ))}
        </div>

        {items.map((it, i) => (
          <div
            key={it.title}
            role="tabpanel"
            id={`feattabpanel-${i}`}
            aria-labelledby={`feattab-${i}`}
            tabIndex={0}
            hidden={i !== active}
            className="feattabs-panel"
          >
            <div className="feattabs-copy">
              <ItemHeading className="feat-title">{it.title}</ItemHeading>
              <p className="feat-desc">{it.description}</p>
            </div>
            {it.image && (
              <img src={it.image.src} alt={it.image.alt} loading="lazy" decoding="async" className="feattabs-img" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
