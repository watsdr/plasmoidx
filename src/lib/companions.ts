/** Lecture / watch companion notes — “What you’ll hear” + “How we teach it here”. */

export type CompanionNote = {
  /** Matches lectureLinks / watchLinks label or href fragment */
  match: string;
  hear: string[];
  teach: string[];
};

export const lectureCompanions: CompanionNote[] = [
  {
    match: "HowTube channel",
    hear: [
      "A hub of Malcolm Bendall lectures on StrikeFoundationEarth and HowTube.",
      "Inventor voice throughout — applications, geometry, and rollout framing.",
      "Series order starts around MSAART intro and builds toward hardware.",
      "Claims about engines and emissions appear without independent metering.",
      "Outbound only: you leave plasmoidx.com when you open these links.",
    ],
    teach: [
      "We cite the channel as inventor source, not as our voice.",
      "Lead with Embry-Riddle before any 90% fuel figures you may hear.",
      "Pair lectures with Study labs so the model stays checkable.",
      "MSAART expands to Molten Sea Ark Atomic Reconstruction Technology here.",
      "Strike Foundation remains an external independent org for intellectual property (IP) and notes.",
    ],
  },
  {
    match: "Section 1 · MSAART intro",
    hear: [
      "Introduction to MSAART plasmoid technology and suggested applications.",
      "Implosive versus explosive framing, tied to storing and spending energy.",
      "Inventor narrative for why water and protium matter.",
      "High-level claims about engines and cleaner exhaust.",
      "Geometry and “living” vortex language mixed with hardware intent.",
    ],
    teach: [
      "Define MSAART once: Molten Sea Ark Atomic Reconstruction Technology.",
      "Map implosive/explosive to Direction = charge labs on Study.",
      "Keep mystical notes light; prefer the calm torus diagrams.",
      "Label every large efficiency claim as inventor until metered.",
      "Return to Honest numbers after watching.",
    ],
  },
  {
    match: "Section 2 · Model of the Elements",
    hear: [
      "Model of the Elements (MOE) taught with sacred-geometry vocabulary.",
      "Octaves, digit products, and lattice language from the inventor.",
      "Links between number locks and design ratios.",
      "Alpha–Omega style climb from light to heavier elements.",
      "Claims that the lattice explains device geometry.",
    ],
    teach: [
      "Use the MOE lattice lab and ATV triangle as the quiet check.",
      "Treat 16 × 8 as bookkeeping inside the model, not consensus physics.",
      "Full charts stay on Strike; our Alpha–Omega sketch is educational.",
      "Cross-link Device ratios after the lattice feels familiar.",
      "Flashcards reinforce keys without requiring the lecture.",
    ],
  },
  {
    match: "Section 5 · Thunderstorm Generator",
    hear: [
      "How the Thunderstorm Generator is said to work end-to-end.",
      "Phase-1 retrofit framing for conventional engines.",
      "Three-unit (three-beat) hardware story in inventor words.",
      "The story of harvesting protium from water through plasmoids.",
      "Marketing-scale performance language may appear.",
    ],
    teach: [
      "Walk Device: ionizer → bubbler → Vajra/CTR before or after.",
      "Compare every big number to the Embry-Riddle test result.",
      "Protium path lab keeps the six-step picture plain.",
      "We do not speak as Strike, Bendall, or HowTube.",
      "Study pack one-pager holds the three beats for offline review.",
    ],
  },
  {
    match: "Series watch hub",
    hear: [
      "Full Bendall lecture series entry point (often starts at Section 1).",
      "Multiple sections covering geometry, engines, and plant ideas.",
      "Inventor rollout strategy mixed with model teaching.",
      "Occasional lighter framing about aether, matter, and time.",
      "Long-form listening — claims accumulate across episodes.",
    ],
    teach: [
      "Use our curriculum rail (Lessons 1–6) as the finishable path.",
      "Skip mystical asides; keep locks and charge direction primary.",
      "Bookmark Honest numbers when ads-scale claims appear.",
      "Companion notes on this page stay the Plasmoid X gloss.",
      "Credit Strike outbound for IP; we are not a partner.",
    ],
  },
  {
    match: "Section 6 · Engine retrofits",
    hear: [
      "Phase-1 rollout: engines first (gas, diesel, and kerosene).",
      "Retrofit narrative for existing internal-combustion hardware.",
      "Inventor claims about efficiency and emissions at scale.",
      "Strategy talk beyond a single demo unit.",
      "Forward-looking commercial language.",
    ],
    teach: [
      "Lead with the measured numbers (about +9–10% fuel efficiency and about −34% average emissions), not inventor rollout promises.",
      "Education only: no licensee or partnership claims here.",
      "Device page stays hardware beats, not a sales funnel.",
      "Push for fuller dyno and isotope testing in your own reading.",
      "Connect page is for study questions, not investment pitches.",
    ],
  },
];

