import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  className?: string;
  /** When true, image stays modest (e.g. Connect strip). Default is prominent. */
  size?: "default" | "compact";
};

/**
 * Quiet marketing visual: rounded border, overflow clip, optional caption.
 * Uses next/image with unoptimized static export.
 */
export default function VisualPanel({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  className = "",
  size = "default",
}: Props) {
  const captionId = caption
    ? `visual-caption-${src.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}`
    : undefined;

  return (
    <figure
      className={`min-w-0 ${size === "compact" ? "max-w-md" : "w-full"} ${className}`}
    >
      <div className="overflow-hidden rounded-xl border border-ink-600/45 bg-ink-900/30">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full object-cover"
          sizes={
            size === "compact"
              ? "(max-width: 640px) 100vw, 28rem"
              : "(max-width: 1024px) 100vw, 64rem"
          }
          {...(captionId ? { "aria-describedby": captionId } : {})}
        />
      </div>
      {caption ? (
        <figcaption
          id={captionId}
          className="measure mt-3 text-sm leading-relaxed text-mist-300"
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
