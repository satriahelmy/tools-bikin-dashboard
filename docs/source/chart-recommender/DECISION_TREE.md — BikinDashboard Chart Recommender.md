# Chart Recommender — Decision Tree Specification

**Product:** BikinDashboard\
**Feature:** Chart Recommender\
**Version:** V1\
**Parent Specification:** `PRD.md`\
**Design Specification:** `DESIGN.md`

---

# 1. Purpose

Dokumen ini merupakan **source of truth untuk recommendation logic** Chart Recommender.

PRD mendefinisikan product requirements.

Dokumen ini mendefinisikan:

- question IDs;
- answer IDs;
- conditional branches;
- terminal rules;
- cross-intent redirects;
- chart recommendations;
- chart variants;
- alternatives;
- contextual tips;
- watch-outs;
- Chart Guide mapping.

Recommendation engine bersifat deterministic.

Tidak ada AI/LLM inference pada V1.

---

# 2. Core Flow

High-level flow:

`Intent → Conditional Question → Branch → Modifier → Recommendation`

User hanya melihat pertanyaan yang relevan berdasarkan jawaban sebelumnya.

Target normal:

**2–5 questions per completed recommendation.**

---

# 3. Root Intent

## Question ID

`ROOT-01`

## Question

> **Apa yang ingin kamu tunjukkan dengan datamu?**

## Answers

### `ROOT-CMP`

**Comparison**

Membandingkan nilai antar kategori, target, atau periode.

→ `CMP-01`

### `ROOT-TRD`

**Trend**

Melihat perubahan dari waktu ke waktu.

→ `TRD-01`

### `ROOT-DST`

**Distribution**

Melihat bagaimana nilai tersebar.

→ `DST-01`

### `ROOT-REL`

**Relationship**

Melihat hubungan antar variabel.

→ `REL-01`

### `ROOT-COM`

**Composition**

Melihat bagian dari suatu keseluruhan.

→ `COM-01`

---

# 4. Comparison

## `CMP-01` — Comparison Type

### Question

> **Apa yang ingin kamu bandingkan?**

### Answers

#### `CMP-CATEGORIES`

Nilai antar kategori

Helper:

> Contoh: Sales antar outlet atau jumlah pelanggan per kota.

→ `CMP-02`

#### `CMP-BENCHMARK`

Nilai dengan target atau benchmark

Helper:

> Contoh: Actual Sales dibanding Target Sales.

→ `RULE-CMP-BULLET`

#### `CMP-TWO-PERIODS`

Perubahan antara dua periode

Helper:

> Contoh: Revenue 2025 dibanding 2026 untuk beberapa product category.

→ `CMP-06`

#### `CMP-CONTRIBUTION`

Bagaimana beberapa kenaikan dan penurunan membentuk nilai akhir

Helper:

> Contoh: bagaimana Revenue, Cost, dan Expenses membentuk Profit.

→ `RULE-CMP-WATERFALL`

---

# 5. Comparison — Category Branch

## `CMP-02` — Geography Relevance

### Question

> **Apakah lokasi geografis penting untuk memahami pola datanya?**

### Helper

> Pilih Ya jika posisi atau wilayah merupakan bagian penting dari insight, bukan hanya nama kategori.

### Answers

#### `CMP-GEO-YES`

Ya, lokasi penting.

→ `CMP-03`

#### `CMP-GEO-NO`

Tidak, saya hanya ingin membandingkan kategorinya.

→ `CMP-04`

---

## `CMP-03` — Geography Type

### Question

> **Data lokasimu berupa apa?**

### Answers

#### `CMP-GEO-REGION`

Wilayah administratif

Helper:

> Contoh: negara, provinsi, kota, atau kabupaten.

→ `RULE-CMP-MAP-REGION`

#### `CMP-GEO-POINT`

Titik atau lokasi individual

Helper:

> Contoh: outlet, cabang, fasilitas, atau koordinat latitude/longitude.

→ `RULE-CMP-MAP-POINT`

---

## `CMP-04` — Measure Count

### Question

> **Berapa nilai (measure) yang ingin dibandingkan?**

### Answers

#### `CMP-MEASURE-ONE`

Satu nilai

Helper:

> Contoh: Sales.

→ `CMP-05`

#### `CMP-MEASURE-MULTIPLE`

Lebih dari satu nilai

Helper:

> Contoh: Sales dan Profit.

→ `CMP-07`

---

## `CMP-05` — Category Count

### Question

> **Berapa banyak kategori yang ingin dibandingkan?**

### Answers

#### `CMP-CAT-FEW`

Sedikit

Helper:

> Sekitar 2–5 kategori.

→ `RULE-CMP-BAR-FEW`

#### `CMP-CAT-SEVERAL`

Beberapa

Helper:

> Sekitar 6–15 kategori.

→ `RULE-CMP-BAR-SEVERAL`

#### `CMP-CAT-MANY`

Banyak

Helper:

> Lebih dari 15 kategori.

→ `RULE-CMP-BAR-MANY`

---

# 6. Comparison — Two Periods

## `CMP-06` — Two-Period Scope

### Question

> **Apakah perubahan ingin dibandingkan untuk satu nilai utama atau beberapa kategori?**

### Answers

#### `CMP-TWO-SINGLE`

Satu nilai utama

Helper:

> Contoh: total Revenue 2025 vs 2026.

→ `RULE-CMP-TWO-SINGLE`

#### `CMP-TWO-MULTIPLE`

Beberapa kategori

Helper:

> Contoh: Revenue 2025 vs 2026 untuk setiap product category.

→ `RULE-CMP-SLOPE`

---

# 7. Comparison — Multiple Measures

