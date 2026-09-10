# BikinDashboard — Unified Tools Improvement Tasks

Dokumen ini menjadi roadmap untuk menyatukan dan memoles seluruh tools BikinDashboard sebagai satu website yang konsisten, usable, dan tidak terasa seperti template generik.

## Tujuan

- Menjadikan root website sebagai entry point utama.
- Menyediakan navigasi global yang konsisten di semua tools.
- Mempertahankan fungsi existing tanpa framework atau backend.
- Membuat tiap tool memiliki karakter layout dan konteks yang jelas.
- Meningkatkan kualitas visual, copy, responsive behavior, accessibility, dan discoverability.

## Struktur saat ini

- `index.html` — beranda unified tools.
- `colorpalette/` — generator, ekstraksi warna dari gambar, eksplorasi palet, dan panduan ekspor.
- `chart/` — daftar chart, halaman detail chart, bundle lokal `chart.umd.min.js`, dan renderer SVG `native-renderers.js` untuk tipe non-core.
- `resourcehub/` — katalog resource data visualization.
- `tools/` — halaman katalog legacy dan data tool.
- `assets/nav.js` + `assets/nav.css` — navigasi global dan sidebar.
- `assets/tokens.css` — token desain bersama untuk seluruh tool.

## Status yang sudah selesai

- [x] Membuat root `index.html` sebagai beranda unified tools.
- [x] Menambahkan sidebar/header global responsive.
- [x] Mengarahkan navigasi antar-tool ke rute internal.
- [x] Memperbaiki layout agar area kerja mengisi ruang setelah sidebar.
- [x] Mengganti ikon sidebar dengan SVG.
- [x] Menambahkan CTA `Buka tool` pada kartu beranda.
- [x] Menambahkan intro kontekstual pada Color Palette dan Resource Hub.
- [x] Menyegarkan copy UI ke Bahasa Indonesia yang lebih ringkas dan terasa ditulis manusia.
- [x] Merapikan alignment kontrol Generator Palet Warna.
- [x] Memendekkan tinggi area swatch agar tidak mendominasi layar.
- [x] Menjalankan smoke test seluruh halaman tanpa error JavaScript.
- [x] Membundel Chart.js secara lokal agar visualisasi detail tetap berjalan tanpa CDN.
- [x] Menyediakan navigasi kembali ke overview pada halaman detail Chart Guide.
- [x] Menambahkan favicon, share image, metadata Open Graph beranda, dan canonical URL per route.
- [x] Menambahkan focus ring global, nama aksesibel untuk kontrol/icon, toggle state ARIA, dan dukungan `prefers-reduced-motion`.
- [x] Menambahkan README XAMPP dan checklist smoke test deployment.
- [x] Mengurangi badge kategori yang berulang pada kartu Chart Guide.
- [x] Membuat token CSS bersama di `assets/tokens.css` agar perubahan visual tidak perlu disalin ke tiap tool.
- [x] Memisahkan dokumen sumber dan arsip ZIP ke `docs/` agar folder runtime hanya berisi aset aplikasi.
- [x] Menstabilkan layout mobile: topbar tidak tertutup tombol menu, kontrol dapat wrap/scroll, dan kartu/detail tidak meluber horizontal.

## Prioritas P0 — Fondasi dan konsistensi

### Navigasi dan shell aplikasi

- [x] Pastikan sidebar menjadi navigasi global utama.
- [x] Pastikan topbar hanya menampilkan konteks halaman, bukan navigasi duplikat.
- [x] Pastikan active state sidebar dan tab tool selalu benar pada semua URL.
- [x] Redirect atau jadikan `tools/index.html` sebagai halaman legacy yang mengarah ke root.
- [x] Pastikan rute bekerja di root domain dan subfolder XAMPP.

### Responsive layout

- [x] Uji layout pada lebar desktop besar, desktop biasa, tablet 900–1200px, dan mobile.
- [x] Pastikan Color Palette tidak membuat kontrol terlalu sempit pada ukuran tablet.
- [x] Pastikan grid tidak menghasilkan kartu yang terlalu lebar atau terlalu tinggi.
- [x] Pastikan sidebar mobile dapat dibuka, ditutup, dan digunakan dengan keyboard.

### Bahasa dan terminologi

- [x] Gunakan Bahasa Indonesia sebagai bahasa utama UI.
- [x] Pertahankan istilah teknis yang memang lebih lazim dalam bahasa Inggris, seperti Tableau, Power BI, Chart.js, CSS, dan JSON.
- [x] Samakan istilah: `palet`, `ekspor`, `salin`, `pratinjau`, `suasana`, dan `resource`.

## Prioritas P1 — Diferensiasi tiap tool

### Color Palette

- [x] Tambahkan label konteks seperti `Palet saat ini` dan `Hasil ekspor`.
- [x] Pertahankan area swatch sebagai fokus utama, tetapi jangan membuatnya terlalu tinggi.
- [x] Pastikan tombol mode, generate, export, lock, dan copy memiliki hierarchy yang jelas.
- [x] Pastikan preview dashboard menjadi contoh penggunaan, bukan sekadar blok dekoratif.
- [x] Tambahkan state kosong/error yang mudah dipahami pada fitur From Image.

### Chart Guide

