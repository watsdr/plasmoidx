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
  /** Override share image path, e.g. "/og/explainers/<slug>.png" */
  ogImage?: string;
};

export function pageMeta({
  path,
  title,
  description,
  section,
  noindex,
  absoluteTitle,
  ogType = "website",
  ogImage,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · Plasmoid X`;
  const image = {
    url: absUrl(ogImage ?? `/og/${section}.png`),
    width: 1200,
    height: 630,
    alt: title.startsWith("Plasmoid X") ? title : `Plasmoid X — ${title}`,
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
  { path: "/explainers/embry-riddle-thunderstorm-generator-test/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/does-the-thunderstorm-generator-work/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/what-is-an-evo/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/plasmoid-water-bubbler/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/air-ionizer-pre-ionization/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/catalytic-tornado-resonator/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/protium-hydrogen-path/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/518400-number-lock/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/who-is-malcolm-bendall/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/is-the-thunderstorm-generator-a-scam/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/explainers/thunderstorm-generator-critics/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/thunderstorm-generator-kit/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/joe-rogan-randall-carlson-malcolm-bendall/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/thunderstorm-tech-test-results/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/other-thunderstorm-generator-tests/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/can-water-be-a-fuel/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/strike-foundation-and-thunderstorm-tech/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/explainers/how-to-read-a-fuel-economy-claim/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/explainers/water-injection-in-engines/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/explainers/what-is-carbon-monoxide/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sources/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/services/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/study-pack/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/connect/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/glossary/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/updates/", priority: 0.5, changeFrequency: "monthly" },
];