## `CMP-07` — Unit Compatibility

### Question

> **Apakah nilai yang dibandingkan menggunakan unit atau skala yang sejenis?**

### Answers

#### `CMP-UNIT-SAME`

Ya

Helper:

> Contoh: Sales 2025 dan Sales 2026, keduanya dalam Rupiah.

→ `CMP-08`

#### `CMP-UNIT-DIFFERENT`

Tidak

Helper:

> Contoh: Revenue dalam Rupiah dan Profit Margin dalam persen.

→ `RULE-CMP-MULTI-DIFFERENT`

---

## `CMP-08` — Multiple Measure Category Count

### Question

> **Berapa banyak kategori yang ingin dibandingkan?**

### Answers

#### `CMP-MULTI-FEW`

Sedikit

→ `RULE-CMP-BAR-GROUPED`

#### `CMP-MULTI-MANY`

Banyak

→ `RULE-CMP-DOT-MULTI`

---

# 8. Comparison Rules

## `RULE-CMP-BULLET`

### Recommended

**Bullet Chart**

### Why

Kamu ingin membandingkan nilai aktual terhadap target atau benchmark. Bullet Chart membuat hubungan antara actual, target, dan performance range terlihat secara ringkas.

### How to Use

- tampilkan actual sebagai nilai utama;
- gunakan marker yang jelas untuk target;
- gunakan performance range hanya jika memiliki arti bisnis;
- pertahankan skala yang konsisten saat membandingkan beberapa item.

### Alternative

**Bar Chart**

### Watch Out

Jangan menambahkan terlalu banyak performance bands jika tidak memiliki definisi yang jelas.

### Guide

`bullet-chart`

---

## `RULE-CMP-WATERFALL`

### Recommended

**Waterfall Chart**

### Why

Kamu ingin menjelaskan bagaimana beberapa kenaikan dan penurunan berkontribusi terhadap nilai akhir.

### How to Use

- mulai dari nilai awal yang jelas;
- pisahkan kontribusi positif dan negatif;
- tampilkan subtotal hanya jika membantu;
- akhiri dengan nilai akhir yang jelas.

### Alternative

**Bar Chart**

### Watch Out

Waterfall kurang efektif jika kontribusinya tidak memiliki urutan atau hubungan additive yang jelas.

### Guide

`waterfall-chart`

---

## `RULE-CMP-MAP-REGION`

### Recommended

**Map**

### Variant

**Choropleth Map**

### Why

Lokasi geografis merupakan bagian penting dari insight dan datamu mewakili wilayah administratif.

### How to Use

- gunakan geographic boundaries yang sesuai;
- gunakan sequential color scale untuk magnitude;
- tampilkan legend yang jelas;
- pertimbangkan rate atau normalized value ketika ukuran wilayah/populasi berbeda.

### Alternative

**Bar Chart**

### Watch Out

Jika tujuan utamanya hanya mencari wilayah tertinggi atau terendah, Bar Chart biasanya lebih mudah dibandingkan secara presisi.

### Guide

`map`

---

## `RULE-CMP-MAP-POINT`

### Recommended

**Map**

### Variant

**Point / Symbol Map**

### Why

Kamu ingin melihat pola lokasi dari titik individual seperti outlet, cabang, atau fasilitas.

### How to Use

- gunakan posisi geografis sebagai encoding utama;
- gunakan ukuran simbol hanya jika mewakili nilai yang meaningful;
- gunakan transparency jika banyak titik saling bertumpuk;
- pertahankan basemap tetap sederhana.

### Alternative

**Scatter Plot**

### Watch Out

Terlalu banyak titik dapat menyebabkan overlap dan menyembunyikan pola.

### Guide

`map`

---

## `RULE-CMP-BAR-FEW`

### Recommended

**Bar Chart**

### Why

Bar Chart memberikan perbandingan yang sederhana dan presisi untuk sejumlah kecil kategori.

### How to Use

- gunakan baseline zero;
- gunakan warna secara konsisten;
- highlight hanya kategori yang penting;
- gunakan data labels jika exact value diperlukan.

### Alternative

**Dot Plot**

### Guide

`bar-chart`

---

## `RULE-CMP-BAR-SEVERAL`

### Recommended

**Bar Chart**

### Why

Kamu membandingkan satu nilai pada beberapa kategori dan panjang bar masih mudah dibandingkan.

### How to Use

- pertimbangkan orientasi horizontal jika label panjang;
- urutkan berdasarkan nilai jika ranking relevan;
- gunakan baseline zero;
- hindari warna berbeda untuk setiap kategori tanpa alasan.

### Alternative

**Dot Plot**

### Watch Out

Pie atau Donut Chart akan semakin sulit dibandingkan ketika jumlah kategori bertambah.

### Guide

`bar-chart`

---

## `RULE-CMP-BAR-MANY`

### Recommended

**Bar Chart**

### Variant

**Horizontal Bar Chart**

### Why

Kamu memiliki banyak kategori. Orientasi horizontal memberikan ruang lebih besar untuk label dan membuat ranking lebih mudah dibaca.

### How to Use

- gunakan horizontal orientation;
- sort berdasarkan nilai jika ranking penting;
- pertimbangkan Top N jika kategori terlalu banyak;
- highlight hanya kategori yang perlu perhatian.

### Alternative

**Dot Plot**

### Watch Out

Jangan mencoba membedakan puluhan kategori menggunakan puluhan warna.

### Guide

`bar-chart`

---

## `RULE-CMP-TWO-SINGLE`

### Recommended

**KPI / Big Number**

### Why

