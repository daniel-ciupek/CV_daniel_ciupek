/**
 * /cv-print — Wersja ATS/PDF dla rekruterów (polska).
 *
 * ZASADY EDYCJI:
 * - Wszystkie treści pochodzą z src/config/data.ts — edytuj TYLKO tam
 * - Układ i sekcje: src/app/cv-print/CvDocument.tsx (wspólny dla PL i EN)
 * - Strona dostosowana do druku: Ctrl+P → "Zapisz jako PDF"
 * - Wersja angielska: /cv-print/en
 */
import CvDocument from "./CvDocument";
import PrintButton from "./PrintButton";
import MobilePrintFix from "./MobilePrintFix";
import LangSwitch from "./LangSwitch";

export default function CvPrint() {
  return (
    <>
      <LangSwitch active="pl" />
      <PrintButton />
      <MobilePrintFix />
      <CvDocument lang="pl" />
    </>
  );
}
