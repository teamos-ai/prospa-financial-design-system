// Button — the design system's action primitive.
// variant: primary | teal | pill | outline | ghost
const VARIANTS = {
  primary: 'btn-primary',
  teal: 'btn-teal',
  pill: 'btn-pill',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
}

export default function Button({ variant = 'primary', size, children, className = '', ...props }) {
  const classes = ['btn', VARIANTS[variant] || VARIANTS.primary]
  if (size === 'sm') classes.push('btn-sm')
  if (className) classes.push(className)
  return (
    <button className={classes.join(' ')} {...props}>
      {children}
    </button>
  )
}
