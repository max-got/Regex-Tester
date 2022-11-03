---
title: Date (DD/MM/YYYY) Validierung
description: Ähnliches Prinzip wie bei der E-Mail Validierung. Hier wird ein Datum im Format DD/MM/YYYY validiert. Gängiges Format für die Eingabe bei Kontaktformularen.
tags: Datum, Validierung
regex: ^(0?[1-9]|[12][0-9]|3[01])([ \/\-])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$
testString: |
  20/05/1987
  20.05.1987
---
