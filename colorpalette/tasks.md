# Tasks — Color Palette Generator (Atomic + Phased Dependency)

Dokumen ini memecah PRD menjadi task level atomik, berurutan per fase, dengan dependency eksplisit antar task.

## Konvensi
- ID format: `P{phase}-T{number}`
- Status awal: `todo`
- Dependency: daftar ID task yang harus selesai dulu
- Deliverable: output yang bisa diverifikasi

---

## Phase 0 — Foundation & Project Setup

### P0-T01 — Inisialisasi struktur file multi-page
- Scope: buat `index.html`, `image.html`, `explore.html`, `style.css`, `script-generator.js`, `script-image.js`, `script-explore.js`, `utils.js`, `palettes.json`.
- Dependency: -
- Deliverable: semua file ada dan bisa dibuka browser tanpa error fatal.

### P0-T02 — Definisikan design tokens di `style.css`
- Scope: implement `:root` CSS variables dari design system (`--bd-primary`, neutral, text, radius, shadow, font).
- Dependency: P0-T01
- Deliverable: token terdefinisi dan dipakai sebagai source warna utama.

### P0-T03 — Implement reset + base typography
- Scope: reset `*`, `body`, class utility `bd-title`, `bd-heading`, `bd-body`, `bd-label`, `bd-hint`, `bd-mono`.
- Dependency: P0-T02
- Deliverable: base style konsisten antar halaman.

### P0-T04 — Buat layout shell reusable (topbar/main/footer)
- Scope: class `bd-topbar`, `bd-topbar-inner`, `bd-main`, `bd-container`, `bd-footer`.
- Dependency: P0-T03
- Deliverable: ketiga halaman punya shell layout yang sama.

### P0-T05 — Implement topbar tabs multi-page
- Scope: `bd-tabs`, `bd-tab`, state `active` per halaman (`/`, `/image.html`, `/explore.html`).
- Dependency: P0-T04
- Deliverable: navigasi antar halaman berjalan, tab aktif akurat.

### P0-T06 — Buat komponen UI inti
- Scope: button, input, card, badge, toast, section label, divider, kbd hint sesuai design doc.
- Dependency: P0-T03
- Deliverable: komponen bisa dipakai ulang lintas halaman.

### P0-T07 — Siapkan utilitas JavaScript shared
- Scope: `downloadFile`, `showToast`, helper `copyToClipboard` (dengan fallback error toast), helper parse hex.
- Dependency: P0-T01
- Deliverable: util bisa di-import/digunakan semua halaman.

---

## Phase 1 — Generator Page (`index.html`) Core

### P1-T01 — Scaffold struktur HTML halaman generator
- Scope: seed input, harmony mode switch, tombol generate, area swatch 5 kolom, bottom bar, preview section.
- Dependency: P0-T04, P0-T05, P0-T06
- Deliverable: struktur lengkap generator tampil statis.

### P1-T02 — Style palette area 5 swatch + hover expansion
- Scope: tinggi 65vh, flex grow hover (`1.65`), transisi `0.22s cubic-bezier(.4,0,.2,1)`.
- Dependency: P1-T01, P0-T02
- Deliverable: interaksi hover visual sesuai PRD.

### P1-T03 — Render overlay kontrol swatch
- Scope: hex label mono, tombol copy, tombol lock/unlock, lock indicator persistent ketika locked.
- Dependency: P1-T01, P1-T02
- Deliverable: overlay muncul/berfungsi di semua swatch.

### P1-T04 — Implement `isDark(hex)` untuk kontras teks/icon
- Scope: hitung luminance threshold 145 untuk set warna foreground.
- Dependency: P1-T03
- Deliverable: teks/icon selalu terbaca di background terang/gelap.

### P1-T05 — Implement generator warna HSL base
- Scope: `hslToHex`, `generateHSLPalette(count=5)` (saturation 55–80, lightness 45–65, hue step 60–120).
- Dependency: P0-T07
- Deliverable: generate 5 warna harmonis non-random murni.

### P1-T06 — Implement harmony modes
- Scope: random, analogous, complementary, triadic, monochromatic; state mode aktif.
- Dependency: P1-T05
- Deliverable: mode mengubah logika hue sesuai tabel PRD.

### P1-T07 — Implement seed input parser
- Scope: deteksi hex valid, keyword mapping (`ocean`, `forest`, dst), fallback default random harmony.
- Dependency: P1-T05
- Deliverable: seed mempengaruhi warna pertama / hue basis.

### P1-T08 — Implement generate action dengan lock awareness
- Scope: klik tombol generate hanya regenerate swatch unlocked.
- Dependency: P1-T03, P1-T05
- Deliverable: locked swatch tidak berubah setelah generate.

### P1-T09 — Tambah shortcut keyboard Spacebar
- Scope: listener keydown Space = generate; cleanup listener saat unload.
- Dependency: P1-T08
- Deliverable: generate via keyboard berjalan tanpa memory leak.

### P1-T10 — Implement copy hex per swatch + toast
- Scope: copy via Clipboard API, toast sukses `"Copied #HEXCODE"` dan fallback error toast.
- Dependency: P1-T03, P0-T07
- Deliverable: semua swatch bisa dicopy.

