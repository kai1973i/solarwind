const MAG_URL = 'https://services.swpc.noaa.gov/products/solar-wind/mag-1-day.json';
const PLASMA_URL = 'https://services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json';

// Hilfsfunktion zum Abrufen und Parsen von JSON-Daten
async function fetchTable(url) {
    const res = await fetch(url, { cache: 'force-cache' });
    if(!res.ok) throw new Error(`Fehler beim Laden der Daten von ${url}: ${res.status}`);
    const data = await res.json();
    const [headers, ...rows] = data;
    return rows.map(r => Object.fromEntries(r.map((v, i) => [headers[i], v])));
}

// Zeitstempel in lesbares Format umwandeln
function toIsoMinutes(t) {
    return new Date(t.replace(' ', 'T').replace('.000', 'Z')).toISOString().slice(0,16);
}

// Magnetfeld + Plasma Daten abrufen und kombinieren
export async function fetchMerged() {
    const [mag, plasma] = await Promise.all([fetchTable(MAG_URL), fetchTable(PLASMA_URL)]);
    const plasmaMap = new Map(plasma.map(p => [toIsoMinutes(p.time_tag), p]));
    const merged= [];

    for(const m of mag) {
        const key = toIsoMinutes(m.time_tag);
        const p = plasmaMap.get(key);
        if(!p) continue;

        const speed = Number(p.speed);
        const density = Number(p.density);

        // Filtere unrealistische Werte heraus
        if(speed <=0) continue;
        if(density <=0) continue;

        merged.push({
            time: key,
            bx: Number(m.bx_gsm),
            by: Number(m.by_gsm),
            bz: Number(m.bz_gsm),
            bt: Number(m.bt),
            density: Number(p.density),
            speed: Number(p.speed),
            temp: Number(p.temperature)
        });
    }
    // Nach Zeit sortieren (neueste zuerst)
    merged.sort((a,b) => a.time.localeCompare(b.time));
    return merged;
}

