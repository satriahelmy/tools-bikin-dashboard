(function (window) {
  'use strict';

  // Initial guardrails. These values are intentionally centralized so they
  // can be tuned after measuring real browser performance in Phase 4.
  window.BDDataQuality = window.BDDataQuality || {};
  window.BDDataQuality.config = Object.freeze({
    supportedExtensions: Object.freeze(['csv', 'xlsx']),
    supportedMimeTypes: Object.freeze([
      'text/csv',
      'application/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]),
    limits: Object.freeze({
      maxFileSizeBytes: 25 * 1024 * 1024,
      maxRows: 250000,
      maxPreviewRows: 50,
      maxTopValues: 10,
      workerTimeoutMs: 120000
    }),
    issueThresholds: Object.freeze({
      missingMediumPercentage: 5,
      duplicateHighPercentage: 2,
      highCardinalityPercentage: 95,
      inconsistentCategoryMinimumVariants: 2,
      mixedNumericMinimumPercentage: 80,
      maxIssueExamples: 3
    }),
    types: Object.freeze(['Text', 'Number', 'Date', 'Boolean', 'Empty']),
    parserVersions: Object.freeze({
      csv: 'Papa Parse 5.4.1',
      xlsx: 'SheetJS 0.18.5'
    })
  });
})(window);
