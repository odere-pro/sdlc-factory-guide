---
id: running-the-work
title: "Teil 4 — Die Arbeit ausführen"
description: Conductor- vs. Orchestrator-Modus und wo Agenten hineinpassen — Editor, Terminal und Hintergrund — plus das 80-%-Problem.
sidebar_position: 6
keywords: [agent modes, conductor, orchestrator, sandbox, code generation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Teil 4 — Die Arbeit ausführen',
      description: 'Conductor- vs. Orchestrator-Modus und wo Agenten hineinpassen — Editor, Terminal und Hintergrund — plus das 80-%-Problem.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/running-the-work',
      },
    })}
  </script>
</head>

# Teil 4 — Die Arbeit ausführen

Eine Rule-Datei ist vorhanden, der Kontext gestaltet, die Verifikation eingerichtet. Jetzt wird die Arbeit tatsächlich erledigt. Die zwei Fragen, die entscheiden, wie gut es läuft: In welchem *Modus* befinde ich mich, und welche *Art* von Agent passt zur Aufgabe?

## Zwei Modi: Conductor und Orchestrator

Die meisten Entwickler wechseln im Laufe des Tages zwischen zwei Modi. Sie erfordern unterschiedliche Fähigkeiten, und den falschen Modus für die Aufgabe zu verwenden ist eine häufige Quelle von Frustration.

**Conductor-Modus** ist Echtzeit und praxisnah. Man ist im Editor, sieht Code erscheinen, steuert mit Prompts und Korrekturen und behält feinkörnige Kontrolle. Jede Änderung wird verstanden, während sie gemacht wird.

- Am besten für: komplexe Logik, schwieriges Debugging, unbekannte Codebasen — überall dort, wo jeder Schritt verstanden werden muss.
- Das Risiko: wenn jeder Tastendruck dirigiert wird, wird *man selbst* zum Flaschenhals und der Speedup verschwindet.

**Orchestrator-Modus** ist asynchron und auf höherer Ebene. Ein Ziel wird definiert, einem Agenten übergeben, und das Ergebnis wird gereviewed — nicht die Tastatureingaben. Agenten können im Hintergrund laufen, parallel, an verschiedenen Teilen der Codebasis.

- Am besten für: gut spezifizierte Arbeit — Bug-Fixes, Migrationen, Testgenerierung, Features nach einem etablierten Muster.
- Der Haken: Es erfordert *mehr* Disziplin im Vorfeld, nicht weniger. Eine präzise Spezifikation muss geschrieben werden, bevor delegiert werden kann. Der Gewinn stellt sich bei der zweiten Aufgabe ein, nicht bei der ersten.

Der Orchestrator-Modus belohnt ein anderes Fähigkeitsset als Syntax-Beherrschung:

- **Spezifikation** — die Aufgabe präzise genug definieren, damit ein Agent sie ohne Raten ausführen kann.
- **Zerlegung** — große Arbeit in agenten-gerechte Einheiten aufteilen.
- **Evaluation** — Output-Qualität schnell beurteilen.
- **Systemdesign** — die Einschränkungen und Feedback-Schleifen aufbauen, die Agenten produktiv halten.

## Drei Orte, an denen Agenten in den Alltag passen

Dieselbe Situation aus einem anderen Blickwinkel: Agenten erscheinen an drei Standorten. Die meisten Menschen nutzen alle drei.

- **Im Editor** — Inline-Vervollständigung und In-place-Chat, mit Bewusstsein für die gesamte Codebasis. Hier bleibt man im Flow. (Copilot, Cursor, Windsurf, JetBrains AI.)
- **Im Terminal** — der Agent wird gestartet, bekommt ein Ziel in natürlicher Sprache und arbeitet über Dateien hinweg, führt Tools und Tests aus und reagiert auf Ergebnisse. Hier findet ernsthafte praktische Arbeit statt. (Claude Code, Codex CLI und ähnliche.)
- **Im Hintergrund** — der Agent läuft autonom in einer Sandbox, manchmal stundenlang, und übergibt später einen Pull Request zum Review. (Jules, Copilot-Agentenmodus, Cursor-Hintergrundagenten.)

Die Zuordnung ist intuitiv: Editor-Agenten passen *während des Schreibens*; Terminal-Agenten passen für *dateiübergreifende Erkundung und Ausführen-und-Reagieren*; Hintergrund-Agenten passen für *alles, was in einem Absatz beschrieben und verlassen werden kann*. Der richtige Ausgangspunkt ist die Aufgabe, nicht das Tool mit dem meisten Autonomieanspruch.

## In einer Sandbox ausführen

Wenn der Agent Code ausführt — Tests laufen lässt, eine Korrektur versucht, Dateien liest — sollte er das innerhalb einer isolierten Sandbox mit einem definierten, begrenzten Satz von Tools und Zugriffsrechten tun. Das macht die autonome „Denken → Handeln → Beobachten"-Schleife sicher: Der Agent kann Dinge ausprobieren und scheitern, ohne etwas zu berühren, das er nicht sollte.

## Das 80-%-Problem (wo es schiefläuft)

Ein Agent generiert ungefähr 80 % eines Features schnell. Die verbleibenden 20 % — Randfälle, Fehlerbehandlung, Integrationspunkte, subtile Korrektheit — brauchen tiefen Kontext, den das Modell meist nicht hat. Und genau dort leben Produktionsfehler.

Die Gefahr hat sich verschoben. Frühe KI-Fehler waren offensichtliche Syntaxfehler. Heutige Fehler sind *konzeptueller Natur*: eine falsche Annahme über Geschäftslogik, ein übersehener Randfall, eine architektonische Entscheidung, die still Wartungsschulden aufhäuft. Sie sind schwer zu erkennen, genau weil **der Code richtig aussieht und vielleicht sogar grundlegende Tests besteht.**

Konkret:

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)
```

Die fehlenden 20 % sind alles, was der Agent nicht zu fragen wusste: Kann `percent` 100 überschreiten? Ist `price` ein Integer-Cent-Wert oder ein Float? Welche Währungsrundung gilt? Sollte ein 100-%-Rabatt überhaupt erlaubt sein, oder signalisiert das einen Fehler im Upstream? Nichts davon ist im Code sichtbar — es sind Geschäftsregeln, die man selbst kennt, das Modell aber nicht.

Die Entwickler, die gut abschneiden, versuchen nicht, durch Akzeptieren von allem schneller zu werden. Sie nutzen den Agenten für die gut spezifizierten 80 % und wenden ihre eigene Aufmerksamkeit den 20 % zu, die Urteilsvermögen erfordern.

## Den eigenen Workflow einrichten

- [ ] Vor einer Aufgabe bewusst Conductor oder Orchestrator wählen — und bemerken, wann Arbeit dirigiert wird, die hätte delegiert werden sollen.
- [ ] Den Agenten-Standort zur Aufgabe passend wählen: Editor für In-Flow, Terminal für dateiübergreifend, Hintergrund für Walk-away.
- [ ] Sicherstellen, dass Code-Ausführung in einer Sandbox mit eingeschränktem Zugriff stattfindet.
- [ ] Für jedes Feature die 20 % aufschreiben — die Randfälle und Geschäftsregeln — und diese Zeilen selbst reviewen, auch wenn Tests bestehen.
