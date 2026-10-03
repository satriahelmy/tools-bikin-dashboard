# Dokumentasi sumber

Folder ini menampung dokumen perencanaan, desain, QA, dan arsip ZIP yang menjadi referensi pembangunan website. Isinya tidak dipakai sebagai route aplikasi produksi.

## Struktur

- `source/chart/` — PRD dan design spec Chart Guide.
- `source/colorpalette/` — PRD, design spec, tasks, QA checklist, dan README tool Color Palette.
- `source/data-quality-checker/` — PRD dan tasks Data Quality Checker.
- `source/book-library/` — workbook validasi tambahan buku; workbook ini memuat catatan maintainer dan hanya dipakai oleh generator lokal.
- `source/papers/` — PRD dan design spec Paper Library.
- `source/papers/workbooks/` — workbook editorial sumber Paper Library yang dipakai untuk membuat JSON runtime.
- `source/resourcehub/` — PRD, design spec, dan tasks Resource Hub.
- `source/challenge/` — PRD dan design spec Data Challenge.
- `archive/` — snapshot ZIP dari tool awal.

Dokumen Color Palette memakai nama standar `prd.md` dan `design.md`; file unduhan dengan suffix `(1)`/`(2)` tidak dipertahankan.

Dokumen operasional yang relevan untuk deployment tetap berada di root:

- [`../README.md`](../README.md) — cara menjalankan lokal.
- [`../SMOKE-TEST.md`](../SMOKE-TEST.md) — checklist sebelum deployment.
- [`../task.md`](../task.md) — roadmap integrasi unified tools.
