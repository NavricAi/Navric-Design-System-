# Navric Marketing — UI Kit

High-fidelity recreation of the **Navric marketing site** in the Navric brand direction. Restyled from the `Axesntra-` landing page / navbar / footer source into the Navric language: indigo accent, navy footer + CTA, Geist type, restrained dotted-grid texture, one calm dark moment.

Open `index.html` — a single scrollable marketing page.

## Sections / components

| File | Exports | Notes |
|---|---|---|
| `MarketShell.jsx` | `Navbar`, `Footer`, `MIcon` | Sticky translucent nav (blur), navy footer with link columns + tagline. |
| `MarketPage.jsx` | `Hero`, `Features`, `Pricing`, `CTA` | `Hero` embeds a live **product preview** (a real carrier verdict card) so the value is legible above the fold. |

## Conventions

- **One restrained dark moment** — the footer and the closing CTA use Navy `#0B1437` with a faint dotted texture. No purple-on-white gradients anywhere.
- Severity color appears only inside the product-preview card (where it carries a real verdict), never as marketing decoration.
- Indigo is the only accent: primary buttons, the "Popular" pricing flag, feature icon chips, links-on-hover.
- Responsive: collapses to a single column under 860px (`.hero-grid`, `.feat-grid`, `.price-grid`), desktop nav swaps to a hamburger.
- Cosmetic recreation for prototyping — links are stubbed.
