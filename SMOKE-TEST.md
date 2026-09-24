# Smoke test sebelum deployment

Tanggal: __________  Tester: __________  Browser: __________

## Route dan shell

- [ ] `/` terbuka tanpa error; judul dan kartu tools tampil.
- [ ] Sidebar mengarah ke Beranda, Color Palette, Chart Guide, Resource Hub, Data Quality Checker, Paper Library, dan Book Library.
- [ ] Active state sidebar berubah sesuai route.
- [ ] Pada viewport mobile, tombol menu dapat membuka/menutup sidebar dan tombol Escape menutupnya.
- [ ] Favicon tampil dan tidak ada request asset 404.

## Color Palette

- [ ] Generator membuat palet baru, mode harmoni dapat dipilih, dan tombol Space bekerja.
- [ ] Lock, salin hex, salin CSS, ekspor TPS/JSON/PNG/JPG bekerja.
- [ ] Tab Dari Gambar menampilkan state kosong, menerima JPG/PNG/WEBP, dan menampilkan error untuk file tidak valid.
- [ ] Explore dapat mencari, memfilter suasana/industri, dan memakai palet ke Generator.
- [ ] Panduan ekspor terbaca di mobile.

## Chart Guide

- [ ] Katalog memuat seluruh chart, pencarian/filter bekerja, dan thumbnail tidak rusak.
- [ ] Kartu membuka detail chart yang sesuai.
- [ ] Detail memiliki link kembali ke overview Chart Guide dan navigasi chart sebelumnya/berikutnya.
- [ ] Chart interaktif tampil; fallback muncul bila bundle gagal dimuat.
- [ ] Judul, deskripsi, dan canonical detail berubah sesuai `?id=`.

## Resource Hub

- [ ] Resource tampil dengan domain sumber dan CTA Buka link.
- [ ] Pencarian, kategori, tag multi-pilih, dan Reset filter bekerja.
- [ ] Empty state muncul ketika tidak ada hasil.

## Data Quality Checker

- [ ] Route terbuka tanpa error dan metadata/active state sidebar sesuai.
- [ ] Dropzone menerima file lewat drag & drop dan file picker.
- [ ] File CSV dan XLSX valid menampilkan status berhasil dibaca secara lokal.
- [ ] XLSX multi-sheet menampilkan pilihan sheet sebelum analisis.
- [ ] Format unsupported, file kosong, dan file terlalu besar menampilkan recovery state yang jelas.
- [ ] Parser CSV dan XLSX termuat tanpa error console; file tetap diproses di browser.
- [ ] Hasil menampilkan overview rows, columns, duplicate rows, dan missing columns.
- [ ] Detected issues mengelompokkan severity High/Medium/Low dan empty state saat tidak ada issue.
- [ ] Tabel columns mendukung pencarian, sorting, filter All/Issues/Missing/Clean, dan membuka profile kolom.
- [ ] Numeric profile menampilkan statistik dan histogram sederhana; categorical/date profile menampilkan detail yang sesuai.
- [ ] Data preview dibatasi maksimal 50 baris dan duplicate preview tidak menyediakan fungsi delete.

## Paper Library — Phase 4

- [x] `/papers/` terbuka tanpa error dan menampilkan 143 paper.
- [x] Paper Library muncul di sidebar dengan active state yang benar.
- [x] Paper Library muncul di homepage dan link populer membuka route yang benar.
- [x] Search instan dapat menemukan paper berdasarkan judul, author, kategori, kontribusi, tahun, atau provenance.
- [x] Filter kategori, kesulitan, tahun, dan Has Code memperbarui result count serta daftar.
- [x] Topic tidak tampil ketika dataset tidak memiliki nilai topic.
- [x] Sorting Curated, Oldest, Newest, dan A–Z bekerja.
- [x] Read Paper hanya tampil untuk 138 link yang lolos verifikasi; Code hanya tampil untuk 69 link terverifikasi.
- [x] Paper tanpa link terverifikasi, termasuk Rainbow Color Map, tidak menampilkan CTA yang tidak dapat dipakai.
- [x] Empty state, tombol reset, loading/error state, dan provenance source tampil dengan benar.
- [x] URL `q`, `category`, `topic` bila tersedia, `difficulty`, `year`, `code=true`, dan `sort` dapat dibagikan dan mengisi kontrol saat dibuka.
- [x] Perubahan filter memperbarui query URL tanpa reload penuh; nilai query yang tidak valid dibersihkan.
- [x] Event analytics `paper_search`, `paper_filter`, `paper_read_click`, dan `paper_code_click` tidak mengirim judul paper atau isi query pencarian.
- [x] Layout Paper Library tidak menimbulkan horizontal overflow pada viewport 1280/1100/1024/900/860/768/600/390px.
- [x] Keyboard Tab, focus-visible, live result count, `aria-busy`, dan pengumuman link tab baru diverifikasi.
- [x] Generator Excel → JSON lulus: 143 source/generated records, tanpa duplicate ID/title/URL, 138 Read Paper, dan 69 Code terverifikasi.

