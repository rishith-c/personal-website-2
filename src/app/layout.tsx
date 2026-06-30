import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/experience/LenisProvider";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rishithc.com"),
  title: "rishith chennupati · index",
  description:
    "Rishith Chennupati. Fifteen, San Jose. A scroll portfolio: iOS apps, on-device AI, web platforms, and an autonomous drone named Prometheus.",
  keywords: [
    "rishith chennupati",
    "rishith",
    "portfolio",
    "ios developer",
    "swift",
    "ai engineer",
    "drone",
    "san jose",
  ],
  authors: [{ name: "Rishith Chennupati" }],
  openGraph: {
    title: "rishith chennupati · index",
    description:
      "Fifteen, San Jose. iOS apps, on-device AI, web, and an autonomous drone. Scroll through it.",
    url: "https://rishithc.com",
    siteName: "rishith chennupati",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rishith chennupati · index",
    description: "Fifteen. San Jose. iOS, AI, web, hardware. Scroll through it.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <link rel="preload" as="image" href="/assets/frames/f0001.jpg" fetchPriority="high" />
        <link rel="preload" as="image" href="/assets/frames/f0002.jpg" />
        <link rel="preload" as="image" href="/assets/frames/f0003.jpg" />
      </head>
      <body className="antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
