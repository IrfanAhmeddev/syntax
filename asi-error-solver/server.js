
const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");
const Fuse = require("fuse.js");
const natural = require("natural");
const winkNLP = require("wink-nlp");
const winkModel = require("wink-eng-lite-web-model");

const app = express();
const PORT = process.env.PORT || 3000;

// Database
const db = new Database(
  path.join(__dirname, "data", "asi.db"),
  { readonly: true }
);

// Middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

// NLP configuration
const MODEL_ID = "Xenova/all-MiniLM-L6-v2";
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

const nlp = winkNLP(winkModel);
const its = nlp.its;

let extractor = null;
let modelReady = false;
let modelError = null;
let indexedErrors = [];
let fuse = null;

// ------------------------------
// Text processing
// ------------------------------

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/[^\w\s.#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function naturalTokens(text) {
  return tokenizer
    .tokenize(normalizeText(text))
    .map((token) => stemmer.stem(token))
    .filter((token) => token.length > 1);
}

function winkTokens(text) {
  try {
    return nlp
      .readDoc(String(text || ""))
      .tokens()
      .out(its.value)
      .filter((token) => /^[a-z0-9_]+$/i.test(token))
      .map((token) => token.toLowerCase());
  } catch (error) {
    console.error("wink-nlp tokenization error:", error.message);
    return [];
  }
}

function buildSearchText(error) {
  return [
    error.error_title,
    error.error_message,
    error.error_type,
    error.technology,
    error.root_cause,
    error.solution,
    error.tags
  ]
    .filter(Boolean)
    .join(". ");
}

function parseError(row) {
  let steps = [];

  try {
    steps = JSON.parse(row.solution_steps || "[]");
  } catch {
    steps = [];
  }

  return {
    ...row,
    solution_steps: steps
  };
}

// ------------------------------
// Database
// ------------------------------

function loadErrors() {
  return db
    .prepare(
      `SELECT *
       FROM errors
       WHERE status = ?
       ORDER BY id DESC`
    )
    .all("verified")
    .map(parseError);
}

// ------------------------------
// Embeddings
// ------------------------------

async function generateEmbeddings(texts) {
  const output = await extractor(texts, {
    pooling: "mean",
    normalize: true
  });

  return output.tolist();
}

function similarity(a, b) {
  let score = 0;

  for (let i = 0; i < a.length; i++) {
    score += a[i] * b[i];
  }

  return score;
}

// ------------------------------
// Keyword relevance
// ------------------------------

function keywordOverlap(queryTokens, documentTokens) {
  if (!queryTokens.length || !documentTokens.length) {
    return 0;
  }

  const documentSet = new Set(documentTokens);
  const uniqueQueryTokens = [...new Set(queryTokens)];

  let matched = 0;

  for (const token of uniqueQueryTokens) {
    if (documentSet.has(token)) {
      matched++;
    }
  }

  return matched / uniqueQueryTokens.length;
}

// ------------------------------
// Initialize model and index
// ------------------------------

async function initializeNLP() {
  console.log("Loading ASI NLP model...");

  const { pipeline } = await import("@huggingface/transformers");

  extractor = await pipeline("feature-extraction", MODEL_ID);

  console.log("MiniLM model loaded.");

  const errors = loadErrors();

  console.log(`Preparing ${errors.length} verified errors...`);

  if (errors.length === 0) {
    indexedErrors = [];
    fuse = null;
    modelReady = true;
    console.log("No verified errors available.");
    return;
  }

  const documents = errors.map((error) => {
    const searchText = buildSearchText(error);

    return {
      error,
      searchText,
      naturalTokens: naturalTokens(searchText),
      winkTokens: winkTokens(searchText)
    };
  });

  console.log("Generating semantic embeddings...");

  const embeddings = await generateEmbeddings(
    documents.map((document) => document.searchText)
  );

  indexedErrors = documents.map((document, index) => ({
    ...document,
    embedding: embeddings[index]
  }));

  fuse = new Fuse(indexedErrors, {
    keys: [
      { name: "error.error_code", weight: 2.0 },
      { name: "error.error_title", weight: 2.0 },
      { name: "error.error_message", weight: 2.0 },
      { name: "error.error_type", weight: 1.5 },
      { name: "error.technology", weight: 1.3 },
      { name: "error.root_cause", weight: 1.5 },
      { name: "error.solution", weight: 1.0 },
      { name: "error.tags", weight: 1.5 }
    ],
    includeScore: true,
    threshold: 0.65,
    ignoreLocation: true,
    minMatchCharLength: 2
  });

  modelReady = true;

  console.log(`ASI NLP ready. Indexed ${indexedErrors.length} errors.`);
}

