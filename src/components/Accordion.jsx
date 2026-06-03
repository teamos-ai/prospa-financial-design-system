import { useState } from 'react'

// Accordion — single-open FAQ list. `items` is [{ q, a }].
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div className={'acc-item' + (isOpen ? ' open' : '')} key={i}>
            <button
              type="button"
              className="acc-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              {item.q}
              <span className="ico">+</span>
            </button>
            <div className="acc-a">
              <div className="acc-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
