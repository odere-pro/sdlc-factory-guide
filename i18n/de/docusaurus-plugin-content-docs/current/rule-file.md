---
id: rule-file
title: "Teil 1: Die Rule-Datei einrichten"
description: Das Onboarding-Dokument erstellen, das Ihr KI-Agent benötigt — Stack, Konventionen, harte Regeln und Workflow in CLAUDE.md oder AGENTS.md.
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Teil 1: Die Rule-Datei einrichten',
      description: 'Das Onboarding-Dokument erstellen, das Ihr KI-Agent benötigt — Stack, Konventionen, harte Regeln und Workflow in CLAUDE.md oder AGENTS.md.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/rule-file',
      },
    })}
  </script>
</head>

# Teil 1: Die Rule-Datei einrichten

Ein Coding-Agent trifft in Ihrem Repository ein wie ein neuer Ingenieur am ersten Tag — nur dass er keine Fragen stellen kann. Er schlussfolgert. Und ohne jegliche Grundlage liegt er dabei vorhersehbar falsch: das falsche State-Management-Pattern, das falsche Ordner-Layout, die falsche Test-Konvention, den falschen Import-Pfad.

Die Rule-Datei ist das Onboarding-Dokument, das dieser neue Ingenieur Sie nie bitten konnte zu schreiben. Es ist die Stunde mit dem größten Hebel in diesem gesamten Leitfaden, denn jede künftige Interaktion im Projekt erbt sie.

## Warum es funktioniert

Die meisten Menschen versuchen, schlechten KI-Output durch clevere Prompts zu beheben. Das ist der falsche Hebel. Die Ausgabequalität hängt weit mehr davon ab, was der Agent *über Ihr Projekt weiß*, als davon, wie Sie eine Anfrage formulieren. Eine Rule-Datei kodiert dieses Wissen einmal, sodass Sie aufhören, es in jeder Sitzung neu erklären zu müssen.

Die Datei trägt je nach Tool unterschiedliche Namen — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` — aber der Inhalt ist dieselbe Idee: wer der Agent in diesem Repo ist, was er tun muss und was er niemals tun darf.

## Was hineingehört

Vier Teile. Jeden kurz und spezifisch halten.

1. **Stack und Versionen** — damit der Agent aufhört zu raten, welche APIs existieren.
2. **Konventionen** — die Muster, die *tatsächlich* verwendet werden, keine allgemeinen Best Practices.
3. **Harte Regeln** — Dinge, die niemals passieren dürfen.
4. **Workflow** — die Schritte, die vor und nach der Code-Generierung einzuhalten sind.

## Ein reales Beispiel

```markdown
# CLAUDE.md

## Stack
- Python 3.12, FastAPI, SQLAlchemy 2.0 (async)
- Postgres 16, Alembic for migrations
- pytest + httpx for tests
- uv for dependency management

## Conventions
- Feature folders under `app/features/<name>/`, not layered by type.
- Routes are thin: validation + a single service call. No business logic in routes.
- Services return domain objects; serialization happens in the route layer.
- All DB access goes through repositories. No raw SQL in services.
- Async everywhere. No blocking calls inside request handlers.

## Hard rules
- Never add a dependency that isn't already in pyproject.toml. Ask first.
- Never write secrets, tokens, or connection strings into code or tests.
- No `print()`. Use the configured `structlog` logger.
- Every new endpoint needs a test in the matching `tests/` folder before it's done.
- Run `ruff check` and `pytest` before declaring a task complete.

## Workflow
1. Read the feature's spec or ticket before writing code.
2. Write the test first, then implement until it passes.
3. If a change touches the database schema, stop and flag it for human review.
4. After implementing, confirm ruff and pytest both pass, then summarize what changed.
```

Beachten Sie, was das *nicht* ist: kein Prompt und kein Tutorial über FastAPI. Es sind Betriebsanweisungen, die spezifisch für diese Codebasis sind. Ein generalistisches Modell kennt FastAPI bereits; was es nicht kennt, ist, dass *Ihre* Routes schlank bleiben müssen und *Ihre* Secrets-Regel absolut gilt.

## Durch Korrekturen wachsen lassen

Versuchen Sie nicht, die perfekte Datei von Anfang an zu schreiben. Beginnen Sie mit zehn Zeilen und lassen Sie echte Fehler Sie lehren, was hinzuzufügen ist. Die Schleife ist einfach:

- Der Agent tut etwas, das nicht gewünscht ist.
- Eine Regel wird hinzugefügt, die es verhindert.
- Es passiert nie wieder.

Angenommen, der Agent erfindet immer wieder eine `utils.py` als Sammelsurium. Dann fügt man hinzu:

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

Jede Regel ist günstig hinzuzufügen und zahlt sich bei jeder nachfolgenden Aufgabe aus. Nach einigen Wochen hat man eine Datei, die den Agenten so verhält lässt, als hätte er monatelang an dem Projekt mitgearbeitet.

## Auch die Tools definieren

Die Rule-Datei ist auch der Ort, an dem dem Agenten mitgeteilt wird, welche Tools er verwenden kann und wann — spezifische interne APIs, Skripte, Datenbankschemata. Eine einzeilige Beschreibung, *wann* ein Tool aufgerufen werden soll, verhindert, dass der Agent es entweder ignoriert oder missbraucht.

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## Architektur verantworten; der Agent implementiert

Eine Grenze, die konsequent eingehalten werden muss: Der Agent ist gut im *Implementieren* einer Architektur, aber schlecht im *Wählen* einer. Abwägungen wie Konsistenz vs. Verfügbarkeit oder Build vs. Buy hängen von Geschäftskontext ab, den das Modell nicht sehen kann. Diese Entscheidungen selbst treffen, aufschreiben und den Agenten danach bauen lassen. Eine klare Architektur-Notiz in der Rule-Datei macht den Agenten zu einem konsistenten Umsetzer statt zu einem Improvisateur.

## Den eigenen Workflow einrichten

- [ ] Die Rule-Datei im Repo-Root mit der Namenskonvention des verwendeten Tools anlegen.
- [ ] Zehn Zeilen schreiben: Stack, zwei oder drei Konventionen, zwei oder drei harte Regeln, einen kurzen Workflow.
- [ ] Einen Abschnitt `## Tools` hinzufügen, in dem Skripte/APIs aufgelistet werden, die der Agent verwenden soll und nicht soll.
- [ ] In der nächsten Woche jedes Mal eine Regel ergänzen, wenn der Agent sich falsch verhält.
- [ ] Die Datei in die Versionskontrolle committen, damit das gesamte Team (und jede künftige Sitzung) sie teilt.
