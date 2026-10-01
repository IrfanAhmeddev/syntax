
const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 3000;

// Connect to the existing SQLite database
const db = new Database(
  path.join(__dirname, "data", "asi.db"),
  { readonly: true }
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ASI Error Solver API"
  });
});

// Get all errors
app.get("/api/errors", (req, res) => {
  const errors = db.prepare(`
    SELECT
      id,
      error_code,
      error_title,
      error_message,
      error_type,
      technology,
      root_cause,
      solution,
      solution_steps,
      verification,
      tags,
      status
    FROM errors
    WHERE status = 'verified'
    ORDER BY id DESC
  `).all();

  res.json({
    total: errors.length,
    errors: errors.map((error) => ({
      ...error,
      solution_steps: JSON.parse(error.solution_steps || "[]")
    }))
  });
});

// Search errors
app.get("/api/search", (req, res) => {
  const query = String(req.query.q || "").trim();

  if (!query) {
    return res.status(400).json({
      error: "Please provide a search query using ?q="
    });
  }

  const searchTerm = `%${query}%`;

  const errors = db.prepare(`
    SELECT
      id,
      error_code,
      error_title,
      error_message,
      error_type,
      technology,
      root_cause,
      solution,
      solution_steps,
      verification,
      tags,
      status
    FROM errors
    WHERE status = 'verified'
      AND (
        error_title LIKE ?
        OR error_message LIKE ?
        OR error_type LIKE ?
        OR technology LIKE ?
        OR root_cause LIKE ?
        OR tags LIKE ?
      )
    ORDER BY id DESC
    LIMIT 50
  `).all(
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm
  );

  res.json({
    query,
    total: errors.length,
    errors: errors.map((error) => ({
      ...error,
      solution_steps: JSON.parse(error.solution_steps || "[]")
    }))
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "API endpoint not found"
  });
});

app.listen(PORT, () => {
  console.log(`ASI API running at http://localhost:${PORT}`);
});