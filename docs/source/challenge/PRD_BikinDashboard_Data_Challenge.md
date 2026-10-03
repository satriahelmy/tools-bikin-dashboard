# PRD — BikinDashboard Data Challenge

**Product:** BikinDashboard  
**Feature:** Data Challenge  
**Version:** V1  
**Status:** Ready for implementation  
**Initial Challenge:** #01 — Coffee Shop Performance

## 1. Overview

Data Challenge is the **Practice** area of BikinDashboard. It provides realistic, open-ended data analysis cases where users receive a business context, objective, dataset, data dictionary, optional guiding questions, and suggested deliverable.

Users may analyze the data using any tool they prefer. There is no official dashboard, fixed visualization requirement, scoring system, or single correct answer.

V1 launches with **Challenge #01 — Coffee Shop Performance**.

## 2. Product Context

Recommended sidebar:

```text
Beranda

TOOLS
Color Palette
Chart Guide
Data Quality Checker

LEARN
Resource Hub
Paper Library
Book Library

PRACTICE
Data Challenge
```

Use small muted uppercase section labels. No accordion/collapsible navigation in V1.

## 3. Problem

BikinDashboard already provides practical tools and curated resources, but does not yet provide a place to practice end-to-end analytical thinking.

Many exercises over-specify the solution: calculate exact KPIs, use exact charts, or reproduce an example dashboard. Data Challenge should instead simulate a lightweight Data Analyst assignment:

> Here is the business context and the data. Explore it, decide what matters, and communicate what you find.

## 4. Goals

1. Provide realistic datasets for practicing data analysis and dashboard design.
2. Encourage exploratory thinking rather than reproducing predefined solutions.
3. Build a reusable challenge system so future challenges do not require a new page structure.
4. Connect BikinDashboard learning resources and tools with hands-on practice.
5. Create content users can naturally share.

Secondary goals include repeat visits, portfolio-friendly practice, community examples, and behavioral analytics.

## 5. Non-Goals — V1

Do not implement:

- authentication or user accounts
- progress tracking
- submission forms or uploads
- dashboard hosting
- leaderboard or scoring
- badges or certificates
- timer
- official solution or dashboard
- expected chart types
- automated grading
- AI feedback
- comments or voting
- community profiles

V1 should remain lightweight and primarily static.

## 6. Target Users

- people learning Data Analytics
- junior Data Analysts
- BI/dashboard learners
- Excel, Tableau, Power BI, Looker Studio, and Python users
- users looking for portfolio-style practice datasets

## 7. Product Principles

### Open-ended by default
Provide context and direction, not a prescribed answer.

### Tool agnostic
Do not design challenges around a particular BI tool.

### Business-first
Start from a business scenario rather than chart requirements.

### No artificial correct dashboard
Different approaches may be valid when supported by data.

### Clear data grain
Do not intentionally trick users with undocumented structure.

### Realistic but approachable
Synthetic datasets should contain coherent business behavior, natural variation, and discoverable patterns.

### Minimal UI
Avoid excessive cards, gradients, decorative widgets, gamification, and generic AI-dashboard aesthetics.

## 8. Information Architecture

Routes:

```text
/challenge/
/challenge/coffee-shop-performance/
```

Future examples:

```text
/challenge/ecommerce-performance/
/challenge/marketing-campaign/
/challenge/delivery-performance/
```

Do not tie the route architecture to Challenge #01.

## 9. Challenge Catalog

`/challenge/` is the entry point for all challenges.

Suggested header:

> **Data Challenge**
>
> Latihan analisis data dengan kasus bisnis dan dataset yang realistis. Explore datanya, temukan insight, dan buat dashboard dengan tools pilihanmu.

Each challenge card supports:

- challenge number
- title
- short description
- difficulty
- dataset size
- skills/tags
- detail-page URL

Challenge #01 card:

> **#01 — Coffee Shop Performance**
>
> Analisis dua tahun transaksi sebuah jaringan coffee shop dan temukan insight yang penting untuk management.
>
> Beginner · 154K rows  
> Data Analysis · Data Visualization · Dashboard Design
>
> View Challenge →

Do not show fake participant counts or completion rates. Filtering is not required in V1.