export const watchCompanions: CompanionNote[] = [
  {
    match: "Channel hub",
    hear: [
      "Independent Alchemical Science channel hub (YouTube).",
      "Thunderstorm Generator, plasmoids, and DIY-oriented explainers.",
      "Educator voice separate from Strike and from Plasmoid X.",
      "Mix of overview videos and workshop-style footage.",
      "Useful for visual context — still not a meter report.",
    ],
    teach: [
      "Treat as independent commentary, not inventor or university data.",
      "Cross-check hardware story against our three beats.",
      "Keep Embry-Riddle ahead of any efficiency language in videos.",
      "Outbound credit lives on Sources.",
      "Prefer Study labs after a watch session.",
    ],
  },
  {
    match: "Intro overview",
    hear: [
      "MSAART and three-unit overview on the Alchemical Science site.",
      "Embedded video walkthrough of the beginner picture.",
      "Inventor tech framed for newcomers.",
      "Acronyms and device units introduced together.",
      "Claims may mirror Bendall materials.",
    ],
    teach: [
      "Expand MSAART as Molten Sea Ark (not Arc) Atomic Reconstruction Technology.",
      "Map three units to ionizer → bubbler → Vajra/CTR here.",
      "Use glossary drawer for short plain definitions.",
      "Sources page states measured vs inventor vs commentary.",
      "No Columbus or ornamental mysticism on this site.",
    ],
  },
  {
    match: "Beginners guide",
    hear: [
      "Plain walkthrough aimed at first-time readers.",
      "Trial footage context from US tests (educator framing).",
      "Stepwise hardware description.",
      "Encouragement to experiment and observe (their voice).",
      "Performance anecdotes that are not Embry-Riddle.",
    ],
    teach: [
      "Our Lesson 1–6 rail is the finishable path on Study.",
      "Separate anecdote from the independent meter block.",
      "Print the study pack for locks + three beats offline.",
      "FAQ covers common beginner traps.",
      "We stay polished, not ornamental — diagrams over theater.",
    ],
  },
  {
    match: "Workshop documentary",
    hear: [
      "Workshop footage of a Thunderstorm plasmoid generator in action.",
      "Visual sense of chambers, plumbing, and demo energy.",
      "Inventor and builder environment, not a controlled thesis lab.",
      "Sensory detail that text alone cannot give.",
      "Implicit performance claims via demonstration.",
    ],
    teach: [
      "Watch for intuition; verify with locks labs and honest numbers.",
      "Demo ≠ dyno. Meter block remains the lead.",
      "Device walkthrough lab mirrors the three beats calmly.",
      "Label what you see as footage, not peer-reviewed proof.",
      "Return to claims-compare when numbers are mentioned.",
    ],
  },
];

export function companionFor(
  label: string,
  list: CompanionNote[]
): CompanionNote | undefined {
  return list.find((c) => c.match === label);
}
