# Product Requirements Document

## BikinDashboard — Chart Recommender

**Status:** Draft V1\
**Product:** BikinDashboard\
**Feature:** Chart Recommender\
**Related Feature:** Chart Guide\
**Logic Specification:** `DECISION_TREE.md`\
**Design Specification:** `DESIGN.md`

---

# 1. Overview

Chart Recommender adalah tool interaktif di BikinDashboard yang membantu pengguna menentukan visualisasi yang sesuai berdasarkan tujuan analisis mereka.

Berbeda dengan Chart Guide yang bersifat **chart-first** — pengguna memilih sebuah chart lalu mempelajari kapan dan bagaimana chart tersebut digunakan — Chart Recommender bersifat **problem-first**.

Pengguna memulai dari pertanyaan:

> **Apa yang ingin kamu tunjukkan dengan datamu?**

Tool kemudian memberikan beberapa pertanyaan conditional berdasarkan jawaban sebelumnya hingga menghasilkan rekomendasi chart.

Chart Recommender menggunakan **deterministic rule-based decision tree**, bukan AI.

---

# 2. Problem

Memilih chart merupakan salah satu kesulitan umum ketika membuat analisis atau dashboard.

Pengguna sering mengetahui data yang dimiliki tetapi belum mengetahui visualisasi yang sesuai.

Beberapa pola kesalahan yang umum antara lain:

- menggunakan Pie Chart untuk terlalu banyak kategori;
- menggunakan Line Chart hanya karena terdapat kolom tanggal;
- menggunakan Map hanya karena terdapat kolom lokasi;
- menggunakan Dual Axis untuk measure dengan unit berbeda;
- menggunakan chart yang terlalu kompleks untuk pertanyaan sederhana;
- menggunakan visualisasi ketika KPI atau tabel sebenarnya lebih efektif;
- memilih chart berdasarkan tampilan, bukan analytical intent.

Chart Guide membantu pengguna memahami chart tertentu, tetapi mengasumsikan pengguna sudah mengetahui chart yang ingin dipelajari.

Diperlukan layer sebelum Chart Guide yang membantu menjawab:

> **“Saya punya pertanyaan/data seperti ini. Sebaiknya pakai chart apa?”**

---

# 3. Product Relationship

Chart Recommender dan Chart Guide memiliki fungsi berbeda tetapi saling melengkapi.

### Chart Recommender

**Problem-first**

User:

> Saya harus menggunakan chart apa?

Flow:

`Analytical Intent → Conditional Questions → Recommendation`

### Chart Guide

**Chart-first**

User:

> Bar Chart cocok digunakan untuk apa?

Flow:

`Chart → Explanation → Use Cases → Best Practices`

### Product Flow

`User Question → Chart Recommender → Recommended Chart → Chart Guide`

Chart Recommender harus menggunakan Chart Guide sebagai destination untuk pembelajaran lebih lanjut.

---

# 4. Goals

V1 bertujuan untuk:

1. membantu pengguna memilih chart berdasarkan analytical intent;
2. membuat proses pemilihan chart mudah dipahami oleh pengguna pemula;
3. memberikan recommendation dalam sekitar 2–5 pertanyaan conditional;
4. menjelaskan alasan sebuah chart direkomendasikan;
5. memberikan practical guidance tentang cara menggunakan chart tersebut;
6. memperingatkan pengguna terhadap common visualization mistakes;
7. menghubungkan Chart Recommender dengan existing Chart Guide;
8. mengajarkan cara berpikir tentang visualisasi tanpa mengharuskan pengguna memahami terminology teknis terlebih dahulu.

---

# 5. Non-Goals

V1 tidak bertujuan untuk:

- menggunakan AI/LLM;
- membaca dataset secara otomatis;
- menerima upload CSV/XLSX;
- membuat chart secara otomatis;
- membuat dashboard;
- menghasilkan visualization code;
- menggantikan Chart Guide;
- memberikan puluhan chart niche atau advanced;
- melakukan statistical analysis;
- menilai kualitas dashboard;
- memberikan arbitrary visualization score.

Fitur berbasis dataset dapat dipertimbangkan sebagai produk terpisah di masa depan.

---

# 6. Target Users

## Primary

### Beginner Data Analyst

