"use client";

import dynamic from "next/dynamic";
import InteractiveSkeleton from "@/components/interactive/InteractiveSkeleton";

export const Build518400 = dynamic(
  () => import("@/components/interactive/Build518400"),
  {
    ssr: false,
    loading: () => (
      <InteractiveSkeleton label="Loading Time’s mould builder" />
    ),
  }
);

export const LockFlashcards = dynamic(
  () => import("@/components/interactive/LockFlashcards"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading lock flashcards" />,
  }
);

export const StoreSpendLab = dynamic(
  () => import("@/components/interactive/StoreSpendLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading store or spend lab" />,
  }
);

export const ImplosiveLab = dynamic(
  () => import("@/components/interactive/ImplosiveLab"),
  {
    ssr: false,
    loading: () => (
      <InteractiveSkeleton label="Loading implosive or explosive lab" />
    ),
  }
);

export const PlasmoidEvoLab = dynamic(
  () => import("@/components/interactive/PlasmoidEvoLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading EVO birth lab" />,
  }
);

export const MoeLatticeLab = dynamic(
  () => import("@/components/interactive/MoeLatticeLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading MOE lattice lab" />,
  }
);

export const AtvLab = dynamic(
  () => import("@/components/interactive/AtvLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading ATV triangle lab" />,
  }
);

export const AlphaOmegaLab = dynamic(
  () => import("@/components/interactive/AlphaOmegaLab"),
  {
    ssr: false,
    loading: () => (
      <InteractiveSkeleton label="Loading Alpha–Omega ladder lab" />
    ),
  }
);

export const ProtiumPathLab = dynamic(
  () => import("@/components/interactive/ProtiumPathLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading protium path lab" />,
  }
);

export const DeviceBeatsLab = dynamic(
  () => import("@/components/interactive/DeviceBeatsLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading device beats lab" />,
  }
);

export const DeviceWalkthrough = dynamic(
  () => import("@/components/interactive/DeviceWalkthrough"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading device walkthrough" />,
  }
);


export const NestedSpheresLab = dynamic(
  () => import("@/components/interactive/NestedSpheresLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading nested spheres lab" />,
  }
);

export const DeviceSystemFlowLab = dynamic(
  () => import("@/components/interactive/DeviceSystemFlowLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading system flow lab" />,
  }
);

export const VajraLab = dynamic(
  () => import("@/components/interactive/VajraLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading vajra lab" />,
  }
);

export const LocksTable = dynamic(() => import("@/components/LocksTable"), {
  ssr: false,
  loading: () => (
    <div
      className="mt-5 h-40 rounded-xl border border-ink-600/40 bg-ink-900/30"
      aria-busy="true"
      aria-label="Loading locks"
    />
  ),
});

export const StudyQuiz = dynamic(() => import("@/components/StudyQuiz"), {
  ssr: false,
  loading: () => <InteractiveSkeleton label="Loading check-yourself questions" />,
});

/** Below-fold Study diagrams — code-split to keep initial Study paint light. */
export const StoreSpendTorus = dynamic(
  () => import("@/components/diagrams/StoreSpendTorus"),
  {
    ssr: true,
    loading: () => (
      <div
        className="my-6 h-48 max-w-lg rounded-xl border border-ink-600/40 bg-ink-900/20"
        aria-busy="true"
        aria-label="Loading store or spend diagram"
      />
    ),
  }
);

export const AlphaOmegaLadder = dynamic(
  () => import("@/components/diagrams/AlphaOmegaLadder"),
  {
    ssr: true,
    loading: () => (
      <div
        className="my-6 h-56 max-w-md rounded-xl border border-ink-600/40 bg-ink-900/20"
        aria-busy="true"
        aria-label="Loading Alpha–Omega ladder"
      />
    ),
  }
);

export const ShareLockCard = dynamic(
  () => import("@/components/ShareLockCard"),
  {
    ssr: false,
    loading: () => (
      <div
        className="my-6 h-56 max-w-md rounded-xl border border-ink-600/40 bg-ink-900/20"
        aria-busy="true"
        aria-label="Loading lock card"
      />
    ),
  }
);
