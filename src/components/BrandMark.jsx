// The Prospa growth/leaf wordmark. The original logo.svg in the brand
// folder was a stray caret icon, so this clean leaf mark stands in.
export default function BrandMark({ size = 38, className = 'brand-mark' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20 3C12 9 8 16 8 24a12 12 0 0 0 24 0c0-8-4-15-12-21Z" fill="#5dce38" />
      <path d="M20 12v22M20 20l-5-4M20 25l5-4" stroke="#0a363c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
