---
id: controlling-cost
title: "Teil 6 — Kosten kontrollieren"
description: Total Cost of Ownership in KI-Workflows — Erstversuchs-Erfolg, Modell-Routing nach Aufgabe und dynamischer Kontext als Kostenkontrolle.
sidebar_position: 8
keywords: [cost control, token economy, model routing, TCO, AI cost]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Teil 6 — Kosten kontrollieren',
      description: 'Total Cost of Ownership in KI-Workflows — Erstversuchs-Erfolg, Modell-Routing nach Aufgabe und dynamischer Kontext als Kostenkontrolle.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/controlling-cost',
      },
    })}
  </script>
</head>

# Teil 6 — Kosten kontrollieren

Die übliche Frage bei der KI-Entwicklung lautet „Wie schnell können wir liefern?" Die bessere Frage ist „Was kostet uns das im Besitz?" Geschwindigkeit verschleiert die echten Wirtschaftlichkeitsdaten. Die ehrliche Kenngröße ist der Total Cost of Ownership, und in einem KI-Workflow wird er von einer Sache dominiert: der Token-Ökonomie.

## Die verborgene Schuld des schnellen Machens

Ad-hoc-Prompting sieht fast kostenlos aus — ein Abonnement und ein paar beiläufige Prompts, Anfangskosten nahe null. Die Rechnung kommt später, und sie verzinst sich:

- **Token-Verbrennung.** Riesige unstrukturierte Dateien in das Context-Window kippen und das Modell bitten, seine eigenen unverifizierten Fehler zu korrigieren, erzeugt eine teure Retry-Schleife mit geringer Erstversuchs-Erfolgsrate. Jeder fehlgeschlagene Versuch sind Tokens, die für nichts ausgegeben wurden.
- **Wartungssteuer.** Unstrukturierter generierter Code ist inkonsistent. Sechs Monate später verbringt ein Ingenieur Tage damit, „Spaghetti" rückwärtszuentwickeln, den niemand entworfen hat.
- **Sicherheits-Remediation.** Ohne einen Evaluation-Harness wird schnelle Code-Generierung zur schnellen Schwachstellen-Generierung. Das Beheben eines Fehlers in der Produktion kostet weit mehr als das Erkennen zur Entwurfszeit.

Der strukturierte Ansatz kehrt das um: man investiert im Vorfeld in Schemata, Tests und Kontext, und die Grenzkosten des Auslieferns und Pflegens jedes Features sinken stark. Höhere Kosten beim Aufbau, viel niedrigere Kosten im Besitz.

## Hebel eins: Erstversuchs-Erfolg

Das günstigste Token ist das, das bei einem Retry nicht ausgegeben wird. Eine dichte, signalreiche Rule-Datei (Teil 1) und gut verwalteter Kontext (Teil 2) erhöhen die Erstversuchs-Erfolgsrate des Agenten, was direkt die Trial-and-Error-Schleifen abbaut, die Geld verbrennen. Context Engineering ist nicht nur eine Qualitätspraxis — es ist eine Kostenkontroll-Praxis. Dasselbe straffe `CLAUDE.md`, das den Output verbessert, reduziert auch die Ausgaben.

Ein gesamtes 100.000-Token-Repository bei jedem Prompt einzugeben ist im großen Maßstab finanziell nicht tragbar. Das Relevante abrufen; für das Genutzte zahlen.

## Hebel zwei: nach Aufgabe routen

In einem Ad-hoc-Workflow wird ein großes Frontier-Modell für alles verwendet — Premium-Preise für das Beheben eines Tippfehlers oder das Generieren eines Boilerplate-Tests zahlen. Ein entworfener Workflow routet nach Aufgabenkomplexität:

- **Architektur, schwieriges Design** → Frontier-Modell — braucht maximale Reasoning-Fähigkeit
- **Initiale komplexe Implementierung** → Frontier-Modell — hohe Stakes, mehrdeutig
- **Testgenerierung** → Kleines / günstiges Modell — deterministisch, gut spezifiziert
- **Code-Review (Erstpass)** → Kleines / günstiges Modell — Pattern-Matching
- **CI / Monitoring-Checks** → Kleines / günstiges Modell — repetitiv, eng

Eine einfache Routing-Konfiguration macht das konkret:

```yaml
routing:
  default: small-fast
  rules:
    - match: ["architecture", "design", "migration plan"]
      model: frontier
    - match: ["write tests", "lint", "review diff", "ci check"]
      model: small-fast
    - match: ["implement feature"]
      model: frontier
```

Das Orchestrieren eines Multi-Modell-Mixes ermöglicht es, Ausgabequalität dort zu halten, wo sie wichtig ist, während die Kosten für die deterministische Mehrheit der Arbeit gesenkt werden.

## Hebel drei: dynamischer Kontext und Skills

Dieser Punkt knüpft an Teil 2 an. Alles statisch zu laden bedeutet, es bei jedem Aufruf zu bezahlen. Aufgabenspezifisches Wissen in Skills zu schieben, die bei Bedarf laden — und Tools über On-Demand-Aufrufe zu erreichen statt alles in den Prompt zu backen — hält die Per-Request-Nutzlast klein. Im großen Maßstab ist der Unterschied zwischen „alles immer geladen" und „nur was nötig ist" der Unterschied zwischen einer tragbaren und einer untragbaren Kostenstruktur.

## Eine durchgearbeitete Intuition

Angenommen, die Erstversuchs-Erfolgsrate steigt von 40 % auf 80 %, nachdem in die Rule-Datei und ein paar Skills investiert wurde. Aufgaben, die früher ~2,5 Versuche brauchten, brauchen jetzt ~1,25. Das sind halb so viele Tokens für denselben Output — bevor auch nur eine einzige Aufgabe zu einem günstigeren Modell geroutet wurde. Routing obendrauf (günstige Modelle für Testgenerierung und Review, was vielleicht die Hälfte der Aufrufe ausmacht) und die OpEx-Kurve knickt stark ab.

## Den eigenen Workflow einrichten

- [ ] Aufhören, nur Geschwindigkeit zu messen; Token-Ausgaben pro ausgeliefertem Feature tracken.
- [ ] Die Rule-Datei speziell straffen, um den Erstversuchs-Erfolg zu erhöhen und Retry-Schleifen zu eliminieren.
- [ ] Modell-Routing einrichten: günstige Modelle für Testgenerierung, Review und CI; Frontier für Architektur und schwierige Implementierung.
- [ ] Aufgabenspezifischen Kontext in On-Demand-Skills verschieben, damit nicht bei jedem Aufruf dafür bezahlt wird.
- [ ] Kosten-pro-Feature vor und nach vergleichen — die Vorabinvestition sollte als niedrigere laufende Rechnung sichtbar werden.