Kamu hanya membandingkan satu nilai utama antara dua periode. Perubahan dapat disampaikan lebih langsung tanpa chart penuh.

### How to Use

- tampilkan current value;
- tampilkan previous value atau percentage change;
- gunakan direction indicator jika relevan;
- berikan period context yang jelas.

### Alternative

**Bar Chart**

### Watch Out

Jangan menggunakan Line Chart hanya untuk dua titik jika tidak ada pola waktu yang perlu ditunjukkan.

### Guide

None

---

## `RULE-CMP-SLOPE`

### Recommended

**Slope Chart**

### Why

Slope Chart membantu menunjukkan arah dan besarnya perubahan antar dua periode untuk beberapa kategori.

### How to Use

- gunakan hanya dua titik waktu;
- gunakan direct labels;
- highlight perubahan penting;
- batasi jumlah series jika visual menjadi padat.

### Alternative

**Bar Chart**

### Watch Out

Terlalu banyak garis yang saling silang dapat membuat chart sulit dibaca.

### Guide

`slope-chart`

---

## `RULE-CMP-BAR-GROUPED`

### Recommended

**Bar Chart**

### Variant

**Grouped Bar Chart**

### Why

Beberapa nilai dengan unit sejenis dapat dibandingkan berdampingan untuk sejumlah kecil kategori.

### How to Use

- pertahankan urutan series yang konsisten;
- batasi jumlah measure;
- gunakan baseline zero;
- gunakan legend atau direct labels yang jelas.

### Alternative

**Dot Plot**

### Watch Out

Grouped Bar menjadi padat jika jumlah kategori atau measure terlalu banyak.

### Guide

`bar-chart`

---

## `RULE-CMP-DOT-MULTI`

### Recommended

**Dot Plot**

### Why

Dot Plot dapat mengurangi visual weight ketika beberapa nilai dibandingkan pada banyak kategori.

### How to Use

- gunakan axis yang sama;
- gunakan simbol atau warna secara konsisten;
- sort kategori jika ranking penting;
- gunakan horizontal layout untuk label panjang.

### Alternative

**Bar Chart**

### Guide

`dot-plot`

---

## `RULE-CMP-MULTI-DIFFERENT`

### Recommended

**Separate Views**

### Why

Nilai dengan unit atau skala berbeda lebih aman ditampilkan dalam visual terpisah daripada dipaksakan ke satu axis.

### How to Use

- gunakan chart terpisah dengan alignment yang konsisten;
- pertahankan time/category context yang sama;
- letakkan visual berdekatan;
- gunakan clear titles dan units.

### Alternative

**Bar Chart / Line Chart**, tergantung analytical context.

### Watch Out

Dual-axis chart dapat menghasilkan visual relationship yang tampak lebih kuat atau lemah tergantung skala axis.

### Guide

None

---

# 9. Trend

## `TRD-01` — Time Point Count

### Question

> **Berapa banyak periode waktu yang ingin ditampilkan?**

### Answers

#### `TRD-TWO`

Hanya dua periode

Helper:

> Contoh: 2025 vs 2026.

→ `TRD-02`

#### `TRD-FEW`

Beberapa periode

Helper:

> Contoh: Q1, Q2, Q3, Q4.

→ `TRD-03`

#### `TRD-MANY`

Banyak periode

Helper:

> Contoh: data bulanan selama beberapa tahun.

→ `TRD-04`

---

## `TRD-02` — Two-Period Scope

### Question

> **Apakah kamu melihat satu nilai utama atau beberapa kategori?**

### Answers

#### `TRD-TWO-SINGLE`

Satu nilai utama

→ `RULE-TRD-KPI`

#### `TRD-TWO-MULTIPLE`

Beberapa kategori

→ `RULE-TRD-SLOPE`

---

## `TRD-03` — Few Period Focus

### Question

> **Apa yang lebih ingin kamu tonjolkan?**

### Answers

#### `TRD-FEW-PATTERN`

Pola perubahan dari waktu ke waktu

→ `RULE-TRD-LINE-FEW`

#### `TRD-FEW-COMPARE`

Perbandingan nilai antarperiode

→ `RULE-TRD-BAR`

---

## `TRD-04` — Series Count

### Question

> **Berapa banyak series yang ingin ditampilkan?**

### Helper

> Series dapat berupa product, region, outlet, atau metric yang memiliki garis masing-masing.

### Answers

#### `TRD-SERIES-ONE`

Satu

→ `TRD-05`

#### `TRD-SERIES-FEW`

Beberapa

→ `TRD-06`

#### `TRD-SERIES-MANY`

Banyak

→ `RULE-TRD-LINE-MANY`

---

## `TRD-05` — Trend Emphasis

### Question

> **Apakah area atau volume keseluruhan penting untuk ditonjolkan?**

### Answers

#### `TRD-VOLUME-NO`

Tidak, fokus pada pola perubahan.

→ `RULE-TRD-LINE`

#### `TRD-VOLUME-YES`

Ya.

→ `RULE-TRD-AREA`

---

## `TRD-06` — Composition Check

### Question

> **Apakah kamu ingin melihat bagaimana proporsi terhadap total berubah dari waktu ke waktu?**

### Answers

#### `TRD-SHARE-YES`

Ya

→ redirect `COM-03`

#### `TRD-SHARE-NO`

Tidak

→ `RULE-TRD-MULTILINE`

---

# 10. Trend Rules

## `RULE-TRD-KPI`

### Recommended

**KPI / Big Number**

### Why

Hanya ada satu nilai utama pada dua periode sehingga perubahan dapat disampaikan lebih langsung sebagai current value dan change.

### Alternative

**Bar Chart**

### Guide

None

