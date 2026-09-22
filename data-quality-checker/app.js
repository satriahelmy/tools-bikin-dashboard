(function (window, document) {
  'use strict';

  const namespace = window.BDDataQuality = window.BDDataQuality || {};
  const state = {
    file: null,
    fileInfo: null,
    analysis: null,
    startedAt: 0,
    busy: false,
    table: {
      query: '',
      filter: 'all',
      sort: 'name',
      direction: 'asc',
      selectedColumn: null
    }
  };

  const elements = {};
  const numberFormatter = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 });

  function now() {
    return typeof window.performance?.now === 'function' ? window.performance.now() : Date.now();
  }

  function track(eventName, details) {
    if (typeof namespace.analytics?.track === 'function') namespace.analytics.track(eventName, details);
  }

  function cacheElements() {
    [
      'dropzone', 'fileInput', 'sheetPicker', 'sheetSelect', 'analyzeSheetBtn',
      'uploadState', 'uploadStateText', 'uploadError', 'uploadErrorText',
      'successPanel', 'resultFileName', 'resultMeta', 'resultSheet',
      'uploadAnotherBtn', 'tryAgainBtn', 'runtimeStatus',
      'resultsPanel', 'resultsDatasetMeta', 'resultsUploadAnotherBtn',
      'overviewRows', 'overviewColumns', 'overviewDuplicates', 'overviewMissingColumns',
      'issuesCount', 'issuesList', 'columnSearch', 'columnFilters', 'columnsTableBody',
      'profileType', 'profileContent', 'previewTableHead', 'previewTableBody',
      'duplicatePreviewBtn', 'duplicatePreviewPanel', 'duplicateTableHead', 'duplicateTableBody'
    ].forEach((id) => {
      elements[id] = document.getElementById(id);
    });
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / (1024 ** exponent);
    return `${value >= 10 || exponent === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[exponent]}`;
  }

  function formatNumber(value) {
    return Number.isFinite(Number(value)) ? numberFormatter.format(Number(value)) : '—';
  }

  function formatPercentage(value) {
    return `${formatNumber(value)}%`;
  }

  function formatCell(value) {
    if (value === null || value === undefined || value === '') return '—';
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
    return String(value);
  }

  function setHidden(element, hidden) {
    if (element) element.hidden = hidden;
  }

  function makeElement(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined && text !== null) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function setRuntimeStatus() {
    const status = elements.runtimeStatus;
    if (!status || !namespace.parser) return;
    const parserStatus = namespace.parser.getStatus();
    const ready = parserStatus.csv && parserStatus.xlsx;
    status.dataset.state = ready ? 'ready' : 'warning';
    status.textContent = ready
      ? `Parser siap. File akan diproses ${parserStatus.worker ? 'di background browser' : 'sepenuhnya di browser'}.`
      : 'Parser belum lengkap. Muat ulang halaman lalu coba lagi.';
  }

  function setUploadStatus(message, stateName) {
    if (!elements.uploadState || !elements.uploadStateText) return;
    elements.uploadState.dataset.state = stateName || 'idle';
    elements.uploadStateText.textContent = message;
    setHidden(elements.uploadState, false);
  }

  function backgroundMessage(message) {
    const usesWorker = typeof namespace.parser?.usesWorker === 'function'
      && namespace.parser.usesWorker(state.file);
    return usesWorker ? `${message} di background…` : `${message}…`;
  }

  function setError(error) {
    const message = error?.message || 'File ini tidak bisa dibaca. Periksa format file lalu coba lagi.';
    setUploadStatus('Analisis belum selesai.', 'error');
    elements.uploadErrorText.textContent = message;
    setHidden(elements.uploadError, false);
    setHidden(elements.successPanel, true);
    setHidden(elements.sheetPicker, true);
    setHidden(elements.resultsPanel, true);
  }

  function setBusy(isBusy) {
    state.busy = isBusy;
    elements.fileInput.disabled = isBusy;
    elements.analyzeSheetBtn.disabled = isBusy;
    elements.dropzone.classList.toggle('is-busy', isBusy);
    elements.dropzone.setAttribute('aria-busy', String(isBusy));
  }

  function resetPanels() {
    setHidden(elements.uploadError, true);
    setHidden(elements.successPanel, true);
    setHidden(elements.sheetPicker, true);
    setHidden(elements.resultsPanel, true);
    setHidden(elements.duplicatePreviewPanel, true);
  }

  function resetFlow({ focus = false } = {}) {
    state.file = null;
    state.fileInfo = null;
    state.analysis = null;
    state.startedAt = 0;
    state.table.query = '';
    state.table.filter = 'all';
    state.table.sort = 'name';
    state.table.direction = 'asc';
    state.table.selectedColumn = null;
    setBusy(false);
    elements.fileInput.value = '';
    elements.sheetSelect.replaceChildren();
    elements.columnSearch.value = '';
    elements.columnFilters.querySelectorAll('button').forEach((button) => {
      const active = button.dataset.filter === 'all';
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    resetPanels();
    setUploadStatus('Belum ada file yang dipilih.', 'idle');
    if (focus) elements.dropzone.focus();
  }

  function populateSheetPicker(sheetNames) {
    elements.sheetSelect.replaceChildren();
    sheetNames.forEach((sheetName) => {
      const option = document.createElement('option');
      option.value = sheetName;
      option.textContent = sheetName;
      elements.sheetSelect.appendChild(option);
    });
    setHidden(elements.sheetPicker, false);
    setUploadStatus('Pilih sheet yang ingin diperiksa.', 'ready');
    elements.sheetSelect.focus();
  }

  function renderSuccess(analysis) {
    const file = analysis.file;
    const sheetSuffix = file.sheetName ? `Sheet: ${file.sheetName}` : 'CSV';
    elements.resultFileName.textContent = file.name;
    elements.resultMeta.textContent = `${formatBytes(file.size)} · ${formatNumber(analysis.dataset.rowCount)} baris · ${formatNumber(analysis.dataset.columnCount)} kolom`;
    elements.resultSheet.textContent = sheetSuffix;
    setHidden(elements.successPanel, false);
    setHidden(elements.uploadError, true);
    setHidden(elements.sheetPicker, true);
    setUploadStatus('File berhasil dibaca dan diprofilkan secara lokal.', 'success');
    renderAnalysis(analysis);
    setHidden(elements.resultsPanel, false);
    track('dataset_analysis_completed', {
      file: state.file,
      rows: analysis.overview.rows,
      columns: analysis.overview.columns,
      processingTimeMs: state.startedAt ? now() - state.startedAt : null
    });
  }

  function appendStat(parent, label, value) {
    const card = makeElement('div', undefined, 'dq-stat-card');
    card.append(makeElement('span', label), makeElement('strong', value));
    parent.appendChild(card);
  }

  function renderIssues(issues) {
    elements.issuesList.replaceChildren();
    elements.issuesCount.textContent = issues.length ? `${issues.length} potential issue${issues.length === 1 ? '' : 's'}` : 'Tidak ada issue';
    if (!issues.length) {
      elements.issuesList.appendChild(makeElement('div', "Kami tidak menemukan masalah data umum berdasarkan pemeriksaan saat ini.", 'dq-no-issues'));
      return;
    }
    issues.forEach((issue) => {
      const card = makeElement('article', undefined, 'dq-issue-card');
      card.dataset.severity = issue.severity;
      card.appendChild(makeElement('span', issue.severity, 'dq-issue-severity'));
      const copy = makeElement('div');
      copy.append(makeElement('h4', issue.title, 'dq-issue-title'), makeElement('p', issue.detail, 'dq-issue-detail'));
      card.appendChild(copy);
      elements.issuesList.appendChild(card);
    });
  }

  function getVisibleColumns() {
    const query = state.table.query.trim().toLowerCase();
    const filtered = state.analysis.columns.filter((column) => {
      const matchesQuery = !query || column.name.toLowerCase().includes(query);
      const matchesFilter = state.table.filter === 'all'
        || (state.table.filter === 'issue' && column.status === 'issue')
        || (state.table.filter === 'missing' && column.missingCount > 0)
        || (state.table.filter === 'clean' && column.status === 'clean');
      return matchesQuery && matchesFilter;
    });
    return filtered.sort((left, right) => {
      const a = left[state.table.sort];
      const b = right[state.table.sort];
      const comparison = typeof a === 'number' && typeof b === 'number'
        ? a - b
        : String(a ?? '').localeCompare(String(b ?? ''), 'id');
      return state.table.direction === 'asc' ? comparison : -comparison;
    });
  }

  function updateSortIndicators() {
    elements.columnFilters.closest('.dq-result-section')?.querySelectorAll('.dq-sort-button').forEach((button) => {
      const isActive = button.dataset.sort === state.table.sort;
      button.setAttribute('aria-label', `${button.textContent.replace('↕', '').trim()}, urutkan ${isActive && state.table.direction === 'asc' ? 'menurun' : 'menaik'}`);
      const indicator = button.querySelector('span');
      if (indicator) indicator.textContent = isActive ? (state.table.direction === 'asc' ? '↑' : '↓') : '↕';
    });
  }

  function selectColumn(columnName) {
    state.table.selectedColumn = columnName;
    renderColumnsTable();
    renderColumnProfile(columnName);
    track('column_profile_opened');
  }

  function renderColumnsTable() {
    elements.columnsTableBody.replaceChildren();
    const columns = getVisibleColumns();
    if (!columns.length) {
      const row = document.createElement('tr');
      const cell = makeElement('td', 'Tidak ada kolom yang cocok dengan filter saat ini.', 'dq-table-empty');
      cell.colSpan = 5;
      row.appendChild(cell);
      elements.columnsTableBody.appendChild(row);
      updateSortIndicators();
      return;
    }
    columns.forEach((column) => {
      const row = document.createElement('tr');
      if (column.name === state.table.selectedColumn) row.classList.add('is-selected');
      row.dataset.columnName = column.name;
      const nameCell = document.createElement('td');
      const nameButton = makeElement('button', column.name, 'dq-column-link');
      nameButton.type = 'button';
      nameButton.title = `Buka profile ${column.name}`;
      nameButton.addEventListener('click', () => selectColumn(column.name));
      nameCell.appendChild(nameButton);
      row.append(
        nameCell,
        makeElement('td', column.type),
        makeElement('td', formatPercentage(column.missingPercentage)),
        makeElement('td', formatNumber(column.uniqueCount))
      );
      const statusCell = document.createElement('td');
      const statusBadge = makeElement('span', column.status === 'issue' ? 'Issue' : 'Clean', 'dq-status-badge');
      statusBadge.dataset.status = column.status;
      statusCell.appendChild(statusBadge);
      row.appendChild(statusCell);
      elements.columnsTableBody.appendChild(row);
    });
    updateSortIndicators();
  }

  function toNumericValue(value) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value !== 'string') return null;
    const cleaned = value.trim().replace(/,/g, '');
    if (!cleaned || !/^[-+]?((\d+([.]\d+)?)|([.]\d+))(e[-+]?\d+)?$/i.test(cleaned)) return null;
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function renderHistogram(profile) {
    const histogramData = profile.stats?.histogram || [];
    if (!histogramData.length) return null;
    const maxCount = Math.max(...histogramData.map((item) => item.count));
    const histogram = makeElement('div', undefined, 'dq-histogram');
    histogramData.forEach((item) => {
      const bar = makeElement('div', undefined, 'dq-histogram-bar');
      bar.style.height = `${Math.max(8, (item.count / maxCount) * 100)}%`;
      bar.title = `${item.count} value${item.count === 1 ? '' : 's'} mulai ${formatNumber(item.label)}`;
      bar.appendChild(makeElement('span', String(item.count)));
      bar.dataset.label = formatNumber(item.label);
      histogram.appendChild(bar);
    });
    const wrapper = makeElement('div', undefined, 'dq-profile-block');
    wrapper.append(makeElement('h4', 'Numeric distribution', 'dq-profile-subheading'), histogram);
    return wrapper;
  }

  function renderTopValues(profile) {
    const topValues = profile.categorical?.topValues || [];
    if (!topValues.length) return null;
    const wrapper = makeElement('div', undefined, 'dq-profile-block');
    wrapper.appendChild(makeElement('h4', 'Top values', 'dq-profile-subheading'));
    const table = makeElement('table', undefined, 'dq-top-values');
    topValues.forEach((item) => {
      const row = document.createElement('tr');
      row.append(makeElement('td', item.value), makeElement('td', `${formatNumber(item.count)} · ${formatPercentage(item.percentage)}`));
      table.appendChild(row);
    });
    wrapper.appendChild(table);
    return wrapper;
  }

  function renderColumnProfile(columnName) {
    const profile = state.analysis?.columns.find((column) => column.name === columnName);
    if (!profile) return;
    elements.profileType.textContent = profile.type;
    elements.profileContent.replaceChildren();
    const intro = makeElement('div', undefined, 'dq-profile-intro');
    intro.append(makeElement('h4', profile.name), makeElement('p', `${profile.status === 'issue' ? 'Perlu diperiksa' : 'Tidak ada issue terdeteksi pada kolom ini'}`));
    elements.profileContent.appendChild(intro);

    const stats = makeElement('div', undefined, 'dq-stat-grid');
    appendStat(stats, 'Count', formatNumber(profile.nonMissingCount));
    appendStat(stats, 'Missing', `${formatNumber(profile.missingCount)} · ${formatPercentage(profile.missingPercentage)}`);
    appendStat(stats, 'Unique', formatNumber(profile.uniqueCount));
    if (profile.type === 'Number' && profile.stats) {
      appendStat(stats, 'Min', formatNumber(profile.stats.min));
      appendStat(stats, 'Max', formatNumber(profile.stats.max));
      appendStat(stats, 'Mean', formatNumber(profile.stats.mean));
      appendStat(stats, 'Median', formatNumber(profile.stats.median));
    } else if (profile.type === 'Date' && profile.date) {
      appendStat(stats, 'Earliest', formatCell(profile.date.earliest));
      appendStat(stats, 'Latest', formatCell(profile.date.latest));
      appendStat(stats, 'Unique dates', formatNumber(profile.date.uniqueDates));
    }
    elements.profileContent.appendChild(stats);

    if (profile.type === 'Number') {
      const histogram = renderHistogram(profile);
      if (histogram) elements.profileContent.appendChild(histogram);
    }
    if (profile.type === 'Text' || profile.type === 'Boolean') {
      const topValues = renderTopValues(profile);
      if (topValues) elements.profileContent.appendChild(topValues);
    }
  }

  function renderTableContent(head, body, rows) {
    head.replaceChildren();
    body.replaceChildren();
    const headerRow = document.createElement('tr');
    headerRow.appendChild(makeElement('th', '#'));
    state.analysis.dataset.headers.forEach((header) => headerRow.appendChild(makeElement('th', header)));
    head.appendChild(headerRow);
    rows.forEach((row, index) => {
      const tableRow = document.createElement('tr');
      tableRow.appendChild(makeElement('td', String(index + 1)));
      row.forEach((value) => tableRow.appendChild(makeElement('td', formatCell(value))));
      body.appendChild(tableRow);
    });
  }

  function renderDataPreview() {
    renderTableContent(elements.previewTableHead, elements.previewTableBody, state.analysis.preview);
  }

  function renderDuplicatePreview() {
    const duplicate = state.analysis.duplicates;
    const rows = duplicate.previewRows || [];
    renderTableContent(elements.duplicateTableHead, elements.duplicateTableBody, rows);
    elements.duplicatePreviewBtn.disabled = duplicate.count === 0;
    elements.duplicatePreviewBtn.textContent = duplicate.count ? 'View duplicate rows' : 'No duplicate rows';
    elements.duplicatePreviewBtn.setAttribute('aria-expanded', 'false');
  }

  function renderAnalysis(analysis) {
    state.table.query = '';
    state.table.filter = 'all';
    state.table.sort = 'name';
    state.table.direction = 'asc';
    state.table.selectedColumn = analysis.columns[0]?.name || null;
    elements.resultsDatasetMeta.textContent = `${analysis.file.name} · ${formatBytes(analysis.file.size)}${analysis.file.sheetName ? ` · Sheet: ${analysis.file.sheetName}` : ''}`;
    elements.overviewRows.textContent = formatNumber(analysis.overview.rows);
    elements.overviewColumns.textContent = formatNumber(analysis.overview.columns);
    elements.overviewDuplicates.textContent = `${formatNumber(analysis.overview.duplicateRows)}${analysis.overview.duplicatePercentage ? ` · ${formatPercentage(analysis.overview.duplicatePercentage)}` : ''}`;
    elements.overviewMissingColumns.textContent = formatNumber(analysis.overview.columnsWithMissing);
    elements.columnSearch.value = '';
    elements.columnFilters.querySelectorAll('button').forEach((button) => {
      const active = button.dataset.filter === 'all';
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderIssues(analysis.issues);
    renderColumnsTable();
    renderColumnProfile(state.table.selectedColumn);
    renderDataPreview();
    renderDuplicatePreview();
    setHidden(elements.duplicatePreviewPanel, true);
  }

  async function analyzeSelectedFile(sheetName) {
    if (!state.file || state.busy) return;
    setBusy(true);
    setHidden(elements.uploadError, true);
    setUploadStatus(backgroundMessage('Menganalisis dataset'), 'loading');
    try {
      state.analysis = await namespace.parser.parseFile(state.file, { sheetName });
      renderSuccess(state.analysis);
    } catch (error) {
      track('dataset_analysis_failed', { file: state.file });
      setError(error);
    } finally {
      setBusy(false);
    }
  }

  async function receiveFile(file) {
    if (!file || state.busy) return;
    state.file = file;
    state.fileInfo = null;
    state.analysis = null;
    state.startedAt = now();
    resetPanels();
    setBusy(true);
    setUploadStatus(backgroundMessage('Membaca file'), 'loading');
    track('dataset_upload_started', { file });
    try {
      const fileInfo = await namespace.parser.inspectFile(file);
      state.fileInfo = fileInfo;
      if (fileInfo.needsSheetSelection) {
        setBusy(false);
        populateSheetPicker(fileInfo.sheetNames);
      } else {
        // Release the inspection lock before handing the file to the analysis
        // step, which intentionally guards against an already-busy state.
        setBusy(false);
        await analyzeSelectedFile(null);
      }
    } catch (error) {
      setBusy(false);
      track('dataset_analysis_failed', { file: state.file });
      setError(error);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    elements.dropzone.classList.remove('is-dragging');
    if (event.dataTransfer?.files?.length) receiveFile(event.dataTransfer.files[0]);
  }

  function initInteractions() {
    elements.fileInput.addEventListener('change', () => receiveFile(elements.fileInput.files?.[0]));
    elements.dropzone.addEventListener('dragenter', (event) => {
      event.preventDefault();
      if (!state.busy) elements.dropzone.classList.add('is-dragging');
    });
    elements.dropzone.addEventListener('dragover', (event) => {
      event.preventDefault();
      if (!state.busy) elements.dropzone.classList.add('is-dragging');
    });
    elements.dropzone.addEventListener('dragleave', () => elements.dropzone.classList.remove('is-dragging'));
    elements.dropzone.addEventListener('drop', handleDrop);
    elements.dropzone.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && !state.busy) {
        event.preventDefault();
        elements.fileInput.click();
      }
    });
    elements.sheetSelect.addEventListener('change', () => {
      elements.analyzeSheetBtn.disabled = !elements.sheetSelect.value || state.busy;
    });
    elements.analyzeSheetBtn.addEventListener('click', () => analyzeSelectedFile(elements.sheetSelect.value));
    const uploadAnother = () => {
      track('upload_another_dataset');
      resetFlow({ focus: true });
    };
    elements.uploadAnotherBtn.addEventListener('click', uploadAnother);
    elements.resultsUploadAnotherBtn.addEventListener('click', uploadAnother);
    elements.tryAgainBtn.addEventListener('click', () => resetFlow({ focus: true }));
    elements.columnSearch.addEventListener('input', (event) => {
      state.table.query = event.target.value;
      renderColumnsTable();
    });
    elements.columnFilters.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        state.table.filter = button.dataset.filter;
        elements.columnFilters.querySelectorAll('button').forEach((item) => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        renderColumnsTable();
      });
    });
    elements.resultsPanel.querySelectorAll('.dq-sort-button').forEach((button) => {
      button.addEventListener('click', () => {
        if (state.table.sort === button.dataset.sort) state.table.direction = state.table.direction === 'asc' ? 'desc' : 'asc';
        else {
          state.table.sort = button.dataset.sort;
          state.table.direction = 'asc';
        }
        renderColumnsTable();
      });
    });
    elements.duplicatePreviewBtn.addEventListener('click', () => {
      if (!state.analysis?.duplicates.count) return;
      const isOpening = elements.duplicatePreviewPanel.hidden;
      setHidden(elements.duplicatePreviewPanel, !isOpening);
      elements.duplicatePreviewBtn.setAttribute('aria-expanded', String(isOpening));
      if (isOpening) track('duplicate_preview_opened');
    });
  }

  function init() {
    cacheElements();
    initInteractions();
    namespace.ready = true;
    namespace.upload = Object.freeze({ receiveFile, reset: resetFlow });
    document.documentElement.dataset.dataQualityReady = 'true';
    setRuntimeStatus();
    setUploadStatus('Belum ada file yang dipilih.', 'idle');
    track('data_quality_page_view');

  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})(window, document);
