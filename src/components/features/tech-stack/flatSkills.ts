import data from "@/config/data";
import { iconMap } from "./iconMap";
import type { TechTag } from "./types";

export const CATEGORY_COLOR: Record<string, string> = {
  "Backend":            "rgba(0, 212, 255, 0.55)",
  "Frontend":           "rgba(56, 189, 248, 0.55)",
  "Bazy danych":        "rgba(125, 211, 252, 0.45)",
  "DevOps":             "rgba(14, 165, 233, 0.50)",
  "AI & Narzędzia":     "rgba(103, 232, 249, 0.50)",
};

export const flatSkills: TechTag[] = data.skills.flatMap((group) =>
  group.items.map((name) => ({
    name,
    category: group.category,
    categoryColor: CATEGORY_COLOR[group.category] ?? "rgba(0,212,255,0.5)",
    Icon: iconMap[name],
  }))
);
