# Chart Recommender — Design Specification

**Product:** BikinDashboard\
**Feature:** Chart Recommender\
**Version:** V1\
**Parent Specification:** `PRD.md`\
**Logic Specification:** `DECISION_TREE.md`

---

# 0. Parent Design Inheritance

Chart Recommender adalah bagian dari existing BikinDashboard product dan **harus mewarisi existing BikinDashboard design system dan shared UI patterns**.

Dokumen ini bukan design system baru.

Jika terdapat perbedaan antara contoh visual dalam dokumen ini dengan pattern yang sudah digunakan BikinDashboard, implementation harus memprioritaskan existing parent design selama tidak bertentangan dengan functional requirement Chart Recommender.

Wajib inherit dan reuse jika sudah tersedia:

- typography dan font family;
- color palette dan design tokens;
- spacing scale;
- page background;
- content width dan container behavior;
- sidebar structure;
- desktop dan mobile navigation;
- section labels;
- button dan link styles;
- border color dan radius;
- card/surface treatment;
- form/interactive states;
- hover dan focus behavior;
- responsive breakpoints;
- accessibility conventions;
- footer;
- analytics/loading conventions yang relevan.

Existing shared assets seperti `assets/nav.js`, `assets/nav.css`, `assets/tokens.css`, dan reusable styles/components lain harus menjadi source of truth sebelum membuat style baru.

**Do not:**

- membuat visual identity baru khusus Chart Recommender;
- mengganti global typography;
- membuat duplicate design tokens;
- membuat sidebar/navigation baru;
- memperkenalkan button style baru jika existing style sudah memenuhi kebutuhan;
- mengubah global component hanya agar cocok dengan mockup di dokumen ini;
- membuat halaman terasa seperti microsite yang terpisah dari BikinDashboard.

Semua wireframe dan visual example dalam dokumen ini bersifat **structural guidance**, bukan pixel-perfect specification.

Urutan prioritas implementasi:

1. existing BikinDashboard design system;
2. existing shared components dan page patterns;
3. requirements spesifik dalam `DESIGN.md`;
4. wireframe/example dalam dokumen ini.

Tujuan akhirnya:

> **Chart Recommender harus terasa seperti fitur yang sejak awal memang merupakan bagian dari BikinDashboard, bukan tool terpisah yang ditempelkan ke dalam website.**

---

# 1. Design Goal

Chart Recommender harus membuat proses memilih chart terasa sederhana.

Walaupun recommendation engine memiliki banyak branch dan rules, user tidak boleh merasa sedang mengisi decision tree yang kompleks.

Core experience:

> **Satu pertanyaan. Beberapa pilihan. Lanjut. Dapat rekomendasi.**

Design harus mengutamakan:

- clarity;
- focus;
- progressive disclosure;
- low cognitive load;
- fast completion;
- educational value tanpa terasa seperti membaca textbook.

---

# 2. Design Principles

## 2.1 One Question at a Time

Hanya satu pertanyaan utama ditampilkan pada setiap step.

Jangan menampilkan seluruh questionnaire sekaligus.

Avoid:

```text
Question 1
Question 2
Question 3
Question 4
Question 5
```

Preferred:

```text
Apa yang ingin kamu tunjukkan dengan datamu?

[ Comparison ]
[ Trend ]
[ Distribution ]
[ Relationship ]
[ Composition ]
```

Setelah user memilih, content berganti ke pertanyaan berikutnya.

---

## 2.2 Content Before Decoration

Pertanyaan dan pilihan adalah elemen utama halaman.

Visual decoration tidak boleh bersaing dengan decision-making.

Tidak perlu:

- decorative dashboard mockups;
- floating chart illustrations;
- gradients;
- abstract backgrounds;
- glowing effects;
- large hero illustrations.

---

## 2.3 Progressive Disclosure

Informasi hanya muncul ketika diperlukan.

User tidak perlu mengetahui:

- jumlah total rules;
- internal rule ID;
- decision tree structure;
- branch logic;
- redirect mechanism.

Complexity disembunyikan di belakang interaction.

---

## 2.4 Explain Without Teaching a Course

Helper text boleh menjelaskan istilah seperti:

- measure;
- category;
- series;
- distribution.