Pengguna memahami dasar analisis data tetapi masih kesulitan memilih chart.

### Dashboard Builder

Pengguna Tableau, Power BI, Looker Studio, Excel, atau tools serupa yang membutuhkan guidance saat memilih visualisasi.

### Student / Learner

Pengguna yang sedang mempelajari data visualization dan membutuhkan decision aid yang lebih praktis dibanding membaca teori chart satu per satu.

## Secondary

- business analyst;
- reporting analyst;
- data enthusiast;
- content creator yang membuat data visualization;
- pengguna spreadsheet yang membuat report sederhana.

---

# 7. Core Product Principle

Chart Recommender harus membantu pengguna memahami:

> **Chart dipilih berdasarkan pertanyaan yang ingin dijawab, bukan sekadar tipe data yang tersedia.**

Contoh:

Memiliki data provinsi tidak otomatis berarti harus menggunakan Map.

Jika pertanyaannya:

> Provinsi mana yang memiliki sales tertinggi?

Bar Chart dapat lebih sesuai.

Jika pertanyaannya:

> Bagaimana pola sales tersebar secara geografis?

Map lebih sesuai.

---

# 8. Analytical Intents

V1 menggunakan lima root analytical intents.

## 8.1 Comparison

**Membandingkan nilai antar kategori, target, atau periode.**

Contoh:

- Sales antar outlet
- Actual vs Target
- Revenue 2025 vs 2026
- Faktor yang menyebabkan perubahan profit

## 8.2 Trend

**Melihat perubahan dari waktu ke waktu.**

Contoh:

- Monthly Revenue
- Daily Active Users
- Sales trend selama tiga tahun

## 8.3 Distribution

**Melihat bagaimana nilai tersebar.**

Contoh:

- Distribusi transaction value
- Spread delivery time
- Outlier pada customer spending

## 8.4 Relationship

**Melihat hubungan antar variabel.**

Contoh:

- Advertising Spend vs Sales
- Discount vs Profit
- Correlation antar beberapa metrics

## 8.5 Composition

**Melihat bagaimana beberapa bagian membentuk suatu keseluruhan.**

Contoh:

- Sales contribution by category
- Market share
- Product mix
- Composition changes over time

---

# 9. Language Strategy

Chart Recommender menggunakan pendekatan hybrid.

### Concept and chart names

Gunakan terminology industri dalam bahasa Inggris.

Contoh:

- Comparison
- Trend
- Distribution
- Relationship
- Composition
- Bar Chart
- Scatter Plot
- Histogram

### Questions and explanations

Gunakan Bahasa Indonesia yang mudah dipahami.

Hindari terminology teknis sebagai requirement untuk menggunakan tool.

Contoh:

Daripada:

> How many measures do you have?

Gunakan:

> Berapa nilai (measure) yang ingin dibandingkan?

Dengan pilihan:

> Satu — contoh: Sales

> Lebih dari satu — contoh: Sales dan Profit

Technical terminology dapat diperkenalkan secara contextual sehingga tool sekaligus memiliki educational value.

---

# 10. Recommendation Engine

Chart Recommender menggunakan deterministic decision tree.

Tidak ada AI inference dalam V1.

High-level flow:

`Intent → Conditional Questions → Base Recommendation → Modifiers → Final Recommendation`

Pertanyaan berikutnya hanya ditampilkan jika relevan berdasarkan jawaban sebelumnya.

User tidak perlu menjawab seluruh pertanyaan yang tersedia di decision tree.

Target:

> Sebagian besar recommendation dapat dicapai dalam sekitar 2–5 pertanyaan.

Detail lengkap recommendation rules didefinisikan dalam:

`DECISION_TREE.md`

---

# 11. Cross-Intent Redirect

User tidak harus memilih analytical intent dengan sempurna pada pertanyaan pertama.

Decision engine dapat memindahkan user ke branch lain jika jawaban menunjukkan intent yang berbeda.

Contoh:

`Relationship → Numeric + Category → Compare Average Values → Comparison`

Contoh lain:

`Trend → Share of Total Over Time → Composition`

Contoh:

`Composition → Categories Are Not Parts of a Whole → Comparison`

Redirect harus mempertahankan state yang masih relevan sehingga pengguna tidak perlu mengulang wizard dari awal.

