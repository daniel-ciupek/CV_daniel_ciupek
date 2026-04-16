import type { SiteData } from "@/types";

const data: SiteData = {
  // ─── Dane osobowe ──────────────────────────────────────────────
  personal: {
    name: "Daniel Ciupek",
    title: "Full Stack Developer",
    avatar: "/MyImage/avatarDc.jpeg",
    bio: "", // TODO: dodaj krótki opis "o mnie"
    email: "dciupek0@gmail.com",
    phone: "+48 798277925",
    github: "https://github.com/daniel-ciupek",
    linkedin: "http://linkedin.com/in/daniel-ciupek-4ab127387",
    facebook: "https://www.facebook.com/daniel.ciupek.7?locale=pl_PL",
    instagram: "https://www.instagram.com/danter005?igsh=Zzh3bGNrNmtxNHht&utm_source=qr",
  },

  // ─── Umiejętności ──────────────────────────────────────────────
  skills: [
    {
      category: "Backend",
      items: ["PHP", "Laravel", "Node.js"],
    },
    {
      category: "Frontend",
      items: ["JavaScript", "TypeScript", "React", "Vue 3", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Bazy danych",
      items: ["MySQL", "PostgreSQL"],
    },
    {
      category: "DevOps & Narzędzia",
      items: ["Docker", "Git", "Postman", "REST API"],
    },
    {
      category: "AI & Productivity",
      items: ["Claude Code", "Cursor", "ChatGPT"],
    },
  ],

  // ─── Projekty ──────────────────────────────────────────────────
  projects: [
    // TODO: dodaj swoje projekty wg schematu:
    // {
    //   title: "Nazwa projektu",
    //   description: "Krótki opis co robi i jakie problemy rozwiązuje.",
    //   stack: ["Laravel", "Vue 3", "MySQL"],
    //   url: "https://...",       // opcjonalne
    //   github: "https://...",    // opcjonalne
    //   image: "/images/...",     // opcjonalne
    // },
  ],

  // ─── Certyfikaty ───────────────────────────────────────────────
  certificates: [
    {
      key: "cert_js",
      file: "/MyImage/CertyfikatJavaScript.jpg",
      title: "Vanilla JavaScript od podstaw – stwórz 15 projektów!",
      platform: "Udemy",
      date: "29.11.2025",
      hours: 39,
    },
    {
      key: "cert_php",
      file: "/MyImage/CertyfikatPHP.jpg",
      title: "Kurs programowanie PHP i MySQL od podstaw w Pigułce",
      platform: "Udemy",
      date: "10.01.2026",
      hours: 32,
    },
    {
      key: "cert_mysql",
      file: "/MyImage/CertyfikatMySql.jpg",
      title: "Kurs SQL od podstaw | MySQL",
      platform: "Udemy",
      date: "09.01.2026",
      hours: 5,
    },
    {
      key: "cert_postgres",
      file: "/MyImage/CertyfikatPostgreSQL.jpg",
      title: "Kurs PostgreSQL",
      platform: "Udemy",
      date: "22.01.2026",
      hours: 6,
    },
    {
      key: "cert_laravel",
      file: "/MyImage/CertyfikatLaravel12&Vue3.jpg",
      title: "Laravel 12 & Vue 3 fullstack Mastery: Build 2 portfolio apps",
      platform: "Udemy",
      date: "17.03.2026",
      hours: 37.5,
    },
    {
      key: "cert_docker",
      file: "/MyImage/CertyfikatDocker.jpg",
      title: "Docker od podstaw – dla programistów i nie tylko",
      platform: "Udemy",
      date: "24.03.2026",
      hours: 4.5,
    },
    {
      key: "cert_postman",
      file: "/MyImage/CertyfikatPostmanTestAPI.jpg",
      title: "Postman od podstaw – testowanie REST API",
      platform: "Udemy",
      date: "05.02.2026",
      hours: 6,
    },
    {
      key: "cert_english",
      file: "/MyImage/CertyfikatAngielskiIT.jpg",
      title: "Angielski w IT. Kompletny Kurs Konwersacyjny",
      platform: "Udemy",
      date: "16.03.2026",
      hours: 12,
    },
    {
      key: "cert_ai",
      file: "/MyImage/CertyfikatAIProgramisty.jpg",
      title: "AI dla programistów: ChatGPT od A do Z",
      platform: "Udemy",
      date: "21.12.2025",
      hours: 4.5,
    },
    {
      key: "cert_claude",
      file: "/MyImage/CertyfikatClaudeCode.jpg",
      title: "Claude Code w pigułce – dla programistów i nie tylko",
      platform: "Udemy",
      date: "06.04.2026",
      hours: 1.5,
    },
    {
      key: "cert_ai_coding",
      file: "/MyImage/CertyfikatAiCodingWithClaudeAndCursor.jpg",
      title: "The Complete AI Coding Course (2025) – Cursor, Claude Code",
      platform: "Udemy",
      date: "05.04.2026",
      hours: 12,
    },
  ],
};

export default data;