Tetapi explanation harus singkat dan contextual.

Contoh:

> **Satu nilai**\
> Contoh: Sales

Lebih baik daripada paragraph panjang tentang definisi measure.

---

## 2.5 Recommendation Must Feel Earned

Result harus terasa sebagai konsekuensi dari jawaban user.

Bukan:

> Bar Chart adalah chart yang bagus untuk comparison.

Tetapi:

> Kamu membandingkan satu nilai pada banyak kategori. Bar Chart horizontal membuat label lebih mudah dibaca dan ranking lebih mudah terlihat.

---

# 3. Visual Direction

Gunakan visual language existing BikinDashboard.

Overall direction:

- white/light background;
- restrained use of borders;
- strong typography hierarchy;
- generous but controlled whitespace;
- neutral surfaces;
- minimal shadows;
- consistent spacing;
- existing BikinDashboard accent color;
- functional rather than decorative.

Do not redesign global BikinDashboard visual system hanya untuk fitur ini.

Reuse:

- existing font;
- color tokens;
- sidebar;
- navigation;
- container widths;
- border styles;
- buttons;
- responsive patterns;

sebanyak mungkin.

---

# 4. Anti AI-Slop Rules

Avoid:

- giant centered gradient headline;
- gradient text;
- glowing cards;
- glassmorphism;
- excessive rounded cards;
- every section placed inside a card;
- decorative sparkles;
- fake metrics;
- AI icons;
- excessive pill UI;
- excessive shadows;
- oversized emojis;
- unnecessary chart illustrations;
- arbitrary colored icons;
- excessive animation;
- "smart", "AI-powered", atau similar language.

Chart Recommender bukan AI feature.

UI harus terasa seperti **practical data utility**.

---

# 5. Page Structure

Recommended desktop structure:

```text
┌───────────────┬─────────────────────────────────────────────┐
│               │                                             │
│   Sidebar     │   Chart Recommender                         │
│               │   Pilih visualisasi berdasarkan             │
│               │   pertanyaan yang ingin kamu jawab.         │
│               │                                             │
│               │   Comparison  ›  Categories                 │
│               │                                             │
│               │   Apa yang ingin kamu tunjukkan             │
│               │   dengan datamu?                            │
│               │                                             │
│               │   ┌─────────────────────────────────────┐   │
│               │   │ Comparison                          │   │
│               │   │ Membandingkan nilai antar...        │   │
│               │   └─────────────────────────────────────┘   │
│               │                                             │
│               │   ┌─────────────────────────────────────┐   │
│               │   │ Trend                               │   │
│               │   │ Melihat perubahan dari waktu...     │   │
│               │   └─────────────────────────────────────┘   │
│               │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

Main content tidak perlu memenuhi seluruh viewport width.

Recommended readable width:

approximately **720–900px**, mengikuti existing site layout jika sudah memiliki container convention.

---

# 6. Page Header

Header bersifat compact.

Recommended:

```text
Chart Recommender

Pilih visualisasi berdasarkan pertanyaan
yang ingin kamu jawab.
```

Optional eyebrow:

```text
TOOLS
```

Tetapi hanya gunakan jika konsisten dengan existing BikinDashboard pages.

Avoid giant marketing hero.

Title sebaiknya tidak lebih besar secara ekstrem dibanding halaman lain.

---

# 7. Initial State

Setelah compact page header:

```text
Apa yang ingin kamu tunjukkan dengan datamu?

Pilih tujuan yang paling mendekati.
Kamu bisa kembali dan mengubah jawaban kapan saja.

[ Comparison ]
Membandingkan nilai antar kategori, target, atau periode.

[ Trend ]
Melihat perubahan dari waktu ke waktu.

[ Distribution ]
Melihat bagaimana nilai tersebar.

[ Relationship ]
Melihat hubungan antar variabel.

