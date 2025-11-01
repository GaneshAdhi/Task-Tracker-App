// import thrid party package

import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// database and server connet
const dbPath = path.join(__dirname, "../tasksTracker.db");

let db = null;

export const initializeDbAndServer = async (app, PORT) => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server start at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(`DB ERROR: ${e.message}`);
    process.exit(1);
  }
};

export const getDb = () => db;
