# PRD — BikinDashboard Data Quality Checker

**Product:** BikinDashboard Tools  
**Feature:** Data Quality Checker  
**Version:** V1 / MVP  
**Status:** Draft  
**Target URL:** `tools.bikindashboard.com/data-quality-checker`

## 1. Overview

Data Quality Checker adalah tool gratis untuk membantu pengguna memahami kondisi awal sebuah dataset sebelum melakukan analisis atau membuat dashboard.

Pengguna mengunggah file CSV atau Excel, kemudian BikinDashboard melakukan profiling otomatis dan menampilkan:

- jumlah row dan column
- missing values
- duplicate rows
- inferred data types
- unique values
- basic statistics
- potential data-quality issues

Pemrosesan sebisa mungkin dilakukan sepenuhnya di browser sehingga dataset tidak perlu dikirim ke server.

### Core proposition

> **Check your data before building your dashboard.**

Versi Indonesia:

> **Cek kualitas datamu sebelum mulai bikin dashboard.**

---

## 2. Problem

Sebelum membuat dashboard, pengguna sering menerima dataset tanpa mengetahui kondisinya.

Masalah umum:

- terdapat missing values tanpa disadari;
- terdapat duplicate rows;
- numeric column terbaca sebagai text;
- categorical values tidak konsisten;
- terdapat column kosong atau hanya memiliki satu nilai;
- user tidak mengetahui distribusi dasar data;
- user harus melakukan pengecekan manual melalui Excel, Python, SQL, atau BI tool.

Bagi beginner, masalah tambahan adalah mereka belum tentu mengetahui apa yang seharusnya diperiksa sebelum mulai menganalisis data.

Data Quality Checker menyediakan **first inspection layer** sebelum dataset digunakan lebih lanjut.

---

## 3. Goals

V1 harus memungkinkan user melakukan:

**Upload → Inspect → Understand**

User harus dapat menjawab:

- Berapa besar dataset saya?
- Ada missing value?
- Ada duplicate?
- Tipe masing-masing kolom apa?
- Kolom mana yang perlu diperiksa?
- Bagaimana karakteristik dasar setiap kolom?

V1 **bukan** tool untuk memperbaiki dataset.

---

## 4. Non-Goals

V1 tidak mencakup:

- AI analysis
- automatic data cleaning
- data transformation
- database connection
- SQL execution
- dashboard generation
- anomaly detection berbasis ML
- schema validation kompleks
- data-quality scoring arbitrer
- user account
- cloud storage
- dataset history
- collaboration
- scheduled monitoring

Secara khusus, V1 tidak memberikan satu angka seperti **“Data Quality Score: 82/100”**, karena weighting kualitas data sulit dipertanggungjawabkan tanpa konteks bisnis.

Sebagai gantinya, sistem menampilkan fakta dan detected issues secara transparan.

---

## 5. Target Users

### Primary

**Beginner – Intermediate Data Analyst**

Pengguna yang bekerja dengan:

- Excel
- SQL
- Tableau
- Power BI
- Python/Pandas

dan perlu memahami dataset sebelum melakukan analisis.

### Secondary

- mahasiswa
- peserta bootcamp
- BI analyst
- dashboard developer
- orang yang sedang mengerjakan portfolio data
- business user yang menerima CSV/Excel

---

## 6. Primary User Flow

```text
Open Data Quality Checker
        ↓
Upload CSV / Excel
        ↓
File parsed locally
        ↓
Dataset profiling
        ↓
Dataset Overview
        ↓
Detected Issues
        ↓
Column Profiles
        ↓
Inspect individual column
        ↓
Upload another dataset
```

Target: **zero configuration**.

User tidak perlu memilih delimiter, datatype, rule, atau konfigurasi lain kecuali parsing otomatis gagal.

---

## 7. Input

V1 mendukung:

### CSV
`.csv`

### Excel
`.xlsx`

