// Hero — the overview header with the brand gradient and headline stats.
const heroSwatches = ['#135f69', '#5dce38', '#d0dfe1', '#f2fbef', '#616773', '#121212']

const heroMeta = [
  { b: '2', span: 'Brand colours' },
  { b: 'Poppins', span: 'Primary typeface' },
  { b: '5px', span: 'Spacing base unit' },
  { b: 'AAA', span: 'Contrast on core pairs' },
]

export default function Hero() {
  return (
    <header className="hero" id="overview">
      <div className="wrap">
        <div className="eyebrow" style={{ color: '#7fd4a0' }}>
          Brand &amp; Product Design System
        </div>
        <h1>
          The Prospa Financial <em>design language</em>, in one place.
        </h1>
        <p className="lede">
          A calm, trustworthy system for expert financial advice at every stage of life — built on
          deep teal, vivid growth-green and the clarity of Poppins.
        </p>
        <div className="hero-meta">
          {heroMeta.map((m) => (
            <div className="m" key={m.span}>
              <b>{m.b}</b>
              <span>{m.span}</span>
            </div>
          ))}
        </div>
        <div className="swatch-row">
          {heroSwatches.map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </div>
      </div>
    </header>
  )
}
