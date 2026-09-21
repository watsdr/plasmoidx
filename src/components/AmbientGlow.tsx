/**
 * Single static background wash — no pointer tracking, no grain, no stacked layers.
 * Optional and very subtle per UI-UX playbook.
 */
export default function AmbientGlow() {
  return (
    <div className="ambient-root" aria-hidden>
      <div className="ambient-wash" />
    </div>
  );
}
