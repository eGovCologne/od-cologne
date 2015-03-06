# Offene Daten Köln – Portal

In diesem Repository stellt die Stadt Köln das von ihr eingesetzte Open Data Portal zur Verfügung.

Das Portal basiert auf Drupal 7. Der Source Code ist damit unter der GNU GPL lizensiert. Um Anpassungen an dem System vornehmen zu können sind Drupal Kenntnisse von Vorteil.

Grundlegend basiert das Portal auf DKAN https://github.com/nucivic/dkan des Unternehmens NuCivic http://nucivic.com. Die Stadt Köln hat das bestehende System mit einem eigenen Theme versehen und weitere Funktionalitäten integriert.

## Live Version
Die produktiv eingesetzte Version kann man hier sehen: http://offenedaten-koeln.de

## Key Features 
- Vollwertiges Open Data Register zur Bereitstellung von unterschiedlichsten Datenbeständen
- Automatisierte Darstellung von Daten in unterschiedlichen Formaten
- Api zum direkten Zugriff auf die bereitgestellten Ressourcen
- Endpunkte nach CKAN API und die Möglichkeit eigene Endpunkte zu definieren (OGDP Schema Mapper) um unterschiedlichste Metadaten Schemata bedienen zu können.
- Anfrage Handling
- Portfolio zur Darstellung von Anwendungen
- Spam Schutz und Analyse über eingebundene Drupal Module (mollom, google analytics)

## Installationsanleitung
Die Plattform benötigt den Code dieses Repositories und die enthaltene Datenbank. Diese ist unter `sites/default/private/backup_migrate/manual/OffeneDatenKln-2015-03-06T07-00-36.mysql.gz` abgelegt und kann in eine leere Datenbank eines MySQL Servers importiert werden (z.B. über phpMyAdmin).
Folgende Schritte sind danach erforderlich: 

- Kopieren des gesamten Verzeichnis (inkl. .htaccess) auf den Web Server. Clean-urls ist per default angeschaltet, kann aber unter `http://yourserver/?q=admin/config/search/clean-urls` deaktiviert werden.
- In der `settings.php` unter `sites/default` den oben erstellten Datenbank User eintragen.
- In der `php.ini` `memory_limit = 256M` und `max_execution_time = 120` setzen
`max_allowed_packet=100M` in `my.ini` bzw. `my.cnf` eintragen.
- Die Admin Zugangsdaten lauten Benutzername: `admin` Passwort: `123456`, die Kennung für den Benutzer Redaktion (`Redaktion` / `654321`)
- Die Anmeldung ist über http://yourserver/user zu erreichen.

### Hinweis: 
Sollten Sie Ihre Anpassungen über Git versionieren wollen, empfiehlt es sich die auskommentierten Zeilen des `.gitignore` files wieder einzukommentieren und die versionierten Files aus dem Repository zu entfernen

```
# Ignore configuration files that may contain sensitive information.
sites/*/settings*.php

# Ignore paths that contain user-generated content.
sites/*/files
sites/*/private
```

## Info
Sollte es zu einem produktiven Einsatz des Portals kommen, bitten wir um die Namensnennung und eine Querverlinkung.
