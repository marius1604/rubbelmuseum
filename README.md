# Rubbelmuseum

Französisch lernen, Münzen sammeln, Rubbellose freirubbeln und das eigene Museum füllen.
Jede Person hat ihren eigenen Spielstand auf dem eigenen Handy. Neue Fundstücke und
App-Verbesserungen kommen automatisch bei allen an, sobald sie die App das nächste Mal öffnen.

## Was liegt wo?

| Ordner/Datei | Inhalt |
|---|---|
| `fundstuecke/` | Ein Fundstück pro Datei (Name, Bild, Seltenheit, Wert, Text) |
| `bilder/` | Die Bilder der Fundstücke |
| `index.html` | Die App selbst (inkl. Vokabeln) |
| `.pages.yml` | Die Eingabemaske für Pages CMS |
| `scripts/build.mjs` | Baut beim Veröffentlichen die Liste aller Fundstücke (`katalog.json`) |
| `.github/workflows/deploy.yml` | Veröffentlicht die App nach jeder Änderung auf GitHub Pages |

## Einmalig einrichten

1. **GitHub Pages einschalten:** Im Projekt auf GitHub → *Settings* → *Pages* → bei *Source* „GitHub Actions“ wählen.
2. **Ersten Durchlauf abwarten:** Unter *Actions* läuft „Veröffentlichen“ (ca. 1 Minute). Danach steht die Adresse unter *Settings → Pages*, z. B. `https://DEINNAME.github.io/rubbelmuseum/`.
3. **Eingabemaske verbinden:** Auf [app.pagescms.org](https://app.pagescms.org) mit GitHub anmelden, Zugriff auf das Projekt erlauben und es auswählen. Links erscheint „Fundstücke“.

## Neues Fundstück hinzufügen

1. In Pages CMS auf **Fundstücke** und dann auf „Neu“ bzw. „Add an entry“.
2. Name, Bild, Seltenheit, Wert und Beschreibung eintragen, speichern.
3. Nach etwa einer Minute ist es online. Wer die App öffnet, bekommt den Hinweis „Neu im Museum“.

Tipps für Bilder: PNG oder WebP mit transparentem Hintergrund, etwa 800 × 800 Pixel, unter 500 KB.
Die Inventarnummer kannst du leer lassen, sie wird automatisch vergeben.

Chance pro Los je Seltenheit: Gewöhnlich 50 %, Ungewöhnlich 28 %, Selten 15 %, Episch 5 %,
Legendär 1,8 %, Mythisch 0,2 %. Stufen ohne Fundstück fallen weg, die Chancen verteilen sich dann neu.
Mehrere Fundstücke derselben Seltenheit teilen sich deren Chance zu gleichen Teilen. Der Wert hat keinen Einfluss.
Mit dem Feld **Häufigkeit** in der Eingabemaske machst du ein einzelnes Stück innerhalb seiner
Seltenheit seltener (halb so oft, ein Viertel oder ein Zehntel so oft).

## Entwicklermodus

5× schnell auf das Logo „Rubbelmuseum“ oben links tippen und die PIN eingeben. Der Modus nutzt
einen eigenen Test-Spielstand mit 1000 Münzen, Tages- und Übungsrunde sind unbegrenzt. Über das
Kennzeichen „TEST“ oben öffnest du die Werkzeuge: Münzen auffüllen, einen Tag vorspringen,
Test-Spielstand zurücksetzen und die genaue Chance jedes Fundstücks für Los und Goldlos.
„Entwicklermodus verlassen“ bringt dich zurück zu deinem normalen Spielstand.

## An Freunde geben

Einfach die Adresse schicken. Auf dem Handy lässt sich die App über
*Teilen → Zum Home-Bildschirm* (iPhone) bzw. *Menü → App installieren* (Android) wie eine normale App ablegen.

Wichtig: Der Spielstand liegt im Browser des jeweiligen Handys. Wer Browserdaten löscht, verliert ihn.
Im Museum oben rechts gibt es deshalb eine Sicherung (Datei oder Code), mit der man den Stand auch auf ein neues Handy mitnehmen kann.
