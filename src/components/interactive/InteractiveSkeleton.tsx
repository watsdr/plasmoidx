/** Tiny calm placeholder while a client interactive chunk loads. */

type Props = {
  label?: string;
};

export default function InteractiveSkeleton({
  label = "Loading interactive",
}: Props) {
  return (
    <div
      className="ix-panel my-6 rounded-xl border border-ink-600/40 px-4 py-5 sm:px-5"
      aria-busy="true"
      aria-label={label}
    >
      <div className="h-3 w-28 rounded bg-ink-700/70" />
      <div className="mt-3 h-2 max-w-md rounded bg-ink-800/70" />
      <div className="mt-2 h-2 w-3/4 max-w-sm rounded bg-ink-800/50" />
      <div className="mt-5 h-24 rounded-lg bg-ink-900/50" />
    </div>
  );
}
