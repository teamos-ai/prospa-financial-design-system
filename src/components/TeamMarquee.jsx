import { useState } from 'react'
import { team, initials } from '../data/team.js'

// TeamMarquee — a seamless, infinitely-scrolling vertical column of team
// cards for the sidebar. The roster is duplicated once; the track animates
// translateY 0 → -50%, so the second copy lands exactly where the first
// began. Hover pauses it. Edges fade via a mask.
function Avatar({ member }) {
  const [failed, setFailed] = useState(false)

  if (member.photo && !failed) {
    return (
      <img
        className="team-av"
        src={member.photo}
        alt={member.name}
        width="38"
        height="38"
        onError={() => setFailed(true)}
      />
    )
  }
  return (
    <div className="team-av team-av-initials" style={{ background: member.accent }} aria-hidden="true">
      {initials(member.name)}
    </div>
  )
}

export default function TeamMarquee() {
  const loop = [...team, ...team]

  return (
    <section className="team" aria-label="Meet the team">
      <div className="team-label">Meet the Team</div>
      <div className="team-viewport">
        <ul className="team-track">
          {loop.map((m, i) => (
            <li className="team-card" key={i} aria-hidden={i >= team.length ? 'true' : undefined}>
              <Avatar member={m} />
              <div className="team-meta">
                <b>{m.name}</b>
                <span>{m.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
