"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  ["curriculum", "Lessons 1–6"],
  ["honest-numbers", "Honest numbers"],
  ["locks", "Number locks"],
  ["vortex", "Vortex laws"],
  ["charge", "Direction = charge"],
  ["plasmoid", "Plasmoid EVO"],
  ["protium", "Protium path"],
  ["moe", "MOE lattice"],
  ["lectures", "Lectures"],
  ["quiz", "Check yourself"],
  ["watch", "Watch"],
] as const;

type SectionId = (typeof sections)[number][0];

/** Quiet sticky study chips with IntersectionObserver scroll-spy. */
export default function StudyChips() {
  const [active, setActive] = useState<SectionId>(sections[0][0]);
  const chipRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>(
    {}
  );

  useEffect(() => {
    const ids = sections.map(([id]) => id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    const visible = new Map<SectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }

        // Prefer the topmost visible section in document order.
        let current: SectionId | null = null;
        for (const id of ids) {
          if (visible.has(id)) {
            current = id;
            break;
          }
        }
        if (current) {
          setActive((prev) => (prev === current ? prev : current));
        }
      },
      {
        // Bias toward the band just under sticky header + chips.
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = chipRefs.current[active];
    if (el) {
      el.scrollIntoView({
        inline: "nearest",
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <nav className="study-nav-sticky mt-8 -mx-1 max-w-full" aria-label="Study sections">
      <div className="chip-scroll flex max-w-full gap-2 px-1 pb-1" role="list">
        {sections.map(([id, label]) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              role="listitem"
              ref={(el) => {
                chipRefs.current[id] = el;
              }}
              aria-current={isActive ? "true" : undefined}
              className={`chip shrink-0 ${isActive ? "chip-active" : ""}`}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
