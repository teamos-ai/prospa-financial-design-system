// ============================================================
// PROSPA FINANCIAL — team roster for the sidebar "Meet the Team"
// infinite-scroll cards. Names, roles and photos are the real
// Prospa Financial team (prospafinancial.com.au/about-us).
// Headshots live in public/team/. `accent` is the fallback avatar
// colour shown if a photo ever fails to load.
// ============================================================

export const team = [
  { name: 'Peter Prvulj', role: 'Principal Financial Adviser', photo: '/team/peter.png', accent: '#5dce38' },
  { name: 'Karthik Ganapathy', role: 'Senior Financial Adviser', photo: '/team/karthik.png', accent: '#2fa86b' },
  { name: 'Neil Mistry', role: 'Financial Adviser', photo: '/team/neil.png', accent: '#7fd4a0' },
  { name: 'Monik Palany', role: 'Provisional Adviser', photo: '/team/monik.png', accent: '#4eb52d' },
  { name: 'Sam Ryan', role: 'Associate Adviser', photo: '/team/sam.jpg', accent: '#86e05a' },
  { name: 'Sanika Mane', role: 'Associate Planner', photo: '/team/sanika.jpg', accent: '#1f9d5b' },
  { name: 'Dinal De Silva', role: 'Senior Paraplanner', photo: '/team/dinal.png', accent: '#a8e063' },
  { name: 'Margareta Paxinos', role: 'Practice Manager', photo: '/team/margareta.jpg', accent: '#34b35a' },
  { name: 'Nic Masunda', role: 'Client Services Manager', photo: '/team/nic.jpg', accent: '#2fa86b' },
  { name: 'Fiona Rintoul', role: 'Client Service Officer', photo: '/team/fiona.png', accent: '#5dce38' },
  { name: 'James Larkworthy', role: 'Client Service Officer', photo: '/team/james.jpg', accent: '#4eb52d' },
]

export function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
