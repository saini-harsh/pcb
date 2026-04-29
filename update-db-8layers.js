const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'payload.db');
const db = new DatabaseSync(dbPath);

const layer8Data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'layer8_rates.json'), 'utf8'));

console.log('--- Updating fabrication_rates table for 8 layers ---');

db.prepare('DELETE FROM fabrication_rates WHERE layers = 8').run();
console.log('Deleted existing layer 8 rates.');

const insertStmt = db.prepare(`
    INSERT INTO fabrication_rates (layers, item_no, range_start, price10wd_pg, price10wd, price3wd, price5wd, price7wd, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const now = new Date().toISOString().replace('T', ' ').split('.')[0];

layer8Data.forEach((rate, i) => {
    const itemNo = `L8-RATE-${i + 1}`;
    insertStmt.run(8, itemNo, rate.rangeStart, rate.price10WD, 0, 0, 0, 0, now, now);
});

console.log(`Successfully inserted ${layer8Data.length} layer 8 rates.`);
