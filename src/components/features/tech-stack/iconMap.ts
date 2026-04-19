import type { ComponentType, CSSProperties } from "react";
import {
  SiPhp, SiLaravel, SiNodedotjs, SiJavascript, SiTypescript,
  SiReact, SiVuedotjs, SiNextdotjs, SiTailwindcss,
  SiMysql, SiPostgresql, SiDocker, SiGit, SiPostman, SiGooglegemini, SiPython,
} from "react-icons/si";
import { BrainCircuit, Terminal } from "lucide-react";

export const iconMap: Record<string, ComponentType<{ size?: number; style?: CSSProperties }>> = {
  PHP: SiPhp,
  Laravel: SiLaravel,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Vue 3": SiVuedotjs,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Docker: SiDocker,
  Git: SiGit,
  Postman: SiPostman,
  "REST API": Terminal,
  "Claude Code": BrainCircuit,
  Cursor: BrainCircuit,
  Gemini: SiGooglegemini,
};
