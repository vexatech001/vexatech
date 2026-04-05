import type { Metadata } from "next";
import { Quantico, Outfit, Bruno_Ace_SC } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const quantico = Quantico({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-quantico" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const brunoAceSC = Bruno_Ace_SC({ subsets: ["latin"], weight: "400", variable: "--font-bruno" });

export const metadata: Metadata = {
  title: "VEXA TECH | Innovate • Create • Grow",
  description: "VEXA TECH is a growth-focused digital partner that combines strategy, design, and technology to help businesses launch stronger, communicate better, and scale confidently.",
  icons: {
    icon: "/vexatechlogo.svg",
  },
};

import ConditionalLayout from "./components/ConditionalLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${quantico.variable} ${outfit.variable} ${brunoAceSC.variable} bg-bg-light text-text-dark antialiased`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
