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
12. SQL Challenge tersedia di `/sql-challenge/`, menampilkan soal SQL, menjalankan query di browser, dan memeriksa hasilnya.

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
- Membaca workbook `docs/source/papers/workbooks/bikindashboard_paper_library_master_latest.xlsx` secara struktural dan visual. Sheet utama adalah `Paper Catalog!A1:R144`.
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

## Book Library — implementation and QA

Status: complete

### Scope completed

- [x] Add `/book-library/` as a native sibling route using the existing Tools BikinDashboard shell, tokens, typography, navigation, buttons, containers, and footer.
- [x] Add Book Library directly below Paper Library in the shared sidebar.
- [x] Add Book Library to the homepage catalog, popular links, search, Belajar category filter, sitemap, and README route documentation.
- [x] Load production records from `data/books.json`; no book metadata is hard-coded into HTML and no automatic enrichment or external URL invention is performed.
- [x] Implement compact hero, instant search, Category/Level/Format/Tools-or-language filters, result count, active filter chips, reset action, empty state, and fetch error state.
- [x] Render responsive cards with title, author, category, level, format, access type, relevant edition status, `Free & verified`, and verified `Baca buku →` external action.
- [x] Generate one static, shareable detail page per book under `/book-library/books/<slug>/`, with title-derived slugs, canonical/OG metadata, source-backed metadata, and the verified external CTA.
- [x] Implement practical URL state for `q`, `category`, `level`, `format`, and `tools` with normalization and browser navigation support.
- [x] Add `book_search`, `book_filter`, and `book_read_click` analytics events without sending the search text or book metadata as event payload.

### Verification

- [x] `data/books.json` validation: 145 records, `meta.count` matches, unique IDs, all records verified, and all runtime URLs are valid HTTP(S) URLs.
- [x] Browser smoke: default 145 books; search `Python` → 26; Category `Data Science` → 21; combined Beginner → 6; Format `HTML` → 66; Tools `Python` → 12; search `visualization` → 8.
- [x] Browser smoke: reset returns 145, edition status appears on 7 records, every verified card has a new-tab CTA, and no console warning/error was reported.
- [x] Modern AI workbook update: 4 included records were appended in workbook order; 4 paid/preview/course records were excluded by the source flag.
- [x] Added `scripts/build_books_data.py` to repeat the merge without hard-coding the workbook records; missing Tools / bahasa and Edition status remain empty.
- [x] Responsive smoke: 390/768/1100/1280px have no horizontal overflow; filters and cards collapse at the existing page breakpoints.
- [x] Route smoke: root, Paper Library, Book Library, shared navigation/analytics assets, and `data/books.json` return HTTP 200.

### Decisions and non-goals

- `docs/source/book-library/workbooks/modern_ai_books_validated.xlsx` is an additions workbook. `scripts/build_books_data.py` preserves existing records and appends only source rows explicitly marked for inclusion.
- Book metadata is mapped directly from the workbook; fields not present in the workbook are left empty rather than inferred.
- No accounts, bookmarks, reading progress, AI summaries, collections, backend/database, or framework migration are included. Detail pages are static generated HTML, not a backend-driven detail system.
- The pre-existing dirty `chart` worktree remains untouched.

## Analytical Challenge — audit and implementation plan

Status: Phases 1–4 implemented; local Phase 5 review is complete except production-host exclusion of maintainer documents and regression checks for unrelated feature workflows.

### Product scope

- Launch `/analytical-challenge/` and `/analytical-challenge/coffee-shop-performance/` for Challenge #01 — Coffee Shop Performance.
- Keep the experience static, tool-agnostic, open-ended, and reusable for future challenges.
- Reuse the shared BikinDashboard shell, navigation, design tokens, typography, and interaction styles.
- Do not add accounts, submissions, scoring, progress tracking, official solutions, or a new framework/build system.

### Phase 0 — public data and deployment boundary

- [x] Receive `coffee-shop-performance.csv` and `coffee-shop-data-dictionary.csv`; verify their headers, public row counts, and intended filenames against the approved brief.
- [x] Place public downloads under `downloads/challenges/coffee-shop-performance/`.
- [ ] Ensure `docs/` and maintainer-only challenge QA information are excluded from the public deployment artifact, or move sensitive source material outside the published root.
- [x] Keep internal QA notes out of runtime JSON, generated HTML, public metadata, analytics payloads, sitemap, and README copy.

### Phase 1 — content model and static page generation

