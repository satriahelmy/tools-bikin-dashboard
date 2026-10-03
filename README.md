# bikindashboard.com

Toolkit statis untuk membantu pekerjaan dashboard dan data visualization. Project ini menyatukan beberapa tool dalam satu navigasi dan berjalan di browser dengan HTML, CSS, dan JavaScript—tanpa Laravel, database, atau backend aplikasi.

## Fitur terbaru

- **Color Palette** — membuat palet dari satu warna, mengambil warna dari gambar, menjelajahi palet berdasarkan mood/industri, lalu mengekspor ke Tableau TPS, Power BI JSON, CSS, PNG, atau JPG.
- **Chart Guide** — mencari chart berdasarkan kebutuhan analisis, melihat struktur data dan contoh penggunaan, serta membuka halaman detail setiap chart.
- **Resource Hub** — mencari dan memfilter kumpulan tools, dataset, tutorial, komunitas, dan inspirasi data berdasarkan kategori dan tag.
- **Data Quality Checker** — memeriksa file CSV/XLSX secara lokal di browser, termasuk missing values, duplicate rows, tipe data, profile kolom, histogram sederhana, preview, dan deteksi issue berdasarkan severity.
- **Paper Library** — katalog 143 paper terkurasi untuk data, visualization, machine learning, dan AI dengan pencarian, filter, sorting, 138 link paper gratis terverifikasi, dan 69 repository code terverifikasi.
- **Book Library** — katalog 145 buku data legal dan gratis dari penulis, penerbit, universitas, dan proyek open-access, dengan pencarian judul/author/topik, filter kategori/level/format/tools, halaman detail yang dapat dibagikan per buku, serta CTA ke URL resmi yang sudah diverifikasi.
- **Data Challenge** — katalog latihan analisis berbasis kasus bisnis dengan dataset dan data dictionary yang dapat diunduh; Challenge #01 adalah Coffee Shop Performance.

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
- `/book-library/books/<slug>/` — halaman detail statis per buku untuk canonical URL dan share link; slug dibuat dari judul buku.
- `/challenge/` — katalog Data Challenge.
- `/challenge/coffee-shop-performance/` — brief dan dataset Challenge #01 — Coffee Shop Performance.

Chart.js tersedia dari bundle lokal `chart/chart.umd.min.js`. Treemap, Box Plot, dan Heatmap memakai renderer SVG lokal di `chart/native-renderers.js`. Batasan dan perilaku V1 Data Quality Checker dijelaskan di [`data-quality-checker/README.md`](data-quality-checker/README.md).

## Struktur project

- `assets/` — navigasi, design system, token, favicon, logo, dan aset bersama.
- `colorpalette/` — seluruh halaman dan script Color Palette.
- `chart/` — katalog, halaman detail, data chart, dan renderer lokal.
- `resourcehub/` — katalog resource beserta data JSON dan filter.
- `data-quality-checker/` — parser, worker, profiling, model, dan UI pemeriksaan dataset.
- `papers/` — route, shell, dan page-specific assets Paper Library.
- `book-library/` — route, shell, page-specific assets, dan halaman detail statis Book Library.
- `challenge/` — katalog dan halaman detail Data Challenge yang dihasilkan dari data publik, plus stylesheet dan analytics feature.
- `data/` — JSON runtime publik: `papers.json`, `books.json`, dan metadata challenge `challenges/challenges.json`.
- `downloads/challenges/` — dataset dan data dictionary publik yang dapat diunduh.
- `scripts/` — script development-only untuk mengubah workbook Paper Library, menggabungkan tambahan buku tervalidasi ke JSON runtime, serta menghasilkan halaman detail Book Library dan Data Challenge.
- `docs/source/papers/workbooks/` dan `docs/source/book-library/workbooks/` — workbook editorial dan validasi maintainer; bukan data runtime dan jangan dipublikasikan.
- `tools/` — data katalog tool dan halaman kompatibilitas/redirect lama.
- `docs/` dan `design/` — dokumentasi sumber, PRD, desain, dan arsip; bukan route aplikasi utama.

## Catatan deployment

- Publish file runtime aplikasi dari root repository beserta folder tool, `papers/`, `book-library/`, `challenge/`, `downloads/`, `data/`, dan `assets/`; jangan unggah seluruh repository tanpa mengecualikan materi maintainer.
- Sertakan halaman hasil generasi di `challenge/`, metadata publik di `data/challenges/`, dan CSV publik di `downloads/challenges/`. Jangan publikasikan `docs/`; folder ini memuat materi maintainer. `docs/.htaccess` memblokir akses lewat Apache, tetapi host yang mengabaikan `.htaccess` tetap harus mengecualikan folder ini dari publish artifact.
- Pastikan `data/books.json` ikut dipublish karena Book Library memuat seluruh katalog buku dari file tersebut di browser.
- `assets/nav.js`, `assets/nav.css`, favicon, logo, dan share image adalah aset produksi bersama.
- `assets/tokens.css` adalah sumber tunggal token desain bersama.
- Folder tool menyimpan data JSON, bundle lokal, dan script yang dipakai halaman masing-masing.
- Workbook sumber Paper Library ada di `docs/source/papers/workbooks/bikindashboard_paper_library_master_latest.xlsx`. Setelah workbook berubah, regenerasi katalog dengan `python scripts/build_papers_data.py` dari root repository dan review ringkasan validasinya sebelum publish.
- Workbook tambahan buku ada di `docs/source/book-library/workbooks/modern_ai_books_validated.xlsx`. Setelah workbook berubah, jalankan `python scripts/build_books_data.py` dari root repository; hanya baris yang ditandai `Yes` yang digabungkan ke katalog dan baris paid/preview/course tetap dikecualikan.
- Setelah `data/books.json` berubah, jalankan `python scripts/build_book_detail_pages.py` dari root repository untuk membuat ulang halaman detail statis dan memperbarui `sitemap.xml`.
- Setelah metadata challenge atau CSV data dictionary berubah, jalankan `python scripts/build_challenge_pages.py` dari root repository untuk memvalidasi data, membuat katalog/halaman detail statis, dan memperbarui `sitemap.xml`.
- `data/books.json` adalah dataset runtime hasil katalog lama dan tambahan buku tervalidasi; metadata yang tidak tersedia di workbook dibiarkan kosong, bukan ditebak atau diperkaya otomatis. Workbook sumber tetap di bawah `docs/source/`.
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
