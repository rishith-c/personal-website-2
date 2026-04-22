import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

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
    <html lang="en" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <TooltipProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
