// ============================================================
// PROSPA FINANCIAL — team roster for the sidebar "Meet the Team"
// swipe carousel. Names, roles, photos and bios are the real Prospa
// Financial team (prospafinancial.com.au/about-us). Headshots live in
// public/team/. `accent` is the fallback avatar colour if a photo
// ever fails to load.
// ============================================================

export const ABOUT_URL = 'https://prospafinancial.com.au/about-us/'

export const team = [
  {
    name: 'Peter Prvulj',
    role: 'Principal Financial Adviser',
    photo: '/team/peter.png',
    accent: '#5dce38',
    bio: 'A Certified Financial Planner with 38+ years in wealth management, Peter specialises in holistic strategies and SMSF advice, with a deep commitment to client-centric service.',
  },
  {
    name: 'Karthik Ganapathy',
    role: 'Senior Financial Adviser',
    photo: '/team/karthik.png',
    accent: '#2fa86b',
    bio: 'As a Senior Financial Adviser, Karthik partners with clients to build and protect long-term wealth through considered, strategic advice tailored to each goal.',
  },
  {
    name: 'Neil Mistry',
    role: 'Financial Adviser',
    photo: '/team/neil.png',
    accent: '#7fd4a0',
    bio: 'With eight years’ experience, a Bachelor of Commerce and a Graduate Diploma in Financial Planning, Neil is passionate about empowering people through clear, practical advice.',
  },
  {
    name: 'Monik Palany',
    role: 'Provisional Adviser',
    photo: '/team/monik.png',
    accent: '#4eb52d',
    bio: 'An eight-year financial-services veteran, Monik blends financial planning with data analytics — and is also a commercial pilot with a strong family focus.',
  },
  {
    name: 'Sam Ryan',
    role: 'Associate Adviser',
    photo: '/team/sam.jpg',
    accent: '#86e05a',
    bio: 'A four-year industry professional with a Bachelor of Commerce and Graduate Diploma in Financial Planning, Sam delivers tailored, client-focused strategies and high service standards.',
  },
  {
    name: 'Sanika Mane',
    role: 'Associate Planner',
    photo: '/team/sanika.jpg',
    accent: '#1f9d5b',
    bio: 'A five-year paraplanning expert with an MBA in Finance, Sanika specialises in aged-care advice and complex financial modelling with meticulous attention to detail.',
  },
  {
    name: 'Dinal De Silva',
    role: 'Senior Paraplanner',
    photo: '/team/dinal.png',
    accent: '#a8e063',
    bio: 'A Senior Paraplanner with eight years’ experience and strong SMSF expertise, Dinal is skilled in complex advice documentation and compliance — and loves travel and family.',
  },
  {
    name: 'Margareta Paxinos',
    role: 'Practice Manager',
    photo: '/team/margareta.jpg',
    accent: '#34b35a',
    bio: 'Practice Manager with 20+ years in financial services, Margareta runs operations, bookkeeping and administration with meticulous attention to detail.',
  },
  {
    name: 'Nic Masunda',
    role: 'Client Services Manager',
    photo: '/team/nic.jpg',
    accent: '#2fa86b',
    bio: 'As Client Services Manager, Nic keeps the client experience running smoothly, coordinating the team so advice is delivered seamlessly from first call to follow-up.',
  },
  {
    name: 'Fiona Rintoul',
    role: 'Client Service Officer',
    photo: '/team/fiona.png',
    accent: '#5dce38',
    bio: 'A banking and finance professional since 1980 with an international background, Fiona brings a warm, client-focused approach and deep industry knowledge.',
  },
  {
    name: 'James Larkworthy',
    role: 'Client Service Officer',
    photo: '/team/james.jpg',
    accent: '#4eb52d',
    bio: 'With a Bachelor of Commerce in Finance from Monash, James supports the advisory team with quality administrative and client-service work — and is a keen St Kilda AFL supporter.',
  },
]

export function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function handle(name) {
  return '@' + name.split(' ')[0].toLowerCase()
}
