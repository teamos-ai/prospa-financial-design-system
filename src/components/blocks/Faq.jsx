/* ============================================================
   Faq — common questions in a condensed column.

   Ported from Health OS. Each question is a quiet row rather than a
   heading, so a list of questions reads as a list; a small green plus
   turns a quarter turn into a cross when it opens. One answer at a time
   unless `multiple` is set.

   The panel animates on grid-template-rows 0fr → 1fr, not max-height:
   it is the one technique that opens to the content's real height
   without a magic number clipping a long answer, and it does not thrash
   layout the way an animated height does. This system's Accordion was
   moved to it for the same reason.
   ============================================================ */
import { useId, useState } from 'react'
import { Plus } from '../widgets/glyphs.jsx'

export default function Faq({ items, defaultOpen = 0, multiple = false, headingLevel: Heading = 'h3', className }) {
  const [open, setOpen] = useState(defaultOpen >= 0 ? [defaultOpen] : [])
  const baseId = useId()

  const toggle = (i) =>
    setOpen((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : multiple ? [...cur, i] : [i]))

  return (
    <div className={['faq', className].filter(Boolean).join(' ')}>
      {items.map((item, i) => {
        const isOpen = open.includes(i)
        const triggerId = `${baseId}-q${i}`
        const panelId = `${baseId}-a${i}`
        return (
          <div className={'faq-item' + (isOpen ? ' open' : '')} key={item.question}>
            <Heading className="faq-h">
              <button
                type="button"
                id={triggerId}
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="faq-plus">
                  <Plus size={12} />
                </span>
              </button>
            </Heading>
            {/* No `hidden` here: it would cancel the open transition. The panel
                collapses to 0fr and its inner turns visibility:hidden once the
                transition ends, which takes the closed content out of the tab
                order and the accessibility tree without stopping it animating. */}
            <div className="faq-panel" id={panelId} role="region" aria-labelledby={triggerId}>
              <div className="faq-panel-inner">
                <div className={'faq-a' + (item.image ? ' has-img' : '')}>
                  {item.image && (
                    <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
                  )}
                  <div className="faq-a-body">{item.answer}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
