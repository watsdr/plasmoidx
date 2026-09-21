"use client";

import { useEffect, useId, useMemo, useState } from "react";
import GotItCheck from "@/components/GotItCheck";
import { PROGRESS, markProgress } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

type Choice = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  prompt: string;
  correct: string;
  choices: Choice[];
  explain: string;
};

const QUESTIONS: Question[] = [
  {
    id: "mould",
    prompt: "What is 518,400 in this model?",
    correct: "mould",
    choices: [
      { id: "mould", label: "Time’s mould — the fixed product 1×2×3×4×5×6×8×9×10 (7 left out)" },
      { id: "meter", label: "The Embry-Riddle meter reading" },
      { id: "claim", label: "An inventor fuel-cut figure" },
    ],
    explain:
      "518,400 is treated as Time’s shape. Seven is skipped as the quiet zero-point slot, not multiplied in.",
  },
  {
    id: "angle",
    prompt: "Where does the 51.84° hardware angle come from?",
    correct: "div",
    choices: [
      { id: "div", label: "518,400 ÷ 10,000" },
      { id: "random", label: "A decorative choice with no lock behind it" },
      { id: "era", label: "An Embry-Riddle measurement of cone metal" },
    ],
    explain:
      "Divide Time’s mould by 10,000. That angle is the mouth of the cones and pyramids on the device.",
  },
  {
    id: "spin",
    prompt: "Clockwise spin means which charge action?",
    correct: "store",
    choices: [
      { id: "store", label: "Store — tighten inward (negative)" },
      { id: "spend", label: "Spend — open outward (positive)" },
      { id: "none", label: "Neither; spin direction is decorative" },
    ],
    explain:
      "Direction = charge. Clockwise stores. Anticlockwise spends. Contra-rotating (CTR) hardware uses both.",
  },
  {
    id: "evo",
    prompt: "What is an EVO?",
    correct: "plasmoid",
    choices: [
      {
        id: "plasmoid",
        label:
          "Energetic vacuum object / Exotic Vacuum Occurrence — a self-built donut-shaped plasmoid",
      },
      { id: "battery", label: "A battery chemistry used in the ionizer" },
      { id: "thesis", label: "The title of the Embry-Riddle thesis" },
    ],
    explain:
      "EVO is the Strike-deck phrase (Exotic Vacuum Occurrence) and, in plain words, an energetic vacuum object: a self-built toroidal plasmoid. Strike Foundation is an external source.",
  },
  {
    id: "meter",
    prompt: "What did the independent Embry-Riddle meter show, versus inventor ads?",
    correct: "modest",
    choices: [
      {
        id: "modest",
        label: "About +9–10% fuel efficiency and −34% average emissions (lead with this)",
      },
      { id: "ninety", label: "90% fuel cuts — the figure this site should lead with" },
      { id: "zero", label: "No measured change; only marketing claims exist" },
    ],
    explain:
      "Lead with the university meter. Large fuel cuts and near-zero carbon monoxide (CO) / hydrocarbons (HC) are inventor / marketing claims, labeled as such.",
  },
  {
    id: "beats",
    prompt: "What are the three device beats?",
    correct: "ibv",
    choices: [
      { id: "ibv", label: "Ionizer → bubbler → resonator / nested CTR spheres" },
      { id: "pump", label: "Pump → filter → exhaust turbine" },
      { id: "quiz", label: "Store → spend → dump, with no hardware order" },
    ],
    explain:
      "Ultraviolet (UV) pretreats air in the ionizer chamber, cavitation in the bubbler births energetic vacuum objects (EVOs), then nested CTR spheres in the resonator separate charge.",
  },
];

/** Six plain questions with instant feedback. Progress stays on this device. */
export default function StudyQuiz() {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const titleId = useId();
  const persisted = useProgress(PROGRESS.quiz);

  const answeredCount = Object.keys(picked).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  useEffect(() => {
    if (allAnswered) markProgress(PROGRESS.quiz);
  }, [allAnswered]);

  const correctCount = useMemo(
    () => QUESTIONS.filter((q) => picked[q.id] === q.correct).length,
    [picked]
  );

  return (
    <section
      className="ix-panel my-6 rounded-xl border border-ink-600/50 px-4 py-5 sm:px-5"
      aria-labelledby={titleId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            id={titleId}
            className="text-sm font-medium tracking-tight text-mist-50"
          >
            Check yourself
          </p>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-mist-400">
            Six short questions. Tap an answer for instant feedback. Stays on
            this device only — no accounts.
          </p>
        </div>
        <GotItCheck show={allAnswered || persisted} />
      </div>

      <ol className="mt-6 space-y-8">
        {QUESTIONS.map((q, i) => {
          const choice = picked[q.id];
          const revealed = !!choice;
          const right = choice === q.correct;
          return (
            <li key={q.id}>
              <fieldset className="border-0 p-0">
                <legend className="text-sm font-medium tracking-tight text-mist-50">
                  <span className="mr-2 font-mono text-[11px] text-aurora">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {q.prompt}
                </legend>
                <div className="mt-3 flex flex-col gap-2">
                  {q.choices.map((c) => {
                    const selected = choice === c.id;
                    const isCorrectChoice = c.id === q.correct;
                    let extra = "border-ink-600/60 text-mist-200 hover:border-ink-600";
                    if (revealed && selected && right) {
                      extra = "border-aurora/45 bg-aurora/[0.06] text-mist-50";
                    } else if (revealed && selected && !right) {
                      extra = "border-mist-400/40 text-mist-300";
                    } else if (revealed && isCorrectChoice) {
                      extra = "border-aurora/30 text-mist-100";
                    }
                    return (
                      <button
                        key={c.id}
                        type="button"
                        disabled={revealed}
                        aria-pressed={selected}
                        onClick={() =>
                          setPicked((prev) =>
                            prev[q.id] ? prev : { ...prev, [q.id]: c.id }
                          )
                        }
                        className={`min-h-11 rounded-xl border px-3.5 py-2.5 text-left text-sm leading-relaxed transition-colors duration-200 ease-out disabled:cursor-default ${extra}`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
                {revealed ? (
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-300" role="status">
                    <span className="font-medium text-mist-100">
                      {right ? "Yes." : "Not that."}
                    </span>{" "}
                    {q.explain}
                  </p>
                ) : null}
              </fieldset>
            </li>
          );
        })}
      </ol>

      {allAnswered || persisted ? (
        <p className="mt-6 text-xs text-mist-400" role="status">
          {allAnswered
            ? `${correctCount} of ${QUESTIONS.length} on the first tap. You can revisit the sections above anytime.`
            : "You have finished this check on this device before."}
        </p>
      ) : (
        <p className="mt-6 text-xs text-mist-400">
          {answeredCount} of {QUESTIONS.length} answered.
        </p>
      )}
    </section>
  );
}
