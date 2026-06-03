// SectionHead — the eyebrow + title + lede block that opens each section.
export default function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="sec-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}
