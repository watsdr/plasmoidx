/** Shared open signal for Study command palette (header, FAB, ⌘K, `/`). */

export const STUDY_PALETTE_OPEN_EVENT = "plasmoidx:open-study-palette";

/** Open the Study search palette from anywhere (client-only). */
export function openStudyPalette(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(STUDY_PALETTE_OPEN_EVENT));
}
