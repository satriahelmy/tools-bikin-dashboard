(function (window) {
  'use strict';

  const namespace = window.BDDataQuality = window.BDDataQuality || {};
  const eventNames = new Set([
    'data_quality_page_view',
    'dataset_upload_started',
    'dataset_analysis_completed',
    'dataset_analysis_failed',
    'column_profile_opened',
    'duplicate_preview_opened',
    'upload_another_dataset'
  ]);

  function fileType(file) {
    const match = String(file?.name || '').toLowerCase().match(/\.([a-z0-9]+)$/);
    return match && ['csv', 'xlsx'].includes(match[1]) ? match[1] : 'other';
  }

  function bucket(value, ranges) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < 0) return 'unknown';
    return ranges.find((range) => number <= range.max)?.label || ranges[ranges.length - 1].label;
  }

  function rowBucket(value) {
    return bucket(value, [
      { max: 0, label: '0' },
      { max: 100, label: '1-100' },
      { max: 1000, label: '101-1k' },
      { max: 10000, label: '1k-10k' },
      { max: 100000, label: '10k-100k' },
      { max: 250000, label: '100k-250k' },
      { max: Number.POSITIVE_INFINITY, label: '250k+' }
    ]);
  }

  function columnBucket(value) {
    return bucket(value, [
      { max: 0, label: '0' },
      { max: 5, label: '1-5' },
      { max: 20, label: '6-20' },
      { max: 50, label: '21-50' },
      { max: 100, label: '51-100' },
      { max: Number.POSITIVE_INFINITY, label: '100+' }
    ]);
  }

  function processingTimeBucket(value) {
    const milliseconds = Number(value);
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return 'unknown';
    if (milliseconds < 1000) return '<1s';
    if (milliseconds < 3000) return '1-3s';
    if (milliseconds < 10000) return '3-10s';
    if (milliseconds < 30000) return '10-30s';
    return '30s+';
  }

  function makeProperties(details) {
    const source = details || {};
    const properties = {};
    if (source.file) properties.file_type = fileType(source.file);
    if (['csv', 'xlsx', 'other'].includes(String(source.file_type))) {
      properties.file_type = String(source.file_type);
    }
    if (Number.isFinite(Number(source.rows))) properties.row_bucket = rowBucket(source.rows);
    if (Number.isFinite(Number(source.columns))) properties.column_bucket = columnBucket(source.columns);
    if (Number.isFinite(Number(source.processingTimeMs))) {
      properties.processing_time_bucket = processingTimeBucket(source.processingTimeMs);
    }
    return properties;
  }

  function track(eventName, details) {
    if (!eventNames.has(eventName)) return false;
    const properties = makeProperties(details);

    // Providers are optional. If the host site has no gtag/dataLayer, this is
    // a no-op apart from the local diagnostic event below.
    try {
      if (typeof window.gtag === 'function') window.gtag('event', eventName, properties);
    } catch (error) {
      // Analytics must never interfere with the data-quality flow.
    }
    try {
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: eventName, ...properties });
    } catch (error) {
      // Analytics must never interfere with the data-quality flow.
    }
    try {
      if (typeof window.dispatchEvent === 'function' && typeof window.CustomEvent === 'function') {
        window.dispatchEvent(new window.CustomEvent('bd:data-quality-analytics', {
          detail: { eventName, properties }
        }));
      }
    } catch (error) {
      // Analytics must never interfere with the data-quality flow.
    }
    return true;
  }

  namespace.analytics = Object.freeze({
    track,
    fileType,
    rowBucket,
    columnBucket,
    processingTimeBucket,
    events: Object.freeze([...eventNames])
  });
})(window);
