const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

let dbPromise;

async function setupDB() {
  const dbPath = path.join(__dirname, 'database.sqlite');
  
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Enable foreign keys for SQLite
  await db.exec('PRAGMA foreign_keys = ON;');

  // Run schema to create tables if they don't exist
  const schemaPath = path.join(__dirname, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await db.exec(schemaSql);
  }
  
  console.log('Connected to SQLite database successfully');
  return db;
}

// Export a proxy object representing the database connection that mimics mysql2 API
const dbWrapper = {
  async query(sql, params) {
    if (!dbPromise) dbPromise = setupDB();
    const db = await dbPromise;
    
    const upperSql = sql.trim().toUpperCase();
    if (upperSql.startsWith('SELECT')) {
      const rows = await db.all(sql, params);
      return [rows]; // Wrap in array to match mysql2 array restructuring [rows, fields]
    } else {
      const result = await db.run(sql, params);
      // Mock mysql2 result object insertion data
      return [{ insertId: result.lastID, affectedRows: result.changes }];
    }
  }
};

module.exports = dbWrapper;
