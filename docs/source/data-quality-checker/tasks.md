# Tasks — Data Quality Checker (Atomic + Phased Dependency)

Dokumen ini menurunkan `prd.md` menjadi task implementasi yang dapat diverifikasi. Scope V1 tetap client-side, tanpa login, backend processing, AI, cleaning, atau quality score arbitrer.

## Konvensi

- ID format: `P{phase}-T{number}`
- Status awal: `todo`
- Dependency: task yang harus selesai lebih dulu
- Deliverable: output yang dapat diuji

---

## Phase 0 — Foundation & Scope Lock

### [x] P0-T01 — Siapkan route dan struktur file tool
- Scope: buat folder `data-quality-checker/` dengan entry page, stylesheet, script utama, dan modul profiling yang terpisah.
- Dependency: -
- Deliverable: route lokal dapat dibuka tanpa error fatal dan struktur file siap dikembangkan.

### [x] P0-T02 — Daftarkan tool ke katalog unified tools
- Scope: tambahkan Data Quality Checker sebagai tool keempat di `tools/tools.json`, kartu/route beranda, dan navigasi global yang relevan.
- Dependency: P0-T01
- Deliverable: tool tampil di katalog dan link `/data-quality-checker/` bekerja pada root maupun XAMPP.

### [x] P0-T03 — Terapkan shared shell dan metadata halaman
- Scope: gunakan `assets/nav.js`, `assets/nav.css`, `assets/tokens.css`, favicon, theme color, title, description, canonical, dan Open Graph yang sesuai.
- Dependency: P0-T01, P0-T02
- Deliverable: halaman mengikuti shell BikinDashboard dan metadata tidak memakai placeholder.

### [x] P0-T04 — Pilih dan siapkan parser client-side
- Scope: pilih parser matang untuk CSV dan XLSX, lalu integrasikan secara lokal atau melalui mekanisme bundling yang disepakati. Jangan membuat parser file sendiri.
- Dependency: P0-T01
- Deliverable: fixture CSV dan XLSX dapat dibaca di browser tanpa request berisi dataset ke server.

### [x] P0-T05 — Definisikan model data dan configurable constants
- Scope: definisikan struktur hasil parsing, profile kolom, issue, preview, batas ukuran/row, threshold severity, serta status loading/error.
- Dependency: P0-T01, P0-T04
- Deliverable: engine dan UI memakai kontrak data yang terdokumentasi, bukan object ad hoc.

---

## Phase 1 — Upload, Parsing & Privacy

### [x] P1-T01 — Implement empty state dan upload dropzone
- Scope: tampilkan manfaat tool, dropzone, file picker, format yang didukung, dan copy privasi.
- Dependency: P0-T03, P0-T04
- Deliverable: user dapat memilih file lewat klik maupun drag-and-drop.

### [x] P1-T02 — Validasi file dan batas keamanan dasar
- Scope: validasi `.csv`/`.xlsx`, file kosong, ukuran terlalu besar, dan workbook tanpa data; gunakan pesan error PRD.
- Dependency: P1-T01, P0-T05
- Deliverable: file invalid ditolak tanpa membuat UI freeze atau state setengah jadi.

### [x] P1-T03 — Parse CSV secara lokal
- Scope: parse header, baris, delimiter otomatis bila didukung, blank value, dan malformed input secara graceful.
- Dependency: P1-T02, P0-T04
- Deliverable: CSV valid masuk ke model dataset normalisasi.

### [x] P1-T04 — Parse XLSX dan pilih sheet
- Scope: baca workbook, tampilkan daftar sheet, biarkan user memilih sheet untuk dianalisis, lalu parse header dan barisnya.
- Dependency: P1-T02, P0-T04
- Deliverable: XLSX multi-sheet dapat dianalisis dari sheet yang dipilih.

### [x] P1-T05 — Normalisasi nilai untuk profiling
- Scope: pertahankan nilai asli untuk preview, tetapi sediakan representasi trimmed/lowercase/null-aware untuk missing values, type inference, dan category comparison.
- Dependency: P1-T03, P1-T04, P0-T05
- Deliverable: normalisasi tidak mengubah data asli yang ditampilkan ke user.

### [x] P1-T06 — Tambahkan loading, progress, dan recovery state
- Scope: tampilkan feedback saat parsing/profiling, cegah hang yang tidak terjelaskan, dan sediakan aksi coba lagi/upload file lain.
- Dependency: P1-T03, P1-T04
- Deliverable: state idle, loading, success, empty, unsupported, parsing failure, dan too-large dapat dibedakan.

