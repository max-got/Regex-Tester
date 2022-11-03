---
title: E-Mail Validierung
description: Das kann eventuell ganz praktisch sein, wenn ihr einen E-Mail Input habt und ihr sicher gehen wollt, dass der User eine gültige E-Mail Adresse eingibt. Kontaktformulare sind hier ein gutes Beispiel.
tags: Email, Validierung
regex: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
testString: |
  gottscha@th-brandenburg.de
  emailadresse.de
---

Es gibt keinen perfekten Email-Validator. Dieser hier ist ein guter Anfang. Willst du mal was schlimmes sehen? Schau dir mal [den regulären Ausdruck](https://www.regextester.com/115911) für den [RFC 5322 Standard](https://www.ietf.org/rfc/rfc5322.txt) an

```javascript
const rfc5322 =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
```

Aua.
