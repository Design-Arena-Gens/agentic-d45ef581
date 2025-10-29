import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurora Finance OS",
  description:
    "A next-gen AI-driven finance dashboard blending intelligent insights, collaborative expense management, and futuristic fintech design.",
  metadataBase: new URL("https://agentic-d45ef581.vercel.app"),
  openGraph: {
    title: "Aurora Finance OS",
    description:
      "Explore AI-powered budgeting, smart receipts, voice automation, and Splitwise-style collaboration in a futuristic dashboard.",
    url: "https://agentic-d45ef581.vercel.app",
    siteName: "Aurora Finance OS",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 675,
        alt: "Aurora Finance Dashboard preview",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="relative min-h-screen overflow-x-hidden font-sans">
        <Providers>
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(64,224,208,0.14),transparent_45%),radial-gradient(circle_at_75%_25%,rgba(49,130,206,0.18),transparent_55%),linear-gradient(140deg,rgba(9,18,36,0.95)_0%,rgba(5,10,20,0.85)_30%,rgba(3,37,76,0.9)_60%,rgba(8,39,66,0.82)_100%)] mix-blend-normal" />
          <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(120deg,rgba(0,224,255,0.12),rgba(98,234,222,0.06),rgba(0,91,255,0.08))] blur-[120px]" />
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
