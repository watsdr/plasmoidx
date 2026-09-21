import type { Metadata } from "next";
import Link from "next/link";
import VisualPanel from "@/components/VisualPanel";
import ContactForm from "@/components/ContactForm";
import ScrollyChapter from "@/components/ScrollyChapter";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Optional install and commissioning help for people who already own a compatible Bendall / Thunderstorm Generator–style kit. Inquiry only. Independent labor — not a Strike store. Not legal advice.",
  openGraph: {
    title: "Services · Plasmoid X",
    description:
      "Independent install / commissioning inquiry for kit owners. Kits not sold here. No performance guarantees. Written estimate before paid work.",
    url: "https://plasmoidx.com/services/",
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
    title: "Services · Plasmoid X",
    description:
      "Install help for kit owners — inquiry only. New energy, explained simply.",
    images: ["https://plasmoidx.com/og.png"],
  },
};

const included = [
  "Mechanical and electrical fitment within the skill and tools available for that job (details in the written estimate).",
  "Basic commissioning: power-up checks, leak/connection review, and a calm walkthrough of what was done.",
  "Documentation of the work performed for your records.",
  "Optional before/after notes only if you provide a baseline (for example fuel logs) or agree a simple check protocol in writing — not a fabricated dyno promise.",
] as const;

const notIncluded = [
  "Selling kits or acting as a kit storefront on this page.",
  "Manufacturer warranty administration (any kit warranty is between you and the seller/maker).",
  "Guaranteeing inventor marketing figures (including ≥90% fuel claims) or that any study result will repeat on your vehicle.",
  "Defeating required emissions equipment or doing illegal modifications.",
  "Unlimited remote support or open-ended troubleshooting outside the agreed scope.",
] as const;

