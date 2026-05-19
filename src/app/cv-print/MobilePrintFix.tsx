"use client";
import { useEffect } from "react";

// Mobile browsers push forced-page-break sections beyond the PDF render limit,
// causing them to disappear. This removes break classes before printing on mobile
// and restores them after so desktop layout is unaffected.
export default function MobilePrintFix() {
  useEffect(() => {
    const isMobile = () =>
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    const beforePrint = () => {
      if (!isMobile()) return;
      document.querySelectorAll(".cv-section-break-before").forEach((el) => {
        (el as HTMLElement).dataset.breakRestored = "true";
        el.classList.remove("cv-section-break-before");
      });
    };

    const afterPrint = () => {
      document.querySelectorAll("[data-break-restored]").forEach((el) => {
        el.classList.add("cv-section-break-before");
        delete (el as HTMLElement).dataset.breakRestored;
      });
    };

    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  return null;
}
