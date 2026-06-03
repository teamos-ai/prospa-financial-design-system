import Icon from './Icon.jsx'

// ServiceCard — lifts on hover over a soft teal shadow.
// Pass either `icon` (inner SVG markup) for the icon variant,
// or `num` (e.g. "01") for the numbered process variant.
export default function ServiceCard({ icon, num, title, children }) {
  return (
    <div className="svc-card">
      {num ? <div className="num">{num}</div> : icon ? <div className="ic"><Icon inner={icon} /></div> : null}
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  )
}
