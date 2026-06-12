export interface Personal {
  name: string;
  title: string;
  avatar: string;
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
}

export interface Certificate {
  key: string;
  file: string;
  title: string;
  platform: string;
  hours: number;
}

export interface SiteData {
  personal: Personal;
  skills: SkillCategory[];
  projects: Project[];
  certificates: Certificate[];
}
