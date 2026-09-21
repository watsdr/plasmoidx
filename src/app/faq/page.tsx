import type { Metadata } from "next";
import Link from "next/link";
import ScrollyChapter from "@/components/ScrollyChapter";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Beginner questions about Plasmoid X: MSAART, Embry-Riddle meter vs 90% claims, Strike credit, kit installs, offline study, and where to start.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">FAQ</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Beginner questions
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          Short answers. For method and credits see{" "}
          <Link href="/sources/" className="link-aurora">
            Sources
          </Link>
          .
        </p>
      </header>

      <section
        className="mt-12 max-w-2xl border-t border-ink-600/40 pt-12"
        aria-labelledby="faq-story-heading"
      >
        <ScrollyChapter>
          <h2
            id="faq-story-heading"
            className="fluid-title font-semibold text-mist-50"
          >
            Start here if you are stuck
          </h2>
          <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
            Problem → solution → act, then the Q&amp;A list. Dense answers stay
            plain — no scrolly wrap on every item.
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
              Same questions, many tabs
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Meter vs 90% claims, Strike credit, kits, and “where do I start?”
              get asked often. Searching the whole site for each one is slow.
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
              Short honest answers
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              This page keeps beginner answers in one place. Method detail and
              outbound credits live on Sources; Lessons 1–6 live on Study.
            </p>
          </ScrollyChapter>
        </div>

        <ScrollyChapter delay={180} className="mt-8">
          <div className="rounded-xl border border-ink-600/35 bg-ink-900/25 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 3 · Act
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Skim the list below, then open{" "}
              <Link href="/study/#curriculum" className="link-aurora">
                Lessons 1–6
              </Link>{" "}
              or{" "}
              <Link href="/sources/" className="link-aurora">
                Sources
              </Link>{" "}
              when you need depth.
            </p>
          </div>
        </ScrollyChapter>
      </section>

      <dl className="mt-12 max-w-2xl space-y-8">
        {faqItems.map((item) => (
          <div key={item.id} id={item.id}>
            <dt className="text-base font-medium tracking-tight text-mist-50">
              {item.q}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-mist-300">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/study/#curriculum" className="btn-primary">
          Lessons 1–6
        </Link>
        <Link href="/sources/" className="btn-ghost">
          Sources
        </Link>
        <Link href="/updates/" className="btn-ghost">
          Errata
        </Link>
      </div>
    </div>
  );
}