### [x] P1-T07 — Pindahkan pekerjaan berat ke Web Worker bila diperlukan
- Scope: ukur parsing/profiling pada fixture besar dan gunakan Web Worker jika main thread tidak responsif.
- Dependency: P1-T06, P2-T01
- Deliverable: batas implementasi ditetapkan berdasarkan performance test, bukan asumsi.

---

## Phase 2 — Profiling Engine

### [x] P2-T01 — Hitung dataset overview
- Scope: rows, columns, full-row duplicate count, columns with missing values, file name, dan file size.
- Dependency: P1-T05
- Deliverable: hasil overview akurat terhadap fixture yang memiliki nilai kosong dan duplicate.

### [x] P2-T02 — Infer tipe kolom
- Scope: klasifikasikan kolom sebagai `Text`, `Number`, `Date`, `Boolean`, atau `Empty`; integer dan decimal masuk `Number`.
- Dependency: P1-T05
- Deliverable: inference konsisten dan memiliki fallback aman untuk nilai ambigu.

### [x] P2-T03 — Hitung missing dan unique values
- Scope: hitung `missing_count`, `missing_percentage`, serta unique count dengan aturan null, blank, empty string, dan whitespace-only.
- Dependency: P1-T05
- Deliverable: angka dan persentase dapat diverifikasi dengan fixture kecil.

### [x] P2-T04 — Hitung numeric profile
- Scope: count, missing, unique, min, max, mean, dan median; Q1/Q3/standard deviation hanya jika tidak memperbesar kompleksitas secara berarti.
- Dependency: P2-T02, P2-T03
- Deliverable: profile numeric benar untuk bilangan bulat, desimal, dan missing values.

### [x] P2-T05 — Hitung categorical profile
- Scope: total values, missing, unique, top values, count, dan percentage; batasi hasil render ke Top 10.
- Dependency: P2-T02, P2-T03
- Deliverable: kategori teratas terurut dan persentasenya benar.

### [x] P2-T06 — Hitung date profile
- Scope: earliest date, latest date, missing, dan unique dates.
- Dependency: P2-T02, P2-T03
- Deliverable: tanggal valid terdeteksi dan tanggal invalid tidak merusak seluruh profile.

### [x] P2-T07 — Deteksi full-row duplicates
- Scope: bandingkan seluruh nilai baris secara deterministik, hitung jumlah duplicate, dan siapkan preview terbatas tanpa fungsi delete.
- Dependency: P1-T05, P2-T01
- Deliverable: duplicate exact row terhitung sesuai fixture dan preview dibatasi.

### [x] P2-T08 — Deteksi issue berbasis rule transparan
- Scope: implement missing values, empty columns, constant columns, potential inconsistent categories, dan high-cardinality information sesuai rule/threshold yang terdokumentasi.
- Dependency: P2-T02, P2-T03, P2-T05, P0-T05
- Deliverable: setiap issue memiliki rule, severity, message, dan referensi kolom/baris bila relevan.

### [x] P2-T09 — Deteksi mixed values secara terisolasi
- Scope: deteksi mayoritas nilai numeric dengan sebagian nilai yang gagal diparse, dan masukkan sebagai P1 tanpa mengganggu P0.
- Dependency: P2-T02, P2-T03
- Deliverable: fixture `100`, `250`, `unknown`, `400` menghasilkan issue mixed values yang dapat dijelaskan.

### [x] P2-T10 — Buat test fixture dan unit checks engine
- Scope: siapkan fixture untuk CSV normal, XLSX multi-sheet, empty data, missing, duplicate, date, boolean, constant, category casing, high cardinality, dan mixed values.
- Dependency: P2-T01 sampai P2-T09
- Deliverable: hasil engine dapat diuji ulang tanpa bergantung pada file user.

---

## Phase 3 — UI Results & Interaction

### [x] P3-T01 — Render dataset overview
- Scope: tampilkan Rows, Columns, Duplicate rows, Columns with missing values, file name, dan file size tanpa terlalu banyak KPI card.
- Dependency: P2-T01
- Deliverable: overview muncul hanya setelah analisis berhasil.

### [x] P3-T02 — Render detected issues
- Scope: kelompokkan issue berdasarkan High/Medium/Low, tampilkan copy faktual, dan tampilkan empty state `No obvious issues detected` bila tidak ada issue.
- Dependency: P2-T08
- Deliverable: UI tidak pernah mengklaim dataset pasti bersih dan severity berasal dari rule.

### [x] P3-T03 — Implement columns table
- Scope: tampilkan Column, Type, Missing, Unique, Status; dukung sorting, pencarian nama kolom, filter All/Issues/Missing/Clean, dan row clickable.
- Dependency: P2-T02, P2-T03, P2-T08
- Deliverable: tabel tetap usable pada dataset dengan banyak kolom.

