import { fetchMerged } from "./services/fetchNoaa";
import { computeAll } from "./services/computeIndices";
import { Chart } from "chart.js/auto";

function fmt(m, digits=2) {
    return Number.isFinite(m) ? m.toFixed(digits) : '-';
}

async function run() {
    try {
        const merged = await fetchMerged();
        const data = computeAll(merged);
        renderMetrics(data.at(-1));
        renderChart(data);
    } catch (e) {
        console.error(e);
        document.getElementById('metrics').innerHTML = `<div class="error">Fehler beim Laden der Daten: ${e.message}</div>`;
    }
}

function renderMetrics(r) {
    const el = document.getElementById('metrics');
    el.innerHTML = `
        <div class="metric"><b>Zeit</b><span>${r.time}</span></div>
        <div class="metric"><b>Bz (nT></b><span>${fmt(r.bz)}</span></div>
        <div class="metric"><b>Bs (nT)</b><span>${fmt(r.bs)}</span></div>
        <div class="metric"><b>Bs (nT)</b><span>${fmt(r.bt)}</span></div>
        <div class="metric"><b>Geschw. (km/s)</b><span>${fmt(r.speed)}</span></div>
        <div class="metric"><b>Dichte (cm⁻³)</b><span>${fmt(r.density)}</span></div>
        <div class="metric"><b>Pdyn (nPa)</b><span>${fmt(r.pdyn)}</span></div>
        <div class="metric"><b>Clock angle (deg)</b><span>${fmt(r.theta * 180 / Math.PI)}</span></div>
        <div class="metric"><b>Newell proxy</b><span>${fmt(r.dphi)}</span></div>
        <div class="metric"><b>Aktivitätsindex (0–9)</b><span><strong>${fmt(r.idx,1)}</strong></span></div>
    `
}

function renderChart(data) {
    const ctx = document.getElementById('chart');
    const labels = data.map(d => d.time.slice(11));
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {label: 'Bz (nT)', data: data.map(d => d.bz), borderColor: '#d33', tension:.2},
                {label: 'Geschw. (km/s)', data: data.map(d => d.speed), borderColor: '#3a3', tension:.2, yAxisID: 'y1'},
                {label: 'Pdyn (nPa)', data: data.map(d => d.pdyn), borderColor: '#aa3', tension:.2, yAxisID: 'y2'},
                {label: 'Aktivitätsindex', data: data.map(d => d.ai), borderColor: '#33a', tension:.2, yAxisID: 'y3'},

            ]
        },
        options: {
            responsive: true,
            interaction: {mode: 'index', intersect: false},
            scales: {
                y: {position: 'left', title: {display:true, text:'Bz (nT)'}},
                y1: {position: 'right', title: {display:true, text:'Geschw. (km/s)'}},
                y2: {position: 'right', title: {display:true, text:'Pdyn (nPa)'}},
                y3: {position: 'right', title: {display:true, text:'Aktivitätsindex'}, min:0, max:9, ticks:{stepSize:1}}
            },
            plugins: { legend: {position: 'bottom'} }
        }
    });
}

run();

