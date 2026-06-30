import type { Metadata } from "next";
import { Playfair_Display, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// High-contrast display serif with ball terminals, matching the
// "Master the foundations / Build anything" reference.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rishithc.com"),
  title: "Rishith Chennupati · building things that don't exist yet",
  description:
    "Rishith Chennupati. Fourteen, San Jose. iOS apps, on-device AI, web platforms, and an autonomous drone named Prometheus. Everything I've shipped, in one place.",
  keywords: ["rishith chennupati", "portfolio", "ios developer", "swift", "ai", "drone", "san jose"],
  authors: [{ name: "Rishith Chennupati" }],
  openGraph: {
    title: "Rishith Chennupati · building things that don't exist yet",
    description: "Fourteen, San Jose. iOS, on-device AI, web, and an autonomous drone.",
    url: "https://rishithc.com",
    siteName: "Rishith Chennupati",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishith Chennupati",
    description: "Fourteen. San Jose. iOS, AI, web, hardware.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
