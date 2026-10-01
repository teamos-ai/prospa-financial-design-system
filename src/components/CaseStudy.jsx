/* ============================================================
   CaseStudy — one engagement, start to finish.

   Ported from Health OS: a header with the client and the one-line
   situation, the three figures that moved, then the three movements of
   the story (the situation, what was done, where it landed), and a
   pull-quote.

   The same compliance rule as the testimonials applies, and harder: a
   financial case study makes an implied performance claim the moment it
   carries a number. `sample` defaults to true and the Sample mark shows
   until the engagement is real, the figures are measured and the client
   has given written permission. Prospa's claims register currently
   clears none of this, so nothing here may be published as real.
   ============================================================ */
import Icon from './Icon.jsx'
import { Figure } from './widgets/motion.jsx'
import { FadeIn, Stagger } from './ui/reveal.jsx'

export default function CaseStudy({ study, sample = true, className }) {
  const { client, sector, summary, figures = [], movements = [], quote, image } = study
  return (
    <article className={['cstudy', className].filter(Boolean).join(' ')}>
      <header className="cstudy-head">
        <div className="cstudy-head-copy">
          <div className="cstudy-tags">
            <span className="eyebrow">{sector}</span>
            {sample && (
              <span className="cstudy-sample" title="Sample copy. Not a Prospa Financial engagement.">
                Sample
              </span>
            )}
          </div>
          <h3>{client}</h3>
          <p className="cstudy-summary">{summary}</p>
        </div>
        {image && (
          <div className="cstudy-photo">
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          </div>
        )}
      </header>

      {figures.length > 0 && (
        <Stagger as="ul" className="cstudy-figures">
          {figures.map((f) => (
            <li key={f.label}>
              <Figure
                value={f.value}
                prefix={f.prefix}
                suffix={f.suffix}
                decimals={f.decimals}
                className="w-value"
              />
              <span className="w-label">{f.label}</span>
            </li>
          ))}
        </Stagger>
      )}

      <Stagger as="ol" className="cstudy-movements">
        {movements.map((m, i) => (
          <li key={m.title}>
            <span className="cstudy-mark">
              <Icon name={m.icon} size={20} />
            </span>
            <div>
              <span className="w-label">{['The situation', 'What we did', 'Where it landed'][i] ?? m.kicker}</span>
              <h4>{m.title}</h4>
              <p>{m.body}</p>
            </div>
          </li>
        ))}
      </Stagger>

      {quote && (
        <FadeIn as="figure" className="cstudy-quote">
          <blockquote>{quote.text}</blockquote>
          <figcaption>
            {quote.name}
            {quote.role && <span> · {quote.role}</span>}
            {sample && <span className="cstudy-sample inline">Sample</span>}
          </figcaption>
        </FadeIn>
      )}
    </article>
  )
}
