// Echte Finanzdaten für "Kunst gegen Commerz"
let kunstData = null;

// Daten laden
async function loadKunstData() {
    try {
        const response = await fetch('data/kunst-gegen-commerz.json');
        kunstData = await response.json();
        initCharts();
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
        // Fallback auf Mock-Daten falls JSON nicht geladen werden kann
        kunstData = {
            gesamt: { umsatz: 3020, gewinn: 779, verkaufteWerke: 26 },
            kategorien: {
                labels: ['Winderäder', 'Ölbild', 'Transparente 2015', 'Segel 2012', 'Segel 2005'],
                umsatz: [960, 750, 600, 300, 200],
                gewinn: [158, 248, 198, 99, 66]
            },
            kuenstler: {
                labels: ['Juri Jander', 'Wilfried Bohne', 'Unbekannt', 'Peter Adle', 'Angelika Summa'],
                umsatz: [750, 480, 180, 120, 120],
                gewinn: [248, 158, 0, 0, 0]
            }
        };
        initCharts();
    }
}

// Chart.js Konfiguration
const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                padding: 15,
                font: {
                    size: 12
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
                size: 14
            },
            bodyFont: {
                size: 13
            }
        }
    }
};

function initCharts() {
    if (!kunstData) return;

    // Umsatz nach Kategorien Chart (Bar Chart)
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: kunstData.kategorien.labels,
                datasets: [{
                    label: 'Umsatz (€)',
                    data: kunstData.kategorien.umsatz,
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderColor: 'rgb(99, 102, 241)',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€' + value;
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Top Kategorien nach Umsatz Chart (Bar Chart)
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'bar',
            data: {
                labels: kunstData.kategorien.labels,
                datasets: [{
                    label: 'Umsatz (€)',
                    data: kunstData.kategorien.umsatz,
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(168, 85, 247, 0.8)'
                    ],
                    borderColor: [
                        'rgb(99, 102, 241)',
                        'rgb(139, 92, 246)',
                        'rgb(236, 72, 153)',
                        'rgb(59, 130, 246)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(239, 68, 68)',
                        'rgb(168, 85, 247)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€' + value;
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Top Künstler nach Umsatz Chart (Line Chart)
    const customersCtx = document.getElementById('customersChart');
    if (customersCtx) {
        new Chart(customersCtx, {
            type: 'line',
            data: {
                labels: kunstData.kuenstler.labels,
                datasets: [{
                    label: 'Umsatz (€)',
                    data: kunstData.kuenstler.umsatz,
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: 'rgb(16, 185, 129)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€' + value;
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }

    // Gewinnverteilung nach Kategorien Chart (Doughnut Chart)
    const channelsCtx = document.getElementById('channelsChart');
    if (channelsCtx) {
        new Chart(channelsCtx, {
            type: 'doughnut',
            data: {
                labels: kunstData.kategorien.labels,
                datasets: [{
                    data: kunstData.kategorien.gewinn,
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(168, 85, 247, 0.8)'
                    ],
                    borderColor: [
                        'rgb(99, 102, 241)',
                        'rgb(139, 92, 246)',
                        'rgb(236, 72, 153)',
                        'rgb(59, 130, 246)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)',
                        'rgb(239, 68, 68)',
                        'rgb(168, 85, 247)'
                    ],
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                ...chartOptions,
                plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                        ...chartOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return label + ': €' + value + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }

    // Update Stat Cards mit echten Daten
    updateStatCards();
}

function updateStatCards() {
    if (!kunstData) return;

    // Gesamtumsatz
    const umsatzValue = document.querySelector('.stat-card:nth-of-type(1) .stat-value');
    if (umsatzValue) {
        umsatzValue.textContent = `€ ${kunstData.gesamt.umsatz.toLocaleString('de-DE')}`;
    }

    // Verkaufte Werke
    const kundenValue = document.querySelector('.stat-card:nth-of-type(2) .stat-value');
    if (kundenValue) {
        kundenValue.textContent = kunstData.gesamt.verkaufteWerke;
    }
    const kundenLabel = document.querySelector('.stat-card:nth-of-type(2) h4');
    if (kundenLabel) {
        kundenLabel.textContent = 'Verkaufte Werke';
    }

    // Gesamtgewinn
    const bestellungenValue = document.querySelector('.stat-card:nth-of-type(3) .stat-value');
    if (bestellungenValue) {
        bestellungenValue.textContent = `€ ${kunstData.gesamt.gewinn.toLocaleString('de-DE')}`;
    }
    const bestellungenLabel = document.querySelector('.stat-card:nth-of-type(3) h4');
    if (bestellungenLabel) {
        bestellungenLabel.textContent = 'Gesamtgewinn';
    }

    // Verkaufsquote
    const bewertungValue = document.querySelector('.stat-card:nth-of-type(4) .stat-value');
    if (bewertungValue && kunstData.verkaufsstatistik) {
        bewertungValue.textContent = `${kunstData.verkaufsstatistik.verkaufsquote}%`;
    }
    const bewertungLabel = document.querySelector('.stat-card:nth-of-type(4) h4');
    if (bewertungLabel) {
        bewertungLabel.textContent = 'Verkaufsquote';
    }
}

// Animation beim Scrollen
const chartCards = document.querySelectorAll('.chart-card');
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

chartCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
    chartObserver.observe(card);
});

// Daten laden wenn DOM bereit ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadKunstData);
} else {
    loadKunstData();
}

console.log('%c📊 Dashboard geladen!', 'font-size: 16px; font-weight: bold; color: #6366f1;');
console.log('Finanzdaten für "Kunst gegen Commerz" werden geladen...');
