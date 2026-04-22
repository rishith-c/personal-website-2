import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "rishith chennupati",
  description:
    "rishith chennupati — 15-year-old developer & ai builder. ios, ai, full-stack, hardware. 30+ shipped projects.",
  keywords: ["rishith", "chennupati", "portfolio", "ios developer", "ai", "swiftui", "next.js"],
  authors: [{ name: "Rishith Chennupati" }],
  openGraph: {
    title: "rishith chennupati",
    description: "developer & ai builder — portfolio",
    url: "https://rishithc.com",
    siteName: "rishith chennupati",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rishith chennupati",
    description: "developer & ai builder — portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased min-h-screen aurora-bg`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-background focus:text-foreground focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <Navigation />
        <div className="page-shell">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
