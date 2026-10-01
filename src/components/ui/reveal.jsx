/* ============================================================
   REVEAL — the two entrance helpers the blocks share.

   Health OS had these as FadeIn and Stagger on Framer Motion. Here they
   are the widget library's useSeen plus a CSS transition, so they cost
   nothing at runtime and settle instantly under reduced motion.
   ============================================================ */
import { Children, cloneElement, isValidElement } from 'react'
import { useSeen } from '../widgets/motion.jsx'

/** Rises once as it comes into view. `as` picks the element. */
export function FadeIn({ as: As = 'div', delay = 0, className, children, ...rest }) {
  const { ref, seen } = useSeen(0.25)
  return (
    <As
      ref={ref}
      className={['reveal', seen && 'in', className].filter(Boolean).join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </As>
  )
}

/**
 * Rises its children in turn. Each child gets a transition delay rather
 * than its own observer, so a long list costs one observer, not twenty.
 */
export function Stagger({ as: As = 'div', step = 70, className, children, ...rest }) {
  const { ref, seen } = useSeen(0.15)
  return (
    <As ref={ref} className={className} {...rest}>
      {Children.map(children, (child, i) =>
        isValidElement(child)
          ? cloneElement(child, {
              className: ['reveal', seen && 'in', child.props.className].filter(Boolean).join(' '),
              style: { transitionDelay: `${i * step}ms`, ...child.props.style },
            })
          : child
      )}
    </As>
  )
}
