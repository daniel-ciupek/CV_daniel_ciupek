# CLAUDE.md — Portfolio Daniel Ciupek

> Plik konfiguracyjny dla Claude Code. Zawiera wszystkie reguły, kontekst i standardy projektu.
> **Zawsze czytaj ten plik przed rozpoczęciem pracy.**

---

## 1. Identyfikacja Projektu

- **Właściciel:** Daniel Ciupek — Full Stack Developer
- **Cel:** Interaktywne portfolio / CV online (2026)
- **Charakter:** Strona statyczna — brak bazy danych, brak logowania, brak API routes
- **Dane:** Wyłącznie z `src/config/data.ts` (zero zewnętrznych źródeł)
- **Deployment:** Statyczny export (`output: 'export'` w `next.config.ts`) lub Vercel
- **URL produkcyjny:** TBD
- **Avatar:** `MyImage/avatarDc.jpeg`

---

## 2. Stos Technologiczny

| Warstwa | Technologia |
|---------|-------------|
| Framework | Next.js 15 (App Router) |
| Język | TypeScript (strict mode) |
| Stylowanie | Tailwind CSS v4 (domyślnie dark mode) |
| Animacje UI | Framer Motion |
| Animacje scroll | GSAP + ScrollTrigger |
| Smooth scroll | Lenis (`duration: 1.2`, zintegrowany z GSAP) |
| Elementy 3D | Three.js, @react-three/fiber, @react-three/drei |
| Ikony | Lucide React + React Icons (GitHub, LinkedIn, FB, IG, Laravel, PHP) |
| Linting | ESLint + Prettier |

---

## 3. Struktura Katalogów

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Strona główna (portfolio)
│   ├── cv-print/           # Ukryta strona PDF/ATS
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── ui/                 # Atomowe komponenty (Button, Card, Badge, Cursor…)
│   ├── features/           # Sekcje portfolio (Hero, About, Skills, Projects, Certs, Contact…)
│   └── layout/             # Navbar, Footer
├── config/
│   └── data.ts             # JEDYNE ŹRÓDŁO PRAWDY — wszystkie treści
├── hooks/                  # Custom hooks (useMousePosition, useMagnet, useLenis…)
├── lib/                    # Utilities, helpers
└── types/                  # Globalne interfejsy TypeScript
```

**Zasada:** żaden komponent nie hardkoduje treści. Wszystko pochodzi z `src/config/data.ts`.

---

## 4. Dane właściciela — `src/config/data.ts`

Kompletna struktura pliku `data.ts`:

### Dane osobowe
```ts
personal: {
  name: "Daniel Ciupek",
  title: "Full Stack Developer",
  avatar: "/MyImage/avatarDc.jpeg",
  bio: "",          // krótki opis "about me" — do uzupełnienia
  email: "dciupek0@gmail.com",
  phone: "+48 798277925",
  github: "https://github.com/daniel-ciupek",
  linkedin: "http://linkedin.com/in/daniel-ciupek-4ab127387",
  facebook: "https://www.facebook.com/daniel.ciupek.7?locale=pl_PL",
  instagram: "https://www.instagram.com/danter005?igsh=Zzh3bGNrNmtxNHht&utm_source=qr",
}
```

### Umiejętności (pogrupowane kategoriami)
```ts
skills: [
  { category: "Backend",   items: ["PHP", "Laravel", "Node.js"] },
  { category: "Frontend",  items: ["JavaScript", "TypeScript", "React", "Vue 3", "Next.js"] },
  { category: "Bazy danych", items: ["MySQL", "PostgreSQL"] },
  { category: "DevOps",    items: ["Docker", "Git"] },
  { category: "AI & Narzędzia", items: ["Claude Code", "Cursor", "Gemini", "Postman", "REST API"] },
]
```

### Projekty (zamiast Work Experience)
```ts
projects: [
  {
    title: "",
    description: "",
    stack: [],        // string[]
    url: "",          // opcjonalne
    github: "",       // opcjonalne
    image: "",        // opcjonalne — ścieżka do screenshota
  }
]
```

### Certyfikaty (platforma Udemy)
Wszystkie pliki w `public/MyImage/`:

| Klucz | Plik | Tytuł | Data |
|-------|------|-------|------|
| `cert_js` | `CertyfikatJavaScript.jpg` | Vanilla JavaScript od podstaw | 29.11.2025 |
| `cert_php` | `CertyfikatPHP.jpg` | PHP i MySQL od podstaw w Pigułce | 10.01.2026 |
| `cert_mysql` | `CertyfikatMySql.jpg` | SQL od podstaw \| MySQL | 09.01.2026 |
| `cert_postgres` | `CertyfikatPostgreSQL.jpg` | Kurs PostgreSQL | 22.01.2026 |
| `cert_laravel` | `CertyfikatLaravel12&Vue3.jpg` | Laravel 12 & Vue 3 fullstack Mastery | 17.03.2026 |
| `cert_docker` | `CertyfikatDocker.jpg` | Docker od podstaw | 24.03.2026 |
| `cert_postman` | `CertyfikatPostmanTestAPI.jpg` | Postman — testowanie REST API | 05.02.2026 |
| `cert_english` | `CertyfikatAngielskiIT.jpg` | Angielski w IT | 16.03.2026 |
| `cert_ai` | `CertyfikatAIProgramisty.jpg` | AI dla programistów: ChatGPT od A do Z | 21.12.2025 |
| `cert_claude` | `CertyfikatClaudeCode.jpg` | Claude Code w pigułce | 06.04.2026 |
| `cert_ai_coding` | `CertyfikatAiCodingWithClaudeAndCursor.jpg` | AI Coding Course — Cursor & Claude Code | 05.04.2026 |

---

## 5. Kluczowe Funkcje Interaktywne

### Kolejność sekcji strony głównej
```
Navbar → Hero → About → Tech Stack → Projects → Certifications → Contact → Footer
```

### Kursor
- Standardowy kursor systemowy — brak custom cursora

### Page Entrance Animation
- Krótki loader (logo/inicjały) → płynny reveal strony
- Implementacja: Framer Motion `AnimatePresence`

### Lenis Smooth Scroll
- Inicjalizacja w `layout.tsx`, integracja z GSAP `ScrollTrigger`
- Parametry: `duration: 1.2`, `easing: easeInOutCubic`, `smooth: true`

### Hero Section
- Avatar w formie płynnego **bloba** lub z efektem **glitch/liquid** (WebGL/Three.js) reagującego na kursor
- Tło: powoli rotujące abstrakcyjne figury 3D lub cząsteczki świetlne z paralaksą myszy

### Tech Stack / Umiejętności
- Interaktywna chmura tagów 3D lub fizyczna symulacja (elementy odpychają się od kursora)
- Dane z `skills[]` w `data.ts`

### Sekcja Certyfikatów
- Karty z efektem glassmorphism, unoszące się na hover z neonową poświatą `#00D4FF`
- Klik otwiera modal/lightbox z pełnym obrazem certyfikatu
- Layout: masonry grid lub poziomy scroll z parallax