- [x] Add `data/challenges/challenges.json` containing only approved public challenge metadata and copy.
- [x] Add `scripts/build_challenge_pages.py`, following the existing static detail-page generator pattern.
- [x] Generate the catalog at `analytical-challenge/index.html` and detail pages at `analytical-challenge/<slug>/index.html` from the shared content source.
- [x] Read the supplied dictionary CSV during generation and render its public fields as an on-page semantic table; avoid maintaining a second copy of the dictionary in JSON.
- [x] Generate unique page titles, descriptions, canonical URLs, and sitemap entries for the catalog and each challenge.
- [x] Confirm that adding Challenge #02 requires new public data/assets and regeneration, not a duplicate page implementation.

### Phase 2 — shared navigation integration

- [x] Register `analytical-challenge` as a known route in `assets/nav.js` so root/subfolder paths and active state work on catalog and detail pages.
- [x] Group sidebar links under `TOOLS`, `LEARN`, and `PRACTICE`, with Beranda separate and non-collapsible.
- [x] Put Data Quality Checker under TOOLS, Resource Hub under LEARN, and Analytical Challenge under PRACTICE; preserve every existing destination.
- [x] Add restrained group-label styles in `assets/nav.css` and retain the current compact horizontal scrolling behavior at mobile widths.
- [x] Use the existing SVG navigation pattern for the Analytical Challenge icon; do not add an icon library.
- [x] Bump versioned shared-nav asset URLs across existing pages and page generators so clients receive the grouped navigation assets.

### Phase 3 — page layout and content

- [x] Add scoped `analytical-challenge/style.css` and reuse the shared shell, tokens, typography, links, and button conventions.
- [x] Add an Analytical Challenge card to the homepage catalog using `tools/tools.json` and the `/analytical-challenge/` route.
- [x] Render a restrained vertical catalog entry with challenge number, title, summary, difficulty, row count, skills, and detail link; do not add filters or fake activity metrics.
- [x] Render the detail page as a concise analyst brief with business context, objective, explicit data grain, dataset overview, exploration questions, dictionary, and deliverable; optional stretch/share sections render only when configured.
- [x] Keep one primary CTA (`Download Dataset`) and a secondary dictionary action.
- [x] Avoid prescribed chart types, a fixed analysis sequence, gamification, decorative cards/gradients, and any solution or hidden-pattern hints.
- [x] Make the dictionary table horizontally scrollable on small screens; let metadata wrap and dataset statistics reflow to two columns on mobile.

### Phase 4 — analytics and project documentation

- [x] Add `analytical-challenge/analytics.js` for `challenge_opened`, dataset download, dictionary open/download, and any implemented share action.
- [x] Load the existing `assets/analytics.js` GA4 bootstrap; send only challenge identifiers/slugs and relevant file format values.
- [x] Do not send dataset content, user-entered analysis, or personally identifying information.
- [x] Update `README.md` with routes, public asset locations, and the page-generation workflow.
- [x] Update `SMOKE-TEST.md` with challenge route, navigation, download, responsive table, accessibility, and privacy checks.

### Phase 5 — acceptance review

- [ ] Confirm the Analytical Challenge card appears on the homepage and opens `/analytical-challenge/` from root and XAMPP subfolder routes.
- [ ] Confirm `/analytical-challenge/` and `/analytical-challenge/coffee-shop-performance/` load at root and under the XAMPP subfolder route; legacy `/challenge/` routes redirect to their new URLs.
- [x] Confirm the catalog displays Challenge #01 and the detail page shows approved metadata, context, objective, and explicit transaction-line grain.
- [x] Confirm dataset and dictionary endpoints return CSV and the dictionary CSV matches the rendered table.
- [x] Confirm guiding questions do not prescribe visualizations and the deliverable remains tool-agnostic.
- [x] Confirm the stretch challenge and share sections are absent from Challenge #01.
- [x] Confirm the PRACTICE navigation group and active states work without breaking existing route responses or mobile navigation.
- [x] Review keyboard access, visible focus, semantic headings/table headers, shared-token contrast, reduced motion, and responsive layouts.
- [x] Validate GA4 event names and parameters with a mocked `gtag`; no CTA controls were clicked for event testing.
- [ ] Verify internal challenge documents are excluded from the actual production deployment artifact. Local XAMPP Apache returns 403 for `docs/`; production behavior for the new `/analytical-challenge/` route and the legacy redirects has not been checked.
- [x] Regression-check representative existing workflows: homepage category filter, Chart Guide category filter, palette generation, Resource Hub category filter, Paper Library search, Book Library search, and the existing Data Quality Checker analytics/profiling tests all pass. Route-response checks also pass; generated book-detail pages only changed shared-nav asset versions.

