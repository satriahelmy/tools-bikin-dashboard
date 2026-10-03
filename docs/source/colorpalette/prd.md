# PRD — Color Palette Generator
**URL:** color.bikindashboard.com
**Status:** Fase 1
**Stack:** Vanilla HTML, CSS, JavaScript (static, no backend)
**Design System:** Ikuti design.md

---

## 1. Overview

### Tujuan
Tool gratis untuk membantu data analyst dan desainer dashboard membuat color palette yang harmonis, lalu mengekspornya langsung ke format yang dipakai di Tableau dan Power BI.

### Target User
- Data analyst Indonesia yang belajar atau bekerja dengan Tableau / Power BI
- Desainer dashboard yang butuh palette cepat tanpa buka Figma
- Pemula yang belum paham color theory tapi mau hasil yang bagus

### Nilai Utama
- Generate palette berkualitas (bukan random ngasal) dengan sekali klik
- Export langsung ke format Tableau TPS dan Power BI JSON — pembeda utama dari tools sejenis
- Live preview di konteks dashboard nyata
- Gratis, tidak perlu daftar

---

## 2. Pages & Navigation

Tool ini multi-page di bawah satu subdomain. Navigasi pakai tab di topbar (ikuti komponen `bd-tabs` di design.md).

| Halaman | URL | Deskripsi |
|---------|-----|-----------|
| Generator | `color.bikindashboard.com/` | Generate palette + preview + export |
| From Image | `color.bikindashboard.com/image.html` | Ekstrak warna dominan dari gambar |
| Explore | `color.bikindashboard.com/explore.html` | Galeri palette dikurasi |

Topbar selalu tampil di semua halaman. Tab aktif ditandai dengan `bd-tab active`.

---

## 3. Feature Specs

### 3.1 Halaman Generator (`index.html`)

#### Palette Area
- Tampilkan 5 swatch warna berdampingan, tinggi 65vh
- Setiap swatch melebar saat hover (`flex: 1.65`, transisi `0.22s cubic-bezier(.4,0,.2,1)`)
- Saat hover swatch, tampilkan:
  - Hex code (font mono, di bagian bawah swatch)
  - Tombol copy hex (icon, circular, semi-transparan)
  - Tombol lock/unlock (icon, circular, semi-transparan)
- Saat locked: tampilkan ikon lock di bagian atas swatch (selalu visible, tidak hanya saat hover)
- Warna teks dan ikon di atas swatch ditentukan oleh luminance:
  ```js
  function isDark(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return (0.299*r + 0.587*g + 0.114*b) < 145;
  }
  // isDark true → teks/ikon putih
  // isDark false → teks/ikon gelap
  ```

#### Generate (HSL-based)
Generate warna menggunakan HSL untuk memastikan kualitas, bukan random hex.

```js
function generateHSLPalette(count = 5) {
  const colors = [];
  let hue = Math.random() * 360;
  for (let i = 0; i < count; i++) {
    const s = 55 + Math.random() * 25; // saturation 55–80%
    const l = 45 + Math.random() * 20; // lightness 45–65%
    colors.push(hslToHex(hue, s, l));
    hue = (hue + 60 + Math.random() * 60) % 360; // jarak antar hue 60–120°
  }
  return colors;
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
}
```

#### Harmony Modes
User bisa pilih mode harmony sebelum generate. Mode aktif ditandai secara visual.

| Mode | Deskripsi | Logika Hue |
|------|-----------|------------|
| Random | Default, acak tapi harmonis | HSL dengan jarak 60–120° |
| Analogous | Warna berdekatan di color wheel | Jarak antar hue 20–40° |
| Complementary | Warna berlawanan | Hue utama + hue+180° |
| Triadic | 3 warna seimbang | Hue, hue+120°, hue+240° |
| Monochromatic | Satu hue, variasi lightness | Hue sama, lightness bervariasi |

#### Seed Input
- Input teks di atas palette
- User bisa ketik hex (`#3B82F6`) atau keyword (`ocean`, `forest`, `sunset`)
- Untuk hex: langsung pakai sebagai warna pertama, generate sisanya dengan HSL harmony
- Untuk keyword: Fase 1 → mapping ke hue terdekat dari daftar preset keywords. Fase 2 → AI-powered via Claude API

Contoh keyword mapping Fase 1:
```js
const keywordHues = {
  ocean: 210, forest: 140, sunset: 25, rose: 350,
  lavender: 270, mint: 160, sand: 40, slate: 220,
};
```

