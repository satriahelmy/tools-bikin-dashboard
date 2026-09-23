# Design — Paper Library

**Product:** Tools BikinDashboard  
**Feature:** Paper Library  
**Route:** `/papers/`  
**Status:** Draft  
**Design relationship:** Child of the existing Tools BikinDashboard design system

---

## 1. Design Principle

Paper Library **must inherit the existing Tools BikinDashboard visual system**.

This document is **not** a new design system and must not be interpreted as permission to redesign the parent product.

> Reuse the existing shared shell, navigation, design tokens, typography, buttons, spacing conventions, container widths, responsive behavior, and footer wherever possible.

The purpose of this document is only to define **page-specific layout and interaction decisions** required by Paper Library.

If this document conflicts with an existing shared design convention, **the existing Tools BikinDashboard convention wins**, unless a Paper Library-specific requirement is functionally necessary.

---

## 2. Do Not Redesign the Parent

Do not replace or independently redesign:

- shared navigation;
- global header behavior;
- logo treatment;
- typography system;
- global color tokens;
- shared buttons;
- shared form controls where reusable;
- global container conventions;
- global spacing philosophy;
- footer;
- mobile navigation;
- shared focus states;
- global responsive breakpoints.

Prefer existing CSS variables and shared classes over new one-off values.

Paper Library should look like a natural page inside Tools BikinDashboard, not a separate microsite.

---

## 3. Page Character

The page should feel like a:

**curated technical library / reference catalog**

rather than:

- academic journal portal;
- AI startup landing page;
- card-heavy SaaS dashboard;
- marketing page;
- generic resource directory.

Desired qualities:

- clean;
- calm;
- information-dense but readable;
- easy to scan;
- credible;
- practical;
- minimal decoration.

The content itself should be the visual focus.

---

## 4. Page Structure

Recommended hierarchy:

```text
Shared Navigation

Main Container
├── Compact Page Header
│   ├── Eyebrow / optional context
│   ├── Paper Library
│   └── Supporting copy
│
├── Discovery Controls
│   ├── Search
│   └── Filters
│
├── Results Toolbar
│   ├── Result count
│   └── Sort
│
├── Paper List
│   ├── Paper Item
│   ├── Paper Item
│   └── ...
│
└── Empty State

Shared Footer
```

Do not add unnecessary sections between the header and the actual library.

The user should reach search and papers quickly.

---

## 5. Container

Use the same main content container as existing Tools BikinDashboard pages.

Do not introduce a special full-width layout unless required for responsive filters.

Paper content is text-heavy, so line lengths must remain comfortable.

Avoid excessively wide paper cards where contribution text becomes difficult to read.

---

## 6. Page Header

The header should be compact.

### Title

```text
Paper Library
```

### Supporting copy

```text
Discover influential papers in data, visualization,
machine learning, and AI.
```

Optional small metadata:

```text
150+ curated papers · Free reading links · Verified code
```

Do not use:

- giant display typography;
- decorative illustration;
- gradient background;
- hero image;
- oversized empty space;
- multiple marketing CTAs.

This is a utility page.

---

## 7. Search

Search is the primary discovery control.

Placeholder:

```text
Search papers, authors, topics...
```

Requirements:

- visually prominent without becoming oversized;
- instant client-side search;
- clear focus state;
- optional search icon;
- clear button when text exists;
- same form language as existing Tools BikinDashboard controls.

Do not create a large search “hero” similar to a search engine homepage.

---

## 8. Filters

Desktop filters should sit near the search field and remain easy to scan.

Initial filters:

- Category
- Topic
- Difficulty
- Year
- Has Code

Importance may be included if the UI remains uncluttered.

Prefer existing select/dropdown/control styles.

Avoid turning every possible value into permanently visible pills.

### Active Filters

Active filters may appear as compact removable chips below the control row.

Example:

```text
Data Visualization ×    Has Code ×
```

Only display active chips.

Include:

```text
Clear all
```

when multiple filters are active.

---