[ Composition ]
Melihat bagian dari suatu keseluruhan.
```

Root choices harus menjadi bagian paling prominent dari initial state.

---

# 8. Choice Component

Choice sebaiknya berupa clickable row / selection block.

Recommended structure:

```text
┌──────────────────────────────────────────────┐
│ Comparison                                   │
│ Membandingkan nilai antar kategori,          │
│ target, atau periode.                        │
└──────────────────────────────────────────────┘
```

Entire row clickable.

Each choice contains:

- primary label;
- optional short helper;
- subtle interaction indicator if needed.

Avoid radio circle jika seluruh row sudah clickable kecuali semantic implementation membutuhkan radio behavior.

---

# 9. Choice States

## Default

- neutral background;
- subtle border;
- readable text.

## Hover

- slight border emphasis;
- subtle background change.

No large movement or floating animation.

## Focus

Keyboard focus harus jelas.

Use existing accent/focus token jika tersedia.

## Selected

Jika selection ditampilkan sebelum navigation:

- stronger border/accent;
- optional subtle background.

Namun jika memilih option langsung memindahkan user ke next question, selected state tidak perlu bertahan lama.

---

# 10. Interaction Model

Preferred behavior:

> **Click option → immediately advance to next question.**

Tidak perlu tombol `Next` untuk setiap step.

Alasan:

- setiap question menggunakan single-choice;
- mengurangi extra click;
- membuat experience lebih cepat;
- terasa seperti decision wizard, bukan form.

Exceptions hanya jika repository/accessibility implementation membuat explicit Continue lebih aman.

---

# 11. Question Layout

Each question:

```text
Comparison › Categories

Apakah lokasi geografis penting
untuk memahami pola datanya?

Pilih Ya jika posisi atau wilayah merupakan
bagian penting dari insight, bukan hanya nama kategori.

[ Ya, lokasi penting ]

[ Tidak, saya hanya ingin membandingkan kategorinya ]

← Kembali
```

Hierarchy:

1. context/breadcrumb;
2. question;
3. optional helper;
4. answers;
5. navigation.

---

# 12. Breadcrumb

Gunakan lightweight breadcrumb untuk memberi context.

Example:

```text
Comparison › Categories
```

or:

```text
Comparison  /  Category comparison
```

Breadcrumb tidak harus menunjukkan seluruh internal decision path.

Do not expose:

```text
ROOT-CMP > CMP-01 > CMP-CATEGORIES > CMP-02
```

Internal IDs tidak pernah tampil ke user.

---

# 13. Progress Indicator

Do **not** use fixed percentage progress seperti:

```text
Step 3 of 5
60%
```

Alasan:

branch memiliki panjang berbeda.

User dapat memperoleh recommendation setelah 2 questions atau 5 questions.

Fixed progress berpotensi misleading.

Preferred:

- breadcrumb;
- previous answers context;
- no numeric progress.

Optional subtle copy:

> Beberapa pertanyaan lagi

tidak diperlukan pada V1.

---

# 14. Back Navigation

`← Kembali`

ditempatkan di bawah choices atau dekat breadcrumb.

Back adalah secondary action.

Tidak perlu large button.

Behavior mengikuti `DECISION_TREE.md`:

- kembali satu question;
- previous answer tetap tersedia;
- jika answer diubah, downstream state dihapus.

---

# 15. Start Over

Jangan tampilkan `Start Over` terlalu prominent pada initial steps.

Setelah user sudah masuk beberapa step, dapat ditampilkan sebagai subtle text action:

```text
← Kembali                  Mulai dari awal
```

Atau di result:

```text
Coba lagi
```

Tidak membutuhkan confirmation modal.

---

# 16. Question Transition

Transition boleh menggunakan subtle animation.

Recommended:

- short fade;
- slight vertical movement;
- approximately 150–250ms.

Avoid:

- slides across entire viewport;
- bounce;
- spring animation;
- card flipping;
- elaborate page transitions.

Respect `prefers-reduced-motion`.

---

# 17. Result State

Result menggantikan wizard question sebagai main focus.

Recommended hierarchy:

```text
RECOMMENDED

Bar Chart
Horizontal Bar Chart

Kamu membandingkan satu nilai pada banyak kategori.
Bar Chart horizontal memberi ruang lebih besar untuk
label dan membuat ranking lebih mudah dibaca.

How to use it
• Gunakan orientasi horizontal
• Urutkan berdasarkan nilai
• Pertimbangkan Top N jika kategori terlalu banyak
• Highlight hanya kategori penting

Alternative
Dot Plot

Watch out
Jangan mencoba membedakan puluhan kategori
menggunakan puluhan warna.

