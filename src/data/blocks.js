/* ============================================================
   BLOCK SAMPLE DATA

   Same rule as the widget data: everything here is invented, for
   showing a layout. Nothing is a Prospa Financial result, a client
   outcome, a testimonial or a price. The claims register in
   teamos-ai/lm-prospa governs what this brand may state, and it
   currently clears no testimonial, award or outcome claim at all —
   which is why every quote and the case study carry the Sample mark.

   Photos are from this system's own image library (public/library).
   ============================================================ */

const img = (slug, alt) => ({ src: `/library/${slug}.jpg`, alt })

/* ---- Features ------------------------------------------------------ */
export const featureItems = [
  { icon: 'Advice', title: 'Goals discovery', description: 'A conversation about what the money is actually for, before anything is recommended.' },
  { icon: 'Growth', title: 'Strategy', description: 'The plan written down: what changes, in what order, and what each step is meant to do.' },
  { icon: 'Protect', title: 'Protection', description: 'Life, TPD, trauma and income cover sized to the debts and the dependants, not to a default.' },
  { icon: 'Retire', title: 'Retirement', description: 'How the income gets replaced, including the years before preservation age.' },
  { icon: 'Secure', title: 'Structures', description: 'Personal name, spouse, trust, company, bond or super — how each behaves on the way in and out.' },
  { icon: 'Family', title: 'Estate', description: 'A will does not control super. The beneficiary nominations are checked and kept current.' },
]

export const featureCardItems = featureItems.slice(0, 3)

export const featureSteps = [
  {
    title: 'The free call',
    description: 'Thirty minutes, no obligation. What you want, what you have, and whether advice is the right next step.',
    image: img('adviser-client-laptop-office-smiling', 'Adviser and client smiling over a laptop in an office'),
  },
  {
    title: 'Fact find and risk profile',
    description: 'The full picture: income, assets, debts, cover and the risk you are comfortable carrying.',
    image: img('women-financial-planning-documents-home', 'Two women reviewing financial documents at a home table'),
  },
  {
    title: 'Strategy presented',
    description: 'A Statement of Advice you can read, with the reasoning for each recommendation written plainly.',
    image: img('adviser-client-tablet-lounge-consultation', 'Adviser showing a tablet to a client in a lounge'),
  },
  {
    title: 'Implementation and review',
    description: 'The plan put in place, then reviewed on a schedule as the law and your life both change.',
    image: img('advisers-desk-laptop-collaboration', 'Two advisers collaborating at a desk with a laptop'),
  },
]

export const featureTabs = [
  {
    icon: 'Wealth',
    title: 'Superannuation',
    description:
      'Consolidation, contribution strategy against the 2026–27 caps, and an investment mix that matches the time left before it is needed.',
    image: img('senior-couple-gardening-retirement-hobby', 'Senior couple gardening in raised vegetable beds'),
  },
  {
    icon: 'Growth',
    title: 'Investments',
    description:
      'What is held outside super, what it costs to hold, and whether the structure it sits in is the right one.',
    image: img('mature-couple-hiking-mountains-smartphone', 'Mature couple hiking in the mountains, checking a phone'),
  },
  {
    icon: 'Protect',
    title: 'Insurance',
    description:
      'Cover sized against the largest asset most people own — the income they have not earned yet.',
    image: img('senior-couple-embrace-outdoors-happy', 'Senior couple embracing and smiling outdoors'),
  },
]

/* ---- Bentos -------------------------------------------------------- */
export const featureBento = {
  hero: {
    live: 'Taking new clients',
    title: 'Advice that holds up when the plan meets real life',
    description:
      'A plan is only useful if it survives a job change, a market fall and a birthday. Every strategy is written to be reviewed, not filed.',
    image: img('senior-couple-coastal-hike-ocean-vista', 'Senior couple with backpacks overlooking a coastal ocean vista'),
  },
  highlight: { icon: 'Award', value: 38, suffix: '+', label: 'Years advising, across the team', prefix: '' },
  feature: {
    icon: 'Chat',
    title: 'Plain language, always',
    description: 'If a recommendation cannot be explained in a sentence, it is not ready to be made.',
  },
  action: { eyebrow: 'Start here', title: 'Book a free call', href: 'https://prospafinancial.com.au/contact-us/' },
  facts: [
    { value: 30, suffix: ' min', label: 'The first call' },
    { value: 'Two', label: 'Reviews a year' },
  ],
}

