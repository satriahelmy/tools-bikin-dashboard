# PRD — Paper Library

**Product:** Tools BikinDashboard  
**Feature:** Paper Library  
**Version:** V1 / MVP  
**Status:** Draft  
**Route:** `/papers/`  
**Platform:** Web, static-first

---

## 1. Overview

**Paper Library** adalah katalog terkurasi berisi paper penting dan berpengaruh untuk orang yang bekerja atau belajar di bidang data, khususnya:

- Data Visualization
- Data Analysis & Statistics
- Classical Machine Learning
- Deep Learning
- Computer Vision
- Natural Language Processing
- Large Language Models
- Generative AI
- Reinforcement Learning
- Time Series
- Graph Machine Learning
- Recommender Systems
- Explainable AI
- Speech & Audio
- Multimodal AI
- RAG & AI Agents

Paper Library bukan academic search engine dan tidak bertujuan mengindeks seluruh literatur ilmiah.

Tujuan utamanya adalah membantu user menjawab:

> “Paper penting apa yang sebaiknya saya baca untuk memahami perkembangan bidang data, visualization, ML, dan AI?”

Setiap paper dapat dilengkapi dengan ringkasan kontribusi, metadata, link full-text gratis yang telah dikurasi, serta link implementasi kode yang telah diverifikasi bila tersedia.

---

## 2. Product Positioning

Paper Library merupakan bagian dari **Tools BikinDashboard**, sehingga cakupannya tidak hanya Machine Learning dan AI.

Positioning utama:

> **Discover influential papers in data, visualization, machine learning, and AI.**

Paper Library harus terasa sebagai **curated technical reference for people working with data**, bukan mirror arXiv atau database akademik umum.

Data Visualization menjadi first-class category karena relevan langsung dengan positioning BikinDashboard.

---

## 3. Problems

### 3.1 Discovery problem

User sering mengenal teknologi seperti Transformer, Random Forest, Tableau, D3, ResNet, atau LSTM tetapi tidak mengetahui paper original atau paper yang menjadi fondasinya.

### 3.2 Access problem

Search engine sering mengarahkan user ke publisher yang membutuhkan subscription atau institutional login.

### 3.3 Context problem

Daftar paper biasa hanya berisi judul dan link tanpa menjelaskan:

- kontribusi paper;
- kenapa paper penting;
- tingkat kesulitan;
- area/topik terkait.

### 3.4 Code discovery problem

Paper dan implementasi kode sering tersebar. Tidak selalu jelas apakah sebuah repository merupakan official implementation, repository author, research lab, atau hanya community implementation.

### 3.5 Information overload

Google Scholar dan arXiv sangat luas. User yang ingin memahami landmark papers membutuhkan kurasi, bukan jutaan hasil pencarian.

---

## 4. Goals

V1 harus memungkinkan user untuk:

1. Menemukan influential dan landmark papers dalam bidang data, visualization, ML, dan AI.
2. Mencari paper berdasarkan judul, author, topic, atau contribution.
3. Filter paper berdasarkan category, topic, year, difficulty, importance, dan availability of code.
4. Membuka full-text gratis dari sumber yang telah dikurasi.
5. Mengetahui jenis sumber free-access yang digunakan.
6. Membuka repository implementasi jika tersedia dan telah diverifikasi.
7. Memahami kontribusi utama paper tanpa harus membuka paper terlebih dahulu.
8. Menjelajah paper dengan cepat tanpa account atau login.

---

## 5. Non-Goals

V1 tidak bertujuan menjadi:

- pengganti Google Scholar;
- citation index;
- reference manager seperti Zotero;
- PDF reader;
- tempat upload/re-host PDF;
- AI paper summarizer;
- paper recommendation berbasis AI;
- academic social network;
- database seluruh paper;
- platform review/rating paper;
- personalized reading tracker.

---

## 6. Target Users

### Primary — Data / ML Learner

User yang sedang belajar Data Analytics, Data Visualization, Data Science, Machine Learning, atau AI.

### Primary — Practitioner

Data Analyst, BI Analyst, Data Scientist, ML Engineer, AI Engineer, atau developer yang ingin menemukan original paper dan implementasinya.

### Secondary — Educator