---

## `RULE-TRD-SLOPE`

### Recommended

**Slope Chart**

### Why

Dua periode dengan beberapa kategori cocok ditampilkan sebagai perubahan arah antar dua titik.

### Alternative

**Bar Chart**

### Guide

`slope-chart`

---

## `RULE-TRD-LINE-FEW`

### Recommended

**Line Chart**

### Why

Fokusmu adalah pola perubahan antar beberapa periode, sehingga continuity antar titik waktu penting.

### How to Use

- pertahankan chronological order;
- gunakan time interval yang konsisten;
- highlight perubahan penting;
- jangan memotong atau mengacak urutan waktu.

### Alternative

**Bar Chart**

### Guide

`line-chart`

---

## `RULE-TRD-BAR`

### Recommended

**Bar Chart**

### Why

Kamu lebih ingin membandingkan nilai antarperiode daripada menekankan continuity dari trend.

### How to Use

- pertahankan urutan waktu;
- gunakan baseline zero;
- gunakan label periode yang jelas.

### Alternative

**Line Chart**

### Guide

`bar-chart`

---

## `RULE-TRD-LINE`

### Recommended

**Line Chart**

### Why

Line Chart efektif untuk menunjukkan pola perubahan satu series pada banyak titik waktu.

### How to Use

- gunakan chronological axis;
- gunakan interval waktu yang konsisten;
- gunakan annotation untuk event penting;
- hindari unnecessary markers jika titik sangat banyak.

### Alternative

**Area Chart**

### Guide

`line-chart`

---

## `RULE-TRD-AREA`

### Recommended

**Area Chart**

### Why

Selain trend, kamu ingin menekankan magnitude atau volume sepanjang waktu.

### How to Use

- gunakan baseline zero;
- pertahankan chronological axis;
- hindari terlalu banyak overlapping areas;
- gunakan Line Chart jika precise trend lebih penting daripada volume.

### Alternative

**Line Chart**

### Guide

`area-chart`

---

## `RULE-TRD-MULTILINE`

### Recommended

**Line Chart**

### Variant

**Multi-Line Chart**

### Why

Beberapa series dengan time axis yang sama dapat dibandingkan melalui beberapa garis.

### How to Use

- batasi jumlah warna;
- gunakan direct labels jika memungkinkan;
- highlight series utama;
- pertimbangkan filter jika series bertambah.

### Alternative

**Small Multiples**

### Watch Out

Terlalu banyak garis dapat menghasilkan spaghetti chart.

### Guide

`line-chart`

---

## `RULE-TRD-LINE-MANY`

### Recommended

**Line Chart**

### Variant

**Filtered / Highlighted Multi-Line**

### Why

Trend tetap menjadi analytical goal, tetapi banyak series tidak efektif jika semuanya diberi emphasis yang sama.

### How to Use

- highlight series penting;
- gunakan filter atau interaction;
- tampilkan context series secara muted jika diperlukan;
- pertimbangkan small multiples.

### Alternative

**Small Multiples**

### Watch Out

Jangan memberi warna berbeda yang sama kuatnya untuk puluhan garis.

### Guide

`line-chart`

---

# 11. Distribution

## `DST-01` — Data Type

### Question

> **Data apa yang ingin kamu lihat distribusinya?**

### Answers

#### `DST-CATEGORICAL`

Kategori

Helper:

> Contoh: Product Category, Region, Payment Method.

→ `RULE-DST-BAR`

#### `DST-NUMERIC`

Nilai angka

Helper:

> Contoh: Sales, Age, Delivery Time.

→ `DST-02`

---

## `DST-02` — Distribution Goal

### Question

> **Apa yang ingin kamu pahami dari nilai tersebut?**

### Answers

#### `DST-SHAPE`

Bentuk distribusinya

Helper:

> Apakah nilai menumpuk pada rentang tertentu, miring, atau memiliki beberapa puncak?

→ `RULE-DST-HISTOGRAM`

#### `DST-SPREAD`

Spread dan potential outlier

Helper:

> Seberapa lebar variasinya dan apakah ada nilai yang jauh berbeda?

→ `RULE-DST-BOX`

#### `DST-GROUPS`

Membandingkan distribusi antar kelompok

Helper:

> Contoh: Delivery Time untuk beberapa region.

→ `RULE-DST-BOX-GROUP`

---

# 12. Distribution Rules

## `RULE-DST-BAR`

### Recommended

**Bar Chart**

### Why

Untuk data categorical, jumlah atau proporsi setiap kategori lebih mudah dibandingkan menggunakan panjang bar.

### Alternative

**Dot Plot**

### Watch Out

Histogram digunakan untuk numeric ranges, bukan categorical frequency.

### Guide

`bar-chart`

---

## `RULE-DST-HISTOGRAM`

### Recommended

**Histogram**

### Why

Histogram menunjukkan bagaimana nilai numerik tersebar ke dalam beberapa interval.

### How to Use

- pilih bin size yang masuk akal;
- perhatikan skewness, cluster, gap, dan tails;
- tampilkan axis dengan unit yang jelas;
- coba beberapa bin size jika pola berubah drastis.

### Alternative

**Box Plot**

### Watch Out

Bin yang terlalu sedikit atau terlalu banyak dapat menyembunyikan pola.

### Guide

`histogram`

---

## `RULE-DST-BOX`

### Recommended

**Box Plot**

### Why

Box Plot merangkum median, spread, dan potential outlier secara compact.

### How to Use

- jelaskan median jika audience belum familiar;
- gunakan skala yang konsisten;
- periksa potential outlier dalam konteks data;
- kombinasikan dengan raw points jika dataset kecil.

