const keywordHues = {
  ocean: 210, forest: 140, sunset: 25, rose: 350,
  lavender: 270, mint: 160, sand: 40, slate: 220
};

const modes = ["random", "analogous", "complementary", "triadic", "monochromatic"];
const modeLabels = {
  random: "Acak",
  analogous: "Analog",
  complementary: "Komplementer",
  triadic: "Triadik",
  monochromatic: "Monokromatik"
};
let activeMode = "random";
let previewTheme = "light";
let palette = ["#2563EB", "#0EA5E9", "#14B8A6", "#84CC16", "#F59E0B"];
let locked = [false, false, false, false, false];

const seedInput = document.getElementById("seedInput");
const paletteStage = document.getElementById("paletteStage");
const hexRow = document.getElementById("hexRow");

function randomIn(min, max) {
  return min + Math.random() * (max - min);
}

function buildHues(baseHue) {
  if (activeMode === "analogous") return Array.from({ length: 5 }, (_, i) => (baseHue + i * randomIn(20, 40)) % 360);
  if (activeMode === "complementary") return [baseHue, (baseHue + 180) % 360, (baseHue + 24) % 360, (baseHue + 204) % 360, (baseHue + 340) % 360];
  if (activeMode === "triadic") return [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360, (baseHue + 20) % 360, (baseHue + 140) % 360];
  if (activeMode === "monochromatic") return [baseHue, baseHue, baseHue, baseHue, baseHue];
  return Array.from({ length: 5 }, (_v, i) => (baseHue + i * randomIn(60, 120)) % 360);
}

function nextPalette(seedHex) {
  let baseHue = Math.random() * 360;
  let first = normalizeHex(seedHex);
  const text = (seedInput.value || "").trim().toLowerCase();
  if (first) {
    const r = parseInt(first.slice(1, 3), 16);
    const g = parseInt(first.slice(3, 5), 16);
    const b = parseInt(first.slice(5, 7), 16);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max === min) baseHue = 0;
    else if (max === r) baseHue = (60 * ((g - b) / (max - min)) + 360) % 360;
    else if (max === g) baseHue = 60 * ((b - r) / (max - min)) + 120;
    else baseHue = 60 * ((r - g) / (max - min)) + 240;
  } else if (keywordHues[text] !== undefined) {
    baseHue = keywordHues[text];
  }

  const hues = buildHues(baseHue);
  const generated = hues.map((_h, idx) => {
    const s = randomIn(55, 80);
    const l = activeMode === "monochromatic" ? 35 + idx * 8 : randomIn(45, 65);
    return hslToHex(hues[idx], s, l);
  });
  if (first) generated[0] = first;
  return generated;
}

function copyHex(hex) {
  copyToClipboard(hex, `Tidak bisa menyalin otomatis. Salin kode ini: ${hex}`).then((ok) => {
    if (ok) showToast(`${hex} disalin`);
  });
}

function renderModes() {
  const box = document.getElementById("harmonyModes");
  box.innerHTML = "";
  modes.forEach((mode) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-pressed", mode === activeMode ? "true" : "false");
    btn.className = `harmony-mode${mode === activeMode ? " is-active" : ""}`;
    btn.textContent = modeLabels[mode] || mode;
    btn.addEventListener("click", () => {
      activeMode = mode;
      renderModes();
    });
    box.appendChild(btn);
  });
}

function renderSwatches() {
  paletteStage.innerHTML = "";
  palette.forEach((hex, idx) => {
    const swatch = document.createElement("article");
    swatch.className = `swatch${locked[idx] ? " is-locked" : ""}`;
    swatch.style.background = hex;

    const fg = isDark(hex) ? "#FFFFFF" : "#0F172A";
    const overlay = document.createElement("div");
    overlay.className = "swatch-overlay";
    overlay.style.color = fg;
    overlay.innerHTML = `
      <div class="swatch-top">
        <span class="bd-mono">${locked[idx] ? "TERKUNCI" : ""}</span>
        <button type="button" aria-label="${locked[idx] ? "Buka kunci" : "Kunci warna"}" class="swatch-icon-btn">${locked[idx] ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v1"/></svg>'}</button>
      </div>
      <div class="swatch-bottom">
        <span class="bd-mono">${hex}</span>
        <button type="button" aria-label="Salin hex" class="swatch-icon-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button>
      </div>
    `;
    const [lockBtn, copyBtn] = overlay.querySelectorAll("button");
    lockBtn.addEventListener("click", () => {
      locked[idx] = !locked[idx];
      renderSwatches();
    });
    copyBtn.addEventListener("click", () => copyHex(hex));
    swatch.appendChild(overlay);
    paletteStage.appendChild(swatch);
  });
}

