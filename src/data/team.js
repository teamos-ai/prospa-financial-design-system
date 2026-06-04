// ============================================================
// PROSPA FINANCIAL — team roster for the sidebar "Meet the Team"
// infinite-scroll cards.
//
// TO ADD REAL PHOTOS: drop image files into `public/team/` (e.g.
// public/team/peter.jpg) and set `photo: '/team/peter.jpg'` on the
// matching member below. Until a photo is set, a branded initials
// avatar is shown automatically. Names/roles are placeholders —
// replace with the real team.
// ============================================================

export const team = [
  { name: 'Peter Nguyen', role: 'Principal Adviser', accent: '#5dce38', photo: null },
  { name: 'Sarah Whitlock', role: 'Senior Financial Planner', accent: '#2fa86b', photo: null },
  { name: 'James Okafor', role: 'Investment Strategist', accent: '#7fd4a0', photo: null },
  { name: 'Aisha Rahman', role: 'Superannuation Specialist', accent: '#4eb52d', photo: null },
  { name: 'Daniel Cooper', role: 'Retirement Adviser', accent: '#86e05a', photo: null },
  { name: 'Mia Bennett', role: 'Client Relationships', accent: '#1f9d5b', photo: null },
  { name: 'Tom Fraser', role: 'Estate Planning', accent: '#a8e063', photo: null },
  { name: 'Olivia Chen', role: 'Paraplanner', accent: '#34b35a', photo: null },
]

export function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
