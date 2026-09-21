import Link from "next/link";
import dynamic from "next/dynamic";
import VisualPanel from "@/components/VisualPanel";
import TorusMotif from "@/components/TorusMotif";
import SplashMark from "@/components/SplashMark";
import ScrollyChapter from "@/components/ScrollyChapter";
import KeyboardShortcutsTip from "@/components/KeyboardShortcutsTip";
import { siteSlogan } from "@/lib/content";

/** Below-fold client islands — keep above-fold JS light (desktop SI / TBT). */
const CurriculumRail = dynamic(() => import("@/components/CurriculumRail"), {
  ssr: false,
  loading: () => (
    <div
      className="mt-8 min-h-[12rem] rounded-xl border border-ink-600/40 bg-ink-900/20"
      aria-busy="true"
      aria-label="Loading curriculum"
    />
  ),
});
const LearningProgress = dynamic(() => import("@/components/LearningProgress"), {
  ssr: false,
  loading: () => (
    <div
      className="mt-10 max-w-xl rounded-xl border border-ink-600/45 px-4 py-4 sm:px-5"
      style={{ minHeight: "9.5rem" }}
      aria-busy="true"
      aria-label="Loading progress"
    />
  ),
});

const findCards = [
  {
    href: "/study/",
    title: "Study",
    body: "Short lessons and diagrams — start with the basics, go deeper when you want.",
  },
  {
    href: "/device/",
    title: "Device",
    body: "A plain walkthrough of the Thunderstorm Generator path: air, water, plasmoids, engine.",
  },
  {
    href: "/sources/",
    title: "Sources",
    body: "What was measured vs what inventors claim — with links you can check yourself.",
  },
  {
    href: "/services/",
    title: "Services",
    body: "Optional install help for kit owners — inquiry only; kits not sold here.",
  },
  {
    href: "/connect/",
    title: "Connect",
    body: "Questions, corrections, or just say hello. Independent education site.",
  },
] as const;

