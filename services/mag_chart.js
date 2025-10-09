import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(annotationPlugin);

export function renderChart(data) {
    const ctx = document.getElementById('chart');
    const labels = data.map(d => d.time.slice(11));

    const annotations = {};

    const lastRecord = data.at(-1);
    if (Date.now() && lastRecord.arrivalTime) {
        const arrivalTime = lastRecord.arrivalTime;
        const arrivalTimeLabel = arrivalTime.toISOString().slice(11, 16);
        const arrivalIndex = labels.indexOf(arrivalTimeLabel);

        if (arrivalIndex !== -1) {
            annotations.arrivalLine = {
                type: 'line',
                xMin: arrivalIndex,
                xMax: arrivalIndex,
                borderColor: 'rgba(255, 99, 132, 0.8)',
                borderWidth: 2,
                label: {
                    content: 'Ankunft',
                    enabled: true,
                    position: 'top'
                }
            };
        }
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {label: 'Bx (nT)', data: data.map(d => d.bx), borderColor: '#3a3', tension:.2},
                {label: 'By (nT)', data: data.map(d => d.by), borderColor: '#33d', tension:.2},
                {label: 'Bz (nT)', data: data.map(d => d.bz), borderColor: '#d33', tension:.2},
            ]
        },
        options: {
            responsive: true,
            interaction: {mode: 'index', intersect: false},
            scales: {
                y: {position: 'left', title: {display:true, text:'Bx, By, Bz (nT)'}, min:-15, max:15},
            },
            plugins: {
                legend: {position: 'bottom'},
                annotation: {
                    annotations
                }
            }
        }
    });
}
