"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CURRICULUM,
  countCurriculumDone,
  firstIncompleteLesson,
  lessonIsDone,
  type CurriculumLesson,
} from "@/lib/curriculum";
import { markProgress, subscribeAnyProgress } from "@/lib/progress";

type Props = {
  /** Compact strip on Why; full rail on Study */
  variant?: "why" | "study";
};

function SoftMark({ lesson }: { lesson: CurriculumLesson }) {
  if (!lesson.softKey) return null;
  const done = lessonIsDone(lesson);
  if (done) return null;
  return (
    <button
      type="button"
      className="btn-ghost mt-2 min-h-11 px-3 text-xs"
      onClick={() => markProgress(lesson.softKey!)}
    >
      Mark lesson done
    </button>
  );
}

/** Beginner Lessons 1–6 — checks off as labs clear; soft marks where needed. */
export default function CurriculumRail({ variant = "study" }: Props) {
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});
  const [cleared, setCleared] = useState(0);
  const [resume, setResume] = useState<CurriculumLesson | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      const map: Record<string, boolean> = {};
      for (const lesson of CURRICULUM) {
        map[lesson.id] = lessonIsDone(lesson);
      }
      setDoneMap(map);
      setCleared(countCurriculumDone());
      setResume(firstIncompleteLesson());
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
            ? "mt-8 max-w-xl rounded-xl border border-ink-600/45 px-4 py-4 sm:px-5"
            : "mt-8 max-w-2xl border-t border-ink-600/40 pt-6"
        }
        style={{
          minHeight: variant === "why" ? "11rem" : "14rem",
        }}
        aria-hidden
      />
    );
  }

  const allDone = cleared === CURRICULUM.length;

  return (
    <section
      id={variant === "study" ? "curriculum" : undefined}
      className={
        variant === "why"
          ? "mt-8 max-w-xl rounded-xl border border-ink-600/45 px-4 py-4 sm:px-5"
          : "study-anchor mt-8 max-w-2xl border-t border-ink-600/40 pt-6"
      }
      aria-label="Beginner curriculum"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
        Beginner path · Lessons 1–6
      </p>
      <p className="mt-2 text-sm leading-relaxed text-mist-300">
        {variant === "why" ? (
          <>
            Finishable on{" "}
            <Link href="/study/#curriculum" className="link-aurora">
              Study
            </Link>
            . Checks off as labs clear — about 3–5 minutes framing each.
          </>
        ) : (
          <>
            Progressive disclosure over existing labs. You&apos;re done when the
            check appears — no need to re-read the whole page.
          </>
        )}
      </p>
      <p className="mt-2 text-sm text-mist-200">
        {cleared === 0 ? (
          <>No lessons cleared yet.</>
        ) : allDone ? (
          <>All {CURRICULUM.length} lessons cleared on this device.</>
        ) : (
          <>
            <span className="font-medium text-mist-50">{cleared}</span> of{" "}
            {CURRICULUM.length} lessons cleared.
          </>
        )}
      </p>

      {variant === "study" ? (
        <ol className="mt-5 space-y-4">
          {CURRICULUM.map((lesson) => {
            const got = doneMap[lesson.id];
            return (
              <li
                key={lesson.id}
                id={`lesson-${lesson.id}`}
                className="rounded-xl border border-ink-600/45 px-4 py-3.5 sm:px-5"
              >
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-mono text-[11px] text-aurora">
                    {String(lesson.n).padStart(2, "0")}
                  </span>
                  <Link
                    href={lesson.href}
                    className="text-sm font-medium tracking-tight text-mist-50 underline underline-offset-[0.2em] hover:text-aurora focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
                  >
                    {lesson.title}
                  </Link>
                  {got ? (
                    <span className="text-[11px] text-aurora" aria-label="done">
                      ✓
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mist-300">
                  {lesson.framing}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-mist-400">
                  <span className="font-medium text-mist-300">
                    You&apos;re done when…
                  </span>{" "}
                  {lesson.doneWhen}
                </p>
                {!got ? <SoftMark lesson={lesson} /> : null}
              </li>
            );
          })}
        </ol>
      ) : (
        <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
          {CURRICULUM.map((lesson, i) => {
            const got = doneMap[lesson.id];
            return (
              <li key={lesson.id} className="flex items-center gap-2">
                {i > 0 ? (
                  <span className="text-mist-400" aria-hidden>
                    →
                  </span>
                ) : null}
                <Link
                  href={`/study/#lesson-${lesson.id}`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-1 text-mist-100 underline underline-offset-[0.2em] hover:text-aurora focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
                >
                  <span className="font-mono text-[11px] text-aurora">
                    {String(lesson.n).padStart(2, "0")}
                  </span>
                  <span className="max-w-[9rem] truncate sm:max-w-none">
                    {lesson.title}
                  </span>
                  {got ? (
                    <span className="text-[11px] text-aurora" aria-label="done">
                      ✓
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ol>
      )}

      {resume && variant === "study" ? (
        <div className="mt-4">
          <Link href={resume.href} className="btn-ghost">
            Continue lesson {String(resume.n).padStart(2, "0")}
            <span className="ml-1.5 text-mist-400">· {resume.title}</span>
          </Link>
        </div>
      ) : null}
    </section>
  );
}