- [x] Tambahkan thumbnail mini untuk setiap tipe chart.
- [x] Tampilkan metadata singkat: tujuan, kategori, dan jumlah variabel yang dibutuhkan.
- [x] Pertahankan halaman detail sebagai tempat pembelajaran mendalam.
- [x] Pastikan visualisasi interaktif memiliki fallback jika Chart.js gagal dimuat.

### Resource Hub

- [x] Tambahkan domain sumber pada setiap resource.
- [x] Tambahkan CTA yang jelas, yaitu `Buka link`.
- [x] Bedakan metadata utama dari tag tambahan agar tidak terjadi badge soup.
- [x] Pertahankan pencarian, filter kategori, filter tag, dan reset filter.

### Beranda unified tools

- [x] Pertahankan hero yang ringkas dan berorientasi tugas.
- [x] Buat tiap kartu tool memiliki manfaat utama dan CTA yang jelas.
- [ ] Pertimbangkan section `Mulai dari sini` atau tool unggulan jika jumlah tool bertambah.
- [x] Hindari whitespace kosong yang tidak membantu pengguna.

## Prioritas P2 — Brand, accessibility, dan kualitas produksi

### Identitas visual

- [x] Finalisasi sistem ikon SVG yang konsisten.
- [x] Evaluasi logo mark `b` dan pertahankan bentuk sederhana yang sudah konsisten di shell.
- [x] Kurangi penggunaan pill/badge yang tidak informatif (kategori chart tidak diulang sebagai badge).
- [x] Gunakan accent color hanya untuk aksi dan status penting.
- [x] Pastikan komponen shared tidak terlihat seperti template yang sama di setiap halaman.

### Accessibility

- [x] Pastikan semua kontrol keyboard-accessible.
- [x] Pastikan semua tombol icon memiliki accessible name.
- [x] Pastikan focus state terlihat jelas.
- [x] Pastikan kontras teks dan warna swatch memenuhi kebutuhan penggunaan normal.
- [x] Tambahkan dukungan `prefers-reduced-motion` jika animasi bertambah.

### SEO dan sharing

- [x] Tambahkan favicon.
- [x] Tambahkan `og:title`, `og:description`, dan `og:image` pada halaman utama.
- [x] Pastikan setiap halaman memiliki title dan description yang unik.
- [x] Pastikan rute publik menggunakan URL canonical yang konsisten.

### Maintenance

- [x] Pisahkan asset produksi dari dokumen PRD, checklist, dan file ZIP ke `docs/source/` dan `docs/archive/`; dokumen operasional root (`README.md`, `SMOKE-TEST.md`, `task.md`) tetap mudah ditemukan.
- [x] Hindari duplikasi token CSS yang tidak perlu jika sistem shared sudah stabil (`assets/tokens.css`).
- [x] Tambahkan dokumentasi cara menjalankan website di XAMPP.
- [x] Tambahkan checklist smoke test sebelum deployment.

## Prioritas P3 — Production readiness dan fidelity data

- [x] Perbaiki Waterfall Chart menjadi floating bar yang menunjukkan alur kumulatif.
- [x] Validasi konfigurasi chart sebelum inisialisasi Chart.js dan tampilkan fallback informatif jika data tidak valid.
- [x] Tambahkan `robots.txt`, `sitemap.xml`, dan web manifest untuk kesiapan publikasi.
- [x] Tambahkan theme color konsisten pada seluruh route aplikasi.
- [x] Sediakan renderer native untuk tipe yang membutuhkan plugin khusus (Treemap, Box Plot, dan Heatmap) melalui `chart/native-renderers.js`.

## Acceptance criteria

Pekerjaan dianggap siap untuk deployment apabila:

1. `http://localhost/bikindashboard/` membuka beranda unified tools.
2. Semua link sidebar menuju halaman yang benar dan active state sesuai halaman.
3. Generator Palet Warna dapat membuat palette, lock warna, menyalin hex, dan mengekspor hasil.
4. From Image dapat menerima format JPG, PNG, dan WEBP serta menampilkan hasil analisis.
5. Explore dapat mencari dan memfilter palette.
6. Chart Guide memuat seluruh data chart dan halaman detail dapat dibuka.
7. Resource Hub memuat resource, pencarian, filter kategori/tag, dan reset filter.
8. Tidak ada error JavaScript pada halaman utama dalam kondisi normal.
9. Layout dapat digunakan pada desktop, tablet, dan mobile.
10. UI utama memakai Bahasa Indonesia yang konsisten.

## Cara menjalankan lokal

Dengan XAMPP, buka:

```text
http://localhost/bikindashboard/
```

Jika perlu server statis sementara:

```text
php -S 127.0.0.1:8765
```

Lalu buka:

```text
http://127.0.0.1:8765/
```

## Urutan eksekusi yang disarankan

1. Selesaikan P0 dan pastikan seluruh rute/responsive stabil.
2. Selesaikan diferensiasi Color Palette, Chart Guide, dan Resource Hub pada P1.
3. Jalankan acceptance test menggunakan [SMOKE-TEST.md](SMOKE-TEST.md).
4. P2 inti (aksesibilitas, SEO, identitas, token shared, dan dokumentasi) selesai; pertahankan pemisahan dokumen sumber sebagai cleanup rilis bila diperlukan.