### Alternative

**Histogram**

### Watch Out

Titik di luar whisker merupakan potential outlier dan tidak otomatis berarti data salah.

### Guide

`box-plot`

---

## `RULE-DST-BOX-GROUP`

### Recommended

**Box Plot**

### Why

Box Plot memudahkan perbandingan median, spread, dan potential outlier antar kelompok.

### How to Use

- gunakan axis yang sama;
- sort groups jika meaningful;
- batasi jumlah groups;
- gunakan horizontal orientation jika labels panjang.

### Alternative

**Dot Plot**

### Watch Out

Terlalu banyak groups akan membuat perbandingan sulit dibaca.

### Guide

`box-plot`

---

# 13. Relationship

## `REL-01` — Variable Combination

### Question

> **Data apa yang ingin kamu hubungkan?**

### Answers

#### `REL-TWO-NUMERIC`

Dua nilai angka

Helper:

> Contoh: Advertising Spend dan Sales.

→ `REL-02`

#### `REL-NUM-CAT`

Nilai angka dengan kategori

Helper:

> Contoh: Salary dan Department.

→ `REL-03`

#### `REL-TWO-CAT`

Dua kategori

Helper:

> Contoh: Membership Type dan Churn Status.

→ `REL-04`

#### `REL-MANY-NUMERIC`

Banyak nilai angka

Helper:

> Contoh: Sales, Profit, Discount, Quantity, dan Cost.

→ `RULE-REL-HEATMAP`

---

## `REL-02` — Third Numeric Variable

### Question

> **Apakah ada nilai angka ketiga yang penting untuk ditampilkan?**

### Answers

#### `REL-THIRD-NO`

Tidak

→ `RULE-REL-SCATTER`

#### `REL-THIRD-YES`

Ya

Helper:

> Contoh: X = Advertising Spend, Y = Sales, ukuran titik = Profit.

→ `RULE-REL-BUBBLE`

---

## `REL-03` — Numeric + Category Goal

### Question

> **Apa yang ingin kamu lihat?**

### Answers

#### `REL-NUMCAT-COMPARE`

Membandingkan nilai antar kategori

Helper:

> Contoh: Average Salary per Department.

→ redirect `CMP-04`

#### `REL-NUMCAT-DISTRIBUTION`

Membandingkan distribusi antar kategori

Helper:

> Contoh: sebaran Salary pada setiap Department.

→ `RULE-DST-BOX-GROUP`

---

## `REL-04` — Category Combination Count

### Question

> **Berapa banyak kombinasi kategori yang perlu dibandingkan?**

### Answers

#### `REL-CAT-FEW`

Sedikit

→ `RULE-REL-STACKED`

#### `REL-CAT-MANY`

Banyak

→ `RULE-REL-HEATMAP-CAT`

---

# 14. Relationship Rules

## `RULE-REL-SCATTER`

### Recommended

**Scatter Plot**

### Why

Scatter Plot menunjukkan pola hubungan antara dua variabel numerik.

### How to Use

- gunakan satu titik untuk satu observation;
- gunakan trend line hanya jika membantu;
- perhatikan cluster dan potential outlier;
- gunakan transparency jika titik sangat padat.

### Alternative

None

### Watch Out

Hubungan atau korelasi tidak otomatis menunjukkan sebab-akibat.

### Guide

`scatter-plot`

---

## `RULE-REL-BUBBLE`

### Recommended

**Bubble Chart**

### Why

Bubble Chart menambahkan nilai numerik ketiga melalui ukuran simbol pada hubungan dua variabel numerik.

### How to Use

- gunakan bubble size hanya untuk nilai yang meaningful;
- batasi range ukuran;
- gunakan transparency jika overlap;
- tetap prioritaskan posisi X dan Y sebagai encoding utama.

### Alternative

**Scatter Plot**

### Watch Out

Manusia lebih sulit membandingkan area bubble secara presisi dibanding posisi pada axis.

### Guide

`bubble-chart`

---

## `RULE-REL-STACKED`

### Recommended

**Stacked Bar Chart**

### Variant

**100% Stacked Bar Chart**

### Why

Untuk dua categorical variables dengan sedikit kombinasi, proporsi antar kelompok dapat dibandingkan secara compact.

### How to Use

- gunakan 100% stacked jika fokus pada proportion;
- pertahankan urutan segment;
- batasi jumlah warna;
- gunakan labels jika proporsi penting.

### Alternative

**Heatmap**

### Watch Out

Segment di tengah stacked bar lebih sulit dibandingkan secara presisi.

### Guide

`stacked-bar-chart`

---

## `RULE-REL-HEATMAP-CAT`

### Recommended

**Heatmap**

### Why

Heatmap lebih scalable ketika terdapat banyak kombinasi antara dua categorical variables.

### How to Use

- gunakan color scale yang jelas;
- sort rows/columns jika membantu menemukan pola;
- tampilkan labels hanya jika masih readable;
- gunakan tooltip jika implementasi interaktif tersedia.

### Alternative

**Stacked Bar Chart**

### Guide

`heatmap`

---

## `RULE-REL-HEATMAP`

### Recommended

**Heatmap**

### Variant

**Correlation Heatmap**

### Why

Correlation Heatmap membantu mengeksplorasi pola hubungan di antara banyak variabel numerik sekaligus.

### How to Use

- gunakan consistent diverging scale jika correlation mencakup negatif dan positif;
- pertahankan scale yang simetris;
- tampilkan correlation values jika masih readable;
- gunakan clustering/order hanya jika meaningful.

### Alternative

**Scatter Plot** untuk mengeksplorasi pasangan variabel tertentu.

