import type { SiteData } from "@/types";

const data: SiteData = {
  // ─── Dane osobowe ──────────────────────────────────────────────
  personal: {
    name: "Daniel Ciupek",
    title: "Full Stack Developer",
    avatar: "/MyImage/avatarDc.jpeg",
    avatarPro: "/MyImage/avatar-pro.jpg",
    avatarHacker: "/MyImage/avatar-hacker.jpg",
    tagline:
      "łączący Laravela, Inertię, Vue 3 i Reacta z DevOps — Docker, GitLab CI/CD i automatyzację.",
    heroTagline:
      "Laravel, Vue 3 i Inertia.js spięte Dockerem oraz CI/CD — od backendu po reaktywny frontend.",
    seoDescription:
      "Full Stack Developer — Laravel, Vue 3, PostgreSQL, Docker. Buduję produkcyjne aplikacje webowe. 14 certyfikatów, 250+ h szkoleń.",
    bio: "Full Stack Developer w ekosystemie Laravela — Laravel, Vue 3, Inertia.js, PostgreSQL i Docker. Buduję kompletne aplikacje webowe, od backendu po reaktywny frontend i konteneryzację. Biegle wykorzystuję AI w wytwarzaniu oprogramowania — jako prompt engineer projektuję i optymalizuję prompty oraz orkiestruję wyspecjalizowane agenty AI, powierzając im konkretne zadania, co przyspiesza pracę i podnosi jakość kodu. Interesuję się również automatyzacją i CI/CD — buduję pipeline'y w GitLab CI/CD i GitHub Actions, dbając o powtarzalne wdrożenia i jakość kodu. W portfolio m.in. wdrożony produkcyjnie system do zarządzania pracą zespołu oraz aplikacja SaaS z płatnościami online (Stripe), dwuskładnikowym logowaniem (2FA) i analityką w czasie rzeczywistym. Szukam zespołu, w którym rozwinę się przy komercyjnych projektach.",
    cvSummary:
      "Full Stack Developer w ekosystemie Laravela (Laravel, Vue 3, Inertia.js, PostgreSQL, Docker) z naciskiem na jakość kodu i CI/CD. Buduję kompletne aplikacje webowe - od backendu po reaktywny frontend i konteneryzację. Biegle wykorzystuję AI w wytwarzaniu oprogramowania - jako prompt engineer projektuję i optymalizuję prompty oraz orkiestruję wyspecjalizowane agenty AI, powierzając im konkretne zadania, co przyspiesza pracę i podnosi jakość kodu.",
    cvSummary_en:
      "Full Stack Developer in the Laravel ecosystem (Laravel, Vue 3, Inertia.js, PostgreSQL, Docker) with a focus on code quality and CI/CD. I build complete web applications - from the backend through a reactive frontend to containerisation. I work with AI at an advanced level - as a prompt engineer I design and optimise prompts and orchestrate specialised AI agents, delegating specific tasks to speed up delivery and raise code quality.",
    gdpr:
      "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w CV na potrzeby procesu rekrutacji, zgodnie z RODO (Rozporządzenie UE 2016/679).",
    gdpr_en:
      "I consent to the processing of my personal data contained in this CV for the purposes of the recruitment process, in accordance with GDPR (EU Regulation 2016/679).",
    email: "dciupek0@gmail.com",
    phone: "+48 798277925",
    github: "https://github.com/daniel-ciupek",
    linkedin: "https://linkedin.com/in/daniel-ciupek-4ab127387",
    facebook: "https://www.facebook.com/daniel.ciupek.7?locale=pl_PL",
    instagram: "https://www.instagram.com/danter005?igsh=Zzh3bGNrNmtxNHht&utm_source=qr",
    website: "https://cv-daniel-ciupek.vercel.app",
    availability: "Dostępny · otwarty na propozycje współpracy",
    contact: {
      headline: "Porozmawiajmy o współpracy.",
      subline:
        "Szukam zespołu, w którym rozwinę się przy komercyjnych projektach. Napisz — odpowiadam szybko.",
    },
    location: "Polska · zdalnie / hybryda",
    languages: [
      { name: "Polski", level: "język ojczysty" },
      { name: "Angielski", level: "komunikatywny (B1/B2)" },
    ],
    location_en: "Poland · remote / hybrid",
    bio_en:
      "Full Stack Developer specialising in the Laravel ecosystem — Laravel, Vue 3, Inertia.js, PostgreSQL and Docker. I build complete web applications, from the backend through a reactive frontend to containerisation. I work with AI at an advanced level — as a prompt engineer I design and optimise prompts and orchestrate specialised AI agents, delegating specific tasks to speed up delivery and raise code quality. I'm also focused on automation and CI/CD — I build pipelines in GitLab CI/CD and GitHub Actions, caring about repeatable deployments and code quality. My portfolio includes a production-deployed team-workflow management system and a SaaS application with online payments (Stripe), two-factor authentication (2FA) and real-time analytics. I'm looking for a team where I can grow through commercial projects.",
  },

  // ─── Umiejętności ──────────────────────────────────────────────
  skills: [
    {
      category: "Backend",
      items: ["PHP", "Laravel", "Livewire", "Node.js", "Python"],
    },
    {
      category: "Frontend",
      items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Vue 3",
        "Inertia.js",
        "Pinia",
        "Alpine.js",
        "Next.js",
        "Tailwind CSS",
      ],
    },
    {
      category: "Bazy danych",
      items: ["MySQL", "PostgreSQL", "Redis"],
    },
    {
      category: "DevOps & Narzędzia",
      items: [
        "Docker",
        "Git",
        "GitLab CI/CD",
        "GitHub Actions",
        "AWS",
        "Linux",
        "Postman",
        "REST API",
        "PHPStan",
        "Pest",
      ],
    },
    {
      category: "AI & Narzędzia",
      items: ["Claude Code", "Cursor", "Gemini", "MCP", "Prompt Engineering", "n8n"],
    },
  ],

  // ─── Tech stack (bogaty) — karuzela ikon w Hero (V3) ───────────
  // Autorskie ikony: public/MyImage/tech/ic-<slug>.png. Kolejność = grupowanie kategorii.
  techStack: [
    {
      name: "Laravel",
      category: "Backend",
      icon: "/MyImage/tech/ic-laravel.png",
      description:
        "Główny framework mojego backendu — REST API, panele i logika biznesowa z naciskiem na czysty kod i testy.",
      points: [
        "Eloquent ORM i migracje",
        "Kolejki, zdarzenia, powiadomienia",
        "Sanctum / autoryzacja API",
        "Testy (Pest / PHPUnit)",
      ],
    },
    {
      name: "PHP",
      category: "Backend",
      icon: "/MyImage/tech/ic-php.png",
      description:
        "Język większości moich aplikacji serwerowych — nowoczesny, typowany PHP 8+ zgodny z PSR.",
      points: ["PHP 8+ (typy, enums)", "OOP i SOLID", "Composer / PSR", "Integracje i API"],
    },
    {
      name: "Livewire",
      category: "Backend",
      icon: "/MyImage/tech/ic-livewire.png",
      description:
        "Reaktywne UI w Laravelu bez osobnego API — dynamiczny interfejs po stronie serwera.",
      points: [
        "Komponenty Livewire 3 / Volt",
        "Reaktywność bez REST",
        "Integracja z Alpine.js",
        "Szybki dynamiczny UI",
      ],
    },
    {
      name: "Node.js",
      category: "Backend",
      icon: "/MyImage/tech/ic-nodejs.png",
      description: "JavaScript po stronie serwera — API, narzędzia i automatyzacje.",
      points: ["REST API", "Narzędzia CLI", "Ekosystem npm", "Integracje / webhooki"],
    },
    {
      name: "Python",
      category: "Backend",
      icon: "/MyImage/tech/ic-python.png",
      description: "Skrypty, automatyzacja i przetwarzanie danych.",
      points: ["Automatyzacja", "Przetwarzanie danych", "Skrypty narzędziowe", "Integracje API"],
    },
    {
      name: "JavaScript",
      category: "Frontend",
      icon: "/MyImage/tech/ic-javascript.png",
      description: "Fundament frontendu — nowoczesny ES, DOM, asynchroniczność.",
      points: ["ES6+", "Async / Promises", "DOM i zdarzenia", "Fetch / API"],
    },
    {
      name: "TypeScript",
      category: "Frontend",
      icon: "/MyImage/tech/ic-typescript.png",
      description: "Typowany JavaScript dla bezpieczeństwa i skali.",
      points: ["Typy, generyki, interfejsy", "Bezpieczne modele", "Lepsze DX", "Refaktoryzacja"],
    },
    {
      name: "React",
      category: "Frontend",
      icon: "/MyImage/tech/ic-react.png",
      description: "Komponentowe interfejsy i aplikacje SPA.",
      points: ["Hooki", "Zarządzanie stanem", "Routing SPA", "Integracja z API"],
    },
    {
      name: "Vue 3",
      category: "Frontend",
      icon: "/MyImage/tech/ic-vue.png",
      description:
        "Mój główny framework frontendu — Composition API, często z Inertia.js.",
      points: ["Composition API", "Pinia", "Inertia.js + Laravel", "Komponenty i SPA"],
    },
    {
      name: "Inertia.js",
      category: "Frontend",
      icon: "/MyImage/tech/ic-inertia.png",
      description: "Most Laravel ↔ Vue/React — SPA bez budowania osobnego API.",
      points: ["Monolityczne SPA", "Vue 3 / React", "Bez REST boilerplate", "Server-side routing"],
    },
    {
      name: "Pinia",
      category: "Frontend",
      icon: "/MyImage/tech/ic-pinia.png",
      description: "Zarządzanie stanem dla Vue 3 — proste, typowane store.",
      points: ["Stores", "Reaktywny stan", "Typowanie TS", "DevTools"],
    },
    {
      name: "Alpine.js",
      category: "Frontend",
      icon: "/MyImage/tech/ic-alpine.png",
      description: "Lekka reaktywność w HTML — idealna z Laravel/Livewire.",
      points: ["Dyrektywy x-", "Lekki JS w markup", "Z Livewire", "Mikrointerakcje"],
    },
    {
      name: "Next.js",
      category: "Frontend",
      icon: "/MyImage/tech/ic-nextjs.png",
      description: "React framework — SSR/SSG, routing, statyczny export.",
      points: ["App Router / RSC", "SSR / SSG", "Statyczny export", "Optymalizacja"],
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      icon: "/MyImage/tech/ic-tailwind.png",
      description: "Utility-first CSS — szybki, spójny design system.",
      points: ["Utility classes", "Responsywność", "Motyw / tokeny", "Dark mode"],
    },
    {
      name: "MySQL",
      category: "Bazy danych",
      icon: "/MyImage/tech/ic-mysql.png",
      description: "Relacyjna baza danych — projekt schematów i zapytania.",
      points: ["Schematy i indeksy", "Zapytania i JOIN-y", "Relacje", "Optymalizacja"],
    },
    {
      name: "PostgreSQL",
      category: "Bazy danych",
      icon: "/MyImage/tech/ic-postgresql.png",
      description: "Moja główna relacyjna baza — wydajność i integralność.",
      points: [
        "Projekt schematu i indeksy",
        "Optymalizacja zapytań",
        "Relacje i transakcje",
        "Migracje",
      ],
    },
    {
      name: "Redis",
      category: "Bazy danych",
      icon: "/MyImage/tech/ic-redis.png",
      description: "Cache i kolejki — przyspieszenie i real-time.",
      points: ["Cache", "Kolejki", "Sesje", "Pub/Sub"],
    },
    {
      name: "Docker",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-docker.png",
      description: "Konteneryzacja — spójne środowiska dev/prod i deployment.",
      points: ["Dockerfile i obrazy", "docker-compose", "Środowiska dev/prod", "Element CI/CD"],
    },
    {
      name: "Git",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-git.png",
      description: "Kontrola wersji — gałęzie, PR-y, historia.",
      points: ["Branching", "Pull requesty", "Rozwiązywanie konfliktów", "Workflow zespołowy"],
    },
    {
      name: "GitLab CI/CD",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-gitlab.png",
      description: "Pipeline'y CI/CD — automatyczne testy i wdrożenia.",
      points: [".gitlab-ci.yml", "Testy w pipeline", "Automatyczny deploy", "Powtarzalność"],
    },
    {
      name: "GitHub Actions",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-github-actions.png",
      description: "Automatyzacja CI/CD na GitHubie.",
      points: ["Workflowy YAML", "Testy i lint", "Deploy", "Matryce"],
    },
    {
      name: "AWS",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-aws.png",
      description: "Chmura — hosting i usługi.",
      points: ["Hosting", "Podstawy usług", "Deployment", "Skalowanie"],
    },
    {
      name: "Linux",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-linux.png",
      description: "Środowisko serwerowe — terminal, konfiguracja, deployment.",
      points: ["Terminal / bash", "Konfiguracja serwera", "Uprawnienia", "Deployment"],
    },
    {
      name: "Postman",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-postman.png",
      description: "Testowanie i dokumentowanie REST API.",
      points: ["Kolekcje", "Testy API", "Środowiska", "Automatyzacja"],
    },
    {
      name: "REST API",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-rest-api.png",
      description: "Projektowanie i konsumpcja API REST.",
      points: ["Zasoby i metody", "Autoryzacja", "Statusy i błędy", "Wersjonowanie"],
    },
    {
      name: "PHPStan",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-phpstan.png",
      description: "Statyczna analiza PHP — łapanie błędów przed runtime.",
      points: ["Poziomy 0-9", "Typowanie", "Integracja CI", "Czystszy kod"],
    },
    {
      name: "Pest",
      category: "DevOps & Narzędzia",
      icon: "/MyImage/tech/ic-pest.png",
      description: "Elegancki framework testów PHP.",
      points: ["Testy jednostkowe", "Feature testy", "Ekspresyjne API", "Integracja Laravel"],
    },
    {
      name: "Claude Code",
      category: "AI & Narzędzia",
      icon: "/MyImage/tech/ic-claude.png",
      description: "Agentowe kodowanie z Claude — orkiestracja zadań.",
      points: ["Agentowy workflow", "Refaktoryzacje", "Automatyzacja", "Code review"],
    },
    {
      name: "Cursor",
      category: "AI & Narzędzia",
      icon: "/MyImage/tech/ic-cursor.png",
      description: "Edytor AI-first — szybkie kodowanie z kontekstem repo.",
      points: ["AI w edytorze", "Kontekst repo", "Szybkie zmiany", "Autouzupełnianie"],
    },
    {
      name: "Gemini",
      category: "AI & Narzędzia",
      icon: "/MyImage/tech/ic-gemini.png",
      description: "Model AI Google — generowanie i analiza (m.in. grafika).",
      points: ["Generowanie treści", "Analiza", "Grafika", "Integracje"],
    },
    {
      name: "MCP",
      category: "AI & Narzędzia",
      icon: "/MyImage/tech/ic-mcp.png",
      description: "Model Context Protocol — podłączanie narzędzi do agentów AI.",
      points: ["Serwery MCP", "Narzędzia dla AI", "Integracje", "Kontekst"],
    },
    {
      name: "Prompt Engineering",
      category: "AI & Narzędzia",
      icon: "/MyImage/tech/ic-prompt-engineering.png",
      description: "Projektowanie i optymalizacja promptów — jako prompt engineer.",
      points: ["Projekt promptów", "Optymalizacja", "Orkiestracja agentów", "Powtarzalne wyniki"],
    },
    {
      name: "n8n",
      category: "AI & Narzędzia",
      icon: "/MyImage/tech/ic-n8n.png",
      description: "Automatyzacja workflow — łączenie usług bez kodu.",
      points: ["Workflowy", "Integracje", "Webhooki", "Automatyzacja"],
    },
  ],

  // ─── Doświadczenie ─────────────────────────────────────────────
  experience: [
    {
      role: "Staż — Full Stack Developer",
      period: "2026",
      description:
        "Praca w zespole developerskim przy rzeczywistych zadaniach projektowych — z naciskiem na współpracę, komunikację i wspólne standardy kodu.",
      highlights: [
        "Współpraca w zespole w oparciu o Git flow i code review",
        "Komunikacja i podział zadań w zespole, praca zgodnie z przyjętymi standardami",
        "Udział w rozwoju aplikacji webowych — backend i frontend",
      ],
      role_en: "Internship — Full Stack Developer",
      description_en:
        "Working in a development team on real project tasks — with a focus on collaboration, communication and shared code standards.",
      highlights_en: [
        "Team collaboration based on Git flow and code review",
        "Communication and task distribution within the team, working to agreed standards",
        "Contributing to web application development — backend and frontend",
      ],
    },
  ],

  // ─── Projekty ──────────────────────────────────────────────────
  projects: [
    
      {
       title: "QR-Master",
       description: "SaaS (SPA) do zarządzania kodami QR z analityką realtime i czatem AI. Projekt integruje płatności Stripe, 2FA/WebAuthn i szybkie wyszukiwanie, opierając się na maksymalnej wydajności (FrankenPHP, Octane) oraz rygorystycznym CI/CD (PHPStan lvl 8, Snyk).",
       description_en: "A SaaS (SPA) for managing QR codes with real-time analytics and an AI chat. It integrates Stripe payments, 2FA/WebAuthn and fast search, built for maximum performance (FrankenPHP, Octane) and rigorous CI/CD (PHPStan level 8, Snyk).",
       stack: ["Laravel 13", "Vue 3", "Inertia.js", "TypeScript", "FrankenPHP", "Stripe", "Filament", "GitHub Actions"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/QR-Master",
       screenshots: [
         "/projects/qr-master/01-dashboard.webp",
         "/projects/qr-master/02-analytics.webp",
         "/projects/qr-master/03-designer.webp",
         "/projects/qr-master/04-create.webp",
         "/projects/qr-master/05-pricing.webp",
       ],
     },

     {
       title: "PrepMind",
       description: "PrepMind to aplikacja dla programistów: generuje pytania techniczne, planuje powtórki (SM-2) i symuluje rozmowy rekrutacyjne z AI. Działa w modelu BYOK (własny klucz Gemini), bez abonamentu.",
       description_en: "PrepMind is an app for developers: it generates technical questions, schedules spaced repetition (SM-2) and simulates AI-driven job interviews. It runs on a BYOK model (your own Gemini key), with no subscription.",
       stack: ["Laravel 12", "PHP 8.3", "PostgreSQL 16", "Redis 7", "Inertia.js 2", "Vue 3", "TypeScript", "Pinia 3", "Tailwind CSS 3", "Laravel Breeze", "vue-i18n 11", "Gemini 2.5 Flash", "Pest 3", "Docker"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/AI-Powered-Tech-Interview-Prep-App",
       screenshots: [
         "/projects/prepmind/01-dashboard.webp",
         "/projects/prepmind/02-questions.webp",
         "/projects/prepmind/03-flashcards.webp",
         "/projects/prepmind/04-study.webp",
         "/projects/prepmind/05-interview.webp",
       ],
     },

     {
       title: "AI Subscription & Expense Auditor",
       description: "Self-hostowana aplikacja do osobistych finansów: wczytuje wyciągi bankowe (CSV/XLS) z polskich banków, automatycznie kategoryzuje transakcje przy pomocy LLM i wykrywa powtarzające się subskrypcje — w tym prawdopodobne duplikaty, za które możesz płacić dwa razy.",
       description_en: "A self-hosted personal-finance app: it imports bank statements (CSV/XLS) from Polish banks, automatically categorises transactions using an LLM and detects recurring subscriptions — including likely duplicates you may be paying for twice.",
       stack: ["Laravel 13", "PHP 8.5", "PostgreSQL 18", "Redis 8", "Inertia.js", "React 18", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion", "Lucide", "Docker"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/AI_subscription_and_expense_auditor",
       screenshots: [
         "/projects/ai-subscription-auditor/01-dashboard.webp",
         "/projects/ai-subscription-auditor/02-subscriptions.webp",
         "/projects/ai-subscription-auditor/03-detail.webp",
         "/projects/ai-subscription-auditor/04-ai-alert.webp",
         "/projects/ai-subscription-auditor/05-imports.webp",
       ],
     },

     {
       title: "Workflow Management",
       description: "System zarządzania firmą z modułami obsługi pracowników, projektów i zadań. Aplikacja startowała jako wersja bazowa, którą rozbudowałem na potrzeby firmy, w której pracuję — aktualnie wdrożona i aktywnie użytkowana. Wyeliminowała problem nieefektywnego dysponowania zadaniami, skracając czas koordynacji pracy zespołu. Zbudowana w architekturze full-stack z reaktywnym UI opartym na Livewire 3 (Volt) i Alpine.js, skonteneryzowana przez Docker.",
       description_en: "A company-management system with modules for employees, projects and tasks. It started as a base version that I extended for the company I work at — currently deployed and actively used. It eliminated inefficient task allocation and shortened team-coordination time. Built in a full-stack architecture with a reactive UI based on Livewire 3 (Volt) and Alpine.js, containerised with Docker.",
       stack: ["Laravel 13", "Livewire 3 (Volt)", "Alpine.js", "Tailwind CSS", "PostgreSQL", "Docker"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/workflow_management",    
     },

      {
       title: "Product Manager",
       description: "Fullstack aplikacja SPA do zarządzania produktami, łącząca backend Laravel z frontendem Vue 3 za pomocą Inertia.js — bez konieczności budowania osobnego REST API. Projekt prezentuje podejście monolityczne z zachowaniem doświadczenia użytkownika typowego dla SPA, skonteneryzowany przez Docker.",
       description_en: "A full-stack SPA for product management, connecting a Laravel backend with a Vue 3 frontend via Inertia.js — without building a separate REST API. It demonstrates a monolithic approach while preserving an SPA-like user experience, containerised with Docker.",
       stack: ["PHP 8.3", "Laravel 12", "Inertia.js 2", "Vue 3", "Tailwind CSS", "MySQL", "Docker"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/spa_inertia",    
     },

       {
       title: "To Do List",
       description: "Aplikacja SPA do zarządzania zadaniami z systemem autentykacji opartym na Laravel Sanctum (cookie-based session). Frontend zbudowany w Vue 3 z Composition API i Pinia jako store — komunikuje się z dedykowanym Laravel REST API.",
       description_en: "A task-management SPA with authentication based on Laravel Sanctum (cookie-based sessions). The frontend is built in Vue 3 with the Composition API and Pinia as the store — communicating with a dedicated Laravel REST API.",
       stack: ["Vue 3", "Pinia", "Vue Router 4", "Bootstrap 5", "Axios", "date-fns"],
      // url: "https://...",       // opcjonalne
       github: "https://github.com/daniel-ciupek/todo-app-vue",    
     },

      {
       title: "Backend API dla To Do List",
       description: "Dedykowane REST API dla aplikacji To Do List, zbudowane w Laravel 11. Obsługuje zarządzanie zadaniami z priorytetami, datami wykonania i parsowaniem naturalnego języka. Autentykacja przez Laravel Sanctum (cookie-based session), zasoby Eloquent ORM.",
       description_en: "A dedicated REST API for the To Do List app, built in Laravel 11. It handles task management with priorities, due dates and natural-language parsing. Authentication via Laravel Sanctum (cookie-based sessions), Eloquent ORM resources.",
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
      title: "Vanilla JavaScript od podstaw",
      title_en: "Vanilla JavaScript from Scratch",
      platform: "Udemy",
      hours: 39,
      date: "2025",
    },
    {
      key: "cert_php",
      file: "/MyImage/CertyfikatPHP.jpg",
      title: "Kurs programowanie PHP i MySQL",
      title_en: "PHP & MySQL Programming Course",
      platform: "Udemy",
      hours: 32,
      date: "2026",
    },
    {
      key: "cert_mysql",
      file: "/MyImage/CertyfikatMySql.jpg",
      title: "Kurs SQL od podstaw | MySQL",
      title_en: "SQL from Scratch | MySQL",
      platform: "Udemy",
      hours: 5,
      date: "2026",
    },
    {
      key: "cert_postgres",
      file: "/MyImage/CertyfikatPostgreSQL.jpg",
      title: "Kurs PostgreSQL",
      title_en: "PostgreSQL Course",
      platform: "Udemy",
      hours: 6,
      date: "2026",
    },
    {
      key: "cert_laravel",
      file: "/MyImage/CertyfikatLaravel12&Vue3.jpg",
      title: "Laravel 12 & Vue 3 fullstack Mastery",
      platform: "Udemy",
      hours: 37.5,
      date: "2026",
    },
    {
      key: "cert_docker",
      file: "/MyImage/CertyfikatDocker.jpg",
      title: "Docker od podstaw",
      title_en: "Docker from Scratch",
      platform: "Udemy",
      hours: 4.5,
      date: "2026",
    },
    {
      key: "cert_postman",
      file: "/MyImage/CertyfikatPostmanTestAPI.jpg",
      title: "Postman od podstaw – testowanie REST API",
      title_en: "Postman from Scratch – REST API Testing",
      platform: "Udemy",
      hours: 6,
      date: "2026",
    },
    {
      key: "cert_english",
      file: "/MyImage/CertyfikatAngielskiIT.jpg",
      title: "Angielski w IT. Kompletny Kurs Konwersacyjny",
      title_en: "English for IT. Complete Conversational Course",
      platform: "Udemy",
      hours: 12,
      date: "2026",
    },
    {
      key: "cert_ai",
      file: "/MyImage/CertyfikatAIProgramisty.jpg",
      title: "AI dla programistów: ChatGPT od A do Z",
      title_en: "AI for Developers: ChatGPT from A to Z",
      platform: "Udemy",
      hours: 4.5,
      date: "2025",
    },
    {
      key: "cert_claude",
      file: "/MyImage/CertyfikatClaudeCode.jpg",
      title: "Claude Code w pigułce",
      title_en: "Claude Code in a Nutshell",
      platform: "Udemy",
      hours: 1.5,
      date: "2026",
    },
    {
      key: "cert_ai_coding",
      file: "/MyImage/CertyfikatAiCodingWithClaudeAndCursor.jpg",
      title: "The Complete AI Coding Course (2025) – Cursor, Claude Code",
      platform: "Udemy",
      hours: 12,
      date: "2026",
    },
    {
      key: "cert_python",
      file: "/MyImage/CertyfikatPython.jpg",
      title: "[2026] Kurs Python 3 od Podstaw do Mastera",
      title_en: "[2026] Python 3 Course — from Basics to Master",
      platform: "Udemy",
      hours: 73,
      date: "2026",
    },
    {
      key: "cert_aws",
      file: "/MyImage/CertyfikatAWS.jpg",
      title: "AWS Certified Cloud Practitioner",
      platform: "Udemy",
      hours: 5.5,
      date: "2026",
    },
    {
      key: "cert_gitlab",
      file: "/MyImage/GitLabCICD.jpg",
      title: "Kurs GitLab CI/CD od podstaw",
      title_en: "GitLab CI/CD from Scratch",
      platform: "Udemy",
      hours: 14,
      date: "2026",
    },
  ],
};

export default data;
