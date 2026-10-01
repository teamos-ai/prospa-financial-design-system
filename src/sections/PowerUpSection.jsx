import SectionHead from '../components/SectionHead.jsx'
import AIChatDemo from '../components/AIChatDemo.jsx'
import Calculators from '../components/Calculators.jsx'

// PowerUpSection — a live snapshot of what an AI assistant and interactive
// calculators could look like embedded on the Prospa website. The AI demo is
// a full-screen, full-bleed hero; the calculators follow in the normal column.
export default function PowerUpSection() {
  return (
    <>
      <section id="powerup" className="ai-screen">
        <AIChatDemo />
      </section>

      <div className="wrap">
        <section id="calculators" className="calc-section">
          <SectionHead eyebrow="Power-Up" title="Interactive Calculators">
            Six of the tools Australian financial planners reach for most — built on current 2026–27
            rates. Drag the sliders to see the numbers update live.
          </SectionHead>
          <Calculators />
        </section>
      </div>
    </>
  )
}
