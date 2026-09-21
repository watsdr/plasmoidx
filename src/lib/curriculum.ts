/** Beginner curriculum — progressive rail over existing Study/Device labs. */

import { PROGRESS, readProgress, type ProgressKey } from "@/lib/progress";

export type CurriculumLesson = {
  id: string;
  n: number;
  title: string;
  /** 3–5 min framing copy */
  framing: string;
  doneWhen: string;
  /** Deep-link into existing Study / Device / Why sections */
  href: string;
  /** Labs that clear this lesson when any (or all if requireAll) are done */
  labKeys: ProgressKey[];
  requireAll?: boolean;
  /** Soft lesson: user can mark done without a lab */
  softKey?: ProgressKey;
};

export const CURRICULUM: CurriculumLesson[] = [
  {
    id: "why",
    n: 1,
    title: "Why this matters",
    framing:
      "This site is an independent education voice. Lead with what a university meter showed, then study the model as a picture — not as a substitute for the meter. MSAART means Molten Sea Ark Atomic Reconstruction Technology on first use; Embry-Riddle before inventor 90% claims.",
    doneWhen:
      "You can name the independent voice, the Embry-Riddle lead, and that inventor figures stay labeled.",
    href: "/#why-curriculum",
    labKeys: [],
    softKey: PROGRESS.curriculumWhy,
  },
  {
    id: "mould",
    n: 2,
    title: "Time’s mould (518,400 / 51.84°)",
    framing:
      "518,400 is Time’s mould in this model — the fixed shape used for Time. Divide by 10,000 and you get 51.84°, treated as the cone / pyramid mouth. Verify the builder and flashcards until the family feels automatic.",
    doneWhen:
      "You can rebuild 518,400 and recall that 51.84° is the mould mouth.",
    href: "/study/#locks",
    labKeys: [PROGRESS.build518400, PROGRESS.flashcards],
  },
  {
    id: "charge",
    n: 3,
    title: "Direction = charge",
    framing:
      "Clockwise / tightening / implosion stores (negative). Anticlockwise / opening / explosion spends (positive). Contra-rotating (CTR) nested spheres force both. Use the store/spend and implosive labs — calm model picture, not hype.",
    doneWhen:
      "You can pair store vs spend with clockwise vs anticlockwise without looking it up.",
    href: "/study/#charge",
    labKeys: [PROGRESS.storespend, PROGRESS.implosive],
  },
  {
    id: "evo",
    n: 4,
    title: "Plasmoid / EVO",
    framing:
      "An energetic vacuum object / Exotic Vacuum Occurrence (EVO) is a self-built donut-shaped plasma held in a magnetic bottle. Born in bubble collapse (cavitation), grows while charging, discharges on a positive pulse.",
    doneWhen:
      "You can say what an EVO is in one plain sentence and where it is born.",
    href: "/study/#plasmoid",
    labKeys: [PROGRESS.evo],
  },
  {
    id: "beats",
    n: 5,
    title: "Three device beats",
    framing:
      "Hardware story in three beats: ionizer / air pretreatment → bubbler / plasmoid generator (cavitation) → resonator / nested CTR spheres. Walk the Device page; clear the beats lab when the sequence sticks.",
    doneWhen:
      "You can list ionizer → bubbler → Vajra/CTR in order.",
    href: "/device/",
    labKeys: [PROGRESS.walkthrough, PROGRESS.devicebeats],
  },
  {
    id: "numbers",
    n: 6,
    title: "Honest numbers",
    framing:
      "Inventor claim → what the meter showed → what it does not prove. Embry-Riddle (~+9–10% fuel efficiency, ~−34% avg emissions) leads; ≥90% marketing figures stay labeled claims. Finish with the Study quiz when ready.",
    doneWhen:
      "You can state the meter figures and name one thing they do not prove.",
    href: "/study/#honest-numbers",
    labKeys: [PROGRESS.quiz],
    softKey: PROGRESS.curriculumNumbers,
  },
];

export function lessonIsDone(lesson: CurriculumLesson): boolean {
  if (lesson.softKey && readProgress(lesson.softKey)) return true;
  if (lesson.labKeys.length === 0) return false;
  if (lesson.requireAll) {
    return lesson.labKeys.every((k) => readProgress(k));
  }
  return lesson.labKeys.some((k) => readProgress(k));
}

export function countCurriculumDone(): number {
  return CURRICULUM.filter((l) => lessonIsDone(l)).length;
}

export function firstIncompleteLesson(): CurriculumLesson | null {
  for (const lesson of CURRICULUM) {
    if (!lessonIsDone(lesson)) return lesson;
  }
  return null;
}