## 10. Reusable Challenge Data Model

Keep challenge content separate from page markup where practical. In the current static HTML/CSS/JS architecture, JSON or a JavaScript data object is acceptable.

Suggested shape:

```json
{
  "id": "01",
  "slug": "coffee-shop-performance",
  "title": "Coffee Shop Performance",
  "description": "Analisis dua tahun transaksi sebuah jaringan coffee shop.",
  "difficulty": "Beginner",
  "skills": ["Data Analysis", "Data Visualization", "Dashboard Design"],
  "tools": "Any tool",
  "dataset": {
    "rows": 154145,
    "transactions": 103008,
    "period": "Jan 2024 — Dec 2025",
    "outlets": 10,
    "products": 16,
    "format": "CSV",
    "download": "..."
  },
  "dataDictionary": {
    "download": "...",
    "columns": []
  },
  "businessContext": "...",
  "objective": "...",
  "guidingQuestions": [],
  "deliverable": "...",
  "stretchChallenge": "...",
  "share": {
    "hashtag": "#BikinDashboardChallenge",
    "mention": "@satriahelmy"
  }
}
```

The exact schema may change, but adding Challenge #02 must not require duplicating an entire implementation.

## 11. Challenge Detail Page

Recommended hierarchy:

```text
Data Challenge / Breadcrumb

Challenge #01
Coffee Shop Performance

Difficulty · Dataset size · Period

Short business intro

[ Download Dataset ] [ Data Dictionary ]

Your Objective
Business Context
Dataset Overview
Questions to Explore
Data Dictionary
Your Deliverable
Optional Stretch Challenge
Share Your Work
```

The page should feel like a **Data Analyst assignment brief**, not a course lesson.

## 12. Challenge #01 Metadata

- Challenge: #01
- Title: Coffee Shop Performance
- Difficulty: Beginner
- Positioning: Beginner → Early Intermediate
- Period: January 2024 — December 2025
- Rows: 154,145
- Transactions: 103,008
- Outlets: 10
- Products: 16
- Cities: 3
- Format: CSV
- Currency: IDR
- Tools: Any tool
- Skills: Data Analysis, Data Visualization, Dashboard Design

## 13. Business Scenario

Baseline public copy:

> KopiKita adalah jaringan coffee shop yang memiliki 10 outlet di Bandung, Jakarta, dan Yogyakarta. Management ingin memahami bagaimana bisnis berkembang selama dua tahun terakhir dan menemukan area yang membutuhkan perhatian.
>
> Kamu berperan sebagai Data Analyst. Explore transaction data dan buat dashboard yang mengkomunikasikan temuan paling penting untuk management.

KopiKita is fictional.

Do not state potential discoveries such as declining sales, margin pressure, or an underperforming outlet in the brief.

## 14. Your Objective

> Analisis performa bisnis KopiKita selama 2024–2025. Temukan pola, perubahan, atau masalah yang menurutmu penting dan komunikasikan hasil analisismu melalui sebuah dashboard.
>
> Tidak ada satu jawaban atau dashboard yang dianggap paling benar. Fokus pada insight yang dapat didukung oleh data.

This should be visually prominent without becoming a large marketing callout.

## 15. Business Context & Grain

> KopiKita mengoperasikan 10 outlet di tiga kota. Dataset berisi sampel transaksi penjualan dari Januari 2024 hingga Desember 2025.
>
> Setiap transaksi dapat memiliki lebih dari satu produk. Karena itu, satu `transaction_id` dapat muncul pada beberapa baris dataset.
>
> Nilai penjualan dan biaya menggunakan Rupiah (IDR).

Explicit grain:

> **One row represents one product line within a transaction.**

Do not hide this information as a trick.

## 16. Dataset Overview

Display compactly:

```text
154,145        103,008        10           16
Rows           Transactions   Outlets      Products

Jan 2024 — Dec 2025
```

Primary CTA: **Download Dataset**  
Secondary CTA: **View Data Dictionary**

The dataset download points to the supplied Coffee Shop CSV. The dictionary download points to the supplied Data Dictionary CSV.

## 17. Dataset Schema

The dataset contains 18 columns:

