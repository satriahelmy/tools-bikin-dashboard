(function (window) {
  'use strict';

  const namespace = window.BDDataQuality = window.BDDataQuality || {};
  const config = namespace.config;
  const model = namespace.model;

  const numberPattern = /^[-+]?((\d+([.,]\d+)?)|([.,]\d+))(e[-+]?\d+)?$/i;
  const datePattern = /^(\d{4}[-/]\d{1,2}[-/]\d{1,2})(?:[T\s].*)?$/;
  const booleanValues = new Set(['true', 'false']);

  function toComparableString(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
    return String(value).trim();
  }

  function toNumber(value) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value !== 'string') return null;
    const cleaned = value.trim().replace(/,/g, '');
    if (!cleaned || !numberPattern.test(cleaned)) return null;
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function toDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!datePattern.test(trimmed)) return null;
    const parsed = new Date(trimmed);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function isBoolean(value) {
    if (typeof value === 'boolean') return true;
    return typeof value === 'string' && booleanValues.has(value.trim().toLowerCase());
  }

  function valueKey(value) {
    if (model.isMissingValue(value)) return '__missing__';
    if (value instanceof Date && !Number.isNaN(value.getTime())) return `date:${value.toISOString()}`;
    return `${typeof value}:${String(value).trim()}`;
  }

  function rowKey(row) {
    return row.map((value) => valueKey(value)).join('\u001f');
  }

  function percentage(count, total) {
    return total ? (count / total) * 100 : 0;
  }

  function round(value, digits = 2) {
    if (!Number.isFinite(value)) return null;
    const factor = 10 ** digits;
    return Math.round(value * factor) / factor;
  }

  function median(values) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function quartile(values, q) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const index = (sorted.length - 1) * q;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + ((sorted[upper] - sorted[lower]) * (index - lower));
  }

  function standardDeviation(values, mean) {
    if (values.length < 2) return values.length === 1 ? 0 : null;
    const variance = values.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / values.length;
    return Math.sqrt(variance);
  }

  function histogram(values, binCount = 6) {
    if (!values.length) return [];
    let min = values[0];
    let max = values[0];
    values.forEach((value) => {
      min = Math.min(min, value);
      max = Math.max(max, value);
    });
    const count = min === max ? 1 : binCount;
    const bins = Array.from({ length: count }, () => 0);
    values.forEach((value) => {
      const index = min === max ? 0 : Math.min(count - 1, Math.floor(((value - min) / (max - min)) * count));
      bins[index] += 1;
    });
    return bins.map((value, index) => ({
      count: value,
      label: min === max ? round(min) : round(min + ((max - min) * index / count))
    }));
  }

  function inferType(values) {
    const nonMissing = values.filter((value) => !model.isMissingValue(value));
    if (!nonMissing.length) {
      return { type: 'Empty', numericCount: 0, dateCount: 0, booleanCount: 0, nonMissingCount: 0 };
    }
    const numericCount = nonMissing.filter((value) => toNumber(value) !== null).length;
    const dateCount = nonMissing.filter((value) => toDate(value) !== null).length;
    const booleanCount = nonMissing.filter(isBoolean).length;
    const allNumeric = numericCount === nonMissing.length;
    const allDates = dateCount === nonMissing.length;
    const allBooleans = booleanCount === nonMissing.length;
    let type = 'Text';
    if (allNumeric) type = 'Number';
    else if (allDates) type = 'Date';
    else if (allBooleans) type = 'Boolean';
    return {
      type,
      numericCount,
      dateCount,
      booleanCount,
      nonMissingCount: nonMissing.length
    };
  }

  function getNumericProfile(values, missingCount, uniqueCount) {
    const numbers = values.filter((value) => !model.isMissingValue(value))
      .map(toNumber)
      .filter((value) => value !== null);
    if (!numbers.length) return null;
    const mean = numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
    let min = numbers[0];
    let max = numbers[0];
    numbers.forEach((value) => {
      min = Math.min(min, value);
      max = Math.max(max, value);
    });
    return {
      count: numbers.length,
      missing: missingCount,
      unique: uniqueCount,
      min,
      max,
      mean: round(mean),
      median: round(median(numbers)),
      q1: round(quartile(numbers, .25)),
      q3: round(quartile(numbers, .75)),
      standardDeviation: round(standardDeviation(numbers, mean)),
      histogram: histogram(numbers)
    };
  }

  function getCategoricalProfile(values, missingCount, uniqueCount) {
    const counts = new Map();
    values.filter((value) => !model.isMissingValue(value)).forEach((value) => {
      const label = String(value).trim();
      const key = `text:${label}`;
      const current = counts.get(key) || { value: label, count: 0 };
      current.count += 1;
      counts.set(key, current);
    });
    const total = values.length - missingCount;
    const topValues = [...counts.values()]
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
      .slice(0, config.limits.maxTopValues)
      .map((item) => ({
        value: item.value,
        count: item.count,
        percentage: round(percentage(item.count, total))
      }));
    return {
      total: values.length,
      missing: missingCount,
      unique: uniqueCount,
      topValues
    };
  }

  function getDateProfile(values, missingCount, uniqueCount) {
    const dates = values.filter((value) => !model.isMissingValue(value))
      .map(toDate)
      .filter(Boolean);
    if (!dates.length) return null;
    const timestamps = dates.map((date) => date.getTime());
    let earliest = timestamps[0];
    let latest = timestamps[0];
    timestamps.forEach((timestamp) => {
      earliest = Math.min(earliest, timestamp);
      latest = Math.max(latest, timestamp);
    });
    return {
      earliest: new Date(earliest).toISOString(),
      latest: new Date(latest).toISOString(),
      missing: missingCount,
      uniqueDates: uniqueCount
    };
  }

  function findCategoryVariants(values) {
    const groups = new Map();
    values.filter((value) => !model.isMissingValue(value)).forEach((value) => {
      const original = String(value).trim();
      const normalized = model.normalizeComparableValue(value);
      if (!normalized) return;
      if (!groups.has(normalized)) groups.set(normalized, new Set());
      groups.get(normalized).add(original);
    });
    return [...groups.entries()]
      .filter(([, variants]) => variants.size >= config.issueThresholds.inconsistentCategoryMinimumVariants)
      .map(([normalized, variants]) => ({ normalized, variants: [...variants] }));
  }

  function profileColumn(name, values, rowCount) {
    const missingCount = values.filter(model.isMissingValue).length;
    const nonMissingValues = values.filter((value) => !model.isMissingValue(value));
    const uniqueValues = new Set(nonMissingValues.map(valueKey));
    const inferred = inferType(values);
    const profile = {
      name,
      type: inferred.type,
      missingCount,
      missingPercentage: round(percentage(missingCount, rowCount)),
      uniqueCount: uniqueValues.size,
      nonMissingCount: inferred.nonMissingCount,
      status: 'clean',
      stats: inferred.type === 'Number' ? getNumericProfile(values, missingCount, uniqueValues.size) : null,
      categorical: inferred.type === 'Text' || inferred.type === 'Boolean' ? getCategoricalProfile(values, missingCount, uniqueValues.size) : null,
      date: inferred.type === 'Date' ? getDateProfile(values, missingCount, uniqueValues.size) : null,
      _raw: {
        values,
        inferred,
        categoryVariants: inferred.type === 'Text' ? findCategoryVariants(values) : []
      }
    };
    return profile;
  }

  function duplicateProfile(rows) {
    const groups = new Map();
    rows.forEach((row, index) => {
      const key = rowKey(row);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(index);
    });
    const duplicateGroups = [...groups.values()].filter((indexes) => indexes.length > 1);
    const duplicateRows = duplicateGroups.reduce((sum, indexes) => sum + indexes.length - 1, 0);
    const duplicatePreviewIndexes = duplicateGroups
      .flatMap((indexes) => indexes.slice(1))
      .slice(0, config.limits.maxPreviewRows);
    return {
      count: duplicateRows,
      percentage: round(percentage(duplicateRows, rows.length)),
      groups: duplicateGroups.length,
      previewIndexes: duplicatePreviewIndexes
    };
  }

  function issueForColumn(profile, code, severity, title, detail) {
    return model.createIssue({
      id: `${code}-${profile.name}`,
      code,
      severity,
      title,
      detail,
      column: profile.name
    });
  }

  function detectIssues(profiles, duplicate, rowCount) {
    const issues = [];
    if (duplicate.count > 0) {
      const severity = duplicate.percentage >= config.issueThresholds.duplicateHighPercentage ? 'high' : 'medium';
      issues.push(model.createIssue({
        id: 'duplicate-rows',
        code: 'duplicate-rows',
        severity,
        title: `${duplicate.count.toLocaleString('id-ID')} baris duplikat`,
        detail: `${round(duplicate.percentage, 1)}% dari dataset memiliki baris yang sama persis.`
      }));
    }
    profiles.forEach((profile) => {
      const { missingPercentage, uniqueCount, nonMissingCount, type, _raw } = profile;
      if (profile.missingCount > 0) {
        const severity = missingPercentage >= config.issueThresholds.missingMediumPercentage ? 'medium' : 'low';
        issues.push(issueForColumn(
          profile,
          'missing-values',
          severity,
          `${profile.name} memiliki ${profile.missingCount.toLocaleString('id-ID')} nilai kosong`,
          `${round(missingPercentage, 1)}% dari nilai kolom ini belum terisi.`
        ));
      }
      if (type === 'Empty') {
        issues.push(issueForColumn(profile, 'empty-column', 'high', 'Kolom kosong', 'Kolom ini tidak memiliki nilai terisi.'));
      } else if (uniqueCount === 1) {
        issues.push(issueForColumn(profile, 'constant-column', 'low', 'Nilai kolom sama semua', 'Semua nilai yang terisi pada kolom ini sama.'));
      }
      if (type === 'Text' && _raw.categoryVariants.length) {
        const examples = _raw.categoryVariants
          .slice(0, config.issueThresholds.maxIssueExamples)
          .map((item) => item.variants.join(', '))
          .join(' · ');
        issues.push(issueForColumn(
          profile,
          'inconsistent-categories',
          'low',
          'Kategori tidak konsisten',
          `Beberapa nilai mungkin merujuk pada kategori yang sama setelah dirapikan: ${examples}.`
        ));
      }
      if (type === 'Text' && nonMissingCount > 0 && percentage(uniqueCount, nonMissingCount) >= config.issueThresholds.highCardinalityPercentage) {
        issues.push(issueForColumn(
          profile,
          'high-cardinality',
          'low',
          'Terlalu banyak nilai unik',
          `${round(percentage(uniqueCount, nonMissingCount), 1)}% dari nilai yang terisi bersifat unik.`
        ));
      }
      if (type === 'Text' && _raw.inferred.numericCount > 0 && _raw.inferred.numericCount < nonMissingCount && percentage(_raw.inferred.numericCount, nonMissingCount) >= config.issueThresholds.mixedNumericMinimumPercentage) {
        issues.push(issueForColumn(
          profile,
          'mixed-values',
          'medium',
          'Nilai campuran',
          'Sebagian besar nilai terlihat seperti angka, tetapi beberapa tidak bisa dibaca sebagai angka.'
        ));
      }
    });
    const severityRank = { high: 0, medium: 1, low: 2 };
    return issues.sort((a, b) => severityRank[a.severity] - severityRank[b.severity] || a.title.localeCompare(b.title));
  }

  function profileDataset(dataset) {
    const rowCount = dataset.rowCount || 0;
    const columnCount = dataset.columnCount || 0;
    const profiles = dataset.headers.map((name, columnIndex) => {
      const values = dataset.rows.map((row) => row[columnIndex]);
      return profileColumn(name, values, rowCount);
    });
    const duplicate = duplicateProfile(dataset.rows);
    const duplicateResult = {
      ...duplicate,
      previewRows: duplicate.previewIndexes.map((index) => [...dataset.rows[index]])
    };
    const issues = detectIssues(profiles, duplicate, rowCount);
    const issueColumns = new Set(issues.map((issue) => issue.column).filter(Boolean));
    profiles.forEach((profile) => {
      profile.status = issueColumns.has(profile.name) ? 'issue' : 'clean';
      delete profile._raw;
    });
    return {
      overview: {
        rows: rowCount,
        columns: columnCount,
        duplicateRows: duplicate.count,
        duplicatePercentage: duplicate.percentage,
        columnsWithMissing: profiles.filter((profile) => profile.missingCount > 0).length
      },
      columns: profiles,
      issues,
      duplicates: duplicateResult,
      preview: dataset.rows.slice(0, config.limits.maxPreviewRows).map((row) => [...row])
    };
  }

  namespace.profiler = Object.freeze({
    profileDataset,
    inferType,
    duplicateProfile
  });
})(window);
