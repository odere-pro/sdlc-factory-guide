---
id: checklist
title: Implementierungs-Checkliste
description: Vollständige, handlungsorientierte Checkliste zur Einrichtung eines Agentic-Engineering-Workflows — von Rule-Dateien bis zu Teamstandards.
sidebar_position: 2
keywords: [checklist, implementation, setup, agentic engineering, AI development]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Implementierungs-Checkliste',
      description: 'Vollständige, handlungsorientierte Checkliste zur Einrichtung eines Agentic-Engineering-Workflows — von Rule-Dateien bis zu Teamstandards.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/checklist',
      },
    })}
  </script>
</head>

# Agentic Engineering — Implementierungs-Checkliste

## Inhalt
1. [Die Rule-Datei einrichten](#1-die-rule-datei-einrichten)
2. [Den Kontext gestalten](#2-den-kontext-gestalten)
3. [Verifikation aufbauen](#3-verifikation-aufbauen)
4. [Die Arbeit ausführen](#4-die-arbeit-ausfuhren)
5. [Reviewen und ausliefern](#5-reviewen-und-ausliefern)
6. [Kosten kontrollieren](#6-kosten-kontrollieren)
7. [Produktionsagenten ausliefern](#7-produktionsagenten-ausliefern)
8. [Als Teamstandard etablieren](#8-als-teamstandard-etablieren)

---

## 1. Die Rule-Datei einrichten

- [ ] Eine `CLAUDE.md` / `AGENTS.md` im Repo-Root anlegen. Mit 10 Zeilen beginnen.
- [ ] Vier Punkte abdecken:
  - [ ] Stack und Versionen
  - [ ] Konventionen (Ordnerstruktur, Benennung, tatsächlich verwendete Muster)
  - [ ] Harte Regeln, die der Agent niemals brechen darf (verbotene Pakete, Umgang mit Secrets, Schichtung)
  - [ ] Workflow, der vor der Code-Generierung einzuhalten ist
- [ ] Jedes Mal eine neue Regel ergänzen, wenn der Agent etwas tut, das sich nicht wiederholen soll.
- [ ] Die Tools auflisten, die der Agent aufrufen darf, und wann welches zu verwenden ist (APIs, Skripte, DB-Schemata).
- [ ] Architekturentscheidungen selbst treffen; den Agenten implementieren, nicht wählen lassen.

## 2. Den Kontext gestalten

- [ ] Festlegen, was **statisch** (immer geladen) vs. **dynamisch** (bei Bedarf geladen) ist:
  - [ ] Statisch: Rule-Dateien, Systemanweisungen, globales Gedächtnis
  - [ ] Dynamisch: Skills, Tool-Ergebnisse, abgerufene Dokumente, jüngerer Verlauf
- [ ] Statischen Kontext kurz und signalreich halten. Alles streichen, was der Agent nicht bei jedem Aufruf braucht.
- [ ] Wiederholbares Know-how in Skills auslagern, die nur bei passendem Task geladen werden.
- [ ] Nie das gesamte Repo in den Prompt einfügen. Nur das Relevante abrufen.

## 3. Verifikation aufbauen

- [ ] Tests schreiben, bevor das Feature generiert wird. Tests sind die Spezifikation.
- [ ] Evals für nicht-deterministische Teile schreiben:
  - [ ] Hat der Agent einen sinnvollen Weg eingeschlagen?
  - [ ] Hat er die richtigen Tools gewählt?
  - [ ] Entspricht der Output dem Qualitätsanspruch?
- [ ] Sowohl das Ergebnis (kompiliert, Tests bestanden) als auch den Lösungsweg (wie es dazu kam) prüfen.
- [ ] Den Feedback-Kreislauf aufbauen:
  - [ ] Gegen eine Benchmark-Suite ausführen
  - [ ] Fehler nach Grundursache clustern
  - [ ] Prompt oder Tool beheben, das sie verursacht hat
  - [ ] Regressions-Suite erneut ausführen
  - [ ] Produktion auf neue Fehler überwachen

## 4. Die Arbeit ausführen

- [ ] Pro Task einen Modus wählen:
  - [ ] **Conductor** (Echtzeit, im Editor) für komplexe Logik, Debugging, unbekannte Codebasen
  - [ ] **Orchestrator** (async, delegieren und reviewen) für Bug-Fixes, Migrationen, Testgenerierung
- [ ] Pro Task den Agenten-Standort wählen:
  - [ ] Editor-Agent — Inline-Bearbeitungen und Vorschläge
  - [ ] Terminal-Agent — dateiübergreifende Arbeit, Ausführen und Reagieren
  - [ ] Hintergrund-Agent — Aufgaben mit Absatz-Spezifikation, von denen man sich abwenden kann
- [ ] Code-Generierung innerhalb einer Sandbox ausführen, nur mit zugelassenen Tools.
- [ ] Die letzten 20 % selbst erledigen: Randfälle, Fehlerbehandlung, Integrationspunkte, Geschäftslogik. Code, der „richtig aussieht", ist der Ort, an dem sich die Bugs verstecken.

## 5. Reviewen und ausliefern

- [ ] Den Agenten als Erst-Reviewer nutzen (Bugs, Stil, Sicherheit, Performance).
- [ ] Jede Zeile, die ausgeliefert wird, reviewen:
  - [ ] Cleveren Code skeptisch betrachten
  - [ ] Prüfen, ob importierte Pakete tatsächlich existieren
  - [ ] Fehlerbehandlung auf realistische Ausfälle überprüfen
- [ ] Hooks an Commit-/Edit-Punkten hinzufügen (z. B. Commits mit hartkodierten Secrets blockieren).
- [ ] Observability einschalten: Traces, Eval-Ergebnisse, Token/Latenz/Kosten, Drift.
- [ ] Den Agenten auf Legacy-Arbeit ansetzen, die bisher vermieden wurde: Refactorings, Migrationen, veraltete APIs.

## 6. Kosten kontrollieren

- [ ] Gesamtbetriebskosten messen, nicht nur Geschwindigkeit.
- [ ] Erstversuchs-Erfolgsrate durch eine präzise Rule-Datei erhöhen, um Retry-Schleifen zu vermeiden.
- [ ] Modelle nach Task routen:
  - [ ] Frontier-Modelle für Architektur und schwierige Implementierungen
  - [ ] Günstige Modelle für Testgenerierung, Review, CI-Monitoring
- [ ] Dynamischen Kontext und Skills nutzen, damit nur die tatsächlich benötigten Tokens bezahlt werden.

## 7. Produktionsagenten ausliefern

- [ ] Festlegen, was gebaut wird:
  - [ ] Ein Skript — der Agent ist der Endpunkt
  - [ ] Ein Produkt für echte Nutzer — der Agent braucht ein Substrat
- [ ] Für Produkte hinzufügen: persistentes Gedächtnis, eingeschränkte Berechtigungen, Eval-Abdeckung in CI, vollständiges Tracing von Läufen.
- [ ] Ein Skills-Bundle nutzen, damit der vorhandene Coding-Agent Build → Evaluieren → Deployen → Beobachten übernimmt.
- [ ] Bei Multi-Agenten-Setups: Koordination über Shared State, MCP für Tools, A2A für Delegation.

## 8. Als Teamstandard etablieren

- [ ] Rule-Dateien, Prompts, Eval-Suites und Skills versionieren. In PRs reviewen. Eigentümer benennen.
- [ ] Auslieferung an eine bestandene Eval-Suite mit klarem Rubric knüpfen, nicht an eine funktionierende Demo.
- [ ] Reviewer darin schulen, wie generierter Code versagt.
- [ ] Die Grenze Prototyp vs. Produktion explizit machen (welche Repos, Branches, Umgebungen).
- [ ] Das Harness einmal aufbauen und kontinuierlich verfeinern.
- [ ] Nach Urteilsvermögen einstellen und befördern: Spezifikation, Evaluation, Architektur.

---

### Referenz

Basiert auf *The New SDLC With Vibe Coding* (Google):
https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
