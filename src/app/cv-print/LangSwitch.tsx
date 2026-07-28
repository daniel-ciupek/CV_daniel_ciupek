/**
 * Przełącznik języka CV (PL / EN) — widoczny w przeglądarce, ukryty w druku.
 * Pływa w lewym górnym rogu, obok paska „Drukuj / Zapisz PDF".
 */
import Link from "next/link";

export default function LangSwitch({
  active,
  base = "/cv-print",
}: {
  active: "pl" | "en";
  /** Ścieżka bazowa dokumentu — np. "/cv-print" (ATS) lub "/cv-print/pro" (designerski). */
  base?: string;
}) {
  return (
    <div className="cv-lang-switch">
      <Link href={base} className={active === "pl" ? "is-active" : ""} aria-current={active === "pl" ? "page" : undefined}>
        PL
      </Link>
      <Link href={`${base}/en`} className={active === "en" ? "is-active" : ""} aria-current={active === "en" ? "page" : undefined}>
        EN
      </Link>
    </div>
  );
}
