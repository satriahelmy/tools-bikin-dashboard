# QA Checklist — Color Palette Generator (Phase 1)

Dokumen ini dipakai untuk validasi flow utama berdasarkan `tasks.md`.

## 1) Sanity Checks (Completed)

- [x] Asset reference antar halaman valid (`style.css`, `utils.js`, script per halaman).
- [x] `palettes.json` valid JSON.
- [x] Jumlah curated palette = **50** item (sesuai target minimum PRD).

## 2) Generator (`index.html`)

- [ ] Generate otomatis saat halaman load.
- [ ] Tombol `Generate` hanya mengubah swatch yang tidak lock.
- [ ] Shortcut `Space` bekerja (saat fokus bukan di input).
- [ ] Lock/unlock per swatch berjalan stabil.
- [ ] Copy hex di swatch menampilkan toast `Copied #HEXCODE`.
- [ ] Hex chips sinkron dengan warna swatch terbaru.
- [ ] Harmony mode (`Random`, `Analogous`, `Complementary`, `Triadic`, `Monochromatic`) mengubah distribusi warna.
- [ ] Seed hex valid (`#3B82F6`) dipakai sebagai warna pertama.
- [ ] Seed keyword (`ocean`, `forest`, dst.) memengaruhi hue dasar.
- [ ] Export Tableau menghasilkan `palette.tps`.
- [ ] Export Power BI menghasilkan `theme.json`.
- [ ] Copy CSS variables menampilkan toast `CSS variables copied`.
- [ ] Live preview update real-time saat palette berubah.
- [ ] Toggle preview `Light` dan `Dark` berfungsi.

## 3) From Image (`image.html`)

- [ ] Drag & drop file gambar bekerja.
- [ ] Click-to-upload bekerja.
- [ ] File invalid format menampilkan toast error format.
- [ ] File >5MB menampilkan toast error ukuran.
- [ ] Preview gambar tampil setelah upload valid.
- [ ] Loading state `Menganalisis warna...` tampil selama proses.
- [ ] K-means menghasilkan 5 warna dominan.
- [ ] Swatch hasil bisa copy per warna.
- [ ] Export TPS/JSON/CSS dari hasil image berjalan.
- [ ] Tombol `Edit di Generator` memindahkan palette ke `index.html`.
- [ ] Error handling analisis gagal menampilkan toast yang sesuai.

## 4) Explore (`explore.html`)

- [ ] Fetch `palettes.json` sukses.
- [ ] Skeleton tampil saat loading awal.
- [ ] Grid card tampil untuk data palette.
- [ ] Search realtime by `name`/`tags` berjalan.
- [ ] Filter mood berjalan.
- [ ] Filter industry berjalan.
- [ ] Kombinasi search + filter menghasilkan subset yang benar.
- [ ] Tombol `Pakai palette ini` membuka generator dengan palette terpilih.
- [ ] Empty state tampil jika tidak ada hasil filter.

## 5) Accessibility & UX Baseline

- [ ] Semua tombol ikon punya `aria-label`.
- [ ] Navigasi keyboard masih usable.
- [ ] Fokus input/button terlihat jelas.
- [ ] Kontras teks di atas swatch tetap terbaca (dark/light foreground).

## 6) Cross-Viewport

- [ ] Desktop (`>=1024px`) layout tetap rapi.
- [ ] Tablet (`~768px`) topbar/tab tetap usable.
- [ ] Mobile (`<768px`) grid, controls, dan action button tidak overlap.

## 7) Catatan Eksekusi

- Sanity check otomatis yang sudah dijalankan dari terminal:
  - Referensi asset antar HTML sudah terdeteksi valid.
  - Parsing `palettes.json` sukses dan count = `50`.
- Checklist lain perlu verifikasi manual di browser (interaction/UI behavior).