## 9. Mobile Filters

On narrow screens, avoid wrapping five large controls into several messy rows.

Recommended pattern:

```text
[ Search papers... ]

[ Filters ]       [ Sort ]
```

`Filters` opens a drawer, sheet, or existing mobile panel pattern if the parent project already has one.

Do not introduce a new drawer component if an equivalent shared interaction already exists.

Show active filter count:

```text
Filters (2)
```

---

## 10. Results Toolbar

Place directly above the paper list.

Left:

```text
148 papers
```

or contextually:

```text
18 papers in Data Visualization
```

Right:

```text
Sort: Curated
```

Sorting options:

- Curated
- Oldest
- Newest
- A–Z

Keep this toolbar visually quiet.

---

## 11. Paper List — Preferred Layout

Use a **single-column list** as the default.

Reason:

Paper entries contain title, authors, contribution, topics, metadata, source, and actions. A dense card grid would reduce readability.

Each paper item should behave more like a refined library record than a marketing card.

Recommended:

```text
------------------------------------------------------------

2017 · NLP                                      LANDMARK

Attention Is All You Need

Ashish Vaswani et al.

Introduced the Transformer architecture based primarily
on attention.

Transformer   Attention                         Advanced

[ Read Paper ↗ ]   [ Code ↗ ]

arXiv · Official code

------------------------------------------------------------
```

A two-column layout may be tested at very large widths, but single-column is preferred for V1.

---

## 12. Paper Item Visual Hierarchy

Priority:

### 1 — Paper Title

Strongest element in the item.

### 2 — Contribution

Short explanation of why the paper matters.

### 3 — Year / Category / Authors

Important metadata but visually secondary.

### 4 — Topics / Difficulty / Importance

Supporting metadata.

### 5 — Source provenance

Quiet but visible.

### 6 — Actions

Clear and easy to access without dominating the record.

---

## 13. Paper Title

Titles can be long.

Requirements:

- allow natural wrapping;
- do not truncate on desktop;
- maximum 2–3 lines on mobile only if absolutely necessary;
- use parent typography scale;
- avoid oversized headings.

The title itself should not necessarily be the external paper link because explicit `Read Paper` CTA makes the destination clearer.

---

## 14. Authors

Show authors in compact form.

For long author lists:

```text
Ashish Vaswani et al.
```

Full authors may later be available in detail pages/tooltips, but this is not required in V1.

Do not create large author avatar systems.

---

## 15. Contribution

Contribution should normally be one concise sentence.

Example:

```text
Introduced the Transformer architecture based primarily on attention.
```

Avoid verbose AI-generated summaries.

The copy should sound editorial and factual.

---

## 16. Topics

Topics should be subtle.

Example:

```text
Transformer
Attention
```

Use the existing tag/chip language if one exists.

Do not give every tag a different color.

Do not create excessive badge clutter.

Target approximately 1–3 visible topics per paper.

---

## 17. Importance & Difficulty

Examples:

```text
Landmark
Advanced
```

These are metadata, not promotional badges.

Use restrained styling.

Importance may receive slightly stronger emphasis than difficulty, but neither should compete with the paper title.

---

## 18. Read Paper CTA

Primary functional action:

```text
Read Paper ↗
```

Use existing button/link treatment.

The external-link indicator should make behavior clear.

If no verified free-access link exists, do not render the action.

Do not show a disabled button.

---

## 19. Code CTA

Secondary action:

```text
Code ↗
```

Only display when code has been verified.

Potential source labels:

```text
Official
Author
Research Lab
Community
```

Community implementations must explicitly say `Community`.

Do not imply that all code repositories are official.

---

## 20. Source Provenance

Free-access provenance should remain visible but visually quiet.

Examples:

```text
arXiv
```

```text
University Copy · CMU
```

```text
Author Copy · Yann LeCun
```

```text
Institutional Repository · UCL
```

This increases trust and explains why BikinDashboard links somewhere other than the canonical publisher.

Do not use source provenance as a large badge.

---

