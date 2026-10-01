import SectionHead from '../components/SectionHead.jsx'
import Icon from '../components/Icon.jsx'
import { leadMagnets, leadMagnetHero } from '../data/leadMagnets.js'

const BASE = '/lead-magnets/'

// A score dial, drawn with the same geometry the Wealth Score uses, as a
// live preview of the flagship instrument.
function ScoreDial({ score = 66 }) {
  const r = 62
  const c = 2 * Math.PI * r
  return (
    <div className="lm-dial" aria-hidden="true">
      <svg width="152" height="152" viewBox="0 0 152 152">
        <circle cx="76" cy="76" r={r} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="10" />
        <circle
          className="lm-dial-arc"
          cx="76"
          cy="76"
          r={r}
          fill="none"
          stroke="var(--green)"
          strokeWidth="10"
          strokeLinecap="round"
          transform="rotate(-90 76 76)"
          style={{ strokeDasharray: c, strokeDashoffset: c * (1 - score / 100) }}
        />
      </svg>
      <div className="lm-dial-face">
        <b>{score}</b>
        <span>out of 100</span>
      </div>
    </div>
  )
}

export default function LeadMagnetsSection() {
  return (
    <section id="lead-magnets">
      <SectionHead eyebrow="Applied" title="Three Items Lead Magnet">
        Twelve session tools for the Executive Financial Wellbeing Workshop, built entirely from
        this system — the same teal and green, the same Poppins scale, the same radii and soft teal
        shadows, on a document shell designed to print. The scored assessment leads, and four
        interaction patterns run through the rest: shortcut tracking, checklists that cross out, a
        swipe-file fan and a page-turning book. Click any card to open the live tool.
      </SectionHead>

      {/* ---- The flagship ---- */}
      <a className="lm-hero" href={`${BASE}magnets/01-wealth-score.html`} target="_blank" rel="noopener noreferrer">
        <div className="lm-hero-copy">
          <span className="lm-tag">Item 01 · The scoring instrument</span>
          <h3>{leadMagnetHero.title}</h3>
          <p>{leadMagnetHero.blurb}</p>
          <div className="lm-hero-stats">
            {leadMagnetHero.stats.map((s) => (
              <div key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <span className="lm-hero-go">
            Open the assessment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
        <div className="lm-hero-visual">
          <img className="lm-hero-art" src={`${BASE}${leadMagnetHero.art}`} alt="" loading="lazy" />
          <ScoreDial score={66} />
          <div className="lm-bars">
            {leadMagnetHero.profile.map((p) => (
              <div className="lm-bar" key={p.name}>
                <span>{p.name}</span>
                <i>
                  <em style={{ transform: `scaleX(${p.v})`, background: p.c }} />
                </i>
              </div>
            ))}
          </div>
        </div>
      </a>

      {/* ---- The other nine ---- */}
      <div className="sub-h">The other eleven · one per agenda item</div>
      <div className="lm-grid">
        {leadMagnets.map((m) => (
          <a
            className="lm-card"
            key={m.no}
            href={`${BASE}magnets/${m.slug}.html`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="lm-card-art">
              <img src={`${BASE}${m.art}`} alt="" loading="lazy" decoding="async" />
            </span>
            <div className="lm-card-top">
              <span className="lm-ic">
                <Icon name={m.icon} size={22} />
              </span>
              <span className="lm-no">{m.no}</span>
            </div>
            <h4>{m.title}</h4>
            <p>{m.blurb}</p>
            <div className="lm-card-foot">
              <span className="lm-kind">{m.kind}</span>
              <span className="lm-go">
                Open
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* ---- How the system carries over ---- */}
      <div className="sub-h">How the system carries over</div>
      <div className="lm-notes">
        <div className="lm-note">
          <h4>One token layer</h4>
          <p>
            The magnets ship their own <code>prospa.css</code>, a direct port of
            <code> tokens.css</code> — same hexes, same 10 / 15 / 20 / 30 / 100px radii, same
            teal-tinted shadows. Ember appears at most once per page, as intended.
          </p>
        </div>
        <div className="lm-note">
          <h4>A document shell</h4>
          <p>
            Each tool is a white sheet on a tinted desk: masthead with its number and type, the
            eyebrow and its green dash, then a deep-teal compliance footer. One shared module
            renders the masthead and footer, so the AFSL line exists in exactly one place.
          </p>
        </div>
        <div className="lm-note">
          <h4>Built to print</h4>
          <p>
            Every sheet carries a print stylesheet: controls hidden, sliders removed, the footer
            redrawn as a bordered block. <em>Save as PDF</em> produces a clean A4 document the
            client can email without anything being redesigned.
          </p>
        </div>
        <div className="lm-note">
          <h4>Nothing is collected</h4>
          <p>
            Scoring and every calculation run in the browser. Entries persist in
            <code> localStorage</code> only. No analytics, no third-party script, no form post —
            which is both a compliance position and, with this audience, a trust asset.
          </p>
        </div>
        <div className="lm-note">
          <h4>Four interaction patterns, no dependencies</h4>
          <p>
            The shortcut tracker, the strike-through checklists, the swipe-file fan and the
            page-turning book are all in <code>components.js</code> — plain JavaScript and CSS 3D
            transforms, so the sheets stay buildless and still print.
          </p>
        </div>
        <div className="lm-note">
          <h4>One widget vocabulary for every number</h4>
          <p>
            <code>widgets.js</code> holds the score gauge, metric strip, breakdown bar, goal
            progress, progress rows, comparison, donut, stepper and projection chart — this system's
            calculator bento and the Health OS widget library, in plain JavaScript. Each one takes
            real data, animates once into view, and settles immediately under reduced motion.
          </p>
        </div>
      </div>

      <div className="lm-strip">
        <Icon name="Secure" size={22} />
        <p>
          <b>General information only.</b> These are educational tools. None considers anyone's
          objectives, financial situation or needs, and none recommends a product, strategy or
          structure. The Wealth Score's full model, disclaimer and open approval items are
          specified in the magnet repository's <code>SCORING.md</code>; every figure is registered
          with its source in <code>CLAIMS.md</code>.
        </p>
      </div>
    </section>
  )
}
