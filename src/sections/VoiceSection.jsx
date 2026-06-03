import SectionHead from '../components/SectionHead.jsx'

const principles = [
  { b: 'Reassuring', span: 'Calm confidence. We reduce anxiety around money and the future.' },
  { b: 'Plain-spoken', span: 'Clear, jargon-free guidance that anyone can act on.' },
  { b: 'Personal', span: 'Advice "tailored to your unique goals and aspirations".' },
]

const dos = [
  '"Expert Financial Advice for Every Stage of Life"',
  '"Book a Free Call" — warm, low-pressure CTAs',
  "Lead with the client's goals, then the service",
  'Title Case headings, sentence-case body',
]

const donts = [
  'Dense regulatory jargon without plain explanation',
  'Aggressive, urgency-driven sales language',
  'ALL-CAPS shouting or exclamation overload',
  'Generic "solutions" copy with no human warmth',
]

export default function VoiceSection() {
  return (
    <section id="voice">
      <SectionHead eyebrow="Brand" title="Voice & Tone">
        Friendly, reassuring and human. We speak as "we" to "you", use balanced Title Case headings,
        and keep financial language plain and warm.
      </SectionHead>

      <div className="principle">
        {principles.map((p) => (
          <div className="p" key={p.b}>
            <b>{p.b}</b>
            <span>{p.span}</span>
          </div>
        ))}
      </div>

      <div className="voice-grid" style={{ marginTop: 24 }}>
        <div className="voice-card do">
          <div className="tag">Do</div>
          <ul>
            {dos.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="voice-card dont">
          <div className="tag">Don't</div>
          <ul>
            {donts.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
