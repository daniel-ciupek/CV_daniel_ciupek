# V3 · Faza 2 — Spec: Fundament + Hero (kierunek B „Holo Chrome")

> Źródło: design-agent (2026-07-31). Kierunek zablokowany w `.claude/agents/design_agent.md` (§7b, l. 225–267).
> Issue: epik #65, fundament #66. Branch: `feat/v3-foundation` (z `V3`).
> **A11y = twardy warunek odbioru** (reduced-motion realnie działa, kontrast AA, tekst tylko na glass-solid, cyan tylko sheen).

## Stan startowy (zweryfikowany, nie z pamięci)
- Tokeny cyan/emerald: `globals.css :root` (l. 6–36) **oraz** `tailwind.config.ts` `theme.extend` (l. 11–27) — oba do przemalowania.
- Globalne tło: `body::before` grain (l. 85–93, .03), `body::after` ambient-beam (l. 128–165); **3 bloby żyją lokalnie w `Hero.tsx` (l. 257–289)** — do przeniesienia/przemalowania.
- Hardkod cyan globalny: `:focus-visible` (49–53), `::selection` (96–99), scrollbar hover (105). Sekcyjne (`nav-*`, `anchor-pulse`, `tech-rim`) — known-debt, migrują w issue swoich sekcji.
- Fonty: tylko `Geist` + `Geist_Mono` (`layout.tsx` 10–18). Space Grotesk NIEзаinstalowany.
- Hero H1 = `scrambledName` w Geist **Mono** + gradient cyan (l. 306–328); mono celowe (scramble nie może skakać szerokością).
- `AvatarMorph`, `CursorSpotlight`, `usePrefersReducedMotion`, `useScrambleText` — istnieją, działają.

---

# CZĘŚĆ 1 — FUNDAMENT

## 1.1 Tokeny

### globals.css → :root (zastąp l. 6–36)
```css
:root {
  --bg-base:     #08070D;
  --bg-surface:  #100E1A;
  --bg-elevated: #191527;

  --border:       rgba(196,181,253,0.12);
  --border-hover: rgba(168,85,247,0.45);

  --accent:        #A855F7;   /* fille/linie/glow/DUŻY tekst+UI */
  --accent-bright: #C4B5FD;   /* NOWY — tekst i małe labelki (~10:1) */
  --accent-dim:    #C084FC;
  --accent-glow:   rgba(168,85,247,0.18);

  --accent-2:      #E879F9;   /* górny stop folii, nigdy solo-tekst */
  --accent-2-glow: rgba(232,121,249,0.15);

  --holo-cyan:     #22D3EE;   /* WYŁĄCZNIE sheen krawędzi, NIGDY tekst */
  --holo-indigo:   #818CF8;

  --gradient-foil:   conic-gradient(from 0deg, #E879F9, #C084FC, #818CF8, #22D3EE, #E879F9);
  --gradient-aurora: linear-gradient(120deg, #E879F9 0%, #A855F7 40%, #6366F1 70%, #22D3EE 100%);
  /* zachowaj NAZWĘ --gradient-aurora → CTA/Avatar/Navbar migrują bez zmiany nazw zmiennych */

  --text:        #F5F3FF;
  --text-muted:  #A29DB8;
  --text-subtle: #443E5C;

  --glass-solid: rgba(16,14,26,0.82);

  --font-display: var(--font-space-grotesk), var(--font-geist-sans), system-ui, sans-serif;
}
```
Globalne reguły z cyan (przemaluj tu, bo globalne): `:focus-visible` → `outline: 2px solid var(--accent)` + `box-shadow: 0 0 0 4px rgba(168,85,247,0.20)`; `::selection` → `background: var(--accent-glow); color: var(--accent-bright)`; scrollbar hover → `var(--accent)`.
Sekcyjne (`nav-cta-shimmer`, `nav-glow`, `anchor-pulse`, `tech-rim`, l. 174–291) ZOSTAW — known-debt w PR #66.

