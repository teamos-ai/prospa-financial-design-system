import { useEffect, useRef, useState } from 'react'
import { team, initials, handle, ABOUT_URL } from '../data/team.js'

// TeamCarousel — a photo-forward "meet the team" card that swipes left to
// the next member once every 5 seconds. The track holds every member plus a
// clone of the first; when the clone scrolls in, we snap back to 0 without a
// transition for a seamless infinite loop. Pauses on hover; respects
// prefers-reduced-motion (no auto-advance, dots become the control).

const DWELL_MS = 5000

function Avatar({ member, className }) {
  const [failed, setFailed] = useState(false)
  if (member.photo && !failed) {
    return (
      <img
        className={className}
        src={member.photo}
        alt={member.name}
        onError={() => setFailed(true)}
      />
    )
  }
  return (
    <div className={className + ' tcard-initials'} style={{ background: member.accent }} aria-hidden="true">
      {initials(member.name)}
    </div>
  )
}

function TeamCard({ member }) {
  return (
    <article className="tcard">
      <header className="tcard-head">
        <div className="tcard-name">{member.name}</div>
        <div className="tcard-status">
          <span className="tcard-pulse" />
          {member.role}
        </div>
      </header>

      <div className="tcard-photo">
        <Avatar member={member} className="tcard-img" />
      </div>

      <p className="tcard-bio">{member.bio}</p>

      <footer className="tcard-foot">
        <div className="tcard-who">
          <Avatar member={member} className="tcard-who-av" />
          <div className="tcard-who-meta">
            <b>{handle(member.name)}</b>
            <span>Prospa Financial</span>
          </div>
        </div>
        <a className="tcard-btn" href={ABOUT_URL} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </footer>
    </article>
  )
}

export default function TeamCarousel() {
  const slides = [...team, team[0]] // clone first for a seamless wrap
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const pausedRef = useRef(false)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Auto-advance one card every 5s (skipped for reduced motion).
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => i + 1)
    }, DWELL_MS)
    return () => clearInterval(id)
  }, [reduced])

  // Re-enable the transition after a no-animation snap back to 0.
  useEffect(() => {
    if (animate) return
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(r)
  }, [animate])

  function handleTransitionEnd() {
    if (index === team.length) {
      setAnimate(false)
      setIndex(0)
    }
  }

  const active = index % team.length

  return (
    <section
      className="team"
      aria-label="Meet the team"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
      onFocusCapture={() => {
        pausedRef.current = true
      }}
      onBlurCapture={() => {
        pausedRef.current = false
      }}
    >
      <div className="team-label">Meet the Team</div>

      <div className="tcarousel">
        <ul
          className="tcarousel-track"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: animate ? 'transform 0.6s var(--ease)' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((m, i) => (
            <li className="tcarousel-slide" key={i} aria-hidden={i === team.length ? 'true' : undefined}>
              <TeamCard member={m} />
            </li>
          ))}
        </ul>
      </div>

      <div className="tcarousel-dots" role="group" aria-label="Choose team member">
        {team.map((m, i) => (
          <button
            key={i}
            type="button"
            className={'tdot' + (active === i ? ' on' : '')}
            aria-label={`Show ${m.name}`}
            aria-current={active === i ? 'true' : undefined}
            onClick={() => {
              setAnimate(true)
              setIndex(i)
            }}
          />
        ))}
      </div>
    </section>
  )
}