### P1-T11 — Generate on first load
- Scope: auto-generate palette saat halaman dibuka.
- Dependency: P1-T05
- Deliverable: halaman tidak blank di initial load.

### P1-T12 — Bottom bar row 1: hex chips
- Scope: 5 chip dengan border-left sesuai warna, klik copy + toast.
- Dependency: P1-T10
- Deliverable: chip sinkron dengan swatch aktif.

### P1-T13 — Bottom bar row 2: kbd hint + export buttons
- Scope: kiri hint Space, kanan tombol export TPS/JSON/CSS.
- Dependency: P1-T01, P0-T06
- Deliverable: baris kontrol bawah lengkap.

### P1-T14 — Implement export Tableau TPS
- Scope: generate XML sesuai template PRD, download `palette.tps`.
- Dependency: P1-T13, P0-T07
- Deliverable: file TPS terunduh dan valid format.

### P1-T15 — Implement export Power BI JSON
- Scope: generate `theme.json` sesuai skema PRD.
- Dependency: P1-T13, P0-T07
- Deliverable: file JSON terunduh dan valid.

### P1-T16 — Implement export CSS variables (copy)
- Scope: format `:root { --color-1... }`, copy clipboard + toast.
- Dependency: P1-T13, P0-T07
- Deliverable: snippet CSS tercopy sesuai palette aktif.

### P1-T17 — Implement live dashboard preview component
- Scope: mini dashboard section dengan elemen navbar, metric accents, badge, primary button.
- Dependency: P1-T01, P1-T11
- Deliverable: preview tampil dan style dasar lengkap.

### P1-T18 — Implement mapping palette -> elemen preview
- Scope: warna 1..5 dipetakan ke elemen sesuai tabel PRD.
- Dependency: P1-T17
- Deliverable: preview update real-time setiap palette berubah.

### P1-T19 — Implement preview template toggle Light/Dark
- Scope: toggle kecil untuk ganti template visual.
- Dependency: P1-T17
- Deliverable: user bisa switch light/dark tanpa reload.

---

## Phase 1 — From Image Page (`image.html`)

### P1I-T01 — Scaffold struktur halaman from image
- Scope: upload zone, image preview, palette result area, tombol edit ke generator, bottom bar.
- Dependency: P0-T04, P0-T05, P0-T06
- Deliverable: struktur UI lengkap tampil statis.

### P1I-T02 — Implement upload input + drag and drop
- Scope: klik browse + drop file ke dropzone.
- Dependency: P1I-T01
- Deliverable: file bisa dipilih via 2 metode.

### P1I-T03 — Validasi format dan ukuran file
- Scope: valid hanya JPG/PNG/WEBP, maks 5MB, tampilkan toast error PRD.
- Dependency: P1I-T02, P0-T07
- Deliverable: invalid file ditolak dengan pesan sesuai.

### P1I-T04 — Render preview gambar upload
- Scope: tampilkan preview setelah validasi lolos.
- Dependency: P1I-T03
- Deliverable: user melihat gambar input sebelum analisis.

### P1I-T05 — Implement pipeline canvas pixel sampling
- Scope: gambar -> canvas hidden -> `getImageData()` -> sample ±3000 pixel.
- Dependency: P1I-T04
- Deliverable: array pixel `[r,g,b]` siap diproses.

### P1I-T06 — Implement K-means clustering (`k=5`)
- Scope: assign cluster + update centroid iteratif (maxIter 20).
- Dependency: P1I-T05
- Deliverable: 5 centroid warna dominan dihasilkan.

### P1I-T07 — Sort centroid berdasarkan ukuran cluster
- Scope: urutkan warna dominan terbesar ke terkecil.
- Dependency: P1I-T06
- Deliverable: urutan warna sesuai dominansi.

### P1I-T08 — Render hasil 5 swatch + controls serupa generator
- Scope: tampilan swatch, chip hex, export buttons reuse komponen generator.
- Dependency: P1I-T07, P0-T06
- Deliverable: parity UI dengan generator tercapai.

### P1I-T09 — Implement loading state analisis
- Scope: skeleton/shimmer + teks `"Menganalisis warna..."` selama proses.
- Dependency: P1I-T05
- Deliverable: user dapat feedback saat komputasi jalan.

### P1I-T10 — Implement error handling K-means gagal
- Scope: catch error proses dan tampilkan toast `"Gagal menganalisis gambar. Coba gambar lain."`.
- Dependency: P1I-T06, P0-T07
- Deliverable: kegagalan ditangani graceful.

### P1I-T11 — Tombol “Edit di Generator”
- Scope: kirim state palette ke `index.html` via URL params atau `localStorage`.
- Dependency: P1I-T08
- Deliverable: palette dari image bisa langsung diedit di generator.

---

## Phase 1 — Explore Page (`explore.html`)

### P1E-T01 — Buat `palettes.json` seed data minimal 50 palette
- Scope: id, name, colors[5], tags[], mood.
- Dependency: P0-T01
- Deliverable: file JSON valid dengan >=50 data curated.

