// ============================================================
// PROSPA FINANCIAL — image library
// Web-optimised lifestyle imagery (public/library/*.jpg), each renamed with
// keyword-rich slugs and tagged for filtering. Source PNGs were ~2MB each;
// these are resized to ~1100px / q82 JPEGs (~120KB). `ar` is the width/height
// aspect ratio, used to reserve space and avoid layout shift while lazy-loading.
// ============================================================

// Filter vocabulary, in display order. Counts are derived in the component.
export const libraryTags = [
  'Couples',
  'Seniors',
  'Professionals',
  'Advice',
  'Lifestyle',
  'Wellbeing',
  'Travel',
  'Outdoors',
  'Nature',
  'Workplace',
  'Indoors',
]

const img = (slug, title, alt, ar, tags) => ({ slug, src: `/library/${slug}.jpg`, title, alt, ar, tags })

export const libraryImages = [
  img('mature-couple-cafe-conversation-iced-drinks', 'Café Conversation', 'Mature couple talking over iced drinks at a café table', 0.68, ['Couples', 'Lifestyle', 'Indoors']),
  img('professionals-cafe-meeting-coffee-discussion', 'Coffee Meeting', 'Professionals in discussion over coffee at a café', 0.666, ['Professionals', 'Advice', 'Indoors']),
  img('mature-couple-home-breakfast-affection', 'Morning at Home', 'Affectionate mature couple at the breakfast table at home', 0.808, ['Couples', 'Lifestyle', 'Indoors']),
  img('adviser-client-laptop-office-smiling', 'Friendly Advice', 'Adviser and client smiling over a laptop in an office', 0.666, ['Professionals', 'Advice', 'Workplace']),
  img('senior-couple-lounge-sofa-reading-relaxed', 'Relaxed Together', 'Senior couple relaxing and reading on a lounge sofa', 0.666, ['Couples', 'Seniors', 'Lifestyle', 'Indoors']),
  img('women-financial-planning-documents-home', 'Planning Session', 'Two women reviewing financial documents at a home table', 0.606, ['Advice', 'Professionals', 'Indoors']),
  img('senior-couple-embrace-outdoors-happy', 'Happy Embrace', 'Senior couple embracing and smiling outdoors', 0.851, ['Couples', 'Seniors', 'Outdoors']),
  img('senior-woman-laughing-sunshine-joyful', 'Pure Joy', 'Senior woman laughing in the sunshine', 1.4, ['Seniors', 'Wellbeing', 'Outdoors']),
  img('active-senior-woman-fitness-seaside', 'Active & Well', 'Active senior woman in fitness wear by the seaside', 0.8, ['Seniors', 'Wellbeing', 'Outdoors']),
  img('senior-couple-gardening-retirement-hobby', 'In the Garden', 'Senior couple gardening in raised vegetable beds', 0.8, ['Couples', 'Seniors', 'Lifestyle', 'Outdoors']),
  img('senior-businesswoman-smartwatch-office', 'Confident Professional', 'Senior businesswoman checking her smartwatch in an office', 1.5, ['Professionals', 'Seniors', 'Workplace']),
  img('senior-man-blazer-window-reflective', 'Reflective Moment', 'Senior man in a blazer by a window with bookshelves', 1.333, ['Professionals', 'Seniors', 'Indoors']),
  img('senior-businessman-navy-suit-confident', 'The Adviser', 'Senior businessman in a navy suit standing by a window', 1.503, ['Professionals', 'Seniors', 'Workplace']),
  img('businessman-car-tablet-working-travel', 'On the Move', 'Businessman using a tablet in the back of a car', 1.503, ['Professionals', 'Travel', 'Workplace']),
  img('diverse-professionals-seminar-listening', 'Engaged Audience', 'Diverse professionals listening at a seminar', 1.777, ['Professionals', 'Advice', 'Workplace']),
  img('adviser-client-tablet-lounge-consultation', 'Consultation', 'Adviser showing a tablet to a client in a lounge', 0.8, ['Advice', 'Professionals', 'Indoors']),
  img('senior-couple-beach-embrace-content', 'By the Sea', 'Content senior couple embracing on a beach', 0.807, ['Couples', 'Seniors', 'Outdoors', 'Travel']),
  img('professionals-laughing-meeting-candid', 'Shared Laughter', 'Professionals laughing together in a candid meeting', 0.8, ['Professionals', 'Advice', 'Workplace']),
  img('advisers-desk-laptop-collaboration', 'Working Together', 'Two advisers collaborating at a desk with a laptop', 0.789, ['Professionals', 'Advice', 'Workplace']),
  img('mature-couple-hiking-mountains-smartphone', 'Mountain Trail', 'Mature couple hiking in the mountains, checking a phone', 0.8, ['Couples', 'Travel', 'Outdoors', 'Wellbeing']),
  img('mature-couple-dancing-meadow-joyful', 'A Dance Outdoors', 'Mature couple dancing joyfully in a green meadow', 0.75, ['Couples', 'Lifestyle', 'Outdoors']),
  img('senior-couple-beach-sunset-tender', 'Sunset Tenderness', 'Senior couple sharing a tender moment at beach sunset', 0.807, ['Couples', 'Seniors', 'Outdoors', 'Travel']),
  img('mature-couple-camping-tailgate-coffee', 'Camp Coffee', 'Mature couple laughing with mugs by a car tailgate while camping', 1.777, ['Couples', 'Travel', 'Outdoors']),
  img('mature-couple-roadtrip-tailgate-view', 'Road Trip', 'Mature couple relaxing in a car tailgate enjoying the view', 1.777, ['Couples', 'Travel', 'Outdoors']),
  img('seniors-mountain-summit-binoculars-hiking', 'Summit Views', 'Seniors with binoculars overlooking snow-capped mountains', 1.0, ['Seniors', 'Travel', 'Outdoors', 'Wellbeing']),
  img('senior-couple-coastal-hike-ocean-vista', 'Coastal Hike', 'Senior couple with backpacks overlooking a coastal ocean vista', 1.0, ['Couples', 'Seniors', 'Travel', 'Outdoors']),
  // Calculator backgrounds — on-brand nature textures (also used behind the Power-Up calculators).
  img('clover-sprouts-fresh-growth', 'Fresh Growth', 'Fresh green clover sprouts catching the light', 0.667, ['Nature', 'Outdoors']),
  img('dewy-grass-morning-bokeh', 'Morning Dew', 'Dew-tipped blades of grass against soft morning bokeh', 0.667, ['Nature', 'Outdoors']),
  img('grassland-field-blue-sky-horizon', 'Open Horizon', 'Grassland field swaying under a clear blue sky', 0.563, ['Nature', 'Outdoors', 'Travel']),
  img('golden-hour-meadow-grass-bokeh', 'Golden Hour', 'Meadow grass glowing in golden-hour light and bokeh', 0.562, ['Nature', 'Outdoors']),
  img('timber-fence-forest-golden-light', 'Forest Fence', 'Timber post-and-rail fence in warm golden forest light', 0.563, ['Nature', 'Outdoors']),
  img('dappled-leaf-shadows-green', 'Dappled Light', 'Soft leaf shadows dappled across a green surface', 0.563, ['Nature', 'Outdoors']),
]
