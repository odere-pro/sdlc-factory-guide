---
id: rule-file
title: "Part 1 — Set Up the Rule File"
description: Create the onboarding document your AI agent needs — stack, conventions, hard rules, and workflow in CLAUDE.md or AGENTS.md.
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 1 — Set Up the Rule File',
      description: 'Create the onboarding document your AI agent needs — stack, conventions, hard rules, and workflow in CLAUDE.md or AGENTS.md.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/rule-file',
      },
    })}
  </script>
</head>

# Part 1 — Set up the rule file

A coding agent arrives at your repository like a new engineer on their first day, except it can't ask questions. It will infer. And without anything to go on, it infers wrong in predictable ways: the wrong state-management pattern, the wrong folder layout, the wrong test convention, the wrong import path.

The rule file is the onboarding document that new engineer never gets to ask you to write. It's the single highest-leverage hour in this entire guide, because every future interaction in the project inherits it.

## Why it works

Most people try to fix bad AI output by writing cleverer prompts. That's the wrong lever. The output quality depends far more on what the agent *knows about your project* than on how you phrase a request. A rule file encodes that knowledge once, so you stop re-explaining it every session.

The file goes by different names depending on the tool — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` — but the contents are the same idea: who the agent is in this repo, what it must do, and what it must never do.

## What goes in it

Four parts. Keep each one short and specific.

1. **Stack and versions** — so the agent stops guessing which APIs exist.
2. **Conventions** — the patterns you *actually* use, not generic best practices.
3. **Hard rules** — the things that must never happen.
4. **Workflow** — the steps to follow before and after generating code.

## A real example

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

Notice what this is *not*: it isn't a prompt, and it isn't a tutorial on FastAPI. It's a set of operating instructions specific to this codebase. A generalist model already knows FastAPI; what it doesn't know is that *your* routes must stay thin and *your* secrets rule is absolute.

## Grow it by correction

Don't try to write the perfect file up front. Start with ten lines and let real failures teach you what to add. The loop is simple:

- The agent does something you don't want.
- You add one rule that prevents it.
- It never happens again.

For example, say the agent keeps inventing a `utils.py` dumping ground. You add:

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

Each rule is cheap to add and pays off on every subsequent task. Over a few weeks you'll have a file that makes the agent behave like someone who's worked on the project for months.

## Define the tools, too

The rule file is also where you tell the agent which tools it can reach and when to use them — specific internal APIs, scripts, database schemas. A one-line description of *when* to call a tool prevents the agent from either ignoring it or misusing it.

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## You own architecture; the agent implements it

One boundary to hold firmly: the agent is good at *implementing* an architecture, and bad at *choosing* one. Trade-offs like consistency vs. availability or build vs. buy depend on business context the model can't see. Make those calls yourself, write them down, and let the agent build to them. A clear architecture note in the rule file turns the agent into a consistent implementer instead of an improviser.

## Set up your own workflow

- [ ] Create the rule file in your repo root using your tool's naming convention.
- [ ] Write ten lines: stack, two or three conventions, two or three hard rules, a short workflow.
- [ ] Add a `## Tools` section listing scripts/APIs the agent should and shouldn't use.
- [ ] For the next week, add one rule each time the agent misbehaves.
- [ ] Commit the file to version control so the whole team (and every future session) shares it.
