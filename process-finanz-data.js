const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Excel-Datei lesen
const excelPath = path.join(__dirname, 'Finanzen "Kunst gegen Commerz" .xlsx');
const workbook = XLSX.readFile(excelPath);

// Daten aus Tabellenblatt1 extrahieren (Kunstwerke)
const sheet1 = workbook.Sheets[workbook.SheetNames[0]];
const sheet1Data = XLSX.utils.sheet_to_json(sheet1, { header: 1, defval: '' });

// Header-Zeile finden (erste Zeile mit "Kategorie")
let headerRowIndex = 0;
for (let i = 0; i < sheet1Data.length; i++) {
    if (sheet1Data[i][0] === 'Kategorie' || sheet1Data[i][0] === 'Segel 2005' || sheet1Data[i][0] === 'Transparente 2015') {
        if (sheet1Data[i][0] === 'Kategorie') {
            headerRowIndex = i;
            break;
        } else {
            // Header ist wahrscheinlich in Zeile 0
            headerRowIndex = 0;
            break;
        }
    }
}

// Daten verarbeiten
const kunstwerke = [];
const kategorien = {};
const kuenstler = {};
let gesamtUmsatz = 0;
let gesamtGewinn = 0;
let verkaufteWerke = 0;

// Ab Zeile nach Header durchgehen
for (let i = headerRowIndex + 1; i < sheet1Data.length; i++) {
    const row = sheet1Data[i];
    
    // Prüfe ob es eine Datenzeile ist (Kategorie vorhanden und nicht leer)
    if (row[0] && row[0] !== 'Legende' && row[0] !== 'Gelb = hängt' && row[0] !== 'Rot = Verkauft' && row[0] !== 'Grün = Lager') {
        const kategorie = row[0] || '';
        const name = row[1] || '';
        const kuenstlerName = row[2] || '';
        const anzahl = parseInt(row[3]) || 0;
        const preis = parseFloat(row[4]) || 0;
        const umsatz = parseFloat(row[5]) || 0;
        const gewinn = parseFloat(row[6]) || 0;
        
        if (kategorie && kategorie.trim() !== '') {
            kunstwerke.push({
                kategorie: kategorie.trim(),
                name: name.trim(),
                kuenstler: kuenstlerName.trim(),
                anzahl: anzahl,
                preis: preis,
                umsatz: umsatz,
                gewinn: gewinn
            });
            
            // Kategorien aggregieren
            if (!kategorien[kategorie.trim()]) {
                kategorien[kategorie.trim()] = { umsatz: 0, gewinn: 0, anzahl: 0 };
            }
            kategorien[kategorie.trim()].umsatz += umsatz;
            kategorien[kategorie.trim()].gewinn += gewinn;
            kategorien[kategorie.trim()].anzahl += anzahl;
            
            // Künstler aggregieren
            if (kuenstlerName && kuenstlerName.trim() !== '') {
                if (!kuenstler[kuenstlerName.trim()]) {
                    kuenstler[kuenstlerName.trim()] = { umsatz: 0, gewinn: 0, anzahl: 0 };
                }
                kuenstler[kuenstlerName.trim()].umsatz += umsatz;
                kuenstler[kuenstlerName.trim()].gewinn += gewinn;
                kuenstler[kuenstlerName.trim()].anzahl += anzahl;
            }
            
            gesamtUmsatz += umsatz;
            gesamtGewinn += gewinn;
            if (anzahl > 0) verkaufteWerke += anzahl;
        }
    }
}

// Tabellenblatt2 verarbeiten (Winderäder)
const sheet2 = workbook.Sheets[workbook.SheetNames[1]];
const sheet2Data = XLSX.utils.sheet_to_json(sheet2, { header: 1, defval: '' });

for (let i = 1; i < sheet2Data.length; i++) {
    const row = sheet2Data[i];
    if (row[0] && row[0] !== 'Kategorie') {
        const kategorie = row[0] || 'Winderäder';
        const kuenstlerName = row[2] || '';
        const umsatzEinzeln = parseFloat(row[9]) || 0;
        const umsatzGesamt = parseFloat(row[10]) || 0;
        const gewinn = parseFloat(row[11]) || 0;
        const verkauftEinzeln = parseInt(row[6]) || 0;
        const verkauftSets = parseInt(row[7]) || 0;
        
        if (kategorie) {
            if (!kategorien[kategorie]) {
                kategorien[kategorie] = { umsatz: 0, gewinn: 0, anzahl: 0 };
            }
            kategorien[kategorie].umsatz += umsatzGesamt || umsatzEinzeln;
            kategorien[kategorie].gewinn += gewinn;
            kategorien[kategorie].anzahl += verkauftEinzeln + verkauftSets;
            
            if (kuenstlerName && kuenstlerName.trim() !== '') {
                if (!kuenstler[kuenstlerName.trim()]) {
                    kuenstler[kuenstlerName.trim()] = { umsatz: 0, gewinn: 0, anzahl: 0 };
                }
                kuenstler[kuenstlerName.trim()].umsatz += umsatzGesamt || umsatzEinzeln;
                kuenstler[kuenstlerName.trim()].gewinn += gewinn;
                kuenstler[kuenstlerName.trim()].anzahl += verkauftEinzeln + verkauftSets;
            }
            
            gesamtUmsatz += umsatzGesamt || umsatzEinzeln;
            gesamtGewinn += gewinn;
            verkaufteWerke += verkauftEinzeln + verkauftSets;
        }
    }
}

// Top Kategorien nach Umsatz sortieren
const topKategorien = Object.entries(kategorien)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.umsatz - a.umsatz)
    .slice(0, 10);

// Top Künstler nach Umsatz sortieren
const topKuenstler = Object.entries(kuenstler)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.umsatz - a.umsatz)
    .slice(0, 10);

// Daten für Charts vorbereiten
const chartData = {
    gesamt: {
        umsatz: Math.round(gesamtUmsatz),
        gewinn: Math.round(gesamtGewinn),
        verkaufteWerke: verkaufteWerke
    },
    kategorien: {
        labels: topKategorien.map(k => k.name),
        umsatz: topKategorien.map(k => Math.round(k.umsatz)),
        gewinn: topKategorien.map(k => Math.round(k.gewinn)),
        anzahl: topKategorien.map(k => k.anzahl)
    },
    kuenstler: {
        labels: topKuenstler.map(k => k.name),
        umsatz: topKuenstler.map(k => Math.round(k.umsatz)),
        gewinn: topKuenstler.map(k => Math.round(k.gewinn)),
        anzahl: topKuenstler.map(k => k.anzahl)
    },
    verkaufsstatistik: {
        verkauft: verkaufteWerke,
        gesamt: kunstwerke.length + (sheet2Data.length - 1),
        verkaufsquote: Math.round((verkaufteWerke / (kunstwerke.length + (sheet2Data.length - 1))) * 100)
    }
};

// Daten speichern
fs.writeFileSync(
    path.join(__dirname, 'public', 'data', 'kunst-gegen-commerz.json'),
    JSON.stringify(chartData, null, 2),
    'utf8'
);

console.log('✅ Daten verarbeitet!');
console.log('Gesamtumsatz:', chartData.gesamt.umsatz, '€');
console.log('Gesamtgewinn:', chartData.gesamt.gewinn, '€');
console.log('Verkaufte Werke:', chartData.gesamt.verkaufteWerke);
console.log('Top Kategorien:', topKategorien.length);
console.log('Top Künstler:', topKuenstler.length);