### Watch Out

Correlation tidak membuktikan causation.

### Guide

`heatmap`

---

# 15. Composition

## `COM-01` — Part-to-Whole Validation

### Question

> **Apakah kategori yang kamu punya benar-benar merupakan bagian dari satu keseluruhan?**

### Helper

> Contoh: persentase sales setiap kategori dari total sales.

### Answers

#### `COM-WHOLE-YES`

Ya

→ `COM-02`

#### `COM-WHOLE-NO`

Tidak / tidak yakin

→ redirect `CMP-04`

---

## `COM-02` — Time Scope

### Question

> **Apakah komposisinya ingin dilihat pada satu periode atau berubah sepanjang waktu?**

### Answers

#### `COM-SINGLE`

Satu periode

→ `COM-04`

#### `COM-TIME`

Berubah sepanjang waktu

→ `COM-03`

---

## `COM-03` — Absolute vs Share

### Question

> **Apa yang ingin kamu lihat sepanjang waktu?**

### Answers

#### `COM-ABSOLUTE`

Nilai aktual setiap bagian sekaligus totalnya

→ `COM-06`

#### `COM-SHARE`

Persentase kontribusi setiap bagian terhadap total

→ `COM-07`

---

## `COM-04` — Part Count

### Question

> **Berapa banyak bagian yang membentuk keseluruhan?**

### Answers

#### `COM-PART-FEW`

Sedikit

Helper:

> Sekitar 2–5 bagian.

→ `COM-05`

#### `COM-PART-SEVERAL`

Beberapa

Helper:

> Sekitar 6–10 bagian.

→ `RULE-COM-BAR`

#### `COM-PART-MANY`

Banyak

Helper:

> Lebih dari 10 bagian.

→ `COM-08`

---

## `COM-05` — Contribution vs Precision

### Question

> **Apa yang lebih penting?**

### Answers

#### `COM-CONTRIBUTION`

Menunjukkan kontribusi setiap bagian terhadap total

→ `RULE-COM-DONUT`

#### `COM-PRECISION`

Membandingkan ukuran setiap bagian secara lebih presisi

→ `RULE-COM-BAR-PRECISE`

---

## `COM-06` — Absolute Time Density

### Question

> **Berapa banyak periode waktu yang ingin ditampilkan?**

### Answers

#### `COM-ABS-FEW`

Beberapa periode

→ `RULE-COM-STACKED`

#### `COM-ABS-MANY`

Banyak periode

→ `RULE-COM-AREA`

---

## `COM-07` — Share Time Density

### Question

> **Berapa banyak periode waktu yang ingin ditampilkan?**

### Answers

#### `COM-SHARE-FEW`

Beberapa periode

→ `RULE-COM-STACKED-100`

#### `COM-SHARE-MANY`

Banyak periode

→ `RULE-COM-AREA-100`

---

## `COM-08` — Hierarchy / Precision

### Question

> **Apa yang lebih penting untuk banyak kategori tersebut?**

### Answers

#### `COM-MANY-OVERVIEW`

Melihat gambaran kontribusi atau hierarchy

→ `RULE-COM-TREEMAP`

#### `COM-MANY-PRECISE`

Membandingkan nilai secara lebih presisi

→ `RULE-COM-BAR-MANY`

---

# 16. Composition Rules

## `RULE-COM-DONUT`

### Recommended

**Donut Chart**

### Why

Kamu memiliki sedikit bagian dan ingin menekankan kontribusi setiap bagian terhadap keseluruhan.

### How to Use

- batasi jumlah slices;
- urutkan slices secara meaningful;
- tampilkan percentage atau value jika diperlukan;
- gunakan warna dengan restraint.

### Alternative

**Pie Chart**

Secondary alternative:

**Bar Chart**

### Watch Out

Jika ukuran antarbagian sangat mirip dan precise comparison penting, Bar Chart lebih mudah dibaca.

### Guide

`donut-chart`

---

## `RULE-COM-BAR-PRECISE`

### Recommended

**Bar Chart**

### Why

Walaupun datamu merupakan part-to-whole, panjang bar lebih mudah dibandingkan secara presisi daripada sudut atau area.

### Alternative

**Donut Chart**

### Guide

`bar-chart`

---

## `RULE-COM-BAR`

### Recommended

**Bar Chart**

### Why

Jumlah bagian mulai cukup banyak sehingga perbandingan menggunakan panjang bar lebih mudah daripada Pie atau Donut.

### Alternative

**Treemap**

### Watch Out

Pie/Donut dengan banyak slices akan sulit dibaca dan dibandingkan.

### Guide

`bar-chart`

---

## `RULE-COM-BAR-MANY`

### Recommended

**Bar Chart**

### Variant

**Sorted Horizontal Bar Chart**

### Why

Untuk banyak bagian dengan kebutuhan precise comparison, Bar Chart memberikan baseline yang konsisten.

### How to Use

- sort berdasarkan contribution;
- gunakan horizontal layout;
- pertimbangkan Top N + Others;
- gunakan labels yang jelas.

### Alternative

**Treemap**

### Guide

`bar-chart`

---

## `RULE-COM-TREEMAP`

### Recommended

**Treemap**

### Why

Treemap dapat menunjukkan relative contribution dari banyak bagian dan sangat berguna ketika terdapat hierarchy.

### How to Use

- gunakan hierarchy yang meaningful;
- jangan menggunakan terlalu banyak level;
- gunakan labels hanya pada area yang cukup besar;
- gunakan warna untuk grouping atau meaningful metric, bukan dekorasi.

### Alternative

**Bar Chart**

### Watch Out

