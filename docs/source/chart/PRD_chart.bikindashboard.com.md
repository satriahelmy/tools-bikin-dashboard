# PRD — Chart Guide
## chart.bikindashboard.com

> Dokumen ini adalah product requirements untuk Chart Guide.
> Attach bersama `design.md` setiap kali build atau iterasi di Cursor.

---

## 1. Overview

**Nama tool:** Chart Guide  
**URL:** `chart.bikindashboard.com`  
**Tagline:** Panduan memilih chart yang tepat untuk datamu  
**Bahasa:** Bahasa Indonesia  
**Stack:** Vanilla HTML, CSS, JavaScript — tanpa framework eksternal  
**Hosting:** PHP shared hosting (serve static files)

Chart Guide adalah referensi interaktif untuk data practitioner Indonesia yang ingin tahu chart apa yang tepat untuk data dan tujuan mereka. Setiap chart dilengkapi visualisasi interaktif (Chart.js), deskripsi, kegunaan, dan Do's & Don'ts — semua dalam Bahasa Indonesia dengan contoh data konteks bisnis lokal (PT Nusantara Retail).

---

## 2. Tujuan

- Bantu pemula memilih chart yang tepat berdasarkan tujuan visualisasi
- Jadi referensi cepat yang bisa dibookmark dan dishare per chart
- Diferensiasi dari kompetitor (Data Viz Catalogue, From Data to Viz) yang semua berbahasa Inggris dengan UI dated

---

## 3. Struktur File

```
chart.bikindashboard.com/
  index.html        ← Homepage: grid semua chart + filter kategori + search
  chart.html        ← Template detail chart (1 file, konten dinamis via JS)
  charts.json       ← Data semua chart (single source of truth)
  style.css         ← CSS dipisah (multi-page tool, sesuai aturan design.md)
```

URL detail chart: `chart.html?id=bar-chart`  
JS baca parameter `id` → ambil data dari `charts.json` → render konten.

---

## 4. Daftar Chart (v1)

16 chart, 4 kategori. Chart bisa masuk lebih dari satu kategori.

| # | Nama Chart | Kategori |
|---|---|---|
| 1 | Bar Chart | Comparison |
| 2 | Line Chart | Comparison |
| 3 | Slope Chart | Comparison |
| 4 | Bullet Chart | Comparison |
| 5 | Waterfall Chart | Comparison |
| 6 | Pie Chart | Composition |
| 7 | Donut Chart | Composition |
| 8 | Stacked Bar Chart | Composition |
| 9 | Treemap | Composition |
| 10 | Area Chart | Composition |
| 11 | Histogram | Distribution |
| 12 | Box Plot | Distribution |
| 13 | Dot Plot | Distribution |
| 14 | Scatter Plot | Distribution, Relationship |
| 15 | Bubble Chart | Relationship |
| 16 | Heatmap | Relationship |

---

## 5. Data Dummy

Semua contoh visualisasi pakai universe fiktif **PT Nusantara Retail** — perusahaan retail Indonesia dengan data penjualan, produk, cabang, dan pelanggan. Konteks lokal, relevan untuk audiens.

Data didefinisikan langsung di `charts.json` per chart — tidak ada file CSV terpisah.

---

## 6. Homepage (`index.html`)

### Layout

```
[Topbar: ← Tools | Chart Guide]

[Hero: judul + deskripsi singkat]

[Search bar: "Cari chart..."]

[Filter pills: Semua | Comparison | Composition | Distribution | Relationship]

[Grid: card per chart, 3 kolom desktop / 2 tablet / 1 mobile]

[Footer]
```

### Chart Card

Setiap card di grid berisi:
- Nama chart
- Badge kategori (satu atau lebih)
- Deskripsi satu kalimat
- Klik → navigasi ke `chart.html?id=[chart-id]`

### Filter & Search

- Filter pill aktif highlight dengan `--bd-primary`
- Search filter real-time berdasarkan nama chart
- Filter kategori dan search bisa dikombinasikan
- Kalau tidak ada hasil: empty state dengan pesan "Tidak ada chart yang sesuai"

---

## 7. Halaman Detail (`chart.html`)

### Layout

