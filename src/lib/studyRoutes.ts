/** Study destinations for the site-wide command palette (real routes + Study anchors). */

export type StudyRoute = {
  href: string;
  title: string;
  /** Short plain-English hint shown in the palette */
  hint: string;
  /** Extra keywords for typeahead */
  keywords?: string;
};

export const STUDY_ROUTES: StudyRoute[] = [
  {
    href: "/study/",
    title: "Study home",
    hint: "Lessons, diagrams, and labs in plain English",
    keywords: "curriculum learn begin",
  },
  {
    href: "/study/#curriculum",
    title: "Lessons 1–6",
    hint: "Beginner curriculum rail",
    keywords: "curriculum lessons path",
  },
  {
    href: "/study/#honest-numbers",
    title: "Honest numbers",
    hint: "Meter results vs inventor claims",
    keywords: "embry-riddle emissions fuel measured",
  },
  {
    href: "/study/#locks",
    title: "Number locks",
    hint: "518,400 and Time’s mould family",
    keywords: "518400 51.84 locks flashcards",
  },
  {
    href: "/study/#vortex",
    title: "Vortex laws",
    hint: "Octave identity and digit keys",
    keywords: "vortex math octave",
  },
  {
    href: "/study/#charge",
    title: "Direction = charge",
    hint: "Store vs spend, clockwise vs anticlockwise",
    keywords: "implosive explosive store spend CTR",
  },
  {
    href: "/study/#plasmoid",
    title: "Plasmoid / EVO",
    hint: "Self-built donut plasma (energetic vacuum object)",
    keywords: "evo exotic vacuum cavitation",
  },
  {
    href: "/study/#protium",
    title: "Protium path",
    hint: "Water → cavitation → work pathway",
    keywords: "protium hydrogen path",
  },
  {
    href: "/study/#moe",
    title: "MOE lattice",
    hint: "Model of the Elements (MOE) lattice",
    keywords: "moe pum lattice elements",
  },
  {
    href: "/study/#lectures",
    title: "Lectures",
    hint: "Guided lecture notes and companions",
    keywords: "lectures howtube bendall",
  },
  {
    href: "/study/#quiz",
    title: "Check yourself",
    hint: "Short quiz after the basics",
    keywords: "quiz test check",
  },
  {
    href: "/study/#watch",
    title: "Watch",
    hint: "Curated independent explainers",
    keywords: "video watch youtube",
  },
  {
    href: "/study-pack/",
    title: "Study pack",
    hint: "Printable one-sheet summary",
    keywords: "print pack sheet",
  },
  {
    href: "/device/",
    title: "Device walkthrough",
    hint: "Ionizer → bubbler → resonator in three beats",
    keywords: "device thunderstorm generator hardware",
  },
  {
    href: "/glossary/",
    title: "Glossary",
    hint: "Plain definitions of key terms",
    keywords: "definitions acronyms",
  },
  {
    href: "/faq/",
    title: "FAQ",
    hint: "Common questions, short answers",
    keywords: "faq questions",
  },
  {
    href: "/sources/",
    title: "Sources",
    hint: "Measured vs claimed, with links to check",
    keywords: "sources citations claims",
  },
];
