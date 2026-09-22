const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Papa = require('../vendor/papaparse.min.js');
const XLSX = require('../vendor/xlsx.full.min.js');

const root = path.resolve(__dirname, '..');
const window = { Papa, XLSX };
window.window = window;
const context = { window, console, Set, Map, Array, Object, Number, String, Error, Promise };
vm.createContext(context);
['config.js', 'model.js', 'profiling.js'].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
});

const matrix = Papa.parse(
  fs.readFileSync(path.join(root, 'fixtures', 'quality-sample.csv'), 'utf8'),
  { header: false, skipEmptyLines: true }
).data;
const dataset = window.BDDataQuality.model.normalizeMatrix(matrix);
const result = window.BDDataQuality.profiler.profileDataset(dataset);
const byName = Object.fromEntries(result.columns.map((column) => [column.name, column]));
const issueCodes = new Set(result.issues.map((issue) => issue.code));

assert.equal(result.overview.rows, 5);
assert.equal(result.overview.columns, 7);
assert.equal(result.overview.duplicateRows, 1);
assert.equal(result.overview.columnsWithMissing, 3);
assert.equal(byName.sales.type, 'Number');
assert.equal(byName.sales.stats.min, 50);
assert.equal(byName.sales.stats.max, 250);
assert.equal(byName.sales.stats.median, 175);
assert.equal(byName.order_date.type, 'Date');
assert.equal(byName.order_date.date.uniqueDates, 3);
assert.equal(byName.empty_column.type, 'Empty');
assert.equal(byName.status.uniqueCount, 1);
assert.equal(byName.region.categorical.topValues[0].value, 'jakarta');
assert.equal(issueCodes.has('duplicate-rows'), true);
assert.equal(issueCodes.has('empty-column'), true);
assert.equal(issueCodes.has('constant-column'), true);
assert.equal(issueCodes.has('inconsistent-categories'), true);
assert.equal(issueCodes.has('mixed-values'), true);
assert.equal(result.preview.length, 5);

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([['id'], [1]]), 'Orders');
XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([['id'], [2]]), 'Returns');
assert.equal(workbook.SheetNames.length, 2);

console.log('profiling-fixture=passed');
