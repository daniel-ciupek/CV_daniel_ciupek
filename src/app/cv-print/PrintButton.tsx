"use client";

export default function PrintButton() {
  return (
    <div className="cv-print-btn-wrapper">
      <button onClick={() => window.print()} className="cv-print-btn">
        Drukuj / Zapisz PDF
      </button>
    </div>
  );
}
