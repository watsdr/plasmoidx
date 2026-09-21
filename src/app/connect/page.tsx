import type { Metadata } from "next";
import Link from "next/link";
import VisualPanel from "@/components/VisualPanel";
import ContactForm from "@/components/ContactForm";
import { externalLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Reach Derek Watson at PlasmoidX — education and licensed pilot conversations in the US. contact@plasmoidx.com. Independent outbound links.",
};

export default function ConnectPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="section-label">Connect</p>
        <h1 className="fluid-display mt-3 font-semibold text-mist-50">
          Say hello
        </h1>
        <p className="measure mt-4 text-lg leading-relaxed text-mist-200">
          Education, study questions, and licensed pilot conversations in the
          US are welcome. Keep it clear and human — I read my own mail.
        </p>
        <p className="measure mt-4 text-sm leading-relaxed text-mist-300">
          Looking for hands-on install or commissioning help for a kit you
          already own (or will buy yourself)? See{" "}
          <Link href="/services/" className="link-aurora">
            Services
          </Link>{" "}
          — inquiry only; kits are not sold here.
        </p>
      </header>

      <VisualPanel
        className="mt-8"
        size="compact"
        src="/visuals/services-install.png"
        alt="Quiet reminder of kit, tools, and estimate — install help is on Services"
        width={1280}
        height={720}
        caption="Install labor inquiries live on Services — written estimate before any paid work."
      />

      <section className="mt-10 max-w-2xl rounded-xl border border-ink-600/45 px-4 py-5 sm:px-5">
        <h2 className="text-base font-medium tracking-tight text-mist-50">
          What happens next
        </h2>
        <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-mist-300">
          <li>
            <span className="font-medium text-mist-100">1.</span> Use the
            mailto button or the short note form — both open your own mail app
            with{" "}
            <span className="text-mist-100">contact@plasmoidx.com</span>{" "}
            filled in. Nothing is posted to a server from this static site.
          </li>
          <li>
            <span className="font-medium text-mist-100">2.</span> Send when
            you&apos;re ready. If the form fields were empty, you&apos;ll get a
            calm prompt to add a name or note first.
          </li>
          <li>
            <span className="font-medium text-mist-100">3.</span> I reply as I
            can — usually within a few days. No newsletter signup, no sales
            funnel.
          </li>
        </ol>
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-lg font-medium tracking-tight text-mist-50">
            Email
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist-300">
            Preferred channel. One click opens your mail client.
          </p>
          <a
            href="mailto:contact@plasmoidx.com?subject=PlasmoidX%20inquiry"
            className="btn-primary mt-5"
          >
            contact@plasmoidx.com
          </a>
          <p className="mt-6 text-sm leading-relaxed text-mist-300">
            Seeking education &amp; licensed pilot conversations in the US.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-mist-400">
            Derek Watson. Independent education voice. Not Strike Foundation,
            Strike Energy, HowTube / StrikeFoundationEarth, Alchemical Science,
            or a licensee. External sources below are independent — HowTube is
            outbound inventor lecture material, not us.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium tracking-tight text-mist-50">
            Short note
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist-300">
            Optional fields. Submit opens your mail client with the text
            filled in — or shows a clear empty-state / fallback if mail
            can&apos;t open.
          </p>
          <ContactForm />
        </div>
      </div>

      <section className="mt-16">
        <h2 className="fluid-title font-semibold text-mist-50">
          Outbound links
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist-300">
          Linked for study only. Not partners. Not official PlasmoidX channels.
        </p>
        <ul className="mt-6 divide-y divide-ink-600/40 rounded-xl border border-ink-600/45">
          {externalLinks.map((item) => (
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
                {item.note} · Independent source
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-ink-600/40 pt-10">
        <Link href="/" className="btn-ghost">
          Why
        </Link>
        <Link href="/study/" className="btn-ghost">
          Study
        </Link>
      </div>
    </div>
  );
}
