import { useState } from 'react'
import { ToastProvider } from './components/ToastProvider.jsx'
import Sidebar from './components/Sidebar.jsx'
import Hero from './sections/Hero.jsx'
import ColorSection from './sections/ColorSection.jsx'
import TypographySection from './sections/TypographySection.jsx'
import SpacingSection from './sections/SpacingSection.jsx'
import RadiusSection from './sections/RadiusSection.jsx'
import ButtonsSection from './sections/ButtonsSection.jsx'
import CardsSection from './sections/CardsSection.jsx'
import FormsSection from './sections/FormsSection.jsx'
import ComponentsSection from './sections/ComponentsSection.jsx'
import PowerUpSection from './sections/PowerUpSection.jsx'
import IconsSection from './sections/IconsSection.jsx'
import LibrarySection from './sections/LibrarySection.jsx'
import LeadMagnetsSection from './sections/LeadMagnetsSection.jsx'
import MotionSection from './sections/MotionSection.jsx'
import VoiceSection from './sections/VoiceSection.jsx'

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => setCollapsed((v) => !v)

  return (
    <ToastProvider>
      <div className={'app' + (collapsed ? ' nav-collapsed' : '')}>
        <Sidebar collapsed={collapsed} onToggle={toggle} />
        <button
          type="button"
          className="side-reopen"
          onClick={toggle}
          aria-label="Open sidebar"
          hidden={!collapsed}
        >
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
        </button>
        <main className="main">
          <Hero />
          <div className="wrap">
            <ColorSection />
            <TypographySection />
            <SpacingSection />
            <RadiusSection />
            <ButtonsSection />
            <CardsSection />
            <FormsSection />
            <ComponentsSection />
          </div>
          {/* Full-bleed AI hero + calculators (renders its own wrap) */}
          <PowerUpSection />
          <div className="wrap">
            <IconsSection />
            <LibrarySection />
            <LeadMagnetsSection />
            <MotionSection />
            <VoiceSection />
          </div>
          <footer className="footer">
            <div className="wrap">
              <div className="footer-col">
                <a
                  className="footer-link"
                  href="https://prospafinancial.com.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prospa Financial
                </a>
                <span className="footer-sub">Design System v1.0 · Poppins · #135F69 · #5DCE38 · Melbourne, Australia</span>
              </div>
              <div className="footer-col footer-credit">
                <span className="footer-sub">Designed &amp; built by</span>
                <a
                  className="footer-link"
                  href="https://www.oscale.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Team OS
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ToastProvider>
  )
}
