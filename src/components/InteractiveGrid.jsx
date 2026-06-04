import { useEffect, useRef, useState } from 'react'

// Interactive hero background — a fine grid where each cell fires off an
// on-brand green shade on hover and fades back 120ms after the mouse leaves.
// Ported from smoothui's header-1 grid, retuned to the Prospa palette with
// smaller squares. Each SubGrid owns 4 cells so only it re-renders on hover.

const CELL_SIZE = 92 // px outer cell; splits into a 2×2 of ~46px squares
const FADE_MS = 120

// On-brand greens, deep emerald → bright lime, at ~80% alpha so the teal
// reads through and the white hero copy stays legible when a cell fires.
const GREENS = [
  '#0e6b46cc',
  '#1f9d5bcc',
  '#34b35acc',
  '#4eb52dcc',
  '#5dce38cc',
  '#86e05acc',
  '#a8e063cc',
]

// Soft tints for the light (white-background) variant — gentle mouse-follow
// lights that keep the background reading as white.
const LIGHT = [
  'rgba(93, 206, 56, 0.20)',
  'rgba(78, 181, 45, 0.17)',
  'rgba(19, 95, 105, 0.12)',
  'rgba(95, 166, 164, 0.15)',
  'rgba(198, 90, 30, 0.12)',
]

function randomColor(variant) {
  const pool = variant === 'light' ? LIGHT : GREENS
  return pool[Math.floor(Math.random() * pool.length)]
}

function SubGrid({ variant }) {
  const [colors, setColors] = useState([null, null, null, null])
  const timeouts = useRef([null, null, null, null])

  function enter(i) {
    const t = timeouts.current[i]
    if (t) {
      clearTimeout(t)
      timeouts.current[i] = null
    }
    setColors((prev) => prev.map((c, j) => (j === i ? randomColor(variant) : c)))
  }

  function leave(i) {
    timeouts.current[i] = setTimeout(() => {
      setColors((prev) => prev.map((c, j) => (j === i ? null : c)))
      timeouts.current[i] = null
    }, FADE_MS)
  }

  useEffect(
    () => () => {
      for (const t of timeouts.current) if (t) clearTimeout(t)
    },
    []
  )

  return (
    <div className="ig-subgrid">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="ig-cell"
          onMouseEnter={() => enter(i)}
          onMouseLeave={() => leave(i)}
          style={{ backgroundColor: colors[i] || 'transparent' }}
        />
      ))}
    </div>
  )
}

export default function InteractiveGrid({ variant = 'dark' }) {
  const ref = useRef(null)
  const [grid, setGrid] = useState({ columns: 0, rows: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    function update() {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      setGrid((prev) => {
        const columns = Math.ceil(width / CELL_SIZE)
        const rows = Math.ceil(height / CELL_SIZE)
        return prev.columns === columns && prev.rows === rows ? prev : { columns, rows }
      })
    }
    update()
    // ResizeObserver tracks the container directly — robust against late
    // layout and the sidebar collapsing at the 1080px breakpoint.
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const total = grid.columns * grid.rows

  return (
    <div ref={ref} className={'ig-root' + (variant === 'light' ? ' ig-light' : '')} aria-hidden="true">
      <div
        className="ig-main"
        style={{
          gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <SubGrid key={`sg-${grid.columns}-${grid.rows}-${i}`} variant={variant} />
        ))}
      </div>
    </div>
  )
}