| Column | Meaning |
|---|---|
| `transaction_id` | Transaction identifier; may repeat across product lines |
| `transaction_date` | Transaction date |
| `transaction_time` | Transaction time |
| `outlet_id` | Outlet identifier |
| `outlet_name` | Outlet name |
| `city` | Outlet city |
| `product_id` | Product identifier |
| `product_name` | Product name |
| `category` | Product category |
| `quantity` | Units sold |
| `unit_price` | Selling price per unit before discount |
| `discount_pct` | Discount percentage |
| `gross_sales` | Sales before discount |
| `net_sales` | Sales after discount |
| `unit_cost` | Estimated cost per unit |
| `total_cost` | Total product cost |
| `profit` | Net sales minus total cost |
| `payment_method` | Transaction payment method |

Show this as a responsive table and also provide the downloadable dictionary CSV.

## 18. Questions to Explore

Intro:

> Gunakan pertanyaan berikut sebagai panduan. Kamu tidak harus menjawab semuanya dan boleh mengeksplorasi pertanyaan lain.

Questions:

1. Bagaimana performa bisnis berubah dari waktu ke waktu?
2. Bagaimana performa antar-outlet dan kota?
3. Produk dan kategori apa yang paling berkontribusi terhadap bisnis?
4. Apakah terdapat pola berdasarkan hari atau waktu transaksi?
5. Apakah ada perubahan menarik sepanjang periode data?
6. Apa insight yang menurutmu perlu diketahui management?

These are prompts, not requirements. Do not add chart recommendations and do not reveal hidden patterns.

## 19. Deliverable

> Buat **1 dashboard** yang mengkomunikasikan insight terpenting dari dataset.

Users may use Excel, Tableau, Power BI, Looker Studio, Python, or another suitable tool.

Do not require a minimum number of charts, specific KPIs, chart types, filters, or dashboard dimensions.

## 20. Optional Stretch Challenge

Heading: **Want an extra challenge?**

> Setelah dashboard selesai, tuliskan **3 insight utama** dan **1 rekomendasi bisnis** berdasarkan analisismu.

No submission workflow is required.

## 21. Share Your Work

> Sudah selesai? Bagikan dashboard atau analisismu dan gunakan **#BikinDashboardChallenge**.
>
> Mention **@satriahelmy** agar hasilmu bisa kami lihat.

Do not embed a social feed in V1. A curated Community Showcase may be considered later.

## 22. Internal Dataset Notes — Never Publish

These notes are maintainer-only and must not appear on the public challenge page.

Generation seed:

```text
42
```

The synthetic dataset intentionally contains discoverable behavior including:

- time-of-day differences
- weekday/weekend differences by outlet
- outlet performance differences
- increasing Aren Latte preference
- declining Thai Tea preference
- gradual deterioration at one outlet
- margin pressure from cost changes
- gradual QRIS adoption
- December seasonality
- random daily variation

Internal QA signals:

```text
Rows:         154,145
Transactions: 103,008

Aren Latte quantity share:
2024  11.04%
2025  14.66%

Thai Tea quantity share:
2024  7.85%
2025  5.74%

Overall profit margin:
2024  54.89%
2025  52.92%

QRIS transaction share:
2024  36.71%
2025  45.44%
```

These are QA signals, not official answers. Do not expose them as hints.

## 23. Data Quality Philosophy

Challenge #01 focuses on analysis and visualization rather than cleaning.

Do not intentionally add:

- missing values
- duplicate rows
- malformed dates
- inconsistent casing
- typo-cleaning exercises

Messy-data challenges may be created separately later.

## 24. Visual Design

Follow the existing BikinDashboard design system and shared assets.

Desired character:

- clean
- white/light
- practical
- editorial
- calm
- information-first

Avoid:

- large gradients
- glassmorphism
- excessive rounded cards
- excessive shadows
- decorative floating shapes
- giant hero typography
- unnecessary illustrations
- fake statistics
- gamified XP/progress
- generic AI-generated dashboard aesthetics

Whitespace should be intentional but not excessive. The detail page should feel closer to a professional project brief than a marketing landing page.

## 25. Responsive & Accessibility

Support desktop, tablet, and mobile.

