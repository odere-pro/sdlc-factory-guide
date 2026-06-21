---
id: review-and-ship
title: "Teil 5 — Reviewen und ausliefern"
description: Agent als Erst-Reviewer, Review-Checkliste für generierten Code, Commit-Hooks und Observability für KI-Workflows.
sidebar_position: 7
keywords: [code review, shipping, observability, hooks, generated code]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Teil 5 — Reviewen und ausliefern',
      description: 'Agent als Erst-Reviewer, Review-Checkliste für generierten Code, Commit-Hooks und Observability für KI-Workflows.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/review-and-ship',
      },
    })}
  </script>
</head>

# Teil 5 — Reviewen und ausliefern

Wenn ein Agent 80 % des Codes schreibt, wird man mehr Reviewer als Autor. Die Arbeit verlagert sich vom Tippen zum Urteilen — und das Urteilen muss schärfer sein als bisher, weil generierter Code auf stillere Weise versagt als menschlicher Code.

## Den Agenten den ersten Durchgang machen lassen

Den Agenten als Erst-Reviewer einsetzen, bevor ein Mensch irgendetwas ansieht. Er ist gut auf der mechanischen Ebene: wahrscheinliche Bugs, Stil-Verletzungen, Sicherheitsgerüche und Performance-Probleme erkennen. Das räumt das Rauschen beiseite, damit der menschliche Reviewer seine Aufmerksamkeit auf das verwenden kann, was wirklich einen Menschen braucht — Design, Wartbarkeit, ob diese Änderung zur Richtung des Systems passt.

Die Aufteilung ist der Punkt. Erstpass-Review ist mechanisch und kann delegiert werden. Endgültiges Urteil über Design ist es nicht.

## Jede ausgelieferte Zeile reviewen — mit der richtigen Skepsis

Der Reflex, Code zu vertrauen, weil er läuft, ist genau der falsche Reflex für generierten Code. Jede Zeile, die in die Produktion geht, reviewen und die Skepsis auf die spezifischen Arten richten, wie KI-Output versagt:

- **Cleveren Code skeptisch betrachten.** Generierte Lösungen greifen manchmal zu einer eleganten Abstraktion, wo eine langweilige korrekt gewesen wäre. Clever ist eine Warnung, kein Kompliment.
- **Bestätigen, dass Imports real sind.** Modelle halluzinieren plausibel klingende Pakete. Ein Import, der richtig aussieht, kann ein Paket sein, das nicht existiert — oder schlimmer, ein bösartiger Squat auf dem Namen, den ein Modell häufig erfindet.
- **Fehlerbehandlung gegen realistische Ausfälle prüfen.** Generierter Code neigt dazu, den Happy Path gut abzudecken und die Fehlerpfade schlecht. Fragen, was passiert, wenn der Netzwerkaufruf timeoutet, der Input leer ist, die Zeile fehlt.

Die Kosten des Überspringens sind konkret: Code, den das Team nicht versteht, wird zu Debugging-Kosten, die das Team sich nicht leisten kann. Die Einsparungen aus schneller Generierung lösen sich auf, sobald jemand drei Tage damit verbringt, einen cleveren Block rückwärtszuentwickeln, den niemand reviewed hat.

## Hooks: die Maschine die Regeln durchsetzen lassen, die sie vergisst

Einige Regeln sind zu wichtig, um sich auf Review zu verlassen. Als **Hooks** kodieren — deterministischer Code, der an festen Punkten im Lebenszyklus läuft (vor einem Tool-Aufruf, nach einer Dateibearbeitung, vor einem Commit) und schlechte Aktionen automatisch blockiert.

Ein Pre-Commit-Hook, der das Committen eines hartokodierten Secrets verweigert:

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'\''"][^"'\'']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

Hooks sind der Ort für die Dinge, die ein Agent (oder ein Mensch) „nie vergessen sollte, aber oft tut." Im Gegensatz zu einer Regel in einer Datei kann ein Hook nicht übergangen werden.

## Observability: sehen, was der Agent tatsächlich getan hat

Man kann nicht verwalten, was man nicht sehen kann. Wenn Agenten mehr Arbeit übernehmen, Observability aufbauen, um die Frage beantworten zu können: „Was hat er getan, und warum?" Verfolgen:

- **Traces** jedes Laufs — die vollständige Abfolge von Schritten und Tool-Aufrufen.
- **Eval-Ergebnisse** über die Zeit, damit Qualitätsregressionen früh sichtbar werden.
- **Token-Kosten und Latenz**, damit ein Workflow, der still teurer wurde, auffällt.
- **Drift** — Verhaltensverschiebungen über die Zeit ohne offensichtliche Ursache.

Ohne das ist ein fehlverhaltener Agent eine Black Box, und das einzige Debugging-Tool ist Raten.

## Der unterschätzte Gewinn: Wartung

Den nun leistungsfähigen Workflow auf die Arbeit richten, die bisher vermieden wurde. Legacy-Code, der „zu riskant war zu berühren", weil nur seine ursprünglichen Autoren ihn verstanden, ist genau dort, wo ein Agent seinen Wert beweist: er kann den Code lesen, die Muster ableiten, die relevanten Dateien finden und Änderungen vornehmen, die respektieren, was vorhanden ist.

Das erschließt Arbeit, die bisher nie gemacht wurde, weil sie zu mühsam und riskant war: Framework-Migrationen, veraltete-API-Updates, Modernisierung alter Test-Suites. Eine Migration, auf die niemand ein Quartal verwenden wollte, wird zu einer gut spezifizierten Hintergrundaufgabe mit einem reviewbaren PR am Ende.

## Den eigenen Workflow einrichten

- [ ] Einen Erstpass-Review-Schritt hinzufügen (Agent reviewt den Diff) vor dem menschlichen Review.
- [ ] Eine Review-Checkliste für generierten Code schreiben: clevere Abstraktionen, halluzinierte Imports, schwache Fehlerbehandlung.
- [ ] Mindestens einen Hook hinzufügen — mit dem obigen Secret-Blocker beginnen.
- [ ] Tracing für Agenten-Läufe einschalten und Token-Kosten sowie Eval-Scores über die Zeit beobachten.
- [ ] Ein „zu riskant zu berühren" Legacy-Code-Stück auswählen und dem Agenten als scopierte, reviewbare Aufgabe übergeben.
