import SectionHead from '../components/SectionHead.jsx'
import Button from '../components/Button.jsx'

export default function ButtonsSection() {
  return (
    <section id="buttons">
      <SectionHead eyebrow="Components" title="Buttons">
        The green primary button drives action — "Book a Free Call" is the brand's signature CTA.
        Teal pills, outlines and text links provide a clear hierarchy beneath it.
      </SectionHead>

      <div className="demo">
        <div className="row">
          <Button variant="primary">Book a Free Call</Button>
          <Button variant="teal">Know More</Button>
          <Button variant="pill">Let's Talk About It</Button>
          <Button variant="outline">View Services</Button>
          <Button variant="ghost">
            Click Here <span className="arr">&rarr;</span>
          </Button>
        </div>
      </div>

      <div className="demo">
        <div className="sub-h" style={{ margin: '0 0 18px' }}>
          Small
        </div>
        <div className="row">
          <Button variant="primary" size="sm">
            Book a Free Call
          </Button>
          <Button variant="teal" size="sm">
            Know More
          </Button>
          <Button variant="outline" size="sm">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
