"""Generate the static Data Challenge catalog and detail pages from public data."""

from __future__ import annotations

import argparse
import csv
import html
import json
import re
from pathlib import Path, PurePosixPath
from posixpath import relpath


ROOT = Path(__file__).resolve().parents[1]
CANONICAL_ROOT = "https://bikindashboard.com/challenge/"
SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
DICTIONARY_FIELDS = ("column", "type", "description")


def text(value: object) -> str:
    return str(value).strip() if value is not None else ""


def escaped(value: object) -> str:
    return html.escape(text(value), quote=True)


def safe_project_path(value: object) -> Path:
    """Resolve a repo-relative public asset path without allowing traversal."""
    path = PurePosixPath(text(value))
    if not text(value) or path.is_absolute() or ".." in path.parts:
        raise ValueError(f"Expected a safe repo-relative path, received: {value!r}")

    resolved = (ROOT / Path(*path.parts)).resolve()
    if resolved != ROOT and ROOT not in resolved.parents:
        raise ValueError(f"Path is outside the project root: {value!r}")
    if not resolved.is_file():
        raise FileNotFoundError(f"Public challenge asset does not exist: {value}")
    return resolved


def relative_asset(page_directory: str, project_path: object) -> str:
    path = PurePosixPath(text(project_path))
    return relpath(path.as_posix(), page_directory or ".")


def page_shell(
    title: str,
    description: str,
    canonical: str,
    base_path: str,
    body: str,
    topbar_title: str,
    topbar_back_href: str,
    topbar_back_label: str,
    challenge_id: str = "",
    challenge_slug: str = "",
) -> str:
    assets = relpath("assets", base_path or ".")
    page_style = relpath("challenge/style.css", base_path or ".")
    page_script = relpath("challenge/analytics.js", base_path or ".")
    privacy = relpath("privacy.html", base_path or ".")
    challenge_attributes = (
        f' data-challenge-id="{escaped(challenge_id)}" data-challenge-slug="{escaped(challenge_slug)}"'
        if challenge_id and challenge_slug
        else ""
    )
    return f'''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{escaped(title)}</title>
  <meta name="description" content="{escaped(description)}">
  <link rel="canonical" href="{escaped(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{escaped(title)}">
  <meta property="og:description" content="{escaped(description)}">
  <meta property="og:url" content="{escaped(canonical)}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="{assets}/favicon.svg?v=2" type="image/svg+xml">
  <meta name="theme-color" content="#2f5fb0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{assets}/tokens.css">
  <link rel="stylesheet" href="{assets}/design-system.css?v=1.8" data-bd-design-system>
  <link rel="stylesheet" href="{assets}/nav.css?v=1.6" data-bd-nav-css>
  <link rel="stylesheet" href="{page_style}">
  <script src="{assets}/analytics.js?v=1"></script>
  <script src="{assets}/nav.js?v=1.4" defer></script>
  <script src="{page_script}" defer></script>
</head>
<body class="bd-with-nav challenge-page"{challenge_attributes}>
  <header class="bd-topbar">
    <div class="bd-topbar-inner">
      <div class="bd-topbar-left">
        <a href="{escaped(topbar_back_href)}" class="bd-back">← {escaped(topbar_back_label)}</a>
        <span class="bd-topbar-divider"></span>
        <h1 class="bd-title">{escaped(topbar_title)}</h1>
      </div>
    </div>
  </header>
{body}
  <footer class="bd-footer">
    <p class="bd-hint">Gratis untuk kerja data · <a href="https://bikindashboard.com">bikindashboard.com</a> · <a href="{privacy}">Kebijakan Privasi</a></p>
  </footer>
</body>
</html>
'''


