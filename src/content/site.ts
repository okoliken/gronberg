// Layout and type follow the Figma file; the copy replaces the template's placeholder text.

export type Title = { text: string; accent: string };
export type Img = { src: string; alt: string };

export const EMAIL = "hello@jacobgronberg.com";
export const MAILTO = `mailto:${EMAIL}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Exhibitions", href: "/exhibitions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: MAILTO },
];

export const infoLinks = [
  { label: "Services", href: "/#services" },
  { label: "Clients", href: "/#clients" },
  { label: "Email", href: MAILTO },
];

export const socials = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export const services = [
  {
    number: "01",
    title: "Photo Shooting",
    body: "Editorial, portrait and campaign work, on location or in the studio. Natural light first, one hard light when the story needs drama.",
  },
  {
    number: "02",
    title: "Video Editing",
    body: "Short films and motion portraits cut with the same restraint as the stills: slow pacing, real sound, no filler frames.",
  },
  {
    number: "03",
    title: "Art Direction",
    body: "From moodboard to final retouch. Casting, styling and set design shaped into one clear visual idea.",
  },
];

/* ---------------------------------- Projects --------------------------------- */

export type Project = {
  slug: string;
  title: Title;
  place: string;
  date: string;
  year: string;
  service: string;
  client: string;
  about: string[];
  /** 700x856 crop: project hero, large grid cards */
  cover: Img;
  /** 409x500 crop: small grid cards on /projects */
  card: Img;
  /** five frames, in the Figma gallery order: 700x900, 409x500, square, 700x855, small square */
  gallery: Img[];
};

const img = (name: string, alt: string): Img => ({ src: `/images/${name}.jpg`, alt });

const pool = {
  coat: img("coat-back", "Woman in a checked coat seen from behind"),
  floral: img("floral-dress", "Woman in a floral dress caught mid-step"),
  smoke: img("beanie-smoke", "Man in a beanie exhaling smoke in the cold"),
  flowers: img("flower-lips", "Face with flowers covering the mouth, eyes closed"),
  dancer: img("dancer", "Dancer balancing on one foot, arm raised"),
  hoodie: img("hoodie-chair", "Man in a puffer hoodie sitting on a school chair"),
  crossed: img("arms-crossed", "Woman with a dark bob turned away, arms crossed"),
  handsFace: img("hands-face", "Man covering his face with both hands, one eye visible"),
  hands: img("hands", "Two hands with rings, fingers interlaced"),
  fabric: img("draped-fabric", "Man wrapped in heavy draped fabric"),
  curly: img("curly-cigarette", "Curly-haired man resting his head on his hand"),
  sweater: img("sweater-chair", "Woman in a white sweater seated on a stool"),
  rack: img("clothes-rack", "Black sweatshirts on hangers against a white brick wall"),
  leap: img("gallery-5", "Dancer leaping with one leg extended"),
};

export const projects: Project[] = [
  {
    slug: "dancing-in-black-and-white",
    title: { text: "Dancing in\nBlack &", accent: "White" },
    place: "New York",
    date: "October 2025",
    year: "2025",
    service: "Photo Shooting",
    client: "Jonathan Åberg",
    about: [
      "Six dancers, one bare wall and a single window. The brief was to photograph ballet without the theatre: no stage lights, no costumes beyond what the dancers wore to rehearsal.",
      "We worked in short bursts between their sessions, waiting for the moment a pose stopped being a pose and became a person catching their breath.",
      "The series was printed large and shown alongside the company’s spring programme.",
    ],
    cover: img("work-dancing", "Male dancer in a white tutu, arms raised against a wall"),
    card: img("work-dancing", "Male dancer in a white tutu, arms raised against a wall"),
    gallery: [
      img("gallery-1", "Dancer balancing on one foot, arm raised"),
      img("gallery-4", "A dancer’s legs en pointe on a dark floor"),
      img("gallery-2", "Man wrapped in heavy draped fabric"),
      img("gallery-3", "Woman in a floral dress caught mid-step"),
      pool.leap,
    ],
  },
  {
    slug: "style-and-fashion",
    title: { text: "Style", accent: "& Fashion" },
    place: "Copenhagen",
    date: "March 2025",
    year: "2025",
    service: "Art Direction",
    client: "Nordisk Studio",
    about: [
      "A lookbook for a Copenhagen label that wanted its clothes to look lived in, not styled. Every outfit was worn for a full day before it reached the set.",
      "We kept the backdrop plain and let posture do the talking: slouches, crossed legs, the way people actually sit when they forget the camera.",
    ],
    cover: img("cover-style-fashion", "Man in a puffer hoodie sitting on a school chair"),
    card: img("projects-style-fashion", "Man in a puffer hoodie sitting on a school chair"),
    gallery: [pool.coat, pool.hoodie, pool.curly, pool.floral, pool.rack],
  },
  {
    slug: "one-eye",
    title: { text: "One", accent: "Eye" },
    place: "Berlin",
    date: "January 2025",
    year: "2025",
    service: "Photo Shooting",
    client: "Øjeblik Magazine",
    about: [
      "A portrait essay on attention. Each sitter was asked to hide most of their face and show us only what they were willing to give.",
      "What came back was more honest than any straight portrait: one eye, a gesture, a decision about how much to reveal.",
    ],
    cover: img("hands-face", "Man covering his face with both hands, one eye visible"),
    card: img("projects-one-eye", "Man covering his face with both hands, one eye visible"),
    gallery: [pool.smoke, pool.hands, pool.fabric, pool.flowers, pool.sweater],
  },
  {
    slug: "week-fashion",
    title: { text: "Week", accent: "Fashion" },
    place: "Paris",
    date: "September 2025",
    year: "2025",
    service: "Video Editing",
    client: "Maison Lerat",
    about: [
      "Seven days backstage at Paris Fashion Week, shot between fittings, in corridors and in the minutes after the lights went down.",
      "The stills became a short film cut to the sound of the venue itself: hangers, footsteps and the hum of the crowd outside.",
    ],
    cover: img("arms-crossed", "Woman with a dark bob turned away, arms crossed"),
    card: img("projects-week-fashion", "Woman with a dark bob turned away, arms crossed"),
    gallery: [pool.floral, pool.coat, pool.curly, pool.dancer, pool.rack],
  },
  {
    slug: "be-silent",
    title: { text: "Be", accent: "Silent" },
    place: "Stockholm",
    date: "June 2024",
    year: "2024",
    service: "Photo Shooting",
    client: "Tyst Records",
    about: [
      "Artwork for an ambient record about the things we leave unsaid. The musicians were photographed with their eyes closed, listening.",
      "Flowers, smoke and fabric stood in for sound: things that move without making noise.",
    ],
    cover: img("work-be-silent", "Face with flowers covering the mouth, eyes closed"),
    card: img("work-be-silent", "Face with flowers covering the mouth, eyes closed"),
    gallery: [pool.handsFace, pool.hands, pool.fabric, pool.smoke, pool.leap],
  },
  {
    slug: "cigarette-and-tobacco",
    title: { text: "Cigarette", accent: "& Tobacco" },
    place: "Oslo",
    date: "February 2024",
    year: "2024",
    service: "Art Direction",
    client: "Ash & Ember",
    about: [
      "A winter series about the five minutes outside: smoke breaks, cold air and the conversations that only happen on the back step.",
      "Shot at dawn over three weeks, with nothing but the light coming off the snow.",
    ],
    cover: img("work-cigarette", "Man in a beanie exhaling smoke in the cold"),
    card: img("work-cigarette", "Man in a beanie exhaling smoke in the cold"),
    gallery: [pool.coat, pool.crossed, pool.curly, pool.hoodie, pool.sweater],
  },
  {
    slug: "wonderful-body",
    title: { text: "Wonderful", accent: "Body" },
    place: "Lisbon",
    date: "November 2023",
    year: "2023",
    service: "Photo Shooting",
    client: "Corpo Dance Company",
    about: [
      "A celebration of bodies at work for a contemporary dance company: knuckles, ankles, shoulder blades and the marks that training leaves behind.",
      "We photographed details first and whole figures last, so the series reads like getting to know someone slowly.",
    ],
    cover: img("hands", "Two hands with rings, fingers interlaced"),
    card: img("work-wonderful-body", "Two hands with rings, fingers interlaced"),
    gallery: [pool.dancer, pool.floral, pool.fabric, pool.flowers, pool.leap],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const nextProject = (slug: string) => projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

const bySlug = (slug: string) => getProject(slug)!;

// The home page grid uses its own Figma crops for the three small cards
export const latestWork = [
  { project: bySlug("dancing-in-black-and-white"), image: img("work-dancing", "Male dancer in a white tutu, arms raised against a wall") },
  { project: bySlug("style-and-fashion"), image: img("work-style-fashion", "Man in a puffer hoodie sitting on a school chair") },
  { project: bySlug("one-eye"), image: img("work-one-eye", "Man covering his face with both hands, one eye visible") },
  { project: bySlug("week-fashion"), image: img("work-week-fashion", "Woman with a dark bob turned away, arms crossed") },
];

export const projectsIntro =
  "Selected work from five years behind the camera: dancers, designers and strangers who agreed to stand still for a moment.";

/* -------------------------------- Exhibitions -------------------------------- */

export type Exhibition = {
  slug: string;
  status: "current" | "past";
  meta: string[];
  title: Title;
  summary: string;
  month: string;
  day: string;
  /** 230x230 Figma crop */
  thumb: Img;
  /** 800x975 detail hero */
  hero: Img;
  dates: string;
  hours: string;
  location: string;
  address: string;
  about: string[];
};

export const exhibitions: Exhibition[] = [
  {
    slug: "independent-beauty",
    status: "current",
    meta: ["New York", "Town Hall", "2026"],
    title: { text: "Independent", accent: "Beauty" },
    summary: "Forty portraits of people who dress for nobody but themselves, photographed exactly as they arrived at the studio.",
    month: "Jun",
    day: "16",
    thumb: img("ex-independent-beauty", "Woman in a checked coat seen from behind"),
    hero: img("exhibition-hero", "Woman in a checked coat seen from behind"),
    dates: "16 Jun 2026 – 18 Oct 2026",
    hours: "Monday to Saturday, 11 am – 6 pm",
    location: "Town Hall Gallery",
    address: "123 W 43rd St, New York",
    about: [
      "Independent Beauty began with a simple rule: come as you are. No stylists, no make-up artists, no wardrobe. Every sitter chose their own clothes and their own pose.",
      "Over two years, forty people stood in front of the same grey wall. The result is a portrait of a city that dresses for itself.",
      "The prints are shown at life size, so you meet each person at eye level.",
    ],
  },
  {
    slug: "in-humanity-we-trust",
    status: "current",
    meta: ["Berlin", "Kunsthalle", "2026"],
    title: { text: "In Humanity We", accent: "Trust" },
    summary: "Hands, faces and the small gestures we make when we think nobody is looking.",
    month: "Mar",
    day: "02",
    thumb: img("ex-in-humanity", "Woman in a white sweater seated on a stool"),
    hero: pool.floral,
    dates: "02 Mar 2026 – 30 Jun 2026",
    hours: "Tuesday to Sunday, 10 am – 7 pm",
    location: "Kunsthalle",
    address: "Hardenbergplatz 2, 10623 Berlin",
    about: [
      "A study of trust between photographer and sitter. Each portrait was made in a single take, with the sitter deciding when the shutter fired.",
      "The show pairs the portraits with the contact sheets around them, so you can see every moment that was not chosen.",
    ],
  },
  {
    slug: "berlin-at-night",
    status: "current",
    meta: ["Berlin", "Halle am Wasser", "2026"],
    title: { text: "Berlin at", accent: "Night" },
    summary: "Night portraits made between midnight and five in the morning across Kreuzberg and Neukölln.",
    month: "Feb",
    day: "01",
    thumb: img("ex-berlin-at-night", "Man in sunglasses and a leather jacket at night"),
    hero: pool.smoke,
    dates: "01 Feb 2026 – 31 May 2026",
    hours: "Thursday to Sunday, 6 pm – 2 am",
    location: "Halle am Wasser",
    address: "Invalidenstraße 50, 10557 Berlin",
    about: [
      "Shot over one winter with a single flash and whoever was still awake. Bartenders, cab drivers, dancers on their way home.",
      "The gallery opens late to match: the show is best seen after dark.",
    ],
  },
  {
    slug: "quiet-rooms",
    status: "past",
    meta: ["Copenhagen", "Nikolaj Kunsthal", "2025"],
    title: { text: "Quiet", accent: "Rooms" },
    summary: "Empty studios, hanging garments and the rooms fashion leaves behind once the show is over.",
    month: "Nov",
    day: "14",
    thumb: img("ex-past-1", "Black sweatshirts on hangers against a white brick wall"),
    hero: pool.coat,
    dates: "14 Nov 2025 – 22 Feb 2026",
    hours: "Tuesday to Sunday, 11 am – 5 pm",
    location: "Nikolaj Kunsthal",
    address: "Nikolaj Plads 10, 1067 Copenhagen",
    about: [
      "Photographs of the spaces between shows: rails of clothes, swept floors and folding chairs stacked against the wall.",
      "A quiet counterpoint to the noise of fashion week, made in the same rooms an hour after everyone had gone.",
    ],
  },
  {
    slug: "the-long-look",
    status: "past",
    meta: ["Oslo", "Fotogalleriet", "2025"],
    title: { text: "The Long", accent: "Look" },
    summary: "Portraits made with an hour-long sitting, until the face stopped performing for the lens.",
    month: "Sep",
    day: "05",
    thumb: img("ex-past-2", "Curly-haired man resting his head on his hand"),
    hero: pool.curly,
    dates: "05 Sep 2025 – 30 Nov 2025",
    hours: "Wednesday to Sunday, 12 pm – 5 pm",
    location: "Fotogalleriet",
    address: "Møllergata 34, 0179 Oslo",
    about: [
      "Every sitter was photographed for a full hour. The chosen frames all come from the last ten minutes, when boredom finally beat self-consciousness.",
    ],
  },
  {
    slug: "salt-and-wind",
    status: "past",
    meta: ["Lisbon", "Atelier Nord", "2024"],
    title: { text: "Salt &", accent: "Wind" },
    summary: "Figures on the Atlantic coast, photographed in the grey hour before the sun comes through.",
    month: "Apr",
    day: "21",
    thumb: img("ex-past-3", "Man in a dark coat looking out to sea"),
    hero: pool.fabric,
    dates: "21 Apr 2024 – 30 Jun 2024",
    hours: "Monday to Saturday, 10 am – 6 pm",
    location: "Atelier Nord",
    address: "Rua da Boavista 84, 1200-066 Lisbon",
    about: [
      "A coastal series made over a month of early mornings, when the light is flat and the beach belongs to whoever is awake.",
    ],
  },
];

export const getExhibition = (slug: string) => exhibitions.find((e) => e.slug === slug);

export const exhibitionsIntro =
  "Prints, projections and a few things in between. Come and see the work at the size it was meant to be seen.";

/* ----------------------------------- Home ------------------------------------ */

export const testimonials = [
  {
    quote: "Calm on set, relentless in the edit",
    body: [
      "Jacob made a room full of nervous first-time models feel like old friends. Nobody noticed the camera after the first ten minutes.",
      "Then he went quiet for two weeks and came back with an edit so tight we did not change a single frame.",
    ],
    name: "Michelle Lindstrøm",
    role: "Photoshoot",
    avatar: "/images/avatar-long-hair.jpg",
  },
  {
    quote: "He found the picture before we did",
    body: [
      "We arrived with a forty-page moodboard. Jacob read it, asked three questions and found the one image that mattered.",
    ],
    name: "Jannis Jackson",
    role: "Art Direction",
    avatar: "/images/avatar-beard.jpg",
  },
  {
    quote: "Every frame felt like a decision",
    body: [
      "The film he cut for us is four minutes long and there is not a wasted second in it. Pacing like that is rare.",
    ],
    name: "Daniela Berg",
    role: "Video Editing",
    avatar: "/images/avatar-finger-lips.jpg",
  },
];

// Frames the page loader flicks through before landing on the hero image
export const loaderFrames = [
  "/images/flower-lips.jpg",
  "/images/dancer.jpg",
  "/images/hands.jpg",
  "/images/coat-back.jpg",
  "/images/draped-fabric.jpg",
  "/images/beanie-smoke.jpg",
  "/images/floral-dress.jpg",
  "/images/hands-face.jpg",
  "/images/ballet-tutu.jpg",
];

/* ----------------------------------- About ----------------------------------- */

export const about = {
  bio: [
    "I grew up in Copenhagen, studied in Aarhus and moved to Berlin for a darkroom I could afford. I still shoot mostly in black and white, because colour tells you what to feel and I would rather you decided.",
    "My work moves between dance, fashion and portraiture. The common thread is people at the edge of a performance: the breath before the jump, the slouch after the show.",
    "These days I split my time between commissions, my own long-term series and teaching a small portrait workshop every spring.",
  ],
  experiences: [
    { role: "Art Director", place: "Studio Lys", dates: ["Oct 2023", "Currently"] },
    { role: "Jury", place: "Awwwards", dates: ["June 2024"] },
    { role: "Photographer & Art director", place: "Freelance", dates: ["Oct 2019", "Sep 2023"] },
    { role: "Photography", place: "Royal Danish Academy", dates: ["Jan 2015", "Sep 2019"] },
  ],
  recognitions: [
    { title: "Photography Portfolio", date: "Feb 2025", by: "Awwwards" },
    { title: "Cover Photo", date: "May 2024", by: "Kinfolk" },
    { title: "Design Portfolio", date: "Dec 2023", by: "Awwwards" },
  ],
};
