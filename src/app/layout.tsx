"use client";

import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Lenis from "lenis";
import "./globals.css";
import data from "@/config/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: data.personal.name,
  jobTitle: data.personal.title,
  url: "",
  sameAs: [
    data.personal.github,
    data.personal.linkedin,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo-ciupas.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-ciupas.png" />
        <title>{`${data.personal.name} — ${data.personal.title}`}</title>
        <meta name="description" content={data.personal.bio || `Portfolio ${data.personal.name} — ${data.personal.title}`} />
        <meta property="og:title" content={`${data.personal.name} — ${data.personal.title}`} />
        <meta property="og:description" content={data.personal.bio || `Portfolio ${data.personal.name} — ${data.personal.title}`} />
        <meta property="og:image" content={data.personal.avatar} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
