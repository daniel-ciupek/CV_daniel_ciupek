import type { SiteData } from "@/types";

const data: SiteData = {
  // ─── Dane osobowe ──────────────────────────────────────────────
  personal: {
    name: "Daniel Ciupek",
    title: "Full Stack Developer",
    avatar: "/MyImage/avatarDc.jpeg",
    bio: "Aspirujący do roli Full Stack Developera (Laravel, Vue 3, PHP, JS, React, Node.js). Lata pracy w wymagającym środowisku fizycznym wyrobiły we mnie dyscyplinę, którą teraz w pełni przekładam na programowanie. Rozumiejąc, że w erze AI łatwo iść na skróty, swoją edukację zacząłem od twardych fundamentów: czystego HTML, CSS i JS-a, na których opieram swoje obecne projekty. Stawiam sprawę jasno: szukam szansy na start. Oferuję moje pełne wsparcie, lojalność i ciężką pracę w zamian za możliwość rozwoju w warunkach komercyjnych. Kwestie finansowe mają dla mnie obecnie drugorzędne znaczenie – moim absolutnym celem jest zdobycie doświadczenia i udowodnienie swojej wartości w zespole.",
    email: "dciupek0@gmail.com",
    phone: "+48 798277925",
    github: "https://github.com/daniel-ciupek",
    linkedin: "https://linkedin.com/in/daniel-ciupek-4ab127387",
    facebook: "https://www.facebook.com/daniel.ciupek.7?locale=pl_PL",
    instagram: "https://www.instagram.com/danter005?igsh=Zzh3bGNrNmtxNHht&utm_source=qr",
  },

  // ─── Umiejętności ──────────────────────────────────────────────
  skills: [
    {
      category: "Backend",
      items: ["PHP", "Laravel", "Node.js", "Python"],
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
      category: "AI & Narzędzia",
      items: ["Claude Code", "Cursor", "Gemini"],
    },
  ],

  // ─── Projekty ──────────────────────────────────────────────────
  projects: [
    
     {
       title: "Workflow Management",
       description: "System zarządzania firmą z modułami obsługi pracowników, projektów i zadań. Aplikacja startowała jako wersja bazowa, którą rozbudowałem na potrzeby firmy, w której pracuję — aktualnie wdrożona i aktywnie użytkowana. Wyeliminowała problem nieefektywnego dysponowania zadaniami, skracając czas koordynacji pracy zespołu. Zbudowana w architekturze full-stack z reaktywnym UI opartym na Livewire 3 (Volt) i Alpine.js, skonteneryzowana przez Docker.",
       stack: ["Laravel 13", "Livewire 3 (Volt)", "Alpine.js", "Tailwind CSS", "PostgreSQL", "Docker"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/workflow_management",    
     },

      {
       title: "Product Manager",
       description: "Fullstack aplikacja SPA do zarządzania produktami, łącząca backend Laravel z frontendem Vue 3 za pomocą Inertia.js — bez konieczności budowania osobnego REST API. Projekt prezentuje podejście monolityczne z zachowaniem doświadczenia użytkownika typowego dla SPA, skonteneryzowany przez Docker.",
       stack: ["PHP 8.3", "Laravel 12", "Inertia.js 2", "Vue 3", "Tailwind CSS", "MySQL", "Docker"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/spa_inertia",    
     },

       {
       title: "To Do List",
       description: "Aplikacja SPA do zarządzania zadaniami z systemem autentykacji opartym na Laravel Sanctum (cookie-based session). Frontend zbudowany w Vue 3 z Composition API i Pinia jako store — komunikuje się z dedykowanym Laravel REST API.",
       stack: ["Vue 3", "Pinia", "Vue Router 4", "Bootstrap 5", "Axios", "date-fns"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/todo-app-vue",    
     },

      {
       title: "Backend API dla To Do List",
       description: "Dedykowane REST API dla aplikacji To Do List, zbudowane w Laravel 11. Obsługuje zarządzanie zadaniami z priorytetami, datami wykonania i parsowaniem naturalnego języka. Autentykacja przez Laravel Sanctum (cookie-based session), zasoby Eloquent ORM.",
       stack: ["Laravel 11", "Laravel Sanctum", "Eloquent ORM", "REST API", "Carbon"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/laravel_api",    
     },
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
    {
      key: "cert_python",
      file: "/MyImage/CertyfikatPython.jpg",
      title: "[2026] Kurs Python 3 od Podstaw do Mastera - 72h!",
      platform: "Udemy",
      date: "19.04.2026",
      hours: 73,
    },
  ],
};

export default data;
