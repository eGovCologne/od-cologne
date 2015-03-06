a) Bitte den Menüpunkt Anfrage aus dem Hauptmenü auf "daten/anfragen" ändern.
Bei mir war in der DB ein URL-Alias der das node/add/data-request daruf verlinkt. Dieser muss gelöscht werden.

b) Das Feature liefert den Block für die Anrage selbst mit (mit dem Button). Sollte eigentlich automatisch angezeigt werden.
Passiert dies nicht, muss er in den Block-Settings positioniert werden.

c) Als Overlay ist das Core-Overlay verwendet und muss demnach für Gäste auch zugänglich sein. Da es deaktiviert war,
ist es nur für die Erstellung der Datenanfrage zugänglich. Sollte somit auch auf keinen anderen Seiten auftauchen.

d) Die Mail nach Erstellung der Anfrage kann unter "admin/config/workflow/rules/reaction/manage/rules_data_request/edit/3" konfiguriert
werden. eMail-Adresse, Text usw. muss angepasst werden.

e) Permission für Gast anlegen Erstellung einer Anfrage

f) Auto Nodetitles muss verwendet werden und im Inhaltstypen als Muster [node:field_request_data_data_name]  eingetragen werden!

g) Terms müssen im Status angelegt werden

h) Custom Permissions im Inhaltstypen einstellen

i) pathalias setzen für Breadcruumb und URL !?