[ Open Bar Chart Guide → ]

← Ubah jawaban                Coba lagi
```

---

# 18. Result Visual Hierarchy

Order:

1. `RECOMMENDED`
2. Chart name
3. Variant, jika ada
4. Why This Works
5. How to Use It
6. Alternative, jika ada
7. Watch Out, jika ada
8. Chart Guide CTA
9. Change answers / restart

Chart name adalah strongest element.

`RECOMMENDED` cukup small uppercase/muted label.

---

# 19. Result Container

Jangan pecah setiap subsection menjadi card terpisah.

Avoid:

```text
[ WHY CARD ]

[ TIPS CARD ]

[ ALTERNATIVE CARD ]

[ WARNING CARD ]
```

Preferred:

satu coherent result surface atau bahkan mostly flat layout dengan typography + separators.

Example:

```text
Bar Chart
────────────────────────────

Why this works
...

How to use it
...

Alternative
...

Watch out
...
```

Tujuannya supaya result terasa seperti concise recommendation, bukan dashboard.

---

# 20. Chart Preview

**Chart preview bukan requirement V1.**

Jangan menambah chart rendering library hanya untuk decorative preview.

Jika existing Chart Guide sudah memiliki lightweight reusable SVG/chart thumbnail dan dapat digunakan tanpa duplication besar, preview kecil boleh dipertimbangkan.

Namun default implementation:

> **No chart preview required.**

Prioritaskan explanation + link ke Chart Guide.

---

# 21. Variant Display

Jika rule menghasilkan variant:

```text
Bar Chart
Horizontal Bar Chart
```

Chart family menjadi primary title.

Variant menjadi secondary descriptor.

Contoh lain:

```text
Map
Choropleth Map
```

```text
Area Chart
100% Stacked Area Chart
```

CTA tetap menuju family Guide:

```text
Open Bar Chart Guide →
```

---

# 22. Why This Works

Heading:

```text
Why this works
```

Copy harus berasal dari recommendation rule dan context jawaban.

Maximum recommended length:

approximately 1–3 short sentences.

Avoid generic definition yang sama dengan Chart Guide.

Result page bukan pengganti Chart Guide.

---

# 23. How to Use It

Gunakan 2–4 concise bullet points.

Example:

```text
How to use it

• Gunakan orientasi horizontal
• Urutkan dari terbesar ke terkecil
• Pertimbangkan Top N
• Highlight kategori penting
```

Tips harus contextual terhadap recommendation path.

---

# 24. Alternative

Alternative bersifat secondary.

Recommended presentation:

```text
Alternative

Dot Plot
Cocok jika kamu ingin tampilan yang lebih ringan
untuk banyak kategori.
```

Jika `DECISION_TREE.md` hanya menyediakan chart name tanpa explanation, V1 dapat menampilkan chart name saja.

Alternative tidak perlu CTA utama.

Optional secondary link ke Guide diperbolehkan jika mudah dilakukan.

---

# 25. Watch Out

Watch Out hanya tampil jika rule memilikinya.

Recommended style:

- subtle tinted/neutral surface;
- small warning icon optional;
- not red unless actual error/danger;
- concise.

Example:

```text
Watch out

Pie atau Donut Chart akan semakin sulit
dibandingkan ketika jumlah kategori bertambah.
```

Do not make visualization advice look like system error.

---

# 26. Primary CTA

Jika recommendation memiliki Chart Guide destination:

```text
Open Bar Chart Guide →
```

Gunakan existing primary button/link style BikinDashboard.

CTA harus visually clear tetapi tidak oversized.

For Map:

```text
Open Map Guide →
```

For variants:

```text
Open Stacked Bar Chart Guide →
```

bukan:

```text
Open 100% Stacked Bar Chart Guide
```

jika variant menggunakan family guide.

---

# 27. Non-Chart Result

Untuk:

- KPI / Big Number;
- Separate Views;

tidak ada Chart Guide CTA jika belum tersedia guide.

Example:

```text
RECOMMENDED

KPI / Big Number

Kamu hanya membandingkan satu nilai utama
antara dua periode...

How to use it
...

Alternative
Bar Chart