export const productBento = {
  figure: {
    value: 'One',
    title: 'One plan, one place',
    description: 'Super, investments, cover and estate in a single document rather than four conversations.',
  },
  booking: {
    title: 'Book without the back and forth',
    description: 'Pick a time that suits; the reminder and the agenda arrive on their own.',
    days: [
      { weekday: 'Mon', date: '5' },
      { weekday: 'Tue', date: '6' },
      { weekday: 'Wed', date: '7' },
      { weekday: 'Thu', date: '8' },
      { weekday: 'Fri', date: '9' },
    ],
    bookedDay: 2,
    slots: ['9:00 am', '10:30 am', '1:45 pm', '2:30 pm'],
    bookedSlot: 1,
  },
  message: {
    title: 'A question answered the same day',
    description: 'The adviser who wrote the plan is the one who replies.',
    incoming: 'Should I put the bonus into super or the mortgage?',
    reply: 'Depends on your marginal rate and the cap — let me run both and send you the numbers.',
  },
  pipeline: {
    title: 'You can see where things stand',
    description: 'Every file moves through the same stages, and you can see which one yours is in.',
    stages: [
      { label: 'Fact find', pct: 100 },
      { label: 'Strategy', pct: 72 },
      { label: 'Implementation', pct: 38 },
    ],
  },
  clients: {
    title: 'A household, not a login',
    description: 'Partners, trusts and self-managed funds sit together under one view.',
    rows: [
      { initials: 'JH', name: 'J. & R. Henderson', meta: 'Review due Nov' },
      { initials: 'MO', name: 'M. Okafor', meta: 'SOA in draft' },
      { initials: 'TR', name: 'The Ruzic Trust', meta: 'Implemented' },
    ],
  },
}

export const galleryBento = {
  eyebrow: 'The practice',
  title: 'Melbourne advice, with the door open',
  description:
    'We meet in person, on video, or wherever the conversation is easiest to have. The first one costs nothing.',
  action: { label: 'Book a Free Call', href: 'https://prospafinancial.com.au/contact-us/' },
  photos: {
    portrait: img('senior-businessman-navy-suit-confident', 'Senior businessman in a navy suit standing by a window'),
    wide: img('professionals-laughing-meeting-candid', 'Professionals laughing together in a candid meeting'),
    second: img('diverse-professionals-seminar-listening', 'Diverse professionals listening at a seminar'),
  },
  details: [
    { icon: 'Plan', label: 'Where', value: 'Melbourne, and by video' },
    { icon: 'Call', label: 'First call', value: '30 minutes, no cost' },
    { icon: 'Doc', label: 'What you get', value: 'A written plan you keep' },
  ],
}

/* ---- Pricing ------------------------------------------------------
   Illustrative service levels. The published rate card is the only
   place a real fee may come from, and anything charged on top has to
   be stated on the card that charges it. */
export const plans = [
  {
    name: 'Review',
    icon: 'Doc',
    price: 195,
    annualPrice: 1950,
    annualCadence: 'AUD / year',
    cadence: 'AUD / month',
    description: 'A second opinion on a plan that already exists, reviewed once a year.',
    features: ['One scheduled review a year', 'Super and insurance check', 'Written summary you keep'],
    action: { label: 'Enquire', href: 'https://prospafinancial.com.au/contact-us/' },
  },
  {
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
    guarantee: { name: 'First call is free', text: 'The first thirty-minute call carries no fee and no obligation.' },
    featured: true,
  },
  {
    name: 'Complex',
    icon: 'Secure',
    price: 895,
    annualPrice: 8950,
    annualCadence: 'AUD / year',
    cadence: 'AUD / month',
    fee: '+ $5,500 AUD initial advice fee',
    description: 'Self-managed funds, trusts and business structures, with the coordination that needs.',
    features: [
      'Four touchpoints a year',
      'SMSF strategy and compliance support',
      'Trust and company structuring',
      'Accountant and solicitor liaison',
    ],
    action: { label: 'Enquire', href: 'https://prospafinancial.com.au/contact-us/' },
  },
]