## Book Library — implementation QA

- [x] `/book-library/` terbuka tanpa error dan menampilkan 141 buku dari `data/books.json`.
- [x] Book Library tampil tepat di bawah Paper Library pada sidebar dengan active state yang benar.
- [x] Book Library tampil di homepage, pencarian homepage, kategori Belajar, dan link populer.
- [x] Hero title, heading, deskripsi akses legal/gratis, search, dan footer memakai shell parent Tools BikinDashboard.
- [x] Search instan bekerja untuk judul, author, dan metadata topik yang tersedia di dataset.
- [x] Filter Category, Level, Format, dan Tools / bahasa memperbarui daftar, result count, active filter, dan query URL.
- [x] Clear/reset filter mengembalikan 141 buku dan menghapus query state.
- [x] Kartu memprioritaskan title, author, category, level, format, akses, status edition bila relevan, dan `Free & verified`.
- [x] `Baca buku →` hanya memakai URL verified dari dataset, membuka tab baru dengan `noopener noreferrer`, dan tidak menampilkan CTA palsu.
- [x] Loading, fetch error, empty state, `aria-busy`, live result count, focus-visible, dan pengumuman tab baru tersedia.
- [x] Responsive layout diuji pada 390/768/1100/1280px tanpa horizontal overflow; grid menjadi satu kolom di mobile.
- [x] Runtime checks lulus: `/`, `/papers/`, `/book-library/`, `/assets/nav.js`, `/assets/analytics.js`, dan `/data/books.json` merespons HTTP 200; console tidak memiliki warning/error.

## Aksesibilitas dan visual

- [ ] Semua kontrol dapat dicapai dengan Tab dan focus ring terlihat.
- [ ] Tombol icon (lock/copy/menu) memiliki nama aksesibel.
- [ ] Teks utama terbaca pada background normal; swatch memiliki label/kode hex.
- [ ] Dengan `prefers-reduced-motion`, transisi tidak mengganggu penggunaan.

## Production readiness P3

- [ ] `/robots.txt`, `/sitemap.xml`, dan `/site.webmanifest` dapat diakses tanpa 404.
- [ ] Waterfall Chart menampilkan kolom bertingkat dari nilai awal ke nilai akhir.
- [ ] Chart dengan konfigurasi rusak menampilkan fallback informatif, bukan halaman kosong.

## Phase 4 QA record

Tanggal: 2026-09-22

- [x] `node data-quality-checker/tests/profiling.test.js` — profiling fixture lulus.
- [x] `node data-quality-checker/tests/analytics.test.js` — event hanya membawa file type dan bucket metadata; filename, column names, dan values tidak ikut.
- [x] Browser worker smoke — CSV actual fixture 20 baris/0 issue dan XLSX multi-sheet lulus.
- [x] Full-page acceptance — dataset bensin tampil dengan overview, issues, column profile, histogram, preview, dan duplicate state.
- [x] Responsive CSS — breakpoint 820/600/360px, tabel memakai contained horizontal scroll, dan tidak menambah overflow halaman.
- [x] Accessibility baseline — dropzone keyboard, labels/ARIA, status/error live regions, visible focus, dan reduced-motion rule tersedia.
