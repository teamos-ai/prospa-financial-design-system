/* ============================================================
   WIDGET SAMPLE DATA

   Every figure below is invented, for showing the widget's shape only.
   None of it is a Prospa Financial result, a client outcome or a
   performance claim, and none of it should be reused as one — the
   claims register in teamos-ai/lm-prospa governs what this brand may
   state, and it deliberately omits the published "500+ customers" and
   "50+ years" lines until compliance has cleared them.

   The content is practice-operations shaped (bookings, reviews, a
   pipeline, a quarter against the one before it) rather than
   advice-shaped, so a reader cannot mistake a demo for guidance.
   ============================================================ */

/* 01 · Stat tiles */
export const statTiles = [
  { label: 'Reviews booked', value: 128, icon: 'Plan', accent: 'teal' },
  { label: 'Strategies live', value: 86, icon: 'Growth', accent: 'green' },
  { label: 'Awaiting documents', value: 14, icon: 'Doc', accent: 'ember' },
]

/* 02 · Gradient ring */
export const ringData = {
  value: 72,
  unit: 'complete',
  caption: 'Statements of Advice issued against those scheduled this quarter.',
}

/* 03 · Capacity meter */
export const capacity = { used: 18, total: 24, unit: 'review slots', note: 'This fortnight' }

/* 04 · Trend card */
export const trend = {
  label: 'First appointments',
  value: 42,
  delta: 12,
  points: [18, 22, 20, 27, 25, 31, 29, 36, 34, 39, 38, 42],
}

/* 06 · Tracking cluster */
export const tracking = [
  { label: 'Fact finds', value: 92, accent: 'teal' },
  { label: 'Risk profiles', value: 78, accent: 'green' },
  { label: 'ID verified', value: 64, accent: 'ember' },
]

/* 07 · Bar cluster */
export const barCluster = {
  currentLabel: 'This quarter',
  previousLabel: 'Last quarter',
  series: [
    { label: 'Jul', current: 34, previous: 28 },
    { label: 'Aug', current: 41, previous: 33 },
    { label: 'Sep', current: 38, previous: 36 },
    { label: 'Oct', current: 46, previous: 31 },
    { label: 'Nov', current: 44, previous: 39 },
    { label: 'Dec', current: 29, previous: 24 },
  ],
}

/* 08 · Countdown — the end of the current Australian financial year. */
export const eofyTarget = new Date('2027-07-01T00:00:00+10:00')

/* 09 · Leaderboard — advisers by reviews completed. */
export const leaderboard = [
  { name: 'Peter Prvulj', initials: 'PP', value: 34, accent: 'teal' },
  { name: 'Karthik Ganapathy', initials: 'KG', value: 29, accent: 'green' },
  { name: 'Neil Mistry', initials: 'NM', value: 24, accent: 'teal' },
  { name: 'Monik Palany', initials: 'MP', value: 18, accent: 'ember' },
]

/* 10 · Agenda */
export const agenda = [
  { time: '9:00', title: 'Annual review — the Hendersons', detail: 'Super consolidation and insurance', status: 'confirmed', accent: 'green' },
  { time: '10:30', title: 'First appointment — J. Okafor', detail: 'Pre-retirement, gap years', status: 'confirmed', accent: 'teal' },
  { time: '13:00', title: 'SOA presentation — M. Ruzic', detail: 'Awaiting signed authority', status: 'pending', accent: 'ember' },
  { time: '15:15', title: 'Introduction — referral', detail: 'From an existing client', status: 'new', accent: 'teal' },
]

/* 11 · Score gauge — the Executive Wealth Score's own geometry. */
export const score = { value: 66, max: 100, unit: 'wealth score' }

/* 12 · Breakdown bar — where a sample balance sheet sits. */
export const breakdown = [
  { label: 'Superannuation', value: 48, accent: 'teal' },
  { label: 'Outside super', value: 31, accent: 'green' },
  { label: 'Owner-occupied property', value: 21, accent: 'neutral' },
]

/* 13 · Activity heatmap — six weeks of client contact, levels 0–4. */
export const heatmap = {
  caption: 'Client contact over the last six weeks, Monday to Sunday',
  weeks: [
    [1, 2, 3, 2, 4, 0, 0],
    [2, 3, 4, 3, 2, 1, 0],
    [0, 2, 2, 4, 3, 0, 0],
    [3, 4, 3, 2, 4, 1, 0],
    [1, 2, 4, 4, 3, 0, 0],
    [2, 3, 3, 4, 2, 1, 0],
  ],
}

/* 14 · Revenue card — practice fees, not client returns. */
export const revenue = {
  collected: 184500,
  billed: 212000,
  categories: [
    { label: 'Ongoing advice', value: 118000, accent: 'teal' },
    { label: 'Statements of Advice', value: 54000, accent: 'green' },
    { label: 'Insurance', value: 28000, accent: 'ember' },
    { label: 'SMSF', value: 12000, accent: 'neutral' },
  ],
}

/* 15 · Avatar cluster */
export const avatarCluster = {
  people: [
    { initials: 'PP', accent: 'teal' },
    { initials: 'KG', accent: 'green' },
    { initials: 'NM', accent: 'ember' },
    { initials: 'MP', accent: 'teal' },
    { initials: 'FD', accent: 'neutral' },
  ],
  total: 11,
  caption: 'The advice team attached to this household file.',
}

