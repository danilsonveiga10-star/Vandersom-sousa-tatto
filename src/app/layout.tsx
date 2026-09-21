import type { Metadata } from "next";
import { Anton, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rato Tattoo — Hiper-realismo & Blackwork em Lisboa",
  description:
    "Vanderson. Tatuador especializado em hiper-realismo em Lisboa. Preto e cinza, retrato e blackwork — projeto construído camada sobre camada até parecer fotografia.",
  openGraph: {
    title: "Rato Tattoo — Hiper-realismo & Blackwork em Lisboa",
    description: "Hiper-realismo e blackwork em preto e cinza. Lisboa, Portugal.",
    images: ["/images/hero-poster.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-PT"
      className={`${anton.variable} ${instrument.variable} ${space.variable} h-full`}
    >
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