### Kontakt & Social Media (Terminal/Dock)
- Blok przypominający systemowy dock lub terminal
- Zawiera: telefon, email, GitHub, LinkedIn, Facebook, Instagram
- **Ikony magnetyczne** — płynnie przyciągają się do kursora w pobliżu
- Neonowy glow `#00D4FF` na hover

### Reguła dostępności
> **KRYTYCZNE:** Wszystkie animacje, 3D i efekty kursora **muszą** być wyłączone gdy `prefers-reduced-motion: reduce`. Używaj `useReducedMotion()` z Framer Motion.

---

## 6. Responsywność (Mobile-First)

Strona musi działać poprawnie na wszystkich urządzeniach.

### Breakpointy (Tailwind)
| Prefiks | Szerokość | Urządzenie |
|---------|-----------|------------|
| *(brak)* | 0px+ | Mobile (domyślny) |
| `sm:` | 640px+ | Duży telefon |
| `md:` | 768px+ | Tablet |
| `lg:` | 1024px+ | Laptop |
| `xl:` | 1280px+ | Desktop |

### Zasady
- Pisz **mobile-first** — style bazowe dla mobile, `md:`/`lg:` dla większych ekranów
- **Navbar:** na mobile hamburger menu lub bottom navigation
- **Custom Cursor:** wyłączony na urządzeniach dotykowych (`@media (pointer: coarse)`)
- **Animacje 3D:** uproszczone lub wyłączone na mobile (wydajność)
- **Hero:** układ kolumnowy na mobile, dwukolumnowy na `lg:`
- **Tech Stack cloud:** na mobile — prosty grid z badgeami zamiast 3D
- **Certifications:** single column na mobile, grid na `md:`
- **Typografia:** skaluj rozmiary nagłówków (`text-3xl md:text-5xl`)
- Testuj na: iPhone SE (375px), iPhone 14 (390px), iPad (768px), Desktop (1280px+)

---

## 6b. Wydajność i Jakość Kodu

