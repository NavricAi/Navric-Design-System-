# Navric — Design System

**Navric** is a carrier risk intelligence platform. Insurance underwriters, freight brokers, and fleet safety managers use it to **screen and monitor trucking companies** using FMCSA safety data. It scores each carrier across five risk dimensions (Maintenance, Driver, Crash, Admin, Hazmat) and generates an executive summary. It is a **decision-critical, trust-heavy B2B tool** used in long, focused sessions — not a consumer app.

> **A note on naming.** The source codebase ships under the working name **"Axesntra"**. This design system is the **Navric** brand direction that supersedes it: same product and data model, refined visual language (Navric logo, indigo accent, Geist type, navy chrome, the disciplined severity ramp described below). Where this doc says "the codebase," it means the Axesntra source; where it says "Navric," it means the intended brand.

## Design north star

Calm, AI-native operations intelligence. We borrow from three references:

- **Linear** — restraint, speed, keyboard-first, a single signature accent.
- **Sana** — soft premium surfaces, generous whitespace, invisible AI.
- **Samsara** — clean competence with dense fleet data.

Light-default theme, with **dark as a real first-class theme**. A quiet neutral canvas where **only two things are allowed to draw the eye: risk-severity color, and one accent (Navy ink).**

### The seven hard rules (non-negotiable)

1. **Severity is always three signals together: color + icon + text label.** Never color alone. A "Severe" score must read as severe even in grayscale.
2. **Severity color appears only where it carries a decision** — a score, a flagged row, a badge, a verdict. Never as decoration, never behind charts or panels.
3. **No celebration near risk.** Nothing cheerful, animated, or warm anywhere a risk finding is the subject. The gravity is the design.
4. **No visible "AI" badges or sparkle icons.** The executive summary is just *there*, like autocomplete — not gated behind a "Generate" button or labeled as AI output.
5. **One primary action per screen.** Everything else is secondary or hidden behind disclosure.
6. **Implementable in Tailwind + shadcn/ui + Tremor (Recharts).** Stay within what those can build.
7. **No cockpit density by default** — surface what matters for a screening decision; let detail (raw inspections, score math, methodology) live behind disclosure.

---

## Sources

This system was reverse-engineered from materials the user provided. **You may not have access** — they are recorded here so you can dig deeper if you do.

