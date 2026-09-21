"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LABS,
  countCleared,
  firstIncompleteLab,
  type LabItem,
} from "@/lib/labs";
import {
  countCurriculumDone,
  CURRICULUM,
  firstIncompleteLesson,
} from "@/lib/curriculum";
import { readProgress, subscribeAnyProgress } from "@/lib/progress";

type Props = {
  /** Compact strip for Why; fuller list for Study. */
  variant?: "why" | "study";
};

/** Local-only lab + curriculum progress + resume link. No accounts. */
export default function LearningProgress({ variant = "study" }: Props) {
  const [cleared, setCleared] = useState<LabItem[]>([]);
  const [resume, setResume] = useState<LabItem | null>(null);
  const [totalDone, setTotalDone] = useState(0);
  const [curriculumDone, setCurriculumDone] = useState(0);
  const [curriculumResume, setCurriculumResume] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setCleared(LABS.filter((lab) => readProgress(lab.key)));
      setResume(firstIncompleteLab());
      setTotalDone(countCleared());
      setCurriculumDone(countCurriculumDone());
      const next = firstIncompleteLesson();
      setCurriculumResume(next ? next.href : null);
      setReady(true);
    };
    sync();
    return subscribeAnyProgress(sync);
  }, []);

  if (!ready) {
    return (
      <div
        className={
          variant === "why"
            ? "mt-10 max-w-xl rounded-xl border border-ink-600/45 px-4 py-4 sm:px-5"
            : "mt-8 max-w-xl border-t border-ink-600/40 pt-6"
        }
        style={{
          minHeight: variant === "why" ? "9.5rem" : "8rem",
        }}
        aria-hidden
      />
    );
  }

  const allDone = totalDone === LABS.length && LABS.length > 0;

  return (
    <section
      className={
        variant === "why"
          ? "mt-10 max-w-xl rounded-xl border border-ink-600/45 px-4 py-4 sm:px-5"
          : "mt-8 max-w-xl border-t border-ink-600/40 pt-6"
      }
      aria-label="Learning progress"
    >
      <p className="text-xs leading-relaxed text-mist-400">
        Progress stays on this device only — no account.
      </p>
      <p className="mt-2 text-sm text-mist-200">
        {totalDone === 0 ? (
          <>No labs cleared yet. Start with Lessons 1–6 on Study.</>
        ) : allDone ? (
          <>
            All {LABS.length} labs cleared. Revisit anytime — the checks stay
            local.
          </>
        ) : (
          <>
            <span className="font-medium text-mist-50">{totalDone}</span> of{" "}
            {LABS.length} labs cleared
            {curriculumDone > 0 ? (
              <>
                {" "}
                ·{" "}
                <span className="font-medium text-mist-50">{curriculumDone}</span>{" "}
                of {CURRICULUM.length} lessons
              </>
            ) : null}
            .
          </>
        )}
      </p>

      {cleared.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Cleared labs">
          {cleared.map((lab) => (
            <li key={lab.key}>
              <Link
                href={lab.href}
                className="chip chip-active inline-flex min-h-9 items-center gap-1"
              >
                <span aria-hidden>✓</span>
                {lab.short}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-3">
        {resume ? (
          <Link href={resume.href} className="btn-ghost">
            Resume lab
            <span className="ml-1.5 text-mist-400">· {resume.short}</span>
          </Link>
        ) : allDone ? (
          <Link href="/study/#locks" className="btn-ghost">
            Back to Study locks
          </Link>
        ) : null}
        {curriculumResume ? (
          <Link href={curriculumResume} className="btn-ghost">
            Continue curriculum
          </Link>
        ) : null}
        {variant === "why" ? (
          <Link href="/study/#curriculum" className="btn-ghost">
            Lessons 1–6
          </Link>
        ) : null}
      </div>
    </section>
  );
}
