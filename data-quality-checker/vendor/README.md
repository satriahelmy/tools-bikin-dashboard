# Data Quality Checker vendor dependencies

The parser runtime is kept local so the tool does not depend on a third-party CDN when deployed.

- `papaparse.min.js` — Papa Parse 5.4.1, MIT License
- `xlsx.full.min.js` — SheetJS Community Edition 0.18.5, Apache-2.0 License

These libraries only parse the selected file in the browser. They are not given the file contents by a remote service.