- **GitHub:** [`Navric-AI/Axesntra-`](https://github.com/Navric-AI/Axesntra-) — the production Next.js 14 app (App Router, Tailwind, shadcn/ui, Radix, Recharts, lucide-react, Framer Motion, Anthropic SDK). Explore this repo to build higher-fidelity Navric designs:
  - `app/carrier/[usdot]/page.tsx` — the carrier risk profile (basis for our primary screen).
  - `components/platform/*` — the Platform app shell (`left-nav`, `home-page`, `score-badge`, `sparkline`, BASIC category pages, AI chat).
  - `components/landing-page.tsx`, `navbar.tsx`, `footer.tsx` — the marketing site.
  - `lib/types.ts`, `lib/risk-utils.ts`, `app/globals.css`, `tailwind.config.ts` — the data model + token source of truth.
- **`uploads/navric_highway_hifi.html`** — the Navric logo lockup (highway vanishing-point mark + wordmark) in four colorways. Source for `assets/navric-logo*.svg`.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — product context + brand guidelines. |
| `colors_and_type.css` | All design tokens (CSS vars): brand, severity ramp, neutrals, radius, elevation, motion, type scale. Light + dark. |
| `SKILL.md` | Agent Skill manifest — makes this folder usable as a Claude Skill. |
| `assets/` | Logo (`navric-logo.svg`, `-dark.svg`, `navric-mark.svg`). |
| `preview/` | Design-system cards (swatches, type specimens, component states) shown in the Design System tab. |
| `screens/Carrier Risk Profile.html` | **Primary deliverable** — the carrier risk profile screen, light + dark. |
| `ui_kits/navric-platform/` | UI kit for the Platform app (dashboard, carrier profile, left-nav, AI assistant, components). |
| `ui_kits/navric-marketing/` | UI kit for the marketing site (navbar, hero, pricing, footer). |

---

## CONTENT FUNDAMENTALS

**Voice: a senior risk analyst briefing a decision-maker.** Precise, declarative, sourced. Never breathless, never reassuring for its own sake. The product's authority comes from being *exact*, so copy commits to specifics.

- **Person.** Talk *about the carrier* in the third person ("Sunbelt's elevated profile is driven primarily by maintenance…"). Address the user as "you" only in instructional/marketing contexts. The product rarely says "I" or "we" inside the app.
- **Casing.** Sentence case for headings and body. **Title Case only for proper nouns and fixed labels**: BASIC category names ("Vehicle Maintenance," "Hours of Service"), risk levels ("Elevated," "Severe"), product nouns ("Fleet Dashboard," "Watchlist"). Eyebrow/section labels are **UPPERCASE with letter-spacing** ("OUT-OF-SERVICE RATES," "NEEDS ATTENTION").
- **Numbers are first-class.** Always specific and tabular: `82`, `USDOT 2143875`, `23.4%`, `+8.1 over threshold`, `4 days ago`. Deltas carry sign and unit (`+4.2 pts`, `-1.1%`). Never "high" when a number exists.
- **The verdict leads.** State the conclusion first ("Elevated risk"), then the driver, then the secondary factors, then the all-clear. Mirrors how an analyst reads it.
- **No hedging, no hype.** No "amazing," "powerful," "revolutionary." No exclamation marks anywhere near a risk finding. Confidence is expressed as data ("Confidence: High · data updated 4 days ago"), not adjectives.
- **AI is invisible.** The executive summary reads like a colleague's note — no "✨ AI-generated," no "Powered by Claude." Methodology and "what drove this score" are available on disclosure, never as a brag.
- **Disclaimers are plain and honest.** "This is NOT an official FMCSA safety rating / a legal opinion / an underwriting decision." Trust is earned by saying what the tool *isn't*.

**Example copy (from the real product):**
> *"Sunbelt's elevated profile is driven primarily by maintenance: vehicle out-of-service rates have climbed for three consecutive quarters and now sit well above the national average. Driver hours-of-service violations are a secondary concern; crash and administrative signals are within normal range."*

**Emoji: never.** This is a risk product. No emoji, anywhere.

---

## VISUAL FOUNDATIONS

**Overall feel.** A near-white, slate-neutral canvas carrying mostly hairline-bordered white cards. Depth comes from *layered surfaces and 1px borders*, not drop shadows. Color is scarce and deliberate: indigo for the one action and for focus; a four-step severity ramp only where a decision lives; teal reserved exclusively for an improving trend. The result reads as quiet, exact, and serious.

### Color
- **Accent — Navy ink `#15205A`.** The *only* accent (token: `--indigo`, kept for code-compat). Primary buttons, active nav, focus rings, the logo's road-dashes, key links. Hover `#0B1437`, active `#060C20`. In dark theme it lifts to `#3A4A7A`/`#4A5C92` for contrast. This replaces the original Indigo `#4F46E5` — the accent is now **achromatic ink** so that severity color is the only hue on the screen. Indigo, Cobalt, and Graphite remain available as a live Tweak on the Carrier Risk Profile screen.
- **Chrome — Navy `#0B1437`.** Deep ground for dark surfaces and the dark theme's canvas family (`#070B1C` → `#0E1533` → `#141C3D`).
- **Severity ramp (decision color only):** Low `#16A34A` → Moderate `#D97706` → Elevated `#EA580C` → Severe `#DC2626`. Each travels as a *triplet* — solid hue + 50-tint background + 200-tint border — plus a mandatory icon and text label. (See ICONOGRAPHY for the icon mapping.) This is a deliberately accessible ramp: green and red sit at opposite ends, the two middle warnings are distinguished by *icon and label*, not hue alone, so the ramp survives grayscale and color-blindness.
- **Teal `#14B8A6`.** *Only* for "improving" trend, so it never competes with risk color.
- **Neutrals (light):** canvas `#F8FAFC`, surface `#FFFFFF`, sunken `#F1F5F9`, hairline border `#E2E8F0`. Text `#0F172A` / `#475569` / `#94A3B8` (fg1/fg2/fg3).

### Type
- **Geist** (sans) for everything; **Geist Mono** for all numerics, IDs, codes, percentages — always `font-variant-numeric: tabular-nums` so figures align in columns and don't jump as they change. *(Confirmed as the Navric typeface — reviewed against IBM Plex and Hanken Grotesk; Geist won for being the most neutral, so severity color stays the loudest thing on screen. Loaded from Google Fonts, which is fine for prototyping; self-host the `.woff2` for production if you want offline/perf control.)*
- **Scale:** Display 40/44 · H1 30/36 · H2 22/28 · H3 17/24 · Body 14/22 (16/26 for long-form) · Small 13 · Caption/label 12 uppercase +0.08em. Headings use `-0.02em` tracking. Weights: 300 (logo only), 400 body, 500 labels/UI, 600 headings/emphasis, 700 sparingly.

### Spacing & layout
- **4px base grid.** Common steps: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48. Card padding 20–24px. Section gaps 24px.
- Content max-width ~1200px in the app; comfortable gutters. Generous whitespace over density (rule 7).

### Backgrounds
- Flat neutral fills. **No gradients on content surfaces.** The marketing site permits one restrained dark hero and a subtle dotted grid (`radial-gradient` dot texture). **Never** a purple-on-white SaaS gradient. **Never** color behind a chart or panel.

### Corner radii
- Soft, never pill. Buttons/inputs `8px`, cards `12–16px`, large panels `16–20px`. Full-round (`9999px`) is reserved for **status dots and small pill badges only** — never for buttons or cards.

### Cards
- White surface, **1px `#E2E8F0` border**, `12–16px` radius, `--shadow-sm` or `--shadow-ambient` (a soft slate-tinted glow), 20–24px padding. A flagged card may carry a severity **left accent + tinted background**, but only when the card *is* a risk finding.

### Elevation / shadows
- A short ramp: `xs` (1px), `sm` (2-layer hairline), `ambient` (soft slate glow `0 4px 20px rgba(100,116,139,.06)`), `md` (hover/popover), `pop` (dialogs). Borders do most of the work; shadows are a whisper. No hard, dark, offset drop shadows.

### Motion
- **Fast and calm — no bounce.** Durations 120/180/260ms; easing `cubic-bezier(.2,0,0,1)`. Fades and 4–8px rises for entrances; layout-id slides for the active-nav indicator. `prefers-reduced-motion` respected. Nothing loops or celebrates near a risk finding (rule 3).

### Interaction states
- **Hover:** surfaces shift to `--surface-hover` / a faint ink or slate wash; borders darken one step (`#E2E8F0`→`#CBD5E1`); cards may gain `--shadow-md`. Primary button → `--indigo-hover`.
- **Press:** subtle `scale(.98)` on buttons + active ink; no color flash.
- **Focus:** always a visible `0 0 0 3px rgba(21,32,90,.28)` ink ring (rule: keyboard-first).
- **Selected/active nav:** ink text on `--indigo-tint` background.

### Transparency & blur
- Sparingly. The marketing navbar uses `bg-white/80 + backdrop-blur`. Sticky bars may use a translucent surface. Inside the app, surfaces are opaque — clarity over flourish.

### Imagery
- The app is essentially imageless — it is data. Marketing uses cool, desaturated, slightly technical photography/renders (fleet, logistics, dark dashboards). Cool > warm; no warm filters, no stock-smile photography.

---

## ICONOGRAPHY

**System: [Lucide](https://lucide.dev).** The codebase uses `lucide-react` exclusively, so Lucide *is* the Navric icon language. In static HTML, load it from CDN and call `lucide.createIcons()`:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="truck"></i>
<script>lucide.createIcons();</script>
```

- **Style:** Lucide's outline, **1.5–2px stroke, no fill, round caps/joins.** Default `1.5`–`2` stroke-width at 16–20px. Icons inherit `currentColor` — they take the text color of their context, *not* a decorative color, except where they signal severity.
- **No sparkles, no "AI" iconography** (rule 4). The `Sparkles` icon exists in the codebase nav for the AI Assistant *label* only — never as a "this is AI" badge on generated content.
- **No emoji. No unicode glyphs as icons.** Lucide only. The one exception is the **middot `·`** used as a metadata separator in copy ("USDOT 2143875 · Laredo, TX · 48 power units").

### Severity icon mapping (the mandatory third signal)

Severity is **color + icon + label**, always. Each level has a fixed Lucide icon so it reads in grayscale:

| Level | Lucide icon | Meaning |
|---|---|---|
| **Low** | `shield-check` | within normal range |
| **Moderate** | `info` | worth noting |
| **Elevated** | `triangle-alert` | secondary concern |
| **Severe** | `octagon-alert` | primary driver / act now |

### Common app icons (from the codebase)

`layout-dashboard` (Dashboard) · `clipboard-list` (Inspections) · `sparkles` (AI Assistant label) · `truck` (power units / vehicle) · `users` (drivers) · `building-2` (carrier/authority) · `calendar` (dates/freshness) · `bell` (watchlist/track) · `search` · `download` (export PDF) · `trending-up` / `trending-down` / `minus` (deltas) · `shield` · `clock` (HoS) · `activity` · `chevron-left` / `chevron-right` / `chevron-down`.

### Logo

`assets/navric-logo.svg` (light), `assets/navric-logo-dark.svg` (dark), `assets/navric-mark.svg` (mark only — uses `currentColor` for the road edges so it tints to context). The mark is a **highway converging to a vanishing point**; the lane dashes and vanishing point are rendered in **indigo `#4F46E5`** — the same single accent, tying the logo to the system. Wordmark is set in a thin, wide-tracked grotesque (Geist 300, letter-spacing 11). Tagline: *RISK · INTELLIGENCE · COMPLIANCE*.