---

# 12. Geography Modifier

Geography bukan root analytical intent pada V1.

Geography digunakan sebagai contextual modifier ketika posisi geografis merupakan bagian penting dari insight.

Contoh:

`Comparison → Categories → Geography Matters → Map`

Map tidak direkomendasikan hanya karena dataset memiliki nama kota, provinsi, negara, atau koordinat.

### Geographic Data Types

#### Administrative Region

Contoh:

- province;
- city;
- district;
- country.

Recommended visualization:

**Choropleth Map**

#### Individual Location

Contoh:

- store;
- branch;
- facility;
- latitude/longitude points.

Recommended visualization:

**Point / Symbol Map**

Keduanya menggunakan satu Chart Guide entry:

**Map**

---

# 13. Chart Vocabulary V1

Recommendation engine menggunakan chart vocabulary yang selaras dengan Chart Guide.

V1 mencakup:

1. Bar Chart
2. Line Chart
3. Slope Chart
4. Bullet Chart
5. Waterfall Chart
6. Pie Chart
7. Donut Chart
8. Stacked Bar Chart
9. Treemap
10. Area Chart
11. Histogram
12. Box Plot
13. Dot Plot
14. Scatter Plot
15. Bubble Chart
16. Heatmap
17. Map

Chart variants tidak harus menjadi Chart Guide entry terpisah.

Contoh:

- Horizontal Bar → Bar Chart
- Grouped Bar → Bar Chart
- Multi-Line → Line Chart
- Correlation Heatmap → Heatmap
- 100% Stacked Bar → Stacked Bar Chart
- Stacked Area → Area Chart

Recommendation result dapat memberikan instruction tentang variant yang sesuai.

---

# 14. Waterfall Chart

Waterfall Chart harus tersedia sebagai recommendation untuk kasus contribution-to-change.

Contoh pertanyaan:

> Apakah kamu ingin menunjukkan bagaimana beberapa kenaikan dan penurunan menghasilkan nilai akhir?

Contoh use case:

- Revenue → costs → profit;
- budget variance;
- headcount changes;
- bridge analysis;
- changes between starting and ending value.

Flow:

`Comparison → Contribution to Change → Waterfall Chart`

---

# 15. Map Addition to Chart Guide

Existing Chart Guide perlu ditambahkan satu entry baru:

## Map

Purpose:

> Menampilkan pola geografis ketika lokasi merupakan bagian penting dari insight.

Chart Guide Map minimal menjelaskan:

- kapan menggunakan Map;
- kapan tidak menggunakan Map;
- Choropleth Map;
- Point / Symbol Map;
- geographic encoding;
- color considerations;
- common mistakes.

Key guidance:

> Memiliki data lokasi tidak otomatis berarti Map merupakan visualisasi terbaik.

Jika tujuan utama adalah ranking atau precise comparison antarwilayah, Bar Chart dapat lebih sesuai.

---

# 16. Chart Guide Taxonomy

Chart Guide perlu diselaraskan dengan analytical intents yang digunakan Chart Recommender.

Recommended filter taxonomy:

- Semua
- Perbandingan
- Tren
- Sebaran
- Hubungan
- Komposisi
- Geografis

Satu chart dapat memiliki lebih dari satu intent/tag.

Contoh:

- Slope Chart → Perbandingan, Tren
- Area Chart → Tren, Komposisi
- Bar Chart → Perbandingan
- Heatmap → Hubungan
- Map → Geografis

Taxonomy tidak harus memaksa setiap chart memiliki hanya satu kategori.

---

# 17. Wizard UX

## Entry State

User melihat pertanyaan:

> **Apa yang ingin kamu tunjukkan dengan datamu?**

Lima pilihan ditampilkan dengan short helper.

Example:

### Comparison

Membandingkan nilai antar kategori, target, atau periode.

### Trend

Melihat perubahan dari waktu ke waktu.

### Distribution

Melihat bagaimana nilai tersebar.

### Relationship

Melihat hubungan antar variabel.

### Composition

Melihat bagian dari suatu keseluruhan.

---

# 18. Conditional Questions

Setelah intent dipilih, hanya pertanyaan yang relevan yang ditampilkan.

Contoh:

