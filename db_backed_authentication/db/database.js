import sqlite3 from "sqlite3";

const db = new sqlite3.Database("auth.db");

const sqlstring = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL
);`;

db.run(sqlstring);

export { db };