Dosen, trainer, mentor, atau content creator yang membutuhkan referensi paper untuk materi pembelajaran.

### Secondary — Experienced Practitioner

User yang ingin menemukan kembali landmark paper atau repository tertentu dengan cepat.

---

## 7. Core Value Proposition

Paper Library menghubungkan empat aktivitas:

**Discover → Understand → Read → Code**

Tidak semua paper harus memiliki code. Jika tidak ada repository authoritative yang dapat diverifikasi, tombol Code tidak ditampilkan.

---

## 8. Initial Dataset

Initial dataset menggunakan curated master dataset yang telah disiapkan.

Baseline saat ini:

- ±125 landmark ML/AI papers
- tambahan curated Data Visualization papers
- Statistics & Data Analysis dapat ditambahkan sebagai batch berikutnya

Target awal production diperkirakan sekitar **145–175 curated papers**, tergantung hasil final verification.

Jumlah paper bukan KPI utama. Kualitas kurasi dan reliability link lebih penting daripada volume.

---

## 9. Main Categories

Initial categories:

- Data Visualization
- Statistics & Data Analysis
- Foundations
- Classical ML
- Clustering
- Deep Learning
- Computer Vision
- NLP
- Large Language Models
- Generative AI
- Multimodal AI
- RAG
- AI Agents
- Reinforcement Learning
- Self-Supervised Learning
- Time Series
- Graph Machine Learning
- Recommender Systems
- Explainable AI
- Speech & Audio

Categories dapat berkembang tanpa mengubah struktur aplikasi.

---

## 10. Data Visualization Coverage

Data Visualization merupakan category utama.

Initial topics antara lain:

- Graphical Perception
- Visual Encoding
- Color
- Interaction
- Dashboard
- Visual Analytics
- Visualization Recommendation
- Visualization Grammar
- Misleading Visualization
- Visualization Evaluation
- Web Visualization
- Storytelling

Representative landmark papers dapat mencakup:

- Cleveland & McGill — *Graphical Perception*
- Shneiderman — *The Eyes Have It*
- Stolte, Tang & Hanrahan — *Polaris*
- Mackinlay et al. — *Show Me*
- Heer & Robertson — *Animated Transitions in Statistical Data Graphics*
- Borland & Taylor — *Rainbow Color Map (Still) Considered Harmful*
- Heer, Bostock & Ogievetsky — *A Tour Through the Visualization Zoo*
- Heer & Bostock — *Crowdsourcing Graphical Perception*
- Bostock, Ogievetsky & Heer — *D³: Data-Driven Documents*
- Borkin et al. — *What Makes a Visualization Memorable?*
- Liu & Heer — *The Effects of Interactive Latency on Exploratory Visual Analysis*
- Wongsuphasawat et al. — *Voyager*
- Satyanarayan et al. — *Vega-Lite*
- Moritz et al. — *Draco*

Final inclusion tetap bergantung pada metadata dan free-access verification.

---

## 11. Data Architecture

V1 tidak membutuhkan database.

Recommended:

```text
/data/
    papers.json
```

Rendering dan filtering dilakukan client-side.

Dengan dataset ±200 records, load seluruh dataset sekaligus masih sangat ringan.

Jangan hard-code seluruh paper langsung ke HTML.

---

## 12. Paper Data Model

Recommended schema:

```json
{
  "id": 1,
  "title": "Attention Is All You Need",
  "year": 2017,
  "authors": [
    "Ashish Vaswani",
    "Noam Shazeer"
  ],
  "category": "NLP",
  "topics": [
    "Transformer",
    "Attention"
  ],
  "contribution": "Introduced the Transformer architecture based primarily on attention.",
  "importance": "Landmark",
  "difficulty": "Advanced",
  "venue": "NeurIPS 2017",

  "paper_url": "https://arxiv.org/abs/1706.03762",
  "paper_source_type": "arXiv",
  "paper_source_host": "arXiv",
  "paper_verified": true,

  "code_url": "https://github.com/tensorflow/tensor2tensor",
  "code_source": "Official Project",
  "code_verified": true
}
```

Potential future fields:

```json
{
  "abstract": "",
  "why_it_matters": "",
  "prerequisites": [],
  "further_reading": [],
  "related_papers": [],
  "learning_paths": [],
  "added_at": "",
  "updated_at": ""
}
```

