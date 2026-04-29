const fs = require('fs');

const layer1 = JSON.parse(fs.readFileSync('layer1_rates.json', 'utf8'));
const layer2 = JSON.parse(fs.readFileSync('layer2_rates.json', 'utf8'));

const cleanLayer1 = layer1.filter(row => (row['SQ.MTR'] !== undefined || row.SQ_MTR !== undefined || row.__EMPTY_2 !== undefined) && row.__EMPTY !== undefined).map(row => ({
    sqmtr: Math.max(row['SQ.MTR'] || 0, row.SQ_MTR || 0, row.__EMPTY_2 || 0),
    '3 WD': Math.round(row['3 WD']),
    '5 WD': Math.round(row['5 WD']),
    '7 WD': Math.round(row['7 WD']),
    '1 WD': Math.round(row['1 WD'])
}));

const cleanLayer2 = layer2.filter(row => (row['SQ.MTR'] !== undefined || row.SQ_MTR !== undefined || row.__EMPTY_2 !== undefined) && row.__EMPTY !== undefined).map(row => ({
    sqmtr: Math.max(row['SQ.MTR'] || 0, row.SQ_MTR || 0, row.__EMPTY_2 || 0),
    '3 WD': Math.round(row['__EMPTY_4']),
    '5 WD': Math.round(row['__EMPTY_6']),
    '7 WD': Math.round(row['__EMPTY_8'])
}));

fs.writeFileSync('src/lib/rates.json', JSON.stringify({
    1: cleanLayer1,
    2: cleanLayer2
}, null, 2));

console.log('Clean rates saved to src/lib/rates.json');
