---
id: verification
title: "Teil 3: Verifikation aufbauen"
description: Tests als deterministischer Vertrag und Evals für nicht-deterministisches Verhalten — das Qualitätsschwungrad, das sich aufschaukelt.
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Teil 3: Verifikation aufbauen',
      description: 'Tests als deterministischer Vertrag und Evals für nicht-deterministisches Verhalten — das Qualitätsschwungrad, das sich aufschaukelt.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/verification',
      },
    })}
  </script>
</head>

# Teil 3: Verifikation aufbauen

Hier ist die Linie, die entscheidet, ob echtes Engineering betrieben wird oder nur gewürfelt: **Wie werden die Outputs verifiziert?** Lautet die Antwort „Ich führe es aus und es scheint zu funktionieren", betreibt man Vibe Coding — egal wie ausgeklügelt die Prompts sind. Verifikation ist die Disziplin, die KI-Output bei Produktionseinsätzen vertrauenswürdig macht.

Zwei Mechanismen wirken zusammen. Tests decken das Deterministische ab. Evals decken das Nicht-Deterministische ab.

## Tests: der deterministische Vertrag

Tests verifizieren die Teile des Systems, bei denen ein gegebener Input einen gegebenen Output erzeugen muss. Es sind dieselben Tests, die man ohnehin schreiben würde — aber in einem KI-Workflow übernehmen sie eine zweite Funktion: **Sie kommunizieren Absicht präziser an den Agenten als jeder Prompt.**

Ein Test ist eine Spezifikation, die eine Maschine prüfen kann. Dem Agenten einen fehlschlagenden Test und „Lass diesen bestehen" zu übergeben gibt ihm ein eindeutiges Ziel und eine automatische Möglichkeit zu wissen, wann er fertig ist. Also zuerst schreiben:

```python
def test_refund_over_threshold_requires_approval():
    charge = make_charge(amount=600_00)
    with pytest.raises(ApprovalRequired):
        refund_service.issue(charge.id, amount=600_00, approved_by=None)

def test_refund_writes_ledger_entry():
    charge = make_charge(amount=50_00)
    refund_service.issue(charge.id, amount=50_00, approved_by="alice")
    assert ledger.last_entry().type == "refund"
```

Der Agent kennt nun die Schwellenwertregel und die Ledger-Anforderung, ohne dass Sie sie in Prosa erklären müssen. Der Test *ist* die Erklärung.

## Evals: das Nicht-Deterministische beurteilen

Tests können nicht alles abdecken, weil ein großer Teil des Agentenverhaltens nicht deterministisch ist. Hat der Agent einen sinnvollen Weg zur Antwort eingeschlagen? Hat er die richtigen Tools gewählt? Ist der finale Output tatsächlich gut, nicht nur syntaktisch valide? Das misst **Evals**.

Evals werden mit beschrifteten Datensätzen, Bewertungsrubriken und manchmal einem Modell als Richter geprüft. Es gibt zwei Arten, und man braucht beide:

- **Output-Evaluation** — beurteilt das finale Artefakt. Kompiliert der Code? Bestehen die Tests? Ist die Zusammenfassung korrekt?
- **Trajectory-Evaluation** — beurteilt *wie es dazu kam*. Hat der Agent die richtigen Tools in einer sinnvollen Reihenfolge aufgerufen, oder hat er sich zu einem bestehenden Ergebnis durchgetastet?

Trajectory matters more than it looks. A fluent output that skipped its verification steps is *more* dangerous than one with an obvious error, because it hides the risk. An agent that happened to produce correct code while ignoring the test suite will eventually produce incorrect code the same way.

Der Lösungsweg ist wichtiger als er aussieht. Ein flüssiger Output, der seine Verifikationsschritte übersprungen hat, ist *gefährlicher* als einer mit einem offensichtlichen Fehler, weil er das Risiko verbirgt. Ein Agent, der zufällig korrekten Code produziert hat, während er die Test-Suite ignorierte, wird auf dieselbe Weise irgendwann inkorrekten Code produzieren.

## Eine konkrete Eval-Rubrik

Für einen Agenten, der Fragen aus der Dokumentation beantwortet, ist ein Eval-Set eine Liste von Fällen plus einer Rubrik:

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

Jeder Lauf bewertet: Hat er die erforderlichen Fakten erwähnt, die verbotenen vermieden und den erwarteten Tool-Pfad befolgt? Ein Modell-Richter kann die weichere Dimension „Ist diese Antwort klar und korrekt?" gegen eine selbst geschriebene Rubrik beurteilen. Der Punkt ist, dass „gut" nun explizit definiert und automatisch geprüft wird — nicht nach Augenschein.

## Das Qualitätsschwungrad

Tests und Evals entfalten ihren vollen Wert, wenn sie in eine Schleife eingebunden werden, die sich aufschaukelt:

1. **Evaluieren** gegen die Benchmark-Suite.
2. **Diagnose** von Fehlern durch Clustering in Grundursachen (nicht einzelne Ausreißer beheben).
3. **Optimieren** des Prompts, der Regel oder des Tools, das das Cluster verursacht hat.
4. **Verifizieren** der Korrektur gegen eine Regressions-Suite, damit sie bestehen bleibt.
5. **Überwachen** des Produktionsverkehrs auf neue Fehlermodi und Rückkopplung in Schritt 1.

Jede Runde dieser Schleife lässt die nächste von einer höheren Ausgangslage starten. So wird ein Agent im Laufe der Zeit zuverlässig besser, ohne das darunter liegende Modell zu ändern.

## Den eigenen Workflow einrichten

- [ ] Für das nächste Feature die Tests schreiben, bevor der Agent Code generieren darf.
- [ ] Ein kleines Eval-Set aufbauen — selbst zehn Fälle — für ein wichtiges Agentenverhalten.
- [ ] Für jeden Eval-Fall sowohl definieren, was der Output enthalten muss, als auch welchen Tool-Pfad man erwartet.
- [ ] Eine Regressions-Suite hinzufügen, die jede Korrektur erneut ausführt.
- [ ] Einen Produktionsfehler diese Woche auswählen, sein Grundursachen-Cluster finden und die Ursache beheben, nicht das Symptom.
