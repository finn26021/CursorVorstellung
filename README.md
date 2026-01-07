# Cursor Präsentation - GitHub Pages

Diese Präsentation demonstriert die Möglichkeiten von Cursor - von der Idee bis zur fertigen Website in Minuten statt Wochen.

## 🚀 GitHub Pages Deployment

Diese Website wird automatisch auf GitHub Pages deployed, wenn Code zum `main` oder `master` Branch gepusht wird.

### Lokale Entwicklung

1. Dependencies installieren:
```bash
npm install
```

2. Server starten:
```bash
npm start
```

Die Website ist dann unter `http://localhost:3000` erreichbar.

### GitHub Pages Setup

1. **Repository auf GitHub erstellen** (falls noch nicht geschehen):
   - Gehe zu GitHub und erstelle ein neues Repository
   - Kopiere die Repository-URL

2. **Repository initialisieren und pushen**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <DEINE-REPO-URL>
git push -u origin main
```

3. **GitHub Pages aktivieren**:
   - Gehe zu deinem Repository auf GitHub
   - Klicke auf **Settings** → **Pages**
   - Unter **Source** wähle **GitHub Actions**
   - Der Workflow wird automatisch ausgeführt und die Website wird deployed

4. **Website aufrufen**:
   - Nach dem ersten Deployment findest du die URL unter **Settings** → **Pages**
   - Die URL ist normalerweise: `https://<DEIN-USERNAME>.github.io/<REPO-NAME>`

### Projektstruktur

```
.
├── public/              # Statische Dateien für GitHub Pages
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── data/
├── server.js           # Express Server (nur für lokale Entwicklung)
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions Workflow
```

### Hinweise

- Der Node.js Server (`server.js`) wird nur für die lokale Entwicklung verwendet
- Auf GitHub Pages werden nur die statischen Dateien aus dem `public/` Ordner deployed
- Änderungen werden automatisch deployed, wenn du zum `main` Branch pushst