const processSteps = [
  {
    n: "1",
    title: "Email inquiry",
    body: "Tell me what kit you have (or plan to buy yourself), the vehicle or equipment, and where you are in the US.",
  },
  {
    n: "2",
    title: "Fit and safety discussion",
    body: "We talk through compatibility, local rules you must check, and whether the job is something I can responsibly take on.",
  },
  {
    n: "3",
    title: "Written scope and price",
    body: "If it looks workable, you get a written estimate: scope, price, and any labor warranty terms for that job. Site copy is not a contract.",
  },
  {
    n: "4",
    title: "Schedule if both agree",
    body: "No online checkout and no automatic booking. Work is scheduled only after you accept the written estimate.",
  },
  {
    n: "5",
    title: "Install / commission",
    body: "Hands-on fitment and basic commissioning within the agreed scope.",
  },
  {
    n: "6",
    title: "Handoff notes",
    body: "You leave with notes on what was done. Ongoing kit issues go to the seller/maker unless the written estimate says otherwise.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Services</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Install help for kit owners
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          Independent labor and commissioning by inquiry — for people who
          already own (or will buy themselves) a compatible Bendall /
          Thunderstorm Generator–style kit. This is not a Strike store, not an
          authorized dealer page, and not online checkout.
        </p>
        <p className="mt-5 inline-flex max-w-xl rounded-lg border border-aurora/30 bg-aurora/5 px-3 py-2 text-sm leading-relaxed text-mist-100">
          Offer in formation — inquiry welcome; terms finalized in a written
          estimate after review.
        </p>
      </header>

      <ScrollyChapter className="mt-10" delay={40}>
        <VisualPanel
          src="/visuals/services-install.png"
          alt="Icons suggesting a customer-owned kit box, tools, and a written estimate — install labor inquiry"
          width={1280}
          height={720}
          caption="Inquiry → written estimate → install labor for kits you already own (or buy yourself). Kits are not sold on this site."
        />
      </ScrollyChapter>

      {/* Problem → solution chapters */}
      <section
        className="mt-14 border-t border-ink-600/40 pt-14"
        aria-labelledby="services-story-heading"
      >
        <ScrollyChapter>
          <h2
            id="services-story-heading"
            className="fluid-title font-semibold text-mist-50"
          >
            Why this page exists
          </h2>
          <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
            Short story: the gap kit owners hit, then a calm inquiry path —
            without storefront noise.
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
              Kit in hand, install unclear
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              You already own (or will buy) a compatible kit, but hose routing,
              power-up checks, and “what did we just do?” notes are easy to get
              wrong alone — and storefronts rarely offer independent labor.
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
              Inquiry → written estimate → work
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Optional paid install / commissioning when both sides agree in
              writing. No online checkout, no kit sales here, no invented
              performance guarantees. Scope and price land in the estimate —
              not in marketing copy.
            </p>
          </ScrollyChapter>
        </div>

        <ScrollyChapter delay={180} className="mt-8">
          <div className="rounded-xl border border-ink-600/35 bg-ink-900/25 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              Chapter 3 · Act
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-200">
              Read what’s included / not included, then start an inquiry below —
              or ask education-only questions on{" "}
              <Link href="/connect/" className="link-aurora">
                Connect
              </Link>
              .
            </p>
          </div>
        </ScrollyChapter>
      </section>

      <ScrollyChapter
        as="section"
        className="mt-14"
        delay={60}
        aria-labelledby="what-this-is-heading"
      >
        <h2
          id="what-this-is-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          What this is / isn’t
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
          <div className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aurora">
              This is
            </p>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-mist-200">
              <li>
                An education site with{" "}
                <strong className="font-medium text-mist-100">
                  optional paid installation / commissioning labor
                </strong>{" "}
                when both sides agree in writing.
              </li>
              <li>
                Work for customers who{" "}
                <strong className="font-medium text-mist-100">
                  already own
                </strong>{" "}
                a kit, or who purchase a kit themselves from a third-party
                seller.
              </li>
              <li>
                Inquiry-only: discussion → written scope and price → schedule
                if we both say yes.
              </li>
              <li>
                Limited United States service area, by arrangement — ask; do
                not assume a specific city is covered.
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-ink-600/45 px-5 py-5 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
              This isn’t
            </p>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-mist-200">
              <li>
                Strike Foundation, Strike Energy, Thunderstorm.tech, or an
                authorized dealer / licensee / partner.
              </li>
              <li>
                A page that sells kits, books installs online, or promises
                street-legal / CARB / EPA certification.
              </li>
              <li>
                A guarantee that Embry-Riddle-style study numbers or inventor
                marketing claims will show up on your vehicle.
              </li>
              <li>
                Medical, investment, or “free energy” promises.
              </li>
            </ul>
          </div>
        </div>
      </ScrollyChapter>

      <ScrollyChapter
        as="section"
        className="mt-16"
        delay={60}
        aria-labelledby="who-for-heading"
      >
        <h2
          id="who-for-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          Who it’s for
        </h2>
        <ul className="measure mt-4 space-y-2.5 text-sm leading-relaxed text-mist-200">
          <li>
            People who already have a compatible kit, or will buy one
            themselves from a third-party seller (for kit demos / purchase
            context, see{" "}
            <a
              href="https://thunderstorm.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="link-aurora"
            >
              thunderstorm.tech
            </a>
            <span className="text-mist-400"> — third-party; not us</span>
            ).
          </li>
          <li>
            People who want hands-on install or commissioning help rather than
            figuring every hose and wire alone.
          </li>
          <li>
            People who understand{" "}
            <strong className="font-medium text-mist-100">
              measured study context versus inventor claims
            </strong>{" "}
            and do not expect a website to promise their personal result.
          </li>
        </ul>
      </ScrollyChapter>

      <ScrollyChapter
        as="section"
        className="mt-16"
        delay={60}
        aria-labelledby="included-heading"
      >
        <h2
          id="included-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          What’s typically included
        </h2>
        <p className="measure mt-3 text-sm leading-relaxed text-mist-300">
          Subject to the written estimate for your job — not a fixed menu.
        </p>
        <ul className="mt-6 max-w-2xl space-y-3 text-sm leading-relaxed text-mist-200">
          {included.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-ink-600/45 px-4 py-3.5 sm:px-5"
            >
              {item}
            </li>
          ))}
        </ul>
      </ScrollyChapter>

      <ScrollyChapter
        as="section"
        className="mt-16"
        delay={60}
        aria-labelledby="not-included-heading"
      >
        <h2
          id="not-included-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          What’s not included
        </h2>
        <ul className="mt-6 max-w-2xl space-y-3 text-sm leading-relaxed text-mist-200">
          {notIncluded.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-ink-600/45 px-4 py-3.5 sm:px-5"
            >
              {item}
            </li>
          ))}
        </ul>
      </ScrollyChapter>

      <ScrollyChapter
        as="section"
        className="mt-16"
        delay={60}
        aria-labelledby="numbers-heading"
      >
        <h2
          id="numbers-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          Honest numbers reminder
        </h2>
        <p className="measure mt-4 text-sm leading-relaxed text-mist-200">
          Independent Embry-Riddle Aeronautical University M.S. thesis (2026)
          meter context on this site is about{" "}
          <strong className="font-medium text-mist-100">
            +9–10% fuel efficiency
          </strong>{" "}
          and about{" "}
          <strong className="font-medium text-mist-100">
            −34% average emissions
          </strong>
          . That is{" "}
          <strong className="font-medium text-mist-100">
            study context, not a promise for your install
          </strong>
          . Inventor / marketing figures (often framed as ≥90% fuel cuts or
          near-zero emissions) stay labeled claims and are{" "}
          <strong className="font-medium text-mist-100">not guaranteed</strong>
          .
        </p>
        <p className="mt-4 text-sm leading-relaxed text-mist-300">
          Compare sources on{" "}
          <Link href="/sources/" className="link-aurora">
            Sources
          </Link>{" "}
          and{" "}
          <Link href="/study/#honest-numbers" className="link-aurora">
            Study · honest numbers
          </Link>
          .
        </p>
      </ScrollyChapter>

      <ScrollyChapter
        as="section"
        className="mt-16"
        delay={60}
        aria-labelledby="process-heading"
      >
        <h2
          id="process-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          Process
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <ScrollyChapter key={step.n} as="li" delay={40 + i * 40}>
              <p className="font-mono text-xs text-aurora">{step.n}</p>
              <h3 className="mt-2 text-base font-medium tracking-tight text-mist-50">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-300">
                {step.body}
              </p>
            </ScrollyChapter>
          ))}
        </ol>
      </ScrollyChapter>

      <ScrollyChapter
        as="section"
        className="mt-16"
        delay={60}
        aria-labelledby="limits-heading"
      >
        <h2
          id="limits-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          Important limits
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 rounded-xl border border-ink-600/45 px-5 py-5 text-sm leading-relaxed text-mist-200 sm:px-6">
          <p>
            <strong className="font-medium text-mist-100">Your checks.</strong>{" "}
            You are responsible for verifying local laws, vehicle warranties,
            insurance, and emissions rules before any work proceeds. This page
            does not claim installs are street-legal or emissions-exempt in any
            jurisdiction.
          </p>
          <p>
            <strong className="font-medium text-mist-100">Safety.</strong>{" "}
            Engine and fuel-system work can be dangerous. It is not a casual DIY
            project. I may decline requests that look unsafe, illegal, or
            outside what I can do carefully.
          </p>
          <p>
            <strong className="font-medium text-mist-100">Warranties.</strong>{" "}
            Kit manufacturer warranties (if any) are between you and the
            seller/maker. Any install-labor warranty is narrow and{" "}
            <strong className="font-medium text-mist-100">
              specified only in the written estimate
            </strong>{" "}
            — not invented multi-year coverage on this page.
          </p>
          <p>
            <strong className="font-medium text-mist-100">
              Liability posture (plain English).
            </strong>{" "}
            Website copy does not create a contract by itself. Paid work, if
            any, is governed by the written agreement for that job. That
            agreement will limit workmanship responsibility as stated there and
            will not promise consequential damages (for example lost wages,
            rental cars, or “you didn’t get 90%”). Exact terms are set in the
            estimate — not here.
          </p>
          <p>
            <strong className="font-medium text-mist-100">Licenses.</strong>{" "}
            This page does not claim a specific contractor license, shop
            license, or manufacturer authorization. Credentials and insurance
            for a given job, if relevant, will be discussed before you pay — not
            invented in marketing copy.
          </p>
        </div>
      </ScrollyChapter>

      <ScrollyChapter
        as="section"
        className="mt-16"
        delay={60}
        aria-labelledby="not-legal-heading"
      >
        <h2
          id="not-legal-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          Not legal advice
        </h2>
        <p className="measure mt-4 text-sm leading-relaxed text-mist-300">
          This page is general information for education and inquiry framing. It
          is{" "}
          <strong className="font-medium text-mist-100">not legal advice</strong>
          . Derek Watson is not providing legal counsel here. Have a qualified
          attorney review before relying on this framing for real paid jobs,
          contracts, licensing, or emissions questions.
        </p>
      </ScrollyChapter>

      <ScrollyChapter
        as="section"
        className="mt-16"
        delay={60}
        aria-labelledby="inquiry-heading"
      >
        <h2
          id="inquiry-heading"
          className="fluid-title font-semibold text-mist-50"
        >
          Start an install inquiry
        </h2>
        <p className="measure mt-4 text-sm leading-relaxed text-mist-200">
          Prefer email with a clear subject. Education-only questions can still
          use{" "}
          <Link href="/connect/" className="link-aurora">
            Connect
          </Link>
          .
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-lg font-medium tracking-tight text-mist-50">
              Email
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">
              Opens your mail app with a prefilled subject. No server signup.
            </p>
            <a
              href="mailto:contact@plasmoidx.com?subject=Plasmoid%20X%20install%20inquiry"
              className="btn-primary mt-5"
            >
              Email install inquiry
            </a>
            <p className="mt-4 text-xs leading-relaxed text-mist-400">
              contact@plasmoidx.com · Independent voice. Not Strike Foundation,
              Strike Energy, or a licensee.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium tracking-tight text-mist-50">
              Short note
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-300">
              Optional fields. Submit opens your mail client with an install
              inquiry subject.
            </p>
            <ContactForm intent="install" />
          </div>
        </div>
      </ScrollyChapter>

      <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/connect/" className="btn-ghost">
          Connect
        </Link>
        <Link href="/sources/" className="btn-ghost">
          Sources
        </Link>
        <Link href="/device/" className="btn-ghost">
          Device
        </Link>
      </div>
    </div>
  );
}
