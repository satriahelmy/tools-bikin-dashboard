# design.md — BikinDashboard Data Challenge

**Feature:** Data Challenge  
**Version:** V1  
**Initial Challenge:** #01 — Coffee Shop Performance  
**Design direction:** Clean, editorial, practical, information-first

---

## 1. Design Intent

Data Challenge should feel like receiving a concise **Data Analyst project brief**, not entering an online course, game, or marketing landing page.

The interface should make the user think:

> “Saya paham kasusnya, saya tahu datanya seperti apa, dan saya bisa mulai analisis.”

The challenge content is the primary visual element. UI components should support reading, orientation, and action without competing with the brief.

The design must remain visually consistent with the existing BikinDashboard site and reuse existing shared navigation, tokens, typography, spacing conventions, and interaction patterns wherever possible.

---

## 2. Core Design Principles

### 2.1 Editorial over dashboard-like

The challenge detail page is a document/brief.

Prefer:

- clear headings,
- readable text width,
- restrained dividers,
- simple metadata,
- strong typographic hierarchy,
- tables when tables are appropriate.

Avoid turning every section into a card.

### 2.2 Content before decoration

Do not add visual elements merely to make the page feel “designed.”

Every component should answer one of these questions:

- Where am I?
- What is the challenge?
- What data do I have?
- What am I expected to produce?
- What should I do next?

### 2.3 Calm hierarchy

There should be one clear primary action:

**Download Dataset**

Other actions should be visually secondary.

### 2.4 Open-ended challenge

The visual design must not imply that users are following a fixed sequence of steps.

Avoid:

- Step 1 / Step 2 / Step 3 interfaces,
- progress bars,
- completion percentages,
- checkboxes for guiding questions,
- “Next lesson” patterns.

### 2.5 Minimal surfaces

Use the page background itself as the primary surface.

Cards should be used only where grouping materially improves comprehension.

---

# 3. Anti AI-Slop Rules

These rules are explicit implementation constraints.

## Do not use

- gradient backgrounds,
- glowing effects,
- glassmorphism,
- blurred translucent panels,
- oversized rounded cards,
- excessive `border-radius`,
- shadows on every component,
- floating decorative circles/shapes,
- random icons beside every heading,
- emoji as UI decoration,
- giant centered marketing hero,
- meaningless mini-stat cards,
- animated counters,
- fake user avatars,
- fake participant counts,
- “XP,” streaks, badges, or gamification,
- generic illustration of charts/laptops/data analysts,
- decorative grid backgrounds,
- excessive pill-shaped elements,
- alternating colored section backgrounds,
- multiple competing CTA colors,
- AI-generated motivational copy.

## Avoid repetitive card grids

Do not implement:

```text
[ Objective Card ]
[ Context Card ]
[ Questions Card ]
[ Dataset Card ]
[ Deliverable Card ]
```

Instead, use normal document sections separated through whitespace, typography, and subtle borders.

## Avoid excessive pills

Difficulty and skills may use small labels where useful, but do not convert every metadata value into a pill.

Preferred:

```text
Beginner · 154K rows · Jan 2024 — Dec 2025
```

rather than five colorful badges.

---

# 4. Page Shell

Reuse the existing BikinDashboard shell.

Desktop:

```text
┌───────────────┬─────────────────────────────────────────────┐
│               │                                             │
│   Sidebar     │               Main Content                  │
│               │                                             │
│               │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

Sidebar grouping:

```text
[ BikinDashboard ]

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

Section labels:

- small,
- uppercase,
- muted,
- visually subordinate to navigation items.

Do not make groups collapsible in V1.

`Data Challenge` should use the same active-state treatment as other current navigation items.

---

# 5. Layout System

## Main content width

Challenge detail pages should not use the entire available desktop width for body copy.

Recommended structure:

```text
Main area
└── content wrapper: ~900–1040px max
    └── reading column: ~700–780px where appropriate
```

Dataset tables may extend wider than the reading column.

Do not create an extremely narrow blog layout either. This is a working brief, not an essay.

## Horizontal alignment

Major sections should share a consistent left edge.

Avoid layouts where headings, paragraphs, cards, and tables each start at different horizontal positions.

## Vertical rhythm

Use clear spacing between sections, but avoid huge landing-page gaps.

Conceptually:

```text
Heading
small gap
content

medium/large section gap

Next heading
```

A subtle divider may be used between major groups when useful.

---

# 6. Typography

Reuse the existing BikinDashboard typography.

If the site currently uses Poppins, continue using it rather than introducing another font solely for Data Challenge.

Hierarchy should come primarily from:

- font size,
- weight,
- spacing,
- muted text color.

Do not rely on multiple font families.

Recommended hierarchy:

