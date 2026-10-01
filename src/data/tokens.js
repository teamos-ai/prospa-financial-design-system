// ============================================================
// PROSPA FINANCIAL — token data consumed by the reference site.
// ============================================================

export const colorGroups = [
  {
    title: 'Brand',
    swatches: [
      { name: 'Teal — Primary', hex: '#135f69', dark: true },
      { name: 'Green — Secondary', hex: '#5dce38', dark: true },
      { name: 'Accent — Mist', hex: '#d0dfe1', dark: false },
      { name: 'Teal — Deep', hex: '#0a363c', dark: true },
    ],
  },
  {
    title: 'Surfaces',
    swatches: [
      { name: 'Base White', hex: '#ffffff', dark: false, border: true },
      { name: 'Green Tint', hex: '#f2fbef', dark: false },
      { name: 'Teal Tint', hex: '#f3f7f7', dark: false },
      { name: 'Inverse Teal', hex: '#135f69', dark: true },
    ],
  },
  {
    title: 'Neutrals & Text',
    swatches: [
      { name: 'Ink — Heading', hex: '#121212', dark: true },
      { name: 'Slate — Strong', hex: '#33373d', dark: true },
      { name: 'Gray — Body', hex: '#616773', dark: true },
      { name: 'Hairline', hex: '#ededed', dark: false },
    ],
  },
]

// Spacing scale — 5px base unit. [token, px]
export const spacingScale = [
  ['s2', 40],
  ['s4', 50],
  ['s6', 70],
  ['s8', 80],
  ['s10', 100],
  ['s12', 130],
  ['s13', 200],
  ['s14', 270],
]

export const radii = [
  { name: 'Control', v: '10px' },
  { name: 'Card sm', v: '15px' },
  { name: 'Card', v: '20px' },
  { name: 'Panel', v: '30px' },
  { name: 'Pill', v: '100px' },
]

export const shadows = [
  { name: 'Card', v: '0 0 60px · 8%', css: 'rgba(19,95,105,.08) 0 0 60px 0' },
  { name: 'Raised', v: '0 8px 60px · 12%', css: 'rgba(19,95,105,.12) 0 8px 60px 0' },
  { name: 'Glow / Focus', v: '0 0 20px · 62%', css: 'rgba(19,95,105,.62) 0 0 20px 0' },
]

export const typeScale = [
  { label: 'Display', style: { fontSize: 56, fontWeight: 700, letterSpacing: '-.03em' }, spec: 'H1 / 56px', detail: 'Bold · 700 · -3% tracking' },
  { label: 'Section Title', style: { fontSize: 40, fontWeight: 700, letterSpacing: '-.02em' }, spec: 'H2 / 40px', detail: 'Bold · 700 · -2% tracking' },
  { label: 'Subsection Heading', style: { fontSize: 26, fontWeight: 700 }, spec: 'H3 / 26px', detail: 'Bold · 700' },
  { label: 'Card & Lead Title', style: { fontSize: 20, fontWeight: 600 }, spec: 'H4 / 20px', detail: 'SemiBold · 600' },
  {
    label: 'Body copy sits at sixteen pixels in warm gray for relaxed, trustworthy reading across long passages of advice.',
    style: { fontSize: 16, fontWeight: 400, color: 'var(--gray)' },
    spec: 'Body / 16px',
    detail: 'Regular · 400 · #616773',
  },
  {
    label: 'Eyebrow Label',
    style: { fontSize: 12, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--teal)' },
    spec: 'Overline / 12px',
    detail: 'SemiBold · +16% tracking',
  },
]

export const motionTokens = [
  { ms: 250, name: 'Snap' },
  { ms: 300, name: 'Base' },
  { ms: 500, name: 'Reveal' },
  { ms: 1000, name: 'Fade' },
]

// 24px line icons at 2px stroke — keyed by label, value is inner SVG markup.
export const icons = {
  Advice: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  Growth: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  Protect: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
  Retire: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  Wealth: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"/>',
  Family: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 21a7 7 0 0 1 14 0M16 21a6 6 0 0 1 6 0"/>',
  Plan: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  Call: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  Secure: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  Doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  Award: '<circle cx="12" cy="8" r="6"/><path d="m8.5 13-1.5 8 5-3 5 3-1.5-8"/>',
  Chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
}

export const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'color', label: 'Color' },
  { id: 'type', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius & Elevation' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
  { id: 'components', label: 'Components' },
  { id: 'powerup', label: 'Power-Up' },
  { id: 'calculators', label: 'Calculators' },
  { id: 'icons', label: 'Iconography' },
  { id: 'library', label: 'Image Library' },
  { id: 'lead-magnets', label: 'Three Items Lead Magnet' },
  { id: 'motion', label: 'Motion' },
  { id: 'voice', label: 'Voice & Tone' },
]