### Proposed files

Create:

- `data/challenges/challenges.json`
- `scripts/build_challenge_pages.py`
- `analytical-challenge/index.html` (generated)
- `analytical-challenge/coffee-shop-performance/index.html` (generated)
- `analytical-challenge/style.css`
- `analytical-challenge/analytics.js`
- `challenge/index.html` and `challenge/<slug>/index.html` (legacy redirects)
- `downloads/challenges/coffee-shop-performance/coffee-shop-performance.csv` (when supplied)
- `downloads/challenges/coffee-shop-performance/coffee-shop-data-dictionary.csv` (when supplied)

Modify:

- `index.html`
- `tools/tools.json`
- `assets/nav.js`
- `assets/nav.css`
- Shared nav asset references in existing HTML pages; `scripts/build_book_detail_pages.py` keeps generated book pages on the current asset versions.
- `sitemap.xml`
- `README.md`
- `SMOKE-TEST.md`

Keep shared design tokens, the design system, and the analytics bootstrap unchanged; update the source PRD/design labels and route examples to match the Analytical Challenge naming.

## Chart Recommender — audit and phased implementation plan

Status: Phase 0–5 selesai. Smoke test route dan integrasi pada Apache XAMPP sudah lulus; sweep viewport responsif desktop/tablet/mobile masih perlu dijalankan.

### Dokumen sumber yang ditinjau

- [`PRD — BikinDashboard Chart Recommender.md`](docs/source/chart-recommender/PRD%20%E2%80%94%20BikinDashboard%20Chart%20Recommender.md) — tujuan produk, flow, state, analytics, accessibility, dan acceptance criteria.
- [`DESIGN.md — BikinDashboard Chart Recommender(1).md`](docs/source/chart-recommender/DESIGN.md%20%E2%80%94%20BikinDashboard%20Chart%20Recommender%281%29.md) — UX wizard/result, integrasi shell, Chart Guide, dan QA visual.
- [`DECISION_TREE.md — BikinDashboard Chart Recommender.md`](docs/source/chart-recommender/DECISION_TREE.md%20%E2%80%94%20BikinDashboard%20Chart%20Recommender.md) — source of truth untuk ID pertanyaan/jawaban, branch, terminal rules, redirect, rekomendasi, dan mapping Guide.

### Temuan audit dan keputusan implementasi

1. Chart Recommender adalah tool ke-8. Saat audit, `tools/tools.json` berisi 7 tool dan `assets/nav.js` menyediakan shell bersama dengan grup TOOLS/LEARN/PRACTICE.
2. Proyek memakai HTML, CSS, dan JavaScript statis. Implementasi V1 tetap client-side dan deterministic; tidak menambah framework, backend, AI/API, atau dependency visualisasi.
3. Gunakan route `/chart-recommender/` dengan `chart-recommender/index.html`, mengikuti route pilihan PRD dan pola XAMPP subfolder.
4. Pisahkan data decision tree, traversal/state logic, dan renderer. Decision tree menjadi sumber tunggal konten/branch; UI tidak menyalin logic ke event handlers.
5. State wizard hanya hidup selama halaman terbuka. Back mempertahankan jawaban valid; ketika jawaban terdahulu berubah, hapus jawaban downstream yang tak lagi relevan. Restart menghapus seluruh state tanpa konfirmasi. Reload kembali ke initial state; URL state dan persistence bukan kebutuhan V1.
6. Pertanyaan dan microcopy memakai Bahasa Indonesia; nama chart mengikuti vocabulary Chart Guide berbahasa Inggris. Gunakan CTA lokal seperti `Buka Panduan Bar Chart`.
7. Result preview tidak diperlukan. Gunakan halaman Chart Guide untuk contoh visual; rekomendasi KPI / Big Number dan Separate Views tidak boleh menampilkan CTA Guide yang rusak.
8. Chart Guide saat ini mempunyai 16 record di `chart/charts.json`; seluruh 16 ID yang ada pada mapping Guide decision tree sudah tersedia, dan `map` adalah satu-satunya Guide ID yang harus ditambahkan. Taxonomy yang tampil saat ini hanya Perbandingan, Komposisi, Sebaran, dan Hubungan. PRD/design meminta Tren dan Geografis; contoh mapping PRD mencakup Slope Chart = Perbandingan + Tren, Area Chart = Tren + Komposisi, Bar Chart = Perbandingan, Heatmap = Hubungan, dan Map = Geografis.
9. `chart/chart.html` merender detail dari `charts.json` dan menyediakan fallback saat konfigurasi preview chart tidak tersedia. Entry Map harus melengkapi seluruh field teks yang dibutuhkan template dan memberi panduan Choropleth serta Point/Symbol Map; tidak perlu menambahkan renderer peta.
10. Analytics memakai `assets/analytics.js`. Kirim hanya event dan properti yang ditentukan PRD—tanpa free-text, dataset, atau informasi pribadi—dan pastikan wizard tetap berfungsi bila analytics tidak tersedia.

