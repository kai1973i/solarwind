import { fetchMerged } from "./services/fetchNoaa";
import { computeAll } from "./services/computeIndices";
import { renderChart } from "./services/mag_chart.js";

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
        <div class="metric"><b>Reisedauer (min)</b><span>${fmt(r.travelTime, 0)}</span></div>
        <div class="metric"><b>Bz (nT></b><span>${fmt(r.bz)}</span></div>
        <div class="metric"><b>Bs (nT)</b><span>${fmt(r.by)}</span></div>
        <div class="metric"><b>Bt (nT)</b><span>${fmt(r.bt)}</span></div>
        <div class="metric"><b>Geschw. (km/s)</b><span>${fmt(r.speed)}</span></div>
        <div class="metric"><b>Dichte (cm⁻³)</b><span>${fmt(r.density)}</span></div>
        <div class="metric"><b>Pdyn (nPa)</b><span>${fmt(r.pdyn)}</span></div>
        <div class="metric"><b>Clock angle Y-Z(deg)</b><span>${fmt(r.thetaYZ * 180 / Math.PI)}</span></div>
        <div class="metric"><b>Clock angle X-Z(deg)</b><span>${fmt(r.thetaXZ * 180 / Math.PI)}</span></div>
    `
}

run();

