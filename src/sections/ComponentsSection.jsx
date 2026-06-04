import SectionHead from '../components/SectionHead.jsx'
import Badge from '../components/Badge.jsx'
import Accordion from '../components/Accordion.jsx'
import Icon from '../components/Icon.jsx'

const faqs = [
  {
    q: 'What does a free call include?',
    a: 'A relaxed 15-minute conversation where we get to know your goals and explain how our advisers can help — no obligation, no jargon.',
  },
  {
    q: 'Are you independent advisers?',
    a: 'We provide personalised, holistic advice tailored to your unique circumstances, with full transparency on how we work.',
  },
  {
    q: 'Which services do you specialise in?',
    a: 'Superannuation, retirement planning, investment, life insurance, income protection, SMSF, estate planning and more.',
  },
]

const navLinks = ['Home', 'About Us', 'Services', 'Resources', 'Contact Us']

export default function ComponentsSection() {
  return (
    <section id="components">
      <SectionHead eyebrow="Components" title="Patterns">
        Recurring building blocks — navigation, badges, accordions and testimonials — assembled from
        the same tokens.
      </SectionHead>

      <div className="sub-h">Navigation Bar</div>
      <div className="nav-demo">
        <div className="brand" style={{ gap: 10 }}>
          <span className="brand-logo brand-logo-sm">
            <img src="/prospa-logo.png" alt="Prospa Financial logo" width="34" height="34" />
          </span>
          <div className="brand-name">
            <b style={{ color: 'var(--ink)', fontSize: 16 }}>PROSPA</b>
          </div>
        </div>
        <div className="links">
          {navLinks.map((l, i) => (
            <a key={l} className={i === 0 ? 'on' : undefined}>
              {l}
            </a>
          ))}
        </div>
        <div className="phone">
          <span style={{ color: 'var(--teal)' }}>
            <Icon name="Call" size={18} />
          </span>
          <span>
            Inquiry
            <br />
            <b>+61 3 8807 8000</b>
          </span>
        </div>
      </div>

      <div className="sub-h">Badges &amp; Tags</div>
      <div className="demo plain">
        <div className="row">
          <Badge variant="solid" dot>
            Award Winning
          </Badge>
          <Badge variant="green" dot>
            40+ Years
          </Badge>
          <Badge variant="teal">Licensed Adviser</Badge>
          <Badge variant="soft">Melbourne, AU</Badge>
        </div>
      </div>

      <div className="sub-h">Accordion</div>
      <div className="demo plain">
        <Accordion items={faqs} defaultOpen={0} />
      </div>

      <div className="sub-h">Testimonial</div>
      <div className="quote-card">
        <div className="mark">&ldquo;</div>
        <p>
          Peter and his team have been a game-changer for my investment management. Clear,
          down-to-earth advice — I couldn't recommend them highly enough.
        </p>
        <div className="who">
          <div className="av">E</div>
          <div>
            <b>Evan</b>
            <span>Investor</span>
          </div>
        </div>
      </div>
    </section>
  )
}