## 21. Category Treatment

`Data Visualization` should feel equal to ML/AI categories, not like an appended miscellaneous section.

Possible categories include:

```text
Data Visualization
Statistics & Data Analysis
Classical ML
Deep Learning
Computer Vision
NLP
LLM
Generative AI
...
```

Do not visually privilege AI categories simply because they contain more papers.

---

## 22. Data Visualization Topics

Example topic vocabulary:

```text
Graphical Perception
Visual Encoding
Color
Interaction
Dashboard
Visual Analytics
Visualization Recommendation
Visualization Grammar
Misleading Visualization
Web Visualization
```

These use the same topic component as other categories.

No special DataViz-only visual treatment is required.

---

## 23. Empty State

Keep minimal.

Example:

```text
No papers found for “radar chart”.

Try another keyword or clear your filters.

[ Clear filters ]
```

No illustration required.

---

## 24. Loading State

Because data is local/static JSON, loading should normally be near-instant.

Avoid skeleton-heavy UI.

If a loading state is needed, a subtle text or minimal list placeholder is sufficient.

---

## 25. Error State

If `papers.json` fails to load:

```text
Paper Library couldn't be loaded.

Please refresh the page and try again.
```

Do not leave an empty page.

Log useful developer information to the console without exposing technical details to users.

---

## 26. Query State

Filters and search should map to URL query parameters.

Examples:

```text
/papers/?category=data-visualization
/papers/?q=transformer
/papers/?category=nlp&code=true
```

When loading a URL with query parameters, controls should reflect the current state.

Back/forward navigation should behave predictably.

---

## 27. Responsive Priorities

### Desktop

Priority:

1. scan titles quickly;
2. compare metadata;
3. access paper/code;
4. filter without losing context.

### Mobile

Priority:

1. readable titles;
2. compact metadata;
3. accessible actions;
4. filters without horizontal overflow.

Avoid horizontal scrolling for normal page content.

---

## 28. Spacing

Use existing spacing tokens.

Within a paper item:

- metadata should sit relatively close to the title;
- contribution should have enough separation to read as explanatory text;
- actions should be separated from descriptive content;
- paper-to-paper spacing should make records distinguishable without giant gaps.

Avoid both extremes:

- cramped metadata;
- oversized whitespace between every element.

---

## 29. Borders & Surfaces

Prefer subtle separators or existing border tokens.

Paper items do not need floating cards with heavy shadows.

Preferred visual model:

```text
flat page
+ subtle border/separator
+ strong typography hierarchy
```

If existing Tools pages use cards, reuse their established card treatment rather than inventing a new one.

---

## 30. Color

Inherit parent color tokens.

Use accent color primarily for:

- interactive links;
- focus;
- selected filters;
- important actions.

Do not color-code every category.

Do not create a rainbow category system.

Metadata should mostly use neutral colors.

---

## 31. Typography

Inherit existing Tools BikinDashboard typography.

Do not import a Paper Library-specific font.

Hierarchy should be achieved using:

- existing font sizes;
- weight;
- spacing;
- neutral text colors.

Avoid excessive uppercase labels.

---

## 32. Iconography

Reuse existing icon set/pattern if available.

Potential icons:

- Search
- Filter
- External link
- Code / GitHub
- Chevron

Icons are supportive, not decorative.

Do not introduce an unrelated icon library solely for this page.

---

## 33. Accessibility

Maintain parent accessibility standards.

Specific requirements:

- keyboard-operable filters;
- visible focus states;
- semantic external links;
- clear labels;
- sufficient contrast;
- no color-only metadata meaning;
- comfortable touch targets;
- accessible filter drawer behavior;
- screen-reader-friendly result count updates where practical.

---

## 34. Motion

Minimal.

Allowed:

- subtle dropdown/drawer transition;
- standard hover/focus transition;
- small state changes.

Avoid:

- animated cards;
- staggered page-load animations;
- decorative parallax;
- unnecessary motion on filtering.

Search/filter results should update quickly and quietly.