`Comparison → Actual vs Target → Bullet Chart`

Tidak perlu menanyakan:

- jumlah kategori;
- jumlah periode;
- geographic importance;

jika jawaban tersebut tidak lagi memengaruhi recommendation.

Wizard harus meminimalkan unnecessary questions.

---

# 19. Recommendation Result

Setiap result minimal memiliki struktur:

## Recommended

Nama chart yang direkomendasikan.

## Why This Works

Penjelasan singkat berdasarkan jawaban pengguna.

Bukan generic chart description.

Contoh:

> Kamu membandingkan satu nilai pada banyak kategori. Bar Chart horizontal membuat label kategori lebih mudah dibaca dan ranking lebih mudah terlihat.

## How to Use It

2–4 contextual tips.

Contoh:

- urutkan dari terbesar ke terkecil;
- gunakan orientasi horizontal;
- mulai value axis dari zero;
- highlight hanya kategori penting.

## Alternative

Optional.

Hanya tampilkan jika terdapat alternatif yang meaningful.

## Watch Out

Optional dan contextual.

Contoh:

> Pie Chart akan sulit dibandingkan jika terdapat banyak kategori.

atau:

> Titik di luar whisker pada Box Plot merupakan potential outlier dan tidak otomatis berarti data salah.

atau:

> Correlation tidak menunjukkan causation.

## Learn More

CTA:

> **Open Bar Chart Guide →**

CTA membuka halaman corresponding Chart Guide.

---

# 20. Result Philosophy

Result tidak boleh sekadar mengatakan:

> Use Bar Chart.

Recommendation harus menjawab:

1. chart apa;
2. kenapa;
3. bagaimana menggunakannya;
4. apa yang perlu diwaspadai;
5. di mana pengguna dapat mempelajarinya lebih lanjut.

---

# 21. Non-Chart Recommendations

Decision engine boleh memberikan guidance bahwa chart tidak selalu diperlukan.

Contoh:

Jika user hanya ingin menampilkan satu nilai utama dan perubahan terhadap periode sebelumnya:

> KPI / Big Number may be more effective than a chart.

Karena KPI/Big Number belum menjadi Chart Guide entry V1, recommendation tersebut tidak wajib memiliki Chart Guide CTA.

Namun penggunaan non-chart recommendation harus terbatas pada kasus yang jelas.

---

# 22. Navigation

Chart Recommender ditempatkan di:

**TOOLS**

Recommended sidebar:

`TOOLS`

- Color Palette
- Chart Guide
- **Chart Recommender**
- Data Quality Checker

Chart Guide dan Chart Recommender harus memiliki cross-link.

Chart Guide:

> Tidak yakin chart mana yang digunakan?\
> **Try Chart Recommender →**

Chart Recommender result:

> **Open [Chart] Guide →**

---

# 23. URL / Routing

Recommended route:

`/chart-recommender/`

Alternative acceptable route jika existing architecture Chart Guide lebih cocok:

`/chart/recommender/`

Preferred:

`/chart-recommender/`

karena Chart Recommender merupakan standalone tool, bukan halaman detail Chart Guide.

Existing Chart Guide routes tidak boleh rusak.

---

# 24. State Management

V1 tidak membutuhkan backend.

Wizard state dapat disimpan sepenuhnya di browser.

Minimum state:

- selected intent;
- answers;
- active question;
- recommendation result.

User harus dapat:

- kembali ke pertanyaan sebelumnya;
- mengubah jawaban;
- restart wizard.

Recommendation harus diperbarui berdasarkan state terbaru.

---

# 25. Rule Architecture

Recommendation logic tidak boleh tersebar sebagai banyak hardcoded conditional di UI.

Rules harus dipisahkan dari presentation layer.

Preferred conceptual structure:

`UI → Wizard State → Rule Engine → Recommendation Object → Result UI`

Rule definitions dapat menggunakan JavaScript object atau JSON-like configuration.

Example conceptual output:

```json
{
  "ruleId": "CMP-BENCHMARK-01",
  "recommended": "bullet-chart",
  "alternative": "bar-chart",
  "guide": "/chart/chart.html?id=bullet-chart"
}
```

Exact implementation ditentukan setelah repository audit.

---

# 26. Decision Tree Specification

