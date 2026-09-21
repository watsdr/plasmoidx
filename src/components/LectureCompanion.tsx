import {
  companionFor,
  lectureCompanions,
  watchCompanions,
  type CompanionNote,
} from "@/lib/companions";

function CompanionBlock({ note }: { note: CompanionNote }) {
  return (
    <div className="mt-3 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
          What you&apos;ll hear
        </p>
        <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-mist-300">
          {note.hear.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-aurora" aria-hidden>
                ·
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-400">
          How we teach it here
        </p>
        <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-mist-300">
          {note.teach.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-aurora" aria-hidden>
                ·
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Props = {
  label: string;
  kind: "lecture" | "watch";
};

/** 5-bullet companion under a lecture / watch outbound link. */
export default function LectureCompanion({ label, kind }: Props) {
  const note = companionFor(
    label,
    kind === "lecture" ? lectureCompanions : watchCompanions
  );
  if (!note) return null;
  return <CompanionBlock note={note} />;
}
