import type { ComponentType, CSSProperties } from "react";
import {
  SiPhp, SiLaravel, SiNodedotjs, SiJavascript, SiTypescript,
  SiReact, SiVuedotjs, SiNextdotjs, SiTailwindcss,
  SiMysql, SiPostgresql, SiDocker, SiGit, SiPostman, SiGooglegemini, SiPython,
  SiGitlab, SiLinux, SiClaude,
  SiLivewire, SiInertia, SiPinia, SiAlpinedotjs, SiRedis, SiGithubactions,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import {
  Terminal, Workflow, Waypoints, MousePointer2,
  ShieldCheck, FlaskConical, Sparkles,
} from "lucide-react";

export const iconMap: Record<string, ComponentType<{ size?: number; style?: CSSProperties }>> = {
  PHP: SiPhp,
  Laravel: SiLaravel,
  Livewire: SiLivewire,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Vue 3": SiVuedotjs,
  "Inertia.js": SiInertia,
  Pinia: SiPinia,
  "Alpine.js": SiAlpinedotjs,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Docker: SiDocker,
  Git: SiGit,
  "GitHub Actions": SiGithubactions,
  AWS: FaAws,
  Postman: SiPostman,
  "REST API": Terminal,
  PHPStan: ShieldCheck,
  Pest: FlaskConical,
  "Prompt Engineering": Sparkles,
  "Claude Code": SiClaude,
  Cursor: MousePointer2,
  n8n: Workflow,
  MCP: Waypoints,
  Gemini: SiGooglegemini,
  "GitLab CI/CD": SiGitlab,
  Linux: SiLinux,
};
