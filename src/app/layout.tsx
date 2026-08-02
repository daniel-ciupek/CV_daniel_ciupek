import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import LenisProvider from "@/components/layout/LenisProvider";
import ScrollAnimations from "@/components/layout/ScrollAnimations";
import PageLoader from "@/components/layout/PageLoader";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
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

// Font display V3 „Holo Chrome" — geometryczny, „trzyma" holograficzny gradient
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: `${data.personal.name} — ${data.personal.title}`,
  description:
    data.personal.seoDescription ||
    `Portfolio ${data.personal.name} — ${data.personal.title}`,
  openGraph: {
    title: `${data.personal.name} — ${data.personal.title}`,
    description:
      data.personal.seoDescription ||
      `Portfolio ${data.personal.name} — ${data.personal.title}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${data.personal.name} — ${data.personal.title}`,
  },
  icons: {
    icon: "/logo-ciupas.png",
    apple: "/logo-ciupas.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: data.personal.name,
  jobTitle: data.personal.title,
  email: data.personal.email,
  sameAs: [data.personal.github, data.personal.linkedin].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="site-backdrop" aria-hidden />
        <CursorSpotlight />
        <LenisProvider>
          <ScrollAnimations />
          <PageLoader />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