Untuk workbook dengan beberapa sheet, tampilkan **Select sheet** dan daftar sheet yang tersedia.

`.xls` tidak wajib pada V1 jika dukungannya menambah kompleksitas.

---

## 8. Upload Experience

Area awal berupa dropzone besar.

Contoh copy:

> **Check your dataset**
>
> Upload CSV or Excel to quickly find missing values, duplicates, data types, and other potential issues.
>
> **Drop your file here**
>
> or
>
> `Browse file`
>
> CSV or XLSX
>
> 🔒 Your data stays in your browser.

Drag & drop dan file picker harus tersedia.

---

## 9. Privacy

Jika seluruh processing memang client-side, tampilkan dengan jelas:

> **Your data stays private**
>
> Files are processed locally in your browser and are not uploaded to our server.

Jangan menggunakan klaim tersebut apabila implementasi mengirim data ke backend atau third-party service.

---

## 10. Dataset Overview

Setelah parsing berhasil, tampilkan ringkasan:

- Rows
- Columns
- Duplicate rows
- Columns with missing values

Tambahkan metadata:

- File name
- File size

Hindari terlalu banyak KPI cards.

---

## 11. Detected Issues

Setelah overview, tampilkan masalah yang ditemukan.

Contoh:

### High
**326 duplicate rows**  
2.6% of the dataset contains identical rows.

### Medium
**order_date contains 224 missing values**  
1.8% of values are missing.

### Low
**region may contain inconsistent categories**

Detected:
- `Jakarta`
- `jakarta`
- `JAKARTA`

Jika tidak ditemukan masalah berdasarkan rules V1:

> **No obvious issues detected**
>
> We didn't find common data-quality problems using the current checks.

Hindari klaim **“Your dataset is clean.”**

---

## 12. Issue Severity

Gunakan tiga level:

### High
Masalah yang sangat mungkin mempengaruhi analisis.

Contoh:
- duplicate rows dalam jumlah signifikan;
- column seluruhnya kosong.

### Medium
Masalah yang membutuhkan perhatian.

Contoh:
- missing values;
- mixed datatype;
- potential duplicate identifier.

### Low
Potential issue yang membutuhkan interpretasi user.

Contoh:
- constant column;
- inconsistent capitalization;
- high cardinality.

Severity harus berasal dari rule yang jelas, bukan AI judgement.

Threshold disimpan sebagai configurable constants agar mudah dievaluasi setelah penggunaan nyata.

---

## 13. Column Overview

Tabel utama:

| Column | Type | Missing | Unique | Status |
|---|---|---:|---:|---|
| order_id | Text | 0% | 12,124 | ⚠ |
| order_date | Date | 1.8% | 720 | ⚠ |
| customer | Text | 0.2% | 4,821 | ⚠ |
| category | Text | 0% | 8 | ✓ |
| sales | Number | 0% | 10,823 | ✓ |
| profit | Number | 0% | 9,621 | ✓ |

Table harus:

- sortable;
- searchable berdasarkan column name;
- dapat difilter berdasarkan issue;
- row dapat diklik.

Filter minimal:

`All` | `Issues` | `Missing` | `Clean`

---

## 14. Data Type Detection

V1 menggunakan tipe:

- Text
- Number
- Date
- Boolean
- Empty

Integer dan decimal tetap dikelompokkan sebagai `Number`.

---

## 15. Column Profile

Klik sebuah column membuka detail.

Untuk numeric column tampilkan:

- count
- missing
- unique
- min
- max
- mean
- median

Opsional jika implementasinya ringan:

- Q1
- Q3
- standard deviation

---

## 16. Numeric Distribution

Numeric column dapat menampilkan histogram sederhana.

Tujuannya membantu user melihat:

- distribution;
- skew;
- potential extreme values.

Ini bukan exploratory analysis lengkap.

---

## 17. Categorical Profile

Untuk text/categorical column tampilkan:

