"use client";

import { useEffect, useId, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

type Card = {
  id: string;
  q: string;
  a: string;
};

const INITIAL: Card[] = [
  {
    id: "518400",
    q: "What is 518,400 in this model?",
    a: "Time’s mould — the fixed product 1×2×3×4×5×6×8×9×10 (7 left out).",
  },
  {
    id: "5184",
    q: "Where does 51.84° come from?",
    a: "518,400 ÷ 10,000. It is the cone / pyramid mouth angle in the hardware.",
  },
  {
    id: "rfeu",
    q: "What is RFEU 129,600?",
    a: "Resonant Frequency Energy Unit (RFEU) — a building-block energy unit tied to protium (simple hydrogen). One path: −259.2 × 500.",
  },
  {
    id: "charge",
    q: "What does “direction = charge” mean?",
    a: "Clockwise spin stores (negative). Anticlockwise spin spends (positive). Spin direction tells you what charge is doing.",
  },
  {
    id: "evo",
    q: "What is an EVO?",
    a: "Exotic Vacuum Occurrence (Strike decks) — in plain words, an energetic vacuum object: a self-built donut-shaped plasmoid held in a magnetic bottle.",
  },
  {
    id: "moe",
    q: "What is the MOE?",
    a: "Model of the Elements (MOE) — a 16 × 8 lattice map that makes the device’s design ratios non-arbitrary.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/** Lightweight flip flashcards for number locks and key terms. */
export default function LockFlashcards() {
  const [cards, setCards] = useState(INITIAL);
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const titleId = useId();
  const persisted = useProgress(PROGRESS.flashcards);

  function flip(id: string) {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    setSeen((prev) => ({ ...prev, [id]: true }));
  }

  const allSeen = INITIAL.every((c) => seen[c.id]);

  useEffect(() => {
    if (allSeen) markProgress(PROGRESS.flashcards);
  }, [allSeen]);

  function onShuffle() {
    setCards((prev) => shuffle(prev));
    setFlipped({});
  }

  return (
    <div
      className="ix-panel my-6 rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      id="flashcards"
      role="region"
      aria-labelledby={titleId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            id={titleId}
            className="text-sm font-medium tracking-tight text-mist-50"
          >
            Lock flashcards
          </p>
          <p className="mt-1 text-xs text-mist-400">
            Tap a card to flip. Check yourself in plain words.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <GotItCheck show={allSeen || persisted} />
          <button
            type="button"
            onClick={onShuffle}
            className="btn-ghost text-xs"
            aria-label="Shuffle flashcards"
          >
            Shuffle
          </button>
        </div>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {cards.map((card) => {
          const isFlipped = !!flipped[card.id];
          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => flip(card.id)}
                aria-pressed={isFlipped}
                className="group flex min-h-[7.5rem] w-full flex-col rounded-xl border border-ink-600/60 bg-ink-900/30 px-4 py-3.5 text-left transition-colors duration-200 ease-out hover:border-ink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-mist-400">
                  {isFlipped ? "Answer" : "Question"}
                </span>
                <span
                  className={`mt-2 text-sm leading-relaxed ${
                    isFlipped ? "text-mist-200" : "font-medium text-mist-50"
                  }`}
                >
                  {isFlipped ? card.a : card.q}
                </span>
                <span className="mt-auto pt-3 text-[11px] text-mist-400">
                  {isFlipped ? "Tap to see question" : "Tap to flip"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
