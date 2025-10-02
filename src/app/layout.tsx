import type { Metadata } from "next";
import { Orbitron, Space_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Spirit Tech Radio - Live Streaming Audio Player",
  description: "High-quality live radio streaming with real-time audio visualizer, 5-band equalizer, and modern UI. Built with Web Audio API, HTML5 Audio, and Canvas visualization.",
  keywords: ["radio player", "audio streaming", "web audio API", "audio visualizer", "equalizer", "music player", "live radio", "HTML5 audio"],
  authors: [{ name: "Spirit Tech Radio" }],
  creator: "Spirit Tech Radio",
  openGraph: {
    title: "Spirit Tech Radio - Live Streaming Audio Player",
    description: "High-quality live radio streaming with real-time visualizer and 5-band equalizer.",
    siteName: "Spirit Tech Radio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#7F39FB" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${orbitron.variable} ${spaceMono.variable} antialiased font-space-mono min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
