import type { Metadata } from "next";

export const SITE_URL = "https://plasmoidx.com";

/** OG image sections — PNGs live in public/og/<section>.png (npm run og). */
export type OgSection =
  | "home"
  | "study"
  | "device"
  | "explainers"
  | "sources"
  | "services"
  | "connect"
  | "faq"
  | "glossary";

export function absUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

type PageMetaInput = {
  /** Route with trailing slash, e.g. "/study/" */
  path: string;
  /** Short title; layout template appends " · Plasmoid X" */
  title: string;
  description: string;
  section: OgSection;
  noindex?: boolean;
  /** Use the exact title (no template), e.g. on Home */
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
};

export function pageMeta({
  path,
  title,
  description,
  section,
  noindex,
  absoluteTitle,
  ogType = "website",
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · Plasmoid X`;
  const image = {
    url: absUrl(`/og/${section}.png`),
    width: 1200,
    height: 630,
    alt: `Plasmoid X — ${title}`,
    type: "image/png",
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absUrl(path),
      siteName: "Plasmoid X",
      locale: "en_US",
      type: ogType,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Indexable routes for sitemap.xml (keep /stats/ and alias pages out). */
export const SITEMAP_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/study/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/device/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/explainers/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/explainers/what-is-a-plasmoid/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/explainers/plasmoid-vs-plasma/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/thunderstorm-generator/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/explainers/msaart/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sources/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/study-pack/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/connect/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/glossary/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/updates/", priority: 0.5, changeFrequency: "monthly" },
];
