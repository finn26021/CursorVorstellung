// Live Diagramm-Generierung - Interaktive Demo mit Button

let animationStarted = false;

// Button Event Listener
const generateButton = document.getElementById('generateButton');
const resultContainer = document.getElementById('resultContainer');
const resultStatus = document.getElementById('resultStatus');
const dashboardPreview = document.getElementById('dashboardPreview');

if (generateButton) {
    generateButton.addEventListener('click', () => {
        if (!animationStarted) {
            animationStarted = true;
            startDiagramGeneration();
        }
    });
}

function startDiagramGeneration() {
    // Button deaktivieren und Text ändern
    if (generateButton) {
        generateButton.disabled = true;
        generateButton.querySelector('.button-text').textContent = 'Generiere...';
        generateButton.style.opacity = '0.7';
    }
    
    // Result Container anzeigen
    if (resultContainer) {
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Status: Wird generiert
    if (resultStatus) {
        resultStatus.innerHTML = '<span class="status-badge processing">Wird generiert...</span>';
    }
    
    // Zeige Loading-Animation
    if (dashboardPreview) {
        dashboardPreview.innerHTML = `
            <div class="preview-placeholder">
                <div class="loading-animation">
                    <div class="spinner"></div>
                    <p>Diagramm wird generiert...</p>
                    <div class="generation-steps">
                        <div class="generation-step active">Analysiere Anforderungen...</div>
                        <div class="generation-step">Erstelle Datenstruktur...</div>
                        <div class="generation-step">Generiere Charts...</div>
                        <div class="generation-step">Finalisiere Diagramm...</div>
                    </div>
                </div>
            </div>
        `;
        
        // Simuliere Generierungs-Schritte
        const steps = dashboardPreview.querySelectorAll('.generation-step');
        let stepIndex = 0;
        
        const stepInterval = setInterval(() => {
            if (stepIndex < steps.length) {
                if (stepIndex > 0) {
                    steps[stepIndex - 1].classList.remove('active');
                    steps[stepIndex - 1].classList.add('completed');
                }
                steps[stepIndex].classList.add('active');
                stepIndex++;
            } else {
                clearInterval(stepInterval);
                // Letzter Schritt als completed markieren
                if (steps.length > 0) {
                    steps[steps.length - 1].classList.remove('active');
                    steps[steps.length - 1].classList.add('completed');
                }
                // Diagramm fertig
                setTimeout(() => {
                    showGeneratedDiagram();
                }, 1000);
            }
        }, 1500);
    }
}

function showGeneratedDiagram() {
    if (resultStatus) {
        resultStatus.innerHTML = '<span class="status-badge completed">✓ Diagramm fertig!</span>';
    }
    
    // Zeige kurze Erfolgsmeldung
    if (dashboardPreview) {
        dashboardPreview.innerHTML = `
            <div class="preview-placeholder">
                <div class="success-animation">
                    <div class="success-icon">✓</div>
                    <p>Diagramm erfolgreich generiert!</p>
                    <p class="success-note">Scrolle nach unten zum vollständigen Dashboard...</p>
                </div>
            </div>
        `;
    }
    
    // Scroll automatisch zum finalen Dashboard nach kurzer Verzögerung
    setTimeout(() => {
        const finalDashboard = document.getElementById('finalDashboard');
        if (finalDashboard) {
            finalDashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 1500);
}

console.log('%c🎬 Diagramm-Generierung geladen!', 'font-size: 16px; font-weight: bold; color: #6366f1;');
console.log('Klicke auf "Generieren" um die Demo zu starten.');