export default function WhyPage() {
  return (
    <div>
      {/* Splash hero — motion mark + 5-second hook */}
      <section className="relative mx-auto w-full min-w-0 max-w-5xl overflow-hidden px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="relative z-[1] min-w-0">
            <p className="section-label">Why</p>
            <h1 className="fluid-display mt-4 max-w-3xl text-balance font-semibold text-mist-50">
              Engines waste fuel and dirty the air. This approach aims to run
              cleaner.
            </h1>
            <p className="mt-4 text-base font-medium tracking-tight text-aurora sm:text-lg">
              {siteSlogan}
            </p>
            <p className="measure mt-6 text-lg leading-relaxed text-mist-200">
              Everyday gas engines burn fuel in a blast — you feel it at the pump
              and in the air. The Bendall Thunderstorm Generator idea uses water as
              part of an atomic pathway that forms and guides{" "}
              <strong className="font-medium text-mist-100">plasmoids</strong>{" "}
              (tiny self-organized plasma structures) so engines can run cleaner.
              This site teaches that inventor tech in plain English.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-400">
              Independent voice. Not Strike Foundation, Strike Energy, or a
              licensee.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/device/" className="btn-primary">
                See how it works
              </Link>
              <Link href="/study/#curriculum" className="btn-ghost">
                Learn the basics
              </Link>
            </div>
            <KeyboardShortcutsTip />
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:mx-0 lg:justify-end">
            <TorusMotif
              className="pointer-events-none absolute inset-0 m-auto h-[85%] w-[85%] text-aurora opacity-[0.06]"
            />
            <SplashMark />
          </div>
        </div>
      </section>

      {/* Scrollytelling — problem → solution chapters (progressive disclosure) */}
      <section
        className="border-t border-ink-600/40"
        aria-labelledby="problem-solution-heading"
      >
        <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <ScrollyChapter>
            <h2
              id="problem-solution-heading"
              className="fluid-title font-semibold text-mist-50"
            >
              The problem — and a different path
            </h2>
            <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
              Scroll through a short story: what ordinary engines do wrong, then
              how this path reframes the energy process.
            </p>
          </ScrollyChapter>

          <ScrollyChapter delay={60} className="mt-8">
            <VisualPanel
              src="/visuals/home-problem-solution.png"
              alt="Side-by-side: ordinary engine exhaust and waste versus a cleaner, organized torus-style energy path"
              width={1280}
              height={720}
              caption="Ordinary engines waste fuel and dirty the air. This path aims at a cleaner, more organized process."
            />
          </ScrollyChapter>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
            <ScrollyChapter
              delay={100}
              className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
                Chapter 1 · Problem
              </p>
              <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
                Explosive “spend” combustion
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-200">
                Ordinary engines burn gasoline inefficiently. A lot of the fuel’s
                energy is lost as heat and incomplete burn. Emissions — carbon
                monoxide (CO) and others — hurt air quality, and the waste shows
                up on your wallet.
              </p>
            </ScrollyChapter>

            <ScrollyChapter
              delay={180}
              className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aurora">
                Chapter 2 · Solution frame
              </p>
              <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
                Organize energy with plasmoids
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-200">
                This device path forms and guides plasmoids so more of the energy
                story is organized — closer to a “store” than a pure blast. Lead
                result visitors care about: cleaner exhaust and better fuel use.
                The deeper model lives on Study; the hardware path is on Device.
              </p>
            </ScrollyChapter>
          </div>

          <ScrollyChapter delay={220} className="mt-10">
            <div className="rounded-xl border border-ink-600/35 bg-ink-900/25 px-5 py-5 sm:px-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
                Chapter 3 · What to do next
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mist-200">
                Prefer the meter before marketing. Then learn the picture on{" "}
                <Link href="/study/#curriculum" className="link-aurora">
                  Study
                </Link>{" "}
                or walk the hardware on{" "}
                <Link href="/device/" className="link-aurora">
                  Device
                </Link>
                . Press{" "}
                <kbd className="rounded border border-ink-600/70 bg-ink-900/50 px-1.5 py-0.5 text-[11px] text-mist-300">
                  /
                </kbd>{" "}
                anytime to jump to a Study topic.
              </p>
            </div>
          </ScrollyChapter>
        </div>
      </section>

      {/* Honest numbers — after human problem/solution */}
      <section
        className="border-t border-ink-600/40"
        aria-labelledby="honest-numbers-heading"
      >
        <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <ScrollyChapter>
            <h2
              id="honest-numbers-heading"
              className="fluid-title font-semibold text-mist-50"
            >
              What was measured
            </h2>
            <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
              One clear distinction: independent meter results versus inventor
              claims. Full compare on{" "}
              <Link href="/sources/" className="link-aurora">
                Sources
              </Link>{" "}
              and{" "}
              <Link href="/study/#honest-numbers" className="link-aurora">
                Study
              </Link>
              .
            </p>
          </ScrollyChapter>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-12">
            <ScrollyChapter delay={80}>
              <h3 className="text-base font-medium tracking-tight text-mist-50">
                Embry-Riddle Aeronautical University
              </h3>
              <p className="mt-1 text-xs text-mist-400">
                M.S. thesis · 2026 · independent meter
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mist-200">
                Roughly{" "}
                <strong className="font-medium text-aurora">
                  +9–10% fuel efficiency
                </strong>{" "}
                and about{" "}
                <strong className="font-medium text-aurora">
                  −34% average emissions
                </strong>{" "}
                (carbon monoxide (CO) clearest). Measured effect — lead with
                this.
              </p>
            </ScrollyChapter>
            <ScrollyChapter delay={140}>
              <h3 className="text-base font-medium tracking-tight text-mist-50">
                Inventor / marketing claims
              </h3>
              <p className="mt-1 text-xs text-mist-400">Labeled as such</p>
              <p className="mt-4 text-sm leading-relaxed text-mist-200">
                Large fuel cuts (often framed as ≥90%), near-zero carbon monoxide
                (CO) / hydrocarbons (HC), and high chamber temps are{" "}
                <strong className="font-medium text-mist-100">
                  inventor claims
                </strong>
                . This site does not lead with those figures. Use the meter
                first, then the model for why results might scale — and push for
                fuller dyno / isotope work.
              </p>
            </ScrollyChapter>
          </div>
        </div>
      </section>

      {/* What you’ll find */}
      <section
        className="border-t border-ink-600/40"
        aria-labelledby="find-here-heading"
      >
        <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
          <ScrollyChapter>
            <h2
              id="find-here-heading"
              className="fluid-title font-semibold text-mist-50"
            >
              What you’ll find here
            </h2>
            <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
              The landing is the hook. Teaching, walkthroughs, and sources stay on
              their own pages — no textbook dump up front.
            </p>
          </ScrollyChapter>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {findCards.map((card, i) => (
              <ScrollyChapter key={card.href} as="li" delay={60 + i * 50}>
                <Link
                  href={card.href}
                  className="card-lift block h-full rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6"
                >
                  <span className="text-base font-medium tracking-tight text-mist-50">
                    {card.title}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-mist-300">
                    {card.body}
                  </p>
                </Link>
              </ScrollyChapter>
            ))}
          </ul>
        </div>
      </section>

      {/* Returning learners — below the hook */}
      <section className="border-t border-ink-600/40">
        <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-14 sm:px-6 sm:pb-20 sm:pt-16">
          <ScrollyChapter>
            <h2 className="fluid-title font-semibold text-mist-50">
              Continue learning
            </h2>
            <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
              Returning? Pick up where you left off. First visit? Skim the problem
              and solution above, then start Lesson 1 when you’re ready.
            </p>
          </ScrollyChapter>
          <div id="why-curriculum">
            <CurriculumRail variant="why" />
          </div>
          <LearningProgress variant="why" />
        </div>
      </section>
    </div>
  );
}
