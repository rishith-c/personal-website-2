import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rishithc.com"),
  title: "rishith chennupati — index",
  description:
    "Rishith Chennupati. Fifteen years old, San Francisco Bay Area. Building ios apps, ai systems, web platforms, and hardware. An index of everything.",
  keywords: [
    "rishith chennupati",
    "rishith",
    "portfolio",
    "ios developer",
    "swift",
    "ai engineer",
    "san francisco bay area",
  ],
  authors: [{ name: "Rishith Chennupati" }],
  openGraph: {
    title: "rishith chennupati — index",
    description:
      "Fifteen years old, San Francisco Bay Area. Building ios apps, ai systems, web platforms, and hardware. An index of everything.",
    url: "https://rishithc.com",
    siteName: "rishith chennupati",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rishith chennupati — index",
    description: "Fifteen. SF Bay Area. iOS, AI, web, hardware. An index.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-dvh">
        <a
          href="#index"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-[var(--color-ink)] focus:px-3 focus:py-2 focus:text-[var(--color-bg)]"
        >
          Skip to index
        </a>
        {children}
      </body>
    </html>
  );
}