Detailed recommendation logic tidak didefinisikan penuh di PRD.

Dokumen terpisah:

`DECISION_TREE.md`

harus menjadi source of truth untuk:

- rule IDs;
- questions;
- answer options;
- branching;
- cross-intent redirects;
- modifiers;
- recommended charts;
- alternatives;
- contextual tips;
- watch-outs;
- Chart Guide mapping.

PRD tetap menjadi parent product specification.

---

# 27. Analytics

Chart Recommender harus memiliki privacy-safe analytics.

Recommended events:

### recommender_started

Properties:

- entry_source

### recommender_intent_selected

Properties:

- intent

### recommender_question_answered

Properties:

- question_id
- answer_id

### recommender_completed

Properties:

- intent
- rule_id
- recommended_chart
- question_count

### recommender_restarted

Properties:

- previous_intent
- previous_rule_id if available

### recommender_guide_opened

Properties:

- recommended_chart
- rule_id

Tidak perlu mengirim free-text atau user data karena V1 tidak menggunakan free-text input.

---

# 28. Success Metrics

Primary:

- recommender completion rate;
- Chart Guide click-through rate after recommendation.

Secondary:

- recommender starts;
- intent distribution;
- recommended chart distribution;
- average question count;
- restart rate;
- cross-intent redirect frequency;
- repeat usage.

Useful funnel:

`Chart Recommender View → Start → Intent Selected → Recommendation Completed → Chart Guide Opened`

---

# 29. Privacy

V1 tidak membutuhkan dataset upload atau personal information.

Semua recommendation dapat diproses client-side.

Tidak ada jawaban user yang perlu dikirim ke backend selain anonymous analytics events jika analytics aktif.

---

# 30. Accessibility

Wizard harus:

- dapat digunakan dengan keyboard;
- memiliki visible focus state;
- tidak mengandalkan warna sebagai satu-satunya indicator;
- memiliki semantic button/radio behavior;
- memiliki readable contrast;
- memiliki descriptive labels;
- mendukung responsive layout;
- tidak menggunakan tiny interaction targets.

---

# 31. Responsive Requirements

## Desktop

Wizard dapat menggunakan centered content area dengan pilihan yang mudah discan.

## Mobile

- pilihan menjadi stacked;
- tidak ada horizontal overflow;
- result tetap mudah dibaca;
- CTA memiliki adequate touch target;
- sidebar/navigation mengikuti existing responsive navigation BikinDashboard.

Logic dan content tidak boleh berbeda antara desktop dan mobile.

---

# 32. Visual Direction

Chart Recommender harus mengikuti existing visual language BikinDashboard.

Direction:

- clean;
- white/light;
- content-first;
- practical;
- restrained;
- professional;
- minimal decoration.

Avoid:

- giant gradient hero;
- glassmorphism;
- excessive cards;
- fake statistics;
- decorative charts tanpa fungsi;
- gamification;
- AI-style glowing UI;
- unnecessary illustrations;
- excessive animation.

Detailed visual specification didefinisikan di `DESIGN.md`.

---

# 33. Empty / Initial State

Initial state tidak menampilkan recommendation.

User harus memilih analytical intent terlebih dahulu.

Tidak perlu sample recommendation besar yang dapat mengalihkan perhatian dari primary action.

Optional small example:

> Tidak yakin? Pilih tujuan yang paling mendekati. Kamu bisa kembali kapan saja.

---

# 34. Back and Restart Behavior

User harus dapat:

### Back

Kembali satu step tanpa kehilangan previous valid answers.

Jika jawaban sebelumnya diubah, downstream answers yang sudah tidak relevan harus dibuang.

### Start Over

Menghapus wizard state dan kembali ke intent selection.

Tidak perlu confirmation dialog.

---

# 35. Error Handling

Karena V1 tidak membutuhkan network request untuk recommendation, error state harus minimal.

Jika sebuah rule tidak menghasilkan recommendation akibat implementation issue:

- jangan menampilkan blank page;
- tampilkan fallback message;
- berikan option untuk restart;
- log analytics/debug event jika tersedia.

Tidak boleh silently memilih random/default chart.

---

# 36. Performance

V1 harus:

