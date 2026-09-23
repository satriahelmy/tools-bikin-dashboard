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
- `data-quality-checker/` — fondasi pemeriksaan CSV/XLSX secara client-side.
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
- [x] Bedakan area preview dashboard dari alur generator dengan panel/canvas khusus.
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
- [x] Samakan alignment konten discovery ke garis kiri grid agar perpindahan antarhalaman terasa rapi.

## Prioritas P2 — Brand, accessibility, dan kualitas produksi

### Identitas visual

- [x] Finalisasi sistem ikon SVG yang konsisten.
- [x] Menggunakan logo BikinDashboard sebagai favicon dan ikon aplikasi.
- [x] Mengintegrasikan logo SVG BikinDashboard sebagai brand sidebar.
- [x] Memuat shell CSS sejak awal agar logo SVG dan layout tidak bergeser saat navigasi.
- [x] Menurunkan prioritas loading logo dan menampilkan transisi singkat agar perpindahan halaman terasa halus.
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
- [x] Mendaftarkan Data Quality Checker sebagai tools keempat dengan parser CSV/XLSX client-side dan route unified.

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
11. Data Quality Checker tersedia di `/data-quality-checker/` dan active state sidebar sesuai.

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

## Paper Library — audit dan phased implementation plan

Status: audit selesai; Phase 1 route dan parent integration selesai; Phase 2 data pipeline dan rendering selesai; Phase 3 URL state dan analytics selesai; Phase 4 responsive/accessibility/QA selesai.

### Audit yang sudah dilakukan

- Membaca `docs/source/papers/PRD_Paper_Library.md` dan `docs/source/papers/design.md`.
- Membaca source-of-truth parent di `design/design.md`, token bersama, design-system, navigasi, homepage, katalog tool, dan implementasi Chart Guide, Resource Hub, Color Palette, serta Data Quality Checker.
- Membaca workbook `data/bikindashboard_paper_library_master_latest.xlsx` secara struktural dan visual. Sheet utama adalah `Paper Catalog!A1:R144`.
- Workbook berisi 143 record: 125 koleksi ML/AI awal + 18 record Data Visualization.
- Workbook memiliki 23 nilai kategori, tahun 1943–2023, 79 paper Advanced, 61 Intermediate, dan 3 Beginner.
- Workbook memiliki 69 URL code yang semuanya bertanda `Code Verification = Verified`.
- Workbook memiliki 139 URL pada kolom `Verified Free Full-Text URL`; 1 di antaranya berstatus `Metadata only` dan tidak boleh menjadi CTA Read Paper.
- Tidak ada judul duplikat, URL paper duplikat, URL code duplikat, atau field inti kosong pada 143 record.
- Dataset tidak memiliki kolom `Topics` maupun `Venue`. `Free Link Verified`, `Free Source Type`, dan `Free Source Host` hanya terisi sebagian besar pada record awal dan Data Visualization, sehingga provenance belum seragam.

### Temuan, konflik, dan risiko

1. **Topic filter belum didukung oleh source data.** Jangan mengarang topics untuk 143 paper. V1 menyembunyikan kontrol Topic bila dataset tidak memiliki topic values; schema tetap menyediakan `topics: []` agar bisa diaktifkan setelah enrichment editorial.
2. **Venue tidak tersedia.** Jangan menebak atau mengambil venue dari URL. Field venue dihilangkan dari runtime JSON sampai diverifikasi sebagai data editorial.
3. **Free-link verification tidak konsisten.** Hanya 28 record memiliki `Free Link Verified = Yes`, tetapi 95 record berstatus `arXiv`, 20 `Open Access`, 3 `Free PDF`, dan 4 `Verified Free PDF`. Menggunakan flag `Yes` saja akan menyembunyikan hampir seluruh koleksi lama.
4. **Keputusan transformasi yang disetujui:** `paper_verified = true` bila URL ada dan `Access Status` termasuk `arXiv`, `Open Access`, `Free PDF`, `Verified Free PDF`, atau `Free Full Text`; kecualikan `Metadata only` dan `No Free Full Text Verified`. Flag eksplisit `Free Link Verified = No` tetap mengalahkan aturan tersebut.
5. **Vocabulary kategori berbeda dari PRD.** Workbook menggunakan `LLM`, `Graph ML`, `Multimodal`, dan `NLP / LLM`, sementara PRD juga menyebut nama yang lebih panjang. V1 sebaiknya mempertahankan nilai kategori workbook apa adanya dan membangun filter secara dinamis; jangan menggabungkan kategori tanpa keputusan editorial.
6. **Shared filter styling memiliki konflik dokumentasi.** `design/design.md` menyebut active filter underline, tetapi `assets/design-system.css` yang saat ini efektif membuat `bd-filter-pill`/`bd-chip` menjadi kontrol outlined dengan active fill. Paper Library mengikuti CSS parent yang sedang aktif.
7. **Bahasa UI perlu keputusan kecil.** Parent memakai Bahasa Indonesia, sedangkan PRD/design banyak memakai copy bahasa Inggris. Rekomendasi: nama produk dan judul paper tetap `Paper Library`/bahasa sumber; label kontrol, empty/error state, dan footer mengikuti Bahasa Indonesia parent.

