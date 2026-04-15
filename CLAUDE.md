# CLAUDE.md — Portfolio Daniel Ciupek

> Plik konfiguracyjny dla Claude Code. Zawiera wszystkie reguły, kontekst i standardy projektu.
> **Zawsze czytaj ten plik przed rozpoczęciem pracy.**

---

## 1. Identyfikacja Projektu

- **Właściciel:** Daniel Ciupek — Full Stack Developer
- **Cel:** Interaktywne portfolio nowej generacji (2026)
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
│   ├── ui/                 # Atomowe komponenty (Button, Card, Badge…)
│   ├── features/           # Sekcje portfolio (Hero, Skills, Certs, Contact…)
│   └── layout/             # Navbar, Footer
├── config/
│   └── data.ts             # JEDYNE ŹRÓDŁO PRAWDY — wszystkie treści
├── hooks/                  # Custom hooks (useMousePosition, useMagnet…)
├── lib/                    # Utilities, helpers
└── types/                  # Globalne interfejsy TypeScript
```

**Zasada:** żaden komponent nie hardkoduje treści. Wszystko pochodzi z `src/config/data.ts`.

---

## 4. Dane właściciela — `src/config/data.ts`

Plik `data.ts` musi zawierać następujące sekcje:

### Dane osobowe
```ts
personal: {
  name: "Daniel Ciupek",
  title: "Full Stack Developer",
  avatar: "/MyImage/avatarDc.jpeg",
  email: "",        // do uzupełnienia
  phone: "",        // do uzupełnienia
  github: "",
  linkedin: "",
  facebook: "",
  instagram: "",
}
```

### Certyfikaty (platforma Udemy)
Wszystkie pliki certyfikatów znajdują się w `public/MyImage/`:

| Zmienna | Plik | Tytuł | Data |
|---------|------|-------|------|
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

## 5. Kluczowe Funkcje i Interaktywność

### Hero Section
- Avatar w formie płynnego **bloba** lub z efektem **glitch/liquid** (WebGL/Three.js) reagującego na kursor
- Tło: powoli rotujące abstrakcyjne figury 3D lub cząsteczki świetlne z paralaksą myszy

### Tech Stack / Umiejętności
- Interaktywna chmura tagów 3D lub fizyczna symulacja (elementy odpychają się od kursora)
- Priorytetowe technologie: Laravel, PHP, JavaScript, React, Vue, Docker, PostgreSQL

### Sekcja Certyfikatów
- Karty z efektem glassmorphism, unoszące się na hover z neonową poświatą
- Klik otwiera modal/lightbox z pełnym obrazem certyfikatu z `MyImage/`
- Layout: masonry grid lub poziomy scroll z parallax

### Kontakt & Social Media (Terminal/Dock)
- Blok przypominający systemowy dock lub terminal
- Zawiera: telefon, email, GitHub, LinkedIn, Facebook, Instagram
- **Ikony magnetyczne** — płynnie przyciągają się do kursora w pobliżu
- Neonowy glow na hover

---

## 6. Wydajność i Jakość Kodu

- Komponenty 3D i ciężkie animacje ładowane przez `next/dynamic` (lazy loading)
- Cel: **Lighthouse 100/100** na wszystkich metrykach
- TypeScript strict — zakaz używania `any`, precyzyjne interfejsy dla danych z `data.ts`
- Zasady: **SOLID, DRY, Clean Code** — małe, reużywalne komponenty
- Komponenty serwerowe (RSC) tam gdzie możliwe; interaktywność tylko na `"use client"`

---

## 7. Strategia PDF / ATS (`/cv-print`)

- Ukryta podstrona dostępna pod `/cv-print`
- **Całkowite przeciwieństwo** strony głównej: białe tło, czarny tekst, brak animacji i 3D
- Czcionka: Inter lub Geist — czytelna dla systemów ATS
- Układ A4, gotowy do druku (`@media print`)
- Certyfikaty: tylko lista tekstowa (nazwa, platforma, data)
- Dane z tego samego `data.ts`

---

## 8. Workflow Git

### Gałęzie
- `Dev` — gałąź robocza. **Tutaj realizujemy wszystkie zmiany.**
- `main` — produkcja. Mergujemy z `Dev` dopiero gdy jesteśmy zadowoleni z etapu.

### Zasady commitów
1. Używaj wyłącznie lokalnej tożsamości z `git config`
2. **NIGDY** nie dodawaj fraz: "Automated by Claude", "Claude commit", "[AI]" ani żadnych sygnatur AI
3. Wiadomości commitów: tryb oznajmiający, profesjonalny styl senior developera
4. Commituj po każdym ukończonym etapie (nie akumuluj zbyt wielu zmian naraz)

### .gitignore
- Utwórz `.gitignore` na samym początku projektu
- Przy dodawaniu nowych bibliotek lub generowaniu plików tymczasowych — natychmiast aktualizuj `.gitignore`

---

## 9. Sub-agenci Claude Code

### `@design-agent`
- **Kiedy używać:** decyzje UI/UX, kolorystyka, typografia, layout sekcji, animacje, estetyka
- **Plik:** `.claude/agents/design_agent.md`
- Agent zna dane projektu (certyfikaty, avatar, styl glassmorphism/obsidian)
- Agent **nie modyfikuje kodu** — dostarcza specyfikacje i decyzje projektowe

---

## 10. Zarządzanie Assetami

```
MyImage/                    # Oryginalne pliki (źródłowe)
public/MyImage/             # Pliki dostępne przez Next.js (skopiować przed buildem)
```

- Avatar: `avatarDc.jpeg`
- Certyfikaty: 11 plików `.jpg` (szczegóły w sekcji 4)
- Obrazy optymalizować przez `next/image` z odpowiednimi `alt` i `sizes`