[ Coba lagi ]
```

Jangan membuat dead CTA.

---

# 28. Cross-Intent Redirect UX

Cross-intent redirect harus terasa natural.

User tidak perlu diberi technical notification:

> You have been redirected from Relationship to Comparison.

Instead update breadcrumb/context.

Example:

User:

```text
Relationship
→ Numeric + Category
→ Membandingkan nilai antar kategori
```

Next screen:

```text
Comparison › Category comparison

Berapa nilai (measure) yang ingin dibandingkan?
```

Optional subtle explanation:

> Ini lebih cocok sebagai masalah Comparison.

Gunakan hanya jika membantu user memahami perubahan context.

Jangan gunakan modal.

---

# 29. Educational Microcopy

Tool dapat mengajarkan terminology secara passive.

Example:

```text
Berapa nilai (measure) yang ingin dibandingkan?

Satu nilai
Contoh: Sales

Lebih dari satu nilai
Contoh: Sales dan Profit
```

Example:

```text
Berapa banyak series yang ingin ditampilkan?

Series adalah kategori atau metric yang memiliki
garis masing-masing pada chart.
```

Avoid glossary popups kecuali diperlukan.

---

# 30. Example Formatting

Examples harus menggunakan data/business terms yang familiar:

- Sales;
- Revenue;
- Profit;
- Product;
- Region;
- Outlet;
- Customer;
- Delivery Time;
- Advertising Spend.

Avoid overly technical datasets dalam wizard.

---

# 31. Map Questions

Map branch harus sangat jelas agar user tidak memilih Map hanya karena memiliki location field.

Recommended:

```text
Apakah lokasi geografis penting
untuk memahami pola datanya?

Pilih Ya jika posisi atau wilayah merupakan
bagian penting dari insight, bukan hanya nama kategori.
```

Options:

```text
Ya, lokasi penting

Tidak, saya hanya ingin
membandingkan kategorinya
```

If Yes:

```text
Data lokasimu berupa apa?

[ Wilayah administratif ]
Negara, provinsi, kota, kabupaten

[ Titik atau lokasi individual ]
Outlet, cabang, fasilitas, koordinat
```

---

# 32. Composition Validation

Part-to-whole validation harus terasa educational, bukan accusatory.

Recommended:

```text
Apakah kategori tersebut benar-benar
merupakan bagian dari satu keseluruhan?

Contoh: persentase sales setiap kategori
dari total sales.
```

Options:

```text
Ya

Tidak / tidak yakin
```

Jika No:

redirect ke Comparison tanpa error.

---

# 33. Mobile Layout

Mobile harus mempertahankan one-question-at-a-time experience.

Structure:

```text
[ Mobile navigation ]

Chart Recommender
Pilih visualisasi berdasarkan...

Comparison › Categories

Apakah lokasi geografis
penting untuk memahami
pola datanya?

[ Ya, lokasi penting ]

[ Tidak, saya hanya ingin
  membandingkan kategorinya ]

← Kembali
```

Choice blocks:

- full width;
- sufficient touch height;
- no tiny side-by-side options;
- helper remains readable.

---

# 34. Mobile Result

Result menjadi single column.

Order tidak berubah.

Primary CTA full-width diperbolehkan jika sesuai existing mobile button pattern.

Example:

```text
RECOMMENDED

Bar Chart
Horizontal Bar Chart

Why this works
...

How to use it
...

Alternative
Dot Plot

Watch out
...

[ Open Bar Chart Guide ]

Ubah jawaban
Coba lagi
```

---

# 35. Desktop Choice Width

Jangan membuat five root choices menjadi lima tiny cards dalam satu row jika membuat copy sulit dibaca.

Preferred:

- single-column rows; atau
- maximum two-column layout jika existing design mendukung dan text tetap readable.

Untuk subsequent questions dengan 2–3 short options, two-column layout boleh digunakan.

Clarity lebih penting daripada compactness.

---

# 36. Root Intent Layout

Recommended default:

```text
Comparison
────────────────────────────────────
Membandingkan nilai antar kategori,
target, atau periode.

Trend
────────────────────────────────────
Melihat perubahan dari waktu ke waktu.

Distribution
────────────────────────────────────
Melihat bagaimana nilai tersebar.

