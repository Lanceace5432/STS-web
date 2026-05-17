const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'roome.db');

// Open the SQLite database
const dbInstance = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('💾 Connected to the SQLite database.');
  }
});

// A synchronous-like compatibility layer so your routes don't break
const db = {
  prepare: (sql) => {
    return {
      all: (...params) => {
        return new Promise((resolve, reject) => {
          dbInstance.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
          });
        });
      },
      get: (...params) => {
        return new Promise((resolve, reject) => {
          dbInstance.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        });
      },
      run: (...params) => {
        return new Promise((resolve, reject) => {
          dbInstance.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ lastInsertRowid: this.lastID, changes: this.changes });
          });
        });
      }
    };
  }
};

module.exports = db;