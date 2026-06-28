import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "GT Evolution Racing — Engineering Speed. Designing Legends.",
  description:
    "A cinematic, scroll-driven journey through the evolution of motorsport — from 1970s grit to 2050 hyper-electric prototypes. Engineering Speed. Designing Legends.",
  openGraph: {
    title: "GT Evolution Racing",
    description: "Engineering Speed. Designing Legends.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Orbitron:wght@400;600;800&family=Space+Grotesk:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-ghost antialiased font-body selection:bg-racered selection:text-ghost">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
