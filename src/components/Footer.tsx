import Link from "next/link";
import {
  externalLinks,
  secondaryNav,
  siteNav,
  siteSlogan,
} from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-600/40">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <p className="text-sm font-medium tracking-tight text-mist-50">
              Plasmoid<span className="text-aurora">X</span>
            </p>
            <p className="mt-2 text-sm text-mist-400">{siteSlogan}</p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
                Pages
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {siteNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-aurora">
                      {item.label}
                    </Link>
                  </li>
                ))}
                {secondaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-aurora">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
                Outside sources
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {externalLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-aurora"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-600/40 pt-6 text-xs text-mist-400">
          <p className="tracking-tight">
            © {new Date().getFullYear()} Derek Watson ·{" "}
            <a href="mailto:contact@plasmoidx.com" className="link-aurora">
              contact@plasmoidx.com
            </a>
          </p>
          <p className="mt-2.5 max-w-2xl leading-relaxed">
            Independent education. Not Strike Foundation, Strike Energy, or a
            licensee. Inventor claims are labeled as claims, and measured
            results name the study behind them.
          </p>
          <p className="mt-2.5 max-w-2xl leading-relaxed">
            Built for calm study: every lab works by keyboard, motion stays
            low if your device asks for reduced motion, and the site works
            offline after your first visit.
          </p>
        </div>
      </div>
    </footer>
  );
}
