/** Shared study / device content — keep editorial claims consistent. */

export const siteName = "Plasmoid X";
export const siteSlogan = "New energy, explained simply.";

/** Official Strike / Bendall expansion — use on first mention. */
export const msaartExpansion =
  "Molten Sea Ark Atomic Reconstruction Technology";
export const msaartShort = "MSAART";

/** Number locks live in src/data/locks.json and public/data/locks.json — loaded by the client LocksTable only. */

export const ratios = [
  { label: "Spheres", value: "4∶3∶2 and 8∶6∶4" },
  { label: "Pipes", value: "Octave 1∶2" },
  { label: "Cones / pyramids", value: "51.84°" },
  {
    label: "Lattice",
    value: "16 × 8 Model of the Elements (MOE)",
  },
  {
    label: "Calculator",
    value: "3-4-5 → Area–Time–Volume (ATV)",
  },
];

export const vortexLaws = [
  {
    title: "Octave identity",
    body: "The seed number sets the line. Double or halve it and you stay on the same line.",
  },
  {
    title: "1st Key (digit product)",
    body: "Multiply the digits inside the number. That product is the first key.",
  },
  {
    title: "2nd Key (mirror product)",
    body: "Multiply by the mirror-digit product — called the “square.”",
  },
  {
    title: "Planes = MOE / PUM lattice",
    body: "Octaves of those keys become rungs on the Model of the Elements (MOE) lattice inside the Plasmoid Unification Model (PUM).",
  },
];

export const deviceBeats = [
  {
    n: "01",
    title: "Ionizer (air pretreatment)",
    body: "Air ionizer / pre-ionization chamber: ultraviolet (UV) light pretreats incoming air before it reaches the water column. Violet interior is a teaching cue for ionized air — not a product photo.",
  },
  {
    n: "02",
    title: "Bubbler (plasmoid generator)",
    body: "Plasmoid generator / bubbler: air rises through a water column with a diffuser. Bubbles collapse (cavitation) and form energetic vacuum objects (EVOs) — self-built donut-shaped plasmas, also called plasmoids.",
  },
  {
    n: "03",
    title: "Resonator (nested CTR spheres)",
    body: "Catalytic tornado resonator / reaction path: copper-ish chamber with nested contra-rotating (CTR) spheres — outer, inner, and a tiny central core. Hot exhaust feedback and a carburetor-in stub feed opposing spins; a calm “zero-plane” sits between them. Not a vague gyroscope.",
  },
];

export const protiumSteps = [
  "Water",
  "Cavitation",
  "Plasmoids",
  "CTR",
  "Harvest ¹H",
  "Work",
];

export const externalLinks = [
  {
    href: "https://strikefoundation.earth",
    label: "Strike Foundation",
    note: "Intellectual property (IP) & open notes",
  },
  {
    href: "https://www.howtube.com/channels/StrikeFoundationEarth",
    label: "HowTube · StrikeFoundationEarth",
    note: "Malcolm Bendall lecture series on HowTube (inventor channel)",
  },
  {
    href: "https://thunderstorm.tech",
    label: "Thunderstorm.tech",
    note: "Kits / demos",
  },
  {
    href: "https://alpha-prospects.com",
    label: "Alpha Prospects",
    note: "Investment bridge",
  },
  {
    href: "https://www.youtube.com/@AlchemicalScience",
    label: "Alchemical Science",
    note: "Independent video explainers (Thunderstorm Generator, plasmoids)",
  },
  {
    href: "https://alchemicalscience.org",
    label: "Alchemical Science (site)",
    note: "Open notes & downloads",
  },
];

/** Curated outbound video / explainers for Study — independent educators only. */
export const watchLinks = [
  {
    href: "https://www.youtube.com/@AlchemicalScience",
    label: "Channel hub",
    note: "Independent open-source educator — Thunderstorm Generator, plasmoids, DIY.",
  },
  {
    href: "https://alchemicalscience.org/introduction-to-malcolm-bendalls-thunderstorm-generator-plasmoid-msaart-technology/",
    label: "Intro overview",
    note: "MSAART / three-unit overview on their site (embeds their video).",
  },
  {
    href: "https://alchemicalscience.org/malcolm-bendalls-thunderstorm-generator-beginners-guide-new-trial-footage-from-the-us/",
    label: "Beginners guide",
    note: "Plain walkthrough plus trial footage context.",
  },
  {
    href: "https://www.youtube.com/watch?v=-ugB_nK-Mu0",
    label: "Workshop documentary",
    note: "Malcolm's Thunderstorm Plasmoid Generator in Action — workshop footage.",
  },
];

/**
 * Inventor lectures on HowTube (StrikeFoundationEarth channel).
 * Outbound inventor material — not Plasmoid X voice. Label claims.
 */
export const lectureLinks = [
  {
    href: "https://www.howtube.com/channels/StrikeFoundationEarth",
    label: "HowTube channel",
    note: "StrikeFoundationEarth — Malcolm Bendall lecture series hub.",
  },
  {
    href: "https://www.howtube.com/djl7iXwhABmv",
    label: "Section 1 · MSAART intro",
    note: "Intro to MSAART plasmoid tech & applications; implosive vs explosive framing (inventor claim).",
  },
  {
    href: "https://www.howtube.com/2TNqP0r3ZcH9",
    label: "Section 2 · Model of the Elements",
    note: "MOE / sacred geometry teaching from the inventor lectures.",
  },
  {
    href: "https://www.howtube.com/Nu5fCbOLJg8Y",
    label: "Section 5 · Thunderstorm Generator",
    note: "How the Thunderstorm Generator works; Phase-1 retrofit framing (inventor).",
  },
  {
    href: "https://www.howtube.com/series/faGkeJnl/watch?VID=djl7iXwhABmv",
    label: "Series watch hub",
    note: "Full Bendall lecture series on HowTube (start at Section 1).",
  },
  {
    href: "https://www.howtube.com/d5YnoPb7SQOX",
    label: "Section 6 · Engine retrofits",
    note: "Phase-1 rollout strategy — engines first (inventor framing).",
  },
];

export const siteNav = [
  { href: "/", label: "Why" },
  { href: "/study/", label: "Study" },
  { href: "/device/", label: "Device" },
  { href: "/sources/", label: "Sources" },
  { href: "/services/", label: "Services" },
  { href: "/connect/", label: "Connect" },
] as const;

/** Secondary paths — footer / in-page, not primary nav. */
export const secondaryNav = [
  { href: "/glossary/", label: "Glossary" },
  { href: "/faq/", label: "FAQ" },
  { href: "/updates/", label: "Errata" },
  { href: "/study-pack/", label: "Study pack" },
] as const;