/* 16 · Conversion funnel */
export const funnel = [
  { label: 'Enquiries', value: 240, note: 'All sources', accent: 'teal' },
  { label: 'Free calls booked', value: 148, note: '62% of enquiries', accent: 'teal' },
  { label: 'Fact finds held', value: 96, note: '65% of calls', accent: 'green' },
  { label: 'Advice engaged', value: 54, note: '56% of fact finds', accent: 'green' },
]

/* 17 · Metric strip */
export const metricStrip = {
  period: 'vs last quarter',
  items: [
    { label: 'Households', value: 412, delta: 6 },
    { label: 'Funds under advice', value: 318, prefix: '$', suffix: 'm', delta: 9 },
    { label: 'Avg. review time', value: 54, suffix: 'min', delta: -8 },
    { label: 'Retention', value: 96.4, suffix: '%', decimals: 1, delta: 1.2 },
  ],
}

/* 18 · Category donut */
export const donut = {
  totalLabel: 'under advice',
  totalValue: '$318m',
  segments: [
    { label: 'Superannuation', value: 142, accent: 'teal' },
    { label: 'Pension accounts', value: 86, accent: 'green' },
    { label: 'Investments outside super', value: 61, accent: 'ember' },
    { label: 'Cash and term deposits', value: 29, accent: 'neutral' },
  ],
}

/* 19 · Progress rows */
export const progressRows = [
  { label: 'Fact find complete', value: 100, accent: 'green' },
  { label: 'Risk profile signed', value: 82, accent: 'teal' },
  { label: 'Insurance review', value: 54, accent: 'ember' },
  { label: 'Estate documents sighted', value: 31, accent: 'neutral' },
]

/* 20 · Ticked gauge */
export const ticked = { value: 74, unit: 'file readiness' }

/* 21 · Goal progress */
export const goal = { label: 'Deposit goal', current: 128000, target: 160000, onTrack: true }

/* 22 · Comparison */
export const comparison = {
  current: 46,
  previous: 31,
  currentLabel: 'Reviews this quarter',
  previousLabel: 'Last quarter',
  unit: 'reviews',
}

/* 23 · Mini calendar — October 2026 starts on a Thursday. */
export const calendar = {
  monthLabel: 'October 2026',
  daysInMonth: 31,
  startOffset: 3,
  today: 1,
  booked: [2, 6, 7, 13, 15, 20, 21, 27, 29],
  defaultSelected: 7,
}

/* 24 · Slot picker */
export const slots = {
  label: 'Wednesday 7 October',
  defaultSelected: '10:30 am',
  slots: [
    { time: '9:00 am' },
    { time: '9:45 am', taken: true },
    { time: '10:30 am' },
    { time: '11:15 am' },
    { time: '1:00 pm', taken: true },
    { time: '1:45 pm' },
    { time: '2:30 pm' },
  ],
}

/* 25 · Onboarding stepper */
export const steps = [
  { title: 'Free call held', status: 'done', detail: '30 minutes, no obligation' },
  { title: 'Fact find and risk profile', status: 'done', detail: 'Completed online' },
  { title: 'Strategy presented', status: 'current', detail: 'Draft Statement of Advice in review' },
  { title: 'Implementation', status: 'next' },
  { title: 'First annual review', status: 'next', detail: 'Twelve months on' },
]

/* 26 · Plan card — advice service levels. Illustrative pricing only; the
   published rate card is the only place a real fee may come from. */
export const planCard = {
  name: 'Comprehensive',
  icon: 'Award',
  price: 495,
  annualPrice: 4950,
  annualCadence: 'AUD / year',
  cadence: 'AUD / month',
  fee: '+ $3,300 AUD initial advice fee',
  description: 'Ongoing advice across super, investments, insurance and estate, reviewed twice a year.',
  features: [
    'Two scheduled reviews a year',
    'Portfolio and insurance monitoring',
    'Direct line to your adviser',
    'Annual estate and beneficiary check',
  ],
  action: { label: 'Book a Free Call', href: 'https://prospafinancial.com.au/contact-us/' },
}

/* 27 · Toggle settings */
export const toggles = [
  { id: 'statements', label: 'Quarterly statements', detail: 'Emailed as a PDF', enabled: true },
  { id: 'reminders', label: 'Review reminders', detail: 'Two weeks before each review', enabled: true },
  { id: 'market', label: 'Market commentary', detail: 'Monthly, from the investment committee', enabled: false },
  { id: 'sms', label: 'SMS appointment reminders', detail: 'The day before', enabled: true },
]

/* 28 · Activity feed */
export const feed = [
  { initials: 'KG', accent: 'green', actor: 'Karthik', action: 'issued a Statement of Advice', time: '12m' },
  { initials: 'NM', accent: 'teal', actor: 'Neil', action: 'completed an insurance review', time: '1h' },
  { initials: 'PP', accent: 'teal', actor: 'Peter', action: 'added a file note', time: '3h' },
  { initials: 'MP', accent: 'ember', actor: 'Monik', action: 'requested client identification', time: 'Yesterday' },
]

/* 29 · Rating summary — a sample practice survey, not a testimonial. */
export const rating = { average: 4.7, count: 86, distribution: [64, 15, 5, 1, 1] }

/* 30 · Assistant message */
export const assistant = {
  name: 'Prospa Assistant',
  message:
    'Salary sacrifice is taxed at 15% inside super rather than your marginal rate, and the 2026–27 concessional cap is $32,500 including employer contributions. General information only.',
}

/* 31 · Check-in */
export const checkIn = {
  question: 'How are you feeling about your plan?',
  options: ['Unsure', 'Getting there', 'Steady', 'Confident'],
}