#### Interactions
- **Tombol "Generate"** → regenerate semua swatch yang tidak dikunci
- **Spacebar** → sama dengan tombol Generate (event listener, cleanup saat unload)
- **Lock/unlock** → toggle status locked per swatch, swatch terkunci tidak berubah saat generate
- **Copy hex** → salin ke clipboard, tampilkan toast "Copied #HEXCODE"
- **Generate on load** → palette langsung terisi saat halaman pertama dibuka

#### Bottom Bar
Dua baris di bawah palette:

**Baris 1 — Hex chips:**
- 5 tombol kecil, masing-masing dengan border-left berwarna sesuai swatch
- Font mono, ukuran kecil
- Klik → copy hex → toast

**Baris 2 — Kiri ke kanan:**
- Kiri: keyboard hint "Tekan Space untuk generate ulang" (komponen `bd-kbd-hint`)
- Kanan: 3 tombol export (lihat bagian Export di bawah)

#### Live Dashboard Preview
Di bawah bottom bar, section preview menampilkan mini dashboard yang otomatis pakai warna dari palette aktif.

- Update real-time setiap palette berubah
- Tidak perlu klik apapun
- Template preview (Fase 1): minimal 2 pilihan — Light dan Dark
- Elemen yang diwarnai: navbar background, metric card accent, badge, tombol primary
- User bisa ganti template dengan toggle kecil di pojok section preview

Mapping warna ke elemen UI:
| Posisi palette | Dipakai untuk |
|----------------|---------------|
| Warna 1 | Navbar background, tombol primary |
| Warna 2 | Metric card accent kiri |
| Warna 3 | Metric card accent kanan |
| Warna 4 | Badge/tag |
| Warna 5 | Highlight, secondary accent |

---

### 3.2 Halaman From Image (`image.html`)

#### Upload Area
- Drag & drop area atau klik untuk browse file
- Format yang diterima: JPG, PNG, WEBP
- Ukuran maksimal: 5MB
- Tampilkan preview gambar setelah upload

#### Ekstraksi Warna (K-means, client-side)
Semua proses di browser, tidak ada upload ke server.

```
Flow:
1. User upload gambar
2. Gambar di-render ke Canvas (tersembunyi)
3. Ambil pixel data via getImageData()
4. Sample ~3000 pixel secara acak (tidak perlu semua pixel)
5. Jalankan K-means clustering dengan k=5
6. Centroid tiap cluster = warna dominan
7. Sort by cluster size (warna paling dominan di urutan pertama)
8. Tampilkan sebagai palette 5 swatch
```

Implementasi K-means:
```js
function kMeans(pixels, k = 5, maxIter = 20) {
  // pixels = array of [r, g, b]
  // inisialisasi centroid secara acak dari pixels
  let centroids = pixels.slice(0, k).map(p => [...p]);

  for (let iter = 0; iter < maxIter; iter++) {
    // assign tiap pixel ke centroid terdekat
    const clusters = Array.from({length: k}, () => []);
    for (const pixel of pixels) {
      let minDist = Infinity, closest = 0;
      centroids.forEach((c, i) => {
        const d = Math.hypot(pixel[0]-c[0], pixel[1]-c[1], pixel[2]-c[2]);
        if (d < minDist) { minDist = d; closest = i; }
      });
      clusters[closest].push(pixel);
    }
    // update centroid = rata-rata tiap cluster
    centroids = clusters.map(cluster => {
      if (!cluster.length) return [128, 128, 128];
      return [0,1,2].map(i => Math.round(cluster.reduce((s,p) => s+p[i], 0) / cluster.length));
    });
  }
  return centroids;
}
```

#### Hasil
- Tampilkan 5 swatch warna dominan (sama persis dengan tampilan di halaman Generator)
- Di bawah swatch: sama — hex chips + export buttons
- Tombol "Edit di Generator" → pindah ke index.html dengan palette ini sebagai state awal (via URL params atau localStorage)

#### Loading State
- Saat proses K-means berjalan, tampilkan loading indicator di area swatch
- Teks: "Menganalisis warna..." 
- Proses biasanya < 1 detik untuk gambar normal

---

### 3.3 Halaman Explore (`explore.html`)

#### Data Source
Palette dikurasi manual, disimpan di `palettes.json` di root subdomain.

Struktur `palettes.json`:
```json
[
  {
    "id": "001",
    "name": "Ocean Depth",
    "colors": ["#03045E","#0077B6","#00B4D8","#90E0EF","#CAF0F8"],
    "tags": ["blue", "cool", "professional", "finance"],
    "mood": "calm"
  },
  ...
]
```

