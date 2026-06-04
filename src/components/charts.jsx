// Lightweight, dependency-free SVG charts for the calculator bento cards.
// Colours are the brand palette plus the suggested ember accent.

export const PALETTE = {
  teal: '#135f69',
  tealDeep: '#0a363c',
  tealSoft: '#5fa6a4',
  green: '#5dce38',
  greenDeep: '#4eb52d',
  ember: '#c65a1e',
  track: '#e7efef',
}

// Donut / ring chart with an HTML centre label.
export function Donut({ segments, size = 150, thickness = 20, label, value }) {
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1
  let offset = 0

  return (
    <div className="donut" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={PALETTE.track} strokeWidth={thickness} />
          {segments.map((s, i) => {
            const len = (Math.max(0, s.value) / total) * c
            const node = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={thickness}
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
              />
            )
            offset += len
            return node
          })}
        </g>
      </svg>
      <div className="donut-center">
        {label && <span>{label}</span>}
        {value && <b>{value}</b>}
      </div>
    </div>
  )
}

// Legend for the donut segments.
export function Legend({ items }) {
  return (
    <ul className="legend">
      {items.map((s, i) => (
        <li key={i}>
          <span className="legend-dot" style={{ background: s.color }} />
          <span className="legend-l">{s.label}</span>
          <b>{s.display}</b>
        </li>
      ))}
    </ul>
  )
}

// Horizontal bar breakdown (like the reference "Earning" card).
export function Bars({ items }) {
  const max = Math.max(...items.map((i) => Math.max(0, i.value)), 1)
  return (
    <div className="bars">
      {items.map((it, i) => (
        <div className="bar-row" key={i}>
          <div className="bar-top">
            <span className="bar-l">{it.label}</span>
            <span className="bar-v">{it.display}</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(Math.max(0, it.value) / max) * 100}%`, background: it.color }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// Smooth area sparkline for growth-over-time.
export function Sparkline({ points, color = '#5dce38', w = 240, h = 56 }) {
  if (!points || points.length < 2) return null
  const max = Math.max(...points)
  const min = Math.min(...points, 0)
  const range = max - min || 1
  const stepX = w / (points.length - 1)
  const coords = points.map((p, i) => [i * stepX, h - ((p - min) / range) * h])
  const line = coords.map((c, i) => `${i ? 'L' : 'M'}${c[0].toFixed(1)} ${c[1].toFixed(1)}`).join(' ')
  const area = `${line} L ${w} ${h} L 0 ${h} Z`
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={area} fill={color} opacity="0.22" />
      <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
