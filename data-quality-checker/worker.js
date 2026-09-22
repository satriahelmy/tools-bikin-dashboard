/* global self, importScripts */

self.__BD_DATA_QUALITY_WORKER__ = true;
self.window = self;

importScripts(
  './vendor/papaparse.min.js',
  './vendor/xlsx.full.min.js',
  './config.js?v=5',
  './model.js?v=5',
  './profiling.js?v=5',
  './parser.js?v=5'
);

self.onmessage = async (event) => {
  const { action, file, options } = event.data || {};
  try {
    const result = action === 'inspect'
      ? await self.BDDataQuality.parser.inspectFile(file)
      : await self.BDDataQuality.parser.parseFile(file, options);
    self.postMessage({ type: 'success', result });
  } catch (error) {
    self.postMessage({
      type: 'error',
      code: error?.code || 'parse-failed',
      message: error?.message || 'File ini tidak bisa dibaca. Periksa format file lalu coba lagi.'
    });
  }
};
