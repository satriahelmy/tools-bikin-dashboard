const BD_STORAGE_KEY = "bd_palette_seed";

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyToClipboard(text, fallbackMessage) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_error) {
    showToast(fallbackMessage || `Tidak bisa menyalin otomatis. Salin manual: ${text}`);
    return false;
  }
}

function normalizeHex(input) {
  if (!input) return null;
  const v = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(v)) return null;
  return `#${v.toUpperCase()}`;
}

function isDark(hex) {
  const c = normalizeHex(hex);
  if (!c) return false;
  const r = parseInt(c.slice(1, 3), 16);
  const g = parseInt(c.slice(3, 5), 16);
  const b = parseInt(c.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 145;
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
}

function readSeedPalette() {
  try {
    const raw = localStorage.getItem(BD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 5) return null;
    return parsed.map((item) => normalizeHex(item)).filter(Boolean);
  } catch (_error) {
    return null;
  }
}

function writeSeedPalette(colors) {
  if (!Array.isArray(colors) || colors.length !== 5) return;
  localStorage.setItem(BD_STORAGE_KEY, JSON.stringify(colors));
}

function downloadPaletteImage(colors, format = "png") {
  if (!Array.isArray(colors) || colors.length !== 5) return;

  const normalized = colors.map((c) => normalizeHex(c) || "#000000");
  const width = 1800;
  const height = 1000;
  const footerHeight = 120;
  const swatchWidth = width / normalized.length;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  normalized.forEach((hex, idx) => {
    const x = idx * swatchWidth;
    ctx.fillStyle = hex;
    ctx.fillRect(x, 0, swatchWidth, height - footerHeight);
  });

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, height - footerHeight, width, footerHeight);
  ctx.strokeStyle = "#E2E8F0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, height - footerHeight);
  ctx.lineTo(width, height - footerHeight);
  ctx.stroke();

  ctx.font = "500 34px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  normalized.forEach((hex, idx) => {
    const x = idx * swatchWidth + swatchWidth / 2;
    ctx.fillStyle = "#0F172A";
    ctx.fillText(hex, x, height - footerHeight / 2);
  });

  const isJpg = format.toLowerCase() === "jpg" || format.toLowerCase() === "jpeg";
  const mime = isJpg ? "image/jpeg" : "image/png";
  const ext = isJpg ? "jpg" : "png";
  const fileName = `palette.${ext}`;

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }, mime, isJpg ? 0.95 : undefined);
}
