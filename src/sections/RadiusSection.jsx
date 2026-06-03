import SectionHead from '../components/SectionHead.jsx'
import { radii, shadows } from '../data/tokens.js'

export default function RadiusSection() {
  return (
    <section id="radius">
      <SectionHead eyebrow="Foundations" title="Radius & Elevation">
        Corners range from soft 10px controls to fully rounded pills. Elevation is quiet and
        teal-tinted — soft, wide, low-opacity glows rather than hard drop shadows.
      </SectionHead>

      <div className="sub-h">Corner Radius</div>
      <div className="tile-grid">
        {radii.map((r) => (
          <div className="radius-tile" key={r.name}>
            <div className="box" style={{ borderRadius: r.v }} />
            <div className="name">{r.name}</div>
            <div className="v">{r.v}</div>
          </div>
        ))}
      </div>

      <div className="sub-h">Elevation</div>
      <div className="shadow-grid">
        {shadows.map((s) => (
          <div className="shadow-tile" key={s.name} style={{ boxShadow: s.css }}>
            <div className="name">{s.name}</div>
            <div className="v">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