---

## 13. Free-Access Policy

BikinDashboard **tidak meng-host ulang PDF** pada V1.

Website hanya memberikan external link ke publicly accessible source yang telah dikurasi.

Preferred source order:

1. arXiv
2. Official Open Access
3. Open Proceedings
4. Author-hosted Copy
5. University / Institutional Repository

Publisher paywall tidak digunakan sebagai primary **Read Paper** apabila legal free-access copy tersedia.

Possible source labels:

- `arXiv`
- `Official OA`
- `Open Proceedings`
- `Author Copy`
- `University Copy`
- `Institutional Repository`

Contoh:

```text
Read Paper ↗
University Copy · CMU
```

Jika free full text belum dapat diverifikasi, jangan tampilkan tombol **Read Paper**.

---

## 14. arXiv Policy

arXiv dapat digunakan sebagai external reading destination.

Jika paper memiliki published venue dan arXiv version:

- `venue` menyimpan venue publikasi;
- `paper_url` dapat mengarah ke arXiv;
- `paper_source_type` = `arXiv`.

Contoh:

```text
Attention Is All You Need
NeurIPS 2017

Read Paper ↗
arXiv
```

Dengan demikian source gratis tidak mengubah informasi venue original.

---

## 15. Code Policy

Code source classification:

- Official Project
- Author Repository
- Research Lab
- Community Implementation
- None

V1 memprioritaskan:

1. Official Project
2. Author Repository
3. Research Lab

Community implementation hanya ditampilkan jika dikurasi secara manual dan harus diberi label **Community**.

Jika tidak ada repository authoritative:

- `code_url = null`
- tombol Code tidak ditampilkan.

Jangan mengisi repository random hanya agar setiap paper memiliki code.

---

## 16. Main Route

```text
/papers/
```

Main page structure:

```text
Navigation

Paper Library
Discover influential papers in data,
visualization, machine learning, and AI.

[ Search papers... ]

[ Category ] [ Topic ] [ Difficulty ] [ Year ] [ Has Code ]

150 curated papers
------------------------------------------------

Paper
Paper
Paper
...

Footer
```

---

## 17. Hero

### Heading

**Paper Library**

### Supporting Copy

> Discover influential papers in data, visualization, machine learning, and AI.

Optional supporting statistic:

> 150+ curated papers · Free reading links · Verified code

Hero harus compact.

Halaman ini merupakan browsing tool, bukan marketing landing page.

---

## 18. Search

Search dilakukan client-side dan instant.

Searchable fields:

- title
- authors
- category
- topics
- contribution
- year
- venue

Contoh query:

```text
transformer
```

dapat menemukan paper terkait Transformer di NLP maupun Computer Vision.

Tidak diperlukan submit button.

---

## 19. Filters

### Category

Contoh:

- All
- Data Visualization
- Statistics & Data Analysis
- Classical ML
- Deep Learning
- Computer Vision
- NLP
- LLM
- Generative AI
- Reinforcement Learning
- Time Series

### Topic

Contextual topic filter berdasarkan dataset.

Contoh untuk Data Visualization:

- Graphical Perception
- Color
- Dashboard
- Interaction
- Visualization Recommendation

### Difficulty

- Beginner
- Intermediate
- Advanced

### Importance

- Landmark
- Highly Influential
- Influential

### Year

Simple grouping:

- Before 2000
- 2000–2009
- 2010–2019
- 2020+

Tidak perlu range slider pada V1.

### Code

Toggle:

```text
Has Code
```

---

## 20. Sorting

Options:

- Curated order
- Oldest first
- Newest first
- A–Z

Default:

**Curated order**

---

## 21. Result Count

Selalu tampilkan jumlah hasil.

Contoh:

```text
148 papers
```

Setelah filter:

```text
18 papers
```

atau:

```text
18 papers in Data Visualization
```

---

## 22. Paper Card / List Item

Paper harus menggunakan compact information-dense layout.

Example:

```text
2017 · NLP

Attention Is All You Need

Ashish Vaswani et al.

Introduced the Transformer architecture
based primarily on attention.

Transformer   Attention
Landmark      Advanced

[ Read Paper ↗ ]  [ Code ↗ ]

arXiv · Code: Official
```

