# BikinDashboard Tools — Design Guide

Editorial, practical toolbox for data analysts and dashboard builders. Content-first, one accent color, no marketing gloss. Live specimen: `Design System.dc.html`. Product: `BikinDashboard.dc.html`.

## Principles
- One accent color, used with intent — not decoration.
- Borders and typography establish hierarchy before shadows or containers.
- Not everything is a card — reference content (Resource Hub, chart rows) lives in scannable list rows/tables.
- Icons stay consistent in construction and size across every context (CSS/SVG primitives only, one accent tone, varying opacity — never illustration).
- Active/selected state = weight + accent underline/border, never a filled pill.
- Avoid SaaS-marketing tropes: no gradients, glow, glassmorphism, huge hero, stat cards, "Get Started" CTAs.

## Typography
- **Poppins** (600/700) — headings, page titles, brand wordmark, eyebrows. Used sparingly.
- **Inter** (400/500/600) — everything else: body copy, labels, inputs, buttons, tables.
- Scale: display 50px/700 (hero only) · page title 24–26px/700 · section heading 15–17px/600 · body 13.5–15.5px/400 · caption/meta 11–12.5px.
- Tight leading on display type (1.06); 1.5–1.7 on body copy.

## Color
| Token | Hex | Use |
|---|---|---|
| Ink | `#14181F` | primary text |
| Ink soft | `#4B5563` | body/secondary text |
| Muted | `#9AA2B1` | captions, placeholders |
| Border | `#E4E7EC` | hairline borders/dividers |
| Background | `#FFFFFF` | page background |
| Background subtle | `#FAFBFC` | subtle panel fills, hover bg |
| Accent | `#2F5FB0` | links, active states, icons, primary buttons |
| Accent dark | `#1F3F82` | hover/active accent |
| Accent tint | `#EEF3FB` | icon tile fill, active chip fill |

Semantic (Data Quality / Resource Hub tag pills only): green `#15803D` (Gratis/Clean), amber `#B45309`/`#92400E` (Freemium/Missing), red `#B91C1C` (Berbayar).

## Spacing & radius
4px base rhythm (4/8/12/16/20/24/32...). Corner radius kept small and sharp: **3px** on cards/buttons/inputs, **2px** on small chips/badges/progress fills, `50%` only for true circles (dots, avatars). Never pill-shaped except true toggle-style controls.

## Layout
- Persistent left sidebar (236px, hairline right border), collapses to a horizontal top bar under 860px.
- Main content: single column, `max-width` per view (960–1080px), fluid below that.
- Tool discovery grid: `repeat(auto-fit, minmax(280px,1fr))` — self-contained cards (icon, title, description, meta, "Buka tool →"), never split across containers.
- Reference content (Chart Guide, Resource Hub) uses filter chips (tab-underline style, not pills) + either a card grid (Chart Guide, since visuals matter) or bordered list rows/cards with tag pills (Resource Hub).

## Components
- **Buttons/links**: outlined (border, no fill) for secondary actions; filled accent only for the single primary action per view (e.g. "Buat palet"); plain text + accent color + arrow for tertiary links. No pill buttons.
- **Tabs/filter chips**: underline-style (active = accent underline + bold text), not filled pills — used for category/family filters.
- **Icon tiles**: 38px (30–40px), 3px radius, accent-tint background, one accent-tone glyph built from CSS shapes or minimal SVG primitives (circles/rects/lines) — never illustration.
- **Tool card**: 1px border, 3px radius, no shadow at rest; hover = border darken + a barely-visible shadow (`0 1px 4px rgba(20,24,31,.05)`). Keyboard focus ring on the "Buka tool" link.
- **Tag pills** (Resource Hub / Data Quality status): bordered, 2px radius, text-colored by semantic meaning — no filled backgrounds.

## Pages (in `BikinDashboard.dc.html`)
1. **Beranda** — compact hero (search-first, "Populer" shortcut links, no CTA) → Tools card grid → Resource Hub preview.
2. **Tools** — search + category filter chips + full card grid.
3. **Chart Guide** — search + family filter chips + 16-chart card grid (mini CSS/SVG previews, expandable "use/avoid" notes).
4. **Resource Hub** — search + category chips + multi-select tag chips + reset, 28-link card grid with colored price tags.
5. **Color Palette** (sample tool) — scheme-mode generator, live swatches, real exports (Tableau TPS/Power BI JSON/PNG/JPG download, CSS clipboard copy), light/dark dashboard preview.
6. **Data Quality Checker** (sample tool) — real client-side CSV/XLSX parsing (SheetJS), dataset overview stats, column table + profile + histogram, data preview, duplicate detection.

## Not done yet / open
- Chart Recommender, Data Converter, SQL Query Visualizer, Dummy Dataset Generator, Portfolio Ideas, Cheatsheet Library, Paper/Book Library — future tools, intentionally not stubbed in nav per current scope.
- Data Quality Checker: XLSX support depends on the SheetJS CDN script staying reachable; no server-side fallback.