Relationship
────────────────────────────────────
Melihat hubungan antar variabel.

Composition
────────────────────────────────────
Melihat bagian dari suatu keseluruhan.
```

Alternative:

2-column selection grid.

Codex harus mengikuti pattern yang paling konsisten dengan existing BikinDashboard after repository audit.

---

# 37. Icons

Icons bukan requirement.

Jika existing site menggunakan icon system consistently, small icons dapat digunakan untuk navigation/actions.

Jangan membuat satu illustrative icon berbeda untuk:

- Comparison;
- Trend;
- Distribution;
- Relationship;
- Composition;

hanya demi decoration.

Text labels sudah cukup.

---

# 38. Sidebar Integration

Existing sidebar:

```text
TOOLS
Color Palette
Chart Guide
Chart Recommender
Data Quality Checker

LEARN
Resource Hub
Paper Library
Book Library

PRACTICE
Data Challenge
```

Chart Recommender harus menggunakan existing sidebar component.

Do not duplicate navigation markup jika existing shared navigation sudah tersedia.

Active state:

```text
Chart Recommender
```

harus mengikuti existing active-navigation styling.

---

# 39. Chart Guide Integration

Chart Guide perlu memiliki subtle entry point ke Recommender.

Recommended placement:

near Chart Guide page introduction / filter area.

Copy:

```text
Tidak yakin chart mana yang cocok?
Coba Chart Recommender →
```

Jangan gunakan promotional banner besar.

---

# 40. Chart Guide Taxonomy Update

Chart Guide filter taxonomy:

```text
Semua
Perbandingan
Tren
Sebaran
Hubungan
Komposisi
Geografis
```

Jika jumlah filter menyebabkan overflow pada mobile:

- horizontal scroll diperbolehkan jika existing filter pattern memang menggunakan itu; atau
- wrap ke baris berikutnya.

Do not shrink text sampai sulit dibaca.

Charts dapat memiliki multiple tags.

---

# 41. Map Guide Card

Map ditambahkan ke Chart Guide mengikuti card style chart existing.

Suggested card content:

```text
Map

Menampilkan pola geografis ketika lokasi
merupakan bagian penting dari insight.

Geografis
```

Tidak perlu membuat Map visually special dibanding chart lain.

---

# 42. Map Guide Page

Map Guide menggunakan existing Chart Guide detail template.

Minimum sections mengikuti existing chart pages.

Content harus mencakup:

- what it is;
- when to use;
- when not to use;
- Choropleth Map;
- Point / Symbol Map;
- best practices;
- common mistakes.

Key message:

> Data lokasi tidak otomatis membutuhkan Map.

Jika tujuan hanya ranking wilayah, Bar Chart dapat lebih efektif.

---

# 43. Empty / Fallback State

Jika recommendation tidak dapat ditentukan karena implementation error:

```text
Belum menemukan rekomendasi yang cocok.

Coba mulai lagi dan pilih jawaban
yang paling mendekati kebutuhanmu.

[ Mulai dari awal ]
```

Do not display:

- internal rule ID;
- stack trace;
- undefined chart;
- blank screen.

---

# 44. Loading State

Recommendation engine berjalan client-side dan seharusnya instant.

Tidak perlu artificial loading animation seperti:

```text
Analyzing your answers...
Finding the perfect chart...
```

Result harus muncul langsung.

---

# 45. URL State

V1 tidak wajib menyimpan wizard state ke URL.

Do not create complex query parameters unless existing architecture makes this trivial and useful.

Example yang tidak diperlukan V1:

```text
/chart-recommender/?intent=comparison&measure=1&categories=many
```

State sharing dapat menjadi future enhancement.

---

# 46. Persistence

Tidak perlu menyimpan completed recommendation ke account atau backend.

Optional browser state persistence juga bukan requirement.

Reload dapat kembali ke initial state.

Simplicity lebih penting pada V1.

---

# 47. Accessibility

All choices harus semantic interactive elements.

Preferred:

- `<button>` untuk immediate-selection choices; atau
- proper radio group jika selection + continue digunakan.

Requirements:

- keyboard reachable;
- Enter/Space activates;
- visible focus;
- sufficient contrast;
- semantic headings;
- no color-only state;
- touch targets approximately 44px minimum where practical;
- reduced motion respected.

---

# 48. Focus Management

Setelah answer dipilih dan next question dirender:

focus sebaiknya berpindah secara logical ke heading/question baru.

Setelah result muncul:

focus menuju result heading / recommendation heading.

Ini penting terutama untuk keyboard dan screen reader users.

---

# 49. Analytics Interaction

UI harus menyediakan clear hooks untuk events defined in PRD.

Events:

```text
recommender_started
recommender_intent_selected
recommender_question_answered
recommender_completed
recommender_restarted
recommender_guide_opened
```

Analytics tidak boleh memengaruhi interaction jika gagal load.

---

# 50. Recommended DOM / Component Model

Exact implementation mengikuti existing stack.

Conceptually:

```text
ChartRecommenderPage
│
├── PageHeader
│
├── Wizard
│   ├── Breadcrumb
│   ├── Question
│   ├── Helper
│   ├── ChoiceList
│   │   └── Choice
│   └── WizardNavigation
│
└── RecommendationResult
    ├── RecommendationHeader
    ├── Why
    ├── Tips
    ├── Alternative
    ├── WatchOut
    ├── GuideCTA
    └── ResultActions
