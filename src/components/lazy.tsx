"use client";

import dynamic from "next/dynamic";
import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

/**
 * Render a lazy component only once its placeholder is near the viewport
 * (600px), so its chunk isn't fetched or run during Study's first load.
 */
function whenVisible<P extends object>(
  Inner: ComponentType<P>,
  placeholder: () => ReactNode
): ComponentType<P> {
  function WhenVisible(props: P) {
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        setShow(true);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setShow(true);
            io.disconnect();
          }
        },
        { rootMargin: "600px 0px" }
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);
    if (show) return createElement(Inner, props);
    return createElement("div", { ref }, placeholder());
  }
  return WhenVisible;
}
import InteractiveSkeleton from "@/components/interactive/InteractiveSkeleton";

const Build518400Lazy = dynamic(
  () => import("@/components/interactive/Build518400"),
  {
    ssr: false,
    loading: () => (
      <InteractiveSkeleton label="Loading Time’s mould builder" />
    ),
  }
);

const LockFlashcardsLazy = dynamic(
  () => import("@/components/interactive/LockFlashcards"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading lock flashcards" />,
  }
);

const StoreSpendLabLazy = dynamic(
  () => import("@/components/interactive/StoreSpendLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading store or spend lab" />,
  }
);

const ImplosiveLabLazy = dynamic(
  () => import("@/components/interactive/ImplosiveLab"),
  {
    ssr: false,
    loading: () => (
      <InteractiveSkeleton label="Loading implosive or explosive lab" />
    ),
  }
);

const PlasmoidEvoLabLazy = dynamic(
  () => import("@/components/interactive/PlasmoidEvoLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading EVO birth lab" />,
  }
);

const MoeLatticeLabLazy = dynamic(
  () => import("@/components/interactive/MoeLatticeLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading MOE lattice lab" />,
  }
);

const AtvLabLazy = dynamic(
  () => import("@/components/interactive/AtvLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading ATV triangle lab" />,
  }
);

const AlphaOmegaLabLazy = dynamic(
  () => import("@/components/interactive/AlphaOmegaLab"),
  {
    ssr: false,
    loading: () => (
      <InteractiveSkeleton label="Loading Alpha–Omega ladder lab" />
    ),
  }
);

const ProtiumPathLabLazy = dynamic(
  () => import("@/components/interactive/ProtiumPathLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading protium path lab" />,
  }
);

const DeviceBeatsLabLazy = dynamic(
  () => import("@/components/interactive/DeviceBeatsLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading device beats lab" />,
  }
);

const DeviceWalkthroughLazy = dynamic(
  () => import("@/components/interactive/DeviceWalkthrough"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading device walkthrough" />,
  }
);


const NestedSpheresLabLazy = dynamic(
  () => import("@/components/interactive/NestedSpheresLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading nested spheres lab" />,
  }
);

const DeviceSystemFlowLabLazy = dynamic(
  () => import("@/components/interactive/DeviceSystemFlowLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading system flow lab" />,
  }
);

const VajraLabLazy = dynamic(
  () => import("@/components/interactive/VajraLab"),
  {
    ssr: false,
    loading: () => <InteractiveSkeleton label="Loading vajra lab" />,
  }
);

const LocksTableLazy = dynamic(() => import("@/components/LocksTable"), {
  ssr: false,
  loading: () => (
    <div
      className="mt-5 h-40 rounded-xl border border-ink-600/40 bg-ink-900/30"
      aria-busy="true"
      aria-label="Loading locks"
    />
  ),
});

const StudyQuizLazy = dynamic(() => import("@/components/StudyQuiz"), {
  ssr: false,
  loading: () => <InteractiveSkeleton label="Loading check-yourself questions" />,
});

/** Below-fold Study diagrams — code-split to keep initial Study paint light. */
const StoreSpendTorusLazy = dynamic(
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

const AlphaOmegaLadderLazy = dynamic(
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

const ShareLockCardLazy = dynamic(
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

export const Build518400 = whenVisible(Build518400Lazy, () => <InteractiveSkeleton />);
export const LockFlashcards = whenVisible(LockFlashcardsLazy, () => <InteractiveSkeleton />);
export const StoreSpendLab = whenVisible(StoreSpendLabLazy, () => <InteractiveSkeleton />);
export const ImplosiveLab = whenVisible(ImplosiveLabLazy, () => <InteractiveSkeleton />);
export const PlasmoidEvoLab = whenVisible(PlasmoidEvoLabLazy, () => <InteractiveSkeleton />);
export const MoeLatticeLab = whenVisible(MoeLatticeLabLazy, () => <InteractiveSkeleton />);
export const AtvLab = whenVisible(AtvLabLazy, () => <InteractiveSkeleton />);
export const AlphaOmegaLab = whenVisible(AlphaOmegaLabLazy, () => <InteractiveSkeleton />);
export const ProtiumPathLab = whenVisible(ProtiumPathLabLazy, () => <InteractiveSkeleton />);
export const DeviceBeatsLab = whenVisible(DeviceBeatsLabLazy, () => <InteractiveSkeleton />);
export const DeviceWalkthrough = whenVisible(DeviceWalkthroughLazy, () => <InteractiveSkeleton />);
export const NestedSpheresLab = whenVisible(NestedSpheresLabLazy, () => <InteractiveSkeleton />);
export const DeviceSystemFlowLab = whenVisible(DeviceSystemFlowLabLazy, () => <InteractiveSkeleton />);
export const VajraLab = whenVisible(VajraLabLazy, () => <InteractiveSkeleton />);
export const LocksTable = whenVisible(LocksTableLazy, () => <InteractiveSkeleton />);
export const StudyQuiz = whenVisible(StudyQuizLazy, () => <InteractiveSkeleton />);
export const StoreSpendTorus = whenVisible(StoreSpendTorusLazy, () => <InteractiveSkeleton />);
export const AlphaOmegaLadder = whenVisible(AlphaOmegaLadderLazy, () => <InteractiveSkeleton />);
export const ShareLockCard = whenVisible(ShareLockCardLazy, () => <InteractiveSkeleton />);
