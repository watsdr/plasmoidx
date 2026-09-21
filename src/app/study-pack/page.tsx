import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import ScrollyChapter from "@/components/ScrollyChapter";
import { deviceBeats, msaartExpansion, siteSlogan } from "@/lib/content";

export const metadata: Metadata = {
  title: "Study pack",
  description:
    "Printable one-page study sheet: Time’s mould locks, three device beats, and a short glossary. Print or Save as PDF.",
};

const glossaryMini = [
  {
    abbr: "MSAART",
    body: "Molten Sea Ark Atomic Reconstruction Technology",
  },
  { abbr: "EVO", body: "Self-built donut plasmoid (energetic vacuum object)" },
  { abbr: "CTR", body: "Contra-rotating nested spheres" },
  { abbr: "MOE", body: "Model of the Elements — 16 × 8 lattice" },
  {
    abbr: "Meter",
    body: "Embry-Riddle ~+9–10% fuel · ~−34% avg emissions (lead with this)",
  },
];

export default function StudyPackPage() {
  return (
    <div className="study-pack mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="no-print mb-8 flex flex-wrap items-center gap-3">
        <PrintButton />
        <Link href="/study/" className="btn-ghost">
          Back to Study
        </Link>
        <p className="w-full text-xs text-mist-400 sm:w-auto">
          Print-optimized sheet — use Save as PDF in the print dialog.
        </p>
      </div>

      {/* Teach → act (screen only; dense sheet below stays readable) */}
      <section
        className="no-print mb-12 max-w-3xl border-b border-ink-600/40 pb-12"
        aria-labelledby="pack-story-heading"
      >
        <ScrollyChapter>
          <h2
            id="pack-story-heading"
            className="fluid-title font-semibold text-mist-50"
          >
            One sheet you can hold
          </h2>
          <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
            Calm chapters before the printable reference. Lists below stay
            dense on purpose.
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
              Too much to remember at once
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Locks, beats, and acronyms scatter across Study. Offline or at a
              bench, you need a single calm page — not another long scroll.
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
              Printable locks · beats · glossary
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              This pack is a one-pager: Time&apos;s mould locks, three device
              beats, short expansions (MSAART and friends), and one honest-meter
              line. Independent education — not Strike.
            </p>
          </ScrollyChapter>
        </div>

        <ScrollyChapter delay={180} className="mt-8">
          <div className="rounded-xl border border-ink-600/35 bg-ink-900/25 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 3 · Act
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Print or Save as PDF, then return to{" "}
              <Link href="/study/#curriculum" className="link-aurora">
                Lessons 1–6
              </Link>{" "}
              when you want the full path.
            </p>
            <div className="mt-4">
              <PrintButton />
            </div>
          </div>
        </ScrollyChapter>
      </section>

      <article className="study-pack-sheet max-w-3xl">
        <header className="border-b border-ink-600/50 pb-4">
          <p className="text-sm font-medium tracking-tight text-mist-50">
            Plasmoid<span className="text-aurora">X</span> · study pack
          </p>
          <p className="mt-1 text-xs text-mist-400">{siteSlogan}</p>
          <h1 className="mt-3 text-xl font-semibold tracking-tight text-mist-50 sm:text-2xl">
            Locks · three beats · short glossary
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-mist-300">
            Independent education. Not Strike Foundation. MSAART ={" "}
            {msaartExpansion}. Lead with Embry-Riddle before inventor 90%
            claims.
          </p>
        </header>

        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-mist-400">
            Number locks
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-mist-200 sm:grid-cols-2">
            <li>
              <strong className="text-mist-50">518,400</strong> — Time&apos;s
              mould (1×2×3×4×5×6×8×9×10; 7 omitted)
            </li>
            <li>
              <strong className="text-mist-50">51.84°</strong> — mould mouth
              (518,400 ÷ 10,000)
            </li>
            <li>
              <strong className="text-mist-50">25,920 × 20</strong> — Great Year
              path back to 518,400
            </li>
            <li>
              <strong className="text-mist-50">RFEU 129,600</strong> —{" "}
              518,400 ÷ 129,600 = 4 in the model
            </li>
            <li>
              <strong className="text-mist-50">Direction</strong> — clockwise
              stores · anticlockwise spends
            </li>
            <li>
              <strong className="text-mist-50">Ratios</strong> — spheres 4∶3∶2 /
              8∶6∶4 · pipes 1∶2 · cones 51.84°
            </li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-mist-400">
            Three device beats
          </h2>
          <ol className="mt-3 grid gap-3 sm:grid-cols-3">
            {deviceBeats.map((beat) => (
              <li
                key={beat.n}
                className="rounded-lg border border-ink-600/45 px-3 py-3"
              >
                <p className="font-mono text-[11px] text-aurora">{beat.n}</p>
                <p className="mt-1 text-sm font-medium text-mist-50">
                  {beat.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-mist-300">
                  {beat.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-mist-400">
            Short glossary
          </h2>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {glossaryMini.map((g) => (
              <div key={g.abbr} className="flex gap-2">
                <dt className="shrink-0 font-medium text-aurora">{g.abbr}</dt>
                <dd className="text-mist-300">{g.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-6 border-t border-ink-600/50 pt-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-mist-400">
            Honest numbers (one line)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist-200">
            Meter: ~+9–10% fuel efficiency · ~−34% avg emissions. Inventor ≥90%
            / near-zero claims stay labeled — they are not proven by that meter.
          </p>
        </section>

        <p className="mt-6 text-[11px] leading-relaxed text-mist-400">
          plasmoidx.com · Derek Watson · Offline after first visit when the
          service worker is active. Full path: Study → Lessons 1–6.
        </p>
      </article>
    </div>
  );
}
