/**
 * Przełącznik języka CV (PL / EN) — widoczny w przeglądarce, ukryty w druku.
 * Pływa w lewym górnym rogu, obok paska „Drukuj / Zapisz PDF".
 */
import Link from "next/link";

export default function LangSwitch({ active }: { active: "pl" | "en" }) {
  return (
    <div className="cv-lang-switch">
      <Link href="/cv-print" className={active === "pl" ? "is-active" : ""} aria-current={active === "pl" ? "page" : undefined}>
        PL
      </Link>
      <Link href="/cv-print/en" className={active === "en" ? "is-active" : ""} aria-current={active === "en" ? "page" : undefined}>
        EN
      </Link>
    </div>
  );
}
