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
            <PowerUpSection />
            <IconsSection />
            <LibrarySection />
            <MotionSection />
            <VoiceSection />
          </div>
          <footer className="footer">
            <div className="wrap">
              <div>Prospa Financial — Design System v1.0</div>
              <div>Poppins · #135F69 · #5DCE38 · Melbourne, Australia</div>
            </div>
          </footer>
        </main>
      </div>
    </ToastProvider>
  )
}