---

## 35. SEO / Semantic Structure

Paper content should remain real HTML text.

Recommended structure:

```html
<main>
  <header>...</header>

  <section aria-label="Paper discovery controls">...</section>

  <section aria-label="Paper results">
    <article>...</article>
    <article>...</article>
  </section>
</main>
```

Do not render paper titles to canvas/images.

---

## 36. Analytics Interaction Considerations

Clickable targets should allow tracking without changing their expected behavior.

Events:

```text
paper_search
paper_filter
paper_read_click
paper_code_click
```

Analytics must not delay external navigation.

---

## 37. Relationship to Existing Tools

Paper Library should visually sit alongside:

- Color Palette
- Chart Guide
- Resource Hub
- Data Quality Checker
- other Tools BikinDashboard utilities

Do not make Paper Library's navigation treatment more prominent than sibling tools unless the parent homepage intentionally does so.

Future contextual cross-links may appear inside existing tools.

Example:

```text
Chart Guide
Related research → Graphical Perception
```

But cross-link UI is outside V1.

---

## 38. Future Detail Page

If introduced later:

```text
/papers/{slug}/
```

it should inherit the same Paper Library visual language.

Potential structure:

```text
Back to Paper Library

Paper Title
Authors · Year · Venue

Why it matters
Summary
Key concepts

[ Read Paper ] [ Code ]

Related Papers
Further Reading
```

Do not design this page during V1 implementation unless explicitly requested.

---

## 39. Future Learning Paths

Potential Learning Paths:

- Foundations of Machine Learning
- Evolution of Computer Vision
- Evolution of NLP & LLM
- Visualization Recommendation
- Modern Web Visualization
- Generative AI Foundations

These should eventually use existing paper records rather than duplicate paper data.

Learning Path UI is not part of V1.

---

## 40. Anti-Patterns

Explicitly avoid:

### New microsite styling

Paper Library must not look disconnected from Tools BikinDashboard.

### Card soup

Do not place every piece of metadata inside its own pill/card.

### AI slop

Avoid:

- generic gradient hero;
- floating abstract shapes;
- excessive rounded rectangles;
- fake testimonials;
- decorative sparkles;
- verbose promotional copy.

### Badge overload

A paper should not visually become:

```text
[2017] [NLP] [LANDMARK] [ADVANCED]
[TRANSFORMER] [ATTENTION] [ARXIV] [OFFICIAL]
```

Use typography and grouping instead.

### Overengineering

Do not add:

- backend;
- database;
- framework migration;
- heavy search library;

unless existing architecture requires it.

---

## 41. Implementation Guidance

Before implementing Paper Library:

1. inspect existing shared navigation;
2. inspect existing design tokens;
3. inspect reusable buttons and controls;
4. inspect container widths;
5. inspect existing responsive patterns;
6. inspect existing tool page spacing;
7. reuse those patterns.

Only add Paper Library-specific CSS when an equivalent shared pattern does not already exist.

Suggested page-specific files should follow the project's existing conventions rather than forcing a new structure.

---

## 42. Design Acceptance Criteria

The design is successful when:

- Paper Library clearly belongs to Tools BikinDashboard;
- existing global shell remains unchanged;
- search is immediately discoverable;
- filters are usable without dominating the page;
- users can scan many paper titles efficiently;
- contribution text remains readable;
- Read Paper and Code actions are obvious;
- source provenance is understandable;
- metadata does not create visual clutter;
- Data Visualization feels like a core category;
- mobile layout has no horizontal overflow;
- page does not resemble a generic AI-generated SaaS interface;
- existing tools remain visually and functionally unaffected.

---

## 43. Final Design Direction

Paper Library should extend the existing Tools BikinDashboard system rather than establish its own visual identity.

The page-specific hierarchy is:

**Compact Header → Search & Filters → Result Context → Paper Records**

The strongest visual element is the **paper title**, not decorative UI.

The strongest product behavior is **fast discovery and reliable outbound access**, not visual novelty.
