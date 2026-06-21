---
id: production-agents
title: "Teil 7 — Produktionsagenten ausliefern"
description: Vom Prototyp-Skript zum Produktionsagenten — persistentes Gedächtnis, eingeschränkte Berechtigungen, Eval-Abdeckung und Multi-Agenten-Koordination.
sidebar_position: 9
keywords: [production agents, MCP, A2A, agent deployment, multi-agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Teil 7 — Produktionsagenten ausliefern',
      description: 'Vom Prototyp-Skript zum Produktionsagenten — persistentes Gedächtnis, eingeschränkte Berechtigungen, Eval-Abdeckung und Multi-Agenten-Koordination.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/production-agents',
      },
    })}
  </script>
</head>

# Teil 7 — Produktionsagenten ausliefern

Alles bisher behandelte handelte davon, Agenten zum Aufbau von Software zu nutzen. Dieser Teil behandelt den Fall, dass *das, was gebaut wird, selbst ein Agent ist* — ein Kundenservice-Bot, ein Recherche-Assistent, ein internes Monitoring-Tool. Das sind keine Skripte, die einmal ausgeführt werden; es sind Produkte, die echten Nutzern dienen, und sie brauchen mehr darunter.

## Zuerst festlegen, was tatsächlich gebaut wird

Die einzige nützlichste Frage vor dem Start:

- **Ist das ein Skript?** Eine einmalige Automatisierung, ein persönliches Tool, ein Prototyp. Der Agent ist das Ziel. Ein regulärer Coding-Agent im Terminal reicht.
- **Ist das ein Produkt?** Etwas, auf das echte Nutzer angewiesen sind. Der Agent ist jetzt das Produkt und braucht ein Substrat darunter: eigene Tools, Gedächtnis, Evaluation und Deployment-Infrastruktur.

Die beiden zu verwechseln ist der Weg, auf dem Prototypen aus Versehen ausgeliefert werden. Explizit sein, welches gebaut wird, bevor irgendetwas geschrieben wird.

## Was ein Produktionsagent braucht, das ein Skript nicht hat

Wenn echte Nutzer vom Agenten abhängig sind, hören vier Dinge auf, optional zu sein:

- **Persistentes Gedächtnis** über Sitzungen hinweg, damit der Agent nicht jedes Mal von vorne beginnt.
- **Eingeschränkte Berechtigungen** für jedes Tool und jede Datenquelle, damit der Agent nur erreichen kann, was er sollte.
- **Eval-Abdeckung** in CI, damit Regressionen abgefangen werden, bevor sie ausgeliefert werden (das ist Teil 3, auf den Agenten selbst angewendet).
- **Observability**, die trackt, was der Agent tatsächlich getan hat, damit das Produktionsverhalten nachvollziehbar ist (das ist Teil 5, auf den Agenten selbst angewendet).

Für ein einmaliges Skript ist das den Aufwand nicht wert. Für ein Produkt ist das Aufbauen *nach* dem Launch statt davor der Weg zu einem unwartbaren, unzuverlässigen System.

## Einen Workflow vom Prototyp bis zur Produktion halten

Die Verschiebung, die das praktisch macht: derselbe terminal-basierte Workflow, der einen Prototyp erzeugt, reicht jetzt bis zu einem deployed Produkt. Kein separater Stack wird erlernt, um in die Produktion zu gehen. Was gewünscht wird, wird beschrieben, und ein Skills-Bundle (die Art aus Teil 2) gibt dem vorhandenen Coding-Agenten den vollständigen Lebenszyklus — Scaffolden, Schreiben, Evaluieren, Deployen, Observability verdrahten — ohne ein neues SDK.

Die Schleife sieht von Anfang bis Ende wie eine Konversation aus:

```
# one-time setup of the skills bundle, then, in your coding agent:
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

Dahinter scaffoldet der Agent das Projekt aus einer Vorlage, schreibt den Code, generiert ein Eval-Set, führt es aus, deployed und berichtet zurück. Für diejenigen, die lieber direkt steuern, sind dieselben Schritte als einfache CLI-Befehle verfügbar. Das Ergebnis: Der Prototyp, der gestern auf dem Laptop lief, wird heute der Produktionsagent, der Nutzer bedient — ohne Umschreibung.

## Multi-Agenten einsetzen

Wenn ein Agent nicht ausreicht, findet Koordination durch drei Mechanismen statt, die auf verschiedenen Ebenen eingesetzt werden:

- **Gemeinsamer Sitzungsstatus** — für einfache Fälle, bei denen Agenten einfach denselben Kontext sehen müssen.
- **MCP (Model Context Protocol)** — die Standardmethode, mit der Agenten auf Tools und externe Dienste zugreifen.
- **A2A (Agent2Agent)** — wenn ein Agent Arbeit an einen anderen delegiert.

Diese kombinieren sich zu beliebigen passenden Mustern: ein Planer übergibt Teilaufgaben an Spezialisten, parallele Worker an verschiedenen Teilen eines Jobs, ein Reviewer-Agent prüft einen Builder-Agenten. Der Flaschenhals verlagert sich vom Schreiben der Implementierung zur Spezifikation, was jeder Agent tun soll, und zur Verifikation, dass er es getan hat — dasselbe Thema wie im Rest dieses Leitfadens, eine Ebene höher.

## Den eigenen Workflow einrichten

- [ ] Für den nächsten Agenten einen Satz schreiben: „Das ist ein Skript" oder „Das ist ein Produkt." Das entscheidet, wie viel Substrat gebaut wird.
- [ ] Wenn es ein Produkt ist, die vier Essentials hinzufügen: persistentes Gedächtnis, eingeschränkte Berechtigungen, CI-Evals, Lauf-Tracing.
- [ ] Ein Skills-Bundle nutzen, damit Build → Evaluieren → Deployen → Beobachten in einem Workflow bleibt.
- [ ] Wenn mehrere Agenten benötigt werden, mit Shared State beginnen; MCP und A2A nur erreichen, wenn die Koordination das tatsächlich erfordert.
