# Solarwind-Echtzeitanalyse

Diese statische Webseite visualisiert Echtzeit-Solarwinddaten von der NOAA (National Oceanic and Atmospheric Administration). Sie bietet eine schnelle Übersicht über die aktuelle Sonnenwindaktivität durch die Anzeige von Schlüsselmetriken und eines interaktiven Diagramms.

## Funktionen

-   **Echtzeitdaten**: Ruft die neuesten Magnetfeld- und Plasmadaten von der NOAA ab.
-   **Kombinierte Analyse**: Führt die beiden Datensätze zusammen, um ein umfassendes Bild zu erhalten.
-   **Abgeleitete Metriken**: Berechnet und zeigt wichtige Indizes wie den dynamischen Druck, den Clock-Angle und einen Aktivitätsindex an.
-   **Interaktives Diagramm**: Visualisiert den zeitlichen Verlauf von `Bz`, der Geschwindigkeit, dem dynamischen Druck und dem Aktivitätsindex mit `chart.js`.

## Datenquellen

Die Anwendung nutzt die folgenden Echtzeit-Datenendpunkte der NOAA:

-   **Magnetfelddaten**: [https://services.swpc.noaa.gov/products/solar-wind/mag-7-day.json](https://services.swpc.noaa.gov/products/solar-wind/mag-7-day.json)
-   **Plasmadaten**: [https://services.swpc.noaa.gov/products/solar-wind/plasma-7-day.json](https://services.swpc.noaa.gov/products/solar-wind/plasma-7-day.json)

## Technologien

-   **Vite**: Build-Tool für die Frontend-Entwicklung.
-   **Chart.js**: Bibliothek zur Erstellung von Diagrammen.
-   **GitHub Pages**: Hosting für die statische Webseite.

## Lokale Entwicklung

Um das Projekt lokal auszuführen, folgen Sie diesen Schritten:

1.  **Abhängigkeiten installieren**:

    ```bash
    npm install
    ```

2.  **Entwicklungsserver starten**:

    ```bash
    npm run dev
    ```

    Die Seite ist dann unter `http://localhost:5173` (oder einem anderen von Vite zugewiesenen Port) verfügbar.

## Build

Um die statischen Dateien für die Produktion zu erstellen, führen Sie den folgenden Befehl aus:

```bash
npm run build
```

Die erstellten Dateien werden im `dist`-Verzeichnis abgelegt.

## Deployment

Das Projekt wird automatisch auf GitHub Pages bereitgestellt, wenn Änderungen in den `main`-Branch gepusht werden. Der Workflow ist in `.github/workflows/deploy.yml` definiert.
