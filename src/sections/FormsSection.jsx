import { useState } from 'react'
import SectionHead from '../components/SectionHead.jsx'

export default function FormsSection() {
  const [subscribed, setSubscribed] = useState(true)

  return (
    <section id="forms">
      <SectionHead eyebrow="Components" title="Forms">
        Clean, rounded inputs with a teal focus glow. Generous padding and clear labels keep enquiry
        and booking flows approachable.
      </SectionHead>

      <div className="demo plain">
        <form className="form-demo" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="fn">First Name</label>
            <input id="fn" type="text" placeholder="Jordan" />
          </div>
          <div className="field">
            <label htmlFor="ln">Last Name</label>
            <input id="ln" type="text" placeholder="Avery" />
          </div>
          <div className="field full">
            <label htmlFor="em">Email Address</label>
            <input id="em" type="email" defaultValue="jordan@example.com" />
          </div>
          <div className="field">
            <label htmlFor="svc">Service of Interest</label>
            <select id="svc" defaultValue="Retirement Planning">
              <option>Retirement Planning</option>
              <option>Superannuation</option>
              <option>Investment</option>
              <option>Life Insurance</option>
            </select>
          </div>
          <div className="field err">
            <label htmlFor="ph">Phone</label>
            <input id="ph" type="text" defaultValue="04" aria-invalid="true" aria-describedby="ph-hint" />
            <span className="hint" id="ph-hint">
              Please enter a valid mobile number.
            </span>
          </div>
          <div className="field full">
            <label htmlFor="msg">How can we help?</label>
            <textarea id="msg" rows="3" placeholder="Tell us a little about your goals…" />
          </div>
          <div className="field full" style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              className={'toggle' + (subscribed ? '' : ' off')}
              role="switch"
              aria-checked={subscribed}
              aria-label="Keep me updated with financial insights"
              onClick={() => setSubscribed((v) => !v)}
            />
            <label style={{ cursor: 'pointer' }} onClick={() => setSubscribed((v) => !v)}>
              Keep me updated with financial insights
            </label>
          </div>
        </form>
      </div>
    </section>
  )
}
