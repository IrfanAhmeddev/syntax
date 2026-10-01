
import Database from "better-sqlite3";
import sqlite from "retriv/db/sqlite";
import { transformersJs } from "retriv/embeddings/transformers-js";
import { createRetriv } from "retriv";
import path from "node:path";

const dbPath = path.resolve("data/asi.db");
const indexPath = path.resolve("data/retriv-test.db");

const sourceDb = new Database(dbPath, {
  readonly: true,
});

let provider;
let searchEngine;

async function main() {
  console.log("Loading verified ASI error records...");

  const rows = sourceDb
    .prepare(
      `SELECT *
       FROM errors
       WHERE status = 'verified'`
    )
    .all();

  console.log(`Found ${rows.length} verified records.`);

  const documents = rows.map((row) => ({
    id: String(row.id),
    content: [
      `Error code: ${row.error_code ?? ""}`,
      `Title: ${row.error_title ?? ""}`,
      `Message: ${row.error_message ?? ""}`,
      `Type: ${row.error_type ?? ""}`,
      `Technology: ${row.technology ?? ""}`,
      `Root cause: ${row.root_cause ?? ""}`,
      `Solution: ${row.solution ?? ""}`,
      `Steps: ${row.solution_steps ?? ""}`,
      `Verification: ${row.verification ?? ""}`,
      `Tags: ${row.tags ?? ""}`,
    ].join("\n"),
    metadata: {
      error_code: String(row.error_code ?? ""),
      error_title: String(row.error_title ?? ""),
      technology: String(row.technology ?? ""),
      status: String(row.status ?? ""),
    },
  }));

  console.log("Initializing Retriv SQLite hybrid search...");

  provider = await sqlite({
    path: indexPath,
    embeddings: transformersJs({
      model: "Xenova/all-MiniLM-L6-v2",
      dimensions: 384,
    }),
  });

  searchEngine = await createRetriv({
    driver: provider,
  });

  console.log("Indexing verified error records...");

  const result = await searchEngine.index(documents, {
    onProgress(progress) {
      console.log(
        `${progress.phase}: ${progress.current}/${progress.total}`
      );
    },
  });

  console.log(`Indexed ${result.count} records.`);

  const queries = [
    "Cannot find module",
    "SQLite database is locked",
    "Cannot read properties of undefined",
    "Supabase API key is missing",
  ];

  for (const query of queries) {
    console.log("\n==================================");
    console.log(`QUERY: ${query}`);
    console.log("==================================");

    const results = await searchEngine.search(query, {
      limit: 5,
      returnMetadata: true,
    });

    if (results.length === 0) {
      console.log("No matching records found.");
      continue;
    }

    for (const [index, item] of results.entries()) {
      console.log(
        `${index + 1}. ${
          item.metadata?.error_code ?? item.id
        } | ${
          item.metadata?.error_title ?? "Untitled"
        } | Score: ${item.score.toFixed(4)}`
      );
    }
  }

  console.log("\nRetriv test completed.");
}

main()
  .catch((error) => {
    console.error("Retriv test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    sourceDb.close();

    try {
      if (searchEngine?.close) {
        await searchEngine.close();
      } else if (provider?.close) {
        await provider.close();
      }
    } catch (error) {
      console.error("Cleanup failed:", error);
    }
  });