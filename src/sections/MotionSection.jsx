import { useRef } from 'react'
import SectionHead from '../components/SectionHead.jsx'
import { motionTokens } from '../data/tokens.js'

export default function MotionSection() {
  return (
    <section id="motion">
      <SectionHead eyebrow="Foundations" title="Motion">
        Movement is gentle and purposeful — short for feedback, longer for reveals. Hover to preview
        each duration token.
      </SectionHead>
      <div className="motion-grid">
        {motionTokens.map((m) => (
          <MotionTile key={m.ms} ms={m.ms} name={m.name} />
        ))}
      </div>
    </section>
  )
}

function MotionTile({ ms, name }) {
  const ball = useRef(null)

  const preview = () => {
    const el = ball.current
    if (!el) return
    el.style.transition = `transform ${ms}ms cubic-bezier(.22,.61,.36,1)`
    el.style.transform = 'translateX(60px)'
    setTimeout(() => {
      el.style.transform = 'translateX(0)'
    }, ms + 120)
  }

  return (
    <div className="motion-tile" onMouseEnter={preview}>
      <div className="ball" ref={ball} />
      <b>{name}</b>
      <span>{ms}ms</span>
    </div>
  )
}
