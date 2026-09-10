# bikindashboard.com — Tools Design System

> Dokumen ini adalah single source of truth untuk semua tools di bikindashboard.com.
> Setiap kali build tool baru, attach file ini ke Cursor dan ikuti semua aturan di sini.

---

## Brand Identity

**Nama:** bikindashboard.com
**Tagline:** Belajar data viz, dari nol sampai jago.
**Audience:** Data analyst & pemula Indonesia yang belajar Tableau, Power BI, Python.
**Tone:** Profesional tapi approachable. Tidak kaku, tidak norak. Seperti mentor yang sabar.
**Aesthetic:** Clean minimal. Banyak whitespace. Tipografi kuat. Tidak ada dekorasi yang tidak perlu.

---

## CSS Variables

Taruh di `:root` di setiap file HTML tool. Wajib dipakai, tidak boleh hardcode warna.

```css
:root {
  /* Brand Colors */
  --bd-primary: #2563EB;        /* biru utama — CTA, link, accent */
  --bd-primary-hover: #1D4ED8;  /* biru gelap untuk hover */
  --bd-primary-light: #EFF6FF;  /* biru muda untuk background badge */
  --bd-primary-text: #1E40AF;   /* biru gelap untuk teks di atas --bd-primary-light */

  /* Neutral */
  --bd-bg: #FFFFFF;
  --bd-bg-secondary: #F8FAFC;   /* background halaman, section alt */
  --bd-bg-tertiary: #F1F5F9;    /* input background, chip background */
  --bd-border: #E2E8F0;         /* border default */
  --bd-border-strong: #CBD5E1;  /* border hover, focus */

  /* Text */
  --bd-text: #0F172A;           /* teks utama */
  --bd-text-secondary: #475569; /* label, hint, caption */
  --bd-text-tertiary: #94A3B8;  /* placeholder, disabled */

  /* Semantic */
  --bd-success: #16A34A;
  --bd-success-light: #F0FDF4;
  --bd-warning: #B45309;
  --bd-warning-light: #FFFBEB;
  --bd-danger: #DC2626;
  --bd-danger-light: #FEF2F2;

  /* Spacing */
  --bd-radius-sm: 6px;
  --bd-radius-md: 8px;
  --bd-radius-lg: 12px;
  --bd-radius-xl: 16px;
  --bd-radius-full: 9999px;

  /* Shadow */
  --bd-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --bd-shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04);

  /* Typography */
  --bd-font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --bd-font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}
```

---

## Typography

### Font

Gunakan **Plus Jakarta Sans** dari Google Fonts. Load di setiap file:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

Untuk kode/hex/data: gunakan **JetBrains Mono**.

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Scale

```css
/* Page title */
.bd-title      { font-size: 20px; font-weight: 600; color: var(--bd-text); line-height: 1.3; }

/* Section heading */
.bd-heading    { font-size: 15px; font-weight: 600; color: var(--bd-text); }

/* Body */
.bd-body       { font-size: 14px; font-weight: 400; color: var(--bd-text); line-height: 1.6; }

/* Label / caption */
.bd-label      { font-size: 12px; font-weight: 500; color: var(--bd-text-secondary); letter-spacing: 0.03em; }

/* Hint / placeholder */
.bd-hint       { font-size: 12px; font-weight: 400; color: var(--bd-text-tertiary); }

/* Monospace (hex, code) */
.bd-mono       { font-family: var(--bd-font-mono); font-size: 12px; }
```

### Aturan
- Tidak ada ALL CAPS kecuali label kecil dengan letter-spacing
- Tidak ada font-weight di atas 600
- Heading selalu sentence case, bukan Title Case

---

## Layout

### Tool Page Template

Setiap tool punya struktur HTML yang sama:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Nama Tool] — bikindashboard.com</title>
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>/* CSS di sini */</style>
</head>
<body>

  <!-- Top Bar -->
  <header class="bd-topbar">
    <div class="bd-topbar-inner">
      <div class="bd-topbar-left">
        <a href="https://tools.bikindashboard.com" class="bd-back">← Tools</a>
        <span class="bd-topbar-divider"></span>
        <h1 class="bd-title">[Nama Tool]</h1>
      </div>
      <div class="bd-topbar-right">
        <!-- action buttons tool-specific -->
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="bd-main">
    <div class="bd-container">
      <!-- tool content -->
    </div>
  </main>

  <!-- Optional: Footer hint -->
  <footer class="bd-footer">
    <p class="bd-hint">Tool gratis dari <a href="https://bikindashboard.com" class="bd-link">bikindashboard.com</a></p>
  </footer>

  <script>/* JS di sini */</script>
