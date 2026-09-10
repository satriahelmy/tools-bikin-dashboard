# Tasks — Resource Hub (Atomic)

Dokumen ini diturunkan dari `prd.md` dan mengikuti aturan visual di `design.md`.

## 0) Setup & Struktur File

- [x] T001 — Buat `index.html` sebagai entry page utama `resources.bikindashboard.com`.
  - Output: file `index.html` tersedia di root project.
- [x] T002 — Buat `style.css` terpisah (sesuai aturan multi-file + JSON di `design.md`).
  - Output: file `style.css` tersedia dan dilink dari `index.html`.
- [x] T003 — Siapkan `resources.json` dengan root object `{ "resources": [] }`.
  - Output: file `resources.json` valid JSON dan bisa di-fetch.

## 1) Fondasi Design System

- [x] T004 — Tambahkan Google Fonts Plus Jakarta Sans + JetBrains Mono di `index.html`.
  - Output: font termuat dari Google Fonts.
- [x] T005 — Definisikan seluruh CSS variables `--bd-*` pada `:root` di `style.css`.
  - Output: tidak ada hardcoded color untuk komponen utama.
- [x] T006 — Terapkan base layout: `body` flex column, topbar sticky, main container, footer.
  - Output: struktur layout konsisten dengan template `design.md`.
- [x] T007 — Implement topbar dengan back link ke `https://bikindashboard.com` dan judul halaman.
  - Output: topbar tampil sticky di atas saat scroll.

## 2) Struktur UI Halaman

- [x] T008 — Tambahkan section pencarian dengan input class `bd-input`.
  - Output: ada satu input pencarian dengan placeholder yang jelas.
- [x] T009 — Tambahkan row filter kategori dalam bentuk chip horizontal (scrollable di mobile).
  - Output: tersedia opsi `Semua` + 6 kategori PRD.
- [x] T010 — Tambahkan area filter tag multi-select berbasis chip.
  - Output: user bisa melihat dan klik chip tag aktif/non-aktif.
- [x] T011 — Tambahkan elemen resource count (`Menampilkan X dari Y resource`).
  - Output: teks count ada dan bisa diupdate via JS.
- [x] T012 — Tambahkan container grid untuk card resource.
  - Output: grid 1 kolom mobile, 2-3 kolom desktop.
- [x] T013 — Tambahkan komponen empty state ramah saat hasil kosong.
  - Output: empty state hanya muncul saat tidak ada hasil.

## 3) Styling Komponen (Design Compliance)

- [x] T014 — Buat style komponen `bd-card`, `bd-badge`, `bd-input`, `bd-btn`, `bd-toast`.
  - Output: style class mengikuti pola dan token dari `design.md`.
- [x] T015 — Buat style chip kategori/tag dengan state default, hover, dan active.
  - Output: state aktif terlihat jelas tanpa melanggar token warna.
- [x] T016 — Buat style card resource: nama, deskripsi, badge kategori/tags/price.
  - Output: hierarchy teks jelas dan spacing konsisten.
- [x] T017 — Buat style blok catatan kurator dengan background `--bd-bg-secondary` dan border kiri `--bd-primary`.
  - Output: catatan kurator menonjol dan konsisten dengan PRD.
- [x] T018 — Pastikan semua elemen interaktif punya state hover/active/focus.
  - Output: aksesibilitas visual dasar terpenuhi.

## 4) Data Loading & Validasi Dasar

- [x] T019 — Implement fetch `resources.json` saat halaman load.
  - Output: data termuat tanpa reload manual.
- [x] T020 — Simpan state data mentah (`allResources`) dan data tampil (`filteredResources`).
  - Output: filtering tidak memodifikasi data asli.
- [x] T021 — Tangani kegagalan fetch dengan fallback UI (pesan error ringan).
  - Output: user mendapat feedback jika data gagal dimuat.

## 5) Logika Filter & Search

- [x] T022 — Implement search real-time pada field `name`, `description`, dan `note`.
  - Output: hasil berubah saat user mengetik, tanpa Enter.