```
[Topbar: ← Chart Guide | [Nama Chart] | badge kategori]

[Visualisasi Chart.js — interaktif, dengan data PT Nusantara Retail]

[Deskripsi — 2-3 kalimat penjelasan chart ini]

[Kegunaan — kapan pakai chart ini, bullet list 3-5 poin]

[Do's & Don'ts — dua kolom, bullet list]

[Navigasi: ← Chart sebelumnya | Chart berikutnya →]

[Footer]
```

### Visualisasi Chart.js

- Load Chart.js dari bundle lokal: `chart.umd.min.js` (Chart.js 4.5.0) agar halaman tetap berjalan tanpa CDN
- Setiap chart punya konfigurasi Chart.js tersendiri di `charts.json`
- Interaktif: hover tooltip aktif
- Warna visualisasi pakai palet yang sesuai konteks (tidak harus `--bd-primary` — boleh warna yang relevan untuk data viz)
- Tidak ada gambar/screenshot — semua render via Canvas

### Badge Kategori

- Pakai `bd-badge bd-badge-blue` untuk semua badge kategori di halaman detail
- Chart dengan 2 kategori tampilkan 2 badge

---

## 8. `charts.json` — Struktur Data

```json
[
  {
    "id": "bar-chart",
    "name": "Bar Chart",
    "categories": ["Comparison"],
    "description": "Chart paling serbaguna untuk membandingkan nilai antar kategori.",
    "kegunaan": [
      "Membandingkan penjualan antar produk",
      "Menampilkan performa cabang dalam satu periode",
      "Membandingkan target vs aktual"
    ],
    "dos": [
      "Mulai sumbu Y dari nol",
      "Urutkan bar dari terbesar ke terkecil untuk keterbacaan",
      "Beri label nilai langsung di bar kalau memungkinkan"
    ],
    "donts": [
      "Jangan pakai terlalu banyak warna berbeda",
      "Hindari 3D bar chart — menyesatkan secara visual",
      "Jangan pakai bila kategorinya lebih dari 10-12"
    ],
    "chartjs": {
      "type": "bar",
      "data": {
        "labels": ["Elektronik", "Fashion", "Makanan", "Olahraga", "Furnitur"],
        "datasets": [{
          "label": "Penjualan (juta)",
          "data": [420, 380, 310, 275, 190],
          "backgroundColor": ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"]
        }]
      },
      "options": {
        "plugins": { "legend": { "display": false } },
        "scales": { "y": { "beginAtZero": true } }
      }
    }
  }
]
```

---

## 9. Design System

Ikuti semua aturan di `design.md`:

- CSS variables `--bd-*` — wajib, tidak boleh hardcode warna
- Font: Plus Jakarta Sans (body), JetBrains Mono (data/kode)
- Layout: `bd-topbar`, `bd-main`, `bd-container`, `bd-card`
- Komponen: `bd-btn`, `bd-badge`, `bd-input`
- CSS dipisah ke `style.css` (multi-page tool)
- Back link di topbar: `← Tools` mengarah ke `tools.bikindashboard.com`
- Footer: `Tool gratis dari bikindashboard.com`

---

## 10. Scope v1 — Yang Tidak Dibangun

- ❌ Tips implementasi Tableau/Power BI → v2
- ❌ User-generated content atau komentar
- ❌ Animasi chart (Chart.js static render cukup)
- ❌ Mode gelap
- ❌ Export/download chart

---

## 11. Prompt untuk AI Coding Assistant

Attach `design.md` dan file PRD ini setiap kali mulai sesi build baru.

```
Context: design.md, PRD_chart.bikindashboard.com.md

Build Chart Guide untuk chart.bikindashboard.com.
Tool ini multi-page: index.html (homepage) + chart.html (template detail) + charts.json (data) + style.css (CSS terpisah).

Mulai dari index.html dan style.css dulu.
Ikuti semua aturan di design.md: CSS variables, typography, layout template, komponen.
Stack: vanilla HTML, CSS, JavaScript. Chart.js via CDN. Tidak ada framework eksternal.

Detail lengkap ada di PRD.
```

---

## 12. Urutan Build yang Disarankan

1. `style.css` — semua CSS global
2. `index.html` — homepage dengan grid dummy (tanpa data nyata dulu)
3. `charts.json` — isi data 16 chart lengkap
4. `chart.html` — template detail, sambungkan ke `charts.json`
5. Isi Chart.js config per chart di `charts.json`
6. QA: filter, search, navigasi antar chart, mobile responsiveness
