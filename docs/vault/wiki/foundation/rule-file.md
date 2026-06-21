---
title: Rule File
page_class: process
source: "[[raw/rule-file.md]]"
sources:
  - "[[rule-file|Part 1: Set Up the Rule File]]"
tags: [foundation, rule-file, CLAUDE-md, AGENTS-md, agent-config, onboarding]
related:
  - "[[context-engineering|Context Engineering]]"
  - "[[controlling-cost|Controlling Cost]]"
parent: "[[foundation|Foundation]]"
path: foundation/
---

# Rule File

A rule file (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`) is the onboarding document that tells a coding agent what it needs to know about a project — stack, conventions, hard rules, and workflow — before any task begins.

## Overview

A coding agent arrives at a repository like a new engineer on their first day, except it cannot ask questions. Without a rule file it infers from patterns, and those inferences are predictably wrong: the wrong state-management pattern, the wrong folder layout, the wrong test convention. The rule file encodes the knowledge that new engineer would otherwise have to ask for. It is written once and inherited by every subsequent session in the project.

The key insight is that output quality depends far more on what the agent *knows about your project* than on how any individual prompt is phrased. Writing a better prompt is the wrong lever; writing a better rule file is the right one.

## Key Principles

**Four-part structure.** Every effective rule file covers exactly four things, each kept short and specific:

1. **Stack and versions** — stop the agent guessing which APIs exist.
2. **Conventions** — the patterns your codebase *actually* uses, not generic best practices.
3. **Hard rules** — things that must never happen, stated as absolute constraints.
4. **Workflow** — the steps to follow before and after generating code.

**Grow by correction.** Do not try to write the perfect file upfront. Start with ten lines. Each time the agent does something you do not want, add one rule. That rule pays off on every subsequent task. Over weeks the file accumulates to a model of someone who has worked on the project for months.

**Tool declarations.** The rule file is also where you declare which tools the agent can reach and when — internal APIs, scripts, database schemas. A one-line description of *when* to call a tool prevents it from being ignored or misused.

**Architecture stays with the engineer.** The rule file encodes the architecture decisions the engineer has already made. The agent implements; it does not choose. Trade-offs that depend on business context the model cannot see (consistency vs. availability, build vs. buy) must be made by the human and written down.

## Examples

A minimal rule file for a Python/FastAPI project:

```markdown
# CLAUDE.md

## Stack
- Python 3.12, FastAPI, SQLAlchemy 2.0 (async)
- Postgres 16, Alembic for migrations
- pytest + httpx for tests

## Conventions
- Feature folders under `app/features/<name>/`, not layered by type.
- Routes are thin: validation + a single service call. No business logic in routes.
- All DB access goes through repositories. No raw SQL in services.

## Hard rules
- Never add a dependency not already in pyproject.toml. Ask first.
- Never write secrets into code or tests.
- No `print()`. Use the configured structlog logger.

## Workflow
1. Read the spec before writing code.
2. Write the test first, then implement until it passes.
3. If a change touches the DB schema, stop and flag it for human review.
```

## Related Concepts

- [[context-engineering|Context Engineering]] — the broader discipline of deciding what the agent sees; the rule file is the static-context anchor.
- [[controlling-cost|Controlling Cost]] — a tight rule file raises first-pass success rate, which is the primary cost lever.
