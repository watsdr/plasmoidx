/** Beginner FAQs — calm, independent voice. */

export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "who",
    q: "Who runs Plasmoid X?",
    a: "Derek Watson. Independent education and outreach — not Strike Foundation, Strike Energy, HowTube, Alchemical Science, or a licensee.",
  },
  {
    id: "msaart",
    q: "What does MSAART stand for?",
    a: "Molten Sea Ark Atomic Reconstruction Technology. Use Ark (as on the Plasmoid Unification Model deck), not Arc. We expand it on first use.",
  },
  {
    id: "meter",
    q: "Should I believe the 90% fuel claims?",
    a: "This site does not lead with them. Lead with the Embry-Riddle Aeronautical University master’s (M.S.) thesis (2026) independent meter: about 9–10% lower fuel use on a small generator, and about 34% less carbon monoxide (CO) in an idle test. Large marketing figures stay labeled inventor claims.",
  },
  {
    id: "official",
    q: "Is this an official Strike site?",
    a: "No. Strike Foundation (strikefoundation.earth) holds public notes and IP context. We credit them outbound. We do not speak as Strike or Bendall.",
  },
  {
    id: "start",
    q: "Where should a beginner start?",
    a: "Follow Lessons 1–6 on Study (curriculum rail): why it matters → Time’s mould → direction = charge → plasmoids (Exotic Vacuum Occurrences, or EVOs) → three device beats → honest numbers. Progressive disclosure — labs unlock the checks.",
  },
  {
    id: "offline",
    q: "Does the site work offline?",
    a: "After a first visit, a service worker caches a shell (including the study pack). Labs need JavaScript. Progress stays in localStorage on this device only — no accounts.",
  },
  {
    id: "invest",
    q: "Is this an investment pitch?",
    a: "No. Connect is for education and licensed pilot conversations in the US. Outbound investment bridges are labeled as such and are not us.",
  },
  {
    id: "physics",
    q: "Is the model mainstream physics?",
    a: "No. Number locks, direction = charge, and MSAART framing are taught as a coherent study picture inside Bendall and Strike Foundation materials — not as consensus textbook physics.",
  },
  {
    id: "mev-ladder",
    q: "Are the Alpha–Omega MeV ladder totals measured here?",
    a: "No. The totals — in MeV (million electron volts) — are Omega 157.18 MeV, Alpha 117.17 MeV, and total 274.35 MeV (base 26.7 MeV) are inventor-model figures from Draft 518,400 graphics. This site teaches the layout; it does not independently verify those MeV numbers.",
  },
  {
    id: "sell-kits",
    q: "Do you sell Thunderstorm Generator kits?",
    a: "No. Plasmoid X does not sell kits on this site. If you already own a compatible kit — or buy one yourself from a third-party seller — you can inquire about optional install and commissioning labor on Services. Outbound kit and demo links (for example thunderstorm.tech) are third-party, not us.",
  },
  {
    id: "install-strike",
    q: "Are you Strike or an authorized Thunderstorm dealer?",
    a: "No. Derek Watson and Plasmoid X are an independent education site offering optional install labor by inquiry. Not Strike Foundation, Strike Energy, Thunderstorm.tech, or a licensee, authorized dealer, or partner.",
  },
  {
    id: "guarantee-90",
    q: "Do you guarantee 90% fuel savings on an install?",
    a: "No. Inventor marketing figures (often 90% or more) stay labeled claims and are not guaranteed. The Embry-Riddle test numbers on this site (about 9–10% lower fuel use on a small generator, about 34% less carbon monoxide in an idle test) are study context, not a promise that your vehicle will match them.",
  },
];

export type ErrataItem = {
  date: string;
  title: string;
  body: string;
};

export const errataItems: ErrataItem[] = [
  {
    date: "2026-10-15",
    title: "Emissions figure corrected: carbon monoxide only",
    body: "Earlier copy said the Embry-Riddle test found “about −34% average emissions.” The thesis actually reports that carbon monoxide (CO) fell by an average of 34% in an idle test of a small generator, while carbon dioxide, oxygen and hydrocarbons did not change significantly. Fuel figures now follow the thesis: a 9.67% lower fuel-use rate on a small generator and about 8.7% better economy on a one-vehicle road test that covered only some cylinders and had high winds. All pages, the FAQ, the glossary and share images were updated.",
  },
  {
    date: "2026-09-20",
    title: "Device visuals match inventor anatomy (teaching art)",
    body: "Device page now leads with original brochure art for the air ionizer (pre-ionization), the bubbler (plasmoid generator: water column and cavitation), and catalytic tornado resonator with nested contra-rotating (CTR) spheres, plus optional vajra quadrature teaching figure. Captions label inventor-model sketches — not product photos or patent reprints.",
  },
  {
    date: "2026-09-15",
    title: "Alpha–Omega MeV ladder is inventor-model",
    body: "Study Alpha–Omega totals in MeV (million electron volts) (Omega 157.18 MeV, Alpha 117.17 MeV, total 274.35 MeV; base 26.7 MeV) come from Draft 518,400 graphics. They are inventor-model figures, not independently verified on Plasmoid X.",
  },
  {
    date: "2026-09-15",
    title: "MSAART expansion: Ark, not Arc",
    body: "Site copy and glossary standardize on Molten Sea Ark Atomic Reconstruction Technology to match the Plasmoid Unification Model (PUM) and Draft 518400 titles. Roland Perry’s intro essay once types “Arc”; we use Ark.",
  },
  {
    date: "2026-09-15",
    title: "Meter vs 90% lead",
    body: "The Honest numbers and claims-compare sections lead with the Embry-Riddle test (about 9–10% lower fuel use on a small generator, about 34% less carbon monoxide in an idle test). Inventor figures of 90% or more stay labeled and are not the headline.",
  },
  {
    date: "2026-09-14",
    title: "Mobile header overflow fix",
    body: "Sticky header utilities and CSS guards keep the bar within the viewport on small screens (hamburger sheet; desktop nav hidden under 768px).",
  },
];