- berjalan client-side;
- tidak membutuhkan heavy visualization library hanya untuk wizard;
- tidak membutuhkan AI/API call;
- load cepat;
- menggunakan existing shared assets jika memungkinkan.

Chart preview tidak menjadi requirement V1.

---

# 37. SEO

Page harus memiliki descriptive title dan metadata.

Suggested title:

> Chart Recommender — Pilih Chart yang Tepat | BikinDashboard

Suggested description:

> Bingung memilih chart? Jawab beberapa pertanyaan sederhana dan temukan visualisasi yang sesuai dengan tujuan analisismu.

Chart Recommender dapat menjadi entry page dari search dan internal navigation.

---

# 38. V1 Acceptance Criteria

V1 dianggap selesai ketika:

1. Chart Recommender tersedia melalui navigation BikinDashboard.
2. User dapat memilih salah satu dari lima analytical intents.
3. Pertanyaan berikutnya berubah secara conditional berdasarkan jawaban.
4. Mayoritas path selesai dalam sekitar 2–5 pertanyaan.
5. Comparison mendukung:
   - category comparison;
   - target/benchmark;
   - two-period comparison;
   - contribution-to-change;
   - geographic comparison.
6. Trend mendukung:
   - two periods;
   - few periods;
   - many periods;
   - single/multiple series.
7. Distribution mendukung:
   - categorical frequency;
   - distribution shape;
   - spread/outlier;
   - group comparison.
8. Relationship mendukung:
   - two numeric variables;
   - third numeric variable;
   - numeric + categorical;
   - categorical + categorical;
   - multiple numeric variables.
9. Composition mendukung:
   - part-to-whole validation;
   - single-period composition;
   - composition over time;
   - absolute vs percentage composition.
10. Cross-intent redirect bekerja tanpa restart.
11. Waterfall Chart dapat direkomendasikan untuk contribution-to-change.
12. Map dapat direkomendasikan ketika geography matters.
13. Recommendation menampilkan:

- Recommended;
- Why This Works;
- How to Use It;
- Alternative jika relevan;
- Watch Out jika relevan;
- Chart Guide CTA jika tersedia.

14. Back dan Start Over berfungsi.
15. Changing an earlier answer removes invalid downstream state.
16. Existing Chart Guide routes tetap bekerja.
17. Map ditambahkan ke Chart Guide.
18. Chart Guide taxonomy diperbarui untuk mendukung Trend dan Geography.
19. Existing chart content tidak rusak.
20. Analytics events berjalan tanpa mengirim personal/free-text data.
21. Desktop dan mobile layout usable.
22. Tidak ada AI/API/backend dependency untuk recommendation.

---

# 39. Future Considerations

Tidak termasuk V1:

- dataset upload → automatic chart recommendation;
- automatic data type detection;
- chart preview generator;
- visualization code generation;
- Power BI/Tableau implementation examples;
- user-created recommendation links;
- saved recommendation history;
- AI explanation;
- advanced visualization vocabulary;
- Violin Plot;
- Hexbin Plot;
- Dumbbell Plot;
- Sankey Diagram;
- Sunburst;
- Funnel;
- network visualization;
- advanced geographic visualization;
- dashboard-level recommendation.

Future features harus ditambahkan hanya jika meningkatkan analytical decision making, bukan sekadar memperbesar jumlah chart.

---

# 40. Related Documents

## `DECISION_TREE.md`

Detailed functional specification untuk recommendation engine.

Berisi:

- rule IDs;
- conditional questions;
- answer IDs;
- branch transitions;
- redirects;
- modifiers;
- recommendation mappings;
- alternatives;
- tips;
- warnings;
- Chart Guide destinations.

## `DESIGN.md`

UI/UX specification.

Berisi:

- page structure;
- wizard layout;
- question components;
- result layout;
- interaction states;
- mobile behavior;
- visual hierarchy;
- Chart Guide integration.

---

# 41. Product Principle

Chart Recommender tidak bertujuan membuat keputusan visualisasi terlihat kompleks.

Tujuannya justru menyederhanakan cara berpikir:

> **Mulai dari pertanyaan yang ingin dijawab, lalu pilih visualisasi yang membantu menjawabnya.**

Chart Recommender membantu memilih.

Chart Guide membantu memahami.

Keduanya harus terasa sebagai satu workflow BikinDashboard.
