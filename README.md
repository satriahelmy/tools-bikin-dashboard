# bikindashboard.com — Unified Tools

Website statis yang menyatukan Color Palette, Chart Guide, dan Resource Hub dalam satu navigasi. Tidak membutuhkan Laravel atau database; seluruh fitur berjalan di browser dengan HTML, CSS, dan JavaScript.

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
- `/colorpalette/` — generator palet, ekstraksi gambar, eksplorasi, dan panduan ekspor.
- `/chart/` — katalog Chart Guide.
- `/chart/chart.html?id=bar-chart` — detail chart; Chart.js tersedia dari bundle lokal `chart/chart.umd.min.js`.
- Treemap, Box Plot, dan Heatmap memakai renderer SVG lokal di `chart/native-renderers.js` karena bukan tipe inti Chart.js.
- `/resourcehub/` — katalog resource data visualization.

## Catatan deployment

- `assets/nav.js`, `assets/nav.css`, favicon, dan share image adalah aset produksi bersama.
- `assets/tokens.css` adalah sumber tunggal token desain bersama.
- Folder tool menyimpan data JSON dan script yang dipakai halaman masing-masing.
- `robots.txt`, `sitemap.xml`, dan `site.webmanifest` berada di root untuk kebutuhan crawler dan instalasi web app.
- Dokumen PRD, checklist, dan arsip ZIP dipisahkan ke [`docs/`](docs/) sebagai referensi sumber; jangan ikut dipublish sebagai route aplikasi.
- Sebelum deploy, jalankan checklist di [SMOKE-TEST.md](SMOKE-TEST.md).