def validate_dataset(challenge: dict[str, object]) -> tuple[Path, Path, list[dict[str, str]]]:
    slug = text(challenge.get("slug"))
    if not SLUG_PATTERN.fullmatch(slug):
        raise ValueError(f"Invalid challenge slug: {slug!r}")

    dataset = challenge.get("dataset")
    dictionary = challenge.get("dataDictionary")
    if not isinstance(dataset, dict) or not isinstance(dictionary, dict):
        raise ValueError(f"Challenge {slug} must define dataset and dataDictionary objects")

    dataset_path = safe_project_path(dataset.get("file"))
    dictionary_path = safe_project_path(dictionary.get("file"))
    overview = dataset.get("overview") or []
    if not isinstance(overview, list):
        raise ValueError(f"Dataset overview for {slug} must be an array")
    distinct_columns = {
        text(metric.get("distinctColumn"))
        for metric in overview
        if isinstance(metric, dict) and text(metric.get("distinctColumn"))
    }

    with dictionary_path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None or not set(DICTIONARY_FIELDS).issubset(reader.fieldnames):
            raise ValueError(
                f"Dictionary for {slug} must include {', '.join(DICTIONARY_FIELDS)}"
            )
        dictionary_rows = [
            {key: text(row.get(key)) for key in DICTIONARY_FIELDS}
            for row in reader
        ]

    if not dictionary_rows or any(not row["column"] for row in dictionary_rows):
        raise ValueError(f"Dictionary for {slug} is empty or has a blank column name")

    with dataset_path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        headers = reader.fieldnames or []
        dictionary_columns = [row["column"] for row in dictionary_rows]
        if not headers or headers != dictionary_columns:
            raise ValueError(f"Dictionary columns do not match the dataset for {slug}")
        missing_metric_columns = distinct_columns.difference(headers)
        if missing_metric_columns:
            raise ValueError(
                f"Overview references missing dataset columns for {slug}: "
                f"{', '.join(sorted(missing_metric_columns))}"
            )

        row_count = 0
        distinct_values = {column: set() for column in distinct_columns}
        for row in reader:
            row_count += 1
            if None in row or any(value is None for value in row.values()):
                raise ValueError(f"Dataset contains a row with a mismatched field count: {slug}")
            for column, values in distinct_values.items():
                values.add(text(row.get(column)))

    expected_rows = dataset.get("rows")
    if expected_rows is not None and int(expected_rows) != row_count:
        raise ValueError(
            f"Public metadata mismatch for {slug}.rows: "
            f"expected {expected_rows}, found {row_count}"
        )
    for metric in overview:
        if not isinstance(metric, dict) or metric.get("value") is None:
            continue
        if metric.get("source") == "row_count":
            actual_value = row_count
        elif text(metric.get("distinctColumn")):
            actual_value = len(distinct_values[text(metric["distinctColumn"])])
        else:
            continue
        if int(metric["value"]) != actual_value:
            label = text(metric.get("label")) or text(metric.get("distinctColumn"))
            raise ValueError(
                f"Public metadata mismatch for {slug}.{label}: "
                f"expected {metric['value']}, found {actual_value}"
            )

    return dataset_path, dictionary_path, dictionary_rows


def render_catalog(challenges: list[dict[str, object]]) -> str:
    cards = []
    for challenge in challenges:
        slug = text(challenge.get("slug"))
        dataset = challenge["dataset"]
        skills = challenge.get("skills") or []
        skill_text = " · ".join(escaped(skill) for skill in skills if text(skill))
        cards.append(f'''      <article class="challenge-catalog-item">
        <p class="challenge-number">#{escaped(challenge.get("id"))}</p>
        <div class="challenge-catalog-copy">
          <p class="challenge-catalog-meta">{escaped(challenge.get("difficulty"))} · {int(dataset["rows"]):,} rows</p>
          <h2><a href="{escaped(slug)}/">{escaped(challenge.get("title"))}</a></h2>
          <p>{escaped(challenge.get("catalogDescription"))}</p>
          <p class="challenge-skills">{skill_text}</p>
        </div>
        <a class="challenge-catalog-link" href="{escaped(slug)}/">View Challenge <span aria-hidden="true">→</span></a>
      </article>''')

    body = f'''  <main class="bd-main">
    <div class="bd-container">
      <header class="challenge-catalog-header bd-tool-intro">
        <p class="bd-label">PRACTICE · DATA CHALLENGE</p>
        <h2>Latihan analisis data</h2>
        <p class="bd-body">Gunakan kasus bisnis dan dataset untuk menemukan insight, lalu komunikasikan hasil analisismu melalui dashboard.</p>
      </header>
      <section class="challenge-catalog-list" aria-label="Daftar Data Challenge">
{chr(10).join(cards)}
      </section>
    </div>
  </main>'''
    return page_shell(
        "Data Challenge | BikinDashboard",
        "Latihan analisis data dengan kasus bisnis dan dataset yang realistis. Download dataset gratis dan buat dashboard dengan tools pilihanmu.",
        CANONICAL_ROOT,
        "challenge",
        body,
        "Data Challenge",
        "../index.html",
        "Semua tool",
    )


def render_dictionary(
    rows: list[dict[str, str]], download_url: str, download_name: str
) -> str:
    body_rows = "\n".join(
        "          <tr>"
        f"<th scope=\"row\"><code>{escaped(row['column'])}</code></th>"
        f"<td>{escaped(row['type'])}</td>"
        f"<td>{escaped(row['description'])}</td>"
        "</tr>"
        for row in rows
    )
    return f'''      <section class="challenge-section" id="data-dictionary" aria-labelledby="dictionary-heading">
        <div class="challenge-section-heading">
          <h2 id="dictionary-heading">Data Dictionary</h2>
          <a data-challenge-event="challenge_dictionary_downloaded" data-file-format="csv" href="{escaped(download_url)}" download="{escaped(download_name)}">Download CSV</a>
        </div>
        <div class="challenge-table-wrap" tabindex="0" role="region" aria-label="Data dictionary; scroll horizontally to view all columns">
          <table>
            <thead><tr><th scope="col">Column</th><th scope="col">Type</th><th scope="col">Description</th></tr></thead>
            <tbody>
{body_rows}
            </tbody>
          </table>
        </div>
      </section>'''