- total values
- missing
- unique
- top values
- count
- percentage

Batasi misalnya **Top 10 values** agar ribuan category tidak dirender.

---

## 18. Date Profile

Untuk Date tampilkan:

- earliest date
- latest date
- missing
- unique dates

V1 tidak perlu membuat time-series chart.

---

## 19. Duplicate Detection

V1 mendeteksi **full-row duplicates**.

Contoh:

> **326 duplicate rows found**
>
> 2.6% of rows are exact duplicates.

User dapat memilih **View duplicate rows**, kemudian tampilkan preview terbatas.

Tidak ada delete pada V1.

---

## 20. Missing Value Detection

Untuk setiap column hitung:

- `missing_count`
- `missing_percentage`

Missing minimal mempertimbangkan:

- null
- blank
- empty string
- whitespace-only string setelah trim untuk profiling

Data asli tidak dimodifikasi.

---

## 21. Potential Inconsistent Categories

Tool dapat melakukan normalized comparison menggunakan minimal:

- trim
- lowercase

Contoh:

`Jakarta`, `jakarta`, `JAKARTA`

Jika original values berbeda menghasilkan normalized value yang sama, tampilkan:

> **Potential inconsistent categories**

Jangan otomatis menyatakan nilai tersebut salah karena perbedaannya mungkin disengaja.

---

## 22. Constant Columns

Jika:

```text
unique_non_null_values = 1
```

tampilkan:

> **Constant column**
>
> All non-empty rows contain the same value.

---

## 23. High Cardinality

Jika text column hampir seluruhnya unique, tampilkan sebagai informasi:

> **High cardinality**
>
> 98.7% of values are unique.

Jangan otomatis menjadikannya warning karena identifier memang dapat memiliki cardinality tinggi.

---

## 24. Potential Identifier

Jika text/numeric column memiliki unique count mendekati row count, tool dapat menandainya:

> **Possible identifier**

Contoh:
- `customer_id`
- `transaction_id`
- `order_id`

Fitur ini optional untuk V1.

---

## 25. Mixed Data Type

Contoh:

```text
100
250
unknown
400
```

Jika mayoritas nilai numeric tetapi sebagian tidak dapat diparse:

> **Mixed values detected**
>
> Most values appear numeric, but some values could not be parsed as numbers.

Masukkan sebagai **P1** jika scope development mulai membesar.

---

## 26. Data Preview

Sediakan section **Data Preview**.

Tampilkan misalnya first 50 rows.

Tujuannya hanya membantu user memahami dataset.

Tidak perlu:

- spreadsheet editing;
- filtering kompleks;
- formulas;
- data manipulation.

---

## 27. Recommended Page Structure

```text
Breadcrumb
Tools / Data Quality Checker

Data Quality Checker
Check common data issues before analysis.

[ Upload Area ]

---------------------------------

Dataset Overview

Rows      Columns      Duplicates      Missing Columns

---------------------------------

Issues Found

⚠ Duplicate rows
⚠ Missing values
⚠ Potential inconsistent categories

---------------------------------

Columns

Search...
[All] [Issues] [Missing] [Clean]

Column       Type       Missing       Unique       Status
...

---------------------------------

Column Profile

Distribution / Top Values
Statistics

---------------------------------

Data Preview

---------------------------------

Privacy explanation
```

Desain harus konsisten dengan BikinDashboard: **clean, putih, generous whitespace, border tipis, minim dekorasi dan tidak terasa AI-generated.**

---

## 28. Empty State

Sebelum file di-upload, jangan tampilkan dashboard kosong.

Tampilkan manfaat:

### What we'll check

**Missing Values**  
Find incomplete columns.

**Duplicates**  
Detect identical rows.

**Data Types**  
Understand how each column is interpreted.

**Column Statistics**  
Quickly understand distributions and values.

---

## 29. Error Handling

### Unsupported format
> This file format isn't supported yet. Please upload CSV or XLSX.

