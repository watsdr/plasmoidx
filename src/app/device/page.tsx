import type { Metadata } from "next";
import { pageMeta, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import { DeviceSystemVisual, NestedSpheresVisual, VajraVisual } from "@/components/visuals/SiteVisuals";
import Lock518400Card from "@/components/diagrams/Lock518400Card";
import ExplainFigure from "@/components/ExplainFigure";
import ScrollyChapter from "@/components/ScrollyChapter";
import {
  DeviceWalkthrough,
  AtvLab,
  DeviceBeatsLab,
  NestedSpheresLab,
  DeviceSystemFlowLab,
  VajraLab,
} from "@/components/lazy";
import {
  explainDeviceBeats,
  explainLock518400,
  explainAtvTriangle,
} from "@/lib/explain";
import { deviceBeats, ratios } from "@/lib/content";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/device/",
    title: "Device: how the Thunderstorm Generator works",
    description: "Malcolm Bendall’s Thunderstorm Generator retrofit in three parts — ionizer, bubbler, resonator — with labeled teaching art and the measured Embry-Riddle numbers.",
    section: "device",
  }),
};

const deviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/device/#article`,
      headline: "How the Thunderstorm Generator works",
      description:
        "Malcolm Bendall’s Thunderstorm Generator retrofit in three parts — ionizer, bubbler, resonator — with the inventor’s model labeled and the measured Embry-Riddle numbers.",
      url: `${SITE_URL}/device/`,
      image: `${SITE_URL}/og/device.png`,
      inLanguage: "en-US",
      author: { "@type": "Person", name: "Derek Watson" },
      publisher: { "@id": `${SITE_URL}/#org` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Device", item: `${SITE_URL}/device/` },
      ],
    },
  ],
};

