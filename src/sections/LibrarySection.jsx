import { useEffect, useMemo, useRef, useState } from 'react'
import SectionHead from '../components/SectionHead.jsx'
import { libraryImages, libraryTags } from '../data/library.js'

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export default function LibrarySection() {
  const [active, setActive] = useState([]) // selected tags (OR)
  const [query, setQuery] = useState('')
  const [lightbox, setLightbox] = useState(null) // index into `filtered`
  const closeRef = useRef(null)

  const counts = useMemo(() => {
    const c = Object.fromEntries(libraryTags.map((t) => [t, 0]))
    libraryImages.forEach((im) => im.tags.forEach((t) => { if (c[t] != null) c[t]++ }))
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return libraryImages.filter((im) => {
      const tagOk = active.length === 0 || im.tags.some((t) => active.includes(t))
      const qOk =
        !q ||
        im.title.toLowerCase().includes(q) ||
        im.alt.toLowerCase().includes(q) ||
        im.slug.includes(q) ||
        im.tags.some((t) => t.toLowerCase().includes(q))
      return tagOk && qOk
    })
  }, [active, query])

  function toggleTag(t) {
    setActive((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]))
  }

  // Lightbox: keyboard nav + body scroll lock + focus the close button.
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % filtered.length)
      else if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + filtered.length) % filtered.length)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (closeRef.current) closeRef.current.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox, filtered.length])

  const current = lightbox !== null ? filtered[lightbox] : null

  return (
    <section id="library">
      <SectionHead eyebrow="Assets" title="Image Library">
        A curated set of on-brand lifestyle imagery — couples, retirement, advice and the outdoors.
        Filter by theme or search by keyword; click any image to view it larger with its tags and file
        name.
      </SectionHead>

      <div className="lib-controls">
        <div className="lib-search">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search images…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search images"
          />
        </div>
        <div className="lib-tags" role="group" aria-label="Filter by theme">
          <button type="button" className={'lib-chip' + (active.length === 0 ? ' on' : '')} onClick={() => setActive([])}>
            All <span>{libraryImages.length}</span>
          </button>
          {libraryTags.map((t) => (
            <button
              key={t}
              type="button"
              className={'lib-chip' + (active.includes(t) ? ' on' : '')}
              aria-pressed={active.includes(t)}
              onClick={() => toggleTag(t)}
            >
              {t} <span>{counts[t]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lib-count" aria-live="polite">
        {filtered.length} image{filtered.length !== 1 ? 's' : ''}
        {active.length ? ' · ' + active.join(', ') : ''}
        {query ? ` · “${query}”` : ''}
      </div>

      {filtered.length === 0 ? (
        <div className="lib-empty">
          No images match.{' '}
          <button type="button" onClick={() => { setActive([]); setQuery('') }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="lib-grid">
          {filtered.map((im, i) => (
            <figure
              className="lib-card"
              key={im.slug}
              role="button"
              tabIndex={0}
              aria-label={`View ${im.title}`}
              onClick={() => setLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setLightbox(i)
                }
              }}
            >
              <img src={im.src} alt={im.alt} loading="lazy" style={{ aspectRatio: String(im.ar) }} />
              <figcaption className="lib-cap">
                <b>{im.title}</b>
                <div className="lib-cap-tags">
                  {im.tags.slice(0, 3).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {current && (
        <div className="lib-lightbox" role="dialog" aria-modal="true" aria-label={current.title} onClick={() => setLightbox(null)}>
          <button ref={closeRef} type="button" className="lib-lb-close" aria-label="Close" onClick={() => setLightbox(null)}>
            ×
          </button>
          <button
            type="button"
            className="lib-lb-nav prev"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length) }}
          >
            ‹
          </button>
          <figure className="lib-lb-fig" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} />
            <figcaption>
              <b>{current.title}</b>
              <p>{current.alt}</p>
              <div className="lib-lb-tags">
                {current.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <code>{current.slug}.jpg</code>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lib-lb-nav next"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length) }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}