```

Jika site menggunakan vanilla HTML/CSS/JS, jangan memperkenalkan framework hanya untuk component abstraction ini.

---

# 51. Separation of Concerns

UI tidak boleh memiliki recommendation logic scattered di event handlers.

Preferred:

```text
Decision Tree Data
        ↓
Rule Engine
        ↓
Wizard State
        ↓
Renderer
```

Design layer menerima:

```text
question object
```

atau:

```text
recommendation object
```

dan hanya bertanggung jawab menampilkannya.

---

# 52. Suggested Question Object

Conceptual only:

```json
{
  "id": "CMP-05",
  "context": "Comparison › Categories",
  "question": "Berapa banyak kategori yang ingin dibandingkan?",
  "answers": [
    {
      "id": "CMP-CAT-FEW",
      "label": "Sedikit",
      "helper": "Sekitar 2–5 kategori."
    },
    {
      "id": "CMP-CAT-SEVERAL",
      "label": "Beberapa",
      "helper": "Sekitar 6–15 kategori."
    },
    {
      "id": "CMP-CAT-MANY",
      "label": "Banyak",
      "helper": "Lebih dari 15 kategori."
    }
  ]
}
```

Exact implementation bukan requirement design.

---

# 53. Result Example — Bar Chart

```text
RECOMMENDED

Bar Chart
Horizontal Bar Chart

Why this works

Kamu membandingkan satu nilai pada banyak kategori.
Orientasi horizontal memberi ruang lebih besar untuk
label dan membuat ranking lebih mudah dibaca.

How to use it

• Gunakan orientasi horizontal
• Urutkan berdasarkan nilai jika ranking penting
• Pertimbangkan Top N jika kategori terlalu banyak
• Highlight hanya kategori penting

Alternative

Dot Plot

Watch out

Jangan mencoba membedakan puluhan kategori
menggunakan puluhan warna.

[ Open Bar Chart Guide → ]

← Ubah jawaban        Coba lagi
```

---

# 54. Result Example — Map

```text
RECOMMENDED

Map
Choropleth Map

Why this works

Lokasi geografis merupakan bagian penting dari insight
dan datamu mewakili wilayah administratif.

How to use it

• Gunakan geographic boundaries yang sesuai
• Gunakan sequential color scale
• Tampilkan legend yang jelas
• Pertimbangkan normalized value jika diperlukan

Alternative

Bar Chart

Watch out

Jika tujuan utamanya hanya mencari wilayah tertinggi
atau terendah, Bar Chart biasanya lebih mudah
dibandingkan secara presisi.

[ Open Map Guide → ]

← Ubah jawaban        Coba lagi
```

---

# 55. Result Example — Non-Chart

```text
RECOMMENDED

KPI / Big Number

Why this works

Kamu hanya membandingkan satu nilai utama antara
dua periode. Perubahannya dapat disampaikan lebih
langsung tanpa chart penuh.

How to use it

• Tampilkan current value
• Tampilkan previous value atau percentage change
• Berikan period context yang jelas

Alternative