export default function DevicePage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={deviceJsonLd} />
      <header className="max-w-2xl">
        <p className="section-label">Device</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          How the Thunderstorm Generator works
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          This page walks through Malcolm Bendall’s Thunderstorm Generator, an
          engine retrofit with three parts: an air ionizer, a water bubbler
          (plasmoid generator), and a resonator with nested contra-rotating
          (CTR) spheres. It matters because this is the hardware the
          Embry-Riddle test measured. In the inventor’s model, fuel is only
          kindling and a plasmoid–protium cycle does the real work — that part
          is a claim, not a measurement.
        </p>
        <div className="mt-6 rounded-xl border border-ink-600/45 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
            Measured
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mist-200">
            Embry-Riddle master’s thesis (2026): about 9.67% lower fuel-use rate
            on a small generator and about 34% less carbon monoxide (CO) at idle.
            Carbon dioxide (CO₂), oxygen and hydrocarbons did not change
            significantly; the bigger claims are unverified.{" "}
            <Link
              href="/explainers/embry-riddle-thunderstorm-generator-test/"
              className="link-aurora"
            >
              What the test measured
            </Link>
          </p>
        </div>
      </header>

      <ScrollyChapter className="mt-10" delay={40}>
        <DeviceSystemVisual caption="Inventor model of the ionizer → bubbler → resonator path (Draft 518,400 anatomy): engine exhaust enters the resonator, and its output is piped to the intake. A teaching drawing, not a product photo." />
      </ScrollyChapter>

      {/* Teach → act scrollytelling */}
      <section
        className="mt-14 border-t border-ink-600/40 pt-14"
        aria-labelledby="device-story-heading"
      >
        <ScrollyChapter>
          <h2
            id="device-story-heading"
            className="fluid-title font-semibold text-mist-50"
          >
            From problem to path
          </h2>
          <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
            Short chapters: what ordinary engines miss, then how three hardware
            beats organize the process. Motion stays calm and respects reduced
            motion.
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
              Kindling without a guide
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Hydrocarbons (fuel molecules of hydrogen and carbon) alone are
              treated as the whole story — burn hard, lose heat, dirty the air.
              Without a path that forms and guides plasmoids, most of the energy
              story stays explosive “spend.”
            </p>
          </ScrollyChapter>

          <ScrollyChapter
            delay={140}
            className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aurora">
              Chapter 2 · Inventor model
            </p>
            <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
              Three beats that organize
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Ionizer prepares the air, bubbler grows plasmoids in water, and
              the resonator, with its nested CTR spheres, guides the flow toward the
              engine. In the inventor’s model, fuel is kindling and the
              plasmoid–protium cycle is the work.
            </p>
          </ScrollyChapter>
        </div>

        <ScrollyChapter delay={180} className="mt-8">
          <div className="rounded-xl border border-ink-600/35 bg-ink-900/25 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 3 · Act
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Walk the interactive beats below, then check design ratios and
              honest numbers on{" "}
              <Link href="/study/#honest-numbers" className="link-aurora">
                Study
              </Link>
              . Prefer the meter before marketing claims. Each beat has a
              quick answer:{" "}
              <Link href="/explainers/air-ionizer-pre-ionization/" className="link-aurora">
                ionizer
              </Link>
              ,{" "}
              <Link href="/explainers/plasmoid-water-bubbler/" className="link-aurora">
                bubbler
              </Link>
              ,{" "}
              <Link href="/explainers/catalytic-tornado-resonator/" className="link-aurora">
                resonator
              </Link>
              .
            </p>
          </div>
        </ScrollyChapter>
      </section>

      <ScrollyChapter as="section" className="mt-12" delay={60}>
        <DeviceSystemFlowLab />
      </ScrollyChapter>

      <section className="mt-12">
        <ScrollyChapter delay={40}>
          <DeviceWalkthrough />
          <ExplainFigure title="three device beats" beats={explainDeviceBeats}>
            <DeviceBeatsLab />
          </ExplainFigure>
        </ScrollyChapter>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
          Inventor model · how the three parts are designed to work
        </p>
        <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {deviceBeats.map((beat, i) => (
            <ScrollyChapter key={beat.n} as="li" delay={60 + i * 50}>
              <p className="font-mono text-xs text-aurora">{beat.n}</p>
              <h2 className="mt-2 text-lg font-medium tracking-tight text-mist-50">
                {beat.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">
                {beat.body}
              </p>
            </ScrollyChapter>
          ))}
        </ol>

        <div className="mt-12 space-y-10">
          <ScrollyChapter delay={80}>
            <h2 className="text-lg font-medium tracking-tight text-mist-50">
              Nested CTR spheres (resonator detail)
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist-300">
              Cutaway of the catalytic tornado resonator: outer sphere, inner
              sphere, and tiny central core, with opposing tornadoes in the
              cavity. Hot exhaust comes in at one end. At the other end, a pipe
              carries the cool plasmoid stream to the engine’s intake, just after
              the carburetor. Inventor-model
              teaching sketch — not a product shot. The interactive companion
              below shows gentle contra-rotation when motion is allowed.
            </p>
            <div className="mt-5"><NestedSpheresVisual caption="Nested contra-rotating (CTR) spheres in the resonator: a teaching model of the outer sphere, inner sphere and small core." /></div>
            <NestedSpheresLab />
          </ScrollyChapter>

          <ScrollyChapter delay={100}>
            <h2 className="text-lg font-medium tracking-tight text-mist-50">
              Optional: plasmoid gun (vajra quadrature)
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist-300">
              From Part 4 notes: interlocking cone cross geometry (base tier +
              upper tier). Shown here as optional assembly-geometry teaching —
              a simplified model from inventor notes, not a product shot. The soft
              pulse and step-through below highlights opposing tiers.
            </p>
            <div className="mt-5"><VajraVisual caption="Plasmoid gun (vajra quadrature): a simplified teaching model from inventor notes, not a product photo." /></div>
            <VajraLab />
          </ScrollyChapter>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-mist-400">
          <span className="font-medium text-mist-300">Inventor claim:</span>{" "}
          hydrocarbons (fuel molecules made of hydrogen and carbon) act as
          kindling up to about 300 °C plus vacuum. The plasmoid–protium cycle
          is the work.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-400">
          <span className="font-medium text-mist-300">Speculative scale-up:</span>{" "}
          some Draft 518,400 sketches imagine a large “planetary receiving”
          plant (ionosphere and site concepts). Concept art only — not a build
          plan on this site.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-300">
          Inventor rollout framing (Phase-1): start with engine retrofits, then
          other hardware. Hear the inventor describe the Thunderstorm Generator
          on{" "}
          <a
            href="https://www.howtube.com/Nu5fCbOLJg8Y"
            target="_blank"
            rel="noopener noreferrer"
            className="link-aurora"
          >
            HowTube Section 5
          </a>{" "}
          or the{" "}
          <a
            href="https://www.howtube.com/channels/StrikeFoundationEarth"
            target="_blank"
            rel="noopener noreferrer"
            className="link-aurora"
          >
            StrikeFoundationEarth channel
          </a>{" "}
          — outbound inventor material, not Plasmoid X. Claims labeled.
        </p>
      </section>

      <ScrollyChapter
        as="section"
        id="ratios"
        className="mt-16 scroll-mt-20"
        delay={60}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
          Inventor model
        </p>
        <h2 className="mt-2 fluid-title font-semibold text-mist-50">
          Design ratios at a glance
        </h2>
        <p className="mt-2 max-w-xl text-sm text-mist-300">
          The inventor’s design ratios: what is meant to show up in the metal
          when the locks are respected. Not tested or measured. Area–Time–
          Volume (ATV) from 3-4-5 is the model calculator.
        </p>
        <ExplainFigure title="Time’s mould card" beats={explainLock518400}>
          <Lock518400Card captionId="device-lock-card-caption" />
        </ExplainFigure>
        <ExplainFigure title="ATV triangle" beats={explainAtvTriangle}>
          <AtvLab />
        </ExplainFigure>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ratios.map((r) => (
            <li
              key={r.label}
              className="rounded-xl border border-ink-600/50 px-4 py-4"
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-mist-400">
                {r.label}
              </p>
              <p className="mt-1.5 font-medium tracking-tight text-mist-50">
                {r.value}
              </p>
            </li>
          ))}
        </ul>
      </ScrollyChapter>

      <ScrollyChapter as="section" className="mt-12" delay={80}>
        <p className="text-sm leading-relaxed text-mist-300">
          Lead with the Embry-Riddle master’s thesis test (about 9–10% lower fuel
          use on a small generator; carbon monoxide down about 34% in an idle
          test). The manufacturer supplied the road-test hardware. Inventor
          claims are labeled as such. See{" "}
          <Link href="/study/#honest-numbers" className="link-aurora">
            Study · Honest numbers
          </Link>
          .
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-400">
          For independent workshop and DIY footage of prototypes, see{" "}
          <a
            href="https://www.youtube.com/@AlchemicalScience"
            target="_blank"
            rel="noopener noreferrer"
            className="link-aurora"
          >
            Alchemical Science
          </a>{" "}
          (external educator — not Plasmoid X). For inventor lectures, see{" "}
          <Link href="/study/#lectures" className="link-aurora">
            Study · Bendall lectures
          </Link>
          .
        </p>
      </ScrollyChapter>

      <nav
        aria-label="Keep reading"
        className="mt-16 max-w-2xl border-t border-ink-600/40 pt-10"
      >
        <h2 className="text-lg font-medium tracking-tight text-mist-50">
          Keep reading
        </h2>
        <ul className="mt-4 space-y-2 text-base">
          <li>
            <Link href="/explainers/does-the-thunderstorm-generator-work/" className="link-aurora">
              Does the Thunderstorm Generator work?
            </Link>
          </li>
          <li>
            <Link href="/explainers/is-the-thunderstorm-generator-a-scam/" className="link-aurora">
              Is the Thunderstorm Generator a scam?
            </Link>
          </li>
          <li>
            <Link href="/explainers/embry-riddle-thunderstorm-generator-test/" className="link-aurora">
              What the Embry-Riddle test actually measured
            </Link>
          </li>
        </ul>
      </nav>

      <NewsletterSignup className="mt-12 max-w-2xl" />
    </div>
  );
}
