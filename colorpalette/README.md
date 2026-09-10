# Color Palette Generator

Multi-page tool to generate harmonious color palettes and export them in formats ready for dashboard workflows:
- Tableau (`.tps`)
- Power BI (`.json`)
- CSS Variables
- PNG/JPG (for PowerPoint and other tools with a color picker)

This project uses a simple stack:
- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript
- No backend

## Pages

- `index.html` — Main generator (harmony mode, lock swatch, dashboard preview, export)
- `image.html` — Extract dominant colors from an image (client-side K-means)
- `explore.html` — Curated palette gallery + filter/search + apply to generator
- `guide.html` — Guide for Tableau TPS and Power BI JSON export

## Key Features

- Generate 5 harmonious HSL-based colors
- Harmony modes: Random, Analogous, Complementary, Triadic, Monochromatic
- Seed input (hex or keyword preset)
- Lock/unlock swatches when regenerating
- Copy hex per swatch + toast feedback
- Live dashboard preview (light/dark)
- From-image color extraction (K-means in the browser)
- Explore curated palettes from JSON
- Export: TPS, JSON, CSS Variables, PNG, JPG

## File Structure

```txt
/
  index.html
  image.html
  explore.html
  guide.html
  style.css
  utils.js
  script-generator.js
  script-image.js
  script-explore.js
  palettes.json
  tasks.md
  qa-checklist.md
  README.md
```

## Running Locally

Use a local server (don't open via `file://`) so `fetch` to `palettes.json` works correctly.

Example:

```bash
python -m http.server 5500
```

Then open:

- `http://localhost:5500/index.html`

Note:
- `explore.html` has an offline fallback with sample palettes if fetch fails.

## Quick Start

1. Open **Generator** or **From Image**.
2. Prepare your palette (generate/manual/image).
3. Export as needed:
   - **Tableau**: `Export Tableau TPS`
   - **Power BI**: `Export Power BI JSON`
   - **Web**: `Copy CSS Variables`
   - **Slides/Design tools**: `Export PNG` / `Export JPG`

## Export Integration

### Tableau TPS

1. Download `palette.tps`.
2. Place or merge into:
   - `Documents/My Tableau Repository/Preferences/`
3. Restart Tableau.

### Power BI JSON Theme

1. Download `theme.json`.
2. In Power BI Desktop:
   - `View` → `Themes` → `Browse for themes`
3. Select the `theme.json` file.

## Technical Notes

- All image color processing runs client-side (Canvas + K-means), with no server upload.
- Swatch text contrast is determined by a luminance check (`isDark`).
- Palette state across pages is stored via `localStorage` and query params.

## Roadmap (brief)

- AI keyword generation (Phase 2)
- Save/share palette (requires backend)
- Advanced color details (RGB/HSL/CMYK)
- Additional preview templates
