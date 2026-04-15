import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

async function testDB() {
  const dbPath = 'C:/Users/Admin/Downloads/harsh/pcb/payload.db';
  console.log('Testing DB at:', dbPath);
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    const result = await db.get('SELECT name FROM sqlite_master WHERE type="table"');
    console.log('Successfully connected to DB. Tables found:', !!result);
    await db.close();
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

testDB();
