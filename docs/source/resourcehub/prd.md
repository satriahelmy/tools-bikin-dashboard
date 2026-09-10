# PRD — Resource Hub
**bikindashboard.com** | Fase 1

---

## Overview

Resource Hub adalah halaman direktori yang dikurasi manual, berisi kumpulan tools, dataset, kursus, inspirasi, dan referensi desain untuk data analyst & pemula Indonesia. Pengguna bisa filter berdasarkan kategori dan tag, serta mencari resource secara langsung.

**URL:** `resources.bikindashboard.com` (atau `bikindashboard.com/resources`)
**Stack:** Vanilla HTML, CSS, JavaScript — single file `index.html`
**Data:** `resources.json` (dikelola manual oleh kurator)

---

## Tujuan

- Menjadi direktori resource data viz paling lengkap dan terkurasi **dalam Bahasa Indonesia**
- Memberikan nilai tambah lewat **catatan kurator** — perspektif praktisi, bukan sekadar deskripsi generik
- Menjadi pintu masuk ke ekosistem bikindashboard.com (e-learning, tools, produk)

---

## Target Pengguna

Data analyst & pemula Indonesia yang belajar Tableau, Power BI, Python, atau dashboard design — selaras dengan audience utama bikindashboard.com.

---

## Kategori Konten

| # | Kategori | Deskripsi |
|---|----------|-----------|
| 1 | 🛠️ Tools & Software | Link download, dokumentasi resmi, versi free/trial |
| 2 | 📚 Belajar | Kursus & tutorial per topik (Tableau, Power BI, Python, SQL, Dashboard Design, Statistik) |
| 3 | 🗄️ Dataset | Sumber dataset global & Indonesia (BPS, data.go.id, open data daerah, BMKG, BI) |
| 4 | 🎨 Desain & Warna | Color tools, font, prinsip desain dashboard, accessibility |
| 5 | ✨ Inspirasi | Contoh dashboard, Tableau Public, Viz of the Day, Makeover Monday |
| 6 | 🇮🇩 Khusus Indonesia | Komunitas lokal, channel/blog berbahasa Indonesia, event & kompetisi |

---

## Struktur Data (`resources.json`)

```json
{
  "resources": [
    {
      "name": "Kaggle",
      "url": "https://kaggle.com",
      "description": "Platform dataset dan kompetisi data science.",
      "category": "Dataset",
      "subcategory": "Global",
      "tags": ["Dataset", "Python", "SQL", "Gratis"],
      "price": "Gratis",
      "note": "Buat yang baru mulai, filter dataset by tag 'beginner-friendly'. Pilih tema yang familiar biar lebih mudah interpretasi datanya."
    }
  ]
}
```

**Field:**

| Field | Wajib | Keterangan |
|-------|-------|------------|
| `name` | ✅ | Nama resource |
| `url` | ✅ | Link resource |
| `description` | ✅ | 1–2 kalimat deskripsi singkat |
| `category` | ✅ | Salah satu dari 6 kategori |
| `tags` | ✅ | Array string, untuk filter |
| `price` | ✅ | `"Gratis"` / `"Freemium"` / `"Berbayar"` |
| `subcategory` | ❌ | Untuk Belajar & Dataset yang punya sub-topik |
| `note` | ❌ | Catatan kurator — tips, peringatan, rekomendasi personal |

---

## Fitur Halaman

### Search
- Input teks untuk mencari berdasarkan `name`, `description`, dan `note`
- Real-time filter saat mengetik (tidak perlu tekan Enter)

### Filter Kategori
- Tab atau chip horizontal: Semua / Tools & Software / Belajar / Dataset / Desain & Warna / Inspirasi / Khusus Indonesia
- Bisa dikombinasikan dengan search

### Filter Tag
- Chip filter sekunder: Gratis / Freemium / Berbayar / Indonesia / Tableau / Power BI / Python / SQL / dll
- Multi-select — bisa pilih lebih dari satu tag

### Resource Card
Setiap resource ditampilkan sebagai card berisi:
- Nama (link ke URL, buka tab baru)
- Deskripsi singkat
- Badge kategori & tags
- Badge price (Gratis / Freemium / Berbayar)
- Catatan kurator (jika ada) — ditandai dengan ikon 💬 atau label "Catatan kurator"

### Empty State
Tampilkan pesan ramah kalau hasil pencarian kosong.

### Resource Count
Tampilkan jumlah resource yang sedang ditampilkan, contoh: *"Menampilkan 12 dari 47 resource"*

---

## Design System

Mengikuti `design.md` bikindashboard.com sepenuhnya:

- **Font:** Plus Jakarta Sans
- **Warna:** CSS variables `--bd-*`
- **Layout:** Topbar sticky + main content + footer
- **Topbar:** Back link ke `bikindashboard.com` + judul halaman
- **Komponen:** `bd-card`, `bd-badge`, `bd-input`, `bd-btn`, `bd-toast`
- **Stack:** Vanilla HTML, CSS, JavaScript — tidak ada framework eksternal

**Catatan layout khusus resource hub:**
- Resource ditampilkan dalam grid 2–3 kolom di desktop, 1 kolom di mobile
- Filter kategori sebagai chip horizontal yang bisa scroll di mobile
- Catatan kurator memakai warna background `--bd-bg-secondary` dengan border kiri warna `--bd-primary` agar menonjol

---

## Out of Scope (Fase 1)

- Submit resource oleh komunitas
- Rating atau komentar dari user
- Login / akun pengguna
- Bookmark resource
- Notifikasi resource baru

---

## Cara Update Konten

1. Buka `resources.json`
2. Tambah object baru ke array `resources`
3. Isi semua field wajib + `note` kalau ada
4. Deploy ulang (karena static file, cukup push ke repo)

Tidak butuh database, tidak butuh backend.

---

## Prompt untuk Cursor

```
Attach: design.md

Build Resource Hub untuk resources.bikindashboard.com sebagai single file index.html.
Ikuti semua aturan di design.md: CSS variables, typography, layout template, komponen, URL architecture.
Stack: vanilla HTML, CSS, JavaScript. Tidak ada framework eksternal.

Data resource dibaca dari resources.json (fetch saat load).
Fitur: search real-time, filter kategori (tab/chip), filter tag (multi-select chip), resource card dengan catatan kurator.
Resource card berisi: nama (link), deskripsi, badge kategori + tags + price, dan catatan kurator (jika ada) dengan style blockquote dengan border kiri --bd-primary.
Tampilkan resource count: "Menampilkan X dari Y resource".
Empty state yang ramah kalau hasil filter kosong.
```