Target Fase 1: minimal 50 palette dikurasi.

#### Filter
- Filter by mood: Calm, Bold, Warm, Fresh, Dark, Pastel
- Filter by industry: Finance, Marketing, Operations, HR, Tech
- Semua filter client-side (filter array JSON di JS)

#### Grid Palette
- Layout grid, tiap card menampilkan:
  - Strip 5 warna (preview kecil)
  - Nama palette
  - Tags
  - Tombol "Pakai palette ini" → load ke halaman Generator

#### Search
- Search by nama palette atau tag
- Client-side, filter real-time saat user mengetik

---

## 4. Export

Semua format export tersedia di halaman Generator dan From Image.

### 4.1 Tableau TPS
Download file `palette.tps`.

```xml
<?xml version='1.0'?>
<workbook>
  <preferences>
    <color-palette name="Custom Palette" type="regular">
      <color>#HEX1</color>
      <color>#HEX2</color>
      <color>#HEX3</color>
      <color>#HEX4</color>
      <color>#HEX5</color>
    </color-palette>
  </preferences>
</workbook>
```

Cara install: letakkan file di `Documents/My Tableau Repository/Preferences/` (merge dengan `Preferences.tps` yang ada), restart Tableau.

### 4.2 Power BI JSON
Download file `theme.json`.

```json
{
  "name": "Custom Palette",
  "dataColors": ["#HEX1","#HEX2","#HEX3","#HEX4","#HEX5"],
  "background": "#FFFFFF",
  "foreground": "#252423",
  "tableAccent": "#HEX1"
}
```

Cara install: View → Themes → Browse for themes → pilih file.

### 4.3 CSS Variables
Copy ke clipboard.

```css
:root {
  --color-1: #HEX1;
  --color-2: #HEX2;
  --color-3: #HEX3;
  --color-4: #HEX4;
  --color-5: #HEX5;
}
```

### Helper Function (pakai di semua halaman)
```js
function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

---

## 5. UI Behavior & States

### Toast
Muncul setelah setiap aksi:
| Aksi | Pesan Toast |
|------|-------------|
| Copy hex | "Copied #HEXCODE" |
| Copy CSS | "CSS variables copied" |
| Download TPS | "palette.tps downloaded" |
| Download JSON | "theme.json downloaded" |

### Error States
| Kondisi | Handling |
|---------|----------|
| Upload file bukan gambar | Toast "Format tidak didukung. Gunakan JPG, PNG, atau WEBP." |
| Upload file > 5MB | Toast "Ukuran file terlalu besar. Maksimal 5MB." |
| K-means gagal | Toast "Gagal menganalisis gambar. Coba gambar lain." |
| Clipboard tidak tersedia | Toast "Copy gagal. Salin manual: #HEXCODE" |

### Loading States
| Kondisi | Tampilan |
|---------|----------|
| K-means berjalan | Swatch menampilkan shimmer/skeleton animation |
| Fetch palettes.json | Grid menampilkan skeleton cards |

---

## 6. Palette Naming (Export)

Fase 1: nama palette di file export selalu "Custom Palette".

Fase 2: tambahkan input nama palette di UI, default "Custom Palette", user bisa ubah sebelum export.

---

## 7. Out of Scope — Fase 1

Fitur berikut **tidak** dibangun di Fase 1:

- **AI keyword generation** — input keyword seperti "warna untuk fintech" diproses Claude API. Masuk Fase 2.
- **Save & share palette** — simpan palette ke akun atau share via URL. Butuh backend.
- **Color Picker detail** — klik swatch untuk lihat info lengkap (RGB, HSL, CMYK, tint/shade). Masuk Fase 2.
- **More preview templates** — Fase 1 cukup 2 template (Light, Dark). Executive dan Mobile masuk Fase 2.
- **User-submitted palettes** — Explore Fase 1 hanya kurated manual via JSON.
- **Palette naming sebelum export** — Fase 1 nama selalu "Custom Palette".
- **Drag reorder swatch** — Fase 2.

---

## 8. Cara Pakai PRD ini di Cursor

Saat build tiap halaman, attach **dua file** sekaligus:

```
Attach: design.md
Attach: prd-color-palette-generator.md

Build halaman [Generator / From Image / Explore] untuk color.bikindashboard.com.
File output: [index.html / image.html / explore.html]
Ikuti semua spec di PRD section [3.1 / 3.2 / 3.3] dan design system di design.md.
Stack: vanilla HTML, CSS, JavaScript. Tidak ada framework eksternal.
```
