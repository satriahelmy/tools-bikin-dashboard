const questionList = document.getElementById("sql-question-list");
const questionCount = document.getElementById("sql-question-count");
const progressCount = document.getElementById("sql-progress-count");
const progressBar = document.getElementById("sql-progress-bar");
const progressFill = document.getElementById("sql-progress-fill");
const questionSearch = document.getElementById("sql-question-search");
const loadState = document.getElementById("sql-load-state");
const problemView = document.getElementById("sql-problem-view");
const title = document.getElementById("sql-problem-title");
const prompt = document.getElementById("sql-prompt");
const difficulty = document.getElementById("sql-difficulty");
const topic = document.getElementById("sql-topic");
const datasetNameLabel = document.getElementById("sql-dataset-name");
const schema = document.getElementById("sql-schema");
const editor = document.getElementById("sql-editor");
const runButton = document.getElementById("sql-run-button");
const clearButton = document.getElementById("sql-clear-button");
const resultStatus = document.getElementById("sql-result-status");
const resultContent = document.getElementById("sql-result-content");

let challengeData;
let activeProblem;
let engineModulePromise;
const progressStorageKey = "bikindashboard.sql-challenge.progress.v1";

function readProgress() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(progressStorageKey) || "{}");
    return {
      attempted: new Set(Array.isArray(saved.attempted) ? saved.attempted : []),
      completed: new Set(Array.isArray(saved.completed) ? saved.completed : [])
    };
  } catch {
    return { attempted: new Set(), completed: new Set() };
  }
}

const savedProgress = readProgress();
const attemptedProblemIds = savedProgress.attempted;
const completedProblemIds = savedProgress.completed;

function saveProgress() {
  try {
    window.localStorage.setItem(progressStorageKey, JSON.stringify({
      attempted: [...attemptedProblemIds],
      completed: [...completedProblemIds]
    }));
  } catch {
    // The challenge remains usable when browser storage is unavailable.
  }
}

function updateProgressSummary() {
  const total = challengeData.problems.length;
  const completed = completedProblemIds.size;
  const percent = total ? (completed / total) * 100 : 0;
  progressCount.textContent = `${completed}/${total} selesai`;
  progressBar.setAttribute("aria-valuemax", String(total));
  progressBar.setAttribute("aria-valuenow", String(completed));
  progressBar.setAttribute("aria-valuetext", `${completed} dari ${total} soal selesai`);
  progressFill.style.width = `${percent}%`;
}

function makeElement(tagName, className, content) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function getDataset(problem) {
  const dataset = challengeData.datasets?.[problem.datasetId];
  if (!dataset) throw new Error(`Dataset untuk soal “${problem.title}” tidak tersedia.`);
  return dataset;
}

function renderQuestionList() {
  questionList.replaceChildren();
  const searchTerm = questionSearch.value.trim().toLocaleLowerCase("id-ID");
  let visibleCount = 0;
  for (const level of ["Easy", "Medium", "Hard"]) {
    const allLevelProblems = challengeData.problems.filter((problem) => problem.difficulty === level);
    const levelProblems = allLevelProblems.filter((problem) => {
      if (!searchTerm) return true;
      const searchableText = [problem.title, problem.topic, problem.prompt, getDataset(problem).name, problem.difficulty].join(" ").toLocaleLowerCase("id-ID");
      return searchableText.includes(searchTerm);
    });
    if (!levelProblems.length) continue;
    visibleCount += levelProblems.length;

    const group = document.createElement("details");
    group.className = "sql-question-group";
    group.open = Boolean(searchTerm) || activeProblem.difficulty === level;
    const heading = document.createElement("summary");
    heading.className = "sql-question-group-heading";
    const completedInLevel = allLevelProblems.filter((problem) => completedProblemIds.has(problem.id)).length;
    heading.append(
      makeElement("span", "sql-question-group-title", level),
      makeElement("span", "sql-question-group-count", `${completedInLevel}/${allLevelProblems.length} selesai`)
    );
    const cards = makeElement("div", "sql-question-group-cards");

    for (const problem of levelProblems) {
      const button = makeElement("button", "sql-question-card");
      button.type = "button";
      button.dataset.problemId = problem.id;
      button.setAttribute("aria-current", problem.id === activeProblem.id ? "true" : "false");
      const isCompleted = completedProblemIds.has(problem.id);
      const isAttempted = attemptedProblemIds.has(problem.id);
      const progressLabel = isCompleted ? "Selesai" : isAttempted ? "Sudah dicoba" : "Belum dicoba";
      const progressState = isCompleted ? "is-complete" : isAttempted ? "is-attempted" : "is-new";
      button.append(
        makeElement("span", "sql-question-card-title", problem.title),
        makeElement("span", "sql-question-card-meta", `${problem.topic} · ${getDataset(problem).name}`),
        makeElement("span", `sql-question-card-status ${progressState}`, progressLabel)
      );
      button.addEventListener("click", () => selectProblem(problem.id));
      cards.append(button);
    }

    group.append(heading, cards);
    questionList.append(group);
  }
  if (!visibleCount) questionList.append(makeElement("p", "sql-question-empty", "Tidak ada soal yang cocok. Coba kata kunci lain."));
  questionCount.textContent = searchTerm ? `${visibleCount} hasil` : `${challengeData.problems.length} soal`;
  updateProgressSummary();
}

