/** Optional science motif — use at very low opacity; never compete with hero text. */
export default function TorusMotif({
  className = "",
  breathe = false,
}: {
  className?: string;
  breathe?: boolean;
}) {
  return (
    <svg
      className={`${className}${breathe ? " torus-breathe" : ""}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse
        cx="100"
        cy="100"
        rx="78"
        ry="38"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="52"
        ry="22"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="26"
        ry="10"
        stroke="currentColor"
        strokeOpacity="0.75"
        strokeWidth="1"
      />
      <circle cx="100" cy="100" r="3" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}