function renderHexChips() {
  hexRow.innerHTML = "";
  palette.forEach((hex) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hex-chip";
    btn.textContent = hex;
    btn.style.borderLeftColor = hex;
    btn.addEventListener("click", () => copyHex(hex));
    hexRow.appendChild(btn);
  });
}

function renderPreview() {
  const wrap = document.getElementById("dashboardPreview");
  const isDarkTheme = previewTheme === "dark";
  const bg = isDarkTheme ? "#0F172A" : "#FFFFFF";
  const card = isDarkTheme ? "#111827" : "#FFFFFF";
  const border = isDarkTheme ? "#334155" : "#E2E8F0";
  const track = isDarkTheme ? "#1E293B" : "#F1F5F9";
  const text = isDarkTheme ? "#F8FAFC" : "#0F172A";
  const muted = isDarkTheme ? "#94A3B8" : "#64748B";
  const ink = palette.map((color) => readableForeground(color));
  const trend = palette.map((color) => readablePaletteText(color, card));

  wrap.innerHTML = `
    <section class="preview-dashboard"
      style="--pv-bg:${bg};--pv-card:${card};--pv-border:${border};--pv-track:${track};--pv-text:${text};--pv-muted:${muted};--pv-c1:${palette[0]};--pv-c2:${palette[1]};--pv-c3:${palette[2]};--pv-c4:${palette[3]};--pv-c5:${palette[4]};--pv-c1-ink:${ink[0]};--pv-c4-ink:${ink[3]};--pv-c5-ink:${ink[4]};">
      <header class="preview-navbar">
        <div class="preview-brand">Dashboard pendapatan</div>
        <div class="preview-navdots"><span></span><span></span><span></span></div>
      </header>

      <div class="preview-body">
        <section class="preview-kpis">
          <article class="preview-kpi" style="--accent:${palette[1]}">
            <div class="preview-kpi-label">Penjualan bulanan</div>
            <div class="preview-kpi-value">Rp2,4M</div>
          </article>
          <article class="preview-kpi" style="--accent:${palette[2]}">
            <div class="preview-kpi-label">Margin kotor</div>
            <div class="preview-kpi-value">42,7%</div>
          </article>
          <article class="preview-kpi" style="--accent:${palette[3]}">
            <div class="preview-kpi-label">Retensi</div>
            <div class="preview-kpi-value">89.3%</div>
          </article>
        </section>

        <section class="preview-grid">
          <article class="preview-panel">
            <div class="preview-panel-title">Komposisi kanal penjualan</div>
            <div class="preview-bars">
              <div class="preview-bar-row">
                <label>Organik</label>
                <div class="preview-bar-track"><div class="preview-bar-fill" style="width:72%;background:${palette[1]}"></div></div>
                <span>72%</span>
              </div>
              <div class="preview-bar-row">
                <label>Iklan</label>
                <div class="preview-bar-track"><div class="preview-bar-fill" style="width:48%;background:${palette[2]}"></div></div>
                <span>48%</span>
              </div>
              <div class="preview-bar-row">
                <label>Mitra</label>
                <div class="preview-bar-track"><div class="preview-bar-fill" style="width:29%;background:${palette[3]}"></div></div>
                <span>29%</span>
              </div>
            </div>
          </article>

          <article class="preview-panel">
            <div class="preview-panel-title">Kontribusi wilayah</div>
            <div class="preview-donut"></div>
            <div class="preview-donut-legend">
              <div class="preview-legend-item"><span><i style="background:${palette[1]}"></i>Barat</span><strong>38%</strong></div>
              <div class="preview-legend-item"><span><i style="background:${palette[2]}"></i>Pusat</span><strong>28%</strong></div>
              <div class="preview-legend-item"><span><i style="background:${palette[3]}"></i>Timur</span><strong>18%</strong></div>
              <div class="preview-legend-item"><span><i style="background:${palette[4]}"></i>Lainnya</span><strong>16%</strong></div>
            </div>
          </article>
        </section>

        <section class="preview-bottom">
          <article class="preview-panel">
            <div class="preview-panel-title">Produk teratas</div>
            <table class="preview-table">
              <thead>
                <tr><th>Produk</th><th>Pendapatan</th><th>Tren</th></tr>
              </thead>
              <tbody>
                <tr><td>Pro Plan</td><td>Rp740K</td><td style="color:${trend[1]}">+18%</td></tr>
                <tr><td>Starter</td><td>Rp510K</td><td style="color:${trend[2]}">+11%</td></tr>
                <tr><td>Consulting</td><td>Rp430K</td><td style="color:${trend[3]}">+8%</td></tr>
              </tbody>
            </table>
          </article>
          <article class="preview-panel preview-action">
            <div class="preview-panel-title">Ringkasan tindakan</div>
            <div class="preview-action-list">
              <div class="preview-action-item"><span>Produk teratas</span><strong class="preview-chip">Pro Plan</strong></div>
              <div class="preview-action-item"><span>Peringatan risiko</span><strong style="color:${trend[2]}">Churn rendah</strong></div>
              <div class="preview-action-item"><span>Peluang</span><strong style="color:${trend[1]}">Upsell +12%</strong></div>
            </div>
            <button type="button" class="preview-cta">Lihat insight</button>
          </article>
        </section>
      </div>
    </section>
  `;
}

