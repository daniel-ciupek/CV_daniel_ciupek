"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { TechSkill } from "@/types";

interface Props {
  skill: TechSkill | null;
  onClose: () => void;
}

/**
 * Modal opisu umiejętności. Dostępność:
 *  • role="dialog" + aria-modal, tytuł przez aria-labelledby,
 *  • Esc zamyka, klik w tło/✕ zamyka,
 *  • focus trap (Tab/Shift+Tab zapętlone w karcie),
 *  • focus wraca do ikony, która otworzyła modal,
 *  • gdy zamknięty — cała warstwa `inert` (poza Tab i AT), zostaje tylko
 *    animacja wygaszenia (treść trzymana do końca przejścia).
 */
export default function TechModal({ skill, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const open = skill !== null;

  // Treść trzymana przez czas animacji wygaszania (skill może już być null)
  const [shown, setShown] = useState<TechSkill | null>(null);
  useEffect(() => {
    if (skill) setShown(skill);
  }, [skill]);

  // inert dla całej warstwy, gdy zamknięta (bez konfliktu typów React/DOM)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (open) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [open]);

  // Zapamiętanie / przywrócenie focusu + focus na przycisk zamknięcia
  useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else if (restoreRef.current) {
      restoreRef.current.focus();
      restoreRef.current = null;
    }
  }, [open]);

  // Esc + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const card = cardRef.current;
      if (!card) return;
      const focusable = card.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div ref={rootRef} className="tech-modal" data-open={open}>
      <div className="tech-modal-backdrop" onClick={onClose} />
      <div
        ref={cardRef}
        className="tech-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-modal-title"
      >
        <button
          ref={closeRef}
          type="button"
          className="tech-modal-close"
          onClick={onClose}
          aria-label="Zamknij"
        >
          ✕
        </button>
        {shown && (
          <>
            <div className="tech-modal-head">
              <div className="tech-modal-icon">
                <Image src={shown.icon} alt="" width={42} height={42} />
              </div>
              <div>
                <div className="tech-modal-kicker">Umiejętność / technologia</div>
                <h3 id="tech-modal-title">{shown.name}</h3>
              </div>
            </div>
            <p className="tech-modal-body">{shown.description}</p>
            <ul className="tech-modal-points">
              {shown.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