function renderSchema(dataset) {
  schema.replaceChildren();
  for (const table of dataset.tables) {
    const card = makeElement("div", "sql-schema-table");
    card.append(makeElement("h3", "sql-schema-table-name", table.name));
    const tableElement = document.createElement("table");
    const body = document.createElement("tbody");
    for (const [columnName, columnType] of table.columns) {
      const row = document.createElement("tr");
      const name = document.createElement("th");
      name.scope = "row";
      name.append(makeElement("code", "", columnName));
      const type = document.createElement("td");
      type.textContent = columnType;
      row.append(name, type);
      body.append(row);
    }
    tableElement.append(body);
    card.append(tableElement);
    schema.append(card);
  }
}

function clearResult(message = "Hasil query akan tampil di sini.") {
  resultStatus.textContent = "Belum dijalankan";
  resultStatus.className = "sql-result-status";
  resultContent.replaceChildren(makeElement("p", "sql-result-empty", message));
}

function selectProblem(problemId, updateUrl = true) {
  const problem = challengeData.problems.find((entry) => entry.id === problemId) || challengeData.problems[0];
  activeProblem = problem;
  const dataset = getDataset(problem);
  title.textContent = problem.title;
  prompt.textContent = problem.prompt;
  difficulty.textContent = problem.difficulty;
  difficulty.className = `sql-difficulty is-${problem.difficulty.toLowerCase()}`;
  topic.textContent = problem.topic;
  datasetNameLabel.textContent = dataset.name;
  renderSchema(dataset);
  editor.value = "";
  clearResult();
  renderQuestionList();
  if (updateUrl) {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("q", problem.id);
    window.history.pushState({ problemId: problem.id }, "", nextUrl);
  }
}

function cellsEqual(actual, expected) {
  if (typeof expected === "number") {
    const actualNumber = typeof actual === "number" ? actual : Number(actual?.toString?.() ?? actual);
    return Number.isFinite(actualNumber) && Math.abs(actualNumber - expected) < 1e-8;
  }
  return actual === expected || String(actual) === String(expected);
}

function matchesExpected(actual, problem) {
  const actualColumns = actual.columns.map((column) => column.toLowerCase());
  const expectedColumns = problem.expectedColumns.map((column) => column.toLowerCase());
  if (actualColumns.length !== expectedColumns.length || actualColumns.some((column, index) => column !== expectedColumns[index])) return false;
  if (actual.rows.length !== problem.expectedRows.length) return false;
  return actual.rows.every((row, rowIndex) =>
    row.length === problem.expectedRows[rowIndex].length &&
    row.every((cell, columnIndex) => cellsEqual(cell, problem.expectedRows[rowIndex][columnIndex]))
  );
}