function regenerate() {
  const next = nextPalette(seedInput.value);
  palette = palette.map((current, idx) => (locked[idx] ? current : next[idx]));
  writeSeedPalette(palette);
  renderSwatches();
  renderHexChips();
  renderPreview();
}

function exportTps() {
  const body = `<?xml version='1.0'?>\n<workbook>\n  <preferences>\n    <color-palette name="Custom Palette" type="regular">\n${palette.map((c) => `      <color>${c}</color>`).join("\n")}\n    </color-palette>\n  </preferences>\n</workbook>\n`;
  downloadFile("palette.tps", body, "application/xml");
  showToast("palette.tps siap diunduh");
}

function exportJson() {
  const body = JSON.stringify({
    name: "Custom Palette",
    dataColors: palette,
    background: "#FFFFFF",
    foreground: "#252423",
    tableAccent: palette[0]
  }, null, 2);
  downloadFile("theme.json", body, "application/json");
  showToast("theme.json siap diunduh");
}

function exportCss() {
  const body = `:root {\n  --color-1: ${palette[0]};\n  --color-2: ${palette[1]};\n  --color-3: ${palette[2]};\n  --color-4: ${palette[3]};\n  --color-5: ${palette[4]};\n}`;
  copyToClipboard(body, "Tidak bisa menyalin otomatis. Salin variabel CSS secara manual.").then((ok) => {
    if (ok) showToast("Variabel CSS disalin");
  });
}

function exportPng() {
  downloadPaletteImage(palette, "png");
  showToast("palette.png siap diunduh");
}

function exportJpg() {
  downloadPaletteImage(palette, "jpg");
  showToast("palette.jpg siap diunduh");
}

function seedFromQuery() {
  const q = new URLSearchParams(location.search).get("palette");
  if (!q) return null;
  const arr = q.split(",").map(normalizeHex).filter(Boolean);
  return arr.length === 5 ? arr : null;
}

function setup() {
  renderModes();
  const fromQuery = seedFromQuery();
  const fromStorage = readSeedPalette();
  if (fromQuery) palette = fromQuery;
  else if (fromStorage && fromStorage.length === 5) palette = fromStorage;
  else palette = nextPalette();

  renderSwatches();
  renderHexChips();
  renderPreview();

  document.getElementById("generateBtn").addEventListener("click", regenerate);
  document.getElementById("exportTpsBtn").addEventListener("click", exportTps);
  document.getElementById("exportJsonBtn").addEventListener("click", exportJson);
  document.getElementById("exportPngBtn").addEventListener("click", exportPng);
  document.getElementById("exportJpgBtn").addEventListener("click", exportJpg);
  document.getElementById("copyCssBtn").addEventListener("click", exportCss);
  document.querySelectorAll("[data-preview-theme]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.getAttribute("data-preview-theme") === previewTheme ? "true" : "false");
    btn.addEventListener("click", () => {
      previewTheme = btn.getAttribute("data-preview-theme");
      document.querySelectorAll("[data-preview-theme]").forEach((themeBtn) => themeBtn.setAttribute("aria-pressed", themeBtn.getAttribute("data-preview-theme") === previewTheme ? "true" : "false"));
      renderPreview();
    });
  });

  const onKey = (e) => {
    if (e.code === "Space" && e.target.tagName !== "INPUT") {
      e.preventDefault();
      regenerate();
    }
  };
  window.addEventListener("keydown", onKey);
  window.addEventListener("beforeunload", () => window.removeEventListener("keydown", onKey));
}

setup();