### Empty dataset
> This file doesn't contain any data.

### Parsing failure
> We couldn't read this file. Check the file format and try again.

### Very large dataset
Jangan biarkan browser freeze.

Jika melebihi limit:

> This dataset is too large to analyze safely in your browser.

Batas final ditentukan melalui performance testing.

---

## 30. Performance

Target V1:

- interaction tetap responsive;
- analysis dilakukan client-side;
- progress/loading state tersedia untuk dataset yang membutuhkan waktu;
- processing berat tidak membuat UI terlihat hang.

Jika diperlukan, profiling dapat dipindahkan ke **Web Worker**.

---

## 31. Technical Direction

Arsitektur ideal:

```text
File
 ↓
Browser File API
 ↓
CSV / XLSX Parser
 ↓
Normalization Layer
 ↓
Profiling Engine
 ↓
Issue Detection Rules
 ↓
UI
```

Gunakan mature client-side parser untuk CSV dan XLSX. Jangan membuat parser format file sendiri.

Target privacy:

```text
Browser
   ↓
Process locally
   ↓
Result
```

bukan:

```text
Browser → BikinDashboard Server → Process
```

---

## 32. Analytics

Track minimal:

- `data_quality_page_view`
- `dataset_upload_started`
- `dataset_analysis_completed`
- `dataset_analysis_failed`
- `column_profile_opened`
- `duplicate_preview_opened`
- `upload_another_dataset`

Jangan kirim:

- filename;
- column names;
- values;
- dataset content.

Metadata yang dapat dipertimbangkan:

- `file_type`
- `row_bucket`
- `column_bucket`
- `processing_time_bucket`

---

## 33. SEO

### Title

**Free Data Quality Checker for CSV & Excel | BikinDashboard**

### Description

**Check missing values, duplicate rows, data types, unique values, and basic statistics from CSV or Excel files directly in your browser.**

Potential search intents:

- data quality checker
- csv data quality checker
- check csv missing values
- csv duplicate checker
- excel data quality checker
- data profiling tool

---

## 34. V1 Scope

### P0 — Must Have

#### Input
- CSV
- XLSX
- drag & drop
- local processing

#### Overview
- rows
- columns
- duplicate rows
- columns with missing values

#### Column Profiling
- inferred datatype
- missing count/percentage
- unique count
- numeric basic statistics
- categorical top values
- date min/max

#### Issues
- missing values
- duplicate rows
- empty columns
- constant columns
- potential inconsistent categories

#### UX
- column table
- search/filter
- column detail
- data preview
- loading/error states
- upload another file

### P1 — Nice to Have

- histogram
- mixed datatype detection
- potential identifier
- high-cardinality information
- duplicate row preview
- export quality report

### P2 — Later

- automatic cleaning
- download cleaned dataset
- custom validation rules
- AI explanation
- compare datasets
- schema validation
- database connection
- data-quality history
- scheduled checks

---

## 35. Success Metrics

### Primary

**Analysis Completion Rate**

Persentase user yang membuka tool kemudian berhasil menganalisis dataset.

### Secondary

- unique users
- dataset analyses
- repeat users
- average issues inspected
- column profile interaction
- traffic source
- return rate

Pertanyaan validasi utama:

> Apakah Data Quality Checker mendapatkan lebih banyak repeat usage dibanding Chart Guide, Color Palette, dan Resource Hub?

---

## 36. Definition of Done

V1 dianggap selesai apabila user dapat:

> membuka BikinDashboard → upload CSV/XLSX → dataset diproses tanpa dikirim ke server → melihat overview → menemukan missing & duplicate → memahami profil setiap column → melihat potential issues → mengganti dataset.

Tanpa login.

Tanpa AI.

Tanpa backend processing.

Tanpa cleaning.

**Satu job utama: _“Tell me what's wrong—or potentially wrong—with my dataset.”_**
