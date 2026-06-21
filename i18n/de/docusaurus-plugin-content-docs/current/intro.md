---
id: intro
title: Der Agentic-Engineering-Workflow
description: Ein praktischer, achtteiliger Leitfaden, der den Weg von ad-hoc-KI-Prompts hin zu einem disziplinierten Workflow beschreibt, dem man im Produktionsbetrieb vertrauen kann.
sidebar_position: 1
slug: /
keywords: [agentic engineering, AI workflow, software development, SDLC, vibe coding]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Der Agentic-Engineering-Workflow',
      description: 'Ein praktischer, achtteiliger Leitfaden, der den Weg von ad-hoc-KI-Prompts hin zu einem disziplinierten Workflow beschreibt, dem man im Produktionsbetrieb vertrauen kann.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/',
      },
    })}
  </script>
</head>

# Der Agentic-Engineering-Workflow

Ein praktischer, achtteiliger Leitfaden, der den Weg von ad-hoc-KI-Prompts hin zu einem disziplinierten Workflow beschreibt, dem man im Produktionsbetrieb vertrauen kann. Jeder Teil ist in sich abgeschlossen: Lesen, Beispiele übernehmen und diesen Baustein im eigenen Workflow einrichten.

Der rote Faden durch alle acht Teile: **Ihr eigentliches Produkt ist kein Code mehr — es ist das System, das Code erzeugt.** Das Modell ist nur ein kleiner Teil dieses Systems. Alles, was Sie darum herum aufbauen (Regeln, Kontext, Tests, Review, Observability), entscheidet darüber, ob der Output vertrauenswürdig ist.

## Die Serie

1. **[Die Rule-Datei einrichten](/docs/rule-file)** — dem Agenten das Projektwissen vermitteln, das ein neues Teammitglied braucht.
2. **[Den Kontext gestalten](/docs/context-engineering)** — steuern, was der Agent sieht und wann.
3. **[Verifikation aufbauen](/docs/verification)** — Tests und Evals als Vertrag mit der KI.
4. **[Die Arbeit ausführen](/docs/running-the-work)** — Conductor vs. Orchestrator und wo Agenten in den Alltag passen.
5. **[Reviewen und ausliefern](/docs/review-and-ship)** — Fehler erkennen, die „richtig aussehen".
6. **[Kosten kontrollieren](/docs/controlling-cost)** — Total Cost of Ownership und Model-Routing.
7. **[Produktionsagenten ausliefern](/docs/production-agents)** — vom Prototyp-Skript zu einem Produkt mit Substrat.
8. **[Als Teamstandard etablieren](/docs/team-standard)** — das Harness versionieren, auf Evals absichern, nach Urteilsvermögen einstellen.

## Anwendungshinweise

- **Solo-Entwickler?** Die Teile 1–6 genügen, um den täglichen Workflow grundlegend zu verbessern. Mit Teil 1 beginnen.
- **KI-Produkt im Aufbau?** Teil 7 hinzufügen.
- **Teamlead?** Teile 1–8, mit besonderem Gewicht auf 3, 5 und 8.

---

Quelle: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
