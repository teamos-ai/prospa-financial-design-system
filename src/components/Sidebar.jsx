import { useEffect, useState } from 'react'
import TeamCarousel from './TeamCarousel.jsx'
import { navItems } from '../data/tokens.js'

// Panel / drawer toggle glyph (sidebar with a divider).
function PanelIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="9" y1="4" x2="9" y2="20" />
    </svg>
  )
}

// Sidebar with scrollspy, a collapse toggle, and an infinite "Meet the Team"
// card scroller at the bottom.
export default function Sidebar({ collapsed, onToggle }) {
  const [active, setActive] = useState(navItems[0].id)

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean)

    const onScroll = () => {
      const y = window.scrollY + 140
      let current = sections[0]
      sections.forEach((s) => {
        if (s.offsetTop <= y) current = s
      })
      if (current) setActive(current.id)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <div className="brand">
          <span className="brand-logo">
            <img src="/prospa-logo.png" alt="Prospa Financial logo" width="46" height="46" />
          </span>
          <div className="brand-name">
            <b>PROSPA</b>
            <span>Financial</span>
          </div>
        </div>
        <button
          type="button"
          className="side-toggle"
          onClick={onToggle}
          aria-label="Collapse sidebar"
          aria-expanded={!collapsed}
        >
          <PanelIcon />
        </button>
      </div>

      <div className="side-tag">Design System v1.0</div>

      <nav className="nav">
        {navItems.map((n) => (
          <a key={n.id} href={'#' + n.id} className={active === n.id ? 'active' : undefined}>
            <i className="dot" />
            {n.label}
          </a>
        ))}
      </nav>

      <TeamCarousel />
    </aside>
  )
}
