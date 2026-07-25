/**
 * /cv-print/en — English ATS/PDF version for recruiters.
 * Shares the CvDocument layout with the Polish version; content comes from
 * the `_en` fields in src/config/data.ts (with PL fallback).
 */
import type { Metadata } from "next";
import data from "@/config/data";
import CvDocument from "../CvDocument";
import PrintButton from "../PrintButton";
import MobilePrintFix from "../MobilePrintFix";
import LangSwitch from "../LangSwitch";

export const metadata: Metadata = {
  // Czysta nazwa pliku „Daniel Ciupek CV EN.pdf"
  title: `${data.personal.name} CV EN`,
  description: `Curriculum Vitae — ${data.personal.name}, ${data.personal.title}`,
  robots: { index: false, follow: false },
};

export default function CvPrintEn() {
  return (
    <>
      <LangSwitch active="en" />
      <PrintButton />
      <MobilePrintFix />
      <CvDocument lang="en" />
    </>
  );
}