### Arsitektur implementasi yang diusulkan

Static-first, vanilla HTML/CSS/JavaScript, tanpa framework, backend, database, atau PDF hosting:

```text
papers/
  index.html       # satu route /papers/
  style.css        # hanya layout Paper Library yang unik
  script.js        # load, query state, search, filter, sort, render, analytics
data/
  papers.json      # generated runtime data; bukan hard-code di HTML
scripts/
  build_papers_data.py  # development-only Excel → JSON transformer + validator
```

`papers/index.html` memakai shell yang sama: `tokens.css`, page CSS, `design-system.css`, `nav.css`, `nav.js`, `analytics.js`, `bd-with-nav`, `bd-topbar`, `bd-main`, `bd-container`, dan `bd-footer`. Paper entries dirender sebagai semantic `<article>` dari `papers.json`.

Proposed runtime record:

```json
{
  "id": "attention-is-all-you-need",
  "source_no": 47,
  "curated_order": 47,
  "title": "Attention Is All You Need",
  "year": 2017,
  "authors": ["Ashish Vaswani", "Noam Shazeer"],
  "category": "NLP",
  "topics": [],
  "contribution": "...",
  "importance": "Landmark",
  "difficulty": "Advanced",
  "paper_url": "https://arxiv.org/abs/1706.03762",
  "paper_source_type": "arXiv",
  "paper_source_host": null,
  "paper_access_status": "arXiv",
  "paper_verified": true,
  "code_url": "https://github.com/tensorflow/tensor2tensor",
  "code_source": "Research lab",
  "code_verified": true
}
```

Fields absent from the workbook are omitted or empty; no venue, topic, paper URL, or repository is invented. `source_no` and `curated_order` keep traceability and preserve workbook order.

### Dataset transformation approach

1. Keep the Excel workbook as the editorial source for now; never load XLSX in the browser.
2. Add a development-only transformer that reads `Paper Catalog`, trims/null-normalizes cells, parses `Year`, splits semicolon-delimited `Authors` into an array, normalizes the known `Highly influential` capitalization, and creates collision-checked slugs.
3. Preserve paper source provenance from `Free Source Type`, `Free Source Host`, and `Access Status`; use the explicit verification rule above for `paper_verified`.
4. Set `paper_url` to `null` when the URL is missing or not verified. A record such as `Rainbow Color Map (Still) Considered Harmful` keeps its provenance/status but renders no Read Paper action.
5. Set `code_url` only when the URL exists and `Code Verification = Verified`; otherwise set it to `null`. Never populate a repository from a tutorial, fork, or guess.
6. Emit `data/papers.json` plus a compact validation report during development: source count, generated count, duplicate IDs/titles/URLs, missing required fields, invalid runtime URLs, category values, and code count.
7. The browser consumes only generated JSON. The page should tolerate future `topics` arrays and render the Topic control only when at least one topic exists.

### Existing shared components/styles to reuse

- `assets/nav.js`: global sidebar, active route, root/subfolder path resolution, and SVG icon pattern. Add `papers` to `toolFolders`, navigation links, current-route detection, and the icon map.
- `assets/nav.css`: use the existing 236px desktop sidebar, 860px mobile horizontal navigation, topbar, focus ring, and responsive content offsets. No new navigation system.
- `assets/tokens.css`: all colors, radii, shadows, typography families, and semantic colors.
- `assets/design-system.css`: shared typography, intro rhythm, focus behavior, and filter/chip geometry. Follow the currently effective outlined/filled-active filter treatment.
- Page conventions from Chart Guide/Resource Hub: `bd-tool-intro`, `bd-input`, `bd-btn`, `bd-chip`/`bd-filter-pill`, live result count, external link attributes, and minimal empty/error states.
- Footer pattern from the existing tools: `bd-footer` with the parent `bikindashboard.com` link.
- Existing SVG construction in `nav.js`; do not add an icon library.

Paper-specific CSS should cover only the single-column paper list, compact controls/toolbar, metadata grouping, action links, source line, optional active-filter chips, mobile filter presentation, and list separators. Avoid changing shared tokens or redesigning existing pages.

### Proposed file changes by phase

#### Phase 0 — data and content contract

