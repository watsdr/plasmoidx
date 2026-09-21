"use client";

import { useEffect } from "react";

/**
 * After Study paints, idle-prefetch heavy dynamic chunks so labs open faster.
 * Uses requestIdleCallback with a timeout fallback. No new deps.
 */
export default function StudyIdlePrefetch() {
  useEffect(() => {
    const prefetch = () => {
      void import("@/components/interactive/Build518400");
      void import("@/components/interactive/LockFlashcards");
      void import("@/components/interactive/StoreSpendLab");
      void import("@/components/interactive/ImplosiveLab");
      void import("@/components/interactive/PlasmoidEvoLab");
      void import("@/components/interactive/ProtiumPathLab");
      void import("@/components/interactive/MoeLatticeLab");
      void import("@/components/interactive/AtvLab");
      void import("@/components/interactive/AlphaOmegaLab");
      void import("@/components/StudyQuiz");
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(prefetch, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const t = window.setTimeout(prefetch, 200);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
