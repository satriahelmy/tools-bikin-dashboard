# Data Quality Checker — batasan V1

Data Quality Checker memproses CSV/XLSX sepenuhnya di browser. File, nama
kolom, dan nilai dataset tidak dikirim ke backend untuk diproses. Jika host
memasang provider analytics, tool hanya mengirim metadata privacy-safe:
`file_type`, `row_bucket`, `column_bucket`, dan `processing_time_bucket`.

## Dukungan browser

Gunakan versi terbaru Chrome, Edge, Firefox, atau Safari yang mendukung File
API, FileReader, dan Web Worker. XLSX memakai Web Worker bila tersedia; bila
Worker tidak tersedia, parser memakai fallback di main thread. Browser lama
atau mode private yang membatasi File API dapat menolak file sebelum analisis.

## Batas dataset

- Ukuran file maksimum: 25 MB.
- Baris maksimum: 250.000.
- Preview data dan duplicate preview: maksimum 50 baris.
- Top categorical values: maksimum 10 nilai.
- Batas waktu Worker: 120 detik.

Nilai ini terpusat di `config.js` dan dapat dituning setelah ada benchmark
dataset nyata.

## Tipe data

Inference menghasilkan `Text`, `Number`, `Date`, `Boolean`, atau `Empty`.
Kolom Number mendukung bilangan bulat dan desimal dengan aturan parser yang
dipakai saat ini. Date mengenali format berbasis `YYYY-MM-DD` atau `YYYY/MM/DD`.
Nilai `true`/`false` dikenali sebagai Boolean. Nilai ambigu memakai fallback
Text; inference bukan validasi schema.

Missing mencakup `null`, `undefined`, string kosong, whitespace-only, `na`,
`n/a`, dan `nan`. Nilai asli tetap dipertahankan untuk preview.

## Threshold issue

- Missing `>= 5%`: severity Medium; di bawahnya Low.
- Duplicate rows `>= 2%`: High; di bawahnya Medium.
- High cardinality: minimal `95%` nilai terisi bersifat unik.
- Inconsistent categories: minimal dua variasi setelah trim/lowercase.
- Mixed numeric values: minimal `80%` nilai Text dapat diparse sebagai angka,
  tetapi sebagian lainnya tidak.
- Empty column: High; constant column: Low.

Issue adalah sinyal inspeksi, bukan klaim bahwa dataset pasti bersih.

## Parser dan scope V1

Parser lokal yang dipakai adalah Papa Parse 5.4.1 untuk CSV dan SheetJS 0.18.5
untuk XLSX. V1 mencakup upload, pemilihan sheet, overview, issue detection,
column profile, histogram numeric sederhana, preview, dan duplicate preview.

V1 belum mencakup cleaning, download dataset bersih, custom validation rules,
AI explanation, dataset comparison, schema validation, koneksi database,
history, atau scheduled checks.
