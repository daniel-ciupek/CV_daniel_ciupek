import type { SiteData } from "@/types";

const data: SiteData = {
  // ─── Dane osobowe ──────────────────────────────────────────────
  personal: {
    name: "Daniel Ciupek",
    title: "Full Stack Developer",
    avatar: "/MyImage/avatarDc.jpeg",
    bio: "Aspirujący Full Stack Developer (Laravel, Vue 3, PHP, JS). Lata pracy w wymagającym środowisku fizycznym wykształciły we mnie dyscyplinę i etykę pracy, które dziś z pełnym zaangażowaniem przekładam na programowanie. Moje podejście opieram na solidnych fundamentach – świadomie zacząłem od czystego HTML, CSS i JavaScript, unikając dróg na skróty, co pozwala mi dziś sprawnie poruszać się w ekosystemie Laravela. Wyznaję zasadę lifelong learning – zdobyte przeze mnie certyfikaty nie są jedynie potwierdzeniem wiedzy, lecz dowodem na autentyczną pasję, która pcha mnie do ciągłego poszerzania horyzontów w każdej wolnej chwili. Szukam swojej pierwszej szansy na start komercyjny. W zamian oferuję lojalność, determinację i pełne wsparcie zespołu, priorytetyzując rozwój zawodowy i możliwość udowodnienia swojej wartości ponad kwestie finansowe.",
    email: "dciupek0@gmail.com",
    phone: "+48 798277925",
    github: "https://github.com/daniel-ciupek",
    linkedin: "https://linkedin.com/in/daniel-ciupek-4ab127387",
    facebook: "https://www.facebook.com/daniel.ciupek.7?locale=pl_PL",
    instagram: "https://www.instagram.com/danter005?igsh=Zzh3bGNrNmtxNHht&utm_source=qr",
    website: "https://cv-daniel-ciupek.vercel.app",
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
      items: ["Docker", "Git", "AWS", "Postman", "REST API", "GitLab CI/CD", "Linux"],
    },
    {
      category: "AI & Narzędzia",
      items: ["Claude Code", "Cursor", "Gemini"],
    },
  ],

  // ─── Projekty ──────────────────────────────────────────────────
  projects: [
    
     {
       title: "PrepMind",
       description: "PrepMind to aplikacja dla programistów: generuje pytania techniczne, planuje powtórki (SM-2) i symuluje rozmowy rekrutacyjne z AI. Działa w modelu BYOK (własny klucz Gemini), bez abonamentu.",
       stack: ["Laravel 12", "PHP 8.3", "PostgreSQL 16", "Redis 7", "Inertia.js 2", "Vue 3", "TypeScript", "Pinia 3", "Tailwind CSS 3", "Laravel Breeze", "vue-i18n 11", "Gemini 2.5 Flash", "Pest 3", "Docker"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/AI-Powered-Tech-Interview-Prep-App",    
     },

     {
       title: "AI Subscription & Expense Auditor",
       description: "Self-hostowana aplikacja do osobistych finansów: wczytuje wyciągi bankowe (CSV/XLS) z polskich banków, automatycznie kategoryzuje transakcje przy pomocy LLM i wykrywa powtarzające się subskrypcje — w tym prawdopodobne duplikaty, za które możesz płacić dwa razy.",
       stack: ["Laravel 13", "PHP 8.5", "PostgreSQL 18", "Redis 8", "Inertia.js", "React 18", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion", "Lucide", "Docker"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/AI_subscription_and_expense_auditor",    
     },

      {
       title: "QR-Master",
       description: "SaaS (SPA) do zarządzania kodami QR z analityką realtime i czatem AI. Projekt integruje płatności Stripe, 2FA/WebAuthn i szybkie wyszukiwanie, opierając się na maksymalnej wydajności (FrankenPHP, Octane) oraz rygorystycznym CI/CD (PHPStan lvl 8, Snyk).",
       stack: ["Laravel 13", "Vue 3", "Inertia.js", "TypeScript", "FrankenPHP", "Stripe", "Filament", "GitHub Actions"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/QR-Master",    
     },

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
      hours: 39,
    },
    {
      key: "cert_php",
      file: "/MyImage/CertyfikatPHP.jpg",
      title: "Kurs programowanie PHP i MySQL od podstaw w Pigułce",
      platform: "Udemy",
      hours: 32,
    },
    {
      key: "cert_mysql",
      file: "/MyImage/CertyfikatMySql.jpg",
      title: "Kurs SQL od podstaw | MySQL",
      platform: "Udemy",
      hours: 5,
    },
    {
      key: "cert_postgres",
      file: "/MyImage/CertyfikatPostgreSQL.jpg",
      title: "Kurs PostgreSQL",
      platform: "Udemy",
      hours: 6,
    },
    {
      key: "cert_laravel",
      file: "/MyImage/CertyfikatLaravel12&Vue3.jpg",
      title: "Laravel 12 & Vue 3 fullstack Mastery: Build 2 portfolio apps",
      platform: "Udemy",
      hours: 37.5,
    },
    {
      key: "cert_docker",
      file: "/MyImage/CertyfikatDocker.jpg",
      title: "Docker od podstaw – dla programistów i nie tylko",
      platform: "Udemy",
      hours: 4.5,
    },
    {
      key: "cert_postman",
      file: "/MyImage/CertyfikatPostmanTestAPI.jpg",
      title: "Postman od podstaw – testowanie REST API",
      platform: "Udemy",
      hours: 6,
    },
    {
      key: "cert_english",
      file: "/MyImage/CertyfikatAngielskiIT.jpg",
      title: "Angielski w IT. Kompletny Kurs Konwersacyjny",
      platform: "Udemy",
      hours: 12,
    },
    {
      key: "cert_ai",
      file: "/MyImage/CertyfikatAIProgramisty.jpg",
      title: "AI dla programistów: ChatGPT od A do Z",
      platform: "Udemy",
      hours: 4.5,
    },
    {
      key: "cert_claude",
      file: "/MyImage/CertyfikatClaudeCode.jpg",
      title: "Claude Code w pigułce – dla programistów i nie tylko",
      platform: "Udemy",
      hours: 1.5,
    },
    {
      key: "cert_ai_coding",
      file: "/MyImage/CertyfikatAiCodingWithClaudeAndCursor.jpg",
      title: "The Complete AI Coding Course (2025) – Cursor, Claude Code",
      platform: "Udemy",
      hours: 12,
    },
    {
      key: "cert_python",
      file: "/MyImage/CertyfikatPython.jpg",
      title: "[2026] Kurs Python 3 od Podstaw do Mastera - 72h!",
      platform: "Udemy",
      hours: 73,
    },
    {
      key: "cert_aws",
      file: "/MyImage/CertyfikatAWS.jpg",
      title: "AWS Certified Cloud Practitioner - kurs z podręcznikiem",
      platform: "Udemy",
      hours: 5.5,
    },
    {
      key: "cert_gitlab",
      file: "/MyImage/GitLabCICD.jpg",
      title: "Kurs GitLab CI/CD od podstaw",
      platform: "Udemy",
      hours: 5,
    },
  ],
};

export default data;
