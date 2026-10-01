
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "data");
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "asi.db"));

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS errors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    error_code TEXT UNIQUE NOT NULL,
    error_title TEXT NOT NULL,
    error_message TEXT NOT NULL,
    error_type TEXT NOT NULL,
    technology TEXT NOT NULL,
    root_cause TEXT NOT NULL,
    solution TEXT NOT NULL,
    solution_steps TEXT NOT NULL,
    verification TEXT NOT NULL,
    tags TEXT DEFAULT '',
    status TEXT DEFAULT 'draft',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const insert = db.prepare(`
  INSERT OR IGNORE INTO errors (
    error_code, error_title, error_message,
    error_type, technology, root_cause,
    solution, solution_steps, verification,
    tags, status
  ) VALUES (
    @error_code, @error_title, @error_message,
    @error_type, @technology, @root_cause,
    @solution, @solution_steps, @verification,
    @tags, @status
  )
`);

const errors = [
  {
    error_code: "ASI-JS-0001",
    error_title: "ReferenceError: Variable is not defined",
    error_message: "ReferenceError: SUPABASE_KEY is not defined",
    error_type: "ReferenceError",
    technology: "JavaScript",
    root_cause: "The variable is not declared or is inaccessible in the current scope.",
    solution: "Declare the variable with the correct name and ensure it is accessible.",
    solution_steps: JSON.stringify([
      "Locate the line referencing the variable.",
      "Check whether it has been declared.",
      "Check spelling and capitalization.",
      "Ensure it is accessible in the current scope."
    ]),
    verification: "Reload the application and confirm the error no longer occurs.",
    tags: "javascript,referenceerror,variable",
    status: "verified"
  },
  {
    error_code: "ASI-JS-0002",
    error_title: "TypeError: Cannot read properties of undefined",
    error_message: "TypeError: Cannot read properties of undefined (reading 'name')",
    error_type: "TypeError",
    technology: "JavaScript",
    root_cause: "The code accesses a property on an undefined value.",
    solution: "Check that the value exists before accessing its properties.",
    solution_steps: JSON.stringify([
      "Find the expression accessing the property.",
      "Inspect the variable before the failing operation.",
      "Check whether the data has been initialized.",
      "Correct the missing value or add an appropriate guard."
    ]),
    verification: "Run the code again and confirm the property access succeeds.",
    tags: "javascript,typeerror,undefined",
    status: "draft"
  },
  {
    error_code: "ASI-NPM-0001",
    error_title: "npm: Missing script",
    error_message: "npm error Missing script: \"dev\"",
    error_type: "ConfigurationError",
    technology: "Node.js / npm",
    root_cause: "The package.json file does not define a dev script.",
    solution: "Add a dev script appropriate for the project.",
    solution_steps: JSON.stringify([
      "Open package.json.",
      "Find the scripts section.",
      "Add the appropriate dev command.",
      "Save the file and run npm run dev again."
    ]),
    verification: "Confirm that npm recognizes the script and starts the intended server.",
    tags: "npm,nodejs,packagejson",
    status: "draft"
  }
];

const insertMany = db.transaction((records) => {
  for (const error of records) {
    insert.run(error);
  }
});

insertMany(errors);

console.log("ASI database initialized successfully.");
console.log("Total errors:", db.prepare("SELECT COUNT(*) AS count FROM errors").get().count);

db.close();