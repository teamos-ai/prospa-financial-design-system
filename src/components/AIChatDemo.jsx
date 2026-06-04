import { useEffect, useRef, useState } from 'react'
import InteractiveGrid from './InteractiveGrid.jsx'
import { aiSuggestions, aiResponses, matchResponseKey, GENERAL_ADVICE_WARNING } from '../data/powerup.js'

const I = (inner) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: inner }} />
)
const chipIcons = {
  call: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  retire: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  compare: '<path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M21 3 3 21"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  stack: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  growth: '<path d="M23 6 13.5 15.5l-5-5L1 18"/><path d="M17 6h6v6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
}

let mid = 0

export default function AIChatDemo() {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ block: 'nearest' })
  }, [messages, thinking])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  function ask(text, key) {
    const q = text.trim()
    if (!q || thinking) return
    setMessages((m) => [...m, { id: ++mid, role: 'user', text: q }])
    setValue('')
    setThinking(true)
    timerRef.current = setTimeout(() => {
      const resKey = key || matchResponseKey(q)
      const res = aiResponses[resKey] || aiResponses.fallback
      setMessages((m) => [...m, { id: ++mid, role: 'ai', res }])
      setThinking(false)
    }, 650)
  }

  return (
    <div className="ai-demo">
      <InteractiveGrid variant="light" />
      <div className="ai-inner">
      <div className="ai-hero">
        <h3 className="ai-title">
          Your shortcut to <em>financial clarity</em>
        </h3>
        <p className="ai-sub">
          No jargon. No guesswork. Just instant answers, calculations, and comparisons — so you don’t
          have to wait for an appointment.
        </p>
      </div>

      <div className="ai-warning" role="note">
        <span className="ai-warning-ic" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          </svg>
        </span>
        <p>{GENERAL_ADVICE_WARNING}</p>
      </div>

      <form
        className="ai-bar"
        onSubmit={(e) => {
          e.preventDefault()
          ask(value)
        }}
      >
        <div className="ai-bar-input">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask anything. Type / for shortcuts…"
            aria-label="Ask the example assistant"
          />
          <kbd className="ai-kbd">/</kbd>
        </div>
        <div className="ai-bar-actions">
          <div className="ai-bar-left" aria-hidden="true">
            <span className="ai-ibtn">{I('<path d="M12 5v14M5 12h14"/>')}</span>
            <span className="ai-ibtn on">{I('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>')}</span>
            <span className="ai-ibtn">{I('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>')}</span>
          </div>
          <div className="ai-bar-right">
            <span className="ai-ibtn" aria-hidden="true">{I('<path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>')}</span>
            <button type="submit" className="ai-send" aria-label="Send" disabled={thinking}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {(messages.length > 0 || thinking) && (
        <div className="ai-chat" aria-live="polite">
          {messages.map((m) =>
            m.role === 'user' ? (
              <div className="ai-msg user" key={m.id}>
                {m.text}
              </div>
            ) : (
              <div className="ai-msg ai" key={m.id}>
                {m.res.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {m.res.bullets.length > 0 && (
                  <ul>
                    {m.res.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
                {m.res.cta && <p className="ai-cta">{m.res.cta}</p>}
                {m.res.action && (
                  <a className="ai-action" href={m.res.action.href} target="_blank" rel="noopener noreferrer">
                    {m.res.action.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                )}
                <span className="ai-tag">General advice only · example response</span>
              </div>
            )
          )}
          {thinking && (
            <div className="ai-msg ai thinking">
              <span className="ai-dot" />
              <span className="ai-dot" />
              <span className="ai-dot" />
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      <div className="ai-chips">
        {aiSuggestions.map((s) => (
          <button key={s.cmd + s.label} type="button" className="ai-chip" onClick={() => ask(`${s.cmd} ${s.label}`, s.key)}>
            <span className="ai-chip-ic">{I(chipIcons[s.icon])}</span>
            <b>{s.cmd}</b> {s.label}
          </button>
        ))}
      </div>
      </div>
    </div>
  )
}