- [x] Confirm the free-link verification rule above.
- [x] Confirm whether V1 UI copy should remain Indonesian outside the product name and paper metadata.
- [x] Add `scripts/build_papers_data.py` and generate `data/papers.json` from the workbook.
- [x] Add validation output and review all rows suppressed from Read Paper/Code actions: 5 records omit Read Paper (source no. 6, 13, 18, 93, 131); all 69 source code URLs are verified and included, while blank code fields remain omitted.
- [x] Keep raw unverified source URLs only in the Excel source; do not add a non-actionable runtime audit artifact for V1.

#### Phase 1 — route and parent integration

- [x] Add `papers/index.html`, `papers/style.css`, and `papers/script.js` as the Phase 1 route shell.
- [x] Add Paper Library to `assets/nav.js` without changing existing nav labels/behavior.
- [x] Add the tool entry to `tools/tools.json` and the root homepage mapping/popular links in `index.html`.
- [x] Add `/papers/` to `sitemap.xml` and update `README.md`/`SMOKE-TEST.md` route documentation.

#### Phase 2 — page layout and rendering

- [x] Build compact header, search, dynamic category/difficulty/year/code controls, quiet results toolbar, sort control, and single-column `<article>` list.
- [x] Render title, year/category, authors, contribution, importance/difficulty, verified Read Paper/Code actions, and source provenance.
- [x] Use `target="_blank"` and `rel="noopener noreferrer"` for external actions; omit missing actions instead of showing disabled buttons.
- [x] Add loading, fetch error, empty results, and clear-filters states.

Phase 2 verification: generator output is 143/143 records with 138 verified Read Paper links, 69 verified Code links, 18 Data Visualization records, no duplicate IDs/titles/URLs, and no invalid runtime URLs. Browser smoke checks confirmed the default count, instant search, category/year/Has Code filters, newest sorting, empty state, hidden Topik control, and zero console errors.

#### Phase 3 — behavior and URL state

- [x] Implement instant search across available fields: title, authors, category, contribution, year, source provenance, and code source.
- [x] Implement curated/oldest/newest/A–Z sorting with stable curated-order fallback.
- [x] Sync `q`, `category`, optional `topic`, `difficulty`, `year`, `code=true`, and `sort` with query parameters using `history.replaceState` and `popstate`.
- [x] Keep active controls synchronized when a shareable URL is loaded.
- [x] Add `paper_search`, `paper_filter`, `paper_read_click`, and `paper_code_click` analytics without delaying navigation.

Phase 3 verification: direct shareable URLs hydrate the controls and result list; filter changes update the URL with `history.replaceState`; unsupported category/topic/sort values are normalized away; browser navigation restores the corresponding query state; analytics calls use only paper ID/category and aggregate search/filter metadata.

#### Phase 4 — responsive/accessibility/QA

- [x] Verify desktop list width, tablet wrapping, and mobile single-column layout with no horizontal page overflow.
- [x] Confirm the parent navigation breakpoint keeps the five controls usable; no Paper-specific drawer is needed, so no second global drawer system was introduced.
- [x] Verify labels, focus states, keyboard operation, live result count, external-link announcement, contrast, and reduced motion.
- [x] Test query combinations, empty/error states, all 143 records, 18 Data Visualization records, verified-link gating, and 69 verified code links.
- [x] Run smoke tests for `/`, `/papers/`, sibling tools, root/subfolder URLs, and console errors.

Phase 4 verification: browser checks passed at 1280, 1100, 1024, 900, 860, 768, 600, and 390px with no horizontal overflow. The shared 860px navigation breakpoint remains intact; the list stays single-column and filters remain usable without a new drawer. Keyboard Tab reaches native controls with visible focus outline, the results count is live/atomic, external actions announce a new tab, `aria-busy` transitions from loading to ready/error, and the parent reduced-motion rule remains effective. Runtime checks confirmed 143 records, 138 verified Read Paper actions, 69 verified Code actions, 18 Data Visualization records, empty state behavior, Rainbow Color Map's no-action state, valid URL normalization, and successful route responses for the root, Paper Library, sibling tools, and shared assets.

### Completion criteria for the Paper Library work

- `/papers/` is a native sibling of the existing tools and does not alter their visual or functional behavior.
- Runtime paper data is loaded from `data/papers.json`; no paper records are hard-coded in HTML.
- Search, category, difficulty, year, Has Code, sorting, result count, reset, responsive behavior, and practical URL state work.
- Topic filter is shown only if supported by actual topic data.
- Read Paper and Code actions are rendered only from verified links under the agreed data rule.
- Source provenance remains visible and external links are never re-hosted.
- The source workbook remains auditable and can regenerate the static JSON.
