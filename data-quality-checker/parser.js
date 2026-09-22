(function (window) {
  'use strict';

  const namespace = window.BDDataQuality = window.BDDataQuality || {};
  const config = namespace.config;
  const model = namespace.model;
  const profiler = namespace.profiler;

  function parserError(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
  }

  function getExtension(file) {
    const name = String(file?.name || '').toLowerCase();
    const match = name.match(/\.([a-z0-9]+)$/);
    return match ? match[1] : '';
  }

  function assertFile(file) {
    if (!file || typeof file.name !== 'string') {
      throw parserError('no-file', 'Pilih file CSV atau XLSX terlebih dahulu.');
    }
    const extension = getExtension(file);
    if (!config.supportedExtensions.includes(extension)) {
      throw parserError('unsupported-format', 'Format file belum didukung. Upload file CSV atau XLSX.');
    }
    if (file.size > config.limits.maxFileSizeBytes) {
      throw parserError('too-large', 'Dataset ini terlalu besar untuk dianalisis dengan aman di browser.');
    }
    return extension;
  }

  function ensureParserDependencies(extension) {
    if (extension === 'csv' && !window.Papa) {
      throw parserError('missing-parser', 'Parser CSV belum tersedia. Muat ulang halaman lalu coba lagi.');
    }
    if (extension === 'xlsx' && !window.XLSX) {
      throw parserError('missing-parser', 'Parser XLSX belum tersedia. Muat ulang halaman lalu coba lagi.');
    }
  }

  function readFileAsText(file) {
    if (typeof window.FileReader === 'function') return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(reader.error || new Error('File CSV tidak dapat dibaca.'));
      reader.readAsText(file);
    });
    if (typeof file?.text === 'function') return file.text();
    return Promise.reject(new Error('Browser tidak menyediakan pembaca file CSV.'));
  }

  async function parseCsv(file) {
    let csvText;
    try {
      csvText = await readFileAsText(file);
    } catch (error) {
      throw parserError('parse-failed', error?.message || 'File ini tidak bisa dibaca. Periksa format file lalu coba lagi.');
    }
    return new Promise((resolve, reject) => {
      window.Papa.parse(csvText, {
        header: false,
        dynamicTyping: false,
        // Ignore blank rows introduced by a trailing newline, while keeping
        // empty cells inside real rows for missing-value profiling.
        skipEmptyLines: 'greedy',
        worker: false,
        complete(results) {
          const fatalError = (results.errors || []).find((item) => item.type === 'Quotes');
          if (fatalError) {
            reject(parserError('parse-failed', 'File ini tidak bisa dibaca. Periksa format file lalu coba lagi.'));
            return;
          }
          resolve({
            extension: 'csv',
            sheetNames: [],
            sheetName: null,
            matrix: results.data || [],
            warnings: results.errors || []
          });
        },
        error(error) {
          reject(parserError('parse-failed', error?.message || 'File ini tidak bisa dibaca. Periksa format file lalu coba lagi.'));
        }
      });
    });
  }

  async function readXlsxWorkbook(file, options = {}) {
    const buffer = await file.arrayBuffer();
    return window.XLSX.read(buffer, {
      type: 'array',
      cellDates: true,
      raw: true,
      bookSheets: Boolean(options.bookSheets)
    });
  }

  async function parseXlsx(file, options) {
    const workbook = await readXlsxWorkbook(file);
    const sheetNames = workbook.SheetNames || [];
    const sheetName = options?.sheetName || sheetNames[0];
    if (!sheetName || !workbook.Sheets[sheetName]) {
      throw parserError('empty-workbook', 'Workbook ini tidak memiliki sheet yang dapat dibaca.');
    }
    const worksheet = workbook.Sheets[sheetName];
    return {
      extension: 'xlsx',
      sheetNames,
      sheetName,
      matrix: window.XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        raw: true,
        defval: null,
        blankrows: true
      }),
      warnings: []
    };
  }

  async function inspectFileDirect(file) {
    const extension = assertFile(file);
    ensureParserDependencies(extension);
    if (extension !== 'xlsx') {
      return { extension, sheetNames: [], needsSheetSelection: false };
    }
    const workbook = await readXlsxWorkbook(file, { bookSheets: true });
    const sheetNames = workbook.SheetNames || [];
    if (!sheetNames.length) {
      throw parserError('empty-workbook', 'Workbook ini tidak memiliki sheet yang dapat dibaca.');
    }
    return {
      extension,
      sheetNames,
      needsSheetSelection: sheetNames.length > 1
    };
  }

  async function parseFileDirect(file, options = {}) {
    const extension = assertFile(file);
    ensureParserDependencies(extension);
    const parsed = extension === 'csv'
      ? await parseCsv(file)
      : await parseXlsx(file, options);
    const dataset = model.normalizeMatrix(parsed.matrix);
    if (!dataset.columnCount || !dataset.rowCount) {
      throw parserError('empty-dataset', 'File ini tidak berisi data yang bisa dianalisis.');
    }
    if (dataset.rowCount > config.limits.maxRows) {
      throw parserError('too-large', 'Dataset ini terlalu besar untuk dianalisis dengan aman di browser.');
    }
    const analysis = model.createAnalysisSkeleton({
      name: file.name,
      size: file.size,
      type: file.type,
      extension,
      sheetName: parsed.sheetName
    }, dataset);
    if (!profiler) {
      throw parserError('profiling-unavailable', 'Profiling engine belum tersedia. Muat ulang halaman lalu coba lagi.');
    }
    const profile = profiler.profileDataset(dataset);
    analysis.overview = profile.overview;
    analysis.columns = profile.columns;
    analysis.issues = profile.issues;
    analysis.duplicates = profile.duplicates;
    analysis.preview = profile.preview;
    // Keep the main-thread payload compact. Detailed rows are represented by
    // the capped data preview and duplicate preview, not the full matrix.
    analysis.dataset = {
      headers: [...dataset.headers],
      rows: [],
      rowCount: dataset.rowCount,
      columnCount: dataset.columnCount
    };
    analysis.sheetNames = parsed.sheetNames;
    analysis.warnings = parsed.warnings;
    analysis.status = 'profiled';
    return analysis;
  }

  function canUseWorker() {
    return !window.__BD_DATA_QUALITY_WORKER__
      && typeof window.Worker === 'function'
      && typeof window.document !== 'undefined';
  }

  function usesWorker(file) {
    return getExtension(file) === 'xlsx' && canUseWorker();
  }

  function runInWorker(action, file, options = {}) {
    return new Promise((resolve, reject) => {
      let worker;
      try {
        const workerUrl = new URL('./worker.js?v=5', window.location.href);
        worker = new window.Worker(workerUrl);
      } catch (error) {
        reject(parserError('worker-failed', error?.message || 'Background processing tidak tersedia.'));
        return;
      }
      let settled = false;
      let timeoutId;
      const finish = (callback, value) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        worker.terminate();
        callback(value);
      };
      worker.onmessage = (event) => {
        const message = event.data || {};
        if (message.type === 'success') finish(resolve, message.result);
        else if (message.type === 'error') finish(reject, parserError(message.code || 'parse-failed', message.message));
      };
      worker.onerror = () => finish(reject, parserError('worker-failed', 'Background processing gagal. Coba lagi.'));
      timeoutId = window.setTimeout(() => {
        finish(reject, parserError('worker-timeout', 'Analisis terlalu lama untuk browser. Coba file yang lebih kecil.'));
      }, config.limits.workerTimeoutMs);
      try {
        worker.postMessage({ action, file, options });
      } catch (error) {
        finish(reject, parserError('worker-failed', error?.message || 'File tidak dapat dikirim ke background processor.'));
      }
    });
  }

  async function inspectFile(file) {
    const extension = assertFile(file);
    if (!usesWorker(file)) return inspectFileDirect(file);
    try {
      return await runInWorker('inspect', file);
    } catch (error) {
      if (error.code === 'worker-failed') return inspectFileDirect(file);
      throw error;
    }
  }

  async function parseFile(file, options = {}) {
    assertFile(file);
    if (!usesWorker(file)) return parseFileDirect(file, options);
    try {
      return await runInWorker('parse', file, options);
    } catch (error) {
      if (error.code === 'worker-failed') return parseFileDirect(file, options);
      throw error;
    }
  }

  namespace.parser = Object.freeze({
    getExtension,
    usesWorker,
    inspectFile,
    parseFile,
    getStatus() {
      return {
        csv: Boolean(window.Papa),
        xlsx: Boolean(window.XLSX),
        worker: canUseWorker()
      };
    }
  });
})(window);