Required information:

- year;
- category;
- title;
- authors;
- contribution;
- topics;
- importance;
- difficulty;
- paper source;
- Read Paper CTA;
- Code CTA jika tersedia.

---

## 23. Interaction Behaviour

### Read Paper

Open external source:

```html
target="_blank"
rel="noopener noreferrer"
```

### Code

Perilaku sama.

### Missing Paper URL

Jangan tampilkan button.

### Missing Code

Jangan tampilkan button.

Hindari disabled buttons karena menambah visual noise.

---

## 24. Detail Page

Dedicated paper detail page **tidak wajib pada V1**.

Namun architecture harus memungkinkan future route:

```text
/papers/attention-is-all-you-need/
```

Potential detail content:

- summary;
- why it matters;
- prerequisites;
- key concepts;
- related papers;
- code;
- further reading;
- papers before/after it.

---

## 25. Further Reading

Future field `further_reading` berguna untuk memisahkan original paper dengan tutorial/explainer.

Contoh:

```text
Long Short-Term Memory
Hochreiter & Schmidhuber · 1997

Original Paper
[ Read Paper ]

Further Reading
Understanding Long Short-Term Memory Recurrent Neural Networks
[ Read Tutorial ]
```

Tutorial tidak boleh menggantikan original paper URL.

---

## 26. Learning Paths

Learning Paths bukan requirement MVP tetapi harus dipertimbangkan dalam data architecture.

Potential paths:

### Foundations of Machine Learning

Perceptron  
→ KNN  
→ SVM  
→ Bagging  
→ Random Forest  
→ Gradient Boosting

### Evolution of Computer Vision

LeNet  
→ AlexNet  
→ VGG  
→ ResNet  
→ Vision Transformer  
→ DINOv2  
→ Segment Anything

### Evolution of NLP & LLM

Neural Language Model  
→ Word2Vec  
→ Seq2Seq  
→ Attention  
→ Transformer  
→ BERT / GPT  
→ GPT-3  
→ RLHF  
→ LLaMA

### Visualization Recommendation

Graphical Perception  
→ Show Me  
→ Voyager  
→ Draco

### Modern Web Visualization

Polaris  
→ Protovis  
→ D3  
→ Vega-Lite

Learning Paths menjadi kandidat kuat V1.1/V2.

---

## 27. Relationship with Existing BikinDashboard Tools

Paper Library dapat memperkuat tool lain melalui contextual links.

Examples:

### Chart Guide

Related research:

- Graphical Perception
- Show Me
- Voyager
- Draco

### Color Palette

Related research:

- Rainbow Color Map (Still) Considered Harmful
- color perception papers

### Future Chart Recommender

Related research:

- Show Me
- Voyager
- Draco

Cross-linking tidak wajib V1, tetapi struktur data sebaiknya memungkinkan hal tersebut di masa depan.

---

## 28. Responsive Behaviour

### Desktop

Search/filter toolbar dapat horizontal.

Paper bersifat text-heavy sehingga layout disarankan:

- single-column list; atau
- maximum two-column cards.

Hindari 3–4 column card grid.

### Mobile

- single-column;
- filters dapat masuk drawer/panel;
- CTA cukup besar untuk touch;
- title dan contribution tetap mudah dibaca.

---

## 29. Visual Direction

Harus mengikuti visual language Tools BikinDashboard yang sudah ada:

- clean white background;
- strong typography;
- subtle borders;
- restrained colors;
- minimal shadow;
- balanced whitespace;
- compact information hierarchy.

Hindari:

- excessive rounded cards;
- decorative gradients;
- oversized hero;
- random illustrations;
- glassmorphism;
- AI-style marketing copy;
- excessive badges.

Paper Library harus terasa seperti **technical reference/library**.

---

## 30. Empty State

Example:

```text
No papers found for “xxxx”.

Try another keyword or clear your filters.

[ Clear filters ]
```

---

## 31. URL State

Search/filter state sebaiknya disimpan pada query parameters.

Examples:

```text
/papers/?category=data-visualization
```

```text
/papers/?category=nlp&code=true
```

