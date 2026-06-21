---
id: rule-file
title: "Partie 1: Mettre en place le fichier de règles"
description: Créez le document d'intégration dont votre agent IA a besoin — stack, conventions, règles absolues et workflow dans CLAUDE.md ou AGENTS.md.
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Partie 1: Mettre en place le fichier de règles',
      description: 'Créez le document d\'intégration dont votre agent IA a besoin — stack, conventions, règles absolues et workflow dans CLAUDE.md ou AGENTS.md.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/rule-file',
      },
    })}
  </script>
</head>

# Partie 1: Mettre en place le fichier de règles

Un agent de codage arrive dans votre dépôt comme un nouvel ingénieur à son premier jour, sauf qu'il ne peut pas poser de questions. Il va inférer. Et sans rien sur quoi s'appuyer, il infère mal de manière prévisible : le mauvais pattern de gestion d'état, la mauvaise organisation des dossiers, la mauvaise convention de test, le mauvais chemin d'import.

Le fichier de règles est le document d'intégration que ce nouvel ingénieur n'a jamais la chance de vous demander d'écrire. C'est l'heure la plus rentable de l'ensemble de ce guide, parce que chaque interaction future dans le projet en hérite.

## Pourquoi ça fonctionne

La plupart des gens tentent de corriger une mauvaise sortie IA en rédigeant des prompts plus habiles. C'est le mauvais levier. La qualité de la sortie dépend bien davantage de ce que l'agent *sait de votre projet* que de la façon dont vous formulez une demande. Un fichier de règles encode cette connaissance une seule fois, ce qui vous évite de la réexpliquer à chaque session.

Le fichier porte des noms différents selon l'outil — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` — mais le contenu porte la même idée : qui est l'agent dans ce dépôt, ce qu'il doit faire, et ce qu'il ne doit jamais faire.

## Ce qu'il contient

Quatre parties. Gardez chacune courte et précise.

1. **Stack et versions** — pour que l'agent arrête de deviner quelles APIs existent.
2. **Conventions** — les patterns que vous *utilisez réellement*, pas les bonnes pratiques génériques.
3. **Règles absolues** — les choses qui ne doivent jamais arriver.
4. **Workflow** — les étapes à suivre avant et après la génération de code.

## Un exemple concret

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

Notez ce que ceci n'est *pas* : ce n'est pas un prompt, et ce n'est pas un tutoriel sur FastAPI. C'est un ensemble d'instructions opérationnelles spécifiques à cette base de code. Un modèle généraliste connaît déjà FastAPI ; ce qu'il ne sait pas, c'est que *vos* routes doivent rester légères et que *votre* règle sur les secrets est absolue.

## Faire évoluer le fichier par correction

N'essayez pas d'écrire le fichier parfait dès le départ. Commencez avec dix lignes et laissez les vrais échecs vous apprendre quoi ajouter. La boucle est simple :

- L'agent fait quelque chose que vous ne souhaitez pas.
- Vous ajoutez une règle qui l'en empêche.
- Cela ne se reproduit jamais.

Par exemple, si l'agent continue d'inventer un fourre-tout `utils.py`, vous ajoutez :

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

Chaque règle est peu coûteuse à ajouter et porte ses fruits sur chaque tâche suivante. En quelques semaines, vous aurez un fichier qui fait se comporter l'agent comme quelqu'un qui travaille sur le projet depuis des mois.

## Définir aussi les outils

Le fichier de règles est également l'endroit où vous indiquez à l'agent quels outils il peut utiliser et quand — APIs internes spécifiques, scripts, schémas de base de données. Une description d'une ligne précisant *quand* appeler un outil empêche l'agent de l'ignorer ou d'en abuser.

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## Vous possédez l'architecture ; l'agent l'implémente

Une frontière à tenir fermement : l'agent est doué pour *implémenter* une architecture, et mauvais pour en *choisir* une. Les compromis comme cohérence vs. disponibilité ou build vs. buy dépendent d'un contexte métier que le modèle ne peut pas voir. Prenez ces décisions vous-même, consignez-les par écrit, et laissez l'agent construire en conséquence. Une note d'architecture claire dans le fichier de règles transforme l'agent en implémenteur cohérent plutôt qu'en improvisateur.

## Mettre en place votre propre workflow

- [ ] Créer le fichier de règles à la racine de votre dépôt en suivant la convention de nommage de votre outil.
- [ ] Écrire dix lignes : stack, deux ou trois conventions, deux ou trois règles absolues, un workflow court.
- [ ] Ajouter une section `## Tools` listant les scripts/APIs que l'agent doit et ne doit pas utiliser.
- [ ] Durant la semaine suivante, ajouter une règle chaque fois que l'agent se comporte mal.
- [ ] Committer le fichier dans le contrôle de version pour que toute l'équipe (et chaque session future) en bénéficie.
