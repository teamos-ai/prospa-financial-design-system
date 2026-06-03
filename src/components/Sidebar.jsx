import { useEffect, useState } from 'react'
import BrandMark from './BrandMark.jsx'
import { navItems } from '../data/tokens.js'

// Sidebar with scrollspy — highlights the section currently in view.
export default function Sidebar() {
  const [active, setActive] = useState(navItems[0].id)

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean)

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
      <div className="brand">
        <BrandMark />
        <div className="brand-name">
          <b>PROSPA</b>
          <span>Financial</span>
        </div>
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
      <div className="side-foot">
        Melbourne, Australia
        <br />
        Financial advisory
        <br />
        Est. legacy of 40+ years
      </div>
    </aside>
  )
}
