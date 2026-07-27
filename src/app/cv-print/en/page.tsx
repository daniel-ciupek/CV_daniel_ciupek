/**
 * /cv-print/en — recruiter CV (EN), designer (two-column) version.
 * Shares CvDocumentPro with the Polish version; content from `_en` fields in data.ts (PL fallback).
 */
import type { Metadata } from "next";
import data from "@/config/data";
import CvDocumentPro from "../CvDocumentPro";
import PrintButton from "../PrintButton";
import LangSwitch from "../LangSwitch";

export const metadata: Metadata = {
  // Czysta nazwa pliku „Daniel Ciupek CV EN.pdf"
  title: `${data.personal.name} CV EN`,
  robots: { index: false, follow: false },
};

export default function CvPrintEn() {
  return (
    <>
      <LangSwitch active="en" />
      <PrintButton />
      <CvDocumentPro lang="en" />
    </>
  );
}