```text
/papers/?q=transformer
```

Benefits:

- shareable;
- browser back/forward works;
- internal linking;
- SEO-friendly category entry points.

---

## 32. SEO

Page title:

> ML, AI & Data Visualization Paper Library — BikinDashboard Tools

Meta description:

> Explore curated landmark papers in data visualization, machine learning, statistics, and AI with free reading links and verified code repositories.

Paper titles harus berupa semantic/indexable HTML text.

Gunakan heading hierarchy yang benar.

---

## 33. Analytics

Track minimal events:

- `paper_search`
- `paper_filter`
- `paper_read_click`
- `paper_code_click`

Useful properties:

```text
paper_title
paper_year
paper_category
paper_source
code_source
```

Potential insights:

- most-read papers;
- most popular categories;
- common search queries;
- paper vs code click rate;
- topics with highest demand.

---

## 34. Accessibility

Minimum:

- keyboard accessible;
- visible focus states;
- semantic links/buttons;
- sufficient contrast;
- filter labels;
- external link indication;
- no meaning communicated by color alone.

---

## 35. Performance

Dengan ±150–200 records:

- load entire JSON once;
- filter client-side;
- no backend search;
- no Elasticsearch;
- no pagination API;
- no database required.

Architecture baru hanya perlu dipertimbangkan jika dataset berkembang menjadi ribuan records.

---

## 36. Data Quality Rules

Sebelum paper dipublish:

- title verified;
- authors verified;
- year verified;
- venue verified where available;
- contribution reviewed;
- category/topic reviewed;
- free URL tested;
- source type classified;
- free link verified;
- code ownership/source verified;
- duplicate checked;
- tutorial tidak menggantikan original paper;
- publisher paywall tidak digunakan jika legal free copy tersedia.

---

## 37. V1 Acceptance Criteria

V1 dianggap selesai jika:

- structured paper dataset berhasil dimuat;
- Data Visualization termasuk sebagai main category;
- search bekerja;
- category filter bekerja;
- topic filter bekerja;
- difficulty filter bekerja;
- year filter bekerja;
- Has Code filter bekerja;
- sorting bekerja;
- filter dapat di-reset;
- result count berubah sesuai filter;
- Read Paper hanya muncul untuk verified free link;
- Code hanya muncul untuk verified repository;
- source type terlihat;
- external links bekerja;
- desktop/mobile responsive;
- tidak ada PDF yang di-host ulang;
- existing Tools BikinDashboard tidak rusak;
- tidak ada JavaScript error.

---

## 38. Future Roadmap

### V1.1

- Learning Paths
- curated collections
- additional Data Visualization papers
- Statistics & Data Analysis expansion

### V1.2

- Paper Detail pages
- Related Papers
- Further Reading
- prerequisites / key concepts

### V2

Curated collections such as:

- Data Visualization Essentials
- 10 Papers Every Data Scientist Should Know
- Foundations of Machine Learning
- Understanding Transformers
- Computer Vision Essentials
- Generative AI Foundations

### V2+

If account functionality is ever introduced:

- bookmarks;
- reading list;
- read status;
- progress.

These are explicitly outside V1.

---

## 39. Product Principles

### Curated over comprehensive

Paper Library tidak perlu memiliki ribuan papers.

A smaller collection with reliable links and useful context is more valuable than a large uncurated database.

### Free-access first

User seharusnya tidak diarahkan ke paywall jika legal free-access version tersedia.

### Original source matters

Tutorial atau secondary article tidak menggantikan original paper.

### Code must be trustworthy

Jangan memberikan random GitHub repository hanya untuk memenuhi field Code.

### Useful before impressive

Search, filtering, link reliability, dan readability lebih penting daripada visual effects atau complex architecture.

---

## 40. MVP Decision Summary

**Included in V1**

- Paper catalog
- Data Visualization as first-class category
- Search
- Filters
- Sorting
- Free-access links
- Source provenance
- Verified code links
- Responsive design
- URL query state
- Basic analytics

**Deferred**

- Detail pages
- Learning Paths
- Further Reading UI
- Collections
- Accounts
- Bookmarks
- Reading progress
- AI features

The initial release should focus on making `/papers/` an excellent curated browsing experience.
