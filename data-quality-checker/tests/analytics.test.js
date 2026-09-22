const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const gtagCalls = [];
const dataLayer = [];
const window = {
  dataLayer,
  gtag: (...args) => gtagCalls.push(args),
  CustomEvent: function CustomEvent(type, init) {
    this.type = type;
    this.detail = init.detail;
  },
  dispatchEvent() {}
};

vm.runInNewContext(
  fs.readFileSync(require.resolve('../analytics.js'), 'utf8'),
  { window }
);

const file = { name: 'private-customer-data.csv' };
const tracked = window.BDDataQuality.analytics.track('dataset_analysis_completed', {
  file,
  rows: 20,
  columns: 2,
  processingTimeMs: 1200,
  filename: file.name,
  column_names: ['email'],
  values: ['secret@example.test']
});

assert.strictEqual(tracked, true);
assert.deepStrictEqual(JSON.parse(JSON.stringify(gtagCalls[0][2])), {
  file_type: 'csv',
  row_bucket: '1-100',
  column_bucket: '1-5',
  processing_time_bucket: '1-3s'
});
assert.deepStrictEqual(JSON.parse(JSON.stringify(dataLayer[0])), {
  event: 'dataset_analysis_completed',
  file_type: 'csv',
  row_bucket: '1-100',
  column_bucket: '1-5',
  processing_time_bucket: '1-3s'
});
assert.strictEqual(Object.prototype.hasOwnProperty.call(gtagCalls[0][2], 'filename'), false);
assert.strictEqual(window.BDDataQuality.analytics.track('unknown_event'), false);

console.log('analytics=passed');