def render_overview_metrics(dataset: dict[str, object]) -> str:
    metrics = dataset.get("overview") or []
    rendered = []
    for metric in metrics:
        if not isinstance(metric, dict):
            continue
        display_value = escaped(display_metric(metric.get("value", "")))
        rendered.append(
            f"            <div><dt>{escaped(metric.get('label'))}</dt><dd>{display_value}</dd></div>"
        )
    return "\n".join(rendered)


def display_metric(value: object) -> str:
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return f"{value:,}"
    return text(value)


def render_detail(challenge: dict[str, object], dictionary_rows: list[dict[str, str]]) -> str:
    slug = text(challenge.get("slug"))
    dataset = challenge["dataset"]
    dataset_url = relative_asset(f"challenge/{slug}", dataset["file"])
    dictionary_url = relative_asset(f"challenge/{slug}", challenge["dataDictionary"]["file"])
    dataset_name = PurePosixPath(text(dataset["file"])).name
    dictionary_name = PurePosixPath(text(challenge["dataDictionary"]["file"])).name
    canonical = f"{CANONICAL_ROOT}{slug}/"
    skills = challenge.get("skills") or []
    questions = challenge.get("questions") or []
    raw_context = challenge.get("businessContext") or []
    context_items = [raw_context] if isinstance(raw_context, str) else raw_context
    context = "\n".join(f"        <p>{escaped(paragraph)}</p>" for paragraph in context_items)
    question_items = "\n".join(f"          <li>{escaped(question)}</li>" for question in questions)
    dictionary_html = render_dictionary(dictionary_rows, dictionary_url, dictionary_name)
    overview_metrics = render_overview_metrics(dataset)
    summary_parts = [dataset.get("period"), dataset.get("format"), dataset.get("currency"), *(dataset.get("summary") or [])]
    overview_summary = " · ".join(escaped(part) for part in summary_parts if text(part))
    secondary_metric = next(
        (
            metric for metric in dataset.get("overview", [])
            if isinstance(metric, dict) and metric.get("source") != "row_count"
        ),
        None,
    )
    header_metadata = [text(challenge.get("difficulty")), f"{int(dataset['rows']):,} rows"]
    if secondary_metric:
        header_metadata.append(
            f"{display_metric(secondary_metric.get('value'))} {text(secondary_metric.get('label')).lower()}"
        )
    if text(dataset.get("period")):
        header_metadata.append(text(dataset["period"]))
    header_metadata_text = " · ".join(escaped(value) for value in header_metadata if value)
    questions_section = ""
    if questions:
        questions_section = f'''        <section class="challenge-section" aria-labelledby="questions-heading">
          <h2 id="questions-heading">Questions to Explore</h2>
          <p>{escaped(challenge.get("questionsIntro"))}</p>
          <ol class="challenge-questions">
{question_items}
          </ol>
        </section>'''
    stretch = challenge.get("stretchChallenge")
    stretch_section = ""
    if isinstance(stretch, dict) and (text(stretch.get("heading")) or text(stretch.get("text"))):
        stretch_section = f'''        <aside class="challenge-stretch" aria-labelledby="stretch-heading">
          <h2 id="stretch-heading">{escaped(stretch.get("heading"))}</h2>
          <p>{escaped(stretch.get("text"))}</p>
        </aside>'''
    share = challenge.get("share")
    share_section = ""
    if isinstance(share, dict):
        share_lines = []
        if text(share.get("hashtag")):
            share_lines.append(
                f"<p>Sudah selesai? Bagikan dashboard atau analisismu dan gunakan <strong>{escaped(share['hashtag'])}</strong>.</p>"
            )
        if text(share.get("mention")):
            share_lines.append(
                f"<p>Mention <strong>{escaped(share['mention'])}</strong> agar hasilmu bisa kami lihat.</p>"
            )
        if share_lines:
            share_section = f'''        <section class="challenge-section" aria-labelledby="share-heading">
          <h2 id="share-heading">Share Your Work</h2>
          {''.join(share_lines)}
        </section>'''

    body = f'''  <main class="bd-main">
    <div class="bd-container">
      <article class="challenge-brief">
        <header class="challenge-header bd-tool-intro">
          <p class="challenge-eyebrow bd-label">CHALLENGE #{escaped(challenge.get("id"))}</p>
          <h2>{escaped(challenge.get("title"))}</h2>
          <p class="challenge-meta">{header_metadata_text}</p>
          <p class="challenge-intro bd-body">{escaped(challenge.get("catalogDescription"))}</p>
          <div class="challenge-actions">
            <a class="bd-btn bd-btn-primary" data-challenge-event="challenge_dataset_downloaded" data-file-format="{escaped(text(dataset.get('format', 'csv')).lower())}" href="{escaped(dataset_url)}" download="{escaped(dataset_name)}">Download Dataset</a>
            <a class="bd-btn bd-btn-secondary" data-challenge-event="challenge_dictionary_opened" href="#data-dictionary">View Data Dictionary</a>
          </div>
        </header>

        <section class="challenge-section" aria-labelledby="objective-heading">
          <h2 id="objective-heading">Your Objective</h2>
          <p>{escaped(challenge.get("objective"))}</p>
          <p>{escaped(challenge.get("objectiveNote"))}</p>
        </section>

        <section class="challenge-section" aria-labelledby="context-heading">
          <h2 id="context-heading">Business Context</h2>
{context}
          <p class="challenge-grain"><strong>Dataset grain</strong><br>{escaped(challenge.get("grain"))}</p>
        </section>

        <section class="challenge-section" aria-labelledby="dataset-heading">
          <h2 id="dataset-heading">Dataset Overview</h2>
          <dl class="challenge-stats">
{overview_metrics}
          </dl>
          <p>{overview_summary}</p>
        </section>

{questions_section}

{dictionary_html}

        <section class="challenge-section" aria-labelledby="deliverable-heading">
          <h2 id="deliverable-heading">Your Deliverable</h2>
          <p>{escaped(challenge.get("deliverable"))}</p>
          <p>{escaped(challenge.get("deliverableTools"))}</p>
          <p class="challenge-skills">Skills: {" · ".join(escaped(skill) for skill in skills)}</p>
        </section>

{stretch_section}

{share_section}

        <p class="challenge-back"><a href="../">← Back to Data Challenge</a></p>
      </article>
    </div>
  </main>'''
    return page_shell(
        f"{text(challenge.get('title'))} — Data Challenge | BikinDashboard",
        "Latihan analisis data dan dashboard menggunakan dataset transaksi coffee shop dua tahun. Download dataset gratis dan temukan insight versimu sendiri.",
        canonical,
        f"challenge/{slug}",
        body,
        "Data Challenge",
        "../",
        "Katalog challenge",
        text(challenge.get("id")),
        slug,
    )