</body>
</html>
```

### Layout CSS

```css
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--bd-font);
  background: var(--bd-bg-secondary);
  color: var(--bd-text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Top Bar */
.bd-topbar {
  background: var(--bd-bg);
  border-bottom: 1px solid var(--bd-border);
  position: sticky;
  top: 0;
  z-index: 10;
}
.bd-topbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bd-topbar-left { display: flex; align-items: center; gap: 12px; }
.bd-topbar-right { display: flex; align-items: center; gap: 8px; }
.bd-topbar-divider { width: 1px; height: 16px; background: var(--bd-border); }

.bd-back {
  font-size: 13px;
  color: var(--bd-text-secondary);
  text-decoration: none;
}
.bd-back:hover { color: var(--bd-text); }

/* Main */
.bd-main { flex: 1; padding: 24px; }
.bd-container { max-width: 1100px; margin: 0 auto; }

/* Footer */
.bd-footer {
  text-align: center;
  padding: 16px;
  border-top: 1px solid var(--bd-border);
  background: var(--bd-bg);
}
.bd-link { color: var(--bd-primary); text-decoration: none; }
.bd-link:hover { text-decoration: underline; }
```

---

## Components

### Button

```html
<!-- Primary -->
<button class="bd-btn bd-btn-primary">Generate</button>

<!-- Secondary -->
<button class="bd-btn bd-btn-secondary">Export</button>

<!-- Ghost (outline) -->
<button class="bd-btn bd-btn-ghost">Copy CSS</button>

<!-- Small -->
<button class="bd-btn bd-btn-secondary bd-btn-sm">Copy</button>
```

```css
.bd-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 14px;
  border-radius: var(--bd-radius-md);
  font-family: var(--bd-font);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.15s;
  white-space: nowrap;
}
.bd-btn:active { transform: scale(0.97); }

.bd-btn-primary {
  background: var(--bd-primary);
  color: #fff;
  border-color: var(--bd-primary);
}
.bd-btn-primary:hover { background: var(--bd-primary-hover); border-color: var(--bd-primary-hover); }

.bd-btn-secondary {
  background: var(--bd-bg);
  color: var(--bd-text);
  border-color: var(--bd-border-strong);
}
.bd-btn-secondary:hover { background: var(--bd-bg-tertiary); }

.bd-btn-ghost {
  background: transparent;
  color: var(--bd-text-secondary);
  border-color: var(--bd-border);
}
.bd-btn-ghost:hover { background: var(--bd-bg-tertiary); color: var(--bd-text); }