```text
Page title        strong, large but restrained
Section heading   clearly distinct
Body              comfortable reading size
Metadata          smaller / muted
Eyebrow           small / muted
Table text        compact but readable
```

Avoid a page title so large that it occupies most of the first viewport.

---

# 7. Color

Reuse existing design tokens.

The page should remain predominantly:

- white/light neutral background,
- dark readable text,
- muted secondary text,
- existing BikinDashboard accent for interactive states.

Do not introduce a unique “challenge gradient” or separate color identity.

Difficulty should not require a traffic-light color system.

If a label is used for `Beginner`, a neutral treatment is sufficient.

---

# 8. Challenge Catalog — `/challenge/`

## 8.1 Header

Left-aligned.

```text
Data Challenge

Latihan analisis data dengan kasus bisnis dan dataset yang realistis.
Explore datanya, temukan insight, dan buat dashboard dengan tools pilihanmu.
```

No giant hero.

No illustration.

No CTA required above the challenge list.

## 8.2 Challenge list

Although V1 contains only one challenge, design for future growth.

Preferred desktop treatment:

```text
──────────────────────────────────────────────────────────────
#01    Coffee Shop Performance                     Beginner
       Analisis dua tahun transaksi sebuah
       jaringan coffee shop.

       154K rows · Data Analysis · Dashboard Design

                                                View Challenge →
──────────────────────────────────────────────────────────────
```

A restrained bordered card is acceptable if that matches existing BikinDashboard catalog patterns, but avoid a large floating tile.

For multiple challenges, use a consistent vertical list or restrained grid based on the existing site's catalog language.

Do not invent filters for V1.

## 8.3 Challenge number

`#01` should be visible but secondary.

It is an index, not a gamification level.

---

# 9. Challenge Detail — First Viewport

The first viewport should immediately establish:

1. this is a Data Challenge,
2. the challenge title,
3. difficulty/scope,
4. business premise,
5. dataset download.

Preferred hierarchy:

```text
Data Challenge / Challenge #01

Coffee Shop Performance

Beginner · 154,145 rows · Jan 2024 — Dec 2025

KopiKita adalah jaringan coffee shop yang memiliki 10 outlet
di Bandung, Jakarta, dan Yogyakarta...

[ Download Dataset ]   View Data Dictionary
```

### Breadcrumb / eyebrow

Small and muted.

Do not use a large breadcrumb component.

### Title

Left aligned.

Avoid centered marketing presentation.

### Metadata

Use compact inline text.

Example:

```text
Beginner · 154,145 rows · 103,008 transactions · 2024–2025
```

On mobile this may wrap naturally.

### Intro

Keep readable line length.

Do not put the intro inside a colored hero card.

---

# 10. CTA Design

## Primary

**Download Dataset**

Use the existing primary button style.

It should be visually clear without being oversized.

## Secondary

**View Data Dictionary**

Prefer text link or secondary button depending on the site's existing pattern.

Do not give both actions equal visual weight.

If a download icon already exists in the site's icon system, it may be used. Do not introduce a new icon library for this page.

---

# 11. Your Objective

This is one of the most important sections.

Preferred treatment:

```text
Your Objective

Analisis performa bisnis KopiKita selama 2024–2025.
Temukan pola, perubahan, atau masalah yang menurutmu penting...

Tidak ada satu jawaban atau dashboard yang dianggap paling benar.
```

A subtle left border or lightly tinted neutral callout may be used for the final open-ended note.

Do not turn the entire objective into a large colored card.

Do not use motivational language such as:

> Ready to unlock the insights hidden in the data?

---

# 12. Business Context

Use normal document typography.

Recommended:

```text
Business Context

KopiKita mengoperasikan 10 outlet di tiga kota...

Dataset grain
One row represents one product line within a transaction.
```

The grain statement should be easy to notice.

A compact informational row/callout is acceptable:

```text
Dataset grain    1 row = 1 product line within a transaction
```

Avoid warning/error styling because this is not an error.

---

# 13. Dataset Overview

Do not create four large KPI cards.

Preferred:

```text
Dataset Overview

154,145        103,008        10        16
Rows           Transactions   Outlets   Products

Jan 2024 — Dec 2025 · CSV · IDR
```

The values may use a simple four-column stat row with:

- no shadow,
- minimal or no border,
- restrained number sizing.

On mobile:

```text
154,145        103,008
Rows           Transactions

10             16
Outlets        Products
```

Dataset statistics should not visually compete with the challenge title.

---

# 14. Questions to Explore

This should feel like prompts in a project brief.

Preferred:

