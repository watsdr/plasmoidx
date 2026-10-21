import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/AmbientGlow";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteSlogan } from "@/lib/content";
import Analytics from "@/components/Analytics";

/** Idle-defer OfflineReady + StudyCommandPalette (or mount on first intent). */
const DeferredSiteChrome = dynamic(
  () => import("@/components/DeferredSiteChrome"),
  { ssr: false }
);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const defaultTitle = `Plasmoid X — ${siteSlogan}`;
const defaultDescription = `${siteSlogan} Independent education site: why ordinary engines waste fuel and dirty the air, and how Malcolm Bendall’s Thunderstorm Generator idea aims to run cleaner using water and plasmoids — with measured results and plain-English lessons.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://plasmoidx.com"),
  title: {
    default: defaultTitle,
    template: "%s · Plasmoid X",
  },
  description: defaultDescription,
  keywords: [
    "Plasmoid Unification Model",
    "Thunderstorm Generator",
    "Bendall",
    "PUM",
    "MSAART",
    "vortex math",
    "plasmoid",
    "Derek Watson",
  ],
  authors: [{ name: "Derek Watson" }],
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "https://plasmoidx.com",
    siteName: "Plasmoid X",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://plasmoidx.com/og/home.png",
        width: 1200,
        height: 630,
        alt: "Plasmoid X — New energy, explained simply.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "https://plasmoidx.com/og/home.png",
        width: 1200,
        height: 630,
        alt: "Plasmoid X — New energy, explained simply.",
      },
    ],
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
};

/** Apply stored / system theme before paint; first visit defaults to light. */
const themeBootScript = `(function(){var r='light';try{var k='plasmoidx-theme';var t=localStorage.getItem(k)||'light';r=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');}catch(e){}document.documentElement.dataset.theme=r;document.documentElement.style.colorScheme=r;try{if(localStorage.getItem('plasmoidx-modern')==='on'){document.documentElement.dataset.modern='on';var s=document.createElement('style');s.id='modern-vt';s.textContent='@media (prefers-reduced-motion: no-preference){@view-transition{navigation:auto}}';document.head.appendChild(s);}}catch(e){}})();`;

const sameSite = {
  and: [
    { href_matches: "/*" },
    { not: { href_matches: "/*.*" } },
    { not: { selector_matches: "[rel~=nofollow], [target=_blank], [download]" } },
  ],
};
const speculationRules = JSON.stringify({
  prefetch: [{ where: sameSite, eagerness: "moderate" }],
  prerender: [{ where: sameSite, eagerness: "conservative" }],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[var(--background)]" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        {/* Speculation Rules: prerender same-site pages on hover/press intent (Chromium); ignored elsewhere. */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{ __html: speculationRules }}
        />
      </head>
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <ThemeProvider>
          <AmbientGlow />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-aurora focus:px-3 focus:py-2 focus:text-ink-950"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="relative min-w-0 max-w-full flex-1">
            {children}
          </main>
          <Footer />
          <DeferredSiteChrome />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
