// Icon — renders a 24px line icon from the token set at a 2px stroke.
import { icons } from '../data/tokens.js'

export default function Icon({ name, size = 26, inner }) {
  const markup = inner || icons[name] || ''
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
