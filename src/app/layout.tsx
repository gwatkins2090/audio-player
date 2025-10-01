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
  title: "Component Library | Reusable React Components",
  description: "A beautiful collection of reusable React components featuring hero banners, sacred geometry, spirit UI elements, and 3D quantum visualizations. Built with Next.js 15, TypeScript, and Framer Motion.",
  keywords: ["React components", "Next.js", "TypeScript", "Framer Motion", "component library", "UI components", "sacred geometry", "3D components", "Three.js"],
  authors: [{ name: "Component Library" }],
  creator: "Component Library",
  openGraph: {
    title: "Component Library | Reusable React Components",
    description: "A beautiful collection of reusable React components for modern web applications.",
    siteName: "Component Library",
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
