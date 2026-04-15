# Kontekst Projektu: Interaktywne Portfolio Nowej Generacji (Full Stack Developer)

## Stos Technologiczny (Standard 2026)
- **Framework:** Next.js (App Router)
- **Język:** TypeScript (Strict mode)
- **Stylowanie:** Tailwind CSS (Domyślnie Dark Mode)
- **Animacje:** Framer Motion (interfejs) oraz GSAP (animacje na scrollu)
- **Elementy 3D:** Three.js, @react-three/fiber, @react-three/drei
- **Ikony:** Lucide React / React Icons (dla GitHub, LinkedIn, Facebook, Instagram, Laravel, PHP itp.)

## Architektura i Zarządzanie Treścią
- **Jedno Źródło Prawdy:** Wszystkie dane (kontakt, skille, projekty) muszą pochodzić ze scentralizowanego pliku konfiguracyjnego (np. `src/config/data.ts`).
- **Łatwa Edycja:** Kategoryczny zakaz hardkodowania treści bezpośrednio w widokach i komponentach.
- **Wydajność:** Komponenty 3D i ciężkie animacje muszą być ładowane dynamicznie (`next/dynamic`), aby utrzymać maksymalną wydajność (Lighthouse 100/100).

## Czysty Kod i Dobre Praktyki
- **Struktura Katalogów:** Zorganizuj projekt w sposób przemyślany i schludny, zgodnie z najlepszymi standardami Next.js na rok 2026 (jasny podział na ui, features, lib, hooks, types).
- **Jakość Kodu:** Stosuj zasady SOLID, DRY oraz Clean Code. Pisz małe, reużywalne komponenty.
- **Typowanie:** W pełni wykorzystuj możliwości TypeScripta (unikanie typu `any`, precyzyjne interfejsy dla danych z `data.ts`).

## Zarządzanie Gitem i .gitignore (KRYTYCZNE)
- **Automatyzacja .gitignore:** Utwórz plik `.gitignore` na samym początku. Przy dodawaniu nowych bibliotek, narzędzi lub generowaniu plików tymczasowych, natychmiast sprawdzaj i aktualizuj `.gitignore`, aby utrzymać absolutną czystość repozytorium.
- **Dyskrecja Commitów:** Podczas wykonywania commitów:
  1. Używaj wyłącznie lokalnej tożsamości zdefiniowanej w `git config`.
  2. **NIGDY** nie dodawaj w wiadomościach commitu fraz typu "Automated by Claude", "Claude commit", "[AI]" czy innych sygnatur sztucznej inteligencji.
  3. Pisz wiadomości commitów w trybie oznajmiającym i profesjonalnie, tak aby nie różniły się od commitów pisanych przez senior developera.

## Kluczowe Funkcje i "Bajery"
- **Kreatywny Awatar:** Zdjęcie w formie płynnego "bloba" lub z efektem glitch/liquid (WebGL/Three.js), uciekające od standardowego kwadratu.
- **Interaktywne Umiejętności:** Fizyczna chmura tagów lub elementy 3D reagujące na kursor.
- **Kontakt i Social Media:** Nowoczesny blok przypominający dock/terminal, zawierający magnetyczne ikony społecznościowe (GitHub, LinkedIn, FB, IG), widoczny numer telefonu i email.

## Strategia dla CV w PDF
- Utwórz ukrytą podstronę `/cv-print`.
- Widok ma być w 100% zoptymalizowany pod druk A4 i systemy ATS (białe tło, czarny techniczny tekst, brak animacji i 3D).
- Dane muszą być pobierane z tego samego głównego pliku `data.ts`.