### tailwind.config.ts → theme.extend (zastąp l. 11–27)
```ts
colors: {
  accent:"#A855F7","accent-bright":"#C4B5FD","accent-dim":"#C084FC","accent-2":"#E879F9",
  "holo-cyan":"#22D3EE","holo-indigo":"#818CF8",
  "bg-base":"#08070D","bg-surface":"#100E1A","bg-elevated":"#191527",
},
fontFamily: {
  sans:["var(--font-geist-sans)","system-ui","sans-serif"],
  mono:["var(--font-geist-mono)","monospace"],
  display:["var(--font-space-grotesk)","var(--font-geist-sans)","sans-serif"],
},
boxShadow: {
  accent:"0 0 30px rgba(168,85,247,0.22)","accent-lg":"0 0 60px rgba(168,85,247,0.28)","accent-2":"0 0 30px rgba(232,121,249,0.18)",
},
```

## 1.2 Globalne tło — aurora cyan → holo-folia
Koncept: near-black obsydian + miękka iryzacja (refleks folii), świeci góra-środek (za Hero), gaśnie w dół.
Architektura: NOWY kliencki `HoloBackdrop` w `layout.tsx` obok `CursorSpotlight` (fixed, -z-10) — NIE `body::before/after` (foil musi być rotowany transformem GPU + reagować na kursor).

Warstwy (od tyłu):
- **L0 mesh blobs** (przeniesione z Hero, przemalowane): A fuchsia `rgba(232,121,249,0.14)` lewa-góra; B indigo `rgba(129,140,248,0.12)` prawa; C purple `rgba(168,85,247,0.10)` dół-środek. blur 96px; drift ±30–40px, 18–22s ease-in-out.
- **L1 conic foil** (rdzeń): 160vmax², top35% left50% translate(-50%,-50%); `background: var(--gradient-foil)`; `filter: blur(80px)`; `mix-blend-mode: screen`; `opacity: 0.12` (Hero podbija do .18); mask `radial-gradient(ellipse 60% 55% at 50% 38%, #000 0%,#000 30%,transparent 72%)`; `transform: rotate(var(--foil-rot))`.
  - dryf: `--foil-rot` +0.6°/s (~600s pełny obrót).
  - hue-shift kursor: `+ spring(mouseX×10°)` globalnie (Hero ±18°), spring {stiffness:60,damping:20}. Jeden rAF, MotionValue, zero re-renderów.
- **L2 grain**: zostaje `body::before`, opacity .03 → .04 (maskuje banding folii).
- **L3 ambient beam**: przemaluj `body::after` → `radial-gradient(ellipse 60% 50% at 50% 30%, rgba(232,121,249,0.07),transparent 60%), radial-gradient(ellipse 55% 45% at 62% 22%, rgba(129,140,248,0.05),transparent 55%)`. Mobile analogicznie opacity .06/.04.

z-index/blend: `body → L0 → L1(screen) → L3 → L2(grain)`, wszystko z:-10..0 pointer-events:none. Treść z:10, każdy blok tekstu na glass-solid.

reduced-motion: L0 statyczne; L1 zamrożone na `rotate(-24deg)`, zero dryfu/kursora; L3/L2 statyczne. Pełna estetyka, zero ruchu.
touch/coarse: brak hue-shift; zostaje powolny dryf (lub 0 dla baterii). CursorSpotlight sam gaśnie na `(hover:none)`.
Wydajność: rotacja transformem (NIE animowany conic-angle/background-position — repaint 160vmax drogi). `will-change:transform` tylko L1. mix-blend:screen max 2 elementy. R3F shader NIE w fundamencie.

## 1.3 Typografia — Space Grotesk (display) TAK, Geist na body
Powód: Geist neutralny = „brak decyzji" pod holo; Space Grotesk geometryczny „trzyma" RGB-split (cienki humanist mętnieje pod aberracją). Koszt min: next/font self-host, subset latin ~30–45KB, zero CLS.
```ts
import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ variable:"--font-space-grotesk", subsets:["latin"], weight:["500","600","700"], display:"swap" });
// <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ...`}>
```
Stosować TYLKO na nagłówki/display, nigdy body.
Napięcie scramble↔proporcjonalny: H1 dziś Geist Mono (scramble bez skakania). Rozwiązanie **sizing-twin**:
```
<h1 style="display:grid">
  <span aria-hidden style="visibility:hidden;grid-area:1/1">{name}</span>   // rezerwuje finalną szerokość
  <span aria-hidden style="grid-area:1/1">{scrambledName}</span>            // animowana
  <span class="sr-only">{name}</span>                                       // czytnik
