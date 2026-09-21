import localFont from "next/font/local";

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

export default function MonoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={geistMono.variable}>{children}</div>;
}
