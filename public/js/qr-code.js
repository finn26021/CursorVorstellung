// QR-Code für Cursor-Link generieren

document.addEventListener('DOMContentLoaded', function() {
    const qrCodeContainer = document.getElementById('qrCode');
    
    if (qrCodeContainer) {
        // Warte kurz, damit die Bibliothek geladen ist
        setTimeout(() => {
            if (typeof QRCode !== 'undefined') {
                try {
                    new QRCode(qrCodeContainer, {
                        text: 'https://cursor.sh',
                        width: 200,
                        height: 200,
                        colorDark: '#6366f1',
                        colorLight: '#ffffff',
                        correctLevel: QRCode.CorrectLevel.H
                    });
                } catch (error) {
                    console.error('QR-Code Fehler:', error);
                    showFallback(qrCodeContainer);
                }
            } else {
                showFallback(qrCodeContainer);
            }
        }, 100);
    }
});

function showFallback(container) {
    container.innerHTML = `
        <div class="qr-fallback">
            <a href="https://cursor.sh" target="_blank">cursor.sh</a>
        </div>
    `;
}

console.log('%c🔗 QR-Code geladen!', 'font-size: 16px; font-weight: bold; color: #6366f1;');