### P1E-T02 — Scaffold struktur halaman explore
- Scope: filter toolbar (mood/industry), search input, grid container.
- Dependency: P0-T04, P0-T05, P0-T06
- Deliverable: layout explore lengkap tampil statis.

### P1E-T03 — Implement fetch `palettes.json`
- Scope: load data client-side.
- Dependency: P1E-T01, P1E-T02
- Deliverable: data masuk state JS.

### P1E-T04 — Implement loading skeleton cards
- Scope: tampilkan skeleton saat fetch berjalan.
- Dependency: P1E-T03
- Deliverable: ada state loading visual.

### P1E-T05 — Render grid card palette
- Scope: strip 5 warna, nama, tags, tombol “Pakai palette ini”.
- Dependency: P1E-T03
- Deliverable: semua palette tampil di grid.

### P1E-T06 — Implement filter mood
- Scope: Calm/Bold/Warm/Fresh/Dark/Pastel.
- Dependency: P1E-T05
- Deliverable: list terfilter sesuai mood pilihan.

### P1E-T07 — Implement filter industry
- Scope: Finance/Marketing/Operations/HR/Tech.
- Dependency: P1E-T05
- Deliverable: list terfilter sesuai industry.

### P1E-T08 — Implement kombinasi filter client-side
- Scope: mood + industry + kondisi default “all”.
- Dependency: P1E-T06, P1E-T07
- Deliverable: hasil filter kombinasi benar.

### P1E-T09 — Implement search realtime
- Scope: cari berdasarkan `name` atau `tags` saat mengetik.
- Dependency: P1E-T05
- Deliverable: hasil search update tanpa submit.

### P1E-T10 — Tombol “Pakai palette ini” ke generator
- Scope: transfer palette ke `index.html` (URL params/localStorage).
- Dependency: P1E-T05
- Deliverable: user bisa apply palette dari explore ke generator.

---

## Phase 1 — QA, Accessibility, and Release Readiness

### P1Q-T01 — Uji alur utama generator
- Scope: generate, lock, copy, export, preview mapping, mode harmony.
- Dependency: seluruh task `P1-T*`
- Deliverable: checklist pass untuk semua flow utama.

### P1Q-T02 — Uji alur from image
- Scope: upload valid/invalid, loading, hasil ekstraksi, edit di generator.
- Dependency: seluruh task `P1I-T*`
- Deliverable: checklist pass semua scenario inti.

### P1Q-T03 — Uji alur explore
- Scope: fetch, loading, filter, search, pakai palette.
- Dependency: seluruh task `P1E-T*`
- Deliverable: checklist pass semua scenario inti.

### P1Q-T04 — Accessibility baseline
- Scope: focus-visible, keyboard navigation, aria-label tombol ikon, kontras minimum teks.
- Dependency: P1Q-T01, P1Q-T02, P1Q-T03
- Deliverable: tidak ada blocker a11y kritikal.

### P1Q-T05 — Responsive behavior
- Scope: breakpoint tablet/mobile untuk topbar tabs, swatch, grid, toolbar.
- Dependency: P1Q-T01, P1Q-T02, P1Q-T03
- Deliverable: tampilan usable di layar kecil.

### P1Q-T06 — Cross-browser sanity
- Scope: Chrome, Edge, Safari modern.
- Dependency: P1Q-T05
- Deliverable: tidak ada bug P1 yang blocking usage.

### P1Q-T07 — Final content & microcopy pass
- Scope: konsistensi teks toast/error/hint sesuai PRD bahasa Indonesia.
- Dependency: P1Q-T01, P1Q-T02, P1Q-T03
- Deliverable: copywriting final konsisten.

---

## Phase 2 (Backlog, out of scope Fase 1)

### P2-T01 — AI keyword generation via Claude API
- Dependency: P1 release stabil
- Deliverable: prompt keyword natural language -> palette suggestion.

### P2-T02 — Save/share palette (backend)
- Dependency: P1 release stabil
- Deliverable: URL shareable / persistence user.

### P2-T03 — Advanced color detail panel (RGB/HSL/CMYK/tint/shade)
- Dependency: P1 release stabil
- Deliverable: panel detail per swatch.

### P2-T04 — Tambah preview template (Executive, Mobile)
- Dependency: P1-T17, P1-T18
- Deliverable: pilihan template lebih luas.

### P2-T05 — User-submitted palette
- Dependency: backend availability
- Deliverable: pipeline submit dan moderasi.

### P2-T06 — Palette naming sebelum export
- Dependency: P1-T14, P1-T15
- Deliverable: nama custom masuk file TPS/JSON.

### P2-T07 — Drag reorder swatch
- Dependency: P1-T03, P1-T08
- Deliverable: urutan warna bisa diatur user.

---

## Jalur Eksekusi Disarankan (Critical Path)
1. `P0-T01` → `P0-T07`
2. `P1-T01` → `P1-T19`
3. Parallel lane: `P1I-T01` → `P1I-T11` dan `P1E-T01` → `P1E-T10`
4. `P1Q-T01` → `P1Q-T07`
5. Setelah stabil, lanjut backlog Phase 2.
