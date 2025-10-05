// Dynamischer Druck
function dynPressure(n, v) {
    return 1.6726e-6 * n * v * v; // n in cm^-3, v in km/s, Ergebnis in nPa
}

// Clock angle (rad)
function clockAngle(by, bz) {
    return Math.atan2(Math.abs(by), Math.abs(bz));
}

// Newell et al. (2007) Kp Vorhersage
function newellKp(bt, v, theta) {
    const term = Math.pow(v, 4/3) * Math.pow(bt, 2/3) * Math.pow(Math.sin(theta/2), 8/3);
    return term / 1e3;
}

// Einfacher Aktivitätsindex (0-9)
function ActivityIndex(bs, v, pdyn, dphi, w = {a1:3, a2:2, a3:2, a4:2}) {
    const ref = {bs:10, v:600, p:2, dphi:10}; // Referenzwerte
    let I = w.a1 * (bs/ref.bs) + w.a2 * (v/ref.v) + w.a3 * (pdyn/ref.p) + w.a4 * (dphi/ref.dphi);
}

export function computeAll(records) {
    return records.map(r => {
        const pdyn = dynPressure(r.density, r.speed);
        const theta = clockAngle(r.by, r.bz);
        const kp = newellKp(r.density, r.speed, r.bz);
        const ai = ActivityIndex(Math.abs(r.bz), r.speed, pdyn, 0);
        return {...r, pdyn, theta, kp, ai}
    });
}

