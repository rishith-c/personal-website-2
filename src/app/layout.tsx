import type { Metadata } from "next";
import { Platypi, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const platypi = Platypi({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-platypi",
  display: "swap",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rishithc.com"),
  title: "Rishith Chennupati · building things that don't exist yet",
  description:
    "Rishith Chennupati. Fifteen, San Jose. iOS apps, on-device AI, web platforms, and an autonomous drone named Prometheus. Everything I've shipped, in one place.",
  keywords: ["rishith chennupati", "portfolio", "ios developer", "swift", "ai", "drone", "san jose"],
  authors: [{ name: "Rishith Chennupati" }],
  openGraph: {
    title: "Rishith Chennupati · building things that don't exist yet",
    description: "Fifteen, San Jose. iOS, on-device AI, web, and an autonomous drone.",
    url: "https://rishithc.com",
    siteName: "Rishith Chennupati",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishith Chennupati",
    description: "Fifteen. San Jose. iOS, AI, web, hardware.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${platypi.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