On small screens:

- stack metadata cleanly
- keep dataset CTA accessible
- allow dictionary tables to scroll horizontally when needed
- preserve important challenge information

Accessibility requirements:

- semantic heading hierarchy
- keyboard-accessible controls
- visible focus states
- adequate contrast
- descriptive CTA labels
- semantic table headers
- no information conveyed by color alone

## 26. Analytics

Recommended GA4 events:

```text
challenge_opened
challenge_dataset_downloaded
challenge_dictionary_opened
challenge_dictionary_downloaded
challenge_share_clicked
```

Useful parameters:

```text
challenge_id
challenge_slug
file_format
```

Do not send dataset contents or personally identifiable information to analytics.

The primary early activation signal is:

> **A visitor downloads the challenge dataset.**

## 27. SEO

Each challenge should have its own indexable URL.

Recommended title:

```text
Coffee Shop Performance — Data Challenge | BikinDashboard
```

Recommended description:

```text
Latihan analisis data dan dashboard menggunakan dataset transaksi coffee shop dua tahun. Download dataset gratis dan temukan insight versimu sendiri.
```

Future challenge metadata should be generated from challenge content where practical.

## 28. Files

Initial user-facing assets:

```text
coffee_shop_challenge_v1.csv
coffee_shop_data_dictionary.csv
```

Recommended public filenames:

```text
coffee-shop-performance.csv
coffee-shop-data-dictionary.csv
```

Do **not** publish the internal QA document.

## 29. Suggested Project Structure

Adapt this to the existing repository rather than forcing a framework:

```text
/challenge/
    index.html

/challenge/coffee-shop-performance/
    index.html

/data/challenges/
    challenges.json

/downloads/challenges/coffee-shop-performance/
    coffee-shop-performance.csv
    coffee-shop-data-dictionary.csv
```

Reuse existing shared navigation, tokens, and styles. Do not duplicate the shared shell.

## 30. Acceptance Criteria

V1 is complete when:

- [ ] `Data Challenge` appears under a `PRACTICE` sidebar group.
- [ ] `/challenge/` displays the challenge catalog.
- [ ] Challenge #01 appears in the catalog.
- [ ] Challenge #01 has a stable detail URL.
- [ ] Business context and objective are displayed.
- [ ] Dataset grain is clearly explained.
- [ ] Dataset overview shows correct metadata.
- [ ] Dataset CSV can be downloaded.
- [ ] Data dictionary is readable on-page.
- [ ] Data dictionary CSV can be downloaded.
- [ ] Guiding questions do not prescribe chart types.
- [ ] Deliverable remains tool-agnostic.
- [ ] Optional stretch challenge is displayed.
- [ ] Share section includes `#BikinDashboardChallenge`.
- [ ] No official solution is exposed.
- [ ] No internal hidden-pattern information is exposed.
- [ ] Architecture supports adding Challenge #02 without redesigning the feature.
- [ ] Existing BikinDashboard functionality remains unchanged.
- [ ] Shared navigation/styles are reused.
- [ ] Pages are responsive and accessible.
- [ ] Dataset interaction analytics are implemented if GA4 is already available.

## 31. Future Considerations — Not V1

Potential later additions:

- difficulty/skill filters
- challenge collections
- community showcase
- user submissions
- optional hints
- peer examples
- challenge progress
- portfolio export
- messy-data challenges
- SQL challenges
- analysis-only challenges
- downloadable brief PDF
- community-created challenges

Do not pre-build these in V1.

## 32. Initial Challenge Roadmap

Potential sequence:

1. Coffee Shop Performance — Beginner
2. E-Commerce Performance — Beginner / Intermediate
3. Marketing Campaign — Intermediate
4. Delivery Performance — Intermediate
5. Subscription Growth — Intermediate / Advanced

Only Challenge #01 is in scope now.

## 33. Success Signals

Evaluate:

- challenge detail views
- dataset download rate
- dictionary interaction rate
- return visits
- internal navigation from Challenge to other BikinDashboard tools
- social posts using `#BikinDashboardChallenge`
- qualitative feedback

V1 exists to test whether BikinDashboard users want to move from browsing tools/resources into **practicing with data**.
