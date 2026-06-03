import SectionHead from '../components/SectionHead.jsx'
import { spacingScale } from '../data/tokens.js'

export default function SpacingSection() {
  const maxS = Math.max(...spacingScale.map((s) => s[1]))

  return (
    <section id="spacing">
      <SectionHead eyebrow="Foundations" title="Spacing">
        Built on a <span className="tok">5px</span> base unit. Sections breathe with generous
        vertical rhythm — the site leans into open, uncramped layouts.
      </SectionHead>
      <div className="space-list">
        {spacingScale.map(([name, px]) => (
          <div className="space-item" key={name}>
            <div className="name">{name}</div>
            <div className="bar" style={{ width: Math.max(6, (px / maxS) * 100) + '%' }} />
            <div className="val">{px}px</div>
          </div>
        ))}
      </div>
    </section>
  )
}
