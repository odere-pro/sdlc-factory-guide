---
id: rule-file
title: "Del 1: Sätt upp regelfilen"
description: Skapa det onboarding-dokument din AI-agent behöver — stack, konventioner, hårda regler och arbetsflöde i CLAUDE.md eller AGENTS.md.
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Del 1: Sätt upp regelfilen',
      description: 'Skapa det onboarding-dokument din AI-agent behöver — stack, konventioner, hårda regler och arbetsflöde i CLAUDE.md eller AGENTS.md.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/rule-file',
      },
    })}
  </script>
</head>

# Del 1: Sätt upp regelfilen

En kodningsagent anländer till ditt repo som en ny ingenjör sin första dag, förutom att den inte kan ställa frågor. Den infererar. Och utan något att gå på infererar den fel på förutsägbara sätt: fel tillståndshanteringsmönster, fel mappstruktur, fel testkonvention, fel importsökväg.

Regelfilen är det onboarding-dokument som den nya ingenjören aldrig fick be dig skriva. Det är den enskilt mest hävstångseffektiva timmen i hela den här guiden, eftersom varje framtida interaktion i projektet ärver den.

## Varför det fungerar

De flesta försöker fixa dåliga AI-utdatan genom att skriva smartare promptar. Det är fel spak. Utdatakvaliteten beror mycket mer på vad agenten *vet om ditt projekt* än på hur du formulerar en förfrågan. En regelfil kodar in den kunskapen en gång, så du slutar förklara om den varje session.

Filen har olika namn beroende på verktyg — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` — men innehållet är samma idé: vem agenten är i det här repot, vad den måste göra och vad den aldrig får göra.

## Vad som hör hemma i den

Fyra delar. Håll var och en kort och specifik.

1. **Stack och versioner** — så agenten slutar gissa vilka API:er som finns.
2. **Konventioner** — de mönster du *faktiskt* använder, inte generiska bästa praxis.
3. **Hårda regler** — de saker som aldrig får hända.
4. **Arbetsflöde** — stegen att följa före och efter kodgenerering.

## Ett verkligt exempel

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

Lägg märke till vad detta *inte* är: det är inte en prompt, och det är inte en handledning om FastAPI. Det är en uppsättning driftsinstruktioner specifika för den här kodbasen. En generalistmodell kan FastAPI redan; vad den inte vet är att *dina* routes måste vara tunna och att *din* hemlighetsregel är absolut.

## Bygg ut den genom korrigering

Försök inte skriva den perfekta filen direkt. Börja med tio rader och låt verkliga misslyckanden lära dig vad du ska lägga till. Loopen är enkel:

- Agenten gör något du inte vill.
- Du lägger till en regel som förhindrar det.
- Det händer aldrig igen.

Säg till exempel att agenten envisas med att uppfinna en `utils.py`-soptunna. Du lägger till:

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

Varje regel är billig att lägga till och lönar sig på varje efterföljande uppgift. Efter några veckor har du en fil som får agenten att bete sig som någon som jobbat på projektet i månader.

## Definiera verktygen också

Regelfilen är också där du talar om för agenten vilka verktyg den kan nå och när den ska använda dem — specifika interna API:er, skript, databasscheman. En enrads-beskrivning av *när* ett verktyg ska anropas förhindrar att agenten antingen ignorerar det eller missbrukar det.

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## Du äger arkitekturen; agenten implementerar den

En gräns att hålla fast vid: agenten är bra på att *implementera* en arkitektur, och dålig på att *välja* en. Avvägningar som konsistens kontra tillgänglighet eller bygga kontra köpa beror på ett affärssammanhang modellen inte kan se. Ta de besluten själv, skriv ner dem och låt agenten bygga efter dem. En tydlig arkitekturanteckning i regelfilen gör agenten till en konsekvent implementerare istället för en improvisatör.

## Sätt upp ditt eget arbetsflöde

- [ ] Skapa regelfilen i repo-roten med ditt verktygs namnkonvention.
- [ ] Skriv tio rader: stack, två eller tre konventioner, två eller tre hårda regler, ett kort arbetsflöde.
- [ ] Lägg till ett `## Tools`-avsnitt med skript/API:er agenten bör och inte bör använda.
- [ ] Under den kommande veckan, lägg till en regel varje gång agenten beter sig fel.
- [ ] Commita filen till versionshantering så hela teamet (och alla framtida sessioner) delar den.
