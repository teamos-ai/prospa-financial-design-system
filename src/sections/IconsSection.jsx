import SectionHead from '../components/SectionHead.jsx'
import Icon from '../components/Icon.jsx'
import { icons } from '../data/tokens.js'

export default function IconsSection() {
  return (
    <section id="icons">
      <SectionHead eyebrow="Foundations" title="Iconography">
        A consistent 24px line-icon set at 2px stroke, drawn in teal. Rounded caps and joins echo the
        friendly geometry of Poppins.
      </SectionHead>
      <div className="icon-grid">
        {Object.keys(icons).map((name) => (
          <div className="icon-cell" key={name}>
            <Icon name={name} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
