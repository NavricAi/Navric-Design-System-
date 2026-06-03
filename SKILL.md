---
name: navric-design
description: Use this skill to generate well-branded interfaces and assets for Navric, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a carrier risk intelligence platform.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What's here

- `README.md` — product context, the seven hard rules, content + visual foundations, iconography, sources.
- `colors_and_type.css` — all design tokens (CSS vars). Link it and scope a root with `class="navric"`. Light + dark.
- `assets/` — logos (`navric-logo.svg`, `-dark.svg`, `navric-mark.svg`).
- `screens/Carrier Risk Profile.html` — the canonical screen; the best reference for tone, density, and severity handling.
- `ui_kits/navric-platform/` — the app (dashboard, inspections, assistant) as React/JSX components.
- `ui_kits/navric-marketing/` — the marketing site (navbar, hero, pricing, footer).
- `preview/` — small design-system spec cards.

## The non-negotiables (read before designing)

1. Severity is always **color + icon + text label** together — never color alone. Must read in grayscale.
2. Severity color appears **only where it carries a decision** (a score, a flagged row, a verdict). Never as decoration, never behind charts or panels.
3. **No celebration near risk** — nothing cheerful, warm, or animated where a risk finding is the subject.
4. **No visible "AI" badges or sparkle icons.** The executive summary is just *there*, unlabeled, like autocomplete.
5. **One primary action per screen** (indigo). Everything else is secondary or behind disclosure.
6. Stay buildable in **Tailwind + shadcn/ui + Tremor (Recharts)**.
7. **No cockpit density by default** — surface what matters for the decision; push detail behind disclosure.

## Quick start

- **Navy ink `#15205A`** is the only accent (token `--indigo`, name kept for compat). Navy `#0B1437` for chrome/dark ground. Teal `#14B8A6` ONLY for "improving" trend.
- Severity: Low `#16A34A` (shield-check) · Moderate `#D97706` (info) · Elevated `#EA580C` (triangle-alert) · Severe `#DC2626` (octagon-alert).
- Type: **Geist** + **Geist Mono** (all numerics, tabular figures). Icons: **Lucide**.
- Soft corners (cards 12–16px, never pill), hairline borders, soft ambient shadows, fast calm motion (120–260ms, no bounce).
- Copy: senior risk-analyst voice. Verdict first. Numbers are specific and tabular. No hype, no emoji.
