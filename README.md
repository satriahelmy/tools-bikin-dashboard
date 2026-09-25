# bikindashboard.com

Toolkit statis untuk membantu pekerjaan dashboard dan data visualization. Project ini menyatukan beberapa tool dalam satu navigasi dan berjalan di browser dengan HTML, CSS, dan JavaScript—tanpa Laravel, database, atau backend aplikasi.

## Fitur terbaru

- **Color Palette** — membuat palet dari satu warna, mengambil warna dari gambar, menjelajahi palet berdasarkan mood/industri, lalu mengekspor ke Tableau TPS, Power BI JSON, CSS, PNG, atau JPG.
- **Chart Guide** — mencari chart berdasarkan kebutuhan analisis, melihat struktur data dan contoh penggunaan, serta membuka halaman detail setiap chart.
- **Resource Hub** — mencari dan memfilter kumpulan tools, dataset, tutorial, komunitas, dan inspirasi data berdasarkan kategori dan tag.
- **Data Quality Checker** — memeriksa file CSV/XLSX secara lokal di browser, termasuk missing values, duplicate rows, tipe data, profile kolom, histogram sederhana, preview, dan deteksi issue berdasarkan severity.
- **Paper Library** — katalog 143 paper terkurasi untuk data, visualization, machine learning, dan AI dengan pencarian, filter, sorting, 138 link paper gratis terverifikasi, dan 69 repository code terverifikasi.
- **Book Library** — katalog 141 buku data legal dan gratis dari penulis, penerbit, universitas, dan proyek open-access, dengan pencarian judul/author/topik, filter kategori/level/format/tools, serta CTA ke URL resmi yang sudah diverifikasi.

Semua halaman memakai navigasi bersama, responsive layout, active route state, empty/error state, dan baseline aksesibilitas.

## Menjalankan di XAMPP

1. Pastikan folder repository berada di `C:\xampp\htdocs\bikindashboard`.
2. Jalankan Apache dari XAMPP Control Panel.
3. Buka [http://localhost/bikindashboard/](http://localhost/bikindashboard/).

Untuk preview server statis tanpa Apache, jalankan dari folder ini:

```powershell
php -S 127.0.0.1:8765
```

Kemudian buka [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

## Rute utama

- `/` — beranda dan katalog seluruh tool.
- `/colorpalette/` — generator palet utama.
- `/colorpalette/image.html` — ekstraksi warna dari gambar.
- `/colorpalette/explore.html` — eksplorasi palet berdasarkan mood dan industri.
- `/colorpalette/guide.html` — panduan penggunaan hasil ekspor.
- `/chart/` — katalog Chart Guide.
- `/chart/chart.html?id=bar-chart` — detail chart dengan contoh data dan visualisasi.
- `/resourcehub/` — katalog resource data visualization.
- `/data-quality-checker/` — pemeriksaan awal kualitas CSV/XLSX secara client-side.
- `/privacy.html` — kebijakan privasi situs dan penjelasan pemrosesan data.
- `/papers/` — katalog Paper Library dengan 143 paper terkurasi dan filter client-side.
- `/book-library/` — katalog Book Library dengan buku data legal dan gratis, filter client-side, query state, dan link baca eksternal.

Chart.js tersedia dari bundle lokal `chart/chart.umd.min.js`. Treemap, Box Plot, dan Heatmap memakai renderer SVG lokal di `chart/native-renderers.js`. Batasan dan perilaku V1 Data Quality Checker dijelaskan di [`data-quality-checker/README.md`](data-quality-checker/README.md).

## Struktur project

- `assets/` — navigasi, design system, token, favicon, logo, dan aset bersama.
- `colorpalette/` — seluruh halaman dan script Color Palette.
- `chart/` — katalog, halaman detail, data chart, dan renderer lokal.
- `resourcehub/` — katalog resource beserta data JSON dan filter.
- `data-quality-checker/` — parser, worker, profiling, model, dan UI pemeriksaan dataset.
- `papers/` — route, shell, dan page-specific assets Paper Library.
- `book-library/` — route, shell, dan page-specific assets Book Library.
- `data/` — source dataset Paper Library, hasil transformasi `papers.json`, dan dataset produksi Book Library `books.json` yang dipakai runtime.
- `scripts/` — script development-only untuk mengubah workbook Paper Library menjadi JSON runtime.
- `tools/` — data katalog tool dan halaman kompatibilitas/redirect lama.
- `docs/` dan `design/` — dokumentasi sumber, PRD, desain, dan arsip; bukan route aplikasi utama.

## Catatan deployment

- Publish isi project dari root repository beserta folder tool, `papers/`, `data/`, dan `assets/`.
- Pastikan `data/books.json` ikut dipublish karena Book Library memuat seluruh katalog buku dari file tersebut di browser.
- `assets/nav.js`, `assets/nav.css`, favicon, logo, dan share image adalah aset produksi bersama.
- `assets/tokens.css` adalah sumber tunggal token desain bersama.
- Folder tool menyimpan data JSON, bundle lokal, dan script yang dipakai halaman masing-masing.
- Setelah workbook berubah, regenerasi katalog dengan `python scripts/build_papers_data.py` dari root repository dan review ringkasan validasinya sebelum publish.
- `data/books.json` adalah dataset produksi editorial; jangan mengubah, menambah, atau memperkaya metadata secara otomatis tanpa review sumber.
- Book Library hanya menampilkan CTA untuk URL buku yang verified dan membuka sumber resmi di tab baru; BikinDashboard tidak me-host PDF atau isi buku.
- Data Quality Checker memproses file di browser. Nama file, nama kolom, dan nilai dataset tidak dikirim ke backend aplikasi.
- `robots.txt`, `sitemap.xml`, dan `site.webmanifest` berada di root untuk kebutuhan crawler dan instalasi web app.
- Dokumen PRD, checklist, desain, dan arsip ZIP dipisahkan ke [`docs/`](docs/) dan [`design/`](design/) sebagai referensi sumber; jangan jadikan keduanya route aplikasi.
- Sebelum deploy, jalankan checklist di [SMOKE-TEST.md](SMOKE-TEST.md).

## Pengujian lokal

Test unit untuk profiling dan metadata event Data Quality Checker dapat dijalankan dengan:

```powershell
node data-quality-checker/tests/profiling.test.js
node data-quality-checker/tests/analytics.test.js
```

Untuk validasi UI lintas route, gunakan checklist di [SMOKE-TEST.md](SMOKE-TEST.md).
