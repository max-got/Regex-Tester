---
title: Passwort Validierung
description: Überprüft, ob ein Kennwort mindestens 6 Zeichen, mindestens 1 Großbuchstabe, 1 Kleinbuchstabe und 1 Zahl ohne Leerzeichen enthält.
tags: Passwort, Validierung
regex: ^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$
testString: |
  Catcat1
  sicheresPasswort
---
