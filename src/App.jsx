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
import IconsSection from './sections/IconsSection.jsx'
import MotionSection from './sections/MotionSection.jsx'
import VoiceSection from './sections/VoiceSection.jsx'

export default function App() {
  return (
    <ToastProvider>
      <div className="app">
        <Sidebar />
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
            <IconsSection />
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
