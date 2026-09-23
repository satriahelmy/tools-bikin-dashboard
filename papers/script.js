(function () {
  'use strict';

  const DATA_URL = '../data/papers.json';
  const allPapers = [];
  const state = {
    query: '',
    category: '',
    topic: '',
    difficulty: '',
    year: '',
    hasCode: false,
    sort: 'curated'
  };
  const validYears = new Set(['before-2000', '2000-2009', '2010-2019', '2020-plus']);
  const validSorts = new Set(['curated', 'oldest', 'newest', 'az']);

  const elements = {
    search: document.getElementById('paper-search'),
    clearSearch: document.getElementById('clear-search'),
    category: document.getElementById('category-filter'),
    topicField: document.getElementById('topic-field'),
    topic: document.getElementById('topic-filter'),
    difficulty: document.getElementById('difficulty-filter'),
    year: document.getElementById('year-filter'),
    code: document.getElementById('code-filter'),
    activeFilters: document.getElementById('active-filters'),
    resultsCount: document.getElementById('results-count'),
    sort: document.getElementById('sort-select'),
    list: document.getElementById('paper-list'),
    empty: document.getElementById('papers-empty'),
    clearEmpty: document.getElementById('clear-filters-empty'),
    error: document.getElementById('papers-error')
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
    state.topic = params.get('topic') || '';
    state.difficulty = params.get('difficulty') || '';
    state.year = params.get('year') || '';
    state.hasCode = params.get('code') === 'true';
    state.sort = params.get('sort') || 'curated';
  };

  const optionValues = (select) => new Set([...select.options].map((option) => option.value));

  const normalizeState = () => {
    if (!optionValues(elements.category).has(state.category)) state.category = '';
    if (!optionValues(elements.topic).has(state.topic)) state.topic = '';
    if (!optionValues(elements.difficulty).has(state.difficulty)) state.difficulty = '';
    if (!validYears.has(state.year)) state.year = '';
    if (!validSorts.has(state.sort)) state.sort = 'curated';
    if (elements.topicField.hidden) state.topic = '';
  };

  const syncControls = () => {
    elements.search.value = state.query;
    elements.category.value = state.category;
    elements.topic.value = state.topic;
    elements.difficulty.value = state.difficulty;
    elements.year.value = state.year;
    elements.code.checked = state.hasCode;
    elements.sort.value = state.sort;
    elements.clearSearch.hidden = !state.query;
  };

  const syncUrlState = () => {
    const url = new URL(window.location.href);
    ['q', 'category', 'topic', 'difficulty', 'year', 'code', 'sort'].forEach((key) => url.searchParams.delete(key));

    if (state.query.trim()) url.searchParams.set('q', state.query.trim());
    if (state.category) url.searchParams.set('category', state.category);
    if (state.topic) url.searchParams.set('topic', state.topic);
    if (state.difficulty) url.searchParams.set('difficulty', state.difficulty);
    if (state.year) url.searchParams.set('year', state.year);
    if (state.hasCode) url.searchParams.set('code', 'true');
    if (state.sort !== 'curated') url.searchParams.set('sort', state.sort);

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) window.history.replaceState({}, '', nextUrl);
  };

  const displayAuthors = (authors) => {
    if (!Array.isArray(authors) || authors.length === 0) return 'Author tidak tersedia';
    if (authors.length <= 3) return authors.join('; ');
    return `${authors.slice(0, 3).join('; ')} et al.`;
  };

  const displaySource = (paper) => {
    const source = paper.paper_source_type || paper.paper_access_status || 'Sumber tidak tersedia';
    return paper.paper_source_host ? `${source} · ${paper.paper_source_host}` : source;
  };

  const yearMatches = (year, range) => {
    if (!range) return true;
    if (range === 'before-2000') return year < 2000;
    if (range === '2000-2009') return year >= 2000 && year <= 2009;
    if (range === '2010-2019') return year >= 2010 && year <= 2019;
    if (range === '2020-plus') return year >= 2020;
    return true;
  };

  const searchText = (paper) => [
    paper.title,
    ...(paper.authors || []),
    paper.category,
    ...(paper.topics || []),
    paper.contribution,
    paper.year,
    paper.paper_source_type,
    paper.paper_source_host,
    paper.code_source
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
    const categories = [...new Set(allPapers.map((paper) => paper.category).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));
    populateSelect(elements.category, categories, 'Semua kategori');

    const availableDifficulties = ['Beginner', 'Intermediate', 'Advanced']
      .filter((value) => allPapers.some((paper) => paper.difficulty === value));
    populateSelect(elements.difficulty, availableDifficulties, 'Semua tingkat');

    const topics = [...new Set(allPapers.flatMap((paper) => Array.isArray(paper.topics) ? paper.topics : []))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    if (topics.length) {
      elements.topicField.hidden = false;
      populateSelect(elements.topic, topics, 'Semua topik');
    } else {
      elements.topicField.hidden = true;
    }
  }

  function getFilteredPapers() {
    const query = state.query.trim().toLowerCase();
    const filtered = allPapers.filter((paper) => {
      const topicValues = Array.isArray(paper.topics) ? paper.topics : [];
      return (!query || searchText(paper).includes(query))
        && (!state.category || paper.category === state.category)
        && (!state.topic || topicValues.includes(state.topic))
        && (!state.difficulty || paper.difficulty === state.difficulty)
        && yearMatches(Number(paper.year), state.year)
        && (!state.hasCode || paper.code_verified === true);
    });

    return filtered.sort((a, b) => {
      if (state.sort === 'oldest') return a.year - b.year || a.curated_order - b.curated_order;
      if (state.sort === 'newest') return b.year - a.year || a.curated_order - b.curated_order;
      if (state.sort === 'az') return a.title.localeCompare(b.title);
      return a.curated_order - b.curated_order;
    });
  }

  function updateResultCount(papers) {
    const context = state.category ? ` in ${state.category}` : '';
    elements.resultsCount.textContent = `${papers.length} papers${context}`;
  }

  function renderActiveFilters() {
    const filters = [];
    if (state.query) filters.push({ key: 'query', label: `Search: ${state.query}` });
    if (state.category) filters.push({ key: 'category', label: state.category });
    if (state.topic) filters.push({ key: 'topic', label: state.topic });
    if (state.difficulty) filters.push({ key: 'difficulty', label: state.difficulty });
    if (state.year) filters.push({ key: 'year', label: elements.year.selectedOptions[0].textContent });
    if (state.hasCode) filters.push({ key: 'hasCode', label: 'Has Code' });

    elements.activeFilters.innerHTML = filters.map((filter) => `
      <span class="papers-filter-chip">
        ${escapeHtml(filter.label)}
        <button type="button" data-clear-filter="${escapeHtml(filter.key)}" aria-label="Hapus filter ${escapeHtml(filter.label)}">×</button>
      </span>`).join('');

    if (filters.length > 1) {
      elements.activeFilters.insertAdjacentHTML('beforeend', '<button class="papers-clear-all" type="button" data-clear-all>Hapus semua</button>');
    }
  }

  function renderPaper(paper) {
    const paperUrl = paper.paper_verified ? safeExternalUrl(paper.paper_url) : null;
    const codeUrl = paper.code_verified ? safeExternalUrl(paper.code_url) : null;
    const topics = (paper.topics || []).slice(0, 3).map((topic) => `<span class="paper-topic">${escapeHtml(topic)}</span>`).join('');
    const actions = [
      paperUrl ? `<a class="bd-btn bd-btn-primary" data-paper-action="paper_read_click" data-paper-id="${escapeHtml(paper.id)}" data-paper-category="${escapeHtml(paper.category)}" href="${escapeHtml(paperUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Read Paper, membuka tab baru">Read Paper <span aria-hidden="true">↗</span></a>` : '',
      codeUrl ? `<a class="bd-btn bd-btn-secondary" data-paper-action="paper_code_click" data-paper-id="${escapeHtml(paper.id)}" data-paper-category="${escapeHtml(paper.category)}" href="${escapeHtml(codeUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Code, membuka tab baru">Code <span aria-hidden="true">↗</span></a>` : ''
    ].filter(Boolean).join('');
    const supportingMeta = [
      topics,
      paper.importance ? `<span>${escapeHtml(paper.importance)}</span>` : '',
      paper.difficulty ? `<span>${escapeHtml(paper.difficulty)}</span>` : ''
    ].filter(Boolean).join('<span aria-hidden="true">·</span>');

    return `
      <article class="paper-item">
        <header class="paper-item-header">
          <p class="paper-context">${escapeHtml(paper.year)} · ${escapeHtml(paper.category)}</p>
          ${paper.importance ? `<span class="paper-importance">${escapeHtml(paper.importance)}</span>` : ''}
        </header>
        <h2 class="paper-title">${escapeHtml(paper.title)}</h2>
        <p class="paper-authors">${escapeHtml(displayAuthors(paper.authors))}</p>
        <p class="paper-contribution">${escapeHtml(paper.contribution || 'Kontribusi paper belum tersedia.')}</p>
        ${supportingMeta ? `<div class="paper-supporting-meta">${supportingMeta}</div>` : ''}
        ${actions ? `<div class="paper-actions">${actions}</div>` : ''}
        <p class="paper-source">Source: ${escapeHtml(displaySource(paper))}${paper.code_verified && paper.code_source ? ` · Code: ${escapeHtml(paper.code_source)}` : ''}</p>
      </article>`;
  }

  function render({ updateUrl = true } = {}) {
    const papers = getFilteredPapers();
    if (updateUrl) syncUrlState();
    updateResultCount(papers);
    renderActiveFilters();
    elements.list.innerHTML = papers.map(renderPaper).join('');
    elements.list.setAttribute('aria-busy', 'false');
    elements.empty.hidden = papers.length !== 0;
    return papers;
  }

  function clearAllFilters() {
    state.query = '';
    state.category = '';
    state.topic = '';
    state.difficulty = '';
    state.year = '';
    state.hasCode = false;
    elements.search.value = '';
    elements.category.value = '';
    elements.topic.value = '';
    elements.difficulty.value = '';
    elements.year.value = '';
    elements.code.checked = false;
    elements.clearSearch.hidden = true;
    const papers = render();
    track('paper_filter', { filter_name: 'reset', filter_value: 'all', result_count: papers.length });
  }

  function clearFilter(key) {
    if (key === 'query') {
      state.query = '';
      elements.search.value = '';
      elements.clearSearch.hidden = true;
    } else if (key === 'hasCode') {
      state.hasCode = false;
      elements.code.checked = false;
    } else if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = '';
      if (elements[key]) elements[key].value = '';
    }
    const papers = render();
    if (key === 'query') {
      track('paper_search', { query_length: 0, result_count: papers.length });
    } else {
      track('paper_filter', { filter_name: key, filter_value: 'all', result_count: papers.length });
    }
  }

  function applyFilter(key, value) {
    state[key] = value;
    const papers = render();
    track('paper_filter', {
      filter_name: key,
      filter_value: value || 'all',
      result_count: papers.length
    });
  }

  function bindEvents() {
    elements.search.addEventListener('input', (event) => {
      state.query = event.target.value;
      elements.clearSearch.hidden = !state.query;
      const papers = render();
      if (state.query.trim()) {
        track('paper_search', {
          query_length: state.query.trim().length,
          result_count: papers.length
        });
      }
    });
    elements.clearSearch.addEventListener('click', () => clearFilter('query'));
    elements.category.addEventListener('change', (event) => applyFilter('category', event.target.value));
    elements.topic.addEventListener('change', (event) => applyFilter('topic', event.target.value));
    elements.difficulty.addEventListener('change', (event) => applyFilter('difficulty', event.target.value));
    elements.year.addEventListener('change', (event) => applyFilter('year', event.target.value));
    elements.code.addEventListener('change', (event) => applyFilter('hasCode', event.target.checked));
    elements.sort.addEventListener('change', (event) => { state.sort = event.target.value; render(); });
    elements.activeFilters.addEventListener('click', (event) => {
      const button = event.target.closest('[data-clear-filter]');
      if (button) clearFilter(button.dataset.clearFilter);
      if (event.target.closest('[data-clear-all]')) clearAllFilters();
    });
    elements.clearEmpty.addEventListener('click', clearAllFilters);
    elements.list.addEventListener('click', (event) => {
      const link = event.target.closest('[data-paper-action]');
      if (!link) return;
      track(link.dataset.paperAction, {
        paper_id: link.dataset.paperId,
        category: link.dataset.paperCategory
      });
    });
  }

  async function loadPapers() {
    try {
      const response = await fetch(DATA_URL, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Paper data request failed: ${response.status}`);
      const papers = await response.json();
      if (!Array.isArray(papers)) throw new Error('Paper data is not an array');
      allPapers.push(...papers);
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
      elements.error.hidden = false;
    }
  }

  readUrlState();
  bindEvents();
  window.addEventListener('popstate', () => {
    readUrlState();
    if (!allPapers.length) return;
    normalizeState();
    syncControls();
    render({ updateUrl: false });
  });
  loadPapers();
})();
