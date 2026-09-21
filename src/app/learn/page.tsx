import type { Metadata } from "next";
import Link from "next/link";
import ScrollyChapter from "@/components/ScrollyChapter";

export const metadata: Metadata = {
  title: "Learn → Study",
  description:
    "This path moved to Study. Number locks, vortex laws, plasmoids, and the learning path live at /study/.",
  robots: { index: false, follow: true },
};

/** Thin alias for the old /learn path — static export cannot HTTP-redirect. */
export default function LearnAliasPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="max-w-xl">
        <p className="section-label">Moved</p>
        <h1 className="fluid-display mt-3 max-w-xl font-semibold text-mist-50">
          Learn is now Study
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          The learning path lives under{" "}
          <Link href="/study/" className="link-aurora">
            Study
          </Link>
          . Hardware beats and ratios are on{" "}
          <Link href="/device/" className="link-aurora">
            Device
          </Link>
          .
        </p>
      </header>

      <section
        className="mt-12 border-t border-ink-600/40 pt-12"
        aria-labelledby="learn-story-heading"
      >
        <ScrollyChapter>
          <h2
            id="learn-story-heading"
            className="fluid-title font-semibold text-mist-50"
          >
            Why the rename
          </h2>
          <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
            Short chapters: what was confusing, where the path lives now, what
            to open next. Motion respects reduced motion.
          </p>
        </ScrollyChapter>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
          <ScrollyChapter
            delay={80}
            className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 1 · Problem
            </p>
            <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
              Two doors for one path
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              “Learn” and “Study” used to sound like different products. One
              calm curriculum is easier to finish than two labels for the same
              lessons.
            </p>
          </ScrollyChapter>

          <ScrollyChapter
            delay={140}
            className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aurora">
              Chapter 2 · Solution
            </p>
            <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
              One hub: Study
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Lessons 1–6, locks, labs, and honest numbers live under Study.
              Device keeps the hardware walkthrough. This URL stays as a quiet
              alias for old bookmarks.
            </p>
          </ScrollyChapter>
        </div>

        <ScrollyChapter delay={180} className="mt-8">
          <div className="rounded-xl border border-ink-600/35 bg-ink-900/25 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 3 · Act
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Open Study for the curriculum, or Device if you want the three
              beats and ratios first.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/study/" className="btn-primary">
                Go to Study
              </Link>
              <Link href="/device/" className="btn-ghost">
                Device
              </Link>
            </div>
          </div>
        </ScrollyChapter>
      </section>
    </div>
  );
}