- Komponenty 3D i ciężkie animacje ładowane przez `next/dynamic` (lazy loading)
- Cel: **Lighthouse 100/100** na wszystkich metrykach
- TypeScript strict — zakaz używania `any`, precyzyjne interfejsy dla danych z `data.ts`
- Zasady: **SOLID, DRY, Clean Code** — małe, reużywalne komponenty
- Komponenty serwerowe (RSC) tam gdzie możliwe; interaktywność tylko na `"use client"`
- **Zakaz:** API routes, server actions, baz danych, zewnętrznych fetchów — strona w 100% statyczna
- SEO: `next/metadata` na każdej stronie, OG tags, JSON-LD Person schema w `layout.tsx`

---

## 7. Strategia PDF / ATS (`/cv-print`)

Widok `/cv-print` to dokument gotowy do druku i parsowania przez systemy ATS rekruterów.
Stanowi **całkowite przeciwieństwo** strony głównej.

### Kolejność sekcji w PDF
```
1. Dane kontaktowe (imię, tytuł, email, telefon, GitHub, LinkedIn)
2. About / Podsumowanie zawodowe
3. Tech Stack (pogrupowany wg kategorii)
4. Projects
5. Certifications
```

### Zasady ATS (krytyczne)
- Tło: **czysta biel** `#FFFFFF`, tekst: `#111111`
- **Zakaz:** animacji, efektów 3D, glassmorphism, ciemnych teł, ikon-obrazków
- **Zakaz:** tabel do prezentacji umiejętności — używaj zwykłych list (`<ul>`)
- **Zakaz:** układu wielokolumnowego — tylko single column
- Czcionka: **Inter**, body `11pt`, nagłówki sekcji `14pt`, imię `22pt`
- Marginesy: `1.5cm` ze wszystkich stron
- Certyfikaty: lista tekstowa `Nazwa kursu — Udemy — DD.MM.YYYY`
- Dane z tego samego `data.ts` co strona główna

---

## 8. Workflow Git

### Gałęzie
- `Dev` — gałąź robocza. **Tutaj realizujemy wszystkie zmiany.**
- `main` — produkcja. Mergujemy z `Dev` dopiero gdy jesteśmy zadowoleni z etapu.

### Zasady commitów
1. Używaj wyłącznie lokalnej tożsamości z `git config`
2. **NIGDY** nie dodawaj fraz: "Automated by Claude", "Claude commit", "[AI]" ani żadnych sygnatur AI
3. Wiadomości commitów pisz **wyłącznie po angielsku**, w trybie oznajmiającym, profesjonalnym stylu
4. Commituj po każdym ukończonym etapie (nie akumuluj zbyt wielu zmian naraz)
5. **Przed każdym commitem zapytaj użytkownika** — czy commit wykonuje Claude, czy użytkownik sam

### .gitignore — wymagana zawartość
```
node_modules/
.next/
.env.local
.env*.local
*.log
npm-debug.log*
.DS_Store
dist/
.vercel/
.turbo/
```

---

## 9. Sub-agenci Claude Code

### `@design-agent`
- **Kiedy używać:** decyzje UI/UX, kolorystyka, typografia, layout sekcji, animacje, estetyka
- **Plik:** `.claude/agents/design_agent.md`
- Agent zna dane projektu (certyfikaty, avatar, styl glassmorphism/obsidian, paleta kolorów)
- Agent **nie modyfikuje kodu** — dostarcza specyfikacje i decyzje projektowe

---

## 10. Zarządzanie Assetami

```
public/MyImage/             # Jedyne miejsce assetów — Next.js serwuje z /public
```

- Avatar: `public/MyImage/avatarDc.jpeg` → w kodzie: `/MyImage/avatarDc.jpeg`
- Certyfikaty: 11 plików `.jpg` (szczegóły w sekcji 4)
- Obrazy serwować przez `next/image` z odpowiednimi `alt` i `sizes`

---

## 11. Design Tokens

Zdecydowana paleta — obowiązuje w całym projekcie:

```
/* Tła */
--bg-base:      #050505   /* główne tło strony */
--bg-surface:   #0F0F0F   /* karty, panele */
--bg-elevated:  #171717   /* dropdown, modal */

/* Obramowania */
--border:       rgba(255, 255, 255, 0.08)
--border-hover: rgba(0, 212, 255, 0.30)

/* Akcent */
--accent:       #00D4FF
--accent-dim:   #38BDF8
--accent-glow:  rgba(0, 212, 255, 0.15)

/* Tekst */
--text:         #F1F5F9
--text-muted:   #64748B
--text-subtle:  #334155

/* Typografia */
Font UI:        Geist Sans (Next.js default)
Font Mono:      Geist Mono (terminal/code elementy)

Skala:
  xs:   12px
  sm:   14px
  base: 16px
  lg:   18px
  xl:   20px
  2xl:  24px
  3xl:  30px
  4xl:  36px
  5xl:  48px   /* Hero heading */
```
