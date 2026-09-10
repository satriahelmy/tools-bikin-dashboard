let extracted = [];
let hasResult = false;

const dropzone = document.getElementById("dropzone");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const analysisInfo = document.getElementById("analysisInfo");

function setImageActionsEnabled(enabled) {
  const emptyState = document.getElementById("imageEmptyState");
  const resultHeading = document.getElementById("imageResultHeading");
  const resultPalette = document.getElementById("resultPalette");
  const resultHexRow = document.getElementById("resultHexRow");
  const actions = document.getElementById("imagePaletteActions");
  const errorState = document.getElementById("imageErrorState");

  [resultHeading, resultPalette, resultHexRow, actions].forEach((element) => {
    if (element) element.classList.toggle("u-hidden", !enabled);
  });
  if (emptyState) emptyState.classList.toggle("u-hidden", enabled);
  if (errorState && enabled) errorState.classList.add("u-hidden");
  document.querySelectorAll("#imagePaletteActions .bd-btn").forEach((button) => {
    button.disabled = !enabled;
  });
}

function validateFile(file) {
  const validType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
  if (!validType) {
    showToast("Format tidak didukung. Gunakan JPG, PNG, atau WEBP.");
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    showToast("File terlalu besar. Ukuran maksimum 5 MB.");
    return false;
  }
  return true;
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

function kMeans(pixels, k = 5, maxIter = 20) {
  let centroids = pixels.slice(0, k).map((p) => [...p]);
  let clusterSizes = new Array(k).fill(0);
  for (let iter = 0; iter < maxIter; iter++) {
    const clusters = Array.from({ length: k }, () => []);
    for (const pixel of pixels) {
      let minDist = Infinity;
      let closest = 0;
      for (let i = 0; i < centroids.length; i++) {
        const c = centroids[i];
        const d = Math.hypot(pixel[0] - c[0], pixel[1] - c[1], pixel[2] - c[2]);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      }
      clusters[closest].push(pixel);
    }
    clusterSizes = clusters.map((c) => c.length);
    centroids = clusters.map((cluster) => {
      if (!cluster.length) return [128, 128, 128];
      return [0, 1, 2].map((i) => Math.round(cluster.reduce((sum, p) => sum + p[i], 0) / cluster.length));
    });
  }
  return centroids.map((c, i) => ({ color: rgbToHex(c[0], c[1], c[2]), size: clusterSizes[i] }))
    .sort((a, b) => b.size - a.size)
    .map((item) => item.color);
}

function samplePixels(data, target = 3000) {
  const total = data.length / 4;
  const step = Math.max(1, Math.floor(total / target));
  const pixels = [];
  for (let i = 0; i < total; i += step) {
    const p = i * 4;
    pixels.push([data[p], data[p + 1], data[p + 2]]);
  }
  return pixels.slice(0, target);
}

function renderResult() {
  const stage = document.getElementById("resultPalette");
  const row = document.getElementById("resultHexRow");
  stage.innerHTML = "";
  row.innerHTML = "";
  if (!extracted.length) return;
  extracted.forEach((hex) => {
    const fg = isDark(hex) ? "#FFFFFF" : "#0F172A";
    const sw = document.createElement("article");
    sw.className = "swatch";
    sw.style.background = hex;
    sw.innerHTML = `<div class="swatch-overlay" style="opacity:1;color:${fg}"><div></div><div class="swatch-bottom"><span class="bd-mono">${hex}</span><button type="button" aria-label="Salin hex" class="swatch-icon-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button></div></div>`;
    sw.querySelector("button").addEventListener("click", () => {
      copyToClipboard(hex, `Penyalinan gagal. Salin manual: ${hex}`).then((ok) => ok && showToast(`${hex} disalin`));
    });
    stage.appendChild(sw);

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "hex-chip";
    chip.textContent = hex;
    chip.style.borderLeftColor = hex;
    chip.addEventListener("click", () => {
      copyToClipboard(hex, `Penyalinan gagal. Salin manual: ${hex}`).then((ok) => ok && showToast(`${hex} disalin`));
    });
    row.appendChild(chip);
  });
}

function exportTps() {
  const body = `<?xml version='1.0'?>\n<workbook>\n  <preferences>\n    <color-palette name="Custom Palette" type="regular">\n${extracted.map((c) => `      <color>${c}</color>`).join("\n")}\n    </color-palette>\n  </preferences>\n</workbook>\n`;
  downloadFile("palette.tps", body, "application/xml");
  showToast("palette.tps diunduh");
}

function exportJson() {
  const body = JSON.stringify({
    name: "Custom Palette",
    dataColors: extracted,
    background: "#FFFFFF",
    foreground: "#252423",
    tableAccent: extracted[0]
  }, null, 2);
  downloadFile("theme.json", body, "application/json");
  showToast("theme.json diunduh");
}

function exportCss() {
  const body = `:root {\n  --color-1: ${extracted[0]};\n  --color-2: ${extracted[1]};\n  --color-3: ${extracted[2]};\n  --color-4: ${extracted[3]};\n  --color-5: ${extracted[4]};\n}`;
  copyToClipboard(body, "Penyalinan gagal. Salin manual: variabel CSS").then((ok) => ok && showToast("Variabel CSS disalin"));
}

function exportPng() {
  downloadPaletteImage(extracted, "png");
  showToast("palette.png diunduh");
}

function exportJpg() {
  downloadPaletteImage(extracted, "jpg");
  showToast("palette.jpg diunduh");
}

async function analyze(file) {
  if (!validateFile(file)) return;
  imagePreview.src = URL.createObjectURL(file);
  imagePreview.classList.remove("u-hidden");
  analysisInfo.classList.remove("u-hidden");
  document.getElementById("imageErrorState")?.classList.add("u-hidden");
  setImageActionsEnabled(false);
  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = imagePreview.src;
    });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = Math.max(200, Math.floor(img.width * 0.4));
    canvas.height = Math.max(200, Math.floor(img.height * 0.4));
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = samplePixels(imageData.data);
    extracted = kMeans(pixels, 5, 20);
    hasResult = extracted.length > 0;
    writeSeedPalette(extracted);
    renderResult();
    setImageActionsEnabled(hasResult);
  } catch (_error) {
    document.getElementById("imageErrorState")?.classList.remove("u-hidden");
    showToast("Gambar gagal dianalisis. Coba gambar lain.");
  } finally {
    analysisInfo.classList.add("u-hidden");
  }
}

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("is-dragover");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("is-dragover");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("is-dragover");
  const file = e.dataTransfer.files[0];
  if (file) analyze(file);
});

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) analyze(file);
});

document.getElementById("imageExportTpsBtn").addEventListener("click", exportTps);
document.getElementById("imageExportJsonBtn").addEventListener("click", exportJson);
document.getElementById("imageExportPngBtn").addEventListener("click", exportPng);
document.getElementById("imageExportJpgBtn").addEventListener("click", exportJpg);
document.getElementById("imageCopyCssBtn").addEventListener("click", exportCss);
document.getElementById("editGeneratorBtn").addEventListener("click", () => {
  if (!hasResult) return;
  writeSeedPalette(extracted);
  location.href = `./index.html?palette=${encodeURIComponent(extracted.join(","))}`;
});

renderResult();
setImageActionsEnabled(false);
