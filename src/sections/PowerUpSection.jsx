import SectionHead from '../components/SectionHead.jsx'
import AIChatDemo from '../components/AIChatDemo.jsx'
import Calculators from '../components/Calculators.jsx'

// PowerUpSection — a live snapshot of what an AI assistant and interactive
// calculators could look like embedded on the Prospa website.
export default function PowerUpSection() {
  return (
    <section id="powerup">
      <SectionHead eyebrow="Power-Up" title="Example AI &amp; Calculators">
        A working preview of what you could add to your site — an AI assistant clients can ask in
        plain English, and calculators they can test and interact with. Try them out below.
      </SectionHead>

      <AIChatDemo />

      <div className="sub-h" style={{ marginTop: '52px' }}>Interactive Calculators</div>
      <p style={{ color: 'var(--gray)', fontSize: '15px', maxWidth: '620px', margin: '0 0 24px' }}>
        Four of the tools Australian financial planners reach for most — built on current 2025–26
        rates. Drag the sliders to see the numbers update live.
      </p>
      <Calculators />
    </section>
  )
}
