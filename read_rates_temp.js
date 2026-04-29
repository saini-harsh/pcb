const XLSX = require('xlsx');
const fs = require('fs');

function readSheet(filename, outname) {
    if (!fs.existsSync(filename)) {
        console.error(`File not found: ${filename}`);
        return;
    }
    console.log(`\n--- Reading ${filename} ---`);
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    fs.writeFileSync(outname, JSON.stringify(data, null, 2));
    console.log(`Saved to ${outname}`);
}

try {
    readSheet('FABRICATION RATE SHEET_layer1.xlsx', 'layer1_rates.json');
    readSheet('FABRICATION RATE SHEET_layer2.xlsx', 'layer2_rates.json');
} catch (error) {
    console.error('Error reading files:', error.message);
}
