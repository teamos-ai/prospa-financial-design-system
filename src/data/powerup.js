// ============================================================
// PROSPA FINANCIAL — "Example Power-Up" data
// Mock AI assistant prompts/responses + Australian financial constants
// used by the example calculators. Figures are 2025-26 (verified against
// ATO / ASIC MoneySmart). Calculators are estimates for illustration only.
// ============================================================

export const GENERAL_ADVICE_WARNING =
  'General advice warning — This AI assistant and the calculators provide general information only. They do not consider your objectives, financial situation or needs, and are not personal financial advice. Consider the relevant Product Disclosure Statement and speak with a licensed Prospa Financial adviser before making any decision.'

// Command-bar suggestion chips (slash-command style, like the reference).
export const aiSuggestions = [
  { cmd: '/book', label: 'a call', icon: 'call', key: 'book' },
  { cmd: '/calculate', label: 'retirement income', icon: 'retire', key: 'retirement' },
  { cmd: '/compare', label: 'super funds', icon: 'compare', key: 'super' },
  { cmd: '/explain', label: 'salary sacrifice', icon: 'doc', key: 'sacrifice' },
  { cmd: '/review', label: 'my budget', icon: 'chart', key: 'budget' },
  { cmd: '/stack', label: 'first home buyer', icon: 'stack', key: 'firsthome' },
  { cmd: '/grow', label: 'my wealth', icon: 'growth', key: 'grow' },
  { cmd: '/protect', label: 'my family', icon: 'shield', key: 'protect' },
]

export const BOOK_A_CALL_URL = 'https://prospafinancial.com.au/contact-us/'

// Canned example answers — demonstrate "instant answers, calculations,
// comparisons". Each is illustrative only (the warning banner covers advice).
export const aiResponses = {
  book: {
    paras: [
      'Absolutely — booking a call with a Prospa adviser takes about 30 seconds.',
      'You’ll get a free, no-obligation chat to talk through your goals and see how we can help. No jargon, no pressure.',
    ],
    bullets: [],
    cta: '',
    action: { label: 'Book a Free Call', href: 'https://prospafinancial.com.au/contact-us/' },
  },
  retirement: {
    paras: [
      'Here’s a quick example. A 45-year-old earning $120,000 with $180,000 in super, employer contributions at 12% and a 6.5% p.a. return could reach roughly $890,000 by age 67.',
      'Salary-sacrificing an extra $500 a month could lift that to about $1.02M — a meaningful difference from a small, consistent change.',
    ],
    bullets: [],
    cta: 'Run your own numbers in the Superannuation calculator below.',
  },
  super: {
    paras: ['Comparing two funds on the things that actually move the needle:'],
    bullets: [
      'Fees — 1.0% vs 0.6% a year on a $200k balance is about $800/year, which compounds to tens of thousands over decades.',
      'Long-term net return (after fees and tax) — the single biggest driver of your final balance.',
      'Insurance cover and investment options that suit your stage of life.',
    ],
    cta: 'I can’t recommend a specific fund here, but the calculators below show how fees and returns compound.',
  },
  sacrifice: {
    paras: [
      'Salary sacrifice redirects some pre-tax salary into super. Because concessional contributions are taxed at 15% rather than your marginal rate (up to 45%), it can be tax-effective.',
      'Example: sacrificing $10,000 while on the 30% bracket saves roughly $1,500 in tax this year and boosts your retirement savings. The 2025–26 concessional cap is $30,000, including employer contributions.',
    ],
    bullets: [],
    cta: 'See the effect in the Income Tax and Superannuation calculators below.',
  },
  budget: {
    paras: [
      'A simple 50/30/20 starting point: 50% to needs, 30% to wants, 20% to savings and extra debt repayment.',
      'Tell me your monthly take-home and I’d sketch where it could go — in a live deployment this pulls from your linked accounts.',
    ],
    bullets: [],
    cta: 'Model how those savings grow with the Compound Growth calculator below.',
  },
  firsthome: {
    paras: ['A typical first-home-buyer “stack” in Australia might combine:'],
    bullets: [
      'The First Home Super Saver Scheme to save a deposit inside super, tax-effectively.',
      'A high-interest savings account for the rest of the deposit.',
      'A borrowing-power and repayment check before you start shopping.',
    ],
    cta: 'Estimate repayments on a target purchase price with the Mortgage calculator below.',
  },
  grow: {
    paras: [
      'Growing wealth comes down to three things: time in the market, diversification, and keeping fees low.',
      'Even $500 a month at a 6.5% return grows to about $230,000 over 20 years — and most of that is investment growth, not your contributions.',
    ],
    bullets: [],
    cta: 'See it for yourself in the Compound Growth calculator below.',
  },
  protect: {
    paras: [
      'Protecting your family is about the right mix of life, TPD, trauma and income-protection cover — sized to your debts, dependants and lifestyle, not a one-size-fits-all default.',
      'A simple starting point: enough to clear the mortgage, replace a few years of income, and cover the kids’ education.',
    ],
    bullets: [],
    cta: 'A Prospa adviser can tailor this to your situation.',
  },
  fallback: {
    paras: [
      'Great question. In a live deployment, I’d answer that from Prospa’s vetted knowledge base with figures tailored to you — instantly, any time of day.',
      'For this example, try one of the prompts below, or jump straight into the calculators.',
    ],
    bullets: [],
    cta: '',
  },
}

// Keyword → response key, for free-typed queries.
export function matchResponseKey(text) {
  const t = text.toLowerCase()
  if (/book|call|appointment|meeting|speak|talk to|adviser/.test(t)) return 'book'
  if (/retire|pension|nest egg/.test(t)) return 'retirement'
  if (/super|fund|smsf/.test(t)) return 'super'
  if (/sacrifice|contribut|concessional/.test(t)) return 'sacrifice'
  if (/protect|insurance|cover|life insurance|tpd|trauma|income protection/.test(t)) return 'protect'
  if (/grow|invest|wealth|portfolio|share|etf/.test(t)) return 'grow'
  if (/budget|spend|save|saving/.test(t)) return 'budget'
  if (/home|mortgage|property|deposit|first/.test(t)) return 'firsthome'
  if (/tax|income/.test(t)) return 'sacrifice'
  return 'fallback'
}

// ---- Australian financial constants (2025-26) ----
// Resident income tax brackets: [upTo, rate]. Top band uses Infinity.
export const TAX_BRACKETS_2025_26 = [
  { upTo: 18200, rate: 0 },
  { upTo: 45000, rate: 0.16 },
  { upTo: 135000, rate: 0.3 },
  { upTo: 190000, rate: 0.37 },
  { upTo: Infinity, rate: 0.45 },
]
export const MEDICARE_LEVY = 0.02
export const LITO = { max: 700, fullUpTo: 37500, phaseOutEnd: 45000, taperPerDollar: 0.05 }
export const SUPER_GUARANTEE = 0.12 // 2025-26
export const CONCESSIONAL_CAP = 30000 // 2025-26
export const CONTRIB_TAX = 0.15
