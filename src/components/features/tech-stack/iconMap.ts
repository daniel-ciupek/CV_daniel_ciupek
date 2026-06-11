import type { ComponentType, CSSProperties } from "react";
import {
  SiPhp, SiLaravel, SiNodedotjs, SiJavascript, SiTypescript,
  SiReact, SiVuedotjs, SiNextdotjs, SiTailwindcss,
  SiMysql, SiPostgresql, SiDocker, SiGit, SiPostman, SiGooglegemini, SiPython,
  SiGitlab, SiLinux, SiClaude,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Terminal, Bot, Workflow, Waypoints, MousePointer2 } from "lucide-react";

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
  AWS: FaAws,
  Postman: SiPostman,
  "REST API": Terminal,
  "Claude Code": SiClaude,
  Cursor: MousePointer2,
  OpenClaw: Bot,
  "Hermes Agent": Workflow,
  MCP: Waypoints,
  Gemini: SiGooglegemini,
  "GitLab CI/CD": SiGitlab,
  Linux: SiLinux,
};
