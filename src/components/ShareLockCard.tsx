"use client";

import { useCallback, useId, useRef, useState } from "react";

const LABEL =
  "Independent education · Not Strike Foundation, Strike Energy, or a licensee";

/** Downloadable 518,400 → 51.84° card (SVG / PNG). Web Share when available. */
export default function ShareLockCard() {
  const svgRef = useRef<SVGSVGElement>(null);
  const captionId = useId();
  const [status, setStatus] = useState<string | null>(null);

  const serializeSvg = useCallback(() => {
    const el = svgRef.current;
    if (!el) return null;
    const clone = el.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    // Inline fills so the file stands alone (no Tailwind classes).
    clone.querySelectorAll("[data-fill]").forEach((node) => {
      const fill = (node as SVGElement).getAttribute("data-fill");
      if (fill) (node as SVGElement).setAttribute("fill", fill);
    });
    clone.querySelectorAll("[data-stroke]").forEach((node) => {
      const stroke = (node as SVGElement).getAttribute("data-stroke");
      if (stroke) (node as SVGElement).setAttribute("stroke", stroke);
    });
    const xml = new XMLSerializer().serializeToString(clone);
    return `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
  }, []);

  const downloadBlob = useCallback((blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, []);

  const onDownloadSvg = useCallback(() => {
    const xml = serializeSvg();
    if (!xml) return;
    downloadBlob(
      new Blob([xml], { type: "image/svg+xml;charset=utf-8" }),
      "plasmoidx-518400-lock.svg"
    );
    setStatus("SVG downloaded.");
  }, [downloadBlob, serializeSvg]);

  const onDownloadPng = useCallback(() => {
    const xml = serializeSvg();
    if (!xml) return;
    const svgUrl = URL.createObjectURL(
      new Blob([xml], { type: "image/svg+xml;charset=utf-8" })
    );
    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = 360 * scale;
      canvas.height = 220 * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(svgUrl);
        setStatus("Couldn’t draw PNG.");
        return;
      }
      ctx.fillStyle = "#141c2c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(svgUrl);
      canvas.toBlob((blob) => {
        if (!blob) {
          setStatus("Couldn’t encode PNG.");
          return;
        }
        downloadBlob(blob, "plasmoidx-518400-lock.png");
        setStatus("PNG downloaded.");
      }, "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(svgUrl);
      setStatus("Couldn’t render PNG.");
    };
    img.src = svgUrl;
  }, [downloadBlob, serializeSvg]);

  const onShare = useCallback(async () => {
    const xml = serializeSvg();
    if (!xml) return;
    const file = new File([xml], "plasmoidx-518400-lock.svg", {
      type: "image/svg+xml",
    });
    const payload: ShareData = {
      title: "PlasmoidX — Time’s mould lock",
      text: "518,400 → 51.84° · Independent education (not Strike)",
      files: [file],
    };
    try {
      if (navigator.share && navigator.canShare?.(payload)) {
        await navigator.share(payload);
        setStatus("Shared.");
        return;
      }
      if (navigator.share) {
        await navigator.share({
          title: payload.title,
          text: payload.text,
        });
        setStatus("Shared link text.");
        return;
      }
      setStatus("Share isn’t available here — use Download instead.");
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setStatus("Share cancelled or unavailable.");
    }
  }, [serializeSvg]);

  return (
    <figure className="overflow-x-safe my-6 w-full max-w-md" aria-labelledby={captionId}>
      <svg
        ref={svgRef}
        viewBox="0 0 360 220"
        className="h-auto w-full"
        role="img"
        aria-label="Card showing 518400 Time mould and 51.84 degree cone angle, independent education label"
      >
        <rect width="360" height="220" fill="#141c2c" data-fill="#141c2c" />
        <rect
          x="12"
          y="12"
          width="336"
          height="196"
          rx="12"
          fill="none"
          stroke="#243049"
          strokeWidth="1.25"
          data-stroke="#243049"
        />
        <text
          x="180"
          y="40"
          textAnchor="middle"
          fill="#6b84a8"
          data-fill="#6b84a8"
          style={{ fontSize: 10, letterSpacing: "0.14em", fontFamily: "system-ui, sans-serif" }}
        >
          {"TIME'S MOULD"}
        </text>
        <text
          x="180"
          y="76"
          textAnchor="middle"
          fill="#f4f7fb"
          data-fill="#f4f7fb"
          style={{
            fontSize: 28,
            fontWeight: 600,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          518,400
        </text>
        <text
          x="180"
          y="100"
          textAnchor="middle"
          fill="#6b84a8"
          data-fill="#6b84a8"
          style={{ fontSize: 11, fontFamily: "system-ui, sans-serif" }}
        >
          1×2×3×4×5×6×8×9×10 (7 left out)
        </text>
        <line
          x1="48"
          y1="114"
          x2="312"
          y2="114"
          stroke="#243049"
          strokeWidth="1"
          data-stroke="#243049"
        />
        <text
          x="180"
          y="144"
          textAnchor="middle"
          fill="#5eead4"
          data-fill="#5eead4"
          style={{
            fontSize: 22,
            fontWeight: 600,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          51.84°
        </text>
        <text
          x="180"
          y="166"
          textAnchor="middle"
          fill="#6b84a8"
          data-fill="#6b84a8"
          style={{ fontSize: 11, fontFamily: "system-ui, sans-serif" }}
        >
          518,400 ÷ 10,000 — cone / pyramid mouth
        </text>
        <text
          x="180"
          y="192"
          textAnchor="middle"
          fill="#9aadc8"
          data-fill="#9aadc8"
          style={{ fontSize: 9, fontFamily: "system-ui, sans-serif" }}
        >
          {LABEL}
        </text>
      </svg>
      <figcaption
        id={captionId}
        className="mt-2 text-xs leading-relaxed text-mist-400"
      >
        Core lock: Time&apos;s mould number and the hardware angle derived from
        it. Card is labeled independent — not Strike.
      </figcaption>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn-ghost !min-h-11 !px-3 !text-xs" onClick={onDownloadSvg}>
          Download SVG
        </button>
        <button type="button" className="btn-ghost !min-h-11 !px-3 !text-xs" onClick={onDownloadPng}>
          Download PNG
        </button>
        <button type="button" className="btn-ghost !min-h-11 !px-3 !text-xs" onClick={() => void onShare()}>
          Share
        </button>
      </div>
      {status ? (
        <p role="status" className="mt-2 text-xs text-mist-400">
          {status}
        </p>
      ) : null}
    </figure>
  );
}
