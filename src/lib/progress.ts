/** Local-only study progress. No accounts. Keys stay under plasmoidx-progress-*. */

export const PROGRESS = {
  build518400: "plasmoidx-progress-build518400",
  flashcards: "plasmoidx-progress-flashcards",
  storespend: "plasmoidx-progress-storespend",
  implosive: "plasmoidx-progress-implosive",
  evo: "plasmoidx-progress-evo",
  protium: "plasmoidx-progress-protium",
  moe: "plasmoidx-progress-moe",
  atv: "plasmoidx-progress-atv",
  alphaomega: "plasmoidx-progress-alphaomega",
  walkthrough: "plasmoidx-progress-walkthrough",
  devicebeats: "plasmoidx-progress-devicebeats",
  nestedspheres: "plasmoidx-progress-nestedspheres",
  systemflow: "plasmoidx-progress-systemflow",
  vajra: "plasmoidx-progress-vajra",
  quiz: "plasmoidx-progress-quiz",
  /** Soft curriculum marks (lessons without a dedicated lab) */
  curriculumWhy: "plasmoidx-progress-curriculum-why",
  curriculumNumbers: "plasmoidx-progress-curriculum-numbers",
} as const;

export type ProgressKey = (typeof PROGRESS)[keyof typeof PROGRESS];

const EVENT = "plasmoidx-progress";

export function readProgress(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function markProgress(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, "1");
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { key } }));
  } catch {
    /* private mode / blocked storage */
  }
}

export function subscribeProgress(
  key: string,
  onChange: (done: boolean) => void
): () => void {
  const sync = () => onChange(readProgress(key));
  const onStorage = (e: StorageEvent) => {
    if (e.key === key) sync();
  };
  const onCustom = (e: Event) => {
    const ce = e as CustomEvent<{ key?: string }>;
    if (ce.detail?.key === key) sync();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, onCustom);
  };
}

/** Subscribe to any progress change (for dashboards). */
export function subscribeAnyProgress(onChange: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key && e.key.startsWith("plasmoidx-progress-")) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, onChange);
  };
}
