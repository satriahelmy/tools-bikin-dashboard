import * as duckdb from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.32.0/+esm";

let enginePromise;

async function createEngine() {
  const bundles = duckdb.getJsDelivrBundles();
  const bundle = await duckdb.selectBundle(bundles);
  const workerUrl = URL.createObjectURL(
    new Blob([`importScripts("${bundle.mainWorker}");`], { type: "text/javascript" })
  );
  const worker = new Worker(workerUrl);
  const db = new duckdb.AsyncDuckDB(new duckdb.ConsoleLogger(), worker);
  try {
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    await db.open({ path: ":memory:" });
    return { db, worker, connection: await db.connect() };
  } catch (error) {
    await db.terminate();
    worker.terminate();
    throw error;
  } finally {
    URL.revokeObjectURL(workerUrl);
  }
}

async function getEngine() {
  if (!enginePromise) {
    enginePromise = createEngine().catch((error) => {
      enginePromise = undefined;
      throw error;
    });
  }
  return enginePromise;
}

function normalizeValue(value) {
  if (typeof value === "bigint") {
    const number = Number(value);
    return Number.isSafeInteger(number) ? number : value.toString();
  }
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value;
}

export async function runQuery(setupSql, sql) {
  const engine = await getEngine();
  for (const statement of setupSql) {
    await engine.connection.query(statement);
  }

  const cleanedSql = sql.trim().replace(/^(?:(?:--[^\n]*(?:\n|$))|(?:\/\*[\s\S]*?\*\/\s*))*/, "");
  if (!/^(SELECT|WITH)\b/i.test(cleanedSql)) {
    throw new Error("Gunakan satu query SELECT atau WITH untuk soal ini.");
  }

  const result = await engine.connection.query(sql);
  const columns = result.schema.fields.map((field) => field.name);
  const rows = result.toArray().map((row) => columns.map((column) => normalizeValue(row[column])));
  return { columns, rows };
}
