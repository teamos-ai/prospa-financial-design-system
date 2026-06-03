import SectionHead from '../components/SectionHead.jsx'
import { typeScale } from '../data/tokens.js'

export default function TypographySection() {
  return (
    <section id="type">
      <SectionHead eyebrow="Foundations" title="Typography">
        Poppins carries the entire system — geometric, friendly and highly legible. Headings run
        bold and tight; body stays comfortable at 400 weight in warm gray.
      </SectionHead>

      <div className="font-card">
        <div className="font-block">
          <div className="glyph">Aa</div>
          <h4>Poppins</h4>
          <div className="roles">Primary — headings, UI, body &amp; numerals</div>
          <div className="weights">
            {['300 Light', '400 Regular', '500 Medium', '600 SemiBold', '700 Bold', '800 ExtraBold'].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        </div>
        <div className="font-block" style={{ fontFamily: 'Montserrat' }}>
          <div className="glyph" style={{ fontFamily: 'Montserrat' }}>
            Aa
          </div>
          <h4 style={{ fontFamily: 'Montserrat' }}>Montserrat</h4>
          <div className="roles">Support — alternate UI &amp; fallback display</div>
          <div className="weights">
            {['400 Regular', '500 Medium', '600 SemiBold', '700 Bold'].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="sub-h">Type Scale</div>
      <div className="type-spec">
        {typeScale.map((t, i) => (
          <div className="type-row" key={i}>
            <div className="label" style={t.style}>
              {t.label}
            </div>
            <div className="specs">
              <b>{t.spec}</b>
              <br />
              {t.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
