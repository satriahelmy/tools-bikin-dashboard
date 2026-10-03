"""Generate one shareable static detail page for every Book Library record."""

from __future__ import annotations

import argparse
import html
import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CANONICAL_ROOT = "https://bikindashboard.com/book-library/books/"


def text(value: object) -> str:
    return str(value).strip() if value is not None else ""


def slug_base(title: str) -> str:
    normalized = unicodedata.normalize("NFKD", title)
    ascii_title = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_title.lower()).strip("-")
    return slug or "book"


def slug_map(books: list[dict[str, object]]) -> dict[str, str]:
    bases = [slug_base(text(book.get("title"))) for book in books]
    counts: dict[str, int] = {}
    for base in bases:
        counts[base] = counts.get(base, 0) + 1

    result = {}
    for book, base in zip(books, bases):
        book_id = text(book.get("id"))
        result[book_id] = f"{base}-{book_id}" if counts[base] > 1 else base
    return result


def metadata_rows(book: dict[str, object]) -> str:
    fields = [
        ("Level", text(book.get("level"))),
        ("Format", text(book.get("format"))),
        ("Akses", text(book.get("accessType"))),
        ("Tools / bahasa", text(book.get("tools"))),
    ]
    rows = "".join(
        f"<div><dt>{html.escape(label)}</dt><dd>{html.escape(value)}</dd></div>"
        for label, value in fields
        if value
    )
    return f'<dl class="book-meta book-detail-meta">{rows}</dl>' if rows else ""


def render_page(book: dict[str, object], slug: str) -> str:
    title = text(book.get("title"))
    authors = text(book.get("authors"))
    category = text(book.get("category"))
    access_type = text(book.get("accessType"))
    book_url = text(book.get("url"))
    description = f"{title} — {category}. {access_type}."
    canonical = f"{CANONICAL_ROOT}{slug}/"
    edition_status = text(book.get("editionStatus"))
    has_edition_note = edition_status and edition_status.lower() != "final / official"
    note = text(book.get("note"))

    action = ""
    if book.get("verified") is True and book_url:
        action = (
            f'<a class="bd-btn bd-btn-primary" href="{html.escape(book_url)}" '
            f'target="_blank" rel="noopener noreferrer" '
            f'aria-label="Baca buku: {html.escape(title)}, membuka tab baru">'
            'Baca buku <span aria-hidden="true">→</span></a>'
        )

    edition = (
        f'<p class="book-edition">Edition: {html.escape(edition_status)}</p>'
        if has_edition_note
        else ""
    )
    source_note = (
        f'<p class="book-detail-note"><span class="bd-label">Catatan sumber</span>'
        f"{html.escape(note)}</p>"
        if note
        else ""
    )

    # JSON-LD uses only source-backed values already present in books.json.
    structured_data = json.dumps(
        {
            "@context": "https://schema.org",
            "@type": "Book",
            "name": title,
            "author": [{"@type": "Person", "name": author.strip()} for author in authors.split(";") if author.strip()],
            "url": canonical,
            "isAccessibleForFree": True,
        },
        ensure_ascii=False,
    ).replace("</", "<\\/")

    return f'''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{html.escape(title)} — Book Library | BikinDashboard</title>
  <meta name="description" content="{html.escape(description)}">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="book">
  <meta property="og:title" content="{html.escape(title)}">
  <meta property="og:description" content="{html.escape(description)}">
  <meta property="og:url" content="{canonical}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="../../../assets/favicon.svg?v=2" type="image/svg+xml">
  <meta name="theme-color" content="#2f5fb0">
  <script type="application/ld+json">{structured_data}</script>
  <script src="../../../assets/analytics.js?v=1"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../style.css?v=1.1">
  <link rel="stylesheet" href="../../../assets/design-system.css?v=1.8" data-bd-design-system>
  <link rel="stylesheet" href="../../../assets/nav.css?v=1.6" data-bd-nav-css>
  <script src="../../../assets/nav.js?v=1.4" defer></script>
</head>
<body class="bd-with-nav book-library-page book-detail-page">
  <header class="bd-topbar">
    <div class="bd-topbar-inner">
      <div class="bd-topbar-left">
        <a href="../../" class="bd-back">← Book Library</a>
        <span class="bd-topbar-divider"></span>
        <h1 class="bd-title">Book Library</h1>
      </div>
    </div>
  </header>

  <main class="bd-main">
    <div class="bd-container">
      <article class="book-detail">
        <header class="book-detail-header">
          <div class="book-card-header">
            <p class="book-category">{html.escape(category)}</p>
            {'<span class="book-verified">Free &amp; verified</span>' if book.get('verified') is True else ''}
          </div>
          <h2 class="book-detail-title">{html.escape(title)}</h2>
          <p class="book-authors">{html.escape(authors)}</p>
        </header>

        {metadata_rows(book)}
        {edition}
        {source_note}
        {f'<div class="book-actions book-detail-actions">{action}</div>' if action else ''}
        <p class="book-detail-back"><a class="bd-link" href="../../">← Kembali ke Book Library</a></p>
      </article>
    </div>
  </main>

  <footer class="bd-footer">
    <p class="bd-hint">Gratis untuk kamu yang kerja dengan data · <a href="https://bikindashboard.com" class="bd-link">bikindashboard.com</a> · <a href="../../../privacy.html" class="bd-link">Kebijakan Privasi</a></p>
  </footer>
</body>
</html>
'''


def update_sitemap(sitemap_path: Path, slugs: list[str]) -> None:
    content = sitemap_path.read_text(encoding="utf-8")
    lines = [line for line in content.splitlines() if "/book-library/books/" not in line]
    detail_lines = [
        f"  <url><loc>{CANONICAL_ROOT}{slug}/</loc></url>" for slug in slugs
    ]
    insert_at = next((index for index, line in enumerate(lines) if "</urlset>" in line), len(lines))
    lines[insert_at:insert_at] = detail_lines
    sitemap_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def build(data_path: Path, output_root: Path, sitemap_path: Path) -> dict[str, int]:
    payload = json.loads(data_path.read_text(encoding="utf-8"))
    books = payload.get("books")
    if not isinstance(books, list):
        raise ValueError("Book Library JSON does not contain a books array")

    slugs = slug_map(books)
    output_root.mkdir(parents=True, exist_ok=True)
    for book in books:
        slug = slugs[text(book.get("id"))]
        page_dir = output_root / slug
        page_dir.mkdir(parents=True, exist_ok=True)
        (page_dir / "index.html").write_text(
            render_page(book, slug), encoding="utf-8"
        )

    update_sitemap(sitemap_path, list(slugs.values()))
    return {"pages": len(books), "slugs": len(set(slugs.values()))}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", type=Path, default=ROOT / "data/books.json")
    parser.add_argument("--output", type=Path, default=ROOT / "book-library/books")
    parser.add_argument("--sitemap", type=Path, default=ROOT / "sitemap.xml")
    args = parser.parse_args()
    print(json.dumps(build(args.data, args.output, args.sitemap), ensure_ascii=False))


if __name__ == "__main__":
    main()
