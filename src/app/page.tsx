import Link from "next/link";
import dynamic from "next/dynamic";
import VisualPanel from "@/components/VisualPanel";
import TorusMotif from "@/components/TorusMotif";
import SplashMark from "@/components/SplashMark";
import ScrollyChapter from "@/components/ScrollyChapter";
import KeyboardShortcutsTip from "@/components/KeyboardShortcutsTip";
import { siteSlogan } from "@/lib/content";
import type { Metadata } from "next";
import { pageMeta, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";

const homeDescription =
  "Malcolm Bendall’s Thunderstorm Generator in plain English: what an Embry-Riddle master’s thesis measured (about 9.67% lower fuel use on a small generator, carbon monoxide down about 34% at idle) versus the bigger inventor claims.";

export const metadata: Metadata = pageMeta({
  path: "/",
  title: "Thunderstorm Generator: what was measured vs claimed | Plasmoid X",
  description: homeDescription,
  section: "home",
  absoluteTitle: true,
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Plasmoid X",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      slogan: "New energy, explained simply.",
      founder: { "@type": "Person", name: "Derek Watson" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Plasmoid X",
      url: `${SITE_URL}/`,
      description: homeDescription,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

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

const commonQuestions = [
  { href: "/explainers/does-the-thunderstorm-generator-work/", label: "Does the Thunderstorm Generator work?" },
  { href: "/explainers/thunderstorm-generator-critics/", label: "Is it a scam or not?" },
  { href: "/explainers/embry-riddle-thunderstorm-generator-test/", label: "What did the Embry-Riddle test measure?" },
  { href: "/explainers/who-is-malcolm-bendall/", label: "Who is Malcolm Bendall?" },
  { href: "/explainers/can-water-be-a-fuel/", label: "Can water be a fuel?" },
] as const;

export default function WhyPage() {
  return (
    <div>
      <JsonLd data={homeJsonLd} />
      {/* Splash hero — motion mark + 5-second hook */}
      <section className="relative mx-auto w-full min-w-0 max-w-5xl overflow-hidden px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="relative z-[1] min-w-0">
            <p className="section-label hidden sm:block">Home</p>
            <h1 className="fluid-display hero-title mt-0 sm:mt-4 max-w-3xl text-balance font-semibold text-mist-50">
              Thunderstorm Generator: what was measured, and what is only
              claimed.
            </h1>
            <p className="mt-4 hidden text-base font-medium tracking-tight text-aurora sm:block sm:text-lg">
              {siteSlogan}
            </p>
            <p className="measure mt-4 text-base leading-relaxed text-mist-200 sm:hidden">
              <span className="font-medium text-mist-100">Measured:</span> a 9.67%
              lower fuel-use rate on a small generator and 34% less carbon
              monoxide (CO) at idle; bigger claims unverified.
            </p>
            <p className="measure mt-6 hidden text-lg leading-relaxed text-mist-200 sm:block">
              <span className="font-medium text-mist-100">Measured:</span> in an
              Embry-Riddle Aeronautical University master’s thesis (2026), the
              retrofit showed about a 9.67% lower fuel-use rate on a small generator
              and about 34% less carbon monoxide (CO) at idle. Carbon dioxide (CO₂), oxygen and
              hydrocarbons did not change significantly. The bigger claims are
              unverified.
            </p>
            <p className="measure mt-4 hidden text-base leading-relaxed text-mist-300 sm:block">
              Malcolm Bendall’s Thunderstorm Generator is an engine add-on that is
              designed to use water to form and guide{" "}
              <strong className="font-medium text-mist-100">plasmoids</strong>{" "}
              (tiny, self-organized bits of plasma). This site explains it in
              plain English, with inventor claims labeled.
            </p>
            <p className="mt-4 hidden max-w-xl text-sm leading-relaxed text-mist-400 sm:block">
              Independent education. Not Strike Foundation, Strike Energy, or a
              licensee.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-3">
              <Link
                href="/explainers/does-the-thunderstorm-generator-work/"
                className="btn-primary"
              >
                Does it work?
              </Link>
              <Link
                href="/explainers/thunderstorm-generator-critics/"
                className="btn-ghost"
              >
                Is it a scam?
              </Link>
              <Link href="/device/" className="btn-ghost">
                How it’s built
              </Link>
            </div>
            <div className="mt-6 sm:hidden">
              <p className="measure mt-0 text-base leading-relaxed text-mist-300">
                Malcolm Bendall’s Thunderstorm Generator is an engine add-on that is
                designed to use water to form and guide{" "}
                <strong className="font-medium text-mist-100">plasmoids</strong>{" "}
                (tiny, self-organized bits of plasma). This site explains it in
                plain English, with inventor claims labeled.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-400">
                Independent education. Not Strike Foundation, Strike Energy, or a
                licensee.
              </p>
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


      {/* Common questions — plain links to the explainers people search for */}
      <section
        className="border-t border-ink-600/40"
        aria-labelledby="common-questions-heading"
      >
        <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6">
          <h2
            id="common-questions-heading"
            className="fluid-title font-semibold text-mist-50"
          >
            Common questions
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {commonQuestions.map((q) => (
              <li key={q.href}>
                <Link
                  href={q.href}
                  className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-ink-600/45 px-4 py-3 text-base tracking-tight text-mist-100 transition-colors hover:border-aurora/50 hover:text-mist-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
                >
                  <span>{q.label}</span>
                  <span aria-hidden className="text-mist-400">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-mist-400">
            More answers on{" "}
            <Link href="/explainers/" className="link-aurora">
              Explainers
            </Link>
            .
          </p>
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
              src="/visuals/home-problem-solution.webp"
              alt="Side-by-side: ordinary engine exhaust and waste versus a cleaner, organized torus-style energy path"
              width={960}
              height={540}
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
                Chapter 2 · Inventor model
              </p>
              <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
                Organize energy with plasmoids
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-200">
                Inventor model: the device is designed to form and guide plasmoids
                so more of the energy is organized — closer to a “store” than a
                pure blast. That is a claim, not a measurement. What was measured
                is smaller: a modest fuel gain and lower carbon monoxide at idle.
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
              One clear distinction: measured results versus inventor
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
                Master’s (M.S.) thesis · 2026 · manufacturer supplied road-test hardware
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mist-200">
                About{" "}
                <strong className="font-medium text-aurora">
                  9–10% lower fuel use
                </strong>{" "}
                on a small generator, and carbon monoxide (CO) down about{" "}
                <strong className="font-medium text-aurora">34%</strong> in an
                idle test (carbon dioxide, oxygen and hydrocarbons did not
                change significantly). Measured — lead with this.
              </p>
            </ScrollyChapter>
            <ScrollyChapter delay={140}>
              <h3 className="text-base font-medium tracking-tight text-mist-50">
                Inventor claims
              </h3>
              <p className="mt-1 text-xs text-mist-400">Labeled as such</p>
              <p className="mt-4 text-sm leading-relaxed text-mist-200">
                Large fuel cuts (often framed as 90% or more), near-zero carbon monoxide
                (CO) and hydrocarbons (HC), and high chamber temps are{" "}
                <strong className="font-medium text-mist-100">
                  inventor claims
                </strong>
                . This site does not lead with those figures. Use the meter
                first, then the model for why results might scale — and push for
                fuller dyno and isotope testing.
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
          <NewsletterSignup className="mt-14" />
        </div>
      </section>
    </div>
  );
}
