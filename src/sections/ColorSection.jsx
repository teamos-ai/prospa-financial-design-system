import SectionHead from '../components/SectionHead.jsx'
import { useToast } from '../components/ToastProvider.jsx'
import { colorGroups } from '../data/tokens.js'

// ColorSection — click any swatch to copy its hex.
export default function ColorSection() {
  const toast = useToast()

  const copy = (hex) => {
    if (navigator.clipboard) navigator.clipboard.writeText(hex)
    toast(hex + ' copied')
  }

  return (
    <section id="color">
      <SectionHead eyebrow="Foundations" title="Colour">
        A disciplined palette led by two brand colours: a grounded deep teal for trust and
        authority, and a vivid green that signals growth and forward momentum. Click any swatch to
        copy its hex.
      </SectionHead>

      {colorGroups.map((group) => (
        <div key={group.title}>
          <div className="sub-h">{group.title}</div>
          <div className="color-grid">
            {group.swatches.map((s, i) => (
              <button
                type="button"
                className={'swatch' + (s.dark ? ' dark' : '')}
                key={s.name + i}
                onClick={() => copy(s.hex)}
                style={{ textAlign: 'left', font: 'inherit', padding: 0 }}
              >
                <div
                  className="chip"
                  style={{ background: s.hex, borderBottom: s.border ? '1px solid var(--line)' : undefined }}
                >
                  <span className="copy">Copy</span>
                </div>
                <div className="meta">
                  <b>{s.name}</b>
                  <div className="hex">{s.hex}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="sub-h">Gradient</div>
      <div className="demo plain" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{
            height: 120,
            background: 'linear-gradient(90deg,#5dce38 0%,#ffffff 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '14px 18px',
          }}
        >
          <span className="tok">linear-gradient(90deg, #5dce38 0%, #fff 100%)</span>
        </div>
      </div>
    </section>
  )
}
