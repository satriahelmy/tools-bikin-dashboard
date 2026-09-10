# Smoke test sebelum deployment

Tanggal: __________  Tester: __________  Browser: __________

## Route dan shell

- [ ] `/` terbuka tanpa error; judul dan kartu tools tampil.
- [ ] Sidebar mengarah ke Beranda, Color Palette, Chart Guide, dan Resource Hub.
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

## Aksesibilitas dan visual

- [ ] Semua kontrol dapat dicapai dengan Tab dan focus ring terlihat.
- [ ] Tombol icon (lock/copy/menu) memiliki nama aksesibel.
- [ ] Teks utama terbaca pada background normal; swatch memiliki label/kode hex.
- [ ] Dengan `prefers-reduced-motion`, transisi tidak mengganggu penggunaan.

## Production readiness P3

- [ ] `/robots.txt`, `/sitemap.xml`, dan `/site.webmanifest` dapat diakses tanpa 404.
- [ ] Waterfall Chart menampilkan kolom bertingkat dari nilai awal ke nilai akhir.
- [ ] Chart dengan konfigurasi rusak menampilkan fallback informatif, bukan halaman kosong.
