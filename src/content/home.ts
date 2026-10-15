// Copy is verbatim from the Figma "Frontpage" frame.

export type Title = { text: string; accent: string };

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Exhibitions", href: "/exhibitions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const infoLinks = [
  { label: "Styleguide", href: "/styleguide" },
  { label: "Licensing", href: "/licensing" },
  { label: "Changelog", href: "/changelog" },
];

export const socials = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "FAcebook", href: "https://facebook.com" },
];

export const services = [
  {
    number: "01",
    title: "Photo Shooting",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    number: "02",
    title: "Video Editing",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    // Figma repeats "02" here; numbered 03 since it is the third item
    number: "03",
    title: "Art Direction",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const latestWork = [
  {
    slug: "dancing-in-black-and-white",
    title: { text: "Dancing in\nBlack &", accent: "White" },
    image: { src: "/images/work-dancing.jpg", alt: "Male dancer in a white tutu, arms raised against a wall" },
    place: "New York",
    date: "October 2021",
  },
  {
    slug: "style-and-fashion",
    title: { text: "Style", accent: "& Fashion" },
    image: { src: "/images/work-style-fashion.jpg", alt: "Man in a puffer hoodie sitting on a school chair" },
    place: "New York",
    date: "October 2021",
  },
  {
    slug: "one-eye",
    title: { text: "One", accent: "Eye" },
    image: { src: "/images/work-one-eye.jpg", alt: "Man covering his face with both hands, one eye visible" },
    place: "New York",
    date: "October 2021",
  },
  {
    slug: "week-fashion",
    title: { text: "WEek", accent: "Fashion" },
    image: { src: "/images/work-week-fashion.jpg", alt: "Woman with a dark bob turned away, arms crossed" },
    place: "New York",
    date: "October 2021",
  },
];

export const exhibitions = [
  {
    slug: "independent-beauty",
    meta: ["New York", "Town Hall", "2022"],
    title: { text: "Independent", accent: "Beauty" },
    body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    month: "Jun",
    day: "16",
    image: { src: "/images/ex-independent-beauty.jpg", alt: "Woman in a checked coat seen from behind" },
  },
  {
    slug: "in-humanity-we-trust",
    meta: ["Berlin", "Kunsthalle", "2022"],
    title: { text: "In Humanity We", accent: "Trust" },
    body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
    month: "Mar",
    day: "02",
    image: { src: "/images/ex-in-humanity.jpg", alt: "Woman in a white sweater seated on a stool" },
  },
  {
    slug: "berlin-at-night",
    meta: ["Berlin", "Kunsthalle", "2022"],
    title: { text: "Berlin AT", accent: "Night" },
    body: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.",
    month: "Feb",
    day: "01",
    image: { src: "/images/ex-berlin-at-night.jpg", alt: "Curly-haired man resting his head on his hand" },
  },
];

export const testimonials = [
  {
    quote: "I Really Enjoyed Working With Jacob",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Laoreet sit amet cursus sit amet dictum sit amet justo.",
    ],
    name: "Michelle Lindstrøm",
    role: "Photoshoot",
    avatar: "/images/avatar-long-hair.jpg",
  },
  {
    quote: "I Really Enjoyed Working With Jacob",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    name: "Jannis Jackson",
    role: "Art Direction",
    avatar: "/images/avatar-beard.jpg",
  },
  {
    quote: "I Really Enjoyed Working With Jacob",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra.",
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