### Arsitektur file yang diusulkan

```text
chart-recommender/
  index.html       # route /chart-recommender/, shared site shell
  style.css        # layout/interaction spesifik wizard, memakai shared tokens
  decision-tree.js # pertanyaan, answer IDs, branching, rules, dan result content
  engine.js        # traversal, redirect, validasi terminal, dan pengelolaan state
  script.js        # render, event UI, focus management, dan analytics hooks
```

Decision tree boleh dimuat sebagai konfigurasi JavaScript biasa. Pertahankan urutan script/defer yang eksplisit dan path asset yang bekerja dari root maupun `/bikindashboard/`; jangan memperkenalkan bundler/build step.

### Phase 0 — audit kontrak dan mapping

- [x] Baca ketiga dokumen sumber dan identifikasi acceptance criteria lintas PRD, design, dan decision tree.
- [x] Audit `assets/nav.js`, shared CSS/tokens, `index.html`, `tools/tools.json`, Chart Guide list/detail/data, analytics, sitemap, README, dan smoke checklist.
- [x] Tetapkan route `/chart-recommender/`, arsitektur vanilla JS terpisah, state in-memory, dan tidak ada preview/dependency berat.
- [x] Verifikasi setiap chart ID pada mapping Recommendation Object terhadap `chart/charts.json`: 16 mapping tersedia, hanya `map` yang perlu dibuat; KPI / Big Number dan Separate Views tidak memerlukan Guide.
- [x] Catat taxonomy baru dari PRD/design: tambahkan Tren dan Geografis, dukung multi-tag, pertahankan tag existing, dan ikuti contoh Slope, Area, Bar, Heatmap, serta Map sebelum mengubah Chart Guide.

### Phase 1 — route dan integrasi sebagai tool ke-8

- [x] Buat `chart-recommender/index.html` dengan metadata unik, canonical `/chart-recommender/`, shared navigation, design system, footer, dan entry point script.
- [x] Tambahkan `chart-recommender` ke route resolver `toolFolders`, lalu daftarkan Chart Recommender pada grup TOOLS sesudah Chart Guide dengan active state dan ikon SVG yang mengikuti pola existing.
- [x] Tambahkan record Chart Recommender sebagai tool ke-8 di `tools/tools.json`; sinkronkan `localPaths`, icon, dan popular links di homepage.
- [x] Pastikan semua internal links bekerja pada root domain dan instalasi XAMPP subfolder.
- [x] Tambahkan route ke `sitemap.xml`; dokumentasikan route serta pemeriksaan baru di `README.md` dan `SMOKE-TEST.md`.

### Phase 2 — decision tree dan engine deterministik

- [x] Masukkan lima root intent dan seluruh question ID, answer ID, helper, cabang, terminal `RULE-*`, cross-intent redirect, dan content result yang didefinisikan di `DECISION_TREE.md` tanpa mengganti ID atau menyederhanakan cabang yang mengubah rekomendasi.
- [x] Implementasikan pure rule traversal yang menerima intent/answers dan menghasilkan salah satu dari: pertanyaan relevan berikutnya, redirect/context baru, recommendation object, atau fallback state.
- [x] Bentuk recommendation object ternormalisasi: `ruleId`, `intent`, chart family/ID, variant opsional, `why`, 2–4 tips kontekstual, alternative/watch-out opsional, serta `guide` opsional.
- [x] Terapkan empat redirect yang dispesifikasikan. Pertahankan konteks yang relevan (termasuk numeric + category dan konteks over-time), buang hanya jawaban downstream yang invalid, dan jangan tampilkan notifikasi teknis redirect.
- [x] Pastikan setiap branch yang dapat dicapai berakhir pada rule atau redirect; tampilkan fallback yang ditentukan dokumen bila tidak ada rule, bukan chart default.
- [x] Pastikan recommendation non-chart `KPI / Big Number` dan `Separate Views` tidak diberi Guide ID yang tidak tersedia.

