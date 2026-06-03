// Badge / Tag. variant: solid | green | teal | soft
const VARIANTS = {
  solid: 'badge-solid',
  green: 'badge-green',
  teal: 'badge-teal',
  soft: 'badge-soft',
}

export default function Badge({ variant = 'soft', dot = false, children }) {
  return (
    <span className={'badge ' + (VARIANTS[variant] || VARIANTS.soft)}>
      {dot && <span className="d" />}
      {children}
    </span>
  )
}
