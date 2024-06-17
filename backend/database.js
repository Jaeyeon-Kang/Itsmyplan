const config = require("./config");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const DATABASE_URL = config.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is not defined");
  process.exit(1);
}

// 데이터베이스 파일 연결
const db = new sqlite3.Database(
  path.resolve(DATABASE_URL),
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the database.");
    }
  }
);

// 테이블 생성
db.run(
  `CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY, 
  title TEXT NOT NULL,
  detail TEXT,
  time TEXT NOT NULL
)`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

module.exports = db;