### [x] P3-T04 — Implement column profile detail
- Scope: tampilkan profile numeric, categorical, atau date sesuai tipe kolom yang dipilih; tampilkan issue terkait kolom.
- Dependency: P2-T04, P2-T05, P2-T06, P3-T03
- Deliverable: klik row membuka detail tanpa kehilangan konteks dataset.

### [x] P3-T05 — Tambahkan histogram numeric bila ringan
- Scope: render histogram sederhana untuk kolom numeric tanpa menjadikannya exploratory analysis lengkap.
- Dependency: P3-T04
- Deliverable: histogram tidak memblokir profile dan memiliki fallback bila data tidak cukup.

### [x] P3-T06 — Render data preview
- Scope: tampilkan maksimal 50 baris, pertahankan nilai asli, dan hindari fitur editing/filtering spreadsheet.
- Dependency: P1-T05, P3-T01
- Deliverable: preview membantu inspeksi tanpa memodifikasi dataset.

### [x] P3-T07 — Implement duplicate row preview P1
- Scope: tampilkan preview terbatas saat user memilih `View duplicate rows`.
- Dependency: P2-T07, P3-T02
- Deliverable: duplicate preview dapat dibuka dan ditutup tanpa menghapus data.

### [x] P3-T08 — Implement upload another dataset
- Scope: reset state hasil dan kembali ke upload flow tanpa reload halaman.
- Dependency: P3-T01, P3-T03, P3-T06
- Deliverable: file kedua dapat dianalisis dan tidak tercampur dengan hasil file pertama.

---

## Phase 4 — Analytics, Accessibility & Release Readiness

### [x] P4-T01 — Tambahkan analytics privacy-safe
- Scope: event `data_quality_page_view`, `dataset_upload_started`, `dataset_analysis_completed`, `dataset_analysis_failed`, `column_profile_opened`, `duplicate_preview_opened`, dan `upload_another_dataset`.
- Dependency: P3-T08
- Deliverable: hanya metadata yang diizinkan dikirim; filename, column names, values, dan dataset content tidak pernah dikirim.

### [x] P4-T02 — Accessibility baseline
- Scope: keyboard-accessible dropzone, buttons, table rows, visible focus state, semantic headings, labels, status announcements, dan reduced motion.
- Dependency: P3-T08
- Deliverable: alur utama dapat digunakan tanpa mouse dan status loading/error terbaca.

### [x] P4-T03 — Responsive dan visual consistency pass
- Scope: verifikasi desktop, tablet, dan mobile; pertahankan clean white layout, generous whitespace, thin borders, dan dekorasi minimal sesuai design system.
- Dependency: P3-T08
- Deliverable: tidak ada overflow horizontal atau kontrol yang terpotong pada breakpoint utama.

### [x] P4-T04 — SEO dan privacy copy final
- Scope: terapkan title/description PRD, copy privacy hanya bila processing benar-benar lokal, dan copy error final.
- Dependency: P0-T03, P4-T01
- Deliverable: metadata dan klaim privacy sesuai implementasi aktual.

### [x] P4-T05 — Jalankan smoke test dan acceptance test
- Scope: uji CSV/XLSX, multi-sheet, missing, duplicate, profile, filters, preview, error states, upload ulang, responsive, dan console errors.
- Dependency: seluruh task Phase 1–4
- Deliverable: checklist QA lulus dan tidak ada blocker P0.

### [x] P4-T06 — Dokumentasikan batasan V1
- Scope: dokumentasikan browser support, limit dataset, tipe inference, threshold issue, parser, dan fitur P1/P2 yang belum tersedia.
- Dependency: P4-T05
- Deliverable: README/task/PRD tidak saling bertentangan.

---

## Backlog P1/P2 — Setelah V1 stabil

- P1: mixed datatype detection, potential identifier, high-cardinality detail, duplicate preview, histogram, export quality report.
- P2: cleaning, cleaned dataset download, custom validation rules, AI explanation, dataset comparison, schema validation, database connection, history, dan scheduled checks.

---

## Critical Path

1. `P0-T01` → `P0-T05`
2. `P1-T01` → `P1-T06`
3. Parallel: `P2-T01` → `P2-T10` dan `P3-T01` → `P3-T08`
4. `P4-T01` → `P4-T06`

## Definition of Done

V1 siap apabila user dapat membuka tool keempat dari unified tools, mengunggah CSV/XLSX, memilih sheet bila perlu, memproses dataset sepenuhnya di browser, melihat overview, menemukan missing dan duplicate, memahami profile kolom, melihat potential issues, membuka preview data, lalu mengganti dataset tanpa login atau backend processing.