export const pricingNote =
  'Illustrative figures in AUD, shown to demonstrate the layout. Fees are quoted per engagement after the first call — the published rate card is the only source for a real fee.'

/* ---- FAQ ----------------------------------------------------------- */
export const faqItems = [
  {
    question: 'What happens on the first call?',
    answer:
      'Thirty minutes, no cost and no obligation. We ask what you want the money to do, what you already have in place, and whether advice is the right next step. Sometimes the answer is that it is not, and we say so.',
    image: img('professionals-cafe-meeting-coffee-discussion', 'Professionals in discussion over coffee at a café'),
  },
  {
    question: 'How are you paid?',
    answer:
      'A fee for the advice, agreed in writing before any work starts. It is set per engagement and disclosed in full, including anything charged on top.',
  },
  {
    question: 'Do I need a certain amount to invest?',
    answer:
      'No. What matters more is whether there is a decision worth getting right — a bonus to allocate, a redundancy, a property, or the years between stopping work and reaching preservation age.',
    image: img('mature-couple-cafe-conversation-iced-drinks', 'Mature couple talking over iced drinks at a café table'),
  },
  {
    question: 'Can you work with my accountant?',
    answer:
      'Yes, and for anything involving a trust, a company or a self-managed fund we would expect to. Advice given without the tax picture is half an answer.',
  },
]

/* ---- Testimonials — Sample copy, every one ------------------------- */
export const testimonials = [
  { quote: 'The plan was the first one I could actually read. Every recommendation had a reason next to it.', name: 'Sample Client', role: 'Executive, Melbourne', context: 'Strategy' },
  { quote: 'They told me one of the things I was planning to do was a bad idea, and why. That is when I trusted the rest.', name: 'Sample Client', role: 'Business owner, VIC', context: 'Advice' },
  { quote: 'The gap years were the part I had never thought about. Seeing them drawn out changed the whole plan.', name: 'Sample Client', role: 'Pre-retiree', context: 'Retirement' },
  { quote: 'My accountant and my adviser were in the same conversation. That had never happened before.', name: 'Sample Client', role: 'SMSF trustee', context: 'Structures' },
  { quote: 'The insurance review found cover I was paying for twice and a gap I did not know I had.', name: 'Sample Client', role: 'Parent of two', context: 'Protection' },
  { quote: 'Reviews happen whether or not I chase them, which is the only reason the plan stayed current.', name: 'Sample Client', role: 'Ongoing client', context: 'Service' },
]

/* ---- Case study — Sample engagement -------------------------------- */
export const caseStudy = {
  client: 'A sample executive household',
  sector: 'Pre-retirement · Melbourne',
  summary:
    'Two strong incomes, a mortgage most of the way down, and no clear answer to the question of when work could stop.',
  image: img('senior-couple-beach-embrace-content', 'Content senior couple embracing on a beach'),
  figures: [
    { value: 9, suffix: ' yrs', label: 'Between stopping and preservation age' },
    { value: 4, label: 'Super accounts consolidated' },
    { value: 2, label: 'Structures compared before choosing' },
  ],
  movements: [
    {
      icon: 'Plan',
      title: 'The years nobody had costed',
      body: 'Both wanted to stop at fifty-one. Preservation age is sixty, so there were nine years to fund from outside super, and nothing had been set aside to do it.',
    },
    {
      icon: 'Growth',
      title: 'Split the problem in two',
      body: 'Contributions kept filling the concessional cap for the long horizon, while a separate parcel outside super was built specifically to carry the gap years.',
    },
    {
      icon: 'Award',
      title: 'A date instead of a hope',
      body: 'The plan now names a year rather than an ambition, and the annual review tests it against what actually happened.',
    },
  ],
  quote: {
    text: 'We had been saving hard without knowing what we were saving towards. Now there is a date on it.',
    name: 'Sample Client',
    role: 'Not a Prospa Financial engagement',
  },
}
