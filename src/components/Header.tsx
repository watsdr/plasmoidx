"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { siteNav } from "@/lib/content";
import GlossaryDrawer from "@/components/GlossaryDrawer";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname === href || pathname?.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <header
      className={`site-header sticky top-0 z-50 max-w-full border-b transition-[background-color,border-color] duration-200 ${
        scrolled
          ? "border-ink-600/60 bg-ink-950/90 backdrop-blur-md"
          : "border-ink-600/30 bg-ink-950/70 backdrop-blur-sm"
      }`}
    >
      <div className="site-header-inner mx-auto flex min-h-14 w-full max-w-5xl min-w-0 items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
        >
          <picture>
            <source srcSet="/logo.avif" type="image/avif" />
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
              decoding="async"
            />
          </picture>
          <span className="truncate font-medium tracking-tight text-mist-50">
            Plasmoid<span className="text-aurora">X</span>
          </span>
        </Link>

        {/* Desktop: full nav + theme + glossary */}
        <div className="header-desktop hidden min-w-0 items-center gap-1.5 md:flex">
          <nav className="flex min-w-0 items-center gap-0" aria-label="Main">
            {siteNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-md px-2.5 py-2 text-sm tracking-tight transition-colors duration-200 lg:px-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora ${
                    active
                      ? "text-aurora"
                      : "text-mist-300 hover:text-mist-50"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3.5 -bottom-px h-px bg-aurora/80"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
          <GlossaryDrawer />
        </div>

        {/* Mobile: icon theme + hamburger */}
        <div className="header-mobile flex shrink-0 items-center gap-0.5 md:hidden">
          <ThemeToggle compact />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-mist-300 transition-colors hover:text-mist-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet — kept mounted so GlossaryDrawer state survives open */}
      <div
        id={menuId}
        hidden={!menuOpen}
        className={`header-mobile-sheet border-t border-ink-600/40 bg-ink-950/98 md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <nav
          className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 sm:px-6"
          aria-label="Main"
        >
          {siteNav.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                aria-current={active ? "page" : undefined}
                tabIndex={menuOpen ? undefined : -1}
                className={`flex min-h-11 items-center rounded-lg px-3 text-base tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora ${
                  active
                    ? "bg-ink-900/60 text-aurora"
                    : "text-mist-200 hover:bg-ink-900/40 hover:text-mist-50"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 border-t border-ink-600/40 pt-2">
            <GlossaryDrawer
              onOpen={() => setMenuOpen(false)}
              triggerClassName="flex w-full min-h-11 items-center rounded-lg px-3 text-base tracking-tight text-mist-200 transition-colors hover:bg-ink-900/40 hover:text-mist-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
