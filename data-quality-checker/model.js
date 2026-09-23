(function (window) {
  'use strict';

  const namespace = window.BDDataQuality = window.BDDataQuality || {};
  const missingSentinels = new Set(['', 'null', 'undefined', 'na', 'n/a', 'nan']);

  function isMissingValue(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') {
      return missingSentinels.has(value.trim().toLowerCase());
    }
    return false;
  }

  function normalizeComparableValue(value) {
    if (isMissingValue(value)) return null;
    return String(value).trim().toLowerCase();
  }

  function normalizeHeader(value, index) {
    const fallback = `Kolom ${index + 1}`;
    const label = isMissingValue(value) ? fallback : String(value).trim();
    return label || fallback;
  }

  function makeUniqueHeaders(rawHeaders) {
    const seen = new Map();
    return rawHeaders.map((header, index) => {
      const base = normalizeHeader(header, index);
      const count = seen.get(base) || 0;
      seen.set(base, count + 1);
      return count === 0 ? base : `${base} (${count + 1})`;
    });
  }

  function normalizeMatrix(matrix) {
    const safeMatrix = [];
    if (Array.isArray(matrix)) {
      matrix.forEach((row) => {
        if (Array.isArray(row)) safeMatrix.push(row);
      });
    }
    const rawHeaders = safeMatrix[0] || [];
    let columnCount = rawHeaders.length;
    for (let index = 1; index < safeMatrix.length; index += 1) {
      columnCount = Math.max(columnCount, safeMatrix[index].length);
    }
    const headers = makeUniqueHeaders(
      Array.from({ length: columnCount }, (_, index) => rawHeaders[index])
    );
    const rows = safeMatrix.slice(1).map((row) => (
      Array.from({ length: columnCount }, (_, index) => row[index] ?? null)
    ));

    return {
      headers,
      rows,
      rowCount: rows.length,
      columnCount,
      originalMatrixRows: safeMatrix.length
    };
  }

  function createIssue({ id, severity, title, detail, column, code }) {
    return Object.freeze({
      id: id || `${code || 'issue'}-${column || 'dataset'}`,
      code: code || 'unknown',
      severity: severity || 'low',
      title: title || 'Masalah yang perlu diperiksa',
      detail: detail || '',
      column: column || null
    });
  }

  function createAnalysisSkeleton(fileMeta, dataset) {
    return {
      file: Object.freeze({
        name: fileMeta?.name || '',
        size: Number(fileMeta?.size || 0),
        type: fileMeta?.type || '',
        extension: fileMeta?.extension || '',
        sheetName: fileMeta?.sheetName || null
      }),
      dataset: dataset || { headers: [], rows: [], rowCount: 0, columnCount: 0 },
      overview: {
        rows: dataset?.rowCount || 0,
        columns: dataset?.columnCount || 0,
        duplicateRows: 0,
        columnsWithMissing: 0
      },
      columns: [],
      issues: [],
      preview: [],
      status: 'parsed'
    };
  }

  namespace.model = Object.freeze({
    isMissingValue,
    normalizeComparableValue,
    normalizeMatrix,
    createIssue,
    createAnalysisSkeleton
  });
})(window);
