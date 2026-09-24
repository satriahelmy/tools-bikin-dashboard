(function () {
  'use strict';

  const DATA_URL = '../data/books.json';
  const allBooks = [];
  const state = {
    query: '',
    category: '',
    level: '',
    format: '',
    tools: ''
  };
  const stateKeys = ['q', 'category', 'level', 'format', 'tools'];

  const elements = {
    search: document.getElementById('book-search'),
    clearSearch: document.getElementById('clear-search'),
    category: document.getElementById('category-filter'),
    level: document.getElementById('level-filter'),
    format: document.getElementById('format-filter'),
    tools: document.getElementById('tools-filter'),
    activeFilters: document.getElementById('active-filters'),
    resultsCount: document.getElementById('results-count'),
    clearFilters: document.getElementById('clear-filters'),
    list: document.getElementById('book-list'),
    empty: document.getElementById('books-empty'),
    clearEmpty: document.getElementById('clear-filters-empty'),
    error: document.getElementById('books-error')
  };

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const safeExternalUrl = (value) => {
    try {
      const url = new URL(value);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch (_error) {
      return null;
    }
  };

  const track = (eventName, parameters = {}) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, parameters);
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['event', eventName, parameters]);
  };

  const readUrlState = () => {
    const params = new URLSearchParams(window.location.search);
    state.query = params.get('q') || '';
    state.category = params.get('category') || '';
    state.level = params.get('level') || '';
    state.format = params.get('format') || '';
    state.tools = params.get('tools') || '';
  };

  const optionValues = (select) => new Set([...select.options].map((option) => option.value));

  const normalizeState = () => {
    if (!optionValues(elements.category).has(state.category)) state.category = '';
    if (!optionValues(elements.level).has(state.level)) state.level = '';
    if (!optionValues(elements.format).has(state.format)) state.format = '';
    if (!optionValues(elements.tools).has(state.tools)) state.tools = '';
  };

  const syncControls = () => {
    elements.search.value = state.query;
    elements.category.value = state.category;
    elements.level.value = state.level;
    elements.format.value = state.format;
    elements.tools.value = state.tools;
    elements.clearSearch.hidden = !state.query;
  };

  const syncUrlState = () => {
    const url = new URL(window.location.href);
    stateKeys.forEach((key) => url.searchParams.delete(key));

    if (state.query.trim()) url.searchParams.set('q', state.query.trim());
    if (state.category) url.searchParams.set('category', state.category);
    if (state.level) url.searchParams.set('level', state.level);
    if (state.format) url.searchParams.set('format', state.format);
    if (state.tools) url.searchParams.set('tools', state.tools);

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) window.history.replaceState({}, '', nextUrl);
  };

  const searchText = (book) => [
    book.title,
    book.authors,
    book.category,
    book.level,
    book.tools,
    book.format,
    book.accessType,
    book.editionStatus,
    book.note
  ].join(' ').toLowerCase();

  function populateSelect(select, values, emptyLabel) {
    const currentValue = select.value;
    select.innerHTML = `<option value="">${escapeHtml(emptyLabel)}</option>`;
    values.forEach((value) => {
      select.insertAdjacentHTML('beforeend', `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`);
    });
    if (values.includes(currentValue)) select.value = currentValue;
  }

  function populateFilters() {
    const distinctValues = (field) => [...new Set(allBooks.map((book) => book[field]).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));

    populateSelect(elements.category, distinctValues('category'), 'Semua kategori');
    populateSelect(elements.level, distinctValues('level'), 'Semua level');
    populateSelect(elements.format, distinctValues('format'), 'Semua format');
    populateSelect(elements.tools, distinctValues('tools'), 'Semua tools / bahasa');
  }

  function getFilteredBooks() {
    const query = state.query.trim().toLowerCase();
    return allBooks.filter((book) => (!query || searchText(book).includes(query))
      && (!state.category || book.category === state.category)
      && (!state.level || book.level === state.level)
      && (!state.format || book.format === state.format)
      && (!state.tools || book.tools === state.tools));
  }

  function hasActiveFilters() {
    return Boolean(state.query || state.category || state.level || state.format || state.tools);
  }

  function updateResultCount(books) {
    elements.resultsCount.textContent = `${books.length} buku`;
  }

  function renderActiveFilters() {
    const filters = [];
    if (state.query) filters.push({ key: 'query', label: `Search: ${state.query}` });
    if (state.category) filters.push({ key: 'category', label: state.category });
    if (state.level) filters.push({ key: 'level', label: state.level });
    if (state.format) filters.push({ key: 'format', label: state.format });
    if (state.tools) filters.push({ key: 'tools', label: state.tools });

    elements.activeFilters.innerHTML = filters.map((filter) => `
      <span class="books-filter-chip">
        ${escapeHtml(filter.label)}
        <button type="button" data-clear-filter="${escapeHtml(filter.key)}" aria-label="Hapus filter ${escapeHtml(filter.label)}">×</button>
      </span>`).join('');
  }

  function renderBook(book) {
    const bookUrl = book.verified ? safeExternalUrl(book.url) : null;
    const hasEditionNote = book.editionStatus && book.editionStatus.toLowerCase() !== 'final / official';
    const action = bookUrl
      ? `<a class="bd-btn bd-btn-primary" data-book-action="book_read_click" data-book-id="${escapeHtml(book.id)}" href="${escapeHtml(bookUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Baca buku: ${escapeHtml(book.title)}, membuka tab baru">Baca buku <span aria-hidden="true">→</span></a>`
      : '';

    return `
      <article class="book-card">
        <header class="book-card-header">
          <p class="book-category">${escapeHtml(book.category)}</p>
          ${book.verified ? '<span class="book-verified">Free &amp; verified</span>' : ''}
        </header>
        <h2 class="book-title">${escapeHtml(book.title)}</h2>
        <p class="book-authors">${escapeHtml(book.authors)}</p>
        <dl class="book-meta">
          <div><dt>Level</dt><dd>${escapeHtml(book.level)}</dd></div>
          <div><dt>Format</dt><dd>${escapeHtml(book.format)}</dd></div>
          <div><dt>Akses</dt><dd>${escapeHtml(book.accessType)}</dd></div>
          <div><dt>Tools / bahasa</dt><dd>${escapeHtml(book.tools)}</dd></div>
        </dl>
        ${hasEditionNote ? `<p class="book-edition">Edition: ${escapeHtml(book.editionStatus)}</p>` : ''}
        ${action ? `<div class="book-actions">${action}</div>` : ''}
      </article>`;
  }

  function render({ updateUrl = true } = {}) {
    const books = getFilteredBooks();
    if (updateUrl) syncUrlState();
    updateResultCount(books);
    renderActiveFilters();
    elements.clearFilters.hidden = !hasActiveFilters();
    elements.list.innerHTML = books.map(renderBook).join('');
    elements.list.setAttribute('aria-busy', 'false');
    elements.empty.hidden = books.length !== 0;
    return books;
  }

  function clearAllFilters() {
    state.query = '';
    state.category = '';
    state.level = '';
    state.format = '';
    state.tools = '';
    syncControls();
    const books = render();
    track('book_filter', { filter_name: 'reset', filter_value: 'all', result_count: books.length });
  }

  function clearFilter(key) {
    if (key === 'query') state.query = '';
    else if (Object.prototype.hasOwnProperty.call(state, key)) state[key] = '';
    syncControls();
    const books = render();
    track(key === 'query' ? 'book_search' : 'book_filter', {
      filter_name: key,
      filter_value: 'all',
      result_count: books.length
    });
  }

  function applyFilter(key, value) {
    state[key] = value;
    const books = render();
    track('book_filter', {
      filter_name: key,
      filter_value: value || 'all',
      result_count: books.length
    });
  }

  function bindEvents() {
    elements.search.addEventListener('input', (event) => {
      state.query = event.target.value;
      elements.clearSearch.hidden = !state.query;
      const books = render();
      if (state.query.trim()) track('book_search', {
        query_length: state.query.trim().length,
        result_count: books.length
      });
    });
    elements.clearSearch.addEventListener('click', () => clearFilter('query'));
    elements.category.addEventListener('change', (event) => applyFilter('category', event.target.value));
    elements.level.addEventListener('change', (event) => applyFilter('level', event.target.value));
    elements.format.addEventListener('change', (event) => applyFilter('format', event.target.value));
    elements.tools.addEventListener('change', (event) => applyFilter('tools', event.target.value));
    elements.clearFilters.addEventListener('click', clearAllFilters);
    elements.clearEmpty.addEventListener('click', clearAllFilters);
    elements.activeFilters.addEventListener('click', (event) => {
      const button = event.target.closest('[data-clear-filter]');
      if (button) clearFilter(button.dataset.clearFilter);
    });
    elements.list.addEventListener('click', (event) => {
      const link = event.target.closest('[data-book-action]');
      if (!link) return;
      track(link.dataset.bookAction, { book_id: link.dataset.bookId });
    });
  }

  async function loadBooks() {
    try {
      const response = await fetch(DATA_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Book data request failed: ${response.status}`);
      const payload = await response.json();
      if (!payload || !Array.isArray(payload.books)) throw new Error('Book data does not contain a books array');
      allBooks.push(...payload.books);
      populateFilters();
      normalizeState();
      syncControls();
      render();
    } catch (error) {
      console.error(error);
      elements.resultsCount.textContent = '';
      elements.list.innerHTML = '';
      elements.list.setAttribute('aria-busy', 'false');
      elements.empty.hidden = true;
      elements.clearFilters.hidden = true;
      elements.error.hidden = false;
    }
  }

  readUrlState();
  bindEvents();
  window.addEventListener('popstate', () => {
    readUrlState();
    if (!allBooks.length) return;
    normalizeState();
    syncControls();
    render({ updateUrl: false });
  });
  loadBooks();
})();