### Phase 3 — wizard, hasil, dan interaksi

- [x] Bangun initial state dengan satu pertanyaan root dan lima pilihan intent ber-helper; tampilkan satu pertanyaan dalam satu waktu.
- [x] Render pilihan sebagai button semantic yang seluruh areanya dapat dipilih dan langsung memajukan wizard; gunakan breadcrumb/context untuk memberi orientasi tanpa menampilkan ID internal atau persentase progress tetap.
- [x] Sediakan `Kembali`, `Ubah jawaban`, dan `Mulai dari awal`/`Coba lagi`; terapkan invalidasi downstream saat jawaban diubah dan reset tanpa modal konfirmasi.
- [x] Setelah transisi, pindahkan focus secara logis ke pertanyaan baru; saat result muncul, focus ke heading hasil. Dukung Tab, Enter/Space, focus visible, label deskriptif, kontras, target sentuh memadai, dan `prefers-reduced-motion`.
- [x] Render satu result surface dengan urutan nama chart, variant, alasan, tips, alternative/watch-out yang tersedia, CTA Guide yang valid, dan aksi ubah jawaban/restart.
- [x] Render result KPI / Separate Views tanpa CTA Guide. Sembunyikan subsection opsional yang kosong dan jangan menambahkan preview chart dekoratif.
- [x] Tambahkan loading/error/fallback state secukupnya; kegagalan analytics tidak boleh menghalangi wizard.

### Phase 4 — integrasi Chart Guide dan Map

- [x] Tambahkan entry `map` ke `chart/charts.json` dengan deskripsi, kegunaan, contoh struktur data, dos/don'ts, dan `when_not_to_use` yang dibutuhkan detail template.
- [x] Jelaskan perbedaan Choropleth untuk administrative regions dan Point/Symbol Map untuk lokasi individual; tegaskan bahwa kolom lokasi saja tidak cukup dan Bar Chart lebih cocok bila tujuan hanya ranking wilayah.
- [x] Perbarui taxonomy/filter Chart Guide agar mencakup Comparison, Trend, Distribution, Relationship, Composition, dan Geography (label UI: Perbandingan, Tren, Sebaran, Hubungan, Komposisi, Geografis); beri tag multi-intent yang sesuai pada chart terkait tanpa menghapus kegunaan tag lama.
- [x] Pastikan Map muncul dalam katalog dan detail Guide tetap usable tanpa konfigurasi map renderer; pertahankan fallback preview yang ada.
- [x] Tambahkan tautan kecil dekat intro/filter Chart Guide: `Tidak yakin chart mana yang cocok? Coba Chart Recommender →`.
- [x] Pastikan setiap CTA recommendation membuka `chart/chart.html?id=<chartId>` yang valid dan family Guide yang sesuai, termasuk saat recommendation memakai variant.

### Phase 5 — analytics dan privasi

- [x] Muat bootstrap analytics existing dan sediakan hooks untuk `recommender_started` (`entry_source`), `recommender_intent_selected` (`intent`), `recommender_question_answered` (`question_id`, `answer_id`), `recommender_completed` (`intent`, `rule_id`, `recommended_chart`, `question_count`), `recommender_restarted` (`previous_intent`, `previous_rule_id` bila ada), dan `recommender_guide_opened` (`recommended_chart`, `rule_id`).
- [x] Pastikan event hanya mengirim properti tersebut; jangan kirim jawaban bebas, isi dataset, atau data pribadi. Event error/guide click tidak boleh membuat halaman gagal bila `gtag` belum tersedia.

### Phase 6 — acceptance dan regression review