</h1>
```
Wariant prostszy (fallback): H1 zostaje Geist Mono, Space Grotesk tylko eyebrow/SectionHeader (słabsze — mono pod folią „terminalowe").

## 1.4 Glass-solid (warunek a11y — tekst nigdy na gołej folii)
```css
.glass-solid {
  background:
    linear-gradient(180deg, rgba(196,181,253,0.05), rgba(196,181,253,0.015)),
    var(--glass-solid);                 /* rgba(16,14,26,0.82) */
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid var(--border);
  border-radius: 1rem;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 40px rgba(8,7,13,0.6);
}
```
Krycie 0.82 policzone: przy .82 `--text` ~6:1, `--text-muted` ~6.5:1 nad najjaśniejszą folią (AA z zapasem); v2-owe .55 dawało muted ~2.6:1 = fail. Foil trzymamy nisko (.12), więc tło za szkłem ciemne.
Edge-sheen (opcjonalnie): `--holo-cyan/--holo-indigo` TYLKO jako 1px conic-border (technika `tech-rim`) — jedyne dozwolone użycie holo-cyan.

---

# CZĘŚĆ 2 — HERO (signature showpiece)

## 2.1 Koncept
„Wejście przez holograficzną folię." Imię wyłania się scramblem i żyje: folia hue-shift pod kursorem, nagłówek pulsuje aberracją przy velocity, co ~6s pryzmatyczny beam. Avatar-blob + tech-marquee zostają, ubrane w fiolet. Jeden bohater: imię + folia.

## 2.2 Layout
Desktop (lg): bez rewolucji układu (max-w-6xl, 2 kolumny justify-between gap16, tekst lewo/avatar prawo). NOWOŚĆ: **legibility-scrim** pod tekstem — `radial-gradient(ellipse 70% 80% at 30% 50%, rgba(8,7,13,0.55),transparent 70%)` blur(40px). Kolejność lewej kolumny: eyebrow(title)→H1(name)→marquee→CTA.
Mobile: kolumnowo wyśrodkowane; foil opacity .12→.10, maska `at 50% 28%`; beam off <md; scrim `at 50% 42%`.
Hero NIE dubluje HoloBackdrop — używa go + dokłada: podbicie foila (~.18), beam-sweep, mocniejszy hue-shift (±18°). Realizacja: `<HoloBackdrop scope="hero" intensity={1.5} beam />` lub lokalny overlay-foil opacity .06 screen.

## 2.3 Signature #1 — hue-shift folii (MotionValue)
`rotateFoil = drift(t) + spring(mouseX × 18°)`, spring {stiffness:60,damping:20,mass:1} („ciężka folia"). transform-origin 50% 38%. mousemove pasywny, zero setState.

## 2.4 Signature #2 — aberracja chromatyczna H1 (RGB-split 0→2px, warstwowo, bez SVG)
```
<span class="holo-h1" style="position:relative;color:var(--text)">
  {scrambledName}
  <span aria-hidden class="ab ab--f">{scrambledName}</span>   // ghost fuchsia
  <span aria-hidden class="ab ab--c">{scrambledName}</span>   // ghost cyan
