/**
 * /cv-print — CV dla rekruterów (PL), wersja designerska (dwukolumnowa).
 *
 * ZASADY EDYCJI:
 * - Wszystkie treści pochodzą z src/config/data.ts — edytuj TYLKO tam
 * - Układ i sekcje: src/app/cv-print/CvDocumentPro.tsx (wspólny PL/EN, namespace .cv2-*)
 * - Zapis do PDF: Ctrl+P → "Zapisz jako PDF" (kolory wymuszone print-color-adjust)
 * - Wersja angielska: /cv-print/en
 */
import CvDocumentPro from "./CvDocumentPro";
import PrintButton from "./PrintButton";
import LangSwitch from "./LangSwitch";

export default function CvPrint() {
  return (
    <>
      <LangSwitch active="pl" />
      <PrintButton />
      <CvDocumentPro lang="pl" />
    </>
  );
}