- [x] Telusuri seluruh node/answer ID dari decision tree: semua root intent dan question reachable, setiap path punya terminal/redirect, tidak ada dead-end, dan kebanyakan path selesai dalam 2–5 pertanyaan.
- [x] Verifikasi 23 skenario rekomendasi yang mencakup skenario QA #27 di `DECISION_TREE.md`: ranking 5/30 kategori, target vs aktual, Waterfall, Choropleth/Point Map, 2-periode dan tren multi-tahun, Histogram/Box Plot, Scatter/Bubble/Heatmap, komposisi 4 vs 8 bagian, Treemap, KPI, serta Separate Views.
- [x] Verifikasi Back, edit jawaban upstream, invalidasi downstream, semua redirect dan preservation context, restart, fallback, optional content, dan CTA chart mapping.
- [x] Tinjau akses keyboard/screen reader, focus management, dan reduced motion. Tab serta Enter/Space diverifikasi di browser.
- [ ] Selesaikan sweep responsive desktop/tablet/mobile dan pastikan tidak ada horizontal overflow pada viewport kecil.
- [x] Regression-check integrasi Chart Guide: taxonomy, filter/search, katalog 17 chart, Map detail dan navigasi previous/next diverifikasi; 16 detail chart lama tidak dibuka satu per satu.
- [x] Verifikasi sidebar active state, homepage card/popular link, root dan subfolder routes, metadata/canonical, sitemap, dan kontrak privasi payload analytics melalui code review.
- [x] Jalankan smoke test route dan integrasi Chart Recommender pada Apache XAMPP. Beranda, recommender, Chart Guide, dan Map detail mengembalikan HTTP 200; kartu beranda, sidebar, jalur rekomendasi Map, CTA, dan filter Tren diverifikasi.

### File yang dibuat/diubah

Buat:

- `chart-recommender/index.html`
- `chart-recommender/style.css`
- `chart-recommender/decision-tree.js`
- `chart-recommender/engine.js`
- `chart-recommender/script.js`

Ubah:

- `assets/nav.js` — route resolver, item TOOLS, active state, dan ikon.
- `index.html` — route lokal, ikon, serta link penemuan tool.
- `tools/tools.json` — entri tool ke-8.
- `chart/charts.json` — Map Guide dan taxonomy yang relevan.
- `chart/index.html` — filter taxonomy dan cross-link ke recommender.
- `chart/chart.html` — label kategori baru dan detail Map yang kompatibel dengan renderer existing.
- `sitemap.xml`, `README.md`, dan `SMOKE-TEST.md`.

Jangan ubah shared design tokens atau fungsi Chart Guide yang tidak terkait bila pola yang ada sudah cukup. Jangan menambah framework, backend, akun/persistence, AI, library preview, atau chart di luar vocabulary V1.

## SQL Challenge

Status: route berisi 100 soal bertahap (35 Easy, 45 Medium, 20 Hard) dari delapan dataset: kedai kopi, toko online, HR, perpustakaan, customer support, kampus, layanan langganan, dan web analytics. Pencarian, status/progres lokal, schema dinamis, editor kosong, runner DuckDB-Wasm, grading hasil, dan integrasi beranda/navigasi tersedia. QA interaktif di XAMPP masih perlu dilakukan.

- [x] Susun 100 soal bertahap dari SELECT/ORDER BY dan filter menuju JOIN, agregasi, subquery, CTE, dan window function.
- [x] Sediakan delapan konteks dataset dengan schema yang berubah sesuai soal: kedai kopi, toko online, HR, perpustakaan, customer support, kampus, layanan langganan, dan web analytics.
- [x] Tambahkan pencarian soal berdasarkan judul, topik, prompt, dataset, dan tingkat kesulitan.
- [x] Gunakan pemilih soal ringkas di viewport mobile agar daftar 100 soal tidak mendorong latihan terlalu jauh ke bawah.
- [x] Kelompokkan soal pada navigasi berdasarkan Easy, Medium, dan Hard; buka grup sesuai soal aktif.
- [x] Tampilkan status per soal dan progres level/total; simpan status secara lokal di browser.
- [x] Tampilkan schema dataset aktif pada soal yang sedang dikerjakan.
- [x] Mulai tiap soal dengan editor kosong; jangan tampilkan query jawaban sebagai starter.
- [x] Jalankan query `SELECT`/`WITH` di DuckDB-Wasm lokal browser dan tampilkan hasil tabel serta status kecocokan.
- [x] Tambahkan route, active state sidebar, kartu beranda, katalog tools, sitemap, dan dokumentasi.
- [x] Pin DuckDB-Wasm ke versi CDN yang tersedia; tampilkan pesan yang bisa dipulihkan ketika engine gagal dimuat.
- [x] Pastikan setiap soal membuka editor kosong dan parameter `q` berubah saat soal dipilih.
- [ ] Verifikasi seluruh 100 query jawaban, query salah, statement non-SELECT, navigasi Back/Forward, dan layout responsive melalui XAMPP.