// ------------------------------
// Hybrid search
// ------------------------------

async function hybridSearch(query, limit = 5) {
  const queryTokens = naturalTokens(query);
  const queryWinkTokens = winkTokens(query);

  const [queryEmbedding] = await generateEmbeddings([query]);

  const fuzzyResults = fuse ? fuse.search(query) : [];

  const fuzzyScores = new Map();

  for (const result of fuzzyResults) {
    fuzzyScores.set(result.item.error.id, 1 - (result.score || 0));
  }

  const results = indexedErrors.map((item) => {
    const semanticRaw = similarity(
      queryEmbedding,
      item.embedding
    );

    const semanticScore = Math.max(
      0,
      Math.min(1, (semanticRaw + 1) / 2)
    );

    const fuzzyScore = fuzzyScores.get(item.error.id) || 0;

    const combinedDocumentTokens = [
      ...item.naturalTokens,
      ...item.winkTokens
    ];

    const combinedQueryTokens = [
      ...queryTokens,
      ...queryWinkTokens
    ];

    const keywordScore = keywordOverlap(
      combinedQueryTokens,
      combinedDocumentTokens
    );

    const finalScore =
      semanticScore * 0.65 +
      fuzzyScore * 0.25 +
      keywordScore * 0.10;

    return {
      ...item.error,
      similarity: Number(semanticScore.toFixed(4)),
      fuzzy_score: Number(fuzzyScore.toFixed(4)),
      keyword_score: Number(keywordScore.toFixed(4)),
      relevance_score: Number(finalScore.toFixed(4))
    };
  });

  return results
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, limit);
}

// ------------------------------
// Routes
// ------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    status: modelReady ? "ready" : "loading",
    model: MODEL_ID,
    indexed_errors: indexedErrors.length,
    components: {
      transformers: Boolean(extractor),
      fuse: Boolean(fuse),
      natural: Boolean(tokenizer),
      wink: Boolean(nlp)
    },
    model_error: modelError
  });
});

app.get("/api/errors", (req, res) => {
  try {
    res.json({
      errors: loadErrors()
    });
  } catch (error) {
    console.error("Error loading records:", error);

    res.status(500).json({
      error: "Failed to load error records."
    });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.status(400).json({
        error: "Please enter an error description."
      });
    }

    if (query.length > 2000) {
      return res.status(400).json({
        error: "Query is too long. Maximum length is 2000 characters."
      });
    }

    if (!modelReady) {
      return res.status(503).json({
        error: "ASI NLP model is still loading."
      });
    }

    const results = await hybridSearch(query, 5);

    res.json({
      query,
      search_type: "hybrid",
      count: results.length,
      errors: results
    });
  } catch (error) {
    console.error("Hybrid search error:", error);

    res.status(500).json({
      error: "Hybrid search failed."
    });
  }
});

// ------------------------------
// Server startup
// ------------------------------

async function startServer() {
  try {
    await initializeNLP();

    app.listen(PORT, () => {
      console.log(`ASI server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    modelError = error.message;

    console.error("Failed to initialize ASI NLP:", error);
    process.exitCode = 1;
  }
}

startServer();