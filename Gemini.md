# Projektübersicht: Solarwind-Analyse

Dieses Projekt ist eine statische Webseite, die Echtzeit-Solarwinddaten von der NOAA (National Oceanic and Atmospheric Administration) visualisiert. Die Anwendung zeigt wichtige Metriken und ein Diagramm zur Analyse der Sonnenwindaktivität.

## Projektstruktur

- **`index.html`**: Die Haupt-HTML-Datei, die die Grundstruktur der Seite definiert.
- **`main.js`**: Der Haupteinstiegspunkt der Anwendung. Dieses Skript importiert die erforderlichen Module, ruft die Daten ab, verarbeitet sie und rendert die Metriken und das Diagramm.
- **`style.css`**: Enthält die Stile für die Webseite.
- **`services/fetchNoaa.js`**: Dieses Modul ist für den Abruf von Magnetfeld- und Plasmadaten von den NOAA-Endpunkten verantwortlich. Es enthält auch eine Funktion zum Zusammenführen der beiden Datensätze.
- **`services/computeIndices.js`**: Dieses Modul berechnet verschiedene Indizes aus den abgerufenen Daten, wie den dynamischen Druck, den Clock-Angle und einen Aktivitätsindex.
- **`package.json`**: Definiert die Projektabhängigkeiten (`vite`, `chart.js`) und die Skripte zum Ausführen, Erstellen und Vorschau der Anwendung.
- **`vite.config.js`**: Konfiguriert Vite und legt den Basispfad für das Deployment fest.
- **`.github/workflows/deploy.yml`**: Ein GitHub-Actions-Workflow, der die Seite automatisch auf GitHub Pages bereitstellt.

## Funktionalität

1.  **Datenabruf**: Die Anwendung ruft zwei verschiedene JSON-Datensätze von der NOAA ab: Magnetfelddaten und Plasmadaten.
2.  **Datenzusammenführung**: Die beiden Datensätze werden basierend auf Zeitstempeln zu einem einzigen Datensatz zusammengeführt.
3.  **Indexberechnung**: Aus den zusammengeführten Daten werden abgeleitete Metriken berechnet, darunter:
    -   Dynamischer Druck
    -   Clock-Angle
    -   Ein benutzerdefinierter Aktivitätsindex
4.  **Metrikanzeige**: Die neuesten Metriken werden in einem Raster auf der Webseite angezeigt.
5.  **Diagramm-Rendering**: Ein Diagramm, das mit `chart.js` erstellt wurde, visualisiert den zeitlichen Verlauf von `Bz`, der Geschwindigkeit, dem dynamischen Druck und dem Aktivitätsindex.

## Build-Prozess

Das Projekt verwendet `vite` als Build-Tool. Die wichtigsten Befehle sind:
-   `npm run dev`: Startet den Entwicklungsserver.
-   `npm run build`: Erstellt die statischen Dateien für die Produktion.
-   `npm run preview`: Zeigt eine Vorschau der erstellten Produktionsdateien an.
