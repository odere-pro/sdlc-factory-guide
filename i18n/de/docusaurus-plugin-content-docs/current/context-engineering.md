---
id: context-engineering
title: "Teil 2 — Den Kontext gestalten"
description: Steuern, was der Agent sieht und wann — statischer vs. dynamischer Kontext, Skills für progressive Offenlegung und kostenorientiertes Design.
sidebar_position: 4
keywords: [context engineering, dynamic context, skills, tokens, prompt design]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Teil 2 — Den Kontext gestalten',
      description: 'Steuern, was der Agent sieht und wann — statischer vs. dynamischer Kontext, Skills für progressive Offenlegung und kostenorientiertes Design.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/context-engineering',
      },
    })}
  </script>
</head>

# Teil 2 — Den Kontext gestalten

Context Engineering ist die Fähigkeit, die schnellen KI-Output von *nützlichem* KI-Output unterscheidet. Die Rule-Datei aus Teil 1 ist ein Baustein davon. Dieser Teil behandelt die übergeordnete Disziplin: entscheiden, was der Agent sieht und wann.

Die mentale Umstellung geht weg von „Wie formuliere ich das, um das Modell zu gutem Code zu bewegen?" hin zu „Was würde ein neues Teammitglied wissen müssen, um einen guten Beitrag zu leisten, und wie übergebe ich ihm das effizient?"

## Die zwei Eimer: statisch und dynamisch

Jedes Kontextstück fällt in einen von zwei Eimern, und die Wahl des Eimers ist eine echte Engineering-Entscheidung mit echten Kosten.

**Statischer Kontext** wird immer geladen, bei jedem einzelnen Request:

- Systemanweisungen
- Rule-Dateien (`CLAUDE.md` und ähnliche)
- Globales Gedächtnis und Persona

Er ist zuverlässig — der Agent vergisst ihn nie — aber teuer, weil jedes seiner Token bei jedem Aufruf bezahlt wird, unabhängig davon, ob die aktuelle Aufgabe ihn benötigt.

**Dynamischer Kontext** wird nur bei Bedarf geladen:

- Skills, die durch die aktuelle Aufgabe ausgelöst werden
- Tool-Ergebnisse, die während der Ausführung abgerufen werden
- Dokumente, die aus einem Suchindex abgerufen werden
- Der jüngste Ausschnitt des Konversationsverlaufs

Er ist effizient — man zahlt nur, wenn die Information tatsächlich relevant ist.

Die Falle an beiden Extremen: zu viel statischer Kontext verschwendet Geld und *verwässert das Signal* (die wichtigen Regeln gehen im Rauschen unter), während zu wenig bedeutet, dass der Agent Dinge vergisst, die er brauchte. Die Grenzlinie statisch/dynamisch wie jede andere Architekturentscheidung behandeln — überprüft und versioniert, nicht zufällig gezogen.

## Eine schnelle Kostenvorstellung

Angenommen, die Rule-Datei umfasst 2.000 Tokens und es werden 50 Requests in einer Sitzung gestellt. Das ergibt allein 100.000 Tokens für die Rule-Datei, 50-mal bezahlt. Wenn die Hälfte dieser Datei Referenzmaterial ist, das nur für eine Aufgabe relevant ist, verbrennt man Geld für 49 Requests, die es nicht benötigten. Diese Hälfte in einen Skill auslagern, der bei Bedarf geladen wird, und die Kosten verschwinden für die anderen 49.

Deshalb ist „statischen Kontext dicht und signalreich halten" keine Stilpräferenz — es ist ein Budgetposten.

## Skills: das Muster für dynamischen Kontext

Der effektivste Weg, den dynamischen Eimer zu verwalten, ist ein **Skill**: ein in sich geschlossenes Paket aus prozeduralem Wissen, das der Agent nur lädt, wenn eine Aufgabe dazu passt.

Skills arbeiten durch *progressive Offenlegung* — drei Schichten, träge geladen:

1. Beim Start sieht der Agent nur leichtgewichtige Metadaten (einen Namen und eine einzeilige Beschreibung).
2. Wenn eine Aufgabe passt, lädt er die vollständigen Anweisungen.
3. Nur wenn er die Tiefe benötigt, zieht er schweres Referenzmaterial heran.

Das Ergebnis: ein leichtgewichtiger generalistischer Agent kann Dutzende von Spezialkompetenzen tragen, bezahlt aber nur die Token-Kosten für die eine, die er aktiv verwendet.

Ein minimaler Skill sieht so aus:

```markdown
---
name: stripe-refunds
description: How to issue and reconcile refunds through our billing layer. Use when a task involves refunds, chargebacks, or payment reversals.
---

# Issuing a refund

1. Look up the charge via `billing.get_charge(charge_id)`.
2. Refunds over $500 require an `approved_by` field — never auto-approve.
3. Call `billing.refund(charge_id, amount, approved_by)`.
4. Write a `RefundRecord` to the ledger in the same transaction.
5. Emit a `refund.issued` event.

See `reference/refund-edge-cases.md` for partial refunds and currency conversion.
```

Der Agent liest dies nur, wenn eine Aufgabe tatsächlich Erstattungen erwähnt. Den Rest der Zeit kostet es nichts außer der einzeiligen Beschreibung.

## Die sechs Arten von Kontext, die zu verwalten sind

Wenn entschieden wird, was bereitzustellen ist, über sechs Kategorien nachdenken. Die meisten Workflows investieren zu wenig in die mittleren vier.

- **Anweisungen** — die Rolle, Ziele und Grenzen des Agenten (die Rule-Datei).
- **Wissen** — Dokumentation, Architekturdiagramme, Domänendaten.
- **Gedächtnis** — was gerade passiert ist (Sitzung) und was das Projekt ist (Langzeitgedächtnis).
- **Beispiele** — Referenzmuster *aus der eigenen Codebasis*, keine generischen aus dem Internet.
- **Tools** — präzise Definitionen der APIs und Skripte, die der Agent aufrufen kann.
- **Leitplanken** — harte Einschränkungen und Sicherheitsregeln.

Das Punkt „Beispiele" verdient Aufmerksamkeit: ein einziges Beispiel aus dem echten Code lehrt dem Agenten den eigenen Stil schneller als drei Absätze Beschreibung.

## Nicht das gesamte Repo einfügen

Ein häufiger Fehler ist, ein gesamtes Repository mit 100.000 Tokens in den Prompt einzufügen, „damit es alles hat". Das ist sowohl teuer als auch kontraproduktiv — das relevante Signal geht unter. Stattdessen die wenigen Dateien abrufen, die für die aktuelle Aufgabe wichtig sind, und den Agenten bei Bedarf mehr anfordern lassen. Bewusstsein für die gesamte Codebasis ist Aufgabe des Tools (Indexierung, Retrieval), nicht etwas, das manuell bei jedem Prompt erledigt wird.

## Den eigenen Workflow einrichten

- [ ] Alles auflisten, was sich derzeit im statischen Kontext befindet. Für jedes Element fragen: Braucht *jede* Aufgabe das?
- [ ] Aufgabenspezifisches Material aus der Rule-Datei in Skills auslagern.
- [ ] Den ersten Skill für eine wiederkehrende Spezialaufgabe schreiben (ein Erstattungsfluss, ein Migrationsmuster, ein Berichtsformat).
- [ ] Einige echte Beispiele aus der Codebasis zur Rule-Datei oder einem Skill hinzufügen.
- [ ] Aufhören, ganze Dateien einzufügen; Retrieval das Relevante ans Licht bringen lassen.
