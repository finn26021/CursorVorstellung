const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Excel-Datei lesen
const excelPath = path.join(__dirname, 'Finanzen "Kunst gegen Commerz" .xlsx');

try {
    const workbook = XLSX.readFile(excelPath);
    
    // Alle Sheets anzeigen
    console.log('Verfügbare Sheets:', workbook.SheetNames);
    
    // Daten aus allen Sheets extrahieren
    const data = {};
    
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
        data[sheetName] = jsonData;
        
        console.log(`\n=== Sheet: ${sheetName} ===`);
        console.log('Erste 10 Zeilen:');
        jsonData.slice(0, 10).forEach((row, index) => {
            console.log(`Zeile ${index + 1}:`, row);
        });
    });
    
    // Daten als JSON speichern
    fs.writeFileSync(
        path.join(__dirname, 'public', 'data', 'finanzen-data.json'),
        JSON.stringify(data, null, 2),
        'utf8'
    );
    
    console.log('\n✅ Daten erfolgreich extrahiert und gespeichert!');
    
} catch (error) {
    console.error('Fehler beim Lesen der Excel-Datei:', error);
}

