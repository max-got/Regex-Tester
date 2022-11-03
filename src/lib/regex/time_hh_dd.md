---
title: Zeit HH:MM
description: Testet, ob eine Zeichenkette eine Uhrzeit im Format HH:MM ist. Was heißt das? Es wird überprüft, ob die Zeichenkette aus zwei Zahlen besteht, die durch einen Doppelpunkt getrennt sind. Die erste Zahl muss zwischen 00 und 23 liegen, die zweite zwischen 00 und 59.
tags: Datum, Zeit, Validierung
regex: ^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$
testString: |
  00:00
  23:59
  24:00
  25:87
---

## Zeit und Datumsformatierung

Ich kann nur empfehlen, dass du dir die [Dokumentation von moment.js](https://momentjs.com/docs/#/displaying/format/) anschaust. Dort findest du eine Menge an Beispielen und Erklärungen, wie du mit Zeit und Datum umgehen kannst.

## Intl Object

Mindestens genau so spannend, ist [`Intl.DateTimeFormat() constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/DateTimeFormat). Dieser Konstruktor erlaubt es dir, Zeit und Datum in deiner bevorzugten Sprache und deinem bevorzugten Format darzustellen. Du kannst sogar die Zeitzone angeben, in der du die Zeit darstellen möchtest. Klare Empfehlung!

Schauen wir uns mal das folgende Beispiel an:

```javascript
const date = new Date() //Thu Nov 03 2022 08:51:50 GMT+0100 (Central European Standard Time)
const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timeZone: 'Europe/Berlin',
	timeZoneName: 'short'
}
const formatter = new Intl.DateTimeFormat('de-DE', options)
console.log(formatter.format(date)) // Donnerstag, 3. November 2022 um MEZ
```

### Was ist hier passiert?

Wir haben ein neues Date Object erstellt und in der Konstante `date` gespeichert

> [Date Dokumentation auf mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date?retiredLocale=de).

Dann haben wir ein Objekt erstellt, das die Optionen für die Zeitzone und das Format enthält und in der Konstante `options` gespeichert.

> Notiz: Was die erstellten Optionen wie `weekday` oder `timeZoneName` genau tun, kannst du in der [Intl DateTimeFormat Dokumentation von mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/DateTimeFormat) nachlesen.

Wir haben dann einen neuen `Intl.DateTimeFormat` Konstruktor erstellt und ihm die Optionen (`options`) und den [ICU](https://www.localeplanet.com/icu/) (de-DE) übergeben. Zum Schluss haben wir die Methode `format()` aufgerufen und das Datum übergeben. Das Ergebnis ist ein String, der das Datum in deutscher Sprache und im Format `Donnerstag, 3. November 2022 um MEZ` darstellt.
