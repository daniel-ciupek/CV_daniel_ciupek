export interface Personal {
  name: string;
  title: string;
  avatar: string;
  /** Domyślne (profesjonalne) zdjęcie do morphu awatara w Hero */
  avatarPro: string;
  /** Zdjęcie „hacker" pokazywane na hover (crossfade) w Hero */
  avatarHacker: string;
  bio: string;
  /** Krótkie hasło do pull-quote w sekcji "O mnie" — kontynuacja po akcentowanym `title` */
  tagline: string;
  /** Krótki opis (~150 zn.) do meta description / OG — bio jest za długie dla SEO */
  seoDescription: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  website?: string;
  /** Status dostępności — StatusDot w sekcji Kontakt (część przed „·" podświetlana) */
  availability: string;
  /** Teksty CTA sekcji Kontakt (bez hardkodu w komponencie) */
  contact: { headline: string; subline: string };
  /** Lokalizacja — CV/ATS (kraj + dyspozycyjność), np. „Polska · zdalnie / hybryda" */
  location: string;
  /** Języki — sekcja w /cv-print (nazwa + poziom) */
  languages: { name: string; level: string }[];
}

export interface Experience {
  role: string;
  /** Nazwa firmy/organizacji — opcjonalna */
  org?: string;
  /** Okres — opcjonalny (np. „03.2026–06.2026") */
  period?: string;
  description: string;
  /** Punktowane osiągnięcia/zakres — opcjonalne */
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  url?: string;
  github?: string;
  image?: string;
  /** Ścieżki do screenów w `public/` — auto-slideshow w karcie projektu */
  screenshots?: string[];
}

export interface Certificate {
  key: string;
  file: string;
  title: string;
  platform: string;
  hours: number;
  /** Rok ukończenia — format ATS „Nazwa — Platforma — rok" */
  date?: string;
}

export interface SiteData {
  personal: Personal;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
}