.bd-btn-sm { height: 28px; padding: 0 10px; font-size: 12px; }
```

---

### Input

```html
<input type="text" class="bd-input" placeholder="Ketik sesuatu...">
<input type="text" class="bd-input bd-input-sm" placeholder="Small input">
```

```css
.bd-input {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--bd-border);
  border-radius: var(--bd-radius-md);
  font-family: var(--bd-font);
  font-size: 14px;
  color: var(--bd-text);
  background: var(--bd-bg);
  width: 100%;
  transition: border-color 0.15s;
}
.bd-input::placeholder { color: var(--bd-text-tertiary); }
.bd-input:focus { outline: none; border-color: var(--bd-primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
.bd-input-sm { height: 30px; font-size: 13px; }
```

---

### Card

```html
<div class="bd-card">
  <div class="bd-card-header">
    <h2 class="bd-heading">Judul Section</h2>
  </div>
  <div class="bd-card-body">
    <!-- konten -->
  </div>
</div>
```

```css
.bd-card {
  background: var(--bd-bg);
  border: 1px solid var(--bd-border);
  border-radius: var(--bd-radius-lg);
  overflow: hidden;
}
.bd-card-header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--bd-border);
  background: var(--bd-bg-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bd-card-body { padding: 16px; }
```

---

### Badge

```html
<span class="bd-badge bd-badge-blue">Tableau</span>
<span class="bd-badge bd-badge-orange">Power BI</span>
<span class="bd-badge bd-badge-green">Free</span>
<span class="bd-badge bd-badge-gray">Beta</span>
```

```css
.bd-badge {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: var(--bd-radius-full);
  font-size: 11px;
  font-weight: 500;
}
.bd-badge-blue   { background: var(--bd-primary-light); color: var(--bd-primary-text); }
.bd-badge-orange { background: #FFF7ED; color: #B45309; }
.bd-badge-green  { background: var(--bd-success-light); color: var(--bd-success); }
.bd-badge-gray   { background: var(--bd-bg-tertiary); color: var(--bd-text-secondary); }
```

---

### Toast Notification

```html
<div class="bd-toast" id="toast"></div>
```

```css
.bd-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(60px);
  background: var(--bd-text);
  color: var(--bd-bg);
  padding: 8px 16px;
  border-radius: var(--bd-radius-md);
  font-size: 13px;
  font-weight: 500;
  opacity: 0;
  transition: all 0.2s cubic-bezier(.4,0,.2,1);
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  box-shadow: var(--bd-shadow-md);
}
.bd-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

```js
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
```

---

### Section Label

Dipakai sebagai label di atas setiap section dalam tool.

```html
<div class="bd-section-label">Export format</div>
```

```css
.bd-section-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--bd-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 8px;
}
```

---

### Divider

```html
<div class="bd-divider"></div>
```

```css
.bd-divider {
  height: 1px;
  background: var(--bd-border);
  margin: 20px 0;
}
```

---

### Keyboard Shortcut Hint

```html
<div class="bd-kbd-hint">
  Tekan <kbd class="bd-kbd">Space</kbd> untuk generate ulang
</div>
```

```css
.bd-kbd-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--bd-text-tertiary);
}
.bd-kbd {
  display: inline-block;
  padding: 2px 6px;
  border: 1px solid var(--bd-border-strong);
  border-radius: var(--bd-radius-sm);
  font-family: var(--bd-font);
  font-size: 11px;
  color: var(--bd-text-secondary);
  background: var(--bd-bg-secondary);
}
```

---

## Spacing Rules

Gunakan nilai ini secara konsisten. Jangan pakai nilai arbitrary.

| Token | Value | Dipakai untuk |
|-------|-------|---------------|
| 4px | `0.25rem` | gap icon kecil |
| 8px | `0.5rem` | gap dalam komponen |
| 12px | `0.75rem` | gap antar elemen sejenis |
| 16px | `1rem` | padding card body, gap section |
| 20px | `1.25rem` | margin antar section |
| 24px | `1.5rem` | padding page, margin besar |
| 32px | `2rem` | jarak antar blok besar |

---

## Do's and Don'ts

### ✅ Do
- Pakai CSS variables, tidak hardcode warna
- Pakai font Plus Jakarta Sans untuk semua teks
- Pakai JetBrains Mono untuk kode, hex, data
- Hover state selalu ada di elemen interaktif
- Semua tombol punya `:active` scale(0.97)
- Toast selalu muncul setelah aksi copy/download
- Loading state kalau ada proses async
- Semua tool punya back link ke `tools.bikindashboard.com`

### ❌ Don't
- Jangan pakai warna di luar CSS variables
- Jangan pakai font selain yang ditentukan
- Jangan pakai border-radius > 16px kecuali untuk pill/badge
- Jangan pakai box-shadow yang terlalu tebal
- Jangan pakai animasi yang lebih dari 300ms
- Jangan pakai ALL CAPS untuk heading
- Jangan skip topbar — setiap tool wajib punya topbar
- Jangan pakai framework eksternal (React, Vue, dll) — vanilla JS only

---

## URL Architecture

```
tools.bikindashboard.com/          ← landing page daftar semua tools
color.bikindashboard.com/          ← Color Palette Generator (multi-page)
chart.bikindashboard.com/          ← Chart Guide (Laravel)
data.bikindashboard.com/           ← Dummy Data Generator
contrast.bikindashboard.com/       ← Color Contrast Checker
kpi.bikindashboard.com/            ← KPI Card Builder
```

---

## File Structure per Subdomain

### color.bikindashboard.com (static HTML)
```
/
  index.html        ← Generator utama + export
  image.html        ← Import gambar + ekstrak warna dominan (K-means)
  explore.html      ← Galeri palette dikurasi
  palettes.json     ← Data palette untuk explore page
```

### tools lain (static HTML, single page)
```
/
  index.html
```

### chart.bikindashboard.com (Laravel)
```
/
  (Laravel project structure)
```

Setiap subdomain adalah tool mandiri. Semua CSS dan JS inline di dalam file HTML masing-masing (kecuali Laravel yang punya struktur sendiri).

---

## Topbar Navigation (Multi-page Tool)

Untuk tool yang punya beberapa halaman seperti `color.bikindashboard.com`, topbar punya tab navigasi:

```html
<header class="bd-topbar">
  <div class="bd-topbar-inner">
    <div class="bd-topbar-left">
      <a href="https://tools.bikindashboard.com" class="bd-back">← Tools</a>
      <span class="bd-topbar-divider"></span>
      <h1 class="bd-title">Color Palette Generator</h1>
    </div>
    <nav class="bd-tabs">
      <a href="/index.html" class="bd-tab active">Generator</a>
      <a href="/image.html" class="bd-tab">From Image</a>
      <a href="/explore.html" class="bd-tab">Explore</a>
    </nav>
  </div>
</header>
```

```css
.bd-tabs { display: flex; gap: 2px; }
.bd-tab {
  height: 52px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--bd-text-secondary);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
}
.bd-tab:hover { color: var(--bd-text); }
.bd-tab.active { color: var(--bd-primary); border-bottom-color: var(--bd-primary); }
```

---

## Cara Pakai di Cursor

Setiap kali build tool baru, mulai prompt dengan:

```
Attach: design.md

Build [nama tool] untuk [subdomain].bikindashboard.com sebagai [single file index.html / multi-page].
Ikuti semua aturan di design.md: CSS variables, typography, layout template, komponen, URL architecture.
Stack: vanilla HTML, CSS, JavaScript. Tidak ada framework eksternal.
```

Contoh untuk Color Palette Generator:
```
Attach: design.md

Build Color Palette Generator untuk color.bikindashboard.com.
Halaman ini adalah index.html (tab Generator).
Ikuti semua aturan di design.md termasuk topbar dengan tab navigasi (Generator, From Image, Explore).
Stack: vanilla HTML, CSS, JavaScript. Tidak ada framework eksternal.
```