```text
Questions to Explore

Gunakan pertanyaan berikut sebagai panduan. Kamu tidak harus
menjawab semuanya dan boleh mengeksplorasi pertanyaan lain.

01  Bagaimana performa bisnis berubah dari waktu ke waktu?

02  Bagaimana performa antar-outlet dan kota?

03  Produk dan kategori apa yang paling berkontribusi...

...
```

Use restrained numbering.

Do not use:

- checkboxes,
- cards for each question,
- colored icons,
- progress states.

Questions are prompts, not tasks to complete.

---

# 15. Data Dictionary

The dictionary should be usable directly on the page.

Header:

```text
Data Dictionary                                      Download CSV
```

Table:

```text
Column              Type        Description
──────────────────────────────────────────────────────────────
transaction_id      String      Transaction identifier...
transaction_date    Date        Transaction date
...
```

Design:

- clear column headers,
- subtle row separators,
- no zebra-striping unless already used by BikinDashboard,
- code styling for field names if consistent with the site,
- compact but readable row height.

On mobile, allow horizontal scrolling rather than collapsing each row into a large card.

Do not display all fields as 18 separate cards.

---

# 16. Your Deliverable

Use normal section treatment.

```text
Your Deliverable

Buat 1 dashboard yang mengkomunikasikan insight terpenting
dari dataset.

Kamu bebas menggunakan Excel, Tableau, Power BI,
Looker Studio, Python, atau tools lainnya.
```

Tools should preferably remain inline text.

Do not display six logo cards.

Do not visually privilege a particular BI tool.

---

# 17. Stretch Challenge

This is optional and should look secondary.

Possible treatment:

```text
Want an extra challenge?

Tuliskan 3 insight utama dan 1 rekomendasi bisnis
berdasarkan analisismu.
```

A restrained bordered callout is acceptable.

Do not make it look like a locked premium feature.

---

# 18. Share Your Work

Near the bottom of the page:

```text
Share Your Work

Sudah selesai? Bagikan dashboard atau analisismu dengan
#BikinDashboardChallenge dan mention @satriahelmy.
```

If a share button is implemented, keep it secondary.

Do not:

- embed fake social posts,
- show fake community counts,
- add leaderboard visuals.

---

# 19. End of Page

Do not use a generic giant CTA banner.

A simple return/navigation treatment is enough:

```text
← Back to Data Challenge
```

Future versions may show another challenge only when another real challenge exists.

Do not show a fake “Next Challenge — Coming Soon” solely to fill space.

---

# 20. Responsive Behavior

## Desktop

- persistent existing sidebar,
- challenge content aligned to existing shell,
- comfortable reading width,
- dictionary uses available width.

## Tablet

- follow existing navigation behavior,
- metadata may wrap,
- dataset stats remain readable.

## Mobile

- follow current BikinDashboard mobile navigation pattern,
- single-column content,
- CTAs may stack,
- stats become 2 × 2,
- tables horizontally scroll,
- body copy stays comfortably readable,
- no important information hidden.

Do not create Data Challenge-specific mobile navigation if the site already has one.

---

# 21. Interaction States

Use existing global states where available.

Buttons/links require:

- default,
- hover,
- keyboard focus,
- active where applicable.

Downloads should behave like normal downloads.

No modal is required for dataset download.

`View Data Dictionary` should preferably scroll to the dictionary section or navigate to the relevant content without unnecessary modal UI.

---

# 22. Loading / Empty / Error States

Because V1 is primarily static, keep these minimal.

If challenge data fails to load:

```text
Challenge content could not be loaded.
```

Provide a simple retry only if technically useful.

Do not create skeleton loaders for static content unless the existing application already uses them.

If there are no challenges in the future, use straightforward explanatory copy rather than an illustration-heavy empty state.

---

# 23. Content Voice

Use the same mixed Indonesian/data-professional language already established by BikinDashboard.

Tone:

- concise,
- practical,
- neutral,
- non-academic,
- non-gamified.

Good:

> Temukan pola, perubahan, atau masalah yang menurutmu penting.

Avoid:

> Saatnya menguji kemampuan data analyst-mu dan menaklukkan challenge ini!

Avoid unnecessary exclamation marks.

---

# 24. Reusability Rules

Challenge #02 and later must reuse the same visual system.

Challenge-specific content may change:

- title,
- difficulty,
- metadata,
- context,
- objective,
- questions,
- dataset,
- dictionary,
- deliverable.

The page structure should not require redesign for each challenge.

Do not create Coffee Shop-specific decorative visuals, coffee colors, coffee illustrations, or café imagery as part of the core template.

The content should identify the scenario, not a theme skin.

---

# 25. Integration with Existing BikinDashboard

Preserve existing:

- `assets/nav.js`
- `assets/nav.css`
- `assets/tokens.css`
- current responsive navigation behavior
- global typography
- global button/link conventions

