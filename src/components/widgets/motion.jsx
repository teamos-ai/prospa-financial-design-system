/* ============================================================
   WIDGET MOTION — the primitives every widget animates with.

   Ported from the Health OS widget library, which used Framer Motion.
   This system ships no runtime dependency beyond React, so the same
   four behaviours are rebuilt on IntersectionObserver, requestAnimation-
   Frame and an @property-animated custom property:

     useSeen      — fires once the element is far enough into view
     Figure       — a number that counts up from zero
     Grow         — a bar that scales from nothing along x or y
     SweepRing    — a ring whose conic-gradient arc sweeps to its value

   Every widget animates its measurement once, on entry, and settles on
   the final value. Under prefers-reduced-motion each one renders
   finished — no counting, no sweeping, no growing.
   ============================================================ */
import { useEffect, useRef, useState } from 'react'

/* The system's easing and reveal duration, matching --ease / --dur-reveal. */
export const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)'

/** True when the viewer has asked for less motion. Re-reads on change. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/**
 * True once the element has been at least `amount` visible, and stays true.
 * Always true immediately under reduced motion, so widgets render finished.
 */
export function useSeen(amount = 0.35) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (reduced || seen) return
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver !== 'function') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: Math.min(1, Math.max(0, amount)) }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [amount, reduced, seen])

  return { ref, seen: seen || reduced, reduced }
}

/**
 * A 0 → 1 progress value that runs once when `run` turns true.
 * Returns 1 straight away under reduced motion.
 */
export function useProgress(run, { duration = 1200, delay = 0 } = {}) {
  const reduced = useReducedMotion()
  const [p, setP] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (!run) return
    if (reduced) {
      setP(1)
      return
    }
    let raf = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now
      const t = Math.min(1, Math.max(0, (now - start - delay) / duration))
      // Ease-out quint — the curve --ease approximates.
      setP(1 - Math.pow(1 - t, 5))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, reduced, duration, delay])

  return p
}

const auFormat = (n, decimals) =>
  n.toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

/**
 * A number that counts up from zero when it comes into view.
 * The final value is always in the accessibility tree, so a screen reader
 * never reads a half-counted figure.
 */
export function Figure({ value, prefix = '', suffix = '', decimals = 0, duration = 1400, className }) {
  const { ref, seen } = useSeen(0.5)
  const p = useProgress(seen, { duration })
  const shown = `${prefix}${auFormat(value * p, decimals)}${suffix}`
  const final = `${prefix}${auFormat(value, decimals)}${suffix}`
  return (
    <span ref={ref} className={['w-fig', className].filter(Boolean).join(' ')}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}

/**
 * A bar that grows from nothing to `pct` (0–100) along x or y once in view.
 * Scales rather than animating width or height, so it never triggers layout.
 */
export function Grow({ pct, axis = 'x', delay = 0, duration = 1000, className, style }) {
  const { ref, seen, reduced } = useSeen(0.3)
  const size = `${Math.max(0, Math.min(100, pct))}%`
  const scale = seen ? 1 : 0
  return (
    <div
      ref={ref}
      className={['w-grow', axis === 'x' ? 'w-grow-x' : 'w-grow-y', className].filter(Boolean).join(' ')}
      style={{
        ...(axis === 'x' ? { width: size } : { height: size }),
        transform: axis === 'x' ? `scaleX(${scale})` : `scaleY(${scale})`,
        transition: reduced ? 'none' : `transform ${duration}ms ${EASE} ${delay}ms`,
        ...style,
      }}
    />
  )
}

/**
 * A ring drawn with a conic gradient whose arc sweeps to `pct` on entry.
 * The arc angle lives in the --w-arc custom property, registered with
 * @property in widgets.css so it can be transitioned. Where @property is
 * unsupported the ring simply renders at its final value.
 */
export function SweepRing({
  pct,
  size = 132,
  thickness = 13,
  stops,
  track = 'var(--track)',
  children,
  className,
  duration = 1400,
}) {
  const { ref, seen, reduced } = useSeen(0.4)
  const target = Math.max(0, Math.min(100, pct))
  const arc = seen ? target : 0
  const colours = stops
    .map((c, i) => `${c} calc(var(--w-arc) * ${(i / Math.max(1, stops.length - 1)).toFixed(3)})`)
    .join(', ')
  return (
    <div
      ref={ref}
      className={['w-ring', className].filter(Boolean).join(' ')}
      style={{
        width: size,
        height: size,
        '--w-arc': `${arc}%`,
        transition: reduced ? 'none' : `--w-arc ${duration}ms ${EASE}`,
        background: `conic-gradient(from -90deg, ${colours}, ${track} var(--w-arc))`,
      }}
    >
      <div className="w-ring-hole" style={{ inset: thickness }} />
      <div className="w-ring-face">{children}</div>
    </div>
  )
}