function renderQueryResult(queryResult, accepted) {
  const table = document.createElement("table");
  table.className = "sql-result-table";
  const head = document.createElement("thead");
  const headingRow = document.createElement("tr");
  for (const column of queryResult.columns) headingRow.append(makeElement("th", "", column));
  head.append(headingRow);
  const body = document.createElement("tbody");
  for (const values of queryResult.rows) {
    const row = document.createElement("tr");
    for (const value of values) row.append(makeElement("td", "", value === null ? "NULL" : String(value)));
    body.append(row);
  }
  table.append(head, body);
  resultContent.replaceChildren();
  if (!queryResult.rows.length) resultContent.append(makeElement("p", "sql-result-empty", "Query berhasil dijalankan, tetapi tidak mengembalikan baris."));
  const tableWrap = makeElement("div", "sql-result-table-wrap");
  tableWrap.tabIndex = 0;
  tableWrap.setAttribute("role", "region");
  tableWrap.setAttribute("aria-label", "Hasil query; tabel dapat digulir horizontal");
  tableWrap.append(table);
  resultContent.append(tableWrap);
  resultStatus.textContent = accepted ? "Benar · hasil cocok" : "Query berjalan · hasil belum cocok";
  resultStatus.className = `sql-result-status ${accepted ? "is-correct" : "is-incorrect"}`;
}

function readableQueryError(error) {
  const message = error?.message || "SQL engine tidak bisa dijalankan. Coba lagi.";
  if (/failed to fetch dynamically imported module/i.test(message)) {
    return "Mesin SQL gagal dimuat. Periksa koneksi internet, lalu coba lagi.";
  }
  return message;
}

async function runActiveQuery() {
  if (!activeProblem || runButton.disabled) return;
  const problemToRun = activeProblem;
  const sqlToRun = editor.value;
  if (!sqlToRun.trim()) {
    resultStatus.textContent = "Query masih kosong";
    resultStatus.className = "sql-result-status is-incorrect";
    resultContent.replaceChildren(makeElement("p", "sql-error", "Tulis query SQL terlebih dahulu untuk mencoba soal ini."));
    editor.focus();
    return;
  }
  runButton.disabled = true;
  runButton.textContent = "Menjalankan…";
  resultStatus.textContent = "Menjalankan query…";
  resultStatus.className = "sql-result-status";
  resultContent.replaceChildren(makeElement("p", "sql-result-empty", "Mesin SQL berjalan di browser."));

  try {
    engineModulePromise ??= import("./sql-engine.js?v=1.2");
    const engine = await engineModulePromise;
    attemptedProblemIds.add(problemToRun.id);
    saveProgress();
    renderQuestionList();
    const queryResult = await engine.runQuery(getDataset(problemToRun).setupSql, sqlToRun);
    const accepted = matchesExpected(queryResult, problemToRun);
    if (accepted) {
      completedProblemIds.add(problemToRun.id);
      saveProgress();
      renderQuestionList();
    }
    if (activeProblem === problemToRun) renderQueryResult(queryResult, accepted);
  } catch (error) {
    if (activeProblem === problemToRun) {
      resultStatus.textContent = "Belum berhasil";
      resultStatus.className = "sql-result-status is-incorrect";
      resultContent.replaceChildren(makeElement("p", "sql-error", readableQueryError(error)));
    }
    if (error?.message?.toLowerCase().includes("fetch") || error?.message?.toLowerCase().includes("network")) {
      engineModulePromise = undefined;
    }
  } finally {
    runButton.disabled = false;
    runButton.textContent = "Jalankan SQL";
  }
}

async function loadChallenge() {
  try {
    const response = await fetch("problems.json?v=3");
    if (!response.ok) throw new Error("Daftar soal tidak bisa dimuat.");
    challengeData = await response.json();
    const requestedId = new URLSearchParams(window.location.search).get("q");
    selectProblem(requestedId || challengeData.problems[0]?.id, false);
    loadState.hidden = true;
    problemView.hidden = false;
  } catch (error) {
    loadState.textContent = error?.message || "Soal tidak bisa dimuat. Muat ulang halaman untuk mencoba lagi.";
    loadState.classList.add("is-error");
  }
}

runButton.addEventListener("click", runActiveQuery);
questionSearch.addEventListener("input", renderQuestionList);
clearButton.addEventListener("click", () => {
  if (!activeProblem) return;
  editor.value = "";
  clearResult("Editor dikosongkan. Tulis query untuk mencoba lagi.");
  editor.focus();
});
window.addEventListener("popstate", () => {
  if (!challengeData) return;
  const problemId = new URLSearchParams(window.location.search).get("q");
  selectProblem(problemId || challengeData.problems[0]?.id, false);
});

loadChallenge();
