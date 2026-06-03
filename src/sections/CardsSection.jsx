import SectionHead from '../components/SectionHead.jsx'
import ServiceCard from '../components/ServiceCard.jsx'

const serviceCards = [
  {
    title: 'Superannuation',
    icon: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    body: 'Smart, compliant management of your super to maximise long-term advantages.',
  },
  {
    title: 'Retirement Planning',
    icon: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    body: 'Personalised strategies so you retire on time, on your own terms.',
  },
  {
    title: 'Investment',
    icon: '<path d="M20 7 9 18l-5-5"/>',
    body: 'Grow and protect your wealth with disciplined, strategic investments.',
  },
]

const processCards = [
  { num: '01', title: 'Goals Discovery', body: 'A transformative goal-discovery meeting to map the road ahead.' },
  { num: '02', title: 'Research & Advice', body: 'Meticulous research delivered with precision, tailored to your needs.' },
  { num: '03', title: 'Implementation', body: 'We turn the plan into reality and keep your strategy on course.' },
]

export default function CardsSection() {
  return (
    <section id="cards">
      <SectionHead eyebrow="Components" title="Cards">
        Service cards float on soft teal shadows and lift on hover. Numbered variants carry the
        "Financial Services We Specialise In" rhythm from the site.
      </SectionHead>

      <div className="card-grid">
        {serviceCards.map((c) => (
          <ServiceCard key={c.title} icon={c.icon} title={c.title}>
            {c.body}
          </ServiceCard>
        ))}
      </div>

      <div className="card-grid" style={{ marginTop: 22 }}>
        {processCards.map((c) => (
          <ServiceCard key={c.title} num={c.num} title={c.title}>
            {c.body}
          </ServiceCard>
        ))}
      </div>
    </section>
  )
}