Bar Chart

Watch out

Jangan menggunakan Line Chart hanya untuk dua titik
jika tidak ada pola waktu yang perlu ditunjukkan.

← Ubah jawaban        Coba lagi
```

No empty Chart Guide button.

---

# 56. Desktop Wireframe

```text
┌────────────────────────────────────────────────────────────────────┐
│ SIDEBAR        │                                                   │
│                │   Chart Recommender                               │
│ TOOLS          │   Pilih visualisasi berdasarkan pertanyaan        │
│ Color Palette  │   yang ingin kamu jawab.                          │
│ Chart Guide    │                                                   │
│ Chart Rec.     │   Comparison › Categories                         │
│ Data Quality   │                                                   │
│                │   Berapa banyak kategori yang                     │
│ LEARN          │   ingin dibandingkan?                             │
│ ...            │                                                   │
│                │   ┌───────────────────────────────────────────┐   │
│ PRACTICE       │   │ Sedikit                                   │   │
│ Data Challenge │   │ Sekitar 2–5 kategori.                     │   │
│                │   └───────────────────────────────────────────┘   │
│                │                                                   │
│                │   ┌───────────────────────────────────────────┐   │
│                │   │ Beberapa                                  │   │
│                │   │ Sekitar 6–15 kategori.                    │   │
│                │   └───────────────────────────────────────────┘   │
│                │                                                   │
│                │   ┌───────────────────────────────────────────┐   │
│                │   │ Banyak                                    │   │
│                │   │ Lebih dari 15 kategori.                   │   │
│                │   └───────────────────────────────────────────┘   │
│                │                                                   │
│                │   ← Kembali                 Mulai dari awal       │
└────────────────────────────────────────────────────────────────────┘
```

---

# 57. Result Wireframe

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  Chart Recommender                                            │
│                                                               │
│  RECOMMENDED                                                  │
│                                                               │
│  Bar Chart                                                    │
│  Horizontal Bar Chart                                         │
│                                                               │
│  Kamu membandingkan satu nilai pada banyak kategori...        │
│                                                               │
│  ─────────────────────────────────────────────────────────    │
│                                                               │
│  Why this works                                               │
│  ...                                                          │
│                                                               │
│  How to use it                                                │
│  • ...                                                        │
│  • ...                                                        │
│  • ...                                                        │
│                                                               │
│  Alternative                                                  │
│  Dot Plot                                                     │
│                                                               │
│  Watch out                                                    │
│  ...                                                          │
│                                                               │
│  [ Open Bar Chart Guide → ]                                   │
│                                                               │
│  ← Ubah jawaban                         Coba lagi              │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

# 58. Implementation Constraint

Sebelum implementation, coding agent harus inspect existing:

- `assets/nav.js`;
- `assets/nav.css`;
- `assets/tokens.css`;
- Chart Guide page;
- Chart Guide data source;
- chart detail routing;
- existing card/filter styles;
- responsive navigation;
- analytics implementation.

Do not invent duplicate design tokens jika equivalent token sudah tersedia.

Do not rewrite unrelated existing functionality.

---

# 59. Design QA

Implementation harus diverifikasi terhadap hal berikut:

- initial state immediately understandable;
- one primary question visible at a time;
- root intents easy to scan;
- helper text readable but visually secondary;
- options have clear hover/focus states;
- keyboard navigation works;
- Back works;
- Start Over works;
- no misleading fixed progress percentage;
- cross-intent redirect does not feel broken;
- result clearly identifies recommendation;
- chart variant visually secondary to chart family;
- result explanation reflects user's path;
- optional sections disappear cleanly when absent;
- non-chart result has no broken Guide CTA;
- mobile does not create horizontal overflow;
- Chart Guide cross-link feels native;
- Map card follows existing Chart Guide design;
- no unnecessary visual decoration;
- no heavy dependency added solely for the wizard.

---

# 60. Design Principle

The interface should make the decision tree disappear.

User should not feel:

> “Saya sedang mengisi rule engine.”

User should feel:

> **“Saya jawab beberapa pertanyaan sederhana, lalu tahu chart apa yang masuk akal dan kenapa.”**

Complexity belongs in `DECISION_TREE.md`.

Clarity belongs in the interface.
