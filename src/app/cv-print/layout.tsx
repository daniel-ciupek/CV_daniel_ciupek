/**
 * Layout dla /cv-print — nested layout (bez <html>/<body>).
 * Brak Navbaru i Lenis — czysty biały dokument.
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import data from "@/config/data";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: `CV — ${data.personal.name}`,
  description: `Curriculum Vitae — ${data.personal.name}, ${data.personal.title}`,
  robots: { index: false, follow: false },
};

export default function CvPrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={inter.className}
      style={{ background: "#ffffff", color: "#111111", minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