Before adding new CSS, inspect whether an existing token/component can be reused.

Feature-specific CSS should be scoped to Data Challenge and should not unintentionally alter existing pages.

Do not rewrite shared navigation solely for this feature except for the necessary category grouping and Data Challenge entry.

---

# 26. Analytics Interaction Design

Analytics must not affect visible UX.

Track:

- challenge opened,
- dataset downloaded,
- dictionary opened,
- dictionary downloaded,
- share clicked.

Do not add consent-like UI specifically for these feature events if the site already has an analytics approach.

Never send dataset contents through event parameters.

---

# 27. SEO / Semantic Structure

Use semantic HTML.

Suggested heading hierarchy:

```text
h1 Coffee Shop Performance

h2 Your Objective
h2 Business Context
h2 Dataset Overview
h2 Questions to Explore
h2 Data Dictionary
h2 Your Deliverable
h2 Want an extra challenge?
h2 Share Your Work
```

Do not use heading levels purely for styling.

Challenge catalog cards should use meaningful links and headings.

---

# 28. Visual QA Checklist

Before considering the implementation complete, verify:

- [ ] Page does not look like a generic SaaS landing page.
- [ ] Page does not look like an online course lesson.
- [ ] No unnecessary gradients or decorative graphics exist.
- [ ] Not every section is inside a card.
- [ ] Primary CTA is immediately understandable.
- [ ] Dataset grain is easy to find.
- [ ] Data dictionary is genuinely usable.
- [ ] Long content remains easy to scan.
- [ ] Section spacing is consistent.
- [ ] Content does not feel either cramped or excessively sparse.
- [ ] Metadata is subordinate to the title.
- [ ] Mobile table behavior works.
- [ ] Existing BikinDashboard navigation remains visually consistent.
- [ ] Hidden dataset patterns are not exposed anywhere.
- [ ] No official answer/dashboard is implied.
- [ ] The template can accommodate Challenge #02 unchanged.

---

# 29. Reference Wireframe — Catalog

```text
┌──────────────────────────────────────────────────────────────┐
│ Data Challenge                                               │
│ Latihan analisis data dengan kasus bisnis dan dataset...    │
│                                                              │
│ ──────────────────────────────────────────────────────────── │
│ #01                                                          │
│ Coffee Shop Performance                         Beginner     │
│ Analisis dua tahun transaksi sebuah jaringan coffee shop.   │
│                                                              │
│ 154K rows · Data Analysis · Dashboard Design                 │
│                                             View Challenge → │
│ ──────────────────────────────────────────────────────────── │
└──────────────────────────────────────────────────────────────┘
```

---

# 30. Reference Wireframe — Detail

```text
Data Challenge / Challenge #01

Coffee Shop Performance
Beginner · 154,145 rows · 103,008 transactions · 2024–2025

KopiKita adalah jaringan coffee shop yang memiliki 10 outlet
di Bandung, Jakarta, dan Yogyakarta. Management ingin...

[ Download Dataset ]    View Data Dictionary


──────────────────────────────────────────────────────────────

Your Objective

Analisis performa bisnis KopiKita selama 2024–2025...
Tidak ada satu jawaban atau dashboard yang dianggap paling benar.


Business Context

KopiKita mengoperasikan 10 outlet di tiga kota...

Dataset grain
1 row = 1 product line within a transaction


Dataset Overview

154,145          103,008          10          16
Rows             Transactions     Outlets     Products

Jan 2024 — Dec 2025 · CSV · IDR


Questions to Explore

01  Bagaimana performa bisnis berubah dari waktu ke waktu?
02  Bagaimana performa antar-outlet dan kota?
03  Produk dan kategori apa yang paling berkontribusi?
04  Apakah terdapat pola berdasarkan hari atau waktu?
05  Apakah ada perubahan menarik sepanjang periode data?
06  Apa insight yang perlu diketahui management?


Data Dictionary                                      Download CSV

Column              Type          Description
──────────────────────────────────────────────────────────────
transaction_id      String        Transaction identifier...
transaction_date    Date          Transaction date
...


Your Deliverable

Buat 1 dashboard yang mengkomunikasikan insight terpenting.
Gunakan tools pilihanmu.


Want an extra challenge?

Tuliskan 3 insight utama dan 1 rekomendasi bisnis.


Share Your Work

#BikinDashboardChallenge · @satriahelmy

← Back to Data Challenge
```

---

## 31. Final Design Principle

When deciding whether to add another visual component, use this test:

> **Does this make the challenge easier to understand or start?**

If the answer is no, do not add it.

The strongest Data Challenge page should feel almost obvious: a clear brief, understandable data, one strong download action, and enough guidance to begin without prescribing the answer.
