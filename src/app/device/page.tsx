import type { Metadata } from "next";
import Link from "next/link";
import VisualPanel from "@/components/VisualPanel";
import Lock518400Card from "@/components/diagrams/Lock518400Card";
import ExplainFigure from "@/components/ExplainFigure";
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
  title: "Device",
  description:
    "Bendall Thunderstorm Generator in three plain steps — air ionizer, bubbler / plasmoid generator, and catalytic tornado resonator with nested CTR spheres — plus hardware design ratios at a glance.",
  openGraph: {
    title: "Device · Plasmoid X",
    description:
      "Three beats: ionizer → bubbler → resonator / nested CTR spheres. Ratios locked to 51.84° and the MOE lattice.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function DevicePage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Device</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Three beats in the metal
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          Inventor teaching model (Draft 518,400 / Thunderstorm Generator
          overview): an air ionizer / pre-ionization chamber, a bubbler /
          plasmoid generator (water column + cavitation), then a catalytic
          tornado resonator with nested contra-rotating (CTR) spheres. Fuel
          hydrocarbons are just kindling; the plasmoid–protium cycle does the
          real work. Ratios below are what the hardware is tuned to.
        </p>
      </header>

      <VisualPanel
        className="mt-10"
        src="/visuals/device-system-accurate.png"
        alt="Inventor-model teaching sketch: air ionizer with violet interior cue, water-column bubbler with rising cavitation bubbles, and copper-toned resonator showing nested spheres with exhaust feedback"
        width={1280}
        height={720}
        priority
        caption="Inventor-model teaching sketch of the ionizer → bubbler → resonator path (Draft 518,400 anatomy) — original brochure art, not a product photo or patent reprint."
      />

      <section className="mt-8">
        <DeviceSystemFlowLab />
      </section>

      <section className="mt-12">
        <DeviceWalkthrough />
        <ExplainFigure title="three device beats" beats={explainDeviceBeats}>
          <DeviceBeatsLab />
        </ExplainFigure>
        <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
          {deviceBeats.map((beat) => (
            <li key={beat.n}>
              <p className="font-mono text-xs text-aurora">{beat.n}</p>
              <h2 className="mt-2 text-lg font-medium tracking-tight text-mist-50">
                {beat.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">
                {beat.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 space-y-10">
          <div>
            <h2 className="text-lg font-medium tracking-tight text-mist-50">
              Nested CTR spheres (resonator detail)
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist-300">
              Cutaway of the catalytic tornado resonator: outer sphere, inner
              sphere, and tiny central core, with opposing tornadoes in the
              cavity and an exhaust / carburetor-in stub. Inventor-model
              teaching sketch — not a product shot. The interactive companion
              below shows gentle contra-rotation when motion is allowed.
            </p>
            <VisualPanel
              className="mt-5"
              src="/visuals/device-nested-spheres.png"
              alt="Cutaway teaching sketch of nested contra-rotating spheres: outer, inner, and tiny central core with opposing flow arrows and exhaust inlet"
              width={1280}
              height={720}
              caption="Nested CTR spheres in the resonator — inventor-model teaching sketch summarizing outer / inner / core geometry."
            />
            <NestedSpheresLab />
          </div>

          <div>
            <h2 className="text-lg font-medium tracking-tight text-mist-50">
              Optional: plasmoid gun / vajra quadrature
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist-300">
              From Part 4 notes: interlocking cone cross geometry (base tier +
              upper tier). Shown here as optional assembly-geometry teaching —
              a simplified model from inventor notes, not a product shot. Soft
              pulse / step-through below highlights opposing tiers.
            </p>
            <VisualPanel
              className="mt-5"
              src="/visuals/device-vajra-gun.png"
              alt="Simplified teaching model of plasmoid gun or vajra quadrature: interlocking cone tiers in a cross-plus geometry on a square base"
              width={1280}
              height={720}
              caption="Plasmoid gun / vajra quadrature — simplified teaching model from inventor notes (cone cross geometry), not a product photo."
            />
            <VajraLab />
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-mist-400">
          Hydrocarbons (fuel molecules made of hydrogen and carbon) act as
          kindling up to about 300 °C plus vacuum. The plasmoid–protium cycle
          is the work.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-400">
          <span className="font-medium text-mist-300">Speculative scale-up:</span>{" "}
          some Draft 518,400 sketches imagine a large “planetary receiving”
          plant (ionosphere / site concepts). Concept art only — not a build
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

      <section id="ratios" className="mt-16 scroll-mt-20">
        <h2 className="fluid-title font-semibold text-mist-50">
          Design ratios at a glance
        </h2>
        <p className="mt-2 max-w-xl text-sm text-mist-300">
          What shows up in the metal when the locks are respected. Area–Time–
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
      </section>

      <section className="mt-12">
        <p className="text-sm leading-relaxed text-mist-300">
          Lead with the Embry-Riddle independent meter (~+9–10% fuel
          efficiency, ~−34% avg emissions). Inventor / marketing claims are
          labeled as such. See{" "}
          <Link href="/study/#honest-numbers" className="link-aurora">
            Study · Honest numbers
          </Link>
          .
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-400">
          For independent workshop / DIY footage of prototypes, see{" "}
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
      </section>

      <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/study/" className="btn-ghost">
          Back to Study
        </Link>
        <Link href="/connect/" className="btn-primary">
          Connect
        </Link>
      </div>
    </div>
  );
}
