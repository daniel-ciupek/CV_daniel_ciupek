"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import data from "@/config/data";
import type { TechSkill } from "@/types";
import TechModal from "@/components/ui/TechModal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Język ruchu B „Holo Chrome": ease [0.16,1,0.3,1]
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Kolor akcentu kategorii — TYLKO dekoracja (obrys, kreska, poświata, ramka ikony).
// holo-cyan (#22d3ee) dozwolony jedynie jako dekoracja DevOps, nigdy jako tekst.
const CAT_COLOR: Record<string, string> = {
  Backend: "#a855f7",
  Frontend: "#e879f9",
  "Bazy danych": "#818cf8",
  "DevOps & Narzędzia": "#22d3ee",
  "AI & Narzędzia": "#c084fc",
};

/** Grupuje techStack wg kategorii, zachowując kolejność pierwszego wystąpienia. */
function groupByCategory(items: TechSkill[]) {
  const order: string[] = [];
  const map = new Map<string, TechSkill[]>();
  for (const t of items) {
    if (!map.has(t.category)) {
      map.set(t.category, []);
      order.push(t.category);
    }
    map.get(t.category)!.push(t);
  }
  return order.map((category) => ({ category, items: map.get(category)! }));
}

/* ─── Karta kategorii (premium) ────────────────────────────────── */
function CategoryCard({
  category,
  items,
  color,
  delay,
  reduce,
  onSelect,
}: {
  category: string;
  items: TechSkill[];
  color: string;
  delay: number;
  reduce: boolean;
  onSelect: (t: TechSkill) => void;
}) {
  const [hot, setHot] = useState(false);

  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24, filter: reduce ? "blur(0px)" : "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease: EASE }}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      className="relative flex w-full flex-col rounded-2xl p-5 md:p-6"
      style={{
        background: `linear-gradient(180deg, ${color}14, rgba(255,255,255,0.02))`,
        border: `1px solid ${hot ? `${color}55` : "var(--border)"}`,
        boxShadow: hot ? `0 24px 60px -28px ${color}99` : "none",
        transition: "box-shadow 0.4s, border-color 0.3s",
      }}
    >
      {/* Nagłówek — nazwa tekstem bezpiecznym (accent-bright), kolor grupy w dekoracji */}
      <div className="mb-5 flex flex-col items-center gap-2">
        <p
          className="text-center text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--accent-bright)" }}
        >
          {category}
        </p>
        <span aria-hidden className="h-px w-8 rounded-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
        <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
          {items.length} tech
        </span>
      </div>

      {/* Siatka ikon — równy grid z podpisami */}
      <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(74px, 1fr))" }}>
        {items.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => onSelect(t)}
            aria-haspopup="dialog"
            aria-label={`${t.name} — otwórz opis`}
            className="tech-cell flex flex-col items-center gap-2 rounded-xl px-1.5 py-3 text-center"
          >
            <span
              className="grid place-items-center rounded-[11px]"
              style={{ width: 44, height: 44, background: "rgba(255,255,255,0.05)", border: `1px solid ${color}40` }}
            >
              <Image src={t.icon} alt="" width={28} height={28} draggable={false} className="h-7 w-7 object-contain" />
            </span>
            <span className="tech-cell-label font-mono text-[10px] leading-tight">
              {t.name}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Siatka Tech Stack (premium) ──────────────────────────────── */
export default function TechStackGrid() {
  const reduce = usePrefersReducedMotion();
  const [selected, setSelected] = useState<TechSkill | null>(null);
  const groups = useMemo(() => groupByCategory(data.techStack), []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {groups.map((g, i) => (
          <div key={g.category} className="flex w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
            <CategoryCard
              category={g.category}
              items={g.items}
              color={CAT_COLOR[g.category] ?? "var(--accent)"}
              delay={i * 0.08}
              reduce={reduce}
              onSelect={setSelected}
            />
          </div>
        ))}
      </div>

      <TechModal skill={selected} onClose={() => setSelected(null)} />
    </>
  );
}
