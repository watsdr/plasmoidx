import type { Metadata } from "next";
import Link from "next/link";
import StudyChips from "@/components/StudyChips";
import GuidedPath from "@/components/GuidedPath";
import LearningProgress from "@/components/LearningProgress";
import CurriculumRail from "@/components/CurriculumRail";
import ClaimsCompare from "@/components/ClaimsCompare";
import LectureCompanion from "@/components/LectureCompanion";
import StudyIdlePrefetch from "@/components/StudyIdlePrefetch";
import ExplainFigure from "@/components/ExplainFigure";
import ScrollyChapter from "@/components/ScrollyChapter";
import {
  Build518400,
  StoreSpendLab,
  LockFlashcards,
  LocksTable,
  StudyQuiz,
  StoreSpendTorus,
  AlphaOmegaLadder,
  ShareLockCard,
  ImplosiveLab,
  PlasmoidEvoLab,
  MoeLatticeLab,
  AtvLab,
  ProtiumPathLab,
  AlphaOmegaLab,
} from "@/components/lazy";
import {
  explainLock518400,
  explainStoreSpend,
  explainAlphaOmega,
  explainImplosiveVsExplosive,
  explainPlasmoidEvo,
  explainMoeLattice,
  explainAtvTriangle,
  explainProtiumPath,
} from "@/lib/explain";
import {
  vortexLaws,
  msaartExpansion,
  watchLinks,
  lectureLinks,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Study",
  description:
    "Beginner Lessons 1–6 plus labs: number locks, direction = charge, plasmoid EVOs, protium path, MOE lattice, and honest Embry-Riddle numbers.",
  openGraph: {
    title: "Study · Plasmoid X",
    description:
      "Finishable beginner curriculum and interactive labs. Meter before marketing.",
    url: "https://plasmoidx.com/study/",
    images: [
      {
        url: "https://plasmoidx.com/og.png",
        width: 1200,
        height: 630,
        alt: "Plasmoid X — New energy, explained simply.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study · Plasmoid X",
    description:
      "Finishable beginner curriculum and interactive labs. Meter before marketing.",
    images: ["https://plasmoidx.com/og.png"],
  },
};

export default function StudyPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <StudyIdlePrefetch />
      <header className="max-w-2xl">
        <p className="section-label">Study</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Hold the picture, then verify the locks
        </h1>
        <p className="measure mt-5 text-lg leading-relaxed text-mist-200">
          Time moulds. Protium (simple hydrogen) is the cast.{" "}
          <span className="font-medium text-aurora">51.84°</span> is the mouth
          of the mould. Clockwise stores. Anticlockwise spends. The torus
          (donut shape) is the womb.
        </p>
      </header>

      {/* Teach → act scrollytelling — calm chapters; dense labs stay below */}
      <section
        className="mt-12 border-t border-ink-600/40 pt-12"
        aria-labelledby="study-story-heading"
      >
        <ScrollyChapter>
          <h2
            id="study-story-heading"
            className="fluid-title font-semibold text-mist-50"
          >
            From confusion to a finishable path
          </h2>
          <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
            Short chapters before the labs: what usually goes wrong when people
            meet this model, then how Study keeps the picture honest and
            finishable. Motion stays calm and respects reduced motion.
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
              Numbers without a map
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Inventor decks and big fuel claims arrive faster than a shared
              picture. Beginners get lost in acronyms — MSAART (Molten Sea Ark
              Atomic Reconstruction Technology), EVO (Exotic Vacuum Occurrence),
              MOE (Model of the Elements) — before they can hold Time&apos;s
              mould or direction = charge.
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
              Locks, then labs, then the meter
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Lessons 1–6 build one picture: number locks, swirl-math laws,
              store vs spend, plasmoid EVOs, and the protium path. Every large
              marketing figure stays labeled; Embry-Riddle meter results lead.
            </p>
          </ScrollyChapter>
        </div>

        <ScrollyChapter delay={180} className="mt-8">
          <div className="rounded-xl border border-ink-600/35 bg-ink-900/25 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 3 · Act
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Use the chips or guided path below, mark what you&apos;ve got,
              and verify honest numbers before marketing claims. Prefer the
              meter; open{" "}
              <Link href="/sources/" className="link-aurora">
                Sources
              </Link>{" "}
              when you want the method lanes spelled out.
            </p>
          </div>
        </ScrollyChapter>
      </section>

      <LearningProgress variant="study" />
      <GuidedPath />
      <CurriculumRail variant="study" />

      <StudyChips />

      <ScrollyChapter className="mt-10" delay={60}>
      <aside
        className="max-w-2xl rounded-xl border border-ink-600/45 px-4 py-4 sm:px-5"
        aria-labelledby="draft-518400-callout"
      >
        <p
          id="draft-518400-callout"
          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400"
        >
          From Draft 518,400
        </p>
        <p className="mt-2 text-sm leading-relaxed text-mist-300">
          Teaching themes from MSAART (Molten Sea Ark Atomic Reconstruction
          Technology) patent notes — summaries only; we do not republish the
          PDFs. Open the labs:
        </p>
        <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-mist-200">
          <li>
            <a href="#charge" className="link-aurora">
              Store / Spend
            </a>{" "}
            — implode (store) vs explode (spend)
          </li>
          <li>
            <a href="#moe" className="link-aurora">
              MOE lattice
            </a>{" "}
            ·{" "}
            <a href="#moe" className="link-aurora">
              Alpha–Omega
            </a>{" "}
            — toroidal element map and MeV ladder sketch
          </li>
          <li>
            <a href="#protium" className="link-aurora">
              Protium path
            </a>{" "}
            — water → plasmoids → work
          </li>
          <li>
            <a href="#honest-numbers" className="link-aurora">
              Claims Compare
            </a>{" "}
            — meter first; inventor claims labeled
          </li>
        </ul>
      </aside>
      </ScrollyChapter>

      <section id="honest-numbers" className="study-anchor mt-12">
        <ScrollyChapter>
          <h2 className="fluid-title font-semibold text-mist-50">
            Honest numbers
          </h2>
          <p className="mt-2 max-w-xl text-sm text-mist-300">
            Bookmarkable compare: inventor claim → what the meter showed → what
            it does not prove. Embry-Riddle leads; 90% figures stay labeled.
          </p>
        </ScrollyChapter>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-12">
          <div>
            <h3 className="font-medium tracking-tight text-mist-50">
              Embry-Riddle Aeronautical University
            </h3>
            <p className="mt-1 text-xs text-mist-400">
              M.S. thesis · 2026 · independent meter
            </p>
            <ul className="mt-3 space-y-2 text-sm text-mist-200">
              <li>
                ~<strong className="text-aurora">+9–10%</strong> fuel efficiency
              </li>
              <li>
                ~<strong className="text-aurora">−34%</strong> average emissions
                (carbon monoxide (CO) clearest)
              </li>
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-mist-400">
              Real, below big marketing claims. Lead with this.
            </p>
          </div>
          <div>
            <h3 className="font-medium tracking-tight text-mist-50">
              Inventor / marketing claims
            </h3>
            <p className="mt-1 text-xs text-mist-400">Labeled as such</p>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Large fuel cuts, near-zero carbon monoxide (CO) / hydrocarbons
              (HC), high chamber temps — labeled as inventor claims. This site
              does not oversell 90% fuel figures.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-base font-medium tracking-tight text-mist-50">
            Claims compare
          </h3>
          <ClaimsCompare className="mt-4" />
        </div>
      </section>

      <section id="locks" className="study-anchor mt-16" tabIndex={-1}>
        <h2 className="fluid-title font-semibold text-mist-50">Number locks</h2>
        <p className="mt-2 text-sm text-mist-300">
          Check these until they feel automatic. 518,400 is Time&apos;s mould —
          the fixed shape this model uses for Time.
        </p>
        <ExplainFigure title="Time’s mould card" beats={explainLock518400}>
          <ShareLockCard />
        </ExplainFigure>
        <Build518400 />
        <noscript>
          <p className="mt-4 text-sm text-mist-400">
            The locks table and interactives need JavaScript. After they load
            once, Study keeps working offline.
          </p>
        </noscript>
        <LocksTable />
      </section>

      <section id="vortex" className="study-anchor mt-16">
        <h2 className="fluid-title font-semibold text-mist-50">
          Four swirl-math laws
        </h2>
        <p className="mt-2 max-w-xl text-sm text-mist-300">
          Simple rules for how these numbers double, fold, and stack into a
          lattice. (Often called vortex math.)
        </p>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
          {vortexLaws.map((law, i) => (
            <li key={law.title}>
              <p className="font-mono text-xs text-aurora">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-medium tracking-tight text-mist-50">
                {law.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">
                {law.body}
              </p>
            </li>
          ))}
        </ol>
        <LockFlashcards />
      </section>

      <section id="charge" className="study-anchor mt-16" tabIndex={-1}>
        <h2 className="fluid-title font-semibold text-mist-50">
          Direction = charge
        </h2>
        <p className="mt-2 max-w-xl text-sm text-mist-300">
          Spin direction tells you whether energy is being stored or spent.
          Inventor lectures pair this with{" "}
          <strong className="font-medium text-mist-100">
            implosive vs explosive
          </strong>{" "}
          framing — taught here as a model picture, not hype.
        </p>
        <ExplainFigure title="store and spend torus" beats={explainStoreSpend}>
          <StoreSpendTorus />
        </ExplainFigure>
        <ExplainFigure
          title="implosive versus explosive"
          beats={explainImplosiveVsExplosive}
        >
          <ImplosiveLab />
        </ExplainFigure>
        <StoreSpendLab />
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Clockwise · tightening · implosion
            </p>
            <p className="mt-2 text-lg font-medium tracking-tight text-mist-50">
              Negative — store
            </p>
            <p className="mt-2 text-sm text-mist-300">
              Structure, life, storage. Inward / implosive side of the pair.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Anticlockwise · opening · explosion
            </p>
            <p className="mt-2 text-lg font-medium tracking-tight text-mist-50">
              Positive — spend
            </p>
            <p className="mt-2 text-sm text-mist-300">
              Discharge, burn, release. Outward / explosive side of the pair.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist-300">
          Contra-rotating (CTR) nested spheres force{" "}
          <strong className="font-medium text-mist-100">both</strong>: expand
          then contract → charge separates → plasmoids feed.
        </p>
      </section>

      <section id="plasmoid" className="study-anchor mt-16">
        <h2 className="fluid-title font-semibold text-mist-50">
          Plasmoid EVO (MSAART)
        </h2>
        <p className="mt-2 max-w-xl text-sm text-mist-300">
          Energetic vacuum object / Exotic Vacuum Occurrence (EVO) — a
          self-built donut-shaped plasma. MSAART means{" "}
          <strong className="font-medium text-mist-100">{msaartExpansion}</strong>{" "}
          — Bendall&apos;s research framework behind this picture (published
          materials via Strike Foundation).
        </p>
        <ExplainFigure title="plasmoid EVO birth" beats={explainPlasmoidEvo}>
          <PlasmoidEvoLab />
        </ExplainFigure>
        <p className="measure mt-4 text-sm leading-relaxed text-mist-200">
          Self-built <strong className="text-mist-50">toroidal plasma</strong>{" "}
          (donut of glowing gas) held in a{" "}
          <strong className="text-mist-50">magnetic bottle</strong>. Born when
          a bubble collapses to a quiet zero-point on the equatorial plane
          (cavitation birth). Grows while charging (~10⁻¹² scale → ~100 µm).
          Discharges like lightning-in-a-bottle when hit by a{" "}
          <strong className="text-mist-50">positive pulse</strong>. A swarm of
          them can share charge.
        </p>
      </section>

      <section id="protium" className="study-anchor mt-16">
        <h2 className="fluid-title font-semibold text-mist-50">Protium path</h2>
        <p className="mt-2 max-w-xl text-sm text-mist-300">
          From water to usable work, in six short steps. Protium means the
          common form of hydrogen (¹H).
        </p>
        <ExplainFigure title="protium path flow" beats={explainProtiumPath}>
          <ProtiumPathLab />
        </ExplainFigure>
        <p className="measure mt-4 text-sm leading-relaxed text-mist-300">
          Water is preconditioned → bubbles collapse (cavitation) → plasmoids
          form → contra-rotating (CTR) charge builds → the swarm opens water
          (H₂O) and harvests ¹H into stored proton/electron → chamber discharge
          returns work → leftovers trend back toward water.
        </p>
      </section>

      <section id="moe" className="study-anchor mt-16">
        <h2 className="fluid-title font-semibold text-mist-50">
          Model of the Elements (MOE) lattice
        </h2>
        <p className="measure mt-4 text-sm leading-relaxed text-mist-200">
          The Model of the Elements (MOE) sits on a{" "}
          <strong className="text-mist-50">16 × 8</strong> lattice — octave
          planes from the swirl-math keys. Design ratios in the metal (spheres,
          pipes, 51.84° cones) live on the{" "}
          <Link href="/device/" className="link-aurora">
            Device
          </Link>{" "}
          page; the lattice is the map that makes those ratios non-arbitrary.
          Area–Time–Volume (ATV) from the 3-4-5 triangle is the model&apos;s
          calculator idea.
        </p>
        <ExplainFigure title="MOE lattice sketch" beats={explainMoeLattice}>
          <MoeLatticeLab />
        </ExplainFigure>
        <ExplainFigure title="ATV triangle" beats={explainAtvTriangle}>
          <AtvLab />
        </ExplainFigure>
        <ExplainFigure title="Alpha–Omega ladder" beats={explainAlphaOmega}>
          <AlphaOmegaLadder />
        </ExplainFigure>
        <AlphaOmegaLab />
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-mist-400">
          Ladder disclaimer: figures above are an original SVG teaching summary.
          Full inventor Alpha–Omega ladder graphics remain outbound — we do not
          dump copyrighted Draft 518,400 ladder images onto this site.
        </p>
      </section>

      <section id="lectures" className="study-anchor mt-16" tabIndex={-1}>
        <h2 className="fluid-title font-semibold text-mist-50">
          Bendall lectures (inventor source)
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist-300">
          Malcolm Bendall speaking on HowTube / the StrikeFoundationEarth
          channel. <strong className="font-medium text-mist-100">Plasmoid X</strong>{" "}
          is independent education — we do not speak as Strike, Bendall, or
          HowTube. Lecture themes below are inventor framing; claims stay
          labeled. Open notes remain at{" "}
          <a
            href="https://www.strikefoundation.earth"
            target="_blank"
            rel="noopener noreferrer"
            className="link-aurora"
          >
            strikefoundation.earth
          </a>
          .
        </p>
        <ul className="mt-5 max-w-2xl space-y-2 text-sm leading-relaxed text-mist-300">
          <li>
            <strong className="font-medium text-mist-100">
              Implosive vs explosive
            </strong>{" "}
            — store / inward vs spend / outward (pairs with Direction = charge
            above).
          </li>
          <li>
            <strong className="font-medium text-mist-100">
              Phase-1 retrofit
            </strong>{" "}
            — inventor rollout framing: engines first (gas / diesel / kerosene),
            then other hardware.
          </li>
          <li>
            <strong className="font-medium text-mist-100">
              MOE · ATV · three device beats
            </strong>{" "}
            — reinforced visually on this page and on Device.
          </li>
        </ul>
        <ul className="mt-6 divide-y divide-ink-600/40 rounded-xl border border-ink-600/45">
          {lectureLinks.map((item) => (
            <li key={item.href} className="px-4 py-3.5 sm:px-5">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-aurora text-sm font-medium"
              >
                {item.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="mt-1 text-xs leading-relaxed text-mist-400">
                {item.note} · Inventor source (outbound)
              </p>
              <LectureCompanion label={item.label} kind="lecture" />
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-mist-400">
          No embeds required — follow the links when you want the inventor&apos;s
          own voice. Series themes also cover Planetary Power Plant, chimney
          retrofits, schematics, and lighter aether / matter / time framing;
          keep mystical notes light on this site.
        </p>
      </section>

      <section id="quiz" className="study-anchor mt-16" tabIndex={-1}>
        <h2 className="fluid-title font-semibold text-mist-50">
          Check yourself
        </h2>
        <p className="mt-2 max-w-xl text-sm text-mist-300">
          Six plain questions on the locks, charge, energetic vacuum objects
          (EVOs), the university meter, and the device beats.
        </p>
        <StudyQuiz />
      </section>

      <section id="watch" className="study-anchor mt-16">
        <h2 className="fluid-title font-semibold text-mist-50">Watch</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300">
          Short outbound pointers for learning context only.{" "}
          <strong className="font-medium text-mist-100">Alchemical Science</strong>{" "}
          is an independent open-source educator — not Plasmoid X, not Strike,
          not a licensee. Their intros cover{" "}
          <strong className="font-medium text-mist-100">{msaartExpansion}</strong>{" "}
          (MSAART) and the three-unit picture. For the inventor&apos;s own
          lecture series, see{" "}
          <a href="#lectures" className="link-aurora">
            Bendall lectures
          </a>{" "}
          above. Inventor claims elsewhere stay labeled as claims.
        </p>
        <ul className="mt-6 divide-y divide-ink-600/40 rounded-xl border border-ink-600/45">
          {watchLinks.map((item) => (
            <li key={item.href} className="px-4 py-3.5 sm:px-5">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-aurora text-sm font-medium"
              >
                {item.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="mt-1 text-xs leading-relaxed text-mist-400">
                {item.note}
              </p>
              <LectureCompanion label={item.label} kind="watch" />
            </li>
          ))}
        </ul>
      </section>

      <p className="measure mt-16 text-xs leading-relaxed text-mist-400">
        Primary public notes and decks live at{" "}
        <a
          href="https://www.strikefoundation.earth"
          target="_blank"
          rel="noopener noreferrer"
          className="link-aurora"
        >
          strikefoundation.earth
        </a>{" "}
        (Strike Foundation — external independent org). HowTube /
        StrikeFoundationEarth is outbound inventor lecture material, not
        Plasmoid X. This site is Derek Watson&apos;s education voice only, not
        an official Strike channel.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/device/" className="btn-primary">
          Device next
        </Link>
        <Link href="/study-pack/" className="btn-ghost">
          Study pack
        </Link>
        <Link href="/sources/" className="btn-ghost">
          Sources
        </Link>
        <Link href="/connect/" className="btn-ghost">
          Connect
        </Link>
      </div>
    </div>
  );
}
