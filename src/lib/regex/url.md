---
title: URL Validierung
description: Testet, ob eine Zeichenkette eine URL ist. Eine URL muss mit http:// oder https:// beginnen.
tags: URL, Validierung
regex: https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)
testString: |
  http://www.google.com
  https://www.google.com
  www.google.com
---