- [x] T023 — Implement filter kategori single-select (`Semua` atau satu kategori aktif).
  - Output: hanya resource kategori aktif yang tampil.
- [x] T024 — Implement filter tag multi-select (AND logic antar tag terpilih).
  - Output: resource harus memenuhi semua tag aktif.
- [x] T025 — Gabungkan search + kategori + tag dalam satu pipeline filtering.
  - Output: kombinasi filter bekerja konsisten.
- [x] T026 — Implement reset cepat filter (opsional tombol atau pilih ulang state default).
  - Output: user bisa kembali ke tampilan semua resource.

## 6) Rendering Resource Card

- [x] T027 — Render nama resource sebagai link eksternal (`target="_blank"` + `rel="noopener noreferrer"`).
  - Output: klik nama membuka tab baru dengan aman.
- [x] T028 — Render deskripsi singkat 1-2 kalimat sesuai data.
  - Output: deskripsi tampil rapi tanpa merusak layout.
- [x] T029 — Render badge kategori, price, dan tags untuk setiap resource.
  - Output: metadata utama terbaca cepat.
- [x] T030 — Render blok catatan kurator hanya jika field `note` ada.
  - Output: card tanpa note tidak menampilkan placeholder kosong.

## 7) State Sinkronisasi UI

- [x] T031 — Update teks count setelah setiap perubahan filter.
  - Output: format `Menampilkan X dari Y resource` selalu akurat.
- [x] T032 — Toggle empty state vs grid list sesuai jumlah hasil.
  - Output: hanya satu state yang aktif pada satu waktu.
- [x] T033 — Generate daftar tag dinamis dari data (plus tag penting bila diperlukan).
  - Output: filter tag mengikuti isi `resources.json`.

## 8) Konten Awal & Kurasi

- [x] T034 — Isi `resources.json` dengan data awal lintas 6 kategori PRD.
  - Output: setiap kategori minimal punya 1 resource awal.
- [x] T035 — Pastikan field wajib (`name`, `url`, `description`, `category`, `tags`, `price`) terisi di setiap item.
  - Output: tidak ada item invalid untuk render.
- [x] T036 — Tambahkan `note` kurator pada resource yang butuh konteks praktis.
  - Output: value-add kurasi terlihat pada sebagian card.

## 9) QA Fungsional

- [ ] T037 — Uji search keyword yang match `name`, `description`, dan `note`.
  - Output: 3 skenario match lulus.
- [ ] T038 — Uji kombinasi kategori + multi-tag + search secara bersamaan.
  - Output: hasil konsisten dan dapat diprediksi.
- [ ] T039 — Uji empty state pada kondisi tanpa hasil.
  - Output: pesan empty state muncul dengan copy ramah.
- [ ] T040 — Uji link resource membuka tab baru.
  - Output: semua link utama berfungsi.

## 10) QA Visual & Responsif

- [ ] T041 — Verifikasi topbar sticky berjalan di desktop dan mobile.
  - Output: topbar tetap terlihat saat scroll.
- [ ] T042 — Verifikasi chip kategori horizontal dapat di-scroll di mobile.
  - Output: semua kategori tetap bisa diakses layar kecil.
- [ ] T043 — Verifikasi grid card: 1 kolom mobile, 2-3 kolom desktop.
  - Output: layout tidak pecah di breakpoint umum.
- [ ] T044 — Verifikasi tidak ada warna hardcoded yang melanggar token `--bd-*`.
  - Output: kepatuhan design system terjaga.

## 11) Finalisasi

- [x] T045 — Rapikan copywriting UI agar tone profesional-approachable (Bahasa Indonesia).
  - Output: konsisten dengan brand voice bikindashboard.com.
- [x] T046 — Tambahkan komentar singkat di JS untuk blok logika yang tidak trivial.
  - Output: maintainability meningkat tanpa komentar berlebihan.
- [x] T047 — Final pass manual untuk memastikan out-of-scope PRD tidak ikut terimplementasi.
  - Output: scope fase 1 tetap bersih.
