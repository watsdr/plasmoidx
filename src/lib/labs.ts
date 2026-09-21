/** Study / Device labs tracked via plasmoidx-progress-* keys. */

import { PROGRESS, readProgress, type ProgressKey } from "@/lib/progress";

export type LabItem = {
  key: ProgressKey;
  label: string;
  short: string;
  href: string;
  page: "study" | "device";
};

export const LABS: LabItem[] = [
  {
    key: PROGRESS.build518400,
    label: "Time's mould builder",
    short: "Builder",
    href: "/study/#locks",
    page: "study",
  },
  {
    key: PROGRESS.flashcards,
    label: "Lock flashcards",
    short: "Flashcards",
    href: "/study/#vortex",
    page: "study",
  },
  {
    key: PROGRESS.implosive,
    label: "Implosive / explosive lab",
    short: "Implosive",
    href: "/study/#charge",
    page: "study",
  },
  {
    key: PROGRESS.storespend,
    label: "Store / spend lab",
    short: "Store / spend",
    href: "/study/#charge",
    page: "study",
  },
  {
    key: PROGRESS.evo,
    label: "EVO birth lab",
    short: "EVO birth",
    href: "/study/#plasmoid",
    page: "study",
  },
  {
    key: PROGRESS.protium,
    label: "Protium path lab",
    short: "Protium path",
    href: "/study/#protium",
    page: "study",
  },
  {
    key: PROGRESS.moe,
    label: "MOE lattice lab",
    short: "MOE map",
    href: "/study/#moe",
    page: "study",
  },
  {
    key: PROGRESS.atv,
    label: "ATV triangle lab",
    short: "ATV",
    href: "/study/#moe",
    page: "study",
  },
  {
    key: PROGRESS.alphaomega,
    label: "Alpha–Omega ladder lab",
    short: "Alpha–Omega",
    href: "/study/#moe",
    page: "study",
  },
  {
    key: PROGRESS.walkthrough,
    label: "Device walkthrough",
    short: "Walkthrough",
    href: "/device/",
    page: "device",
  },
  {
    key: PROGRESS.devicebeats,
    label: "Device beats lab",
    short: "Beats",
    href: "/device/#device-beats-lab",
    page: "device",
  },
  {
    key: PROGRESS.nestedspheres,
    label: "Nested CTR spheres lab",
    short: "Nested spheres",
    href: "/device/#nested-spheres-lab",
    page: "device",
  },
  {
    key: PROGRESS.systemflow,
    label: "System flow lab",
    short: "System flow",
    href: "/device/#system-flow-lab",
    page: "device",
  },
  {
    key: PROGRESS.vajra,
    label: "Vajra quadrature lab",
    short: "Vajra",
    href: "/device/#vajra-lab",
    page: "device",
  },
  {
    key: PROGRESS.quiz,
    label: "Check yourself quiz",
    short: "Quiz",
    href: "/study/#quiz",
    page: "study",
  },
];

export function firstIncompleteLab(): LabItem | null {
  for (const lab of LABS) {
    if (!readProgress(lab.key)) return lab;
  }
  return null;
}

export function countCleared(): number {
  return LABS.filter((lab) => readProgress(lab.key)).length;
}
