import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmbientGlow from "@/components/AmbientGlow";
import { ThemeProvider } from "@/components/ThemeProvider";
import OfflineReady from "@/components/OfflineReady";
import { siteSlogan } from "@/lib/content";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const defaultTitle = `Plasmoid X — ${siteSlogan}`;
const defaultDescription = `${siteSlogan} Independent education site: why ordinary engines waste fuel and dirty the air, and how the Bendall Thunderstorm Generator idea aims to run cleaner using water and plasmoids — with measured results and plain-English lessons.`;

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
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Plasmoid X — New energy, explained simply.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteSlogan,
    images: ["/og.png"],
  },
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
const themeBootScript = `(function(){var r='light';try{var k='plasmoidx-theme';var t=localStorage.getItem(k)||'light';r=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');}catch(e){}document.documentElement.dataset.theme=r;document.documentElement.style.colorScheme=r;})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-ink-950" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "Plasmoid X",
                  url: "https://plasmoidx.com",
                  description: defaultDescription,
                  inLanguage: "en-US",
                },
                {
                  "@type": "LearningResource",
                  name: "Plasmoid X beginner curriculum",
                  url: "https://plasmoidx.com/study/",
                  description:
                    "Lessons 1–6 on Time’s mould, direction = charge, plasmoid EVOs, three device beats, and honest Embry-Riddle numbers.",
                  learningResourceType: "Educational guide",
                  educationalLevel: "Beginner",
                  isAccessibleForFree: true,
                  creator: {
                    "@type": "Person",
                    name: "Derek Watson",
                  },
                },
              ],
            }),
          }}
        />
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
          <OfflineReady />
        </ThemeProvider>
      </body>
    </html>
  );
}