Treemap kurang cocok jika user perlu membandingkan nilai yang sangat mirip secara presisi.

### Guide

`treemap`

---

## `RULE-COM-STACKED`

### Recommended

**Stacked Bar Chart**

### Why

Kamu ingin melihat nilai aktual setiap bagian sekaligus perubahan total pada beberapa periode.

### How to Use

- pertahankan urutan segment;
- gunakan warna yang konsisten;
- batasi jumlah categories;
- tempatkan segment terpenting pada baseline jika memungkinkan.

### Alternative

**Area Chart**

### Watch Out

Segment yang tidak memiliki baseline yang sama lebih sulit dibandingkan antarperiode.

### Guide

`stacked-bar-chart`

---

## `RULE-COM-STACKED-100`

### Recommended

**Stacked Bar Chart**

### Variant

**100% Stacked Bar Chart**

### Why

Kamu ingin melihat bagaimana persentase kontribusi setiap bagian berubah antarperiode.

### How to Use

- setiap bar harus merepresentasikan 100%;
- pertahankan segment order;
- gunakan percentage labels jika membantu;
- batasi jumlah categories.

### Alternative

**Area Chart**

### Watch Out

100% stacked chart menyembunyikan perubahan pada total absolute value.

### Guide

`stacked-bar-chart`

---

## `RULE-COM-AREA`

### Recommended

**Area Chart**

### Variant

**Stacked Area Chart**

### Why

Kamu ingin menunjukkan perubahan nilai aktual dari beberapa bagian sekaligus totalnya pada banyak titik waktu.

### How to Use

- gunakan chronological axis;
- batasi jumlah layers;
- pertahankan layer order;
- gunakan Line Chart jika individual trend lebih penting daripada composition.

### Alternative

**Stacked Bar Chart**

### Watch Out

Terlalu banyak layers membuat pola individual sulit diikuti.

### Guide

`area-chart`

---

## `RULE-COM-AREA-100`

### Recommended

**Area Chart**

### Variant

**100% Stacked Area Chart**

### Why

Kamu ingin melihat bagaimana share setiap bagian terhadap total berubah sepanjang banyak titik waktu.

### How to Use

- normalize setiap periode menjadi 100%;
- pertahankan layer order;
- batasi jumlah categories;
- gunakan clear legend atau direct labels.

### Alternative

**Stacked Bar Chart**

### Watch Out

Chart ini menunjukkan perubahan share, bukan perubahan absolute total.

### Guide

`area-chart`

---

# 17. Cross-Intent Redirect Rules

Redirect tidak boleh menghapus seluruh state.

Hanya jawaban downstream yang tidak lagi relevan yang dibuang.

## `REDIRECT-REL-CMP`

From:

`REL-03 → REL-NUMCAT-COMPARE`

To:

`CMP-04`

Preserve:

- numeric + category context.

---

## `REDIRECT-REL-DST`

From:

`REL-03 → REL-NUMCAT-DISTRIBUTION`

To:

`RULE-DST-BOX-GROUP`

---

## `REDIRECT-TRD-COM`

From:

`TRD-06 → TRD-SHARE-YES`

To:

`COM-03`

Preserve:

- over-time context.

Do not ask `COM-02` again.

---

## `REDIRECT-COM-CMP`

From:

`COM-01 → COM-WHOLE-NO`

To:

`CMP-04`

---

# 18. Recommendation Object

Rule engine sebaiknya menghasilkan normalized recommendation object.

Conceptual structure:

```json
{
  "ruleId": "RULE-CMP-BAR-MANY",
  "intent": "comparison",
  "recommended": {
    "chartId": "bar-chart",
    "name": "Bar Chart",
    "variant": "Horizontal Bar Chart"
  },
  "why": "...",
  "tips": [
    "...",
    "...",
    "..."
  ],
  "alternative": {
    "chartId": "dot-plot",
    "name": "Dot Plot"
  },
  "watchOut": "...",
  "guide": "/chart/chart.html?id=bar-chart"
}
```

Exact schema dapat disesuaikan dengan existing repository architecture.

---

# 19. Chart Guide Mapping

| Recommendation    | Guide ID            |
| ----------------- | ------------------- |
| Bar Chart         | `bar-chart`         |
| Line Chart        | `line-chart`        |
| Slope Chart       | `slope-chart`       |
| Bullet Chart      | `bullet-chart`      |
| Waterfall Chart   | `waterfall-chart`   |
| Pie Chart         | `pie-chart`         |
| Donut Chart       | `donut-chart`       |
| Stacked Bar Chart | `stacked-bar-chart` |
| Treemap           | `treemap`           |
| Area Chart        | `area-chart`        |
| Histogram         | `histogram`         |
| Box Plot          | `box-plot`          |
| Dot Plot          | `dot-plot`          |
| Scatter Plot      | `scatter-plot`      |
| Bubble Chart      | `bubble-chart`      |
| Heatmap           | `heatmap`           |
| Map               | `map`               |

IDs harus diverifikasi terhadap existing Chart Guide implementation sebelum coding.

---

# 20. Non-Chart Results

V1 mengizinkan dua non-chart recommendations.

## KPI / Big Number

Digunakan ketika:

- hanya satu nilai utama;
- hanya dua periode;
- analytical goal adalah menunjukkan current value + change.

Tidak memiliki Chart Guide destination pada V1.

## Separate Views

Digunakan ketika:

- multiple measures memiliki unit/skala berbeda;
- menggabungkannya dalam satu visual berpotensi misleading.

Tidak memiliki Chart Guide destination pada V1.

---

# 21. Global Recommendation Principles

Rule engine dan recommendation copy harus mengikuti prinsip berikut.