def update_sitemap(sitemap_path: Path, slugs: list[str]) -> None:
    content = sitemap_path.read_text(encoding="utf-8")
    lines = [line for line in content.splitlines() if "/challenge/" not in line]
    challenge_urls = [
        f"  <url><loc>{CANONICAL_ROOT}</loc></url>",
        *[f"  <url><loc>{CANONICAL_ROOT}{slug}/</loc></url>" for slug in slugs],
    ]
    insert_at = next((index for index, line in enumerate(lines) if "</urlset>" in line), len(lines))
    lines[insert_at:insert_at] = challenge_urls
    sitemap_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def build(data_path: Path, output_root: Path, sitemap_path: Path) -> dict[str, int]:
    payload = json.loads(data_path.read_text(encoding="utf-8"))
    challenges = payload.get("challenges")
    if not isinstance(challenges, list) or not challenges:
        raise ValueError("Challenge JSON must contain a non-empty challenges array")

    slugs = [text(challenge.get("slug")) for challenge in challenges]
    ids = [text(challenge.get("id")) for challenge in challenges]
    if len(set(slugs)) != len(slugs) or len(set(ids)) != len(ids):
        raise ValueError("Challenge IDs and slugs must be unique")

    validated = [(challenge, validate_dataset(challenge)) for challenge in challenges]
    output_root.mkdir(parents=True, exist_ok=True)
    (output_root / "index.html").write_text(
        render_catalog(challenges), encoding="utf-8"
    )
    for challenge, (_dataset_path, _dictionary_path, dictionary_rows) in validated:
        slug = text(challenge.get("slug"))
        page_dir = output_root / slug
        page_dir.mkdir(parents=True, exist_ok=True)
        (page_dir / "index.html").write_text(
            render_detail(challenge, dictionary_rows), encoding="utf-8"
        )

    update_sitemap(sitemap_path, slugs)
    return {"catalogs": 1, "detail_pages": len(challenges), "dictionary_columns": sum(len(item[1][2]) for item in validated)}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", type=Path, default=ROOT / "data/challenges/challenges.json")
    parser.add_argument("--output", type=Path, default=ROOT / "challenge")
    parser.add_argument("--sitemap", type=Path, default=ROOT / "sitemap.xml")
    args = parser.parse_args()
    print(json.dumps(build(args.data, args.output, args.sitemap), ensure_ascii=False))


if __name__ == "__main__":
    main()
