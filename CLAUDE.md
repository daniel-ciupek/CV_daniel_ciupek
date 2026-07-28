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
  { category: "Backend",   items: ["PHP", "Laravel", "Node.js", "Python"] },
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
| `cert_python` | `CertyfikatPython.jpg` | [2026] Kurs Python 3 od Podstaw do Mastera | 19.04.2026 |

---

## 5. Kluczowe Funkcje Interaktywne

### Kolejność sekcji strony głównej
```
Navbar → Hero → About → Certifications → Tech Stack → Projects → Contact → Footer
```
> Świadoma decyzja (issue #45): Certyfikaty prowadzą przed Umiejętnościami i Projektami —
> 14 realnych certów jako atut na wejściu. Eyebrow 01–05 odzwierciedla ten układ.

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

## 7. Strategia PDF (`/cv-print`) — CV designerskie, dwukolumnowe

> **Zmiana kierunku (issue #62, na `main` od 07.2026):** wycofano stary,
> jednokolumnowy dokument „ATS-plain". Produkcyjne `/cv-print` to teraz
> **designerskie CV dwukolumnowe** (kolorowy sidebar + kolumna główna),
> gotowe do druku i zapisu do PDF. Świadomie akceptujemy kompromis: układ nie
> jest już czysto-ATS, ale cała treść to **selektowalny tekst** (nie obrazki),
> więc pozostaje rozsądnie parsowalna. Wersja PL: `/cv-print`, EN: `/cv-print/en`.

### Pliki
- Dokument: `src/app/cv-print/CvDocumentPro.tsx` (wspólny PL/EN, namespace `.cv2-*`)
- Style + reguły druku: blok `.cv2-*` w `src/app/globals.css`
- Czcionka: `src/app/cv-print/layout.tsx` ładuje self-hostowany **Inter** (`next/font`)

### Układ
- **Sidebar (jasny panel):** zdjęcie + status, Kontakt, Linki, Stack (chipy wg kategorii), AI & narzędzia, Języki (paski), klauzula RODO
- **Kolumna główna:** imię + role tags + podsumowanie, kafle statystyk, Doświadczenie, Projekty, Certyfikaty (grupy tematyczne)
- Treść **wyłącznie z `data.ts`** (m.in. `personal.cvSummary`, `experience[]`, `gdpr`). Myślniki długie `—/–` → pojedynczy łącznik `-`.

### Zasady druku / PDF (krytyczne — nie regresować)
- `@page cv2 { size: A4; margin: 0 }` + `.cv2-page { page: cv2 }` — nie kolidować z innymi `@page`
- Kolory wymuszane `print-color-adjust: exact`; wariant jasny (bezpieczny w druku)
- **Paginacja:** w `@media print` porzucamy grid → sidebar `float` + kolor panelu jako **pasek tła** (`linear-gradient`) na `.cv2-page`, który powtarza się na obu stronach. W przepływie blokowym `break-inside: avoid` działa → bloki (projekty, grupy certów) nie pękają. Grid **nie** łamie się wiarygodnie między stronami — nie wracać do niego w druku.
- **Sidebar musi mieścić się na 1 stronie** (float wyższy niż strona jest cięty jak grid) — trzymać zapas ~150–200px
- **Font deterministyczny:** `.cv2-page` **dziedziczy** Inter z wrappera — NIE nadpisywać `font-family: "Inter"` dosłownie (literalna nazwa nie łączy się z hashem `next/font` → fallback do fontu systemowego → różna wysokość i psucie paginacji per urządzenie)
- Weryfikacja realnego PDF (bez zgadywania): `google-chrome --headless --print-to-pdf` na buildzie + `pdftoppm` do PNG

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

> **Paleta v2 — produkcja (redesign 2026, issue #4–#47, utrwalona na `main`).**
> v1 (legacy #050505/#0F0F0F) wycofana — v2 jest jedyną obowiązującą paletą.
> Realne źródło wartości: `src/app/globals.css` (`:root`) + `tailwind.config.ts`. Ten plik ma je odzwierciedlać.

### Tła i akcenty

```
/* Tła — ciemniejszy zinc */
--bg-base:      #09090B   /* główne tło (zinc-950) */
--bg-surface:   #111116   /* karty, panele */
--bg-elevated:  #18181F   /* dropdown, modal */

/* Akcent główny — cyan (BOHATER UI) */
--accent:       #00D4FF
--accent-dim:   #38BDF8
--accent-glow:  rgba(0, 212, 255, 0.15)

/* Akcent drugi — emerald: WYŁĄCZNIE w aurorze/gradiencie/ruchomym świetle, nigdy jako samodzielny kolor UI */
--accent-2:      #34D399
--accent-2-glow: rgba(52, 211, 153, 0.15)

/* Gradient sygnaturowy (aurora cyan→emerald) — jedno źródło prawdy */
--gradient-aurora: linear-gradient(135deg, #00d4ff, #34d399)
```

### Wspólne dla obu palet (bez zmian)

```
/* Obramowania */
--border:       rgba(255, 255, 255, 0.08)
--border-hover: rgba(0, 212, 255, 0.30)

/* Tekst */
--text:         #F1F5F9
--text-muted:   #7C8A9C   /* WCAG AA ≥5:1 na tłach v2 (podniesione z #64748B w #42) */
--text-subtle:  #334155   /* tylko dekoracja: strzałka scroll, uchwyt scrollbara */

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

### System komponentów (spójność — issue #44)

```
/* Promień kart (Tailwind) */
Kafle / karty w siatce:   rounded-2xl (16px)   /* About, Tech Stack, Projekty, Footer, karty certów */
Duży panel sekcji:        rounded-3xl (24px)   /* Kontakt — pełnowymiarowy panel nad aurorą */

/* Kształt CTA */
Główne przyciski akcji:   rounded-full (pill)  /* Hero, Navbar, Contact — jeden sygnaturowy kształt */
Drobne utility:           rounded-lg           /* kopiuj e-mail, linki projektu, chipy tech — inna warstwa */

/* Receptura szkła — dwa świadome warianty */
glass (przezroczyste):    linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02)) + blur(12px) + 1px --border
                          → karty nad ciemnym tłem (About, Tech Stack, Projekty, Footer)
glass-solid (kryjące):    rgba(17,17,22,.55) + blur(12px) + 1px --border
                          → duże panele nad ruchomą aurorą, gdzie krycie chroni czytelność (Kontakt)
```

---

## 12. Checklist przed Deployem na Produkcję

> **Przeczytaj przed każdym deployem na Vercel / domenę produkcyjną.**

### Zmienna środowiskowa — KRYTYCZNE
Ustaw w panelu Vercel (Settings → Environment Variables):

```
NEXT_PUBLIC_SITE_URL=https://twoja-domena.pl
```

**Dlaczego:** bez tej zmiennej Open Graph (`og:image`) i Twitter Card nie będą działać poprawnie — rekruterzy/portale społecznościowe nie zobaczą podglądu zdjęcia przy udostępnianiu linku do portfolio.

### Pozostałe
- [ ] Uzupełnij `personal.bio` w `src/config/data.ts`
- [ ] Uzupełnij `projects[]` w `src/config/data.ts`
- [ ] Zaktualizuj URL produkcyjny w sekcji 1 tego pliku
- [ ] Ustaw `NEXT_PUBLIC_SITE_URL` w Vercel