### Prefer simple charts

Jika dua chart sama-sama valid, prioritaskan chart yang lebih mudah dibaca.

### Precision matters

Jika precise comparison merupakan goal utama, prioritaskan position/length encoding seperti Bar atau Dot dibanding angle/area.

### Geography requires spatial relevance

Kolom lokasi saja tidak cukup untuk merekomendasikan Map.

### Time does not automatically mean Line

Jumlah periode dan analytical goal tetap diperhitungkan.

### Part-to-whole must be real

Pie, Donut, Treemap, dan stacked composition tidak boleh direkomendasikan hanya karena nilai dapat dijumlahkan.

### Correlation is not causation

Relationship results harus menghindari causal interpretation.

### Outlier is not error

Distribution results tidak boleh menganggap potential outlier otomatis sebagai bad data.

### Fewer colors by default

Jangan merekomendasikan satu warna berbeda untuk setiap kategori tanpa analytical reason.

---

# 22. Question Design Principles

Pertanyaan harus:

- menggunakan Bahasa Indonesia;
- singkat;
- menjelaskan istilah teknis melalui contoh;
- tidak membutuhkan statistical knowledge;
- hanya muncul jika memengaruhi recommendation;
- tidak meminta informasi yang sudah dapat disimpulkan dari jawaban sebelumnya.

Hindari:

> Apakah variabelmu additive?

Gunakan:

> Apakah kamu ingin menunjukkan bagaimana beberapa kenaikan dan penurunan menghasilkan nilai akhir?

Hindari:

> What is the cardinality?

Gunakan:

> Berapa banyak kategori yang ingin dibandingkan?

---

# 23. Back Navigation

Jika user kembali dan mengganti jawaban:

1. retain answers sebelum question yang diubah;
2. remove changed answer;
3. remove all downstream answers;
4. evaluate decision tree kembali;
5. tampilkan branch baru.

Recommendation lama tidak boleh dipertahankan jika sudah tidak valid.

---

# 24. Restart

`Start Over`:

- clear selected intent;
- clear answers;
- clear recommendation;
- return to `ROOT-01`.

Tidak membutuhkan confirmation dialog.

---

# 25. Fallback Rule

Setiap reachable branch harus memiliki terminal recommendation.

Jika runtime tidak menemukan rule:

- jangan memilih chart default;
- tampilkan fallback state;
- tawarkan `Start Over`;
- log internal/debug event jika tersedia.

Suggested fallback copy:

> **Belum menemukan rekomendasi yang cocok.**\
> Coba mulai lagi dan pilih jawaban yang paling mendekati kebutuhanmu.

---

# 26. V1 Exclusions

Decision tree V1 tidak merekomendasikan secara langsung:

- Violin Plot;
- Hexbin Plot;
- Dumbbell Plot;
- Sankey Diagram;
- Sunburst;
- Funnel Chart;
- Radar Chart;
- Gauge Chart;
- Network Diagram;
- Streamgraph;
- Connected Scatter Plot;
- advanced geographic maps.

Advanced techniques seperti Small Multiples boleh disebut sebagai alternative/advice tanpa menjadi Chart Guide destination.

---

# 27. QA Scenarios

Implementation harus diuji minimal terhadap scenario berikut.

| Scenario                               | Expected               |
| -------------------------------------- | ---------------------- |
| Sales across 5 products                | Bar Chart              |
| Sales across 30 outlets                | Horizontal Bar variant |
| Actual vs Target                       | Bullet Chart           |
| Profit bridge                          | Waterfall Chart        |
| Sales pattern across provinces         | Map — Choropleth       |
| Outlet locations                       | Map — Point/Symbol     |
| Revenue 2025 vs 2026 across categories | Slope Chart            |
| Monthly revenue for 3 years            | Line Chart             |
| Volume over many time periods          | Area Chart             |
| Transaction value shape                | Histogram              |
| Outliers in delivery time              | Box Plot               |
| Distribution across regions            | Box Plot               |
| Ad Spend vs Sales                      | Scatter Plot           |
| Ad Spend vs Sales + Profit             | Bubble Chart           |
| Many numeric correlations              | Heatmap                |
| Membership vs Churn proportions        | 100% Stacked Bar       |
| 4-part market share                    | Donut Chart            |
| 8-part market share                    | Bar Chart              |
| Hierarchical product contribution      | Treemap                |
| Product composition across quarters    | Stacked Bar            |
| Market share across many months        | 100% Stacked Area      |
| Single KPI 2025 vs 2026                | KPI / Big Number       |
| Revenue + Margin with different units  | Separate Views         |

---

# 28. Definition of Done

Decision tree implementation dianggap sesuai specification ketika:

- semua root intents reachable;
- semua defined question IDs reachable;
- semua reachable branches memiliki terminal rule atau redirect;
- tidak ada dead-end;
- cross-intent redirects mempertahankan relevant state;
- recommendation sesuai QA scenarios;
- all Chart Guide mappings valid;
- Map tersedia di Chart Guide;
- no advanced V2 chart menjadi mandatory dependency;
- user normal dapat mencapai recommendation dalam sekitar 2–5 questions;
- changing previous answers correctly invalidates downstream state.

---

# 29. Principle

Decision tree tidak dibuat untuk menunjukkan seberapa banyak jenis chart yang diketahui BikinDashboard.

Decision tree dibuat untuk membantu user menjawab:

> **“Dengan pertanyaan yang ingin saya jawab, visualisasi apa yang paling membantu?”**

Jika visual yang lebih sederhana dapat menjawab pertanyaan dengan lebih jelas, pilih visual yang lebih sederhana.
