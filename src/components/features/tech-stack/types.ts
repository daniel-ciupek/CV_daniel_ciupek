import type { ComponentType, CSSProperties } from "react";

export interface TechTag {
  name: string;
  category: string;
  categoryColor: string;
  Icon?: ComponentType<{ size?: number; style?: CSSProperties }>;
}
