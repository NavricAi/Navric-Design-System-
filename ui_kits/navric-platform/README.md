# Navric Platform — UI Kit

High-fidelity recreation of the **Navric Platform** (the carrier risk intelligence app), restyled from the `Axesntra-` source into the Navric brand direction (indigo accent, navy-grounded dark theme, Geist type, disciplined severity ramp).

Open `index.html`. It's an interactive click-through across three views, with a working light/dark toggle.

## Views

- **Fleet dashboard** (`Dashboard.jsx`) — the command surface. Navric Score gauge, *Needs attention* (flagged BASICs with sparklines), an inline **Safety briefing** (note the executive summary is *unlabeled* — no "AI" badge, no sparkle, per the brand rules), the 8 FMCSA **BASIC category** cards (score + threshold + 7-pt trend), and Out-of-service rates vs national.
- **Inspections** (`Inspections.jsx`) — roadside inspection table with severity flags and out-of-service callouts.
- **Assistant** (`Assistant.jsx`) — a calm, grounded chat over the carrier's data. Suggested prompts, composer, demo responses. Deliberately quiet — no sparkle iconography.

## Components

| File | Exports |
|---|---|
| `platform-data.js` | `window.NAVRIC` — carrier, BASICs, dimensions, OOS, inspections + severity/sparkline helpers. |
| `Shared.jsx` | `Icon` (Lucide wrapper), `Sparkline`, `SevBadge` (the color+icon+label triplet), `Track`. |
| `Shell.jsx` | `LeftNav`, `TopBar`, `CarrierContextBar`. |
| `Dashboard.jsx` | `Dashboard`, plus `Card`, `Eyebrow`. |
| `Inspections.jsx` | `Inspections`. |
| `Assistant.jsx` | `Assistant`. |

## Notes & conventions

- Severity color appears **only** where it carries a decision (a score, a flagged row, a verdict). Charts and panels are never tinted with risk color.
- All numerics use Geist Mono with tabular figures.
- Icons are Lucide, loaded from CDN; `lucide.createIcons()` runs after each React commit.
- Tokens come from `../../colors_and_type.css`. Theme switches via `data-theme="dark"` + `.dark` on `<html>`.
- This is a **cosmetic recreation** for prototyping — handlers are stubbed, data is mock. It is not production code.
