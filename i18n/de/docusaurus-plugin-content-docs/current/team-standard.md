---
id: team-standard
title: "Teil 8 — Als Teamstandard etablieren"
description: Das Harness versionieren, auf Evals statt Demos absichern, Code-Review umgestalten und nach Urteilsvermögen einstellen in einer KI-first Engineering-Organisation.
sidebar_position: 10
keywords: [team standard, engineering culture, CI gates, eval suite, hiring]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Teil 8 — Als Teamstandard etablieren',
      description: 'Das Harness versionieren, auf Evals statt Demos absichern, Code-Review umgestalten und nach Urteilsvermögen einstellen in einer KI-first Engineering-Organisation.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/team-standard',
      },
    })}
  </script>
</head>

# Teil 8 — Als Teamstandard etablieren

Alles in den ersten sieben Teilen funktioniert für einen einzelnen Entwickler. Sobald ein Team beteiligt ist, taucht ein zusätzlicher Fehlermodus auf: das Harness driftet. Die Rule-Datei einer Person sagt eine Sache, die einer anderen etwas anderes, das Agentenverhalten wird im Team nicht reproduzierbar, und die Disziplin erodiert still. Dieser Teil handelt davon, den Workflow zu einem gemeinsamen, dauerhaften Standard zu machen.

Das zugrundeliegende Prinzip im Hinterkopf behalten: **KI verstärkt die Engineering-Kultur, in der sie landet.** Ein Team mit starken Tests, klaren Standards und gesundem Review erhält dramatisch mehr aus diesen Tools. Ein Team ohne das wird schneller darin, Probleme zu produzieren. Der Punkt der Standardisierung ist es, die gute Kultur zum Weg des geringsten Widerstands zu machen.

## Das Harness wie Code behandeln

Die Rule-Dateien, System-Prompts, Eval-Suites und Skill-Bibliotheken sind keine persönliche Konfiguration — sie sind gemeinsame Infrastruktur. Genau wie Code behandeln:

- **Versionieren** mit dem Projekt.
- **In Pull Requests reviewen**, wie jede andere Änderung.
- **Benannte Eigentümer zuweisen**, damit sie absichtlich gepflegt werden statt zu verrotten.

Ohne das verhält sich der Agent jedes Entwicklers etwas anders und niemand kann die Ergebnisse anderer reproduzieren.

## Auf den Eval absichern, nicht auf die Demo

Eine funktionierende Demo beweist, dass ein Agent *einmal* erfolgreich sein kann. Eine bestandene Eval-Suite beweist, dass er *zuverlässig* erfolgreich ist. Die beiden sind nicht dasselbe, und auf der Grundlage einer Demo auszuliefern ist der Weg, durch den unzuverlässige Agenten in die Produktion gelangen.

Eval-Abdeckung als Voraussetzung für das Ausliefern festlegen, genauso wie man einen Service an Testabdeckung knüpfen würde. Aber ein Eval ohne klare Rubrik misst nichts — also definieren, was bewertet wird:

- Aufgabenerfolg
- Tool-Nutzungs-Qualität
- Trajectory-Konformität
- Halluzinationsrate
- Antwortqualität

Ein CI-Gate macht es real:

```yaml
# ci: block merge if the agent's eval suite regresses
agent-evals:
  run: eval-suite --rubric rubric.yaml --min-score 0.9
  on: [pull_request]
  required: true
```

## Code-Review für generierten Code umgestalten

Generierter Code braucht dieselbe Prüfung wie menschlicher Code, oder mehr — und Reviewer müssen seine spezifischen Fehlermodi kennen. Sie schulen, auf halluzinierte Abhängigkeiten, dünne Fehlerbehandlung und Korrektheitslücken zu achten, die auf den ersten Blick in Ordnung aussehen (Teil 5). Die Review-Checkliste auf diese Muster abstimmen statt die alte Checkliste für menschlichen Code unverändert zu übernehmen.

## Die Prototyp-/Produktionsgrenze explizit ziehen

Schnelle, lockere Erkundung und disziplinierte Produktionsarbeit sind beide valide — aber nur wenn alle wissen, was gerade was ist. Die Grenze explizit machen:

- Welche **Repos** sind Produktion vs. Sandbox.
- Welche **Branches** die volle Disziplin erfordern.
- Welche **Umgebungen** der Output eines Agenten erreichen kann.

Teams, die das unklar lassen, produzieren Prototypen, die aus Versehen ausgeliefert werden. Eine schriftliche Grenze hält Erkundung schnell und Produktion sicher zugleich.

## Das Harness einmal aufbauen, viele Male verfeinern

Wiederverwendbare Prompts, Skill-Bibliotheken, Tool-Verbindungen und Eval-Harnesses vermehren sich über Projekte hinweg. Die Teams, die am meisten aus der KI-Entwicklung herausholen, sind diejenigen, die dieses gemeinsame Harness einmal aufbauen und kontinuierlich verbessern, statt dass jede Person ihres von Grund auf neu aufbaut. Als Infrastruktur behandeln: dokumentiert, gepflegt, gezielt verbessert.

## Nach Urteilsvermögen einstellen und befördern

Während Implementierung günstiger wird, verschiebt sich der Flaschenhals zu Spezifikation, Evaluation und architektonischem Urteilsvermögen. Die wertvollsten Ingenieure in den nächsten Jahren sind diejenigen, die Agenten gut dirigieren können — nicht diejenigen, die den meisten Code tippen können. Das in Einstellungs-, Level- und Entwicklungsentscheidungen widerspiegeln: Spezifikationsfähigkeit, Evaluationsstrenge und Systemdesign höher gewichten als rohe Implementierungsgeschwindigkeit.

Die stärksten Setups sind von Natur aus hybrid: Menschen geben die Richtung vor, Agenten implementieren, und klare Übergabeprotokolle regeln die Grenze. Code-Review, On-Call und Teamstruktur entwickeln sich alle dahin, Agenten als Teilnehmer zu behandeln, nicht nur als Tools.

## Den eigenen Workflow einrichten

- [ ] Rule-Dateien, Prompts, Evals und Skills ins Repo verschieben; PR-Review für Änderungen vorschreiben.
- [ ] Einen Eigentümer für das gemeinsame Harness benennen.
- [ ] Ein CI-Gate hinzufügen, das Merges blockiert, wenn die Eval-Suite unter einen Schwellenwert regrediert.
- [ ] Eine einseitige Review-Anleitung für Fehlermodi von generiertem Code schreiben.
- [ ] Die Prototyp-vs.-Produktionsgrenze dokumentieren: Repos, Branches, Umgebungen.
- [ ] Im nächsten Einstellungsprozess eine Spezifikations-und-Evaluations-Übung hinzufügen, nicht nur einen Coding-Test.

---

Quelle: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