</span>
```
```css
.ab{position:absolute;inset:0;mix-blend-mode:screen;pointer-events:none}
.ab--f{color:#E879F9;transform:translateX(calc(var(--split)*-1));opacity:.7}
.ab--c{color:#22D3EE;transform:translateX(var(--split));opacity:.7}
```
A11y: czytelność niesie BAZA `--text` (#F5F3FF); ghosty to dekoracyjny `aria-hidden` sheen (legalne użycie #22D3EE — krawędź, nie tekst).
`--split`: MotionValue z velocity (`useVelocity(scrollY)` + prędkość kursora nad H1), map |v|→0..2px, `useSpring({stiffness:300,damping:30})`, auto-powrót do 0. Spoczynek = ostre imię. Clamp 2px.
Premium (opcjonalnie, desktop-only, 1 element): SVG `feDisplacementMap` na hover — domyślnie warstwowy (tańszy).
Baza H1: **A (rekom.)** near-white `--text`. B (dozwolona): `linear-gradient(120deg,#E879F9,#C4B5FD 50%,#818CF8)` clip-text (bez cyan, ≥5:1).

## 2.5 Signature #3 — pryzmatyczny beam-sweep (~6s)
Element absolute h140% w28% top-20% left0; `background: var(--gradient-aurora)`; blur(28px); mix-blend:screen; `transform: rotate(14deg) translateX(...)`. Ruch: translateX(-40vw→140vw) + opacity 0→.5→0, 6s, `cubic-bezier(0.16,1,0.3,1)`, repeat Infinity, repeatDelay 4. z:1 pod tekstem (z:10). Framer loop.

## 2.6 AvatarMorph (tylko kolory, mechanika 1:1)
Aurora-glow (126–127): `linear-gradient(135deg, rgba(232,121,249,0.55), rgba(129,140,248,0.55))`. Border blobu (140): `2px solid rgba(196,181,253,0.28)`. Opcjonalny conic edge-sheen (`--gradient-foil`, mask jak tech-rim) rotujący 8s — jedyne holo-cyan na avatarze (krawędź). reduced: sheen statyczny.

## 2.7 Tech-marquee (kolory)
MUTED (l. 62) `[100,116,139]` → `[130,125,155]` (~#827D9B). Kolory brandów ZOSTAJĄ (rozpoznawalne, przełamują monochromię). Maska bez zmian. reduced: statyczne w pełnym brandzie.

## 2.8 Wartości ruchu (język B)
Easing wejść: `cubic-bezier(0.16,1,0.3,1)` (zmień `fadeUp` l. 48–55 z [0.22,1,0.36,1]). Wejścia: opacity0→1, y24→0, **scale .97→1**, duration .6s, stagger 70ms (custom:i×0.07). Springy interakcji: {stiffness:260,damping:20} (magnet CTA — podbij 180/16 z l.213). Hue-shift: {60,20}. Scramble: startDelay 1900, duration 1400 (bez zmian). Avatar entrance: delay .4, duration .7, ease [0.16,1,0.3,1].

## 2.9 reduced-motion (Hero)
Foil statyczny kadr; zero hue-shift. `--split`=0 (imię ostre, ghosty opacity0/niemontowane). Beam NIE renderować. Scramble → finalne imię od razu (hook już respektuje). Avatar tilt/auto-swap/blob off. Marquee statyczne. Efekt: pełna estetyka, zero pętli.

## 2.10 pointer:coarse / touch (Hero)
Hue-shift off; foil dryfuje. `--split` tylko z `useVelocity(scrollY)` (subtelny split przy szybkim scrollu). Beam off <md. Magnet CTA off (zostaje :active press). Avatar tilt off; auto-swap 6s = dotykowy odpowiednik hovera.

## 2.11 Biblioteki + wydajność
CSS: foil/mask/grain/beam/glass-solid. Framer: wejścia, magnet, hue-shift/split (MotionValue+useSpring+useVelocity), beam loop, avatar. GSAP: nie w Hero. R3F: opcjonalny iridescent shader zamiast CSS-foila — TYLKO lazy (next/dynamic ssr:false) + fallback, desktop+!coarse+!reduced. **NIE w tym issue.** will-change:transform (L1+beam), mix-blend max 2 elementy, avatar size prop + H1 sizing-twin = zero CLS. Cel Lighthouse 100.

## 2.12 Struktura Hero (pseudokod)
```
<section id="hero" aria-labelledby="hero-heading" class="relative min-h-screen">
  <HoloBackdrop scope="hero" intensity={1.5} beam />     {/* aria-hidden */}
  <div class="hero-scrim" aria-hidden />
  <div class="content max-w-6xl lg:flex-row">
    <div class="text-col">
      <motion.p custom={0} variants={fadeUp}>{title}</motion.p>            {/* eyebrow, --accent-bright */}
      <motion.h1 id="hero-heading" custom={1} variants={fadeUp} class="font-display">
        <span class="sr-only">{name}</span>
        <span aria-hidden class="twin">{name}</span>                        {/* sizing-twin */}
        <span aria-hidden class="holo-h1">
          {scrambledName}
          <span class="ab ab--f">{scrambledName}</span>
          <span class="ab ab--c">{scrambledName}</span>
        </span>
      </motion.h1>
      <motion.div custom={2} variants={fadeUp}><TechMarquee /></motion.div>
      <motion.div custom={3} variants={fadeUp} class="cta-row">
        <MagneticButton href="#projects" bg=var(--gradient-aurora) color=var(--bg-base)>Zobacz projekty</MagneticButton>
        <MagneticButton href="#contact" ghost>Kontakt</MagneticButton>
      </motion.div>
    </div>
    <motion.div class="avatar-col"><AvatarMorph pro hacker size={avatarSize} /></motion.div>
  </div>
  <ScrollIndicator />
</section>
```

## 2.13 A11y (Hero, konkret)
Kontrast: H1 baza `--text` ~18:1 na bg / ~6:1 na foilu przez scrim. Eyebrow/labelki `--accent-bright` ~10:1. CTA-1 tekst `--bg-base` na jasnym gradiencie (duży, bold, ≥4.5:1). CTA-2 `--accent-bright` ≥7:1. `--text-muted` tylko na glass-solid. `#22D3EE` tylko ghost/edge-sheen, nigdy tekst.
Focus: globalny `:focus-visible` (fiolet) na obu CTA + scroll link. Alt/aria: H1 sr-only + aria-label; ghosty/twin aria-hidden; foil/beam/scrim/marquee aria-hidden; avatar alt `"${name} — ${title}"`. Tab: CTA1→CTA2. Motion safety: 3 signature moments mają reduced (2.9) + coarse (2.10).

---

## Decyzje sporne (rekomendacje agenta)
1. Space Grotesk display TAK + sizing-twin dla scramble.
2. Foil transform-rotate (NIE conic-angle/bg-position) — identyczny efekt, taniej.
3. Baza H1 near-white (NIE rainbow-fill) — legibilność + cyan nigdy tekst.
4. R3F shader odłożony (CSS-foil wystarcza).
5. Glass-solid 0.82 (nie 0.55) — warunek AA muted-text nad folią.
6. Beam repeatDelay 4s (nie non-stop).

## Pliki wdrożenia
- `src/app/globals.css` — :root (6–36), :focus-visible (49–53), ::selection (96–99), scrollbar (105), grain (85–93), ambient-beam (128–165); + util `.glass-solid`, `.holo-h1/.ab`.
- `tailwind.config.ts` — colors/fontFamily.display/boxShadow (11–27).
- `src/app/layout.tsx` — Space_Grotesk (10–18), body className (68), montaż `<HoloBackdrop/>` (71).
- `src/components/features/Hero.tsx` — foil/scrim/beam, fadeUp (48–55), H1 sizing-twin+aberracja (306–328), marquee MUTED (62), magnet spring (213).
- `src/components/ui/AvatarMorph.tsx` — glow/border (126–140), opcjonalny edge-sheen.
- `src/components/ui/CursorSpotlight.tsx` — `var(--accent-glow)` (34) migruje automatycznie.
- NOWY `src/components/ui/HoloBackdrop.tsx` — L0–L1 + hue-shift.

**Known-debt PR #66:** sekcyjne cyany (`nav-cta-shimmer`, `nav-glow`, `anchor-pulse`, `tech-rim`, globals.css 174–291) zostają — migrują w issue swoich sekcji, po fundamencie będą jeszcze świecić cyanem.